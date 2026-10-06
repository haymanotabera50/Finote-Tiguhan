import { Router, Request, Response } from 'express';
import { isConnectedToMongoDB } from './db.js';
import { User } from './models/User.js';
import { StudentRegistration } from './models/StudentRegistration.js';
import { DepartmentSetting } from './models/DepartmentSetting.js';
import { Announcement } from './models/Announcement.js';
import { ContactMessage } from './models/ContactMessage.js';
import { readLocalStore, writeLocalStore } from './localStore.js';
import { renderAdminHtml } from './adminHtml.js';

export const apiRouter = Router();

// Helper to get role from request headers
function getReqUser(req: Request) {
  const role = (req.headers['x-user-role'] as string) || 'leadership';
  const deptId = (req.headers['x-user-dept'] as string) || '';
  return { role, deptId };
}

// ----------------------------------------------------
// 0. API ROOT & DISCOVERY / BROWSER ADMIN FALLBACK
// ----------------------------------------------------
apiRouter.get('/', (req: Request, res: Response) => {
  if (req.accepts('html') && !req.xhr && !req.headers.accept?.includes('application/json')) {
    return res.type('html').send(renderAdminHtml());
  }

  return res.json({
    status: 'online',
    name: 'Finote Teguhan Sunday School Backend API',
    version: '1.0.0',
    database: {
      connected: isConnectedToMongoDB,
      engine: isConnectedToMongoDB ? 'MongoDB Atlas / Server' : 'Local Document Store (server/data/store.json)'
    },
    adminPortal: 'http://localhost:5000/admin',
    webPortal: 'http://localhost:5173',
    endpoints: {
      health: 'GET /api/health',
      stats: 'GET /api/stats',
      auth_login: 'POST /api/auth/login',
      auth_users: 'GET /api/auth/users',
      registrations: 'GET, POST /api/registrations',
      registration_status: 'PATCH /api/registrations/:id/status',
      departments: 'GET, PUT /api/departments/:deptId',
      announcement: 'GET, PUT /api/announcement',
      contact: 'GET, POST /api/contact'
    }
  });
});

apiRouter.get('/stats', async (_req: Request, res: Response) => {
  try {
    if (isConnectedToMongoDB) {
      const [totalRegs, pendingRegs, approvedRegs, usersCount, contactCount, ann] = await Promise.all([
        StudentRegistration.countDocuments(),
        StudentRegistration.countDocuments({ status: 'pending' }),
        StudentRegistration.countDocuments({ status: { $in: ['approved', 'enrolled'] } }),
        User.countDocuments(),
        ContactMessage.countDocuments(),
        Announcement.findOne()
      ]);
      return res.json({
        database: { connected: true, name: 'MongoDB Atlas' },
        registrations: {
          total: totalRegs,
          pending: pendingRegs,
          approved: approvedRegs
        },
        usersCount,
        contactCount,
        announcement: ann || { enabled: false }
      });
    } else {
      const store = readLocalStore();
      const totalRegs = store.registrations.length;
      const pendingRegs = store.registrations.filter(r => r.status === 'pending').length;
      const approvedRegs = store.registrations.filter(r => r.status === 'approved' || r.status === 'enrolled').length;
      return res.json({
        database: { connected: false, name: 'Local Document Store' },
        registrations: {
          total: totalRegs,
          pending: pendingRegs,
          approved: approvedRegs
        },
        usersCount: store.users.length,
        contactCount: store.contactMessages?.length || 0,
        announcement: store.announcement
      });
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ----------------------------------------------------
// 1. AUTHENTICATION & USERS
// ----------------------------------------------------
apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (isConnectedToMongoDB) {
      let user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        // Create new student user if not existing
        user = await User.create({
          name: email.split('@')[0],
          email: email.toLowerCase(),
          role: 'student',
          studentId: 'FT-' + Math.floor(100000 + Math.random() * 900000)
        });
      }
      return res.json(user);
    } else {
      const store = readLocalStore();
      let user = store.users.find(u => (u.email as string)?.toLowerCase() === email.toLowerCase());
      if (!user) {
        user = {
          id: "u-" + Date.now(),
          name: email.split('@')[0],
          email: email.toLowerCase(),
          role: 'student',
          studentId: 'FT-' + Math.floor(100000 + Math.random() * 900000)
        };
        store.users.push(user);
        writeLocalStore(store);
      }
      return res.json(user);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.get('/auth/users', async (_req: Request, res: Response) => {
  try {
    if (isConnectedToMongoDB) {
      const users = await User.find().select('-password');
      return res.json(users);
    } else {
      const store = readLocalStore();
      return res.json(store.users);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ----------------------------------------------------
// 2. STUDENT REGISTRATIONS (RBAC ENFORCED)
// ----------------------------------------------------
apiRouter.get('/registrations', async (req: Request, res: Response) => {
  try {
    const { role, deptId } = getReqUser(req);

    if (isConnectedToMongoDB) {
      let query: Record<string, unknown> = {};
      if (role === 'dept_admin' && deptId && deptId !== 'education') {
        query = { departmentId: deptId };
      }
      const records = await StudentRegistration.find(query).sort({ registeredAt: -1 });
      return res.json(records);
    } else {
      const store = readLocalStore();
      let records = store.registrations;
      if (role === 'dept_admin' && deptId && deptId !== 'education') {
        records = records.filter(r => r.departmentId === deptId);
      }
      return res.json(records);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.post('/registrations', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const regCode = data.regCode || ('FT-' + Math.floor(100000 + Math.random() * 900000));

    if (isConnectedToMongoDB) {
      const record = await StudentRegistration.create({
        ...data,
        regCode,
        registeredAt: new Date()
      });
      return res.status(201).json(record);
    } else {
      const store = readLocalStore();
      const newRec = {
        id: "reg-" + Date.now(),
        ...data,
        regCode,
        status: data.status || 'pending',
        registeredAt: new Date().toISOString().split('T')[0]
      };
      store.registrations.unshift(newRec);
      writeLocalStore(store);
      return res.status(201).json(newRec);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.patch('/registrations/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const { role, deptId } = getReqUser(req);

    if (isConnectedToMongoDB) {
      const record = await StudentRegistration.findById(id);
      if (!record) {
        return res.status(404).json({ error: 'Registration record not found' });
      }

      // Permission check: Leadership and Education department can approve registrations, other dept_admin only their department
      if (role !== 'leadership' && deptId !== 'education' && record.departmentId !== deptId) {
        return res.status(403).json({ error: 'Unauthorized: You can only manage registrations for your department' });
      }

      record.status = status;
      if (notes !== undefined) record.notes = notes;
      await record.save();
      return res.json(record);
    } else {
      const store = readLocalStore();
      const idx = store.registrations.findIndex(r => r.id === id || r._id === id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Registration record not found' });
      }

      const rec = store.registrations[idx];
      if (role !== 'leadership' && deptId !== 'education' && rec.departmentId !== deptId) {
        return res.status(403).json({ error: 'Unauthorized: You can only manage registrations for your department' });
      }

      rec.status = status;
      if (notes !== undefined) rec.notes = notes;
      writeLocalStore(store);
      return res.json(rec);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.delete('/registrations/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = getReqUser(req);

    if (role !== 'leadership') {
      return res.status(403).json({ error: 'Unauthorized: Only leadership can delete registration records' });
    }

    if (isConnectedToMongoDB) {
      const deleted = await StudentRegistration.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Record not found' });
      }
      return res.json({ success: true, message: 'Registration deleted' });
    } else {
      const store = readLocalStore();
      const idx = store.registrations.findIndex(r => r.id === id || r._id === id);
      if (idx === -1) {
        return res.status(404).json({ error: 'Record not found' });
      }
      store.registrations.splice(idx, 1);
      writeLocalStore(store);
      return res.json({ success: true, message: 'Registration deleted' });
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ----------------------------------------------------
// 3. DEPARTMENT SETTINGS (RBAC: LEADERSHIP ONLY EDITS 'leadership', DEPT ADMIN ONLY EDITS OWN)
// ----------------------------------------------------
apiRouter.get('/departments', async (_req: Request, res: Response) => {
  try {
    if (isConnectedToMongoDB) {
      const settings = await DepartmentSetting.find();
      const map: Record<string, unknown> = {};
      settings.forEach(s => { map[s.deptId] = s; });
      return res.json(map);
    } else {
      const store = readLocalStore();
      return res.json(store.departmentSettings);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.put('/departments/:deptId', async (req: Request, res: Response) => {
  try {
    const deptId = String(req.params.deptId);
    const { role, deptId: userDeptId } = getReqUser(req);

    // RBAC:
    // 1. System admin or backend admin console (role === 'admin' or empty role header) has full management access
    // 2. 'leadership' can inspect all departments but can ONLY edit its own department ('leadership')
    // 3. 'dept_admin' can only edit their own department
    if (role === 'admin' || role === 'system_admin' || !role) {
      // Allowed for backend dashboard
    } else if (role === 'leadership') {
      if (deptId !== 'leadership') {
        return res.status(403).json({
          error: 'Forbidden: ሥራ አመራር ክፍል can inspect all departments but can ONLY edit its own department (leadership).'
        });
      }
    } else if (role === 'dept_admin') {
      if (deptId !== userDeptId) {
        return res.status(403).json({
          error: `Forbidden: As coordinator of ${userDeptId}, you can only edit your own department.`
        });
      }
    } else {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    const updates = req.body;

    if (isConnectedToMongoDB) {
      const updated = await DepartmentSetting.findOneAndUpdate(
        { deptId },
        { ...updates, updatedAt: new Date() },
        { new: true, upsert: true }
      );
      return res.json(updated);
    } else {
      const store = readLocalStore();
      const existing = store.departmentSettings[deptId] || { deptId };
      store.departmentSettings[deptId] = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      writeLocalStore(store);
      return res.json(store.departmentSettings[deptId]);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ----------------------------------------------------
// 4. GLOBAL PARISH ANNOUNCEMENT (LEADERSHIP ONLY)
// ----------------------------------------------------
apiRouter.get('/announcement', async (_req: Request, res: Response) => {
  try {
    if (isConnectedToMongoDB) {
      const ann = await Announcement.findOne().sort({ updatedAt: -1 });
      return res.json(ann || {});
    } else {
      const store = readLocalStore();
      return res.json(store.announcement);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.put('/announcement', async (req: Request, res: Response) => {
  try {
    const { role } = getReqUser(req);
    if (role !== 'leadership') {
      return res.status(403).json({ error: 'Only leadership can update the parish global banner' });
    }

    const updates = req.body;

    if (isConnectedToMongoDB) {
      let ann = await Announcement.findOne();
      if (!ann) {
        ann = new Announcement(updates);
      } else {
        Object.assign(ann, updates);
        ann.updatedAt = new Date();
      }
      await ann.save();
      return res.json(ann);
    } else {
      const store = readLocalStore();
      store.announcement = {
        ...store.announcement,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      writeLocalStore(store);
      return res.json(store.announcement);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// ----------------------------------------------------
// 5. CONTACT MESSAGES / FEEDBACK
// ----------------------------------------------------
apiRouter.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, contactInfo, subject, message, departmentId } = req.body;
    if (!name || !contactInfo || !message) {
      return res.status(400).json({ error: 'Missing required contact fields' });
    }

    if (isConnectedToMongoDB) {
      const msg = await ContactMessage.create({
        name,
        contactInfo,
        subject: subject || 'አጠቃላይ አስተያየትና ጥያቄ',
        message,
        departmentId: departmentId || 'general',
        status: 'unread',
        createdAt: new Date()
      });
      return res.status(201).json(msg);
    } else {
      const store = readLocalStore();
      const msg = {
        id: "msg-" + Date.now(),
        name,
        contactInfo,
        subject: subject || 'አጠቃላይ አስተያየትና ጥያቄ',
        message,
        departmentId: departmentId || 'general',
        status: 'unread',
        createdAt: new Date().toISOString()
      };
      if (!store.contactMessages) store.contactMessages = [];
      store.contactMessages.unshift(msg);
      writeLocalStore(store);
      return res.status(201).json(msg);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.get('/contact', async (_req: Request, res: Response) => {
  try {
    if (isConnectedToMongoDB) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.json(messages);
    } else {
      const store = readLocalStore();
      return res.json(store.contactMessages || []);
    }
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.patch('/contact/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    if (isConnectedToMongoDB) {
      try {
        let msg = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
          msg = await ContactMessage.findById(id);
        }
        if (!msg) {
          msg = await ContactMessage.findOne({ id }).catch(() => null);
        }
        if (msg) {
          msg.status = status;
          await msg.save();
          return res.json(msg);
        }
      } catch (e) {
        // continue to local store fallback
      }
    }

    const store = readLocalStore();
    const msg = (store.contactMessages || []).find(m => m.id === id || (m._id as string) === id);
    if (!msg) {
      return res.status(404).json({ error: 'Message not found' });
    }
    msg.status = status;
    writeLocalStore(store);
    return res.json(msg);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});

apiRouter.delete('/contact/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (isConnectedToMongoDB) {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const resMongo = await ContactMessage.findByIdAndDelete(id);
          if (resMongo) deleted = true;
        }
        if (!deleted) {
          const resMongo2 = await ContactMessage.findOneAndDelete({ id }).catch(() => null);
          if (resMongo2) deleted = true;
        }
      } catch (e) {}
    }

    const store = readLocalStore();
    const initialLength = (store.contactMessages || []).length;
    store.contactMessages = (store.contactMessages || []).filter(m => m.id !== id && (m._id as string) !== id);
    if (store.contactMessages.length !== initialLength) {
      writeLocalStore(store);
      deleted = true;
    }

    if (deleted) {
      return res.json({ success: true, id });
    }
    return res.status(404).json({ error: 'Message not found' });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
});
