import React, { useState } from 'react';
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
  CheckCircle, ChevronRight, Bookmark
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
  const [activeTab, setActiveTab] = useState<'tasks' | 'departments' | 'registrations' | 'announcements' | 'studentCard'>(
    isStudent ? 'studentCard' : 'tasks'
  );
  const [selectedDeptId, setSelectedDeptId] = useState<string>(startingDeptId);
  const [regFilterStatus, setRegFilterStatus] = useState<string>('all');
  const [taskFilterStatus, setTaskFilterStatus] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');
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
    setShowAddTaskForm(false);
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

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !canEditDepartment(selectedDeptId)) return;

    addTask(selectedDeptId, {
      titleAm: newTaskTitle.trim(),
      subUnitAm: newTaskSubUnit.trim() || "አጠቃላይ",
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

  const currentDeptObj = departmentsData.find(d => d.id === selectedDeptId) || departmentsData[0];
  const currentTasks = departmentTasks[selectedDeptId] || [];

  // Filter tasks by status
  const filteredTasks = currentTasks.filter(t => {
    if (taskFilterStatus === 'all') return true;
    return t.status === taskFilterStatus;
  });

  // Calculate stats
  const totalTasksCount = currentTasks.length;
  const completedTasksCount = currentTasks.filter(t => t.status === 'completed').length;
  const inProgressTasksCount = currentTasks.filter(t => t.status === 'in_progress').length;
  const plannedTasksCount = currentTasks.filter(t => t.status === 'planned').length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Filter registrations according to permissions
  const visibleRegistrations = registrations.filter((reg) => {
    if (regFilterStatus !== 'all' && reg.status !== regFilterStatus) return false;
    if (canViewAllRegistrations()) return true;
    if (currentUser.departmentId) return reg.departmentId === currentUser.departmentId;
    return false;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <div 
        className="w-full max-w-5xl bg-[#09201e] border-2 border-amber-500/40 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-emerald-900 bg-[#061514]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <EthiopianCross size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  {isAmharic ? 'የሰንበት ት/ቤት አስተዳደርና አገልግሎት ፖርታል' : 'Sunday School Governance Portal'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {isLeadership 
                    ? (isAmharic ? 'ሥራ አመራር ክፍል' : 'Leadership Admin') 
                    : isDeptAdmin 
                    ? (isAmharic ? `${currentUser.departmentNameAm || 'የክፍል'} አስተባባሪ` : 'Department Admin') 
                    : (isAmharic ? 'ተማሪ / አባል' : 'Enrolled Member')}
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/70 font-mono">
                {currentUser.name} • {currentUser.email}
              </p>
            </div>
          </div>

          {/* Quick Role Switcher Bar */}
          <div className="flex items-center gap-1 bg-[#040e0d] p-1 rounded-xl border border-emerald-900/80">
            <span className="text-[10px] text-emerald-400/80 font-bold px-1.5 hidden sm:inline">
              {isAmharic ? 'ሚና ቀይር፦' : 'Role:'}
            </span>
            <button
              onClick={() => { switchRole('leadership'); handleSelectDept('leadership'); }}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isLeadership ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ሥራ አመራር ክፍል (ሙሉ የቁጥጥር ስልጣን)"
            >
              ሥራ አመራር
            </button>
            <button
              onClick={() => { switchRole('dept_admin', 'education'); handleSelectDept('education'); }}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isDeptAdmin && currentUser.departmentId === 'education' ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ትምህርትና ስልጠና ክፍል"
            >
              ትምህርት
            </button>
            <button
              onClick={() => { switchRole('dept_admin', 'children'); handleSelectDept('children'); }}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isDeptAdmin && currentUser.departmentId === 'children' ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ሕጻናት ክፍል"
            >
              ሕፃናት
            </button>
            <button
              onClick={() => switchRole('student')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                isStudent ? 'bg-amber-500 text-black shadow' : 'text-emerald-200 hover:text-white'
              }`}
              title="ተማሪ / አባል"
            >
              ተማሪ
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-emerald-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-emerald-900 bg-[#061514] px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {/* TAB: TASKS & BYLAWS ACTION PLAN (Visible to ALL) */}
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'tasks'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            <ListTodo size={15} />
            <span>
              {isAmharic ? 'የደንብ ተግባራትና ዕቅድ (14 ክፍላት)' : 'Bylaws Tasks & Action Plan'}
            </span>
          </button>

          {!isStudent && (
            <>
              {/* TAB: DEPARTMENT SETTINGS */}
              <button
                onClick={() => setActiveTab('departments')}
                className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'departments'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-emerald-200/70 hover:text-white'
                }`}
              >
                <Shield size={15} />
                <span>
                  {isLeadership ? (isAmharic ? 'የክፍላት ቅንብሮች' : 'Department Settings') : (isAmharic ? 'የክፍሌ ቅንብሮች' : 'Department Settings')}
                </span>
              </button>

              {/* TAB: REGISTRATIONS */}
              <button
                onClick={() => setActiveTab('registrations')}
                className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'registrations'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-emerald-200/70 hover:text-white'
                }`}
              >
                <UserCheck size={15} />
                <span>
                  {isAmharic ? 'የተማሪዎች ምዝገባ' : 'Student Registrations'} ({visibleRegistrations.length})
                </span>
              </button>

              {/* TAB: GLOBAL ANNOUNCEMENT (Leadership only) */}
              {isLeadership && (
                <button
                  onClick={() => setActiveTab('announcements')}
                  className={`py-3 px-4 border-b-2 font-bold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'announcements'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-emerald-200/70 hover:text-white'
                  }`}
                >
                  <Megaphone size={15} />
                  <span>{isAmharic ? 'አጠቃላይ የደብር ማስታወቂያ' : 'Global Parish Notice'}</span>
                </button>
              )}
            </>
          )}

          {/* TAB: STUDENT ID CARD (Students only) */}
          {isStudent && (
            <button
              onClick={() => setActiveTab('studentCard')}
              className={`py-3 px-4 border-b-2 font-bold flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'studentCard'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-emerald-200/70 hover:text-white'
              }`}
            >
              <IdCard size={15} />
              <span>{isAmharic ? 'የተማሪ ዲጂታል መታወቂያ' : 'Student Digital ID'}</span>
            </button>
          )}
        </div>

        {/* Dashboard Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-emerald-100">

          {/* ========================================================================= */}
          {/* TAB: TASKS & MANDATES (ተግባራትና የሥራ ዕቅድ እንደ መተዳደሪያ ደንቡ)               */}
          {/* ========================================================================= */}
          {activeTab === 'tasks' && (
            <div className="space-y-6 text-left">
              
              {/* Permission & Oversight Explanation Banner */}
              <div className="p-4 rounded-2xl bg-[#061514] border border-amber-500/30 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <ListTodo size={20} />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-amber-300 mb-0.5">
                      {isLeadership 
                        ? (isAmharic ? 'የሥራ አመራር ክፍል የቁጥጥር እይታ (14ቱ ክፍላት)' : 'Executive Leadership Oversight (All 14 Bodies)')
                        : isDeptAdmin
                        ? (isAmharic ? `${currentUser.departmentNameAm || 'የክፍል'} አስተባባሪ የተግባራት ዕቅድ` : 'Coordinator Action Plan Tracker')
                        : (isAmharic ? 'የሰንበት ት/ቤት ክፍላት የደንብ ተግባራት ማውጫ' : 'Sunday School Bylaws Mandates & Tasks')}
                    </div>
                    <p className="text-emerald-200/80 leading-relaxed">
                      {isLeadership
                        ? (isAmharic 
                            ? 'በመተዳደሪያ ደንቡ መሠረት የሁሉንም 14 ክፍላት ዓላማ፣ ንዑሳን ክፍላትና የተግባራት አፈጻጸም መመልከት ይችላሉ፤ ነገር ግን ማረም የሚችሉት የሥራ አመራር ክፍልን ብቻ ነው።'
                            : 'You have full oversight to inspect all 14 departments; task editing is restricted strictly to leadership.')
                        : isDeptAdmin
                        ? (isAmharic
                            ? `የክፍልዎን የደንብ ተግባራት ማከናወን፣ ሁኔታቸውን (የታቀደ/በሂደት ላይ/የተጠናቀቀ) መቀየርና አዳዲስ ዕቅዶችን ማከል ይችላሉ።`
                            : `Manage your department tasks, cycle status (planned/in-progress/completed), and add custom action items.`)
                        : (isAmharic
                            ? 'እያንዳንዱ ክፍል በመተዳደሪያ ደንቡ የተሰጠውን ሕጋዊ ዓላማና ዋና ዋና ተግባራት እዚህ ይመልከቱ።'
                            : 'Explore statutory mandates, sub-units, and action tasks for every department.')}
                    </p>
                  </div>
                </div>

                {/* Edit Rights Badge */}
                {canEditDepartment(selectedDeptId) ? (
                  <span className="shrink-0 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                    <Edit3 size={12} />
                    <span>{isAmharic ? 'የማረም ፈቃድ አለዎት' : 'Editable'}</span>
                  </span>
                ) : (
                  <span className="shrink-0 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                    <Eye size={12} />
                    <span>{isAmharic ? 'ማየት ብቻ' : 'Read Only'}</span>
                  </span>
                )}
              </div>

              {/* Department Selector Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {isAmharic ? 'ክፍል ይምረጡ፦' : 'Select Department:'}
                  </span>
                  <span className="text-xs text-emerald-300/70">
                    {departmentsData.length} {isAmharic ? 'የአገልግሎት ክፍላት' : 'Ministries'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {departmentsData.map((dept) => {
                    const isSelected = selectedDeptId === dept.id;
                    const canEdit = canEditDepartment(dept.id);
                    const deptTasks = departmentTasks[dept.id] || [];
                    const completed = deptTasks.filter(t => t.status === 'completed').length;
                    const total = deptTasks.length;

                    return (
                      <button
                        key={dept.id}
                        onClick={() => handleSelectDept(dept.id)}
                        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-[#0f3b35] border-amber-400 text-white shadow-lg ring-1 ring-amber-400/50'
                            : 'bg-[#061514] border-emerald-900/80 text-emerald-200/80 hover:border-amber-500/40 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-amber-400/80">{dept.articleRef.split('፣')[1]?.trim() || dept.articleRef}</span>
                          {canEdit && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="የማረም ፈቃድ" />
                          )}
                        </div>
                        <div className="text-xs font-bold truncate">
                          {isAmharic ? dept.nameAm : dept.nameEn}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-emerald-300/60 pt-1 border-t border-emerald-950">
                          <span>{isAmharic ? 'ተግባራት' : 'Tasks'}</span>
                          <span className="font-mono text-amber-300 font-bold">{completed}/{total}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Department Header & Statutory Mandate Card */}
              <div className="p-6 rounded-3xl bg-[#061514] border-2 border-emerald-900/90 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-emerald-900/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                        📜 {currentDeptObj.articleRef}
                      </span>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {currentDeptObj.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {isAmharic ? currentDeptObj.nameAm : currentDeptObj.nameEn}
                    </h3>
                    <p className="text-xs text-emerald-200/80 mt-1 max-w-2xl">
                      {isAmharic ? currentDeptObj.descAm : currentDeptObj.descEn}
                    </p>
                  </div>

                  {/* Add Action Task Button (If editable) */}
                  {canEditDepartment(selectedDeptId) && (
                    <button
                      onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer shrink-0"
                    >
                      <Plus size={16} />
                      <span>{showAddTaskForm ? (isAmharic ? 'ቅጹን ዝጋ' : 'Close Form') : (isAmharic ? 'አዲስ ተግባር አክል' : 'Add Action Task')}</span>
                    </button>
                  )}
                </div>

                {/* Statutory Objective (ዓላማ) */}
                <div className="p-4 rounded-2xl bg-[#09201e] border border-amber-500/30">
                  <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                    <Bookmark size={14} />
                    <span>{isAmharic ? 'የክፍሉ ሕጋዊ ዓላማ (እንደ መተዳደሪያ ደንቡ)፦' : 'Statutory Objective:'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-serif">
                    {isAmharic ? currentDeptObj.objectiveAm : currentDeptObj.objectiveEn || currentDeptObj.objectiveAm}
                  </p>
                </div>

                {/* Progress Meter Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">
                      {isAmharic ? 'የተግባራት አፈጻጸም ደረጃ' : 'Task Completion Progress'}
                    </span>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#040e0d] rounded-full overflow-hidden border border-emerald-950">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-[#09201e] border border-emerald-900 text-center">
                    <div className="text-xl font-bold font-mono text-white">{totalTasksCount}</div>
                    <div className="text-[11px] text-emerald-300/70">{isAmharic ? 'አጠቃላይ ተግባራት' : 'Total Tasks'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#09201e] border border-emerald-900 text-center">
                    <div className="text-xl font-bold font-mono text-emerald-400">{completedTasksCount}</div>
                    <div className="text-[11px] text-emerald-300/70">{isAmharic ? 'የተጠናቀቁ (Completed)' : 'Completed'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#09201e] border border-emerald-900 text-center">
                    <div className="text-xl font-bold font-mono text-blue-400">{inProgressTasksCount}</div>
                    <div className="text-[11px] text-emerald-300/70">{isAmharic ? 'በሂደት ላይ (Active)' : 'In Progress'}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#09201e] border border-emerald-900 text-center">
                    <div className="text-xl font-bold font-mono text-amber-400">{plannedTasksCount}</div>
                    <div className="text-[11px] text-emerald-300/70">{isAmharic ? 'የታቀዱ (Planned)' : 'Planned'}</div>
                  </div>
                </div>

                {/* Add Task Inline Form */}
                {showAddTaskForm && canEditDepartment(selectedDeptId) && (
                  <form onSubmit={handleAddNewTask} className="p-4 rounded-2xl bg-[#071d1b] border-2 border-amber-400/60 space-y-3">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Plus size={14} />
                      <span>{isAmharic ? 'አዲስ የተግባር ዕቅድ ማከል' : 'Add New Action Item'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                          {isAmharic ? 'የተግባሩ ርዕስ / መግለጫ' : 'Task Description'}
                        </label>
                        <input
                          type="text"
                          required
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder={isAmharic ? "ምሳሌ፡ የሩብ ዓመት የተማሪዎች ምዘና ማካሄድ..." : "e.g., Conduct quarterly evaluation..."}
                          className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                          {isAmharic ? 'ንዑስ ክፍል (አማራጭ)' : 'Sub-Unit'}
                        </label>
                        <select
                          value={newTaskSubUnit}
                          onChange={(e) => setNewTaskSubUnit(e.target.value)}
                          className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="">{isAmharic ? 'ይምረጡ...' : 'Select...'}</option>
                          {currentDeptObj.subSectionsAm.map((sub, i) => (
                            <option key={i} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-emerald-300">{isAmharic ? 'የመጀመሪያ ሁኔታ፦' : 'Initial Status:'}</span>
                        {(['planned', 'in_progress', 'completed'] as const).map((st) => (
                          <button
                            type="button"
                            key={st}
                            onClick={() => setNewTaskStatus(st)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                              newTaskStatus === st
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-[#09201e] text-emerald-300 border border-emerald-900'
                            }`}
                          >
                            {st === 'planned' ? 'የታቀደ' : st === 'in_progress' ? 'በሂደት ላይ' : 'የተጠናቀቀ'}
                          </button>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow"
                      >
                        {isAmharic ? 'ተግባሩን መዝግብ' : 'Save Task'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Filter & Task List */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-900">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle size={15} className="text-amber-400" />
                      <span>{isAmharic ? 'የተግባራትና የዕቅድ ዝርዝር' : 'Action Items Tracker'}</span>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex items-center gap-1 text-[11px]">
                      {[
                        { id: 'all', label: isAmharic ? 'ሁሉም' : 'All' },
                        { id: 'planned', label: isAmharic ? 'የታቀዱ' : 'Planned' },
                        { id: 'in_progress', label: isAmharic ? 'በሂደት ላይ' : 'In Progress' },
                        { id: 'completed', label: isAmharic ? 'የተጠናቀቁ' : 'Completed' },
                      ].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setTaskFilterStatus(f.id as any)}
                          className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                            taskFilterStatus === f.id
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-[#09201e] text-emerald-300 border border-emerald-900 hover:border-amber-500/40'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Task Items */}
                  <div className="space-y-2">
                    {filteredTasks.map((task) => {
                      const canEdit = canEditDepartment(selectedDeptId);

                      return (
                        <div
                          key={task.id}
                          className="p-3.5 rounded-2xl bg-[#09201e] border border-emerald-900/80 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-start gap-3">
                            {/* Status Toggle Button / Checkbox */}
                            <button
                              disabled={!canEdit}
                              onClick={() => handleCycleTaskStatus(task)}
                              title={canEdit ? (isAmharic ? 'ሁኔታውን ለመቀየር ይጫኑ' : 'Click to cycle status') : (isAmharic ? 'ማየት ብቻ' : 'Read Only')}
                              className={`mt-0.5 p-1 rounded-lg border transition-all cursor-pointer shrink-0 ${
                                task.status === 'completed'
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                  : task.status === 'in_progress'
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-400'
                                  : 'bg-[#061514] text-amber-400 border-amber-500/40'
                              } ${!canEdit ? 'opacity-80 cursor-default' : 'hover:scale-110'}`}
                            >
                              {task.status === 'completed' ? (
                                <Check size={14} className="stroke-[3]" />
                              ) : task.status === 'in_progress' ? (
                                <Clock size={14} />
                              ) : (
                                <div className="w-3.5 h-3.5 rounded-sm border border-amber-400/80" />
                              )}
                            </button>

                            <div>
                              <div className="text-xs font-semibold text-white leading-snug">
                                {task.titleAm}
                              </div>
                              <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-emerald-300/70">
                                {task.subUnitAm && (
                                  <span className="px-2 py-0.5 rounded-md bg-[#061514] border border-emerald-900 text-amber-300/90 font-medium">
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

                          {/* Status Badge & Actions */}
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
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

                            {/* Delete custom task button */}
                            {canEdit && task.id.includes('custom') && (
                              <button
                                onClick={() => deleteTask(selectedDeptId, task.id)}
                                className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                                title="ተግባር ሰርዝ"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {filteredTasks.length === 0 && (
                      <div className="py-8 text-center text-xs text-emerald-300/60 bg-[#09201e] rounded-2xl border border-dashed border-emerald-900">
                        {isAmharic ? 'በዚህ ምድብ ውስጥ የተመዘገበ ተግባር የለም።' : 'No tasks found for this filter.'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Statutory Core Responsibilities (ከመተዳደሪያ ደንቡ ዋና ዋና ተግባራት) */}
                <div className="pt-4 border-t border-emerald-900 space-y-3">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <FileText size={15} />
                    <span>{isAmharic ? 'ዋና ዋና ተግባራትና ኃላፊነቶች (እንደ መተዳደሪያ ደንቡ አንቀጽ)' : 'Statutory Core Bylaws Duties'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentDeptObj.tasksAm.map((duty, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-xl bg-[#09201e] border border-emerald-900/60 flex items-start gap-2.5 text-xs text-emerald-100/90 leading-relaxed"
                      >
                        <span className="font-mono text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                        <span>{duty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-Units Detailed Mandates Breakdown */}
                {currentDeptObj.subUnitsDetailed && currentDeptObj.subUnitsDetailed.length > 0 && (
                  <div className="pt-4 border-t border-emerald-900 space-y-3">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Layers size={15} />
                      <span>{isAmharic ? 'ንዑሳን ክፍላትና ዝርዝር የሥራ ድርሻቸው' : 'Constituent Sub-Units & Mandates'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {currentDeptObj.subUnitsDetailed.map((sub, i) => (
                        <div 
                          key={i}
                          className="p-3.5 rounded-2xl bg-[#09201e] border border-emerald-900/80 space-y-2"
                        >
                          <div className="text-xs font-bold text-white border-b border-emerald-950 pb-1.5 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span>{sub.nameAm}</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-emerald-200/80">
                            {sub.dutiesAm.map((d, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-1.5">
                                <span className="text-amber-400 shrink-0">•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: DEPARTMENTS SETTINGS (Motto, Meeting Time, Notice Board)              */}
          {/* ========================================================================= */}
          {activeTab === 'departments' && !isStudent && (
            <div className="space-y-6 text-left">
              {/* Permission Banner */}
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
                          ? 'ሥራ አመራር ክፍል ሁሉንም 14 ክፍላት በበላይነት ይመለከታል፤ ነገር ግን ማስተካከል የሚችለው የራሱን የሥራ አመራር ክፍል ብቻ ነው።'
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

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {departmentsData.map((dept) => {
                    const isAllowedView = canViewDepartment(dept.id);
                    const isSelected = selectedDeptId === dept.id;
                    const canEdit = canEditDepartment(dept.id);

                    if (!isAllowedView && !isLeadership) return null;

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
                      {currentDeptObj.nameAm}
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

          {/* ========================================================================= */}
          {/* TAB: STUDENT REGISTRATIONS MANAGEMENT                                     */}
          {/* ========================================================================= */}
          {activeTab === 'registrations' && !isStudent && (
            <div className="space-y-4 text-left">
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
                              className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 text-xs font-bold border border-blue-500/40 transition-colors cursor-pointer"
                            >
                              {isAmharic ? 'አጽድቅ' : 'Approve'}
                            </button>
                          )}
                          {reg.status !== 'enrolled' && (
                            <button
                              onClick={() => updateRegistrationStatus(reg.id, 'enrolled', 'በክፍሉ ተመዝግቧል')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 text-xs font-bold border border-emerald-500/40 transition-colors cursor-pointer"
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

          {/* ========================================================================= */}
          {/* TAB: GLOBAL PARISH NOTICE (EXCLUSIVE TO LEADERSHIP)                        */}
          {/* ========================================================================= */}
          {activeTab === 'announcements' && isLeadership && (
            <div className="p-6 rounded-3xl bg-[#061514] border-2 border-emerald-900/80 space-y-5 text-left">
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

          {/* ========================================================================= */}
          {/* TAB: STUDENT DIGITAL ID CARD (STUDENTS ONLY)                               */}
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
