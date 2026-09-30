import { StudentRegistrationRecord, DepartmentSettings, User } from '../types/auth';

const API_BASE = '/api';

export const api = {
  // 1. Auth & Users
  login: async (email: string): Promise<User> => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  // 2. Student Registrations
  getRegistrations: async (role: string, deptId?: string): Promise<StudentRegistrationRecord[]> => {
    const res = await fetch(`${API_BASE}/registrations`, {
      headers: {
        'x-user-role': role,
        'x-user-dept': deptId || ''
      }
    });
    if (!res.ok) throw new Error('Failed to fetch registrations');
    return res.json();
  },

  createRegistration: async (data: Partial<StudentRegistrationRecord>): Promise<StudentRegistrationRecord> => {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit registration');
    return res.json();
  },

  updateRegistrationStatus: async (
    id: string,
    status: StudentRegistrationRecord['status'],
    notes: string,
    role: string,
    deptId?: string
  ): Promise<StudentRegistrationRecord> => {
    const res = await fetch(`${API_BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': role,
        'x-user-dept': deptId || ''
      },
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  // 3. Departments
  getDepartments: async (): Promise<Record<string, DepartmentSettings>> => {
    const res = await fetch(`${API_BASE}/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments');
    return res.json();
  },

  updateDepartment: async (
    deptId: string,
    settings: Partial<DepartmentSettings>,
    role: string,
    userDeptId?: string
  ): Promise<DepartmentSettings> => {
    const res = await fetch(`${API_BASE}/departments/${deptId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': role,
        'x-user-dept': userDeptId || ''
      },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update department');
    return res.json();
  },

  // 4. Global Announcement
  getAnnouncement: async () => {
    const res = await fetch(`${API_BASE}/announcement`);
    if (!res.ok) throw new Error('Failed to fetch announcement');
    return res.json();
  },

  updateAnnouncement: async (ann: Record<string, unknown>, role: string) => {
    const res = await fetch(`${API_BASE}/announcement`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': role
      },
      body: JSON.stringify(ann)
    });
    if (!res.ok) throw new Error('Failed to update announcement');
    return res.json();
  },

  // 5. Contact Inquiries
  sendContactMessage: async (data: { name: string; contactInfo: string; subject: string; message: string }) => {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  }
};
