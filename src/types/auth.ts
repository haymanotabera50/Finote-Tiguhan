export type UserRole = 'leadership' | 'dept_admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string; // If dept_admin, which department they manage (e.g. 'education', 'children', 'choir')
  departmentNameAm?: string;
  departmentNameEn?: string;
  studentId?: string; // e.g. 'FT-2026-0814'
  christianName?: string;
  enrolledCourseId?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface DepartmentSettings {
  id: string;
  mottoAm: string;
  mottoEn: string;
  meetingTimeAm: string;
  meetingTimeEn: string;
  announcementAm: string;
  announcementEn: string;
  contactPersonAm: string;
  contactPersonEn: string;
  contactPhone: string;
  updatedAt: string;
}

export interface StudentRegistrationRecord {
  id: string;
  regCode: string;
  fullName: string;
  christianName: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  address: string;
  category: 'children' | 'adult' | 'choir' | 'volunteer';
  departmentId?: string;
  status: 'pending' | 'approved' | 'enrolled' | 'rejected';
  registeredAt: string;
  notes?: string;
}
