import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCustomization } from '../../context/CustomizationContext';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { DepartmentTaskItem } from '../../types';
import logoImg from '../../assets/logo.jpg';
import { FeastCalendar } from '../sections/FeastCalendar';
import { MezmurPlayer } from '../sections/MezmurPlayer';
import { MediaFrontEndCMS } from './MediaFrontEndCMS';
import { 
  Shield, BookOpen, Baby, Music, User, X, CheckCircle2, 
  Clock, AlertTriangle, Edit3, Eye, Lock, Filter, Search, 
  Save, Megaphone, IdCard, Download, ArrowRight, UserCheck,
  ListTodo, Check, Plus, Trash2, FileText, Layers, Award,
  CheckCircle, ChevronRight, Bookmark, MapPin, Phone, Send,
  Globe, Building2, Sparkles, ExternalLink, ArrowLeft, Home,
  Sliders, LogOut, LogIn, Calendar, RefreshCw
} from 'lucide-react';

interface DepartmentAdminPageProps {
  onBackToHome: () => void;
  initialDeptId?: string;
  onOpenCustomization: () => void;
  onOpenAuth?: () => void;
}

export const DepartmentAdminPage: React.FC<DepartmentAdminPageProps> = ({
  onBackToHome,
  initialDeptId = 'leadership',
  onOpenCustomization,
  onOpenAuth
}) => {
  const { 
    currentUser, 
    logout, 
    canViewDepartment, 
    canEditDepartment, 
    registrations,
    updateRegistrationStatus,
    canManageRegistration,
    refreshRegistrations
  } = useAuth();

  const { isAmharic, toggleLanguage } = useLanguage();
  const { 
    announcement, 
    updateAnnouncement, 
    departmentSettings, 
    updateDepartmentSettings,
    departmentTasks,
    updateTaskStatus,
    addTask,
    deleteTask,
    pendingRequests
  } = useCustomization();

  const isLeadership = currentUser?.role === 'leadership';
  const isDeptAdmin = currentUser?.role === 'dept_admin';
  const isStudent = currentUser?.role === 'student';

  // Determine starting department
  const startingDeptId = isDeptAdmin && currentUser?.departmentId 
    ? currentUser.departmentId 
    : (initialDeptId || 'leadership');

  // Page States
  const [selectedDeptId, setSelectedDeptId] = useState<string>(startingDeptId);
  const [mainTab, setMainTab] = useState<'departments' | 'calendar' | 'mezmur' | 'registrations' | 'announcements' | 'mediaCMS' | 'studentCard'>(
    isStudent ? 'studentCard' : 'departments'
  );
  const [deptSubTab, setDeptSubTab] = useState<'content' | 'tasks' | 'students' | 'preview' | 'mediaCMS'>('content');
  const [deptSearchQuery, setDeptSearchQuery] = useState('');
  const [taskFilterStatus, setTaskFilterStatus] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');
  const [regFilterStatus, setRegFilterStatus] = useState<string>('all');
  const [selectedRegDeptFilter, setSelectedRegDeptFilter] = useState<string>('all');
  const [regSearchQuery, setRegSearchQuery] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New task form state
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubUnit, setNewTaskSubUnit] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'planned' | 'in_progress' | 'completed'>('planned');

  const currentDeptObj = departmentsData.find(d => d.id === selectedDeptId) || departmentsData[0];
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

  // Synchronize form when selected department changes
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

  const currentTasks = departmentTasks[selectedDeptId] || [];
  const filteredTasks = currentTasks.filter(t => {
    if (taskFilterStatus === 'all') return true;
    return t.status === taskFilterStatus;
  });

  const totalTasksCount = currentTasks.length;
  const completedTasksCount = currentTasks.filter(t => t.status === 'completed').length;
  const inProgressTasksCount = currentTasks.filter(t => t.status === 'in_progress').length;
  const plannedTasksCount = currentTasks.filter(t => t.status === 'planned').length;
  const progressPct = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const deptRegistrations = useMemo(() => {
    return registrations.filter(r => {
      const matchesDept = r.departmentId === selectedDeptId || (selectedDeptId === 'children' && r.category === 'children');
      if (regFilterStatus === 'all') return matchesDept;
      return matchesDept && r.status === regFilterStatus;
    });
  }, [registrations, selectedDeptId, regFilterStatus]);

  const visibleRegistrations = useMemo(() => {
    let list = [...registrations];

    // Filter by department if chosen
    if (selectedRegDeptFilter !== 'all') {
      list = list.filter(r => r.departmentId === selectedRegDeptFilter || (selectedRegDeptFilter === 'children' && r.category === 'children'));
    }

    // Filter by status if chosen
    if (regFilterStatus !== 'all') {
      list = list.filter(r => r.status === regFilterStatus);
    }

    // Filter by search query (name, code, phone, address)
    if (regSearchQuery.trim()) {
      const q = regSearchQuery.toLowerCase();
      list = list.filter(r => 
        r.fullName?.toLowerCase().includes(q) ||
        r.christianName?.toLowerCase().includes(q) ||
        r.regCode?.toLowerCase().includes(q) ||
        r.phone?.includes(q) ||
        r.address?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [registrations, selectedRegDeptFilter, regFilterStatus, regSearchQuery]);

  const handleSyncWithBackend = async () => {
    setIsSyncing(true);
    try {
      await refreshRegistrations();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsSyncing(false), 500);
    }
  };

  const selectableDepts = departmentsData.filter(d => 
    !deptSearchQuery ||
    d.nameAm.toLowerCase().includes(deptSearchQuery.toLowerCase()) ||
    d.nameEn.toLowerCase().includes(deptSearchQuery.toLowerCase()) ||
    d.articleRef.toLowerCase().includes(deptSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#061514] text-[#e2f1ee] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* SECOND PAGE TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#040e0d]/95 backdrop-blur-md border-b-2 border-amber-500/40 shadow-xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Logo & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover shadow"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {isAmharic ? 'የ14ቱ ክፍላት አስተዳደር ገጽ' : 'Departments Management Page'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {isAmharic ? 'ሁለተኛ ገጽ' : 'Second Page'}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-black text-white flex items-center gap-1.5">
                <span>ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት</span>
                <Sparkles size={14} className="text-amber-400" />
              </h1>
            </div>
          </div>

          {/* Right: Actions & Return to Home */}
          <div className="flex items-center gap-2">
            {/* Return to Home Website Button */}
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer hover:scale-105"
              title={isAmharic ? "ወደ ዋናው ድረ-ገጽ ተመለስ" : "Back to Main Website"}
            >
              <ArrowLeft size={14} />
              <span>{isAmharic ? 'ወደ ዋና ገጽ ተመለስ' : 'Back to Home'}</span>
            </button>

            {/* Customization Drawer Toggle */}
            <button
              onClick={onOpenCustomization}
              className="p-2 rounded-full border border-emerald-800 hover:border-amber-400 text-emerald-300 hover:text-amber-300 hover:bg-emerald-900/40 transition-all cursor-pointer"
              title={isAmharic ? "ገጽታን አብጅ" : "Customize Theme"}
            >
              <Sliders size={15} />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full border border-amber-500/40 text-xs font-bold text-amber-300 hover:bg-amber-500/10 cursor-pointer"
            >
              {isAmharic ? 'EN' : 'አማ'}
            </button>

            {/* Coordinator Tag */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a2724] border border-amber-500/30 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-amber-300 max-w-[120px] truncate">{currentUser.name}</span>
                <span className="text-emerald-400/60">•</span>
                <span className="text-emerald-200/80 text-[10px]">
                  {currentUser.role === 'leadership' ? (isAmharic ? 'ሥራ አመራር' : 'Leadership') : (isAmharic ? 'አስተዳዳሪ' : 'Admin')}
                </span>
              </div>
            )}

            {/* Sign Out or Sign In */}
            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  onBackToHome();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-rose-500/50 hover:border-rose-400 text-rose-300 hover:text-white hover:bg-rose-500/20 text-xs font-semibold transition-all cursor-pointer"
                title={isAmharic ? "ውጣ" : "Sign Out"}
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">{isAmharic ? "ውጣ" : "Sign Out"}</span>
              </button>
            ) : onOpenAuth ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow transition-all cursor-pointer"
              >
                <LogIn size={13} className="text-amber-400" />
                <span>{isAmharic ? "ይግቡ" : "Sign In"}</span>
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* SECOND PAGE MAIN BODY */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Guest Banner if not signed in */}
        {!currentUser && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Lock size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isAmharic ? "የክፍልዎን ገጽ ለማረምና ለማስተዳደር እባክዎ ይግቡ" : "Please sign in to edit and manage department pages"}
                </h4>
                <p className="text-xs text-emerald-200/70">
                  {isAmharic ? "የ14ቱ ክፍላት አስተዳዳሪዎችና የሥራ አመራር አባላት በመለያቸው ገብተው ማስታወቂያና መርሃ ግብር ማስተካከል ይችላሉ።" : "Coordinators and leadership can sign in with their department account."}
                </p>
              </div>
            </div>
            {onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow"
              >
                <LogIn size={14} />
                <span>{isAmharic ? "የክፍላት መግቢያ" : "Department Login"}</span>
              </button>
            )}
          </div>
        )}

        {/* Primary Role Navigation Tabs */}
        {!isStudent && (
          <div className="flex border-b border-emerald-900 bg-[#041211] rounded-2xl px-4 py-1 gap-2 overflow-x-auto text-xs font-semibold">
            {/* TAB: 14 DEPARTMENTS */}
            <button
              type="button"
              onClick={() => setMainTab('departments')}
              className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                mainTab === 'departments'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 size={16} />
              <span>
                {isLeadership 
                  ? (isAmharic ? '🏛️ የ14ቱ ክፍላት ገጽ ማስተዳደሪያ' : '14 Departments CMS') 
                  : (isAmharic ? `🏛️ የ${currentDeptObj.nameAm} ገጽ ማስተዳደሪያ` : 'Department Page CMS')}
              </span>
            </button>

            {/* TAB: FEAST & FAST CALENDAR */}
            <button
              type="button"
              onClick={() => setMainTab('calendar')}
              className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                mainTab === 'calendar'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar size={16} />
              <span>{isAmharic ? '📅 የበዓላትና የአጽዋማት ቀን መቁጠሪያ' : 'Feast & Fast Calendar'}</span>
            </button>

            {/* TAB: SACRED MEZMUR & HYMNS */}
            <button
              type="button"
              onClick={() => setMainTab('mezmur')}
              className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                mainTab === 'mezmur'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <Music size={16} />
              <span>{isAmharic ? '🎵 መንፈሳዊ መዝሙራትና ዝማሬ' : 'Spiritual Mezmur & Hymns'}</span>
            </button>

            {/* TAB: REGISTRATIONS */}
            <button
              type="button"
              onClick={() => setMainTab('registrations')}
              className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                mainTab === 'registrations'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserCheck size={16} />
              <span>
                {isAmharic ? '📋 የተማሪዎች ምዝገባ' : 'Registrations'} ({registrations.length})
              </span>
            </button>

            {/* TAB: FRONT-END CMS & LEADERSHIP APPROVALS */}
            <button
              type="button"
              onClick={() => setMainTab('mediaCMS')}
              className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                mainTab === 'mediaCMS'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {isLeadership ? <Shield size={16} /> : <Sparkles size={16} />}
              <span>
                {isLeadership 
                  ? (isAmharic ? '✅ የይሁንታ ማጽደቂያ' : 'Front-End Approvals') 
                  : (isAmharic ? '🎨 የፊት ገጽ ማበጃ (CMS)' : 'Front-End CMS')}
              </span>
              {pendingRequests.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                  {pendingRequests.length}
                </span>
              )}
            </button>

            {/* TAB: GLOBAL ANNOUNCEMENT (Leadership) */}
            {isLeadership && (
              <button
                type="button"
                onClick={() => setMainTab('announcements')}
                className={`py-2.5 px-4 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  mainTab === 'announcements'
                    ? 'bg-amber-500 text-slate-950 font-black shadow'
                    : 'text-emerald-200/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Megaphone size={16} />
                <span>{isAmharic ? '📢 አጠቃላይ ማስታወቂያ' : 'Parish Top Notice'}</span>
              </button>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: 14 DEPARTMENTS PAGE MANAGER                                       */}
        {/* ========================================================================= */}
        {mainTab === 'departments' && !isStudent && (
          <div className="space-y-6 text-left">
            
            {/* Department Active Header Card */}
            <div className="p-6 rounded-3xl bg-[#09201e] border-2 border-emerald-900/80 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/40 text-amber-400 shrink-0 shadow-lg">
                  <EthiopianCross size={32} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                      📜 {currentDeptObj.articleRef}
                    </span>
                    <span className="text-xs text-emerald-300/80 font-medium">• {currentDeptObj.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {isAmharic ? currentDeptObj.nameAm : currentDeptObj.nameEn}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-200/70 mt-1 max-w-3xl leading-relaxed">
                    {isAmharic ? currentDeptObj.descAm : currentDeptObj.descEn}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMainTab('calendar')}
                  className="px-3 py-1.5 rounded-xl bg-[#061514] hover:bg-[#0a2320] text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:border-amber-400"
                  title={isAmharic ? "የበዓላትና የአጽዋማት ቀን መቁጠሪያ" : "Feast & Fast Calendar"}
                >
                  <Calendar size={13} className="text-amber-400" />
                  <span>{isAmharic ? 'ቀን መቁጠሪያ' : 'Calendar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMainTab('mezmur')}
                  className="px-3 py-1.5 rounded-xl bg-[#061514] hover:bg-[#0a2320] text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:border-amber-400"
                  title={isAmharic ? "መንፈሳዊ መዝሙራትና ዝማሬ" : "Sacred Mezmur & Hymns"}
                >
                  <Music size={13} className="text-amber-400" />
                  <span>{isAmharic ? 'መዝሙራት' : 'Mezmur'}</span>
                </button>

                {selectedDeptId === 'media' && (
                  <button
                    type="button"
                    onClick={() => setMainTab('mediaCMS')}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ring-1 ring-purple-400/50"
                  >
                    <Sparkles size={13} className="text-amber-300" />
                    <span>{isAmharic ? 'የፊት ገጽ ማበጃ (CMS)' : 'Front-End CMS'}</span>
                  </button>
                )}

                {canEditDepartment(selectedDeptId) ? (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold shadow">
                    <Edit3 size={14} />
                    <span>{isAmharic ? 'የማረም ሙሉ ፈቃድ' : 'Editing Rights'}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold shadow">
                    <Eye size={14} />
                    <span>{isAmharic ? 'የሥራ አመራር ቁጥጥር' : 'Leadership Oversight'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Department Switcher for Leadership (Allows selecting any of the 14 departments) */}
            {isLeadership && (
              <div className="space-y-3 bg-[#041211] p-5 rounded-3xl border border-emerald-900/80 shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                      <Shield size={15} />
                      <span>{isAmharic ? 'የሥራ አመራር ቁጥጥር፦ ለማስተዳደር ወይም ለመመልከት ክፍል ይምረጡ' : 'Select Department to Manage / Inspect:'}</span>
                    </div>
                    <p className="text-[11px] text-emerald-300/70">
                      {isAmharic ? 'የ14ቱ ክፍላት ሁኔታ፣ ዕቅድና ተግባራት በአንድ ጠቅታ' : 'Inspect tasks, profile & members for all 14 bodies'}
                    </p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search size={14} className="absolute left-3 top-2.5 text-emerald-400/60" />
                    <input
                      type="text"
                      value={deptSearchQuery}
                      onChange={(e) => setDeptSearchQuery(e.target.value)}
                      placeholder={isAmharic ? "ክፍል ፈልግ..." : "Filter..."}
                      className="w-full pl-8 pr-3 py-1.5 bg-[#071c19] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-1 max-h-52 overflow-y-auto">
                  {selectableDepts.map((d) => {
                    const isSelected = selectedDeptId === d.id;
                    const canEdit = canEditDepartment(d.id);

                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleSelectDept(d.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md ring-1 ring-amber-400'
                            : 'bg-[#071c19] text-emerald-200/80 border-emerald-900/80 hover:border-amber-500/40 hover:text-white'
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
            <div className="flex border-b border-emerald-900 bg-[#041211] rounded-2xl p-1 gap-1 overflow-x-auto">
              {[
                { id: 'content', labelAm: '📝 የገጽ ይዘትና መገለጫ', labelEn: 'Page Profile & Content', icon: Edit3 },
                { id: 'tasks', labelAm: `📋 የሥራ ዕቅድና ተግባራት (${completedTasksCount}/${totalTasksCount})`, labelEn: 'Tasks & Mandates', icon: ListTodo },
                { id: 'students', labelAm: `👥 ተመዝጋቢዎች (${deptRegistrations.length})`, labelEn: 'Registrations', icon: UserCheck },
                { id: 'preview', labelAm: '👁️ የቀጥታ ገጽ እይታ', labelEn: 'Live Preview', icon: Eye },
                ...(selectedDeptId === 'media' ? [{ id: 'mediaCMS', labelAm: '🎨 የፊት ገጽ ማበጃ (CMS)', labelEn: 'Front-End CMS', icon: Sparkles }] : [])
              ].map((sub) => {
                const isActive = deptSubTab === sub.id;
                const Icon = sub.icon;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setDeptSubTab(sub.id as any)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
              <div className="p-6 sm:p-8 rounded-3xl bg-[#09201e] border-2 border-emerald-900/80 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900 pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
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
                    <div className="p-2.5 px-4 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                      <CheckCircle2 size={16} />
                      <span>{isAmharic ? 'የክፍሉ መረጃ በተሳካ ሁኔታ ተቀምጧል!' : 'Saved successfully!'}</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSaveDeptSettings} className="space-y-5">
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
                        className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                        className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                        className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                        className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                        className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                        className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                        className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                      className="w-full px-3.5 py-2.5 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-amber-400"
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
                <div className="p-5 rounded-2xl bg-[#09201e] border border-emerald-900/80 space-y-3">
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

                  <div className="w-full h-3 bg-[#041211] rounded-full overflow-hidden border border-emerald-900">
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
                            : 'bg-[#09201e] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
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
                  <form onSubmit={handleAddNewTask} className="p-5 rounded-2xl bg-[#092b27] border-2 border-amber-500/40 space-y-3">
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
                        className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
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
                                <span className="px-2 py-0.5 rounded-md bg-[#041211] border border-emerald-900 text-amber-300/90 font-medium">
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
                    <div className="py-8 text-center text-xs text-emerald-300/60 bg-[#09201e] rounded-2xl border border-dashed border-emerald-900">
                      {isAmharic ? 'በዚህ ምድብ ውስጥ የተመዘገበ ተግባር የለም።' : 'No tasks found for this filter.'}
                    </div>
                  )}
                </div>

                {/* Statutory Duties List from Bylaws */}
                <div className="p-6 rounded-3xl bg-[#09201e] border border-emerald-900/80 space-y-3">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <FileText size={15} />
                    <span>{isAmharic ? 'ዋና ዋና ተግባራትና ኃላፊነቶች (በመተዳደሪያ ደንቡ አንቀጽ መሠረት)' : 'Statutory Core Bylaws Duties'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentDeptObj.tasksAm.map((duty, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#041211] border border-emerald-900/60 flex items-start gap-2.5 text-xs text-emerald-100/90 leading-relaxed"
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
                            : 'bg-[#09201e] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
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
                        className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                    <div className="py-8 text-center text-xs text-emerald-300/60 bg-[#09201e] rounded-2xl border border-dashed border-emerald-900">
                      {isAmharic ? 'ለዚህ ክፍል የተመዘገበ ተማሪ አልተገኘም።' : 'No registered students for this department.'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 4: LIVE DEPARTMENT PAGE PREVIEW */}
            {deptSubTab === 'preview' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-2 font-bold">
                    <Eye size={16} />
                    <span>{isAmharic ? 'የክፍሉ ይፋዊ ገጽ የቀጥታ እይታ (Church Public View)' : 'Live Public Department Page Preview'}</span>
                  </span>
                  <span className="text-[11px] text-emerald-300">ያስተካከሏቸው መረጃዎች በሙሉ በቀጥታ እዚህ ይታያሉ</span>
                </div>

                {/* Rendered Live Card Preview */}
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#092b27] via-[#061e1b] to-[#041211] border-2 border-amber-400 shadow-2xl relative overflow-hidden">
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
                        <h3 className="text-2xl sm:text-3xl font-black text-white">
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
                  <div className="p-5 rounded-2xl bg-[#041211] border border-amber-500/40 text-center mb-6">
                    <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">የክፍሉ መሪ ቃል</div>
                    <p className="text-base sm:text-lg font-serif font-bold text-amber-200 italic">
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
                  <div className="mb-6 space-y-1.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
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

            {/* SUB-TAB 5: MEDIA FRONT-END CUSTOMIZATION CMS */}
            {deptSubTab === 'mediaCMS' && (
              <MediaFrontEndCMS onBackToDepartments={() => setDeptSubTab('content')} />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: FEAST & FAST CALENDAR (የበዓላትና የአጽዋማት ቀን መቁጠሪያ)                     */}
        {/* ========================================================================= */}
        {mainTab === 'calendar' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="bg-[#041211] p-4 sm:p-5 rounded-3xl border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Calendar size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{isAmharic ? "የበዓላትና የአጽዋማት ቀን መቁጠሪያ" : "Liturgical Feast & Fast Calendar"}</span>
                    <Sparkles size={16} className="text-amber-400" />
                  </h3>
                  <p className="text-xs text-emerald-200/70">
                    {isAmharic 
                      ? "ለ14ቱ ክፍላት የጋራ አገልግሎቶች፣ ዓበይት በዓላትና አጽዋማት ማጣቀሻ የቀረበ" 
                      : "Official liturgical dates, fasts, and Sunday School feast services for all 14 departments"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMainTab('departments')}
                className="px-4 py-2 rounded-xl bg-[#081f1c] hover:bg-[#0c2f2b] text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shadow"
              >
                <ArrowLeft size={14} />
                <span>{isAmharic ? "ወደ ክፍላት አስተዳደር ተመለስ" : "Back to Departments CMS"}</span>
              </button>
            </div>

            <div className="rounded-3xl overflow-hidden border border-emerald-900/60 shadow-2xl bg-[#081716]">
              <FeastCalendar />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: SACRED MEZMUR & HYMNS (መንፈሳዊ መዝሙራትና ዝማሬ)                       */}
        {/* ========================================================================= */}
        {mainTab === 'mezmur' && (
          <div className="space-y-4 animate-in fade-in duration-200 text-left">
            <div className="bg-[#041211] p-4 sm:p-5 rounded-3xl border border-emerald-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Music size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{isAmharic ? "መንፈሳዊ መዝሙራትና ዝማሬ" : "Sacred Mezmur & Spiritual Hymns"}</span>
                    <Sparkles size={16} className="text-amber-400" />
                  </h3>
                  <p className="text-xs text-emerald-200/70">
                    {isAmharic 
                      ? "የፍኖተ ትጉሃን ሰንበት ት/ቤት የመዘምራን ክፍልና የ14ቱ ክፍላት የዝማሬና ምስጋና ማዕከል" 
                      : "Sacred Orthodox chants, audio hymns, lyrics, and choir selections for Sunday School departments"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMainTab('departments')}
                className="px-4 py-2 rounded-xl bg-[#081f1c] hover:bg-[#0c2f2b] text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shadow"
              >
                <ArrowLeft size={14} />
                <span>{isAmharic ? "ወደ ክፍላት አስተዳደር ተመለስ" : "Back to Departments CMS"}</span>
              </button>
            </div>

            <div className="rounded-3xl overflow-hidden border border-emerald-900/60 shadow-2xl bg-[#081716]">
              <MezmurPlayer />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: STUDENT REGISTRATIONS & REGISTRY OVERVIEW                           */}
        {/* ========================================================================= */}
        {mainTab === 'registrations' && !isStudent && (
          <div className="space-y-5 text-left animate-in fade-in duration-200">
            {/* Header & Sync */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-emerald-900 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    {isAmharic ? 'የተማሪዎች ምዝገባ አስተዳደር' : 'Student Registry & Management'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    {isAmharic ? 'ቀጥታ ከሰርቨር' : 'Live Database'}
                  </span>
                </div>
                <h4 className="text-xl font-black text-white flex items-center gap-2">
                  <span>{isAmharic ? 'የጠቅላላ ተማሪዎች ምዝገባ ቁጥጥር' : 'Student Registrations Oversight'}</span>
                  <Sparkles size={16} className="text-amber-400" />
                </h4>
                <p className="text-xs text-emerald-200/70">
                  {isAmharic 
                    ? 'በድረ-ገጹ በኩል የተመዘገቡ ተማሪዎችን መረጃ እዚህ ይመልከቱ፣ ያጽድቁና ይመድቡ' 
                    : 'Review, approve, and manage applicant registrations submitted through the portal'}
                </p>
              </div>

              {/* Sync with Backend & Action Buttons */}
              <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                <button
                  type="button"
                  onClick={handleSyncWithBackend}
                  disabled={isSyncing}
                  className="px-3.5 py-2 rounded-xl bg-[#09201e] hover:bg-[#0c2f2b] text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow hover:border-amber-400 disabled:opacity-50"
                  title="ከBackend ዳታቤዝ አዳዲስ ምዝገባዎችን አድስ"
                >
                  <RefreshCw size={14} className={isSyncing ? "animate-spin text-amber-400" : "text-amber-400"} />
                  <span>{isSyncing ? (isAmharic ? 'እየታደሰ ነው...' : 'Syncing...') : (isAmharic ? 'ከሰርቨር አድስ' : 'Sync Server')}</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Counter Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#09201e] border border-amber-500/30">
                <div className="text-[11px] text-emerald-300/80 font-medium">{isAmharic ? 'ጠቅላላ ተመዝጋቢዎች' : 'Total Registered'}</div>
                <div className="text-xl font-black text-amber-400 mt-1">{registrations.length}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#09201e] border border-amber-500/30">
                <div className="text-[11px] text-amber-300/80 font-medium">{isAmharic ? 'ማረጋገጫ የሚጠብቁ' : 'Pending Review'}</div>
                <div className="text-xl font-black text-amber-300 mt-1">
                  {registrations.filter(r => r.status === 'pending').length}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#09201e] border border-emerald-500/30">
                <div className="text-[11px] text-emerald-300/80 font-medium">{isAmharic ? 'የጸደቁ ተማሪዎች' : 'Approved'}</div>
                <div className="text-xl font-black text-emerald-400 mt-1">
                  {registrations.filter(r => r.status === 'approved').length}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#09201e] border border-blue-500/30">
                <div className="text-[11px] text-blue-300/80 font-medium">{isAmharic ? 'የተመዘገቡ (Enrolled)' : 'Enrolled'}</div>
                <div className="text-xl font-black text-blue-400 mt-1">
                  {registrations.filter(r => r.status === 'enrolled').length}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-[#041211] border border-emerald-900/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                  <input
                    type="text"
                    value={regSearchQuery}
                    onChange={(e) => setRegSearchQuery(e.target.value)}
                    placeholder={isAmharic ? "በስም፣ በኮድ ወይም በስልክ ፈልግ..." : "Search name, code, phone..."}
                    className="w-full pl-9 pr-3 py-1.5 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Department Dropdown Filter */}
                <select
                  value={selectedRegDeptFilter}
                  onChange={(e) => setSelectedRegDeptFilter(e.target.value)}
                  className="px-3 py-1.5 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="all">{isAmharic ? "🏛️ ሁሉም ክፍላት (All Departments)" : "All Departments"}</option>
                  {departmentsData.map(d => (
                    <option key={d.id} value={d.id}>
                      {isAmharic ? d.nameAm : d.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: 'all', labelAm: 'ሁሉም', labelEn: 'All' },
                  { id: 'pending', labelAm: 'ማረጋገጫ የሚጠብቅ', labelEn: 'Pending' },
                  { id: 'approved', labelAm: 'የጸደቀ', labelEn: 'Approved' },
                  { id: 'enrolled', labelAm: 'የተመዘገበ', labelEn: 'Enrolled' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setRegFilterStatus(st.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
                      regFilterStatus === st.id
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-[#09201e] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
                    }`}
                  >
                    {isAmharic ? st.labelAm : st.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Registration Items List */}
            <div className="space-y-3">
              {visibleRegistrations.map((reg) => {
                const targetDept = departmentsData.find(d => d.id === reg.departmentId);
                const deptLabel = isAmharic ? (targetDept?.nameAm || reg.departmentId) : (targetDept?.nameEn || reg.departmentId);

                return (
                  <div 
                    key={reg.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#09201e] border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold shrink-0">
                        {reg.category === 'children' ? <Baby size={22} /> : <User size={22} />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-bold text-white text-sm sm:text-base">{reg.fullName}</h5>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#041211] text-amber-300 border border-amber-500/30 font-bold">
                            {reg.regCode}
                          </span>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/80 font-bold">
                            {deptLabel}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-emerald-200/80">
                          {reg.christianName && (
                            <span>ክርስትና ስም፦ <strong className="text-amber-200 font-normal">{reg.christianName}</strong></span>
                          )}
                          <span>ዕድሜ፦ <strong>{reg.age}</strong></span>
                          <span>ጾታ፦ <strong>{reg.gender === 'female' ? 'ሴት' : 'ወንድ'}</strong></span>
                          <span>ስልክ፦ <strong className="text-white font-mono">{reg.phone}</strong></span>
                          {reg.address && <span>አድራሻ፦ {reg.address}</span>}
                          {reg.registeredAt && <span className="text-emerald-400/60 font-mono text-[11px]">ቀን፦ {reg.registeredAt}</span>}
                        </div>

                        {reg.notes && (
                          <div className="text-[11px] text-amber-300/80 italic mt-1">
                            ማስታወሻ፦ {reg.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status & Action Buttons */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase border ${
                        reg.status === 'enrolled'
                          ? 'bg-blue-950 text-blue-300 border-blue-700'
                          : reg.status === 'approved'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : reg.status === 'pending'
                          ? 'bg-amber-950 text-amber-300 border-amber-700'
                          : 'bg-rose-950 text-rose-300 border-rose-700'
                      }`}>
                        {reg.status === 'enrolled' ? (isAmharic ? 'የተመዘገበ' : 'Enrolled') :
                         reg.status === 'approved' ? (isAmharic ? 'የጸደቀ' : 'Approved') :
                         reg.status === 'pending' ? (isAmharic ? 'ማረጋገጫ የሚጠብቅ' : 'Pending') : reg.status}
                      </span>

                      {/* Quick Action Controls */}
                      {reg.status === 'pending' && (
                        <button
                          type="button"
                          onClick={() => updateRegistrationStatus(reg.id, 'approved', 'በሥራ አመራር ክፍል ጸድቋል')}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Check size={13} />
                          <span>{isAmharic ? 'አጽድቅ' : 'Approve'}</span>
                        </button>
                      )}

                      {reg.status === 'approved' && (
                        <button
                          type="button"
                          onClick={() => updateRegistrationStatus(reg.id, 'enrolled', 'ወደ ክፍል ተመድቧል')}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Award size={13} />
                          <span>{isAmharic ? 'መዝግብ' : 'Enroll'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {visibleRegistrations.length === 0 && (
                <div className="py-12 text-center text-xs text-emerald-300/70 bg-[#09201e] rounded-3xl border border-dashed border-emerald-900 space-y-2">
                  <UserCheck size={28} className="mx-auto text-emerald-500/40" />
                  <p className="font-semibold text-sm text-white">
                    {isAmharic ? 'ምንም የተመዘገበ ተማሪ አልተገኘም።' : 'No registrations found.'}
                  </p>
                  <p className="text-emerald-300/60 max-w-sm mx-auto">
                    {isAmharic 
                      ? 'የተመረጠውን ማጣሪያ ይቀይሩ ወይም «ከሰርቨር አድስ» የሚለውን ቁልፍ ተጭነው አዳዲስ ምዝገባዎችን ያምጡ' 
                      : 'Change the filter or click "Sync Server" to fetch recent applicants'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GLOBAL ANNOUNCEMENT (LEADERSHIP)                                   */}
        {/* ========================================================================= */}
        {mainTab === 'announcements' && isLeadership && (
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

            <div className="p-6 rounded-3xl bg-[#09201e] border-2 border-emerald-900/80 space-y-4">
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
                    className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
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
                    className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
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
                  className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                ✅ {isAmharic ? 'ለውጦች ወዲያውኑ በድረ-ገጹ ላይ ተግባራዊ ሆነዋል።' : 'Changes apply live across the portal.'}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: MEDIA FRONT-END CMS & LEADERSHIP APPROVALS                           */}
        {/* ========================================================================= */}
        {mainTab === 'mediaCMS' && (
          <MediaFrontEndCMS onBackToDepartments={() => setMainTab('departments')} />
        )}

      </main>
    </div>
  );
};
