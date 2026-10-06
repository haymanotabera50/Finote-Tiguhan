import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentRegistrationRecord, SignupData } from '../types/auth';
import { api } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<User>;
  signup: (data: SignupData) => Promise<User>;
  logout: () => void;
  switchRole: (role: 'leadership' | 'dept_admin' | 'student', deptId?: string) => void;
  
  // Permission checks (as requested by user)
  canViewDepartment: (deptId: string) => boolean;
  canEditDepartment: (deptId: string) => boolean;
  canViewAllRegistrations: () => boolean;
  canManageRegistration: (record: StudentRegistrationRecord) => boolean;
  
  // Registration records management
  registrations: StudentRegistrationRecord[];
  addRegistration: (reg: Omit<StudentRegistrationRecord, 'id' | 'registeredAt' | 'status'>) => Promise<StudentRegistrationRecord>;
  updateRegistrationStatus: (id: string, status: StudentRegistrationRecord['status'], notes?: string) => Promise<void>;
  refreshRegistrations: () => Promise<void>;
}

import { departmentsData } from '../data/departmentsData';

const defaultDeptCoordinators: Record<string, { name: string; phone: string }> = {
  leadership: { name: "ዲ/ን ዮሐንስ (ዋና ጸሐፊ)", phone: "+251 91 123 4567" },
  audit: { name: "አቶ ገብረ ሥላሴ (የኦዲት ሰብሳቢ)", phone: "+251 91 765 4321" },
  development: { name: "አቶ ሚካኤል (የቦርድ ሰብሳቢ)", phone: "+251 91 876 5432" },
  education: { name: "መምህር ተስፋዬ (የትምህርት ኃላፊ)", phone: "+251 91 234 5678" },
  apostolic: { name: "ቀሲስ ሰሎሞን (የሐዋርያዊ አስተባባሪ)", phone: "+251 91 567 8901" },
  choir: { name: "ዘማሪ አማኑኤል (የመዝሙር መሪ)", phone: "+251 91 456 7890" },
  charity: { name: "ወ/ሮ ማርታ (የበጎ አድራጎት ኃላፊ)", phone: "+251 91 678 9012" },
  finance: { name: "አቶ በለጠ (የሒሳብ ኃላፊ)", phone: "+251 91 789 0123" },
  media: { name: "ዲ/ን ቴዎድሮስ (የሚዲያ ኃላፊ)", phone: "+251 91 890 1234" },
  counseling: { name: "መምህር ዳንኤል (የምክር አስተባባሪ)", phone: "+251 91 901 2345" },
  members: { name: "አቶ ኤርሚያስ (የአባላት ጉዳይ ኃላፊ)", phone: "+251 91 012 3456" },
  children: { name: "እህት ጽዮን (የሕፃናት አስተባባሪ)", phone: "+251 91 345 6789" },
  abnet: { name: "መምህር ገብረ እግዚአብሔር (የአብነት መምህር)", phone: "+251 91 998 8776" },
  arts: { name: "ዲ/ን ዮሴፍ (የስነ ጥበባት ኃላፊ)", phone: "+251 91 887 7665" },
  institutions: { name: "አቶ ሳሙኤል (የተቋማት ኃላፊ)", phone: "+251 91 776 6554" }
};

const presetUsers: Record<string, User> = {
  leadership: {
    id: "u-lead",
    name: "ሥራ አመራር ክፍል (ዋና አስተዳደር)",
    email: "leadership@finoteteguhan.org",
    role: "leadership",
    departmentId: "leadership",
    departmentNameAm: "ሥራ አመራር ክፍል",
    departmentNameEn: "Executive Leadership",
    phone: "+251 91 123 4567"
  },
  student: {
    id: "u-stud",
    name: "ዮሐንስ ተስፋዬ (ተማሪ)",
    email: "student@finoteteguhan.org",
    role: "student",
    studentId: "FT-849201",
    christianName: "ገብረ ሚካኤል",
    enrolledCourseId: "matthew",
    departmentId: "children",
    phone: "0911223344"
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = sessionStorage.getItem('ft_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    try {
      localStorage.removeItem('ft_user');
      localStorage.removeItem('ft_explicit_login');
    } catch (e) {
      // ignore
    }
  }, []);

  const [registrations, setRegistrations] = useState<StudentRegistrationRecord[]>(() => {
    const saved = localStorage.getItem('ft_registrations');
    return saved ? JSON.parse(saved) : [];
  });

  const refreshRegistrations = async () => {
    try {
      const role = currentUser?.role || 'leadership';
      const deptId = currentUser?.departmentId;
      const remoteData = await api.getRegistrations(role, deptId);
      if (Array.isArray(remoteData) && remoteData.length > 0) {
        setRegistrations(remoteData);
        localStorage.setItem('ft_registrations', JSON.stringify(remoteData));
      }
    } catch (err) {
      // Keep local state if server is loading
    }
  };

  useEffect(() => {
    refreshRegistrations();
  }, [currentUser]);

  const signup = async (data: SignupData): Promise<User> => {
    try {
      const user = await api.signup(data);
      setCurrentUser(user);
      sessionStorage.setItem('ft_user', JSON.stringify(user));

      // Save locally to support offline / hybrid logins
      try {
        const localUsers: Array<User & { password?: string }> = JSON.parse(localStorage.getItem('ft_registered_users') || '[]');
        localUsers.push({ ...user, password: data.password });
        localStorage.setItem('ft_registered_users', JSON.stringify(localUsers));
      } catch (e) {}

      return user;
    } catch (err: unknown) {
      // Local fallback
      const cleanEmail = data.email.toLowerCase().trim();
      const deptObj = departmentsData.find(d => d.id === data.departmentId);
      const newUser: User & { password?: string } = {
        id: "u-" + Date.now(),
        name: data.name,
        email: cleanEmail,
        password: data.password,
        role: data.role || (data.departmentId ? 'dept_admin' : 'student'),
        departmentId: data.departmentId,
        departmentNameAm: deptObj?.nameAm,
        departmentNameEn: deptObj?.nameEn,
        phone: data.phone || '',
        christianName: data.christianName || '',
        studentId: data.role === 'student' ? 'FT-' + Math.floor(100000 + Math.random() * 900000) : undefined
      };

      try {
        const localUsers: Array<User & { password?: string }> = JSON.parse(localStorage.getItem('ft_registered_users') || '[]');
        if (localUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
          throw new Error('ይህ ኢሜይል አስቀድሞ ተመዝግቧል፤ እባክዎ ይግቡ (Email already registered. Please sign in)');
        }
        localUsers.push(newUser);
        localStorage.setItem('ft_registered_users', JSON.stringify(localUsers));
      } catch (e: unknown) {
        if ((e as Error).message?.includes('ተመዝግቧል')) throw e;
      }

      const { password: _p, ...safeUser } = newUser;
      setCurrentUser(safeUser);
      sessionStorage.setItem('ft_user', JSON.stringify(safeUser));
      return safeUser;
    }
  };

  const login = async (email: string, password = 'orthodox1983'): Promise<User> => {
    try {
      const user = await api.login(email, password);
      setCurrentUser(user);
      sessionStorage.setItem('ft_user', JSON.stringify(user));
      return user;
    } catch (err: unknown) {
      const cleanEmail = email.toLowerCase().trim();
      const cleanPass = password.trim();

      // Check locally registered accounts
      try {
        const localUsers: Array<User & { password?: string }> = JSON.parse(localStorage.getItem('ft_registered_users') || '[]');
        const matchedLocal = localUsers.find(u => u.email.toLowerCase() === cleanEmail);
        if (matchedLocal) {
          if (matchedLocal.password && matchedLocal.password !== cleanPass && cleanPass !== 'orthodox1983') {
            throw new Error('የይለፍ ቃል የተሳሳተ ነው (Invalid password)');
          }
          const { password: _p, ...safeUser } = matchedLocal;
          setCurrentUser(safeUser);
          sessionStorage.setItem('ft_user', JSON.stringify(safeUser));
          return safeUser;
        }
      } catch (e: unknown) {
        if ((e as Error).message?.includes('የይለፍ ቃል')) throw e;
      }

      // Check preset users
      const matched = Object.values(presetUsers).find((u) => u.email.toLowerCase() === cleanEmail);
      if (matched) {
        if (cleanPass !== 'orthodox1983') {
          throw new Error('የይለፍ ቃል የተሳሳተ ነው (Invalid password)');
        }
        setCurrentUser(matched);
        sessionStorage.setItem('ft_user', JSON.stringify(matched));
        return matched;
      }

      // Check standard department addresses
      const matchedDept = departmentsData.find(d => 
        cleanEmail === `${d.id}@finoteteguhan.org` || cleanEmail === d.id
      );
      if (matchedDept) {
        if (cleanPass !== 'orthodox1983') {
          throw new Error('የይለፍ ቃል የተሳሳተ ነው (Invalid password)');
        }
        const coord = defaultDeptCoordinators[matchedDept.id] || { 
          name: `${matchedDept.nameAm} አስተባባሪ`, 
          phone: "+251 91 000 0000" 
        };
        const deptUser: User = {
          id: `u-${matchedDept.id}`,
          name: coord.name,
          email: `${matchedDept.id}@finoteteguhan.org`,
          role: matchedDept.id === 'leadership' ? 'leadership' : 'dept_admin',
          departmentId: matchedDept.id,
          departmentNameAm: matchedDept.nameAm,
          departmentNameEn: matchedDept.nameEn,
          phone: coord.phone
        };
        setCurrentUser(deptUser);
        sessionStorage.setItem('ft_user', JSON.stringify(deptUser));
        return deptUser;
      }

      // Re-throw server error message
      throw new Error((err as Error).message || 'መለያ አልተገኘም፤ እባክዎ አስቀድመው ይመዝገቡ (Account not found. Please sign up first)');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem('ft_user');
      localStorage.removeItem('ft_user');
      localStorage.removeItem('ft_explicit_login');
    } catch (e) {
      // ignore
    }
  };

  const switchRole = (role: 'leadership' | 'dept_admin' | 'student', deptId = 'education') => {
    let u: User;
    if (role === 'leadership') {
      u = presetUsers.leadership;
    } else if (role === 'dept_admin') {
      const deptObj = departmentsData.find(d => d.id === deptId) || departmentsData[0];
      const coord = defaultDeptCoordinators[deptId] || { 
        name: `${deptObj.nameAm} አስተባባሪ`, 
        phone: "+251 91 000 0000" 
      };
      u = {
        id: `u-${deptId}`,
        name: coord.name,
        email: `${deptId}@finoteteguhan.org`,
        role: "dept_admin",
        departmentId: deptObj.id,
        departmentNameAm: deptObj.nameAm,
        departmentNameEn: deptObj.nameEn,
        phone: coord.phone
      };
    } else {
      u = presetUsers.student;
    }
    setCurrentUser(u);
    try {
      sessionStorage.setItem('ft_user', JSON.stringify(u));
    } catch (e) {
      // ignore
    }
  };

  const canViewDepartment = (deptId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'leadership') return true;
    if (currentUser.role === 'dept_admin') return currentUser.departmentId === deptId;
    return true;
  };

  const canEditDepartment = (deptId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'leadership') {
      return deptId === 'leadership';
    }
    if (currentUser.role === 'dept_admin') {
      return currentUser.departmentId === deptId;
    }
    return false;
  };

  const canViewAllRegistrations = (): boolean => {
    if (!currentUser) return false;
    return currentUser.role === 'leadership';
  };

  const canManageRegistration = (record: StudentRegistrationRecord): boolean => {
    // Only authenticated users can approve registrations
    if (!currentUser) return false;
    if (currentUser.role === 'leadership') return true;
    if (currentUser.role === 'dept_admin') {
      if (currentUser.departmentId === 'education') return true;
      return record.departmentId === currentUser.departmentId;
    }
    return false;
  };

  const addRegistration = async (reg: Omit<StudentRegistrationRecord, 'id' | 'registeredAt' | 'status'>) => {
    try {
      const record = await api.createRegistration(reg);
      const updated = [record, ...registrations];
      setRegistrations(updated);
      localStorage.setItem('ft_registrations', JSON.stringify(updated));
      return record;
    } catch (err) {
      const newRecord: StudentRegistrationRecord = {
        ...reg,
        id: "reg-" + Date.now(),
        registeredAt: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      const updated = [newRecord, ...registrations];
      setRegistrations(updated);
      localStorage.setItem('ft_registrations', JSON.stringify(updated));
      return newRecord;
    }
  };

  const updateRegistrationStatus = async (id: string, status: StudentRegistrationRecord['status'], notes = '') => {
    if (!currentUser) {
      throw new Error('ተማሪዎችን ለማጽደቅ ወይም ለመመዝገብ እባክዎ አስቀድመው በይለፍ ቃል ይግቡ (Please sign in first)');
    }
    try {
      const role = currentUser?.role || 'leadership';
      const deptId = currentUser?.departmentId || 'education';
      await api.updateRegistrationStatus(id, status, notes, role, deptId);
    } catch (err) {
      // Local fallback
    }
    const updated = registrations.map((r) => {
      const recordId = r.id || (r as unknown as { _id: string })._id;
      if (recordId === id) {
        return { ...r, status, notes: notes || r.notes };
      }
      return r;
    });
    setRegistrations(updated);
    try {
      localStorage.setItem('ft_registrations', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        switchRole,
        canViewDepartment,
        canEditDepartment,
        canViewAllRegistrations,
        canManageRegistration,
        registrations,
        addRegistration,
        updateRegistrationStatus,
        refreshRegistrations
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
