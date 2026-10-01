import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCustomization } from '../../context/CustomizationContext';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { DepartmentTaskItem } from '../../types';
import { 
  Shield, BookOpen, Baby, Music, User, X, CheckCircle2, 
  Clock, AlertTriangle, Edit3, Eye, Lock, Filter, Search, 
  Save, Megaphone, IdCard, Download, ArrowRight, UserCheck,
  ListTodo, Check, Plus, Trash2, FileText, Layers, Award,
  CheckCircle, ChevronRight, Bookmark, MapPin, Phone, Send,
  Globe, Building2, Sparkles, ExternalLink
} from 'lucide-react';

interface PortalDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  initialDeptId?: string;
}

export const PortalDashboard: React.FC<PortalDashboardProps> = ({ 
  isOpen, 
  onClose,
  initialDeptId = 'leadership'
}) => {
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
  const { 
    announcement, 
    updateAnnouncement, 
    departmentSettings, 
    updateDepartmentSettings,
    departmentTasks,
    updateTaskStatus,
    addTask,
    deleteTask
  } = useCustomization();

  const isLeadership = currentUser?.role === 'leadership';
  const isDeptAdmin = currentUser?.role === 'dept_admin';
  const isStudent = currentUser?.role === 'student';

  // Determine starting department
  const startingDeptId = isDeptAdmin && currentUser?.departmentId 
    ? currentUser.departmentId 
    : (initialDeptId || 'leadership');

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'departments' | 'registrations' | 'announcements' | 'studentCard'>(
    isStudent ? 'studentCard' : 'departments'
  );
  const [deptSubTab, setDeptSubTab] = useState<'content' | 'tasks' | 'students' | 'preview'>('content');
  const [selectedDeptId, setSelectedDeptId] = useState<string>(startingDeptId);
  const [regFilterStatus, setRegFilterStatus] = useState<string>('all');
  const [taskFilterStatus, setTaskFilterStatus] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');
  const [deptSearchQuery, setDeptSearchQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New task form state
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubUnit, setNewTaskSubUnit] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'planned' | 'in_progress' | 'completed'>('planned');

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
    updatedAt: "",
    meetingLocationAm: "",
    telegramLink: "",
    descriptionAm: "",
    objectiveAm: ""
  };

  const currentDeptObj = departmentsData.find(d => d.id === selectedDeptId) || departmentsData[0];

  const [editMottoAm, setEditMottoAm] = useState(currentDeptSettings.mottoAm || currentDeptObj?.tasksAm?.[0] || '');
  const [editMottoEn, setEditMottoEn] = useState(currentDeptSettings.mottoEn || '');
  const [editMeetingAm, setEditMeetingAm] = useState(currentDeptSettings.meetingTimeAm || 'ቅዳሜ ከሰዓት 10:00 ሰዓት');
  const [editMeetingEn, setEditMeetingEn] = useState(currentDeptSettings.meetingTimeEn || 'Saturdays at 4:00 PM');
  const [editMeetingLocation, setEditMeetingLocation] = useState(currentDeptSettings.meetingLocationAm || 'የሰንበት ት/ቤት ዋና አዳራሽ');
  const [editNoticeAm, setEditNoticeAm] = useState(currentDeptSettings.announcementAm || '');
  const [editNoticeEn, setEditNoticeEn] = useState(currentDeptSettings.announcementEn || '');
  const [editContactPerson, setEditContactPerson] = useState(currentDeptSettings.contactPersonAm || '');
  const [editContactPhone, setEditContactPhone] = useState(currentDeptSettings.contactPhone || '+251 91 ...');
  const [editTelegramLink, setEditTelegramLink] = useState(currentDeptSettings.telegramLink || 'https://t.me/finoteteguhan');
  const [editDescriptionAm, setEditDescriptionAm] = useState(currentDeptSettings.descriptionAm || currentDeptObj?.descAm || '');
  const [editObjectiveAm, setEditObjectiveAm] = useState(currentDeptSettings.objectiveAm || currentDeptObj?.objectiveAm || '');

  // Sync form when selected department changes
  const handleSelectDept = (deptId: string) => {
    setSelectedDeptId(deptId);
    setShowAddTaskForm(false);
    const targetObj = departmentsData.find(d => d.id === deptId) || departmentsData[0];
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
      updatedAt: "",
      meetingLocationAm: "",
      telegramLink: "",
      descriptionAm: "",
      objectiveAm: ""
    };
    setEditMottoAm(settings.mottoAm || targetObj?.tasksAm?.[0] || '');
    setEditMottoEn(settings.mottoEn || '');
    setEditMeetingAm(settings.meetingTimeAm || 'ቅዳሜ ከሰዓት 10:00 ሰዓት');
    setEditMeetingEn(settings.meetingTimeEn || 'Saturdays at 4:00 PM');
    setEditMeetingLocation(settings.meetingLocationAm || 'የሰንበት ት/ቤት ዋና አዳራሽ');
    setEditNoticeAm(settings.announcementAm || '');
    setEditNoticeEn(settings.announcementEn || '');
    setEditContactPerson(settings.contactPersonAm || '');
    setEditContactPhone(settings.contactPhone || '+251 91 ...');
    setEditTelegramLink(settings.telegramLink || 'https://t.me/finoteteguhan');
    setEditDescriptionAm(settings.descriptionAm || targetObj?.descAm || '');
    setEditObjectiveAm(settings.objectiveAm || targetObj?.objectiveAm || '');
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
      meetingLocationAm: editMeetingLocation,
      announcementAm: editNoticeAm,
      announcementEn: editNoticeEn,
      contactPersonAm: editContactPerson,
      contactPhone: editContactPhone,
      telegramLink: editTelegramLink,
      descriptionAm: editDescriptionAm,
      objectiveAm: editObjectiveAm
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !canEditDepartment(selectedDeptId)) return;

    addTask(selectedDeptId, {
      titleAm: newTaskTitle.trim(),
      subUnitAm: newTaskSubUnit.trim() || "አጠቃላይ አገልግሎት",
      status: newTaskStatus,
      articleRef: currentDeptObj?.articleRef || "ደንብ"
    });

    setNewTaskTitle('');
    setNewTaskSubUnit('');
    setNewTaskStatus('planned');
    setShowAddTaskForm(false);
  };

  const handleCycleTaskStatus = (task: DepartmentTaskItem) => {
    if (!canEditDepartment(selectedDeptId)) return;
    const nextStatusMap: Record<DepartmentTaskItem['status'], DepartmentTaskItem['status']> = {
      planned: 'in_progress',
      in_progress: 'completed',
      completed: 'planned'
    };
    updateTaskStatus(selectedDeptId, task.id, nextStatusMap[task.status]);
  };

  if (!isOpen || !currentUser) return null;

  const currentTasks = departmentTasks[selectedDeptId] || [];

  // Filter tasks by status
  const filteredTasks = currentTasks.filter(t => {
    if (taskFilterStatus === 'all') return true;
    return t.status === taskFilterStatus;
  });

  const totalTasksCount = currentTasks.length;
  const completedTasksCount = currentTasks.filter(t => t.status === 'completed').length;
  const inProgressTasksCount = currentTasks.filter(t => t.status === 'in_progress').length;
  const plannedTasksCount = currentTasks.filter(t => t.status === 'planned').length;
  const progressPct = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Filter registrations for this specific department vs all
  const deptRegistrations = registrations.filter(r => {
    const matchesDept = r.departmentId === selectedDeptId || (selectedDeptId === 'children' && r.category === 'children');
    if (regFilterStatus === 'all') return matchesDept;
    return matchesDept && r.status === regFilterStatus;
  });

  const allFilteredRegistrations = registrations.filter(r => {
    if (regFilterStatus === 'all') return true;
    return r.status === regFilterStatus;
  });

  const visibleRegistrations = isLeadership ? allFilteredRegistrations : deptRegistrations;

  // Filter departments for leadership selector
  const selectableDepts = departmentsData.filter(d => 
    !deptSearchQuery ||
    d.nameAm.toLowerCase().includes(deptSearchQuery.toLowerCase()) ||
    d.nameEn.toLowerCase().includes(deptSearchQuery.toLowerCase()) ||
    d.articleRef.toLowerCase().includes(deptSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl bg-[#081f1c] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#041211] via-[#092b27] to-[#041211] px-6 py-4 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Building2 size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {isAmharic ? 'የፍኖተ ትጉሃን የአስተዳደርና የ14ቱ ክፍላት ማዕከል' : 'Department CMS & Admin Portal'}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isLeadership ? 'ዋና አመራር (Super Admin)' : isDeptAdmin ? 'የክፍል አስተባባሪ (Coordinator)' : 'ተማሪ (Student)'}
                </span>
              </div>
              <p className="text-xs text-emerald-200/70">
                {currentUser.name} • {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-xl border border-rose-500/40 hover:border-rose-400 text-rose-300 hover:text-white hover:bg-rose-500/20 text-xs font-bold transition-all cursor-pointer"
            >
              {isAmharic ? 'ውጣ' : 'Sign Out'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-emerald-200/60 hover:text-white transition-colors"
              title={isAmharic ? 'ዝጋ' : 'Close'}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex border-b border-emerald-900 bg-[#051614] px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {!isStudent && (
            <>
              {/* TAB: 14 DEPARTMENTS PAGE MANAGER */}
              <button
                type="button"
                onClick={() => setActiveTab('departments')}
                className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'departments'
                    ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                    : 'border-transparent text-emerald-200/70 hover:text-white'
                }`}
              >
                <Building2 size={16} />
                <span>
                  {isLeadership 
                    ? (isAmharic ? '🏛️ የ14ቱ ክፍላት ገጽ ማስተዳደሪያ (14 Departments)' : '14 Departments Manager') 
                    : (isAmharic ? `🏛️ የ${currentDeptObj.nameAm} ገጽ ማስተዳደሪያ` : 'Department Page Manager')}
                </span>
              </button>

              {/* TAB: REGISTRATIONS */}
              <button
                type="button"
                onClick={() => setActiveTab('registrations')}
                className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'registrations'
                    ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                    : 'border-transparent text-emerald-200/70 hover:text-white'
                }`}
              >
                <UserCheck size={16} />
                <span>
                  {isAmharic ? '📋 የተማሪዎች ምዝገባ' : 'Registrations'} ({visibleRegistrations.length})
                </span>
              </button>

              {/* TAB: GLOBAL ANNOUNCEMENT (Leadership only) */}
              {isLeadership && (
                <button
                  type="button"
                  onClick={() => setActiveTab('announcements')}
                  className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'announcements'
                      ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                      : 'border-transparent text-emerald-200/70 hover:text-white'
                  }`}
                >
                  <Megaphone size={16} />
                  <span>{isAmharic ? '📢 አጠቃላይ ማስታወቂያ' : 'Parish Notice Banner'}</span>
                </button>
              )}
            </>
          )}

          {/* TAB: STUDENT ID CARD (Students only) */}
          {isStudent && (
            <button
              type="button"
              onClick={() => setActiveTab('studentCard')}
              className={`py-3 px-4 border-b-2 font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'studentCard'
                  ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                  : 'border-transparent text-emerald-200/70 hover:text-white'
              }`}
            >
              <IdCard size={16} />
              <span>{isAmharic ? 'የተማሪ ዲጂታል መታወቂያ' : 'Student Digital ID'}</span>
            </button>
          )}
        </div>

        {/* Dashboard Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-emerald-100">

          {/* ========================================================================= */}
          {/* TAB: 14 DEPARTMENTS PAGE MANAGER (CORE REQUEST)                          */}
          {/* ========================================================================= */}
          {activeTab === 'departments' && !isStudent && (
            <div className="space-y-6">
              
              {/* Department Header & Authority Card */}
              <div className="p-5 rounded-3xl bg-[#041211] border-2 border-emerald-900/80 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/40 text-amber-400 shrink-0">
                    <EthiopianCross size={28} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        📜 {currentDeptObj.articleRef}
                      </span>
                      <span className="text-xs text-emerald-300/80">• {currentDeptObj.category}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {isAmharic ? currentDeptObj.nameAm : currentDeptObj.nameEn}
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1 max-w-2xl">
                      {isAmharic ? currentDeptObj.descAm : currentDeptObj.descEn}
                    </p>
                  </div>
                </div>

                {/* Authority Rights Badge */}
                <div className="shrink-0">
                  {canEditDepartment(selectedDeptId) ? (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                      <Edit3 size={14} />
                      <span>{isAmharic ? 'የማረም ሙሉ ፈቃድ አለዎት' : 'Editing Rights Granted'}</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                      <Eye size={14} />
                      <span>{isAmharic ? 'የሥራ አመራር ቁጥጥር (ማየት ብቻ)' : 'Leadership Oversight (Read-Only)'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Department Selector (For Leadership: allows picking any of the 14 departments) */}
              {isLeadership && (
                <div className="space-y-2 bg-[#051614] p-4 rounded-2xl border border-emerald-900/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <Shield size={14} />
                      <span>{isAmharic ? 'የሥራ አመራር ቁጥጥር፦ ለማስተዳደር ወይም ለመመልከት ክፍል ይምረጡ' : 'Select Department to Manage / Inspect:'}</span>
                    </div>

                    <div className="relative w-full sm:w-56">
                      <Search size={13} className="absolute left-3 top-2 text-emerald-400/60" />
                      <input
                        type="text"
                        value={deptSearchQuery}
                        onChange={(e) => setDeptSearchQuery(e.target.value)}
                        placeholder={isAmharic ? "ክፍል ፈልግ..." : "Filter..."}
                        className="w-full pl-8 pr-3 py-1 bg-[#040e0d] border border-emerald-800 rounded-lg text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1 max-h-48 overflow-y-auto">
                    {selectableDepts.map((d) => {
                      const isSelected = selectedDeptId === d.id;
                      const canEdit = canEditDepartment(d.id);

                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => handleSelectDept(d.id)}
                          className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                              : 'bg-[#040e0d] text-emerald-200/80 border-emerald-900/80 hover:border-amber-500/40 hover:text-white'
                          }`}
                        >
                          <div className="truncate font-semibold">{isAmharic ? d.nameAm : d.nameEn}</div>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className={isSelected ? 'text-slate-900' : 'text-amber-400/80 font-mono'}>
                              {d.articleRef.split('፣')[1]?.trim() || d.articleRef}
                            </span>
                            {canEdit && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="የማረም ፈቃድ" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Department Management Sub-Tabs */}
              <div className="flex border-b border-emerald-900 bg-[#051614] rounded-2xl p-1 gap-1">
                {[
                  { id: 'content', labelAm: '📝 የገጽ ይዘትና መገለጫ', labelEn: 'Page Profile & Content', icon: Edit3 },
                  { id: 'tasks', labelAm: `📋 የሥራ ዕቅድና ተግባራት (${completedTasksCount}/${totalTasksCount})`, labelEn: 'Tasks & Mandates', icon: ListTodo },
                  { id: 'students', labelAm: `👥 ተመዝጋቢዎች (${deptRegistrations.length})`, labelEn: 'Registrations', icon: UserCheck },
                  { id: 'preview', labelAm: '👁️ የቀጥታ ገጽ እይታ', labelEn: 'Live Preview', icon: Eye }
                ].map((sub) => {
                  const isActive = deptSubTab === sub.id;
                  const Icon = sub.icon;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setDeptSubTab(sub.id as any)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                          : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={14} />
                      <span className="truncate">{isAmharic ? sub.labelAm : sub.labelEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* SUB-TAB 1: PAGE CONTENT & PROFILE FORM */}
              {deptSubTab === 'content' && (
                <div className="p-6 rounded-3xl bg-[#041211] border-2 border-emerald-900/80 space-y-6">
                  <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span>{isAmharic ? `የ${currentDeptObj.nameAm} ገጽ ይዘቶች ማስተዳደሪያ` : 'Department Page Content Settings'}</span>
                        <Sparkles size={16} className="text-amber-400" />
                      </h4>
                      <p className="text-xs text-emerald-200/70">
                        {isAmharic 
                          ? 'እዚህ የሚያስቀምጧቸው መረጃዎች በክፍሉ ይፋዊ ገጽ ላይ ለሰንበት ት/ቤት አባላት ይታያሉ' 
                          : 'Changes made here reflect live on the public parish department view'}
                      </p>
                    </div>

                    {saveSuccess && (
                      <div className="p-2 px-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                        <CheckCircle2 size={15} />
                        <span>{isAmharic ? 'የክፍሉ መረጃ በተሳካ ሁኔታ ተቀምጧል!' : 'Saved successfully!'}</span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSaveDeptSettings} className="space-y-4">
                    {/* Motto */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? 'የክፍሉ መሪ ቃል / የመጽሐፍ ቅዱስ ጥቅስ (አማርኛ)' : 'Spiritual Motto & Verse (Amharic)'}
                        </label>
                        <input
                          type="text"
                          disabled={!canEditDepartment(selectedDeptId)}
                          value={editMottoAm}
                          onChange={(e) => setEditMottoAm(e.target.value)}
                          placeholder="«በመልካም ሥራ ሁሉ ፍሬ እያፈራችሁ...»"
                          className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? 'መሪ ቃል (English)' : 'Spiritual Motto (English)'}
                        </label>
                        <input
                          type="text"
                          disabled={!canEditDepartment(selectedDeptId)}
                          value={editMottoEn}
                          onChange={(e) => setEditMottoEn(e.target.value)}
                          placeholder="Bearing fruit in every good work..."
                          className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Meeting Time & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? 'ሳምንታዊ የመሰብሰቢያ ሰዓትና ቀን' : 'Weekly Meeting Schedule'}
                        </label>
                        <input
                          type="text"
                          disabled={!canEditDepartment(selectedDeptId)}
                          value={editMeetingAm}
                          onChange={(e) => setEditMeetingAm(e.target.value)}
                          placeholder="ቅዳሜ ከሰዓት 10:00 ሰዓት"
                          className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? 'የመሰብሰቢያ ቦታ / አዳራሽ' : 'Meeting Hall / Location'}
                        </label>
                        <input
                          type="text"
                          disabled={!canEditDepartment(selectedDeptId)}
                          value={editMeetingLocation}
                          onChange={(e) => setEditMeetingLocation(e.target.value)}
                          placeholder="የሰንበት ት/ቤት ዋና አዳራሽ"
                          className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? 'የቴሌግራም ወይም ይፋዊ ቻናል ሊንክ' : 'Telegram / Social Link'}
                        </label>
                        <input
                          type="text"
                          disabled={!canEditDepartment(selectedDeptId)}
                          value={editTelegramLink}
                          onChange={(e) => setEditTelegramLink(e.target.value)}
                          placeholder="https://t.me/finoteteguhan"
                          className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Notice Board */}
                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'ወቅታዊ የክፍሉ ማስታወቂያ (Department Notice Board)' : 'Department Notice Board Message'}
                      </label>
                      <textarea
                        rows={3}
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editNoticeAm}
                        onChange={(e) => setEditNoticeAm(e.target.value)}
                        placeholder="ለክፍሉ አባላትና ለሰንበት ት/ቤት ተማሪዎች የሚተላለፍ ወቅታዊ መልዕክት..."
                        className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Contact Person & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? 'የክፍሉ ተጠሪ / አስተባባሪ ስም' : 'Coordinator / Contact Person'}
                        </label>
                        <input
                          type="text"
                          disabled={!canEditDepartment(selectedDeptId)}
                          value={editContactPerson}
                          onChange={(e) => setEditContactPerson(e.target.value)}
                          placeholder="ዲ/ን ዮሐንስ (ዋና ጸሐፊ)"
                          className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-amber-300 mb-1">
                          {isAmharic ? 'ስልክ ቁጥር (Phone Number)' : 'Contact Phone'}
                        </label>
                        <input
                          type="text"
                          disabled={!canEditDepartment(selectedDeptId)}
                          value={editContactPhone}
                          onChange={(e) => setEditContactPhone(e.target.value)}
                          placeholder="+251 91 123 4567"
                          className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* About Description */}
                    <div>
                      <label className="block text-xs font-semibold text-amber-300 mb-1">
                        {isAmharic ? 'ስለ ክፍሉ አጠቃላይ መግለጫና ዓላማ (About the Department)' : 'About & Mission Description'}
                      </label>
                      <textarea
                        rows={3}
                        disabled={!canEditDepartment(selectedDeptId)}
                        value={editDescriptionAm}
                        onChange={(e) => setEditDescriptionAm(e.target.value)}
                        placeholder="የክፍሉ አጠቃላይ አገልግሎትና ራዕይ..."
                        className="w-full px-3.5 py-2.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Save Button */}
                    {canEditDepartment(selectedDeptId) ? (
                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                        >
                          <Save size={15} />
                          <span>{isAmharic ? '💾 ለውጦቹን አስቀምጥና አትም (Save & Publish)' : 'Save & Publish Page'}</span>
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
              )}

              {/* SUB-TAB 2: ANNUAL TASKS & ACTION PLAN */}
              {deptSubTab === 'tasks' && (
                <div className="space-y-6">
                  {/* Progress Stats Bar */}
                  <div className="p-4 rounded-2xl bg-[#041211] border border-emerald-900/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-white">{isAmharic ? 'የክፍሉ ዓመታዊ የዕቅድ አፈጻጸም፦' : 'Annual Tasks Progress:'}</span>
                        <span className="text-amber-400 font-bold ml-1">{completedTasksCount} ከ {totalTasksCount} ተጠናቅቀዋል ({progressPct}%)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-700">✓ {completedTasksCount} የተጠናቀቀ</span>
                        <span className="px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700">⏳ {inProgressTasksCount} በሂደት</span>
                        <span className="px-2 py-0.5 rounded bg-amber-900/40 text-amber-300 border border-amber-700">○ {plannedTasksCount} የታቀደ</span>
                      </div>
                    </div>

                    <div className="w-full h-2.5 bg-[#09201e] rounded-full overflow-hidden border border-emerald-900">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Tasks Control Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Status Filter */}
                    <div className="flex items-center gap-1.5 text-xs">
                      {[
                        { id: 'all', label: isAmharic ? 'ሁሉም' : 'All' },
                        { id: 'planned', label: isAmharic ? 'የታቀደ' : 'Planned' },
                        { id: 'in_progress', label: isAmharic ? 'በሂደት ላይ' : 'In Progress' },
                        { id: 'completed', label: isAmharic ? 'የተጠናቀቀ' : 'Completed' }
                      ].map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setTaskFilterStatus(st.id as any)}
                          className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                            taskFilterStatus === st.id
                              ? 'bg-amber-500 text-slate-950 font-bold shadow'
                              : 'bg-[#041211] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>

                    {/* Add Custom Task Button */}
                    {canEditDepartment(selectedDeptId) && (
                      <button
                        type="button"
                        onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                        className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                      >
                        <Plus size={14} />
                        <span>{isAmharic ? 'አዲስ ተግባር / ዕቅድ መዝግብ' : 'Add New Task'}</span>
                      </button>
                    )}
                  </div>

                  {/* Add New Task Modal/Inline Form */}
                  {showAddTaskForm && canEditDepartment(selectedDeptId) && (
                    <form onSubmit={handleAddNewTask} className="p-4 rounded-2xl bg-[#071c19] border-2 border-amber-500/40 space-y-3">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <Plus size={15} />
                        <span>{isAmharic ? 'አዲስ የተግባር ዕቅድ ማከል' : 'Create New Action Task'}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                            {isAmharic ? 'የተግባሩ አርዕስት / ዝርዝር' : 'Task Title / Duty'}
                          </label>
                          <input
                            type="text"
                            required
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="ምሳሌ፦ የሩብ ዓመት ሪፖርት ማዘጋጀት..."
                            className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                            {isAmharic ? 'ንዑስ ክፍል / ኃላፊ' : 'Sub-Unit / Assignee'}
                          </label>
                          <input
                            type="text"
                            value={newTaskSubUnit}
                            onChange={(e) => setNewTaskSubUnit(e.target.value)}
                            placeholder="ምሳሌ፦ አጠቃላይ ሥራ አመራር"
                            className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddTaskForm(false)}
                          className="px-3 py-1.5 rounded-lg text-xs text-emerald-300 hover:text-white"
                        >
                          {isAmharic ? 'ሰርዝ' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer"
                        >
                          {isAmharic ? 'አስቀምጥ' : 'Save Task'}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Task Items List */}
                  <div className="space-y-2.5">
                    {filteredTasks.map((task) => {
                      const canEdit = canEditDepartment(selectedDeptId);

                      return (
                        <div 
                          key={task.id}
                          className="p-3.5 rounded-2xl bg-[#041211] border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              disabled={!canEdit}
                              onClick={() => handleCycleTaskStatus(task)}
                              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                task.status === 'completed'
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                  : task.status === 'in_progress'
                                  ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                                  : 'bg-transparent border-emerald-800 text-transparent'
                              } ${canEdit ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                              title={isAmharic ? 'ሁኔታ ቀይር' : 'Toggle status'}
                            >
                              {task.status === 'completed' ? <Check size={14} strokeWidth={3} /> : task.status === 'in_progress' ? '⏳' : null}
                            </button>

                            <div>
                              <div className={`text-xs font-bold ${task.status === 'completed' ? 'line-through text-emerald-300/60' : 'text-white'}`}>
                                {task.titleAm}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-emerald-300/70">
                                {task.subUnitAm && (
                                  <span className="px-2 py-0.5 rounded-md bg-[#071c19] border border-emerald-900 text-amber-300/90 font-medium">
                                    {task.subUnitAm}
                                  </span>
                                )}
                                {task.articleRef && (
                                  <span className="font-mono text-emerald-400/70">
                                    {task.articleRef}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              type="button"
                              disabled={!canEdit}
                              onClick={() => handleCycleTaskStatus(task)}
                              className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase border transition-all ${
                                task.status === 'completed'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                  : task.status === 'in_progress'
                                  ? 'bg-blue-950 text-blue-300 border-blue-700'
                                  : 'bg-amber-950 text-amber-300 border-amber-700'
                              } ${canEdit ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}`}
                            >
                              {task.status === 'completed' 
                                ? (isAmharic ? '✓ የተጠናቀቀ' : 'Completed') 
                                : task.status === 'in_progress'
                                ? (isAmharic ? '⏳ በሂደት ላይ' : 'In Progress')
                                : (isAmharic ? '○ የታቀደ' : 'Planned')}
                            </button>

                            {canEdit && task.id.includes('custom') && (
                              <button
                                type="button"
                                onClick={() => deleteTask(selectedDeptId, task.id)}
                                className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                                title="ሰርዝ"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {filteredTasks.length === 0 && (
                      <div className="py-8 text-center text-xs text-emerald-300/60 bg-[#041211] rounded-2xl border border-dashed border-emerald-900">
                        {isAmharic ? 'በዚህ ምድብ ውስጥ የተመዘገበ ተግባር የለም።' : 'No tasks found for this filter.'}
                      </div>
                    )}
                  </div>

                  {/* Statutory Duties List from Bylaws */}
                  <div className="p-5 rounded-3xl bg-[#041211] border border-emerald-900/80 space-y-3">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <FileText size={15} />
                      <span>{isAmharic ? 'ዋና ዋና ተግባራትና ኃላፊነቶች (በመተዳደሪያ ደንቡ አንቀጽ መሠረት)' : 'Statutory Core Bylaws Duties'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentDeptObj.tasksAm.map((duty, idx) => (
                        <div 
                          key={idx}
                          className="p-3 rounded-xl bg-[#071c19] border border-emerald-900/60 flex items-start gap-2.5 text-xs text-emerald-100/90 leading-relaxed"
                        >
                          <span className="font-mono text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                          <span>{duty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: DEPARTMENT REGISTRATIONS */}
              {deptSubTab === 'students' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-900 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {isAmharic ? `ለ${currentDeptObj.nameAm} የተመዘገቡ ተማሪዎችና አባላት` : 'Enrolled Students & Members'}
                      </h4>
                      <p className="text-xs text-emerald-200/70">
                        {isAmharic ? 'ለዚህ ክፍል የተመደቡ ተማሪዎችን ሁኔታ ያጽድቁ ወይም ይቆጣጠሩ' : 'Review and manage applicants for this department'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs">
                      {['all', 'pending', 'approved', 'enrolled'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setRegFilterStatus(st)}
                          className={`px-3 py-1 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                            regFilterStatus === st
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-[#041211] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {deptRegistrations.map((reg) => {
                      const canManage = canManageRegistration(reg);

                      return (
                        <div 
                          key={reg.id}
                          className="p-4 rounded-2xl bg-[#041211] border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 font-bold text-xs shrink-0">
                              {reg.category === 'children' ? <Baby size={18} /> : <User size={18} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-xs">{reg.fullName}</span>
                                <span className="text-[10px] font-mono text-emerald-400/80">{reg.regCode}</span>
                              </div>
                              <div className="text-[11px] text-emerald-200/70 mt-0.5">
                                {reg.christianName && <span>ክርስትና ስም፦ {reg.christianName} • </span>}
                                <span>ዕድሜ፦ {reg.age} • </span>
                                <span>ስልክ፦ {reg.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                              reg.status === 'approved' || reg.status === 'enrolled'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                : reg.status === 'pending'
                                ? 'bg-amber-950 text-amber-300 border-amber-700'
                                : 'bg-rose-950 text-rose-300 border-rose-700'
                            }`}>
                              {reg.status}
                            </span>

                            {canManage && reg.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => updateRegistrationStatus(reg.id, 'approved', 'በክፍሉ አስተባባሪ ጸድቋል')}
                                className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                              >
                                {isAmharic ? 'አጽድቅ' : 'Approve'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {deptRegistrations.length === 0 && (
                      <div className="py-8 text-center text-xs text-emerald-300/60 bg-[#041211] rounded-2xl border border-dashed border-emerald-900">
                        {isAmharic ? 'ለዚህ ክፍል የተመዘገበ ተማሪ አልተገኘም።' : 'No registered students for this department.'}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: LIVE DEPARTMENT PAGE PREVIEW */}
              {deptSubTab === 'preview' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Eye size={15} />
                      <span>{isAmharic ? 'የክፍሉ ይፋዊ ገጽ የቀጥታ እይታ (Church Public View)' : 'Live Public Department Page Preview'}</span>
                    </span>
                    <span className="text-[11px] text-emerald-300">ያስተካከሏቸው መረጃዎች በሙሉ በቀጥታ እዚህ ይታያሉ</span>
                  </div>

                  {/* Rendered Live Card Preview */}
                  <div className="p-8 rounded-3xl bg-gradient-to-b from-[#092b27] via-[#061e1b] to-[#041211] border-2 border-amber-400 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-500/30 pb-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-lg">
                          <EthiopianCross size={32} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                              📜 {currentDeptObj.articleRef}
                            </span>
                            <span className="text-xs text-emerald-300">ፍኖተ ትጉሃን ሰንበት ት/ቤት</span>
                          </div>
                          <h3 className="text-2xl font-black text-white">
                            {isAmharic ? currentDeptObj.nameAm : currentDeptObj.nameEn}
                          </h3>
                        </div>
                      </div>

                      <div className="text-left md:text-right space-y-1">
                        <div className="text-xs font-bold text-amber-300 flex items-center md:justify-end gap-1.5">
                          <Clock size={14} />
                          <span>{editMeetingAm}</span>
                        </div>
                        <div className="text-xs text-emerald-200/80 flex items-center md:justify-end gap-1.5">
                          <MapPin size={14} />
                          <span>{editMeetingLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Spiritual Motto Banner */}
                    <div className="p-4 rounded-2xl bg-[#041211] border border-amber-500/40 text-center mb-6">
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">የክፍሉ መሪ ቃል</div>
                      <p className="text-base font-serif font-bold text-amber-200 italic">
                        {editMottoAm}
                      </p>
                    </div>

                    {/* Notice Bulletin */}
                    {editNoticeAm && (
                      <div className="p-4 rounded-2xl bg-[#092723] border border-emerald-700/60 mb-6 flex items-start gap-3">
                        <Megaphone size={20} className="text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-amber-300 mb-0.5">ወቅታዊ የክፍሉ ማስታወቂያ</div>
                          <p className="text-xs text-emerald-100 leading-relaxed">{editNoticeAm}</p>
                        </div>
                      </div>
                    )}

                    {/* Department Mission Description */}
                    <div className="mb-6 space-y-1.5 text-xs text-emerald-100/90 leading-relaxed">
                      <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">ስለ ክፍሉ ዓላማና አገልግሎት</div>
                      <p>{editDescriptionAm}</p>
                    </div>

                    {/* Action Tasks Highlight */}
                    <div className="space-y-2 mb-6">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center justify-between">
                        <span>ዋና ዋና ዓመታዊ ተግባራት ({completedTasksCount}/{totalTasksCount})</span>
                        <span className="font-mono text-emerald-300">{progressPct}% ተጠናቋል</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentTasks.slice(0, 4).map((t) => (
                          <div key={t.id} className="p-2.5 rounded-xl bg-[#041211] border border-emerald-900 flex items-center justify-between text-xs">
                            <span className="truncate text-emerald-100">{t.titleAm}</span>
                            <span className="text-[9px] font-bold text-amber-300 shrink-0 ml-2">
                              {t.status === 'completed' ? '✓' : '⏳'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Coordinator & Contact Bar */}
                    <div className="pt-4 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <User size={15} className="text-amber-400" />
                        <span className="font-bold text-white">{editContactPerson}</span>
                        <span className="text-emerald-300/80">({editContactPhone})</span>
                      </div>

                      {editTelegramLink && (
                        <a
                          href={editTelegramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1.5 rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#64B5F6] border border-[#229ED9]/40 font-bold text-xs flex items-center gap-1.5"
                        >
                          <Send size={13} />
                          <span>የክፍሉ ቴሌግራም ቻናል</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: GLOBAL REGISTRATIONS MANAGEMENT (FOR LEADERSHIP)                     */}
          {/* ========================================================================= */}
          {activeTab === 'registrations' && !isStudent && (
            <div className="space-y-4 text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-900 pb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {isLeadership 
                      ? (isAmharic ? 'የጠቅላላ ተማሪዎች ምዝገባ ቁጥጥር' : 'All Student Registrations Oversight')
                      : (isAmharic ? `የ${currentDeptObj.nameAm} ተማሪዎች ምዝገባ` : 'Department Registrations')}
                  </h4>
                  <p className="text-xs text-emerald-200/70">
                    {isLeadership 
                      ? (isAmharic ? 'ሥራ አመራር ክፍል በሁሉም ክፍላት ያሉ ተማሪዎችን ማየትና ማጽደቅ ይችላል' : 'Leadership can inspect and approve enrollments across all divisions')
                      : (isAmharic ? 'የእርስዎ ክፍል ተማሪዎች ዝርዝር' : 'Applicants to your department')}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  {['all', 'pending', 'approved', 'enrolled'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setRegFilterStatus(st)}
                      className={`px-3 py-1 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                        regFilterStatus === st
                          ? 'bg-amber-500 text-slate-950 font-bold shadow'
                          : 'bg-[#041211] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                {visibleRegistrations.map((reg) => {
                  const canManage = canManageRegistration(reg);

                  return (
                    <div 
                      key={reg.id}
                      className="p-4 rounded-2xl bg-[#041211] border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 font-bold text-xs shrink-0">
                          {reg.category === 'children' ? <Baby size={18} /> : <User size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">{reg.fullName}</span>
                            <span className="text-[10px] font-mono text-emerald-400/80">{reg.regCode}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300">
                              {reg.category}
                            </span>
                          </div>
                          <div className="text-[11px] text-emerald-200/70 mt-0.5">
                            {reg.christianName && <span>ክርስትና ስም፦ {reg.christianName} • </span>}
                            <span>ዕድሜ፦ {reg.age} • </span>
                            <span>ስልክ፦ {reg.phone} • </span>
                            <span>አድራሻ፦ {reg.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                          reg.status === 'approved' || reg.status === 'enrolled'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : reg.status === 'pending'
                            ? 'bg-amber-950 text-amber-300 border-amber-700'
                            : 'bg-rose-950 text-rose-300 border-rose-700'
                        }`}>
                          {reg.status}
                        </span>

                        {canManage && reg.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => updateRegistrationStatus(reg.id, 'approved', 'በአስተዳደር ጸድቋል')}
                            className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer"
                          >
                            {isAmharic ? 'አጽድቅ' : 'Approve'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {visibleRegistrations.length === 0 && (
                  <div className="py-8 text-center text-xs text-emerald-300/60 bg-[#041211] rounded-2xl border border-dashed border-emerald-900">
                    {isAmharic ? 'ምንም የተመዘገበ ተማሪ አልተገኘም።' : 'No registrations found.'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: GLOBAL PARISH ANNOUNCEMENT (LEADERSHIP ONLY)                         */}
          {/* ========================================================================= */}
          {activeTab === 'announcements' && isLeadership && (
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <div className="border-b border-emerald-900 pb-3">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Megaphone size={18} className="text-amber-400" />
                  <span>{isAmharic ? 'አጠቃላይ የደብር ማስታወቂያ ሰሌዳ (Parish Top Notice)' : 'Global Parish Top Notice Banner'}</span>
                </h4>
                <p className="text-xs text-emerald-200/70">
                  {isAmharic 
                    ? 'በድረ-ገጹ አናት ላይ የሚለጠፍ ዓቢይ የሰንበት ትምህርት ቤት ማስታወቂያ' 
                    : 'Manage the parish notice ticker banner at the top of the portal'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#041211] border-2 border-emerald-900/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300">
                    {isAmharic ? 'ማስታወቂያውን በድረ-ገጹ ላይ አሳይ' : 'Enable Live Top Announcement Banner'}
                  </span>
                  <input
                    type="checkbox"
                    checked={announcement.enabled}
                    onChange={(e) => updateAnnouncement({ enabled: e.target.checked })}
                    className="w-5 h-5 accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1">
                      {isAmharic ? 'የማስታወቂያው ባጅ (አማርኛ)' : 'Badge Label (Amharic)'}
                    </label>
                    <input
                      type="text"
                      value={announcement.badgeAm}
                      onChange={(e) => updateAnnouncement({ badgeAm: e.target.value })}
                      className="w-full px-3 py-2 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3 py-2 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
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
                    className="w-full px-3 py-2 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  ✅ {isAmharic ? 'ለውጦች ወዲያውኑ በድረ-ገጹ ላይ ተግባራዊ ሆነዋል።' : 'Changes apply live across the portal.'}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: STUDENT DIGITAL ID CARD (STUDENTS ONLY)                              */}
          {/* ========================================================================= */}
          {activeTab === 'studentCard' && isStudent && (
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

                {/* Barcode */}
                <div className="pt-2 border-t border-emerald-950 flex flex-col items-center gap-1">
                  <div className="h-6 w-44 bg-gradient-to-r from-amber-400 via-white to-amber-400 opacity-60 rounded" />
                  <span className="text-[9px] font-mono text-emerald-400/60">
                    {currentUser.studentId || 'FT-849201'} • VERIFIED MEMBER
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
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
