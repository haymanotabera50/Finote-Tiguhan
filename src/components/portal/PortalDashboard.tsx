import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCustomization } from '../../context/CustomizationContext';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { Department } from '../../types';
import { 
  Shield, BookOpen, Baby, Music, User, X, CheckCircle2, 
  Clock, AlertTriangle, Edit3, Eye, Lock, Filter, Search, 
  Save, Megaphone, IdCard, Download, ArrowRight, UserCheck 
} from 'lucide-react';

interface PortalDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortalDashboard: React.FC<PortalDashboardProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    logout, 
    switchRole, 
    canViewDepartment, 
    canEditDepartment, 
    canViewAllRegistrations,
    canManageRegistration,
    registrations,
    updateRegistrationStatus
  } = useAuth();

  const { isAmharic } = useLanguage();
  const { announcement, updateAnnouncement, departmentSettings, updateDepartmentSettings } = useCustomization();

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'departments' | 'registrations' | 'announcements' | 'studentCard'>('departments');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('leadership');
  const [regFilterStatus, setRegFilterStatus] = useState<string>('all');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Department edit form state
  const currentDeptSettings = departmentSettings[selectedDeptId] || {
    id: selectedDeptId,
    mottoAm: "",
    mottoEn: "",
    meetingTimeAm: "",
    meetingTimeEn: "",
    announcementAm: "",
    announcementEn: "",
    contactPersonAm: "",
    contactPersonEn: "",
    contactPhone: "",
    updatedAt: ""
  };

  const [editMottoAm, setEditMottoAm] = useState(currentDeptSettings.mottoAm);
  const [editMottoEn, setEditMottoEn] = useState(currentDeptSettings.mottoEn);
  const [editMeetingAm, setEditMeetingAm] = useState(currentDeptSettings.meetingTimeAm);
  const [editMeetingEn, setEditMeetingEn] = useState(currentDeptSettings.meetingTimeEn);
  const [editNoticeAm, setEditNoticeAm] = useState(currentDeptSettings.announcementAm);
  const [editNoticeEn, setEditNoticeEn] = useState(currentDeptSettings.announcementEn);
  const [editContactPerson, setEditContactPerson] = useState(currentDeptSettings.contactPersonAm);
  const [editContactPhone, setEditContactPhone] = useState(currentDeptSettings.contactPhone);

  // Sync form when selected department changes
  const handleSelectDept = (deptId: string) => {
    setSelectedDeptId(deptId);
    const settings = departmentSettings[deptId] || {
      id: deptId,
      mottoAm: "",
      mottoEn: "",
      meetingTimeAm: "",
      meetingTimeEn: "",
      announcementAm: "",
      announcementEn: "",
      contactPersonAm: "",
      contactPersonEn: "",
      contactPhone: "",
      updatedAt: ""
    };
    setEditMottoAm(settings.mottoAm);
    setEditMottoEn(settings.mottoEn);
    setEditMeetingAm(settings.meetingTimeAm);
    setEditMeetingEn(settings.meetingTimeEn);
    setEditNoticeAm(settings.announcementAm);
    setEditNoticeEn(settings.announcementEn);
    setEditContactPerson(settings.contactPersonAm);
    setEditContactPhone(settings.contactPhone);
    setSaveSuccess(false);
  };

  const handleSaveDeptSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditDepartment(selectedDeptId)) return;

    updateDepartmentSettings(selectedDeptId, {
      mottoAm: editMottoAm,
      mottoEn: editMottoEn,
      meetingTimeAm: editMeetingAm,
      meetingTimeEn: editMeetingEn,
      announcementAm: editNoticeAm,
      announcementEn: editNoticeEn,
      contactPersonAm: editContactPerson,
      contactPhone: editContactPhone
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isOpen || !currentUser) return null;

  const isLeadership = currentUser.role === 'leadership';
  const isDeptAdmin = currentUser.role === 'dept_admin';
  const isStudent = currentUser.role === 'student';

  // Filter registrations according to permissions:
  // - Leadership sees all
  // - Dept admin sees only students for their department
  const visibleRegistrations = registrations.filter((reg) => {
    const matchesPermission = isLeadership || (isDeptAdmin && reg.departmentId === currentUser.departmentId);
    const matchesStatus = regFilterStatus === 'all' || reg.status === regFilterStatus;
    return matchesPermission && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#09201e] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#061514] via-[#0f3835] to-[#061514] px-6 py-4 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <EthiopianCross size={22} className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {currentUser.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  {currentUser.role === 'leadership' 
                    ? 'ሥራ አመራር ክፍል' 
                    : currentUser.role === 'dept_admin' 
                    ? `${currentUser.departmentNameAm || 'ክፍል'} አስተባባሪ` 
                    : 'ተማሪ / አባል'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/70 font-mono">
                {currentUser.email}
              </p>
            </div>
          </div>

          {/* Quick Role Switcher Bar */}
          <div className="flex items-center gap-1.5 bg-[#061514] p-1 rounded-xl border border-emerald-900/80">
            <span className="text-[10px] text-emerald-400/80 font-bold px-2 hidden sm:inline">
              {isAmharic ? 'ሚና ቀይር፦' : 'Role:'}
            </span>
            <button
              onClick={() => switchRole('leadership')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isLeadership ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ሥራ አመራር ክፍል (ሙሉ የቁጥጥር ስልጣን)"
            >
              ሥራ አመራር
            </button>
            <button
              onClick={() => switchRole('dept_admin', 'education')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isDeptAdmin && currentUser.departmentId === 'education' ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ትምህርትና ስልጠና ክፍል"
            >
              ትምህርት
            </button>
            <button
              onClick={() => switchRole('dept_admin', 'children')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isDeptAdmin && currentUser.departmentId === 'children' ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ሕጻናት ክፍል"
            >
              ሕፃናት
            </button>
            <button
              onClick={() => switchRole('student')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isStudent ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ተማሪ / አባል"
            >
              ተማሪ
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-emerald-300 hover:text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-emerald-900 bg-[#061514] px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {!isStudent && (
            <>
              <button
                onClick={() => setActiveTab('departments')}
                className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'departments'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-emerald-200/70 hover:text-white'
                }`}
              >
                <Shield size={14} />
                <span>
                  {isLeadership ? (isAmharic ? 'የክፍላት አስተዳደርና ቁጥጥር (14)' : 'Departments Oversight (14)') : (isAmharic ? 'የክፍሌ መረጃ' : 'My Department')}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('registrations')}
                className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'registrations'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-emerald-200/70 hover:text-white'
                }`}
              >
                <UserCheck size={14} />
                <span>
                  {isAmharic ? 'የተማሪዎች ምዝገባ' : 'Student Registrations'} ({visibleRegistrations.length})
                </span>
              </button>

              {isLeadership && (
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'announcements'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-emerald-200/70 hover:text-white'
                  }`}
                >
                  <Megaphone size={14} />
                  <span>{isAmharic ? 'አጠቃላይ የደብር ማስታወቂያ' : 'Global Parish Notice'}</span>
                </button>
              )}
            </>
          )}

          {isStudent && (
            <button
              onClick={() => setActiveTab('studentCard')}
              className="py-3 px-4 border-b-2 border-amber-400 text-amber-400 font-bold flex items-center gap-1.5"
            >
              <IdCard size={14} />
              <span>{isAmharic ? 'የተማሪ ዲጂታል መታወቂያ' : 'Student Digital ID'}</span>
            </button>
          )}
        </div>

        {/* Dashboard Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-emerald-100">
          
          {/* TAB 1: DEPARTMENTS (ROLE-BASED PERMISSION ENFORCEMENT) */}
          {activeTab === 'departments' && !isStudent && (
            <div className="space-y-6">
              {/* Permission Banner Explaining the Rule */}
              <div className="p-4 rounded-2xl bg-[#061514] border border-amber-500/30 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Shield size={20} />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-amber-300 mb-0.5">
                    {isLeadership 
                      ? (isAmharic ? 'የሥራ አመራር ክፍል የቁጥጥር ስልጣን' : 'Executive Leadership Oversight Authority')
                      : (isAmharic ? 'የክፍል አስተባባሪ ፈቃድ' : 'Department Admin Authority')}
                  </div>
                  <p className="text-emerald-200/80 leading-relaxed">
                    {isLeadership
                      ? (isAmharic 
                          ? 'ሥራ አመራር ክፍል ሁሉንም 14 ክፍላትና ክፍሎች በበላይነት ይመለከታል፤ ነገር ግን ማስተካከል የሚችለው የራሱን የሥራ አመራር ክፍል ብቻ ነው።'
                          : 'Executive leadership has oversight access to all 14 departments; editing permissions are restricted strictly to the leadership department.')
                      : (isAmharic
                          ? `እርስዎ የ${currentUser.departmentNameAm || 'ክፍልዎ'} አስተባባሪ በመሆንዎ የራስዎን ክፍል ብቻ ማየትና ማስተካከል ይችላሉ።`
                          : `As coordinator, you have access and editing rights exclusively to your own department.`)}
                  </p>
                </div>
              </div>

              {/* Department Picker Grid */}
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  {isLeadership ? (isAmharic ? 'ክፍል ይምረጡ (ለመመልከት ወይም ለማስተካከል)' : 'Select Department to Inspect') : (isAmharic ? 'የእርስዎ ክፍል' : 'Your Department')}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {departmentsData.map((dept) => {
                    const isAllowedView = canViewDepartment(dept.id);
                    const isSelected = selectedDeptId === dept.id;
                    const canEdit = canEditDepartment(dept.id);

                    if (!isAllowedView && !isLeadership) {
                      return null; // Department admin only sees their own
                    }

                    return (
                      <button
                        key={dept.id}
                        onClick={() => handleSelectDept(dept.id)}
                        className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                            : 'bg-[#061514] border-emerald-900 text-emerald-200/80 hover:border-amber-500/40 hover:text-white'
                        }`}
                      >
                        <span className="truncate w-full">{isAmharic ? dept.nameAm : dept.nameEn}</span>
                        {canEdit ? (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-900 text-emerald-300 font-normal">
                            {isAmharic ? 'ማረም ይቻላል' : 'Editable'}
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300/80 font-normal">
                            {isAmharic ? 'ማየት ብቻ' : 'Read Only'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Department Details & Edit Form */}
              <div className="p-6 rounded-3xl bg-[#061514] border-2 border-emerald-900/80 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      {isAmharic ? 'የተመረጠው ክፍል፦' : 'Selected Department:'}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {departmentsData.find(d => d.id === selectedDeptId)?.nameAm}
                    </h3>
                  </div>

                  {/* Status Indicator */}
                  {canEditDepartment(selectedDeptId) ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <Edit3 size={14} />
                      <span>{isAmharic ? 'የማረም ፈቃድ አለዎት' : 'Editing Rights Granted'}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                      <Eye size={14} />
                      <span>{isAmharic ? 'የሥራ አመራር የቁጥጥር እይታ (ማየት ብቻ)' : 'Leadership Oversight View (Read Only)'}</span>
                    </div>
                  )}
                </div>

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>{isAmharic ? 'የክፍሉ መረጃ በተሳካ ሁኔታ ተሻሽሏል!' : 'Department settings updated successfully!'}</span>
                  </div>
                )}

                <form onSubmit={handleSaveDeptSettings} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'የክፍሉ መሪ ቃል / ጥቅስ (አማርኛ)' : 'Department Spiritual Motto (Amharic)'}
                      </label>
                      <input
                        type="text"
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editMottoAm}
                        onChange={(e) => setEditMottoAm(e.target.value)}
                        placeholder="«በመልካም ሥራ ሁሉ ፍሬ እያፈራችሁ...»"
                        className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'መሪ ቃል (English)' : 'Motto (English)'}
                      </label>
                      <input
                        type="text"
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editMottoEn}
                        onChange={(e) => setEditMottoEn(e.target.value)}
                        placeholder="Bearing fruit in every good work..."
                        className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'ሳምንታዊ የመሰብሰቢያ ሰዓት (አማርኛ)' : 'Meeting Schedule (Amharic)'}
                      </label>
                      <input
                        type="text"
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editMeetingAm}
                        onChange={(e) => setEditMeetingAm(e.target.value)}
                        placeholder="ቅዳሜ ከሰዓት 10:00 ሰዓት"
                        className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'Meeting Schedule (English)' : 'Meeting Schedule (English)'}
                      </label>
                      <input
                        type="text"
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editMeetingEn}
                        onChange={(e) => setEditMeetingEn(e.target.value)}
                        placeholder="Saturdays at 4:00 PM"
                        className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      {isAmharic ? 'የክፍሉ ወቅታዊ ማስታወቂያ (Notice Board)' : 'Department Notice Board Message'}
                    </label>
                    <textarea
                      rows={2}
                      disabled={!canEditDepartment(selectedDeptId)}
                      value={editNoticeAm}
                      onChange={(e) => setEditNoticeAm(e.target.value)}
                      placeholder="ለክፍሉ አባላት የተላለፈ ወቅታዊ መረጃ..."
                      className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'የክፍሉ ተጠሪ / ኃላፊ ስም' : 'Department Contact Person'}
                      </label>
                      <input
                        type="text"
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editContactPerson}
                        onChange={(e) => setEditContactPerson(e.target.value)}
                        placeholder="ስም"
                        className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'ስልክ ቁጥር' : 'Phone Number'}
                      </label>
                      <input
                        type="text"
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editContactPhone}
                        onChange={(e) => setEditContactPhone(e.target.value)}
                        placeholder="+251 91 ..."
                        className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {canEditDepartment(selectedDeptId) ? (
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2 shadow cursor-pointer"
                      >
                        <Save size={14} />
                        <span>{isAmharic ? 'ለውጦችን መዝግብ' : 'Save Changes'}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                      🔒 {isAmharic 
                        ? 'ይህ ክፍል የሚስተካከለው በክፍሉ አስተባባሪ ብቻ ነው። ሥራ አመራር ክፍል በበላይነት ለመመልከት ብቻ ፈቃድ አለው።' 
                        : 'This department can only be modified by its designated coordinator. Leadership has read-only oversight.'}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT REGISTRATIONS MANAGEMENT */}
          {activeTab === 'registrations' && !isStudent && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-900 pb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {isLeadership 
                      ? (isAmharic ? 'የጠቅላላ ተማሪዎች ምዝገባ ቁጥጥር' : 'All Student Registrations Oversight')
                      : (isAmharic ? `የ${currentUser.departmentNameAm || 'ክፍሌ'} ተማሪዎች ምዝገባ` : 'Department Registrations')}
                  </h4>
                  <p className="text-xs text-emerald-200/70">
                    {isLeadership 
                      ? (isAmharic ? 'ሥራ አመራር ክፍል በሁሉም ክፍላት ያሉ ተማሪዎችን ማየትና ማጽደቅ ይችላል' : 'Leadership can inspect and approve enrollments across all divisions')
                      : (isAmharic ? 'የእርስዎ ክፍል ተማሪዎች ዝርዝር' : 'Applicants to your department')}
                  </p>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  {['all', 'pending', 'approved', 'enrolled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setRegFilterStatus(st)}
                      className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                        regFilterStatus === st
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-[#061514] text-emerald-300 border border-emerald-900 hover:border-amber-500/40'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Registrations Table / Card list */}
              <div className="space-y-3">
                {visibleRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="p-4 rounded-2xl bg-[#061514] border border-emerald-900/80 hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                          {reg.regCode}
                        </span>
                        <h5 className="font-bold text-sm text-white">{reg.fullName}</h5>
                        {reg.christianName && (
                          <span className="text-xs text-emerald-300">({reg.christianName})</span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/70">
                        <span>{isAmharic ? 'ዕድሜ፦ ' : 'Age: '}{reg.age}</span>
                        <span>•</span>
                        <span>{isAmharic ? 'ስልክ፦ ' : 'Phone: '}{reg.phone}</span>
                        <span>•</span>
                        <span>{isAmharic ? 'ዘርፍ፦ ' : 'Category: '}{reg.category}</span>
                        <span>•</span>
                        <span>{reg.registeredAt}</span>
                      </div>

                      {reg.notes && (
                        <div className="text-[11px] text-amber-300/80 italic">
                          {reg.notes}
                        </div>
                      )}
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        reg.status === 'enrolled' 
                          ? 'bg-emerald-900 text-emerald-300 border border-emerald-700'
                          : reg.status === 'approved'
                          ? 'bg-blue-900 text-blue-300 border border-blue-700'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {reg.status}
                      </span>

                      {canManageRegistration(reg) && (
                        <div className="flex items-center gap-1.5">
                          {reg.status === 'pending' && (
                            <button
                              onClick={() => updateRegistrationStatus(reg.id, 'approved', 'ተቀባይነት አግኝቷል')}
                              className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs font-bold border border-blue-500/40 transition-colors"
                            >
                              {isAmharic ? 'አጽድቅ' : 'Approve'}
                            </button>
                          )}
                          {reg.status !== 'enrolled' && (
                            <button
                              onClick={() => updateRegistrationStatus(reg.id, 'enrolled', 'በክፍሉ ተመዝግቧል')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 text-xs font-bold border border-emerald-500/40 transition-colors"
                            >
                              {isAmharic ? 'መዝግብ' : 'Enroll'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {visibleRegistrations.length === 0 && (
                  <div className="py-12 text-center text-xs text-emerald-300/60">
                    {isAmharic ? 'ምንም የተመዘገበ ተማሪ አልተገኘም።' : 'No student registrations found for this filter.'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: GLOBAL PARISH NOTICE (EXCLUSIVE TO LEADERSHIP) */}
          {activeTab === 'announcements' && isLeadership && (
            <div className="p-6 rounded-3xl bg-[#061514] border-2 border-emerald-900/80 space-y-5">
              <div className="flex items-center gap-3 border-b border-emerald-900 pb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <Megaphone size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {isAmharic ? 'አጠቃላይ የደብርና የሰንበት ት/ቤት ማስታወቂያ (ከላይ የሚታየው ባነር)' : 'Parish Header Announcement Banner'}
                  </h4>
                  <p className="text-xs text-emerald-200/70">
                    {isAmharic ? 'ይህንን ባነር ማስተካከል የሚችለው ሥራ አመራር ክፍል ብቻ ነው።' : 'Only executive leadership is authorized to update this parish-wide banner.'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcement.enabled}
                    onChange={(e) => updateAnnouncement({ enabled: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs font-bold text-white">
                    {isAmharic ? 'ማስታወቂያው በድረ-ገጹ አናት ላይ ይታይ' : 'Enable global banner at top of site'}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      {isAmharic ? 'ባጅ / ርዕስ (አማርኛ)' : 'Badge Label (Amharic)'}
                    </label>
                    <input
                      type="text"
                      value={announcement.badgeAm}
                      onChange={(e) => updateAnnouncement({ badgeAm: e.target.value })}
                      className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      {isAmharic ? 'Badge Label (English)' : 'Badge Label (English)'}
                    </label>
                    <input
                      type="text"
                      value={announcement.badgeEn}
                      onChange={(e) => updateAnnouncement({ badgeEn: e.target.value })}
                      className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    {isAmharic ? 'የማስታወቂያው መልዕክት (አማርኛ)' : 'Announcement Text (Amharic)'}
                  </label>
                  <textarea
                    rows={2}
                    value={announcement.textAm}
                    onChange={(e) => updateAnnouncement({ textAm: e.target.value })}
                    className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    {isAmharic ? 'Announcement Text (English)' : 'Announcement Text (English)'}
                  </label>
                  <textarea
                    rows={2}
                    value={announcement.textEn}
                    onChange={(e) => updateAnnouncement({ textEn: e.target.value })}
                    className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  ✅ {isAmharic ? 'ለውጦች ወዲያውኑ በድረ-ገጹ ላይ ተግባራዊ ሆነዋል።' : 'Changes apply live across the portal.'}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STUDENT DIGITAL ID CARD (EXCLUSIVE TO STUDENTS) */}
          {(activeTab === 'studentCard' || isStudent) && (
            <div className="max-w-md mx-auto space-y-6">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c2a27] via-[#081f1d] to-[#040e0d] border-2 border-amber-400 shadow-2xl relative overflow-hidden text-left">
                {/* Gold Crest Header */}
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <EthiopianCross size={18} className="text-amber-400" />
                    <div>
                      <div className="text-[10px] text-amber-300 font-bold uppercase">
                        {isAmharic ? 'የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል' : 'Lafto Debre Teguhan St. Michael'}
                      </div>
                      <div className="text-xs font-bold text-white">
                        {isAmharic ? 'ፍኖተ ትጉሃን ሰንበት ት/ቤት' : 'Finote Teguhan Sunday School'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-amber-500 text-black rounded font-mono">
                    2026/27
                  </span>
                </div>

                {/* Student Photo & Details */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-300 text-xl shrink-0">
                    <User size={32} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{currentUser.name}</h4>
                    {currentUser.christianName && (
                      <div className="text-xs text-amber-300 font-serif">
                        {isAmharic ? 'የክርስትና ስም፦ ' : 'Baptismal: '}{currentUser.christianName}
                      </div>
                    )}
                    <div className="text-xs text-emerald-300/80 font-mono mt-0.5">
                      {currentUser.studentId || 'FT-849201'}
                    </div>
                  </div>
                </div>

                {/* Course & Division Details */}
                <div className="p-3 rounded-xl bg-[#040e0d] border border-emerald-900/80 space-y-1 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">{isAmharic ? 'የትምህርት ክፍል፦' : 'Division:'}</span>
                    <span className="font-bold text-white">የማቴዎስ ምድብ (ሕፃናት)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">{isAmharic ? 'የክፍል ሰዓት፦' : 'Schedule:'}</span>
                    <span className="font-bold text-amber-300">እሁድ 3:30 - 5:30 ጠዋት</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/70">{isAmharic ? 'ሁኔታ፦' : 'Status:'}</span>
                    <span className="font-bold text-emerald-400">ተመዝግቧል (Active)</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="pt-2 border-t border-emerald-950 flex flex-col items-center gap-1">
                  <div className="h-6 w-44 bg-gradient-to-r from-amber-400 via-white to-amber-400 opacity-60 rounded" />
                  <span className="text-[9px] font-mono text-emerald-400/60">
                    {currentUser.studentId || 'FT-849201'} • VERIFIED MEMBER
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => alert(isAmharic ? "መታወቂያው በPDF ተዘጋጅቷል!" : "Digital ID card ready for download!")}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2 shadow cursor-pointer"
                >
                  <Download size={14} />
                  <span>{isAmharic ? "መታወቂያውን አውርድ (PDF)" : "Download ID Card"}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
