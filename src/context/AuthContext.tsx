import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentRegistrationRecord } from '../types/auth';
import { api } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: string, deptId?: string) => Promise<void>;
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
  education: {
    id: "u-edu",
    name: "መምህር ተስፋዬ (የትምህርት ክፍል ኃላፊ)",
    email: "education@finoteteguhan.org",
    role: "dept_admin",
    departmentId: "education",
    departmentNameAm: "ትምህርትና ስልጠና ክፍል",
    departmentNameEn: "Education & Training",
    phone: "+251 91 234 5678"
  },
  children: {
    id: "u-child",
    name: "እህት ጽዮን (የሕፃናት ክፍል አስተባባሪ)",
    email: "children@finoteteguhan.org",
    role: "dept_admin",
    departmentId: "children",
    departmentNameAm: "ሕጻናት ክፍል",
    departmentNameEn: "Children Sunday School",
    phone: "+251 91 345 6789"
  },
  choir: {
    id: "u-choir",
    name: "ዘማሪ አማኑኤል (የመዝሙር ክፍል መሪ)",
    email: "choir@finoteteguhan.org",
    role: "dept_admin",
    departmentId: "choir",
    departmentNameAm: "መዝሙር ክፍል",
    departmentNameEn: "Sacred Choir & Hymnody",
    phone: "+251 91 456 7890"
  },
  student: {
    id: "u-stud",
    name: "ዮሐንስ ተስፋዬ",
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
    const saved = localStorage.getItem('ft_user');
    const isExplicit = localStorage.getItem('ft_explicit_login') === 'true';
    if (saved && isExplicit) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

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

  const login = async (email: string, role?: string, deptId?: string) => {
    try {
      const user = await api.login(email);
      setCurrentUser(user);
      localStorage.setItem('ft_user', JSON.stringify(user));
      localStorage.setItem('ft_explicit_login', 'true');
    } catch (err) {
      const matched = Object.values(presetUsers).find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        localStorage.setItem('ft_user', JSON.stringify(matched));
        localStorage.setItem('ft_explicit_login', 'true');
        return;
      }
      const newUser: User = {
        id: "u-" + Date.now(),
        name: email.split('@')[0],
        email,
        role: (role as User['role']) || 'student',
        departmentId: deptId || 'children',
        studentId: 'FT-' + Math.floor(100000 + Math.random() * 900000)
      };
      setCurrentUser(newUser);
      localStorage.setItem('ft_user', JSON.stringify(newUser));
      localStorage.setItem('ft_explicit_login', 'true');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ft_user');
    localStorage.removeItem('ft_explicit_login');
  };

  const switchRole = (role: 'leadership' | 'dept_admin' | 'student', deptId = 'education') => {
    let u: User;
    if (role === 'leadership') {
      u = presetUsers.leadership;
    } else if (role === 'dept_admin') {
      u = presetUsers[deptId] || {
        ...presetUsers.education,
        departmentId: deptId,
        name: `${deptId} ክፍል አስተባባሪ`
      };
    } else {
      u = presetUsers.student;
    }
    setCurrentUser(u);
    localStorage.setItem('ft_user', JSON.stringify(u));
    localStorage.setItem('ft_explicit_login', 'true');
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
    if (!currentUser) return false;
    if (currentUser.role === 'leadership') return true;
    if (currentUser.role === 'dept_admin') {
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
    try {
      const role = currentUser?.role || 'leadership';
      const deptId = currentUser?.departmentId;
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
    localStorage.setItem('ft_registrations', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
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
