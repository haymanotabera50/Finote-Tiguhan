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
    // Only restore session if the user explicitly logged in during this active browser session
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

  // Ensure stale legacy persistent login tokens in localStorage are purged on mount
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

  const login = async (email: string, role?: string, deptId?: string) => {
    try {
      const user = await api.login(email);
      setCurrentUser(user);
      sessionStorage.setItem('ft_user', JSON.stringify(user));
    } catch (err) {
      const matched = Object.values(presetUsers).find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        sessionStorage.setItem('ft_user', JSON.stringify(matched));
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
      sessionStorage.setItem('ft_user', JSON.stringify(newUser));
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
