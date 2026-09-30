import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentRegistrationRecord } from '../types/auth';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: string, deptId?: string) => void;
  logout: () => void;
  switchRole: (role: 'leadership' | 'dept_admin' | 'student', deptId?: string) => void;
  
  // Permission checks (as requested by user)
  canViewDepartment: (deptId: string) => boolean;
  canEditDepartment: (deptId: string) => boolean;
  canViewAllRegistrations: () => boolean;
  canManageRegistration: (record: StudentRegistrationRecord) => boolean;
  
  // Registration records management
  registrations: StudentRegistrationRecord[];
  addRegistration: (reg: Omit<StudentRegistrationRecord, 'id' | 'registeredAt' | 'status'>) => StudentRegistrationRecord;
  updateRegistrationStatus: (id: string, status: StudentRegistrationRecord['status'], notes?: string) => void;
}

const mockInitialRegistrations: StudentRegistrationRecord[] = [
  {
    id: "reg-1",
    regCode: "FT-849201",
    fullName: "ዮሐንስ ተስፋዬ ገብሬ",
    christianName: "ገብረ ሚካኤል",
    age: 6,
    gender: "male",
    phone: "0911223344",
    address: "ላፍቶ፣ ወረዳ 01",
    category: "children",
    departmentId: "children",
    status: "enrolled",
    registeredAt: "2026-09-25",
    notes: "ለማቴዎስ ምድብ ተመድቧል"
  },
  {
    id: "reg-2",
    regCode: "FT-731920",
    fullName: "ሜሮን አለሙ በቀለ",
    christianName: "ወለተ ማርያም",
    age: 10,
    gender: "female",
    phone: "0922334455",
    address: "ጀሞ 1፣ ንፋስ ስልክ",
    category: "children",
    departmentId: "children",
    status: "approved",
    registeredAt: "2026-09-27",
    notes: "ለማርቆስ ምድብ ተመድባለች"
  },
  {
    id: "reg-3",
    regCode: "FT-612984",
    fullName: "ዳዊት ኃይሉ ተመስገን",
    christianName: "ኃይለ ጊዮርጊስ",
    age: 21,
    gender: "male",
    phone: "0933445566",
    address: "ለቡ መብራት ኃይል",
    category: "choir",
    departmentId: "choir",
    status: "pending",
    registeredAt: "2026-09-28",
    notes: "የበገናና የከበሮ ተሰጥኦ ፈተና ይጠብቃል"
  },
  {
    id: "reg-4",
    regCode: "FT-501243",
    fullName: "ስንታየሁ ግርማ ወርቁ",
    christianName: "ተክለ ሃይማኖት",
    age: 26,
    gender: "male",
    phone: "0944556677",
    address: "ላፍቶ ቅዱስ ሚካኤል አካባቢ",
    category: "adult",
    departmentId: "education",
    status: "approved",
    registeredAt: "2026-09-29",
    notes: "የአብነትና የነገረ መለኮት ምዝገባ"
  },
  {
    id: "reg-5",
    regCode: "FT-419082",
    fullName: "ማህሌት ብርሃኑ ደምሴ",
    christianName: "ኪዳነ ማርያም",
    age: 24,
    gender: "female",
    phone: "0955667788",
    address: "ኮተቤ / አዲስ አበባ",
    category: "volunteer",
    departmentId: "charity",
    status: "pending",
    registeredAt: "2026-09-30",
    notes: "በሙያና በጎ አድራጎት ክፍል የሕክምና ድጋፍ"
  }
];

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
    return saved ? JSON.parse(saved) : presetUsers.leadership; // Default to leadership demo for easy exploration
  });

  const [registrations, setRegistrations] = useState<StudentRegistrationRecord[]>(() => {
    const saved = localStorage.getItem('ft_registrations');
    return saved ? JSON.parse(saved) : mockInitialRegistrations;
  });

  const login = (email: string, role?: string, deptId?: string) => {
    // If matching preset user
    const matched = Object.values(presetUsers).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      localStorage.setItem('ft_user', JSON.stringify(matched));
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
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ft_user');
  };

  const switchRole = (role: 'leadership' | 'dept_admin' | 'student', deptId = 'education') => {
    if (role === 'leadership') {
      setCurrentUser(presetUsers.leadership);
      localStorage.setItem('ft_user', JSON.stringify(presetUsers.leadership));
    } else if (role === 'dept_admin') {
      const u = presetUsers[deptId] || {
        ...presetUsers.education,
        departmentId: deptId,
        name: `${deptId} ክፍል አስተባባሪ`
      };
      setCurrentUser(u);
      localStorage.setItem('ft_user', JSON.stringify(u));
    } else {
      setCurrentUser(presetUsers.student);
      localStorage.setItem('ft_user', JSON.stringify(presetUsers.student));
    }
  };

  /**
   * PERMISSION CHECK 1: Can View Department
   * - 'leadership' (ሥራ አመራር) has all admin access to other classes & departments (OVERSIGHT)
   * - 'dept_admin' can view their own department
   */
  const canViewDepartment = (deptId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'leadership') return true; // Full oversight
    if (currentUser.role === 'dept_admin') return currentUser.departmentId === deptId;
    return true; // public info
  };

  /**
   * PERMISSION CHECK 2: Can Edit Department
   * - 'leadership' (ሥራ አመራር) can ONLY EDIT its own department ('leadership')!
   * - 'dept_admin' can ONLY EDIT their own department!
   */
  const canEditDepartment = (deptId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'leadership') {
      // User requirement: "ሥራ አመራር ክፍል this team should have all the admin access to the other classes or departements but can only edit its departement"
      return deptId === 'leadership';
    }
    if (currentUser.role === 'dept_admin') {
      // User requirement: "the other departements acces will be only their departemnt"
      return currentUser.departmentId === deptId;
    }
    return false;
  };

  /**
   * PERMISSION CHECK 3: Can View All Registrations
   * - 'leadership' sees all student registrations across Sunday school
   */
  const canViewAllRegistrations = (): boolean => {
    if (!currentUser) return false;
    return currentUser.role === 'leadership';
  };

  /**
   * PERMISSION CHECK 4: Can Manage Specific Registration
   * - 'leadership' can approve/enroll any applicant
   * - 'dept_admin' can approve applicants for their department
   */
  const canManageRegistration = (record: StudentRegistrationRecord): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'leadership') return true;
    if (currentUser.role === 'dept_admin') {
      return record.departmentId === currentUser.departmentId;
    }
    return false;
  };

  const addRegistration = (reg: Omit<StudentRegistrationRecord, 'id' | 'registeredAt' | 'status'>) => {
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
  };

  const updateRegistrationStatus = (id: string, status: StudentRegistrationRecord['status'], notes?: string) => {
    const updated = registrations.map((r) => {
      if (r.id === id) {
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
        updateRegistrationStatus
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
