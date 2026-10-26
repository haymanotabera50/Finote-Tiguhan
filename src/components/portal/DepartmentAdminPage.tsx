import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCustomization } from '../../context/CustomizationContext';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { DepartmentTaskItem } from '../../types';
import logoImg from '../../assets/logo.jpg';
import { MezmurPlayer } from '../sections/MezmurPlayer';
import { MediaFrontEndCMS } from './MediaFrontEndCMS';
import { api } from '../../services/api';
import { 
  Shield, BookOpen, Baby, Music, User, X, CheckCircle2, 
  Clock, AlertTriangle, Edit3, Eye, Lock, Filter, Search, 
  Save, Megaphone, IdCard, Download, ArrowRight, UserCheck,
  ListTodo, Check, Plus, Trash2, FileText, Layers, Award,
  CheckCircle, ChevronRight, Bookmark, MapPin, Phone, Send, Mail,
  Globe, Building2, Sparkles, ExternalLink, ArrowLeft, Home,
  Sliders, LogOut, LogIn, Calendar, RefreshCw, MessageSquare, Reply,
  UserPlus, FileSpreadsheet, LayoutGrid, Table, BarChart3, ShieldCheck, Activity, TrendingUp, CheckCheck
} from 'lucide-react';

interface DepartmentAdminPageProps {
  onBackToHome: () => void;
  initialDeptId?: string;
  onOpenCustomization: () => void;
  onOpenAuth?: (mode?: 'login' | 'signup', deptId?: string) => void;
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
  const [mainTab, setMainTab] = useState<'departments' | 'calendar' | 'mezmur' | 'registrations' | 'feedback' | 'announcements' | 'mediaCMS' | 'studentCard'>(
    isStudent ? 'studentCard' : 'departments'
  );
  const [deptSubTab, setDeptSubTab] = useState<'content' | 'tasks' | 'students' | 'preview' | 'mediaCMS' | 'deptProgress' | 'mezmur' | 'feedback'>(
    startingDeptId === 'audit' ? 'deptProgress' : 'content'
  );
  const [auditedDeptId, setAuditedDeptId] = useState<string | null>(null);
  const [auditDeptSearch, setAuditDeptSearch] = useState<string>('');
  const [deptSearchQuery, setDeptSearchQuery] = useState('');
  const [taskFilterStatus, setTaskFilterStatus] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');
  const [taskViewMode, setTaskViewMode] = useState<'table' | 'cards'>('table');
  const [taskSearchQuery, setTaskSearchQuery] = useState<string>('');
  const [newTaskMetric, setNewTaskMetric] = useState<string>('');
  const [newTaskTarget, setNewTaskTarget] = useState<string>('');
  const [newTaskTiming, setNewTaskTiming] = useState<string>('');
  const [newTaskBudget, setNewTaskBudget] = useState<string>('');
  const [regFilterStatus, setRegFilterStatus] = useState<string>('all');
  const [selectedRegDeptFilter, setSelectedRegDeptFilter] = useState<string>('all');
  const [regSearchQuery, setRegSearchQuery] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Feedback / Inquiries state
  interface FeedbackMessageItem {
    id?: string;
    _id?: string;
    name: string;
    contactInfo: string;
    subject: string;
    message: string;
    departmentId?: string;
    status: 'unread' | 'read' | 'replied';
    createdAt: string;
  }
  const [feedbackList, setFeedbackList] = useState<FeedbackMessageItem[]>([]);
  const [isSyncingFeedback, setIsSyncingFeedback] = useState<boolean>(false);
  const [feedbackFilterStatus, setFeedbackFilterStatus] = useState<string>('all');
  const [feedbackSearchQuery, setFeedbackSearchQuery] = useState<string>('');

  const fetchFeedback = async () => {
    setIsSyncingFeedback(true);
    try {
      const msgs = await api.getContactMessages();
      setFeedbackList(Array.isArray(msgs) ? msgs : []);
    } catch (e) {
      console.error('Failed to load feedback:', e);
    } finally {
      setTimeout(() => setIsSyncingFeedback(false), 300);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleUpdateFeedbackStatus = async (id: string, status: 'unread' | 'read' | 'replied') => {
    try {
      await api.updateContactStatus(id, status);
      setFeedbackList(prev => prev.map(m => (m.id === id || m._id === id) ? { ...m, status } : m));
    } catch (e) {
      console.error('Failed to update feedback status:', e);
    }
  };

  const handleDeleteFeedback = async (id: string) => {
    if (!window.confirm(isAmharic ? 'ይህንን አስተያየት/ጥያቄ መሰረዝ እርግጠኛ ነዎት?' : 'Are you sure you want to delete this message?')) return;
    try {
      await api.deleteContactMessage(id);
      setFeedbackList(prev => prev.filter(m => m.id !== id && m._id !== id));
    } catch (e) {
      console.error('Failed to delete feedback message:', e);
    }
  };

  const unreadFeedbackCount = useMemo(() => {
    return feedbackList.filter(f => f.status === 'unread').length;
  }, [feedbackList]);

  const visibleFeedback = useMemo(() => {
    let list = [...feedbackList];
    if (feedbackFilterStatus !== 'all') {
      list = list.filter(f => f.status === feedbackFilterStatus);
    }
    if (feedbackSearchQuery.trim()) {
      const q = feedbackSearchQuery.toLowerCase();
      list = list.filter(f => 
        f.name?.toLowerCase().includes(q) ||
        f.contactInfo?.toLowerCase().includes(q) ||
        f.subject?.toLowerCase().includes(q) ||
        f.message?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [feedbackList, feedbackFilterStatus, feedbackSearchQuery]);

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
    setAuditedDeptId(null);
    if (deptId === 'audit') {
      setDeptSubTab('deptProgress');
    } else if (
      deptSubTab === 'deptProgress' || 
      (deptSubTab === 'students' && deptId !== 'education') ||
      (deptSubTab === 'mezmur' && deptId !== 'choir') ||
      (deptSubTab === 'feedback' && deptId !== 'leadership' && deptId !== 'audit')
    ) {
      setDeptSubTab('tasks');
    }
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

  const handleExportTasksToCSV = () => {
    if (!currentTasks.length) return;
    const deptName = currentDeptObj?.nameAm || selectedDeptId;
    const headers = ['ተ.ቁ', 'የትኩረት አቅጣጫ እና ዝርዝር እቅድ', 'መለኪያ / ዒላማ', 'የሚፈጸምበት ጊዜ', 'በጀት', 'ኃላፊ ንዑስ ክፍል', 'ሁኔታ'];
    const rows = currentTasks.map((t, idx) => [
      idx + 1,
      `"${(t.titleAm || '').replace(/"/g, '""')}"`,
      `"${((t.metric || '') + ' ' + (t.target || '')).trim() || '-'}"`,
      `"${(t.monthTiming || '').replace(/"/g, '""') || '-'}"`,
      `"${(t.budget || '-').replace(/"/g, '""')}"`,
      `"${(t.subUnitAm || '').replace(/"/g, '""') || '-'}"`,
      t.status === 'completed' ? 'ተጠናቋል' : t.status === 'in_progress' ? 'በሂደት ላይ' : 'የታቀደ'
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${deptName}_የ2019_የድርጊት_መርሃግብር_እቅድ.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !canEditDepartment(selectedDeptId)) return;

    addTask(selectedDeptId, {
      titleAm: newTaskTitle.trim(),
      subUnitAm: newTaskSubUnit.trim() || "አጠቃላይ የክፍሉ ስራ",
      status: newTaskStatus,
      articleRef: currentDeptObj?.articleRef || "ደንብ",
      metric: newTaskMetric.trim(),
      target: newTaskTarget.trim(),
      monthTiming: newTaskTiming.trim(),
      budget: newTaskBudget.trim()
    });

    setNewTaskTitle('');
    setNewTaskSubUnit('');
    setNewTaskMetric('');
    setNewTaskTarget('');
    setNewTaskTiming('');
    setNewTaskBudget('');
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
    const matchesStatus = taskFilterStatus === 'all' || t.status === taskFilterStatus;
    const q = taskSearchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      t.titleAm.toLowerCase().includes(q) ||
      (t.subUnitAm && t.subUnitAm.toLowerCase().includes(q)) ||
      (t.monthTiming && t.monthTiming.toLowerCase().includes(q)) ||
      (t.budget && t.budget.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const totalTasksCount = currentTasks.length;
  const completedTasksCount = currentTasks.filter(t => t.status === 'completed').length;
  const inProgressTasksCount = currentTasks.filter(t => t.status === 'in_progress').length;
  const plannedTasksCount = currentTasks.filter(t => t.status === 'planned').length;
  const progressPct = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // All Departments Progress & Audit Calculation
  const departmentsProgress = useMemo(() => {
    return departmentsData.filter(d => d.id !== 'audit').map(dept => {
      const tasks = departmentTasks[dept.id] || [];
      const total = tasks.length;
      const completed = tasks.filter(t => t.status === 'completed').length;
      const inProgress = tasks.filter(t => t.status === 'in_progress').length;
      const planned = tasks.filter(t => t.status === 'planned').length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      return {
        dept,
        tasks,
        total,
        completed,
        inProgress,
        planned,
        pct
      };
    });
  }, [departmentTasks]);

  const totalParishTasks = departmentsProgress.reduce((sum, d) => sum + d.total, 0);
  const totalParishCompleted = departmentsProgress.reduce((sum, d) => sum + d.completed, 0);
  const totalParishInProgress = departmentsProgress.reduce((sum, d) => sum + d.inProgress, 0);
  const totalParishPlanned = departmentsProgress.reduce((sum, d) => sum + d.planned, 0);
  const overallParishPct = totalParishTasks > 0 ? Math.round((totalParishCompleted / totalParishTasks) * 100) : 0;

  const handleExportAllDepartmentsAuditCSV = () => {
    const headers = ['ተ.ቁ', 'የክፍል ስም', 'ምድብ', 'ጠቅላላ እቅድ', 'የተጠናቀቁ', 'በሂደት ላይ', 'የታቀዱ', 'የአፈጻጸም መጠን (%)'];
    const rows = departmentsProgress.map((dp, idx) => [
      idx + 1,
      `"${dp.dept.nameAm}"`,
      `"${dp.dept.category}"`,
      dp.total,
      dp.completed,
      dp.inProgress,
      dp.planned,
      `"${dp.pct}%"`
    ]);
    const summaryRow = ['ድምር', 'ሁሉም ክፍላት', '-', totalParishTasks, totalParishCompleted, totalParishInProgress, totalParishPlanned, `"${overallParishPct}%"`];
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(',')), summaryRow.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `የፍኖተ_ትጉሃን_ክፍላት_አጠቃላይ_የኦዲት_ግስጋሴ_ሪፖርት.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deptRegistrations = useMemo(() => {
    return registrations.filter(r => {
      // In Finote Teguhan Sunday School, ትምህርትና ስልጠና ክፍል (Education & Training)
      // oversees, reviews, and approves ALL Sunday School student registrations!
      const matchesDept = 
        selectedDeptId === 'education'
          ? true
          : (r.departmentId === selectedDeptId || (selectedDeptId === 'children' && r.category === 'children'));
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
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenAuth('login', selectedDeptId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer"
                >
                  <LogIn size={13} />
                  <span>{isAmharic ? "ግባ" : "Sign In"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup', selectedDeptId)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a2723] border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs transition-all cursor-pointer"
                >
                  <UserPlus size={13} />
                  <span>{isAmharic ? "ተመዝገብ" : "Sign Up"}</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* SECOND PAGE MAIN BODY */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Guest Banner if not signed in */}
        {!currentUser && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0a2723] to-[#041210] border-2 border-amber-500/50 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Lock size={22} />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>{isAmharic ? "የክፍላት አስተዳደር ሥርዓት (መግባት ወይም መመዝገብ ግዴታ ነው)" : "Department Management Access (Sign In or Sign Up Required)"}</span>
                </h4>
                <p className="text-xs text-emerald-200/80 mt-0.5">
                  {isAmharic 
                    ? "የክፍልዎን ገጽ ለማረም፣ ማስታወቂያ ለመለጠፍና ተማሪዎችን ለማጽደቅ እባክዎ በይለፍ ቃል ይግቡ፤ አዲስ ከሆኑ አስቀድመው ይመዝገቡ።" 
                    : "To edit department pages, post notices, and approve students, sign in with password or sign up first."}
                </p>
              </div>
            </div>
            {onOpenAuth && (
              <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
                <button
                  type="button"
                  onClick={() => onOpenAuth('login', selectedDeptId)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition-all hover:scale-105"
                >
                  <LogIn size={14} />
                  <span>{isAmharic ? "በይለፍ ቃል ግባ" : "Sign In with Password"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('signup', selectedDeptId)}
                  className="px-4 py-2.5 rounded-xl bg-[#092b26] hover:bg-[#0d3b34] text-amber-300 hover:text-white border border-amber-500/40 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
                >
                  <UserPlus size={14} />
                  <span>{isAmharic ? "አስቀድመህ ተመዝገብ" : "Sign Up First"}</span>
                </button>
              </div>
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
                

                {(selectedDeptId === 'leadership' || selectedDeptId === 'audit') && (
                  <button
                    type="button"
                    onClick={() => {
                      setDeptSubTab('feedback');
                      fetchFeedback();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ring-1 ring-emerald-500/40"
                  >
                    <MessageSquare size={13} className="text-amber-300" />
                    <span>{isAmharic ? `💬 አስተያየቶች (${feedbackList.length})` : `Feedback (${feedbackList.length})`}</span>
                    {unreadFeedbackCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-black animate-pulse">
                        {unreadFeedbackCount}
                      </span>
                    )}
                  </button>
                )}

                {selectedDeptId === 'choir' && (
                  <button
                    type="button"
                    onClick={() => setDeptSubTab('mezmur')}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ring-1 ring-amber-400/50"
                  >
                    <Music size={13} className="text-amber-200" />
                    <span>{isAmharic ? '🎵 መንፈሳዊ መዝሙራትና ዝማሬ' : 'Mezmur & Hymns'}</span>
                  </button>
                )}

                {selectedDeptId === 'education' && (
                  <button
                    type="button"
                    onClick={() => setDeptSubTab('students')}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-700 hover:from-blue-500 hover:to-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer ring-1 ring-blue-400/50"
                  >
                    <UserCheck size={13} className="text-amber-300" />
                    <span>{isAmharic ? `📋 የተማሪዎች ምዝገባ (${deptRegistrations.length})` : `Registrations (${deptRegistrations.length})`}</span>
                  </button>
                )}

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
              {(selectedDeptId === 'audit' ? [
                { id: 'deptProgress', labelAm: '📊 የክፍላት አጠቃላይ ግስጋሴ (Departments Progress)', labelEn: 'All Departments Progress', icon: BarChart3 },
                { id: 'tasks', labelAm: `📋 የኦዲት ክፍሉ የውስጥ እቅድ (${completedTasksCount}/${totalTasksCount})`, labelEn: 'Audit Internal Plan', icon: ListTodo },
                { id: 'feedback', labelAm: `💬 አስተያየቶች (${unreadFeedbackCount > 0 ? `${unreadFeedbackCount} አዲስ` : feedbackList.length})`, labelEn: 'Feedback & Inquiries', icon: MessageSquare }
              ] : [
                { id: 'content', labelAm: '📝 የገጽ ይዘትና መገለጫ', labelEn: 'Page Profile & Content', icon: Edit3 },
                { id: 'tasks', labelAm: `📋 የሥራ ዕቅድና ተግባራት (${completedTasksCount}/${totalTasksCount})`, labelEn: 'Tasks & Mandates', icon: ListTodo },
                ...(selectedDeptId === 'leadership' ? [{ id: 'feedback', labelAm: `💬 አስተያየቶች (${unreadFeedbackCount > 0 ? `${unreadFeedbackCount} አዲስ` : feedbackList.length})`, labelEn: 'Feedback & Inquiries', icon: MessageSquare }] : []),
                ...(selectedDeptId === 'education' ? [{ id: 'students', labelAm: `👥 ተመዝጋቢዎች (${deptRegistrations.length})`, labelEn: 'Registrations', icon: UserCheck }] : []),
                ...(selectedDeptId === 'choir' ? [{ id: 'mezmur', labelAm: '🎵 መንፈሳዊ መዝሙራትና ዝማሬ', labelEn: 'Sacred Mezmur & Hymns', icon: Music }] : []),
                { id: 'preview', labelAm: '👁️ የቀጥታ ገጽ እይታ', labelEn: 'Live Preview', icon: Eye },
                ...(selectedDeptId === 'media' ? [{ id: 'mediaCMS', labelAm: '🎨 የፊት ገጽ ማበጃ (CMS)', labelEn: 'Front-End CMS', icon: Sparkles }] : [])
              ]).map((sub) => {
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

            {/* SUB-TAB: DEPARTMENTS PROGRESS & AUDIT MONITOR (FOR AUDIT DEPARTMENT) */}
            {deptSubTab === 'deptProgress' && (
              <div className="space-y-6 text-left animate-in fade-in duration-200">
                {/* Header Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0a2723] via-[#0d332e] to-[#0a2723] border border-emerald-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow">
                      <ShieldCheck size={26} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>{isAmharic ? 'የሰንበት ትምህርት ቤቱ 14ቱ ክፍላት የዕቅድ አፈጻጸም ክትትል' : 'Parish Departments Performance & Audit Monitor'}</span>
                      </h3>
                      <p className="text-xs text-emerald-300/80 mt-0.5">
                        {isAmharic 
                          ? 'በኦዲትና ኢንስፔክሽን ክፍል በገለልተኝነት የሚመረመርና የሚገመገም የክፍላት የስራ አፈጻጸም ዳሽቦርድ' 
                          : 'Independent inspection and performance monitoring dashboard for all Sunday School departments.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportAllDepartmentsAuditCSV}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow cursor-pointer self-start sm:self-auto shrink-0"
                    title="ሙሉ የኦዲት ሪፖርት በ Excel አውርድ"
                  >
                    <Download size={14} />
                    <span>{isAmharic ? 'ሙሉ የኦዲት ሪፖርት (CSV)' : 'Export Audit CSV'}</span>
                  </button>
                </div>

                {/* Overall KPI Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80">
                    <div className="text-[11px] font-semibold text-emerald-300/80">{isAmharic ? 'ጠቅላላ የክፍላት እቅዶች' : 'Total Parish Tasks'}</div>
                    <div className="text-2xl font-black text-white mt-1">{totalParishTasks}</div>
                    <div className="text-[10px] text-emerald-400/60 mt-0.5">{isAmharic ? 'በ14ቱ ክፍላት የታቀዱ' : 'Across 14 departments'}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80">
                    <div className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1">
                      <span>{isAmharic ? 'የተጠናቀቁ' : 'Completed'}</span>
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{totalParishCompleted}</div>
                    <div className="text-[10px] text-emerald-400/60 mt-0.5">{totalParishTasks > 0 ? Math.round((totalParishCompleted/totalParishTasks)*100) : 0}% {isAmharic ? 'ተጠናቀዋል' : 'done'}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80">
                    <div className="text-[11px] font-semibold text-blue-300 flex items-center gap-1">
                      <span>{isAmharic ? 'በሂደት ላይ' : 'In Progress'}</span>
                      <Clock size={13} className="text-blue-400" />
                    </div>
                    <div className="text-2xl font-black text-blue-400 mt-1">{totalParishInProgress}</div>
                    <div className="text-[10px] text-blue-400/60 mt-0.5">{isAmharic ? 'በአፈጻጸም ላይ' : 'under execution'}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80">
                    <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                      <span>{isAmharic ? 'የታቀዱ (ቀሪ)' : 'Planned'}</span>
                      <ListTodo size={13} className="text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-amber-400 mt-1">{totalParishPlanned}</div>
                    <div className="text-[10px] text-amber-400/60 mt-0.5">{isAmharic ? 'ገና ያልተጀመሩ' : 'pending start'}</div>
                  </div>
                </div>

                {/* Overall Parish Progress Bar */}
                <div className="p-5 rounded-2xl bg-[#09201e] border border-emerald-900/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-amber-400" />
                      <span>{isAmharic ? 'የሰንበት ትምህርት ቤቱ አጠቃላይ የዕቅድ አፈጻጸም መጠን' : 'Overall Sunday School Execution Progress'}</span>
                    </span>
                    <span className="text-amber-400 font-extrabold text-sm">{overallParishPct}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#041211] rounded-full overflow-hidden border border-emerald-900">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${overallParishPct}%` }}
                    />
                  </div>
                </div>

                {/* Inspected Department Detail Modal/Drawer */}
                {auditedDeptId && (
                  <div className="p-6 rounded-3xl bg-[#072420] border-2 border-amber-500/60 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                            {isAmharic ? '🔍 የኦዲት ምርመራ' : 'Audit Inspection View'}
                          </span>
                          <span className="text-xs text-emerald-400/70 font-mono">
                            {departmentsData.find(d => d.id === auditedDeptId)?.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-white mt-1">
                          {departmentsData.find(d => d.id === auditedDeptId)?.nameAm}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAuditedDeptId(null)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
                      >
                        {isAmharic ? '← ወደ ሁሉም ክፍላት ተመለስ' : '← Back to All Departments'}
                      </button>
                    </div>

                    {/* Inspected Department Tasks Table */}
                    <div className="overflow-x-auto rounded-2xl border border-emerald-800 bg-[#041413]">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#0b2824] border-b border-emerald-800 text-emerald-300 text-[11px] uppercase font-bold">
                            <th className="py-2.5 px-3 w-10 text-center text-amber-400">#</th>
                            <th className="py-2.5 px-4 min-w-[260px]">{isAmharic ? 'የትኩረት አቅጣጫ እና ዝርዝር እቅድ' : 'Task Details'}</th>
                            <th className="py-2.5 px-3">{isAmharic ? 'መለኪያ / ዒላማ' : 'Target'}</th>
                            <th className="py-2.5 px-3">{isAmharic ? 'ጊዜ (ወራት)' : 'Timeline'}</th>
                            <th className="py-2.5 px-3">{isAmharic ? 'በጀት' : 'Budget'}</th>
                            <th className="py-2.5 px-3">{isAmharic ? 'ኃላፊ ንዑስ ክፍል' : 'Sub-Unit'}</th>
                            <th className="py-2.5 px-3 text-center">{isAmharic ? 'የክፍሉ ሁኔታ' : 'Status'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-900/60">
                          {(departmentTasks[auditedDeptId] || []).map((t, idx) => (
                            <tr key={t.id} className={idx % 2 === 0 ? 'bg-[#061816]' : 'bg-[#08201d]'}>
                              <td className="py-2 px-3 text-center text-emerald-400/80 font-mono text-[11px]">{idx + 1}</td>
                              <td className="py-2 px-4">
                                <span className={`font-medium ${t.status === 'completed' ? 'line-through text-emerald-300/50' : 'text-slate-100'}`}>
                                  {t.titleAm}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-emerald-300/80 text-[11px]">
                                {[t.metric, t.target].filter(Boolean).join(' ') || '-'}
                              </td>
                              <td className="py-2 px-3 text-amber-200/90 text-[11px]">{t.monthTiming || '-'}</td>
                              <td className="py-2 px-3 text-amber-300 font-mono text-[11px]">{t.budget || '-'}</td>
                              <td className="py-2 px-3 text-emerald-300/80 text-[11px]">
                                {t.subUnitAm ? (
                                  <span className="px-2 py-0.5 rounded bg-[#041211] border border-emerald-900 text-amber-300/90">
                                    {t.subUnitAm}
                                  </span>
                                ) : '-'}
                              </td>
                              <td className="py-2 px-3 text-center">
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                                  t.status === 'completed'
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                                    : t.status === 'in_progress'
                                    ? 'bg-blue-950 text-blue-300 border-blue-600'
                                    : 'bg-amber-950 text-amber-300 border-amber-600'
                                }`}>
                                  {t.status === 'completed' ? '✓ ተጠናቋል' : t.status === 'in_progress' ? '⏳ በሂደት' : '○ የታቀደ'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* All Departments Table */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <BarChart3 size={15} className="text-amber-400" />
                      <span>{isAmharic ? 'የ14ቱ ክፍላት የዕቅድ አፈጻጸም ዝርዝር ሰንጠረዥ' : 'All Departments Progress Table'}</span>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                      <input
                        type="text"
                        value={auditDeptSearch}
                        onChange={(e) => setAuditDeptSearch(e.target.value)}
                        placeholder={isAmharic ? 'ክፍል በስም ፈልግ...' : 'Filter department...'}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#061816] border border-emerald-900/80 rounded-xl text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-amber-400/80"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-emerald-800/80 bg-[#061816] shadow-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#0b2824] border-b border-emerald-800 text-emerald-300 uppercase font-semibold text-[11px] tracking-wider">
                          <th className="py-3 px-3 w-10 text-center text-amber-400">#</th>
                          <th className="py-3 px-4 min-w-[200px]">{isAmharic ? 'የክፍል ስም' : 'Department Name'}</th>
                          <th className="py-3 px-3 text-center">{isAmharic ? 'ጠቅላላ እቅድ' : 'Tasks'}</th>
                          <th className="py-3 px-3 text-center text-emerald-400">{isAmharic ? 'ተጠናቋል' : 'Done'}</th>
                          <th className="py-3 px-3 text-center text-blue-400">{isAmharic ? 'በሂደት' : 'Active'}</th>
                          <th className="py-3 px-3 text-center text-amber-400">{isAmharic ? 'የታቀደ' : 'Pending'}</th>
                          <th className="py-3 px-4 min-w-[180px]">{isAmharic ? 'የአፈጻጸም መጠን' : 'Progress'}</th>
                          <th className="py-3 px-3 text-center">{isAmharic ? 'የኦዲት ምርመራ' : 'Action'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-900/60">
                        {departmentsProgress
                          .filter(dp => !auditDeptSearch.trim() || dp.dept.nameAm.toLowerCase().includes(auditDeptSearch.toLowerCase()) || dp.dept.nameEn.toLowerCase().includes(auditDeptSearch.toLowerCase()))
                          .map((dp, idx) => (
                            <tr 
                              key={dp.dept.id}
                              className={`transition-colors hover:bg-emerald-900/30 ${
                                idx % 2 === 0 ? 'bg-[#061816]' : 'bg-[#08201d]'
                              } ${auditedDeptId === dp.dept.id ? 'ring-2 ring-amber-500/80 bg-amber-950/20' : ''}`}
                            >
                              <td className="py-3 px-3 text-center text-emerald-400/80 font-mono text-[11px]">{idx + 1}</td>
                              
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-100 flex items-center gap-2">
                                  <span>{dp.dept.nameAm}</span>
                                </div>
                                <div className="text-[10px] text-emerald-400/60 font-mono">{dp.dept.nameEn}</div>
                              </td>

                              <td className="py-3 px-3 text-center font-bold text-white text-xs">{dp.total}</td>

                              <td className="py-3 px-3 text-center">
                                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[11px]">
                                  {dp.completed}
                                </span>
                              </td>

                              <td className="py-3 px-3 text-center">
                                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 font-bold text-[11px]">
                                  {dp.inProgress}
                                </span>
                              </td>

                              <td className="py-3 px-3 text-center">
                                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-bold text-[11px]">
                                  {dp.planned}
                                </span>
                              </td>

                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2.5 bg-[#041211] rounded-full overflow-hidden border border-emerald-900">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-300 ${
                                        dp.pct >= 75 ? 'bg-emerald-400' : dp.pct >= 40 ? 'bg-amber-400' : 'bg-blue-400'
                                      }`}
                                      style={{ width: `${dp.pct}%` }}
                                    />
                                  </div>
                                  <span className="text-[11px] font-black text-amber-300 w-9 text-right font-mono">
                                    {dp.pct}%
                                  </span>
                                </div>
                              </td>

                              <td className="py-3 px-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => setAuditedDeptId(dp.dept.id)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 text-[11px] font-semibold transition-all cursor-pointer shadow hover:scale-105 inline-flex items-center gap-1"
                                >
                                  <span>{isAmharic ? 'መርምር' : 'Inspect'}</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

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
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
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
                          className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                            taskFilterStatus === st.id
                              ? 'bg-amber-500 text-slate-950 font-bold shadow'
                              : 'bg-[#09201e] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>

                    {/* Right Controls: View Switcher & Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* View Mode Toggle */}
                      <div className="flex items-center p-0.5 rounded-xl bg-[#061816] border border-emerald-900/80">
                        <button
                          type="button"
                          onClick={() => setTaskViewMode('table')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            taskViewMode === 'table'
                              ? 'bg-emerald-600 text-white shadow'
                              : 'text-emerald-400/80 hover:text-white'
                          }`}
                          title="Excel ሰንጠረዥ እይታ"
                        >
                          <Table size={13} />
                          <span>{isAmharic ? 'ሰንጠረዥ (Excel)' : 'Spreadsheet'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setTaskViewMode('cards')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            taskViewMode === 'cards'
                              ? 'bg-emerald-600 text-white shadow'
                              : 'text-emerald-400/80 hover:text-white'
                          }`}
                          title="ካርድ እይታ"
                        >
                          <LayoutGrid size={13} />
                          <span>{isAmharic ? 'ካርዶች' : 'Cards'}</span>
                        </button>
                      </div>

                      {/* Export to CSV/Excel */}
                      <button
                        type="button"
                        onClick={handleExportTasksToCSV}
                        className="px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/80 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                        title="ይህን እቅድ በ Excel / CSV አውርድ"
                      >
                        <Download size={13} />
                        <span>{isAmharic ? 'Excel አውርድ' : 'Export CSV'}</span>
                      </button>

                      {/* Add Custom Task Button */}
                      {canEditDepartment(selectedDeptId) && (
                        <button
                          type="button"
                          onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Plus size={14} />
                          <span>{isAmharic ? 'አዲስ እቅድ ጨምር' : 'Add Task'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Task Search Bar */}
                  <div className="relative">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                    <input
                      type="text"
                      value={taskSearchQuery}
                      onChange={(e) => setTaskSearchQuery(e.target.value)}
                      placeholder={isAmharic ? 'በእቅድ ርዕስ፣ በንዑስ ክፍል ወይም በወራት ፈልግ...' : 'Search action plans by task, sub-unit, month...'}
                      className="w-full pl-9 pr-4 py-2 bg-[#061816] border border-emerald-900/80 rounded-xl text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-amber-400/80"
                    />
                  </div>
                </div>

                {/* Add New Task Modal/Inline Form */}
                {showAddTaskForm && canEditDepartment(selectedDeptId) && (
                  <form onSubmit={handleAddNewTask} className="p-5 rounded-2xl bg-[#092b27] border-2 border-amber-500/40 space-y-3 shadow-xl">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Plus size={15} />
                      <span>{isAmharic ? 'አዲስ የድርጊት መርሃ ግብር እቅድ መመዝገቢያ' : 'Create New Action Task / Activity'}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                          {isAmharic ? 'የትኩረት አቅጣጫ እና ዝርዝር እቅድ *' : 'Task Title / Action Item *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder={isAmharic ? 'ምሳሌ፦ ለተማሪዎች የነገረ መጽሐፍ ቅዱስ ማጠቃለያ ፈተና ማዘጋጀት...' : 'Enter action item...'}
                          className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                          {isAmharic ? 'ኃላፊ ንዑስ ክፍል' : 'Sub-Unit / Assignee'}
                        </label>
                        <input
                          type="text"
                          value={newTaskSubUnit}
                          onChange={(e) => setNewTaskSubUnit(e.target.value)}
                          placeholder={isAmharic ? 'ምሳሌ፦ የትምህርት ቡድን' : 'e.g., Training Committee'}
                          className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                          {isAmharic ? 'መለኪያና ዒላማ' : 'Metric & Target'}
                        </label>
                        <input
                          type="text"
                          value={newTaskMetric}
                          onChange={(e) => setNewTaskMetric(e.target.value)}
                          placeholder={isAmharic ? 'ምሳሌ፦ በቁጥር / 50' : 'e.g. 50 members'}
                          className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                          {isAmharic ? 'የሚፈጸምበት ወራት' : 'Timeline / Months'}
                        </label>
                        <input
                          type="text"
                          value={newTaskTiming}
                          onChange={(e) => setNewTaskTiming(e.target.value)}
                          placeholder={isAmharic ? 'ምሳሌ፦ ጥቅምት - ታህሳስ' : 'e.g. Oct - Dec'}
                          className="w-full px-3 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-300 mb-1">
                          {isAmharic ? 'የታቀደ በጀት' : 'Budget'}
                        </label>
                        <input
                          type="text"
                          value={newTaskBudget}
                          onChange={(e) => setNewTaskBudget(e.target.value)}
                          placeholder={isAmharic ? 'ምሳሌ፦ 15,000 ብር' : 'e.g. 15,000 ETB'}
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
                        className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer shadow"
                      >
                        {isAmharic ? 'እቅዱን መዝግብ' : 'Save Task'}
                      </button>
                    </div>
                  </form>
                )}

                {/* SPREADSHEET (EXCEL) TABLE VIEW */}
                {taskViewMode === 'table' ? (
                  <div className="overflow-x-auto rounded-2xl border border-emerald-800/80 bg-[#061816] shadow-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#0b2824] border-b border-emerald-800 text-emerald-300 uppercase font-semibold text-[11px] tracking-wider">
                          <th className="py-3 px-3 w-12 text-center text-amber-400">#</th>
                          <th className="py-3 px-4 min-w-[280px]">{isAmharic ? 'የትኩረት አቅጣጫ እና ዝርዝር እቅድ' : 'Action Item / Task Details'}</th>
                          <th className="py-3 px-3 min-w-[110px]">{isAmharic ? 'መለኪያ / ዒላማ' : 'Metric / Target'}</th>
                          <th className="py-3 px-3 min-w-[120px]">{isAmharic ? 'ጊዜ (ወራት)' : 'Timeline'}</th>
                          <th className="py-3 px-3 min-w-[100px]">{isAmharic ? 'በጀት' : 'Budget'}</th>
                          <th className="py-3 px-3 min-w-[130px]">{isAmharic ? 'ኃላፊ ንዑስ ክፍል' : 'Sub-Unit'}</th>
                          <th className="py-3 px-3 min-w-[120px] text-center">{isAmharic ? 'ሁኔታ' : 'Status'}</th>
                          <th className="py-3 px-3 w-16 text-center">{isAmharic ? 'ተግባር' : 'Action'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-900/60">
                        {filteredTasks.map((task, idx) => {
                          const canEdit = canEditDepartment(selectedDeptId);
                          return (
                            <tr 
                              key={task.id}
                              className={`transition-colors hover:bg-emerald-900/30 ${
                                idx % 2 === 0 ? 'bg-[#061816]' : 'bg-[#08201d]'
                              }`}
                            >
                              {/* Row No & Checkbox */}
                              <td className="py-2.5 px-3 text-center text-emerald-400/80 font-mono text-[11px]">
                                <button
                                  type="button"
                                  disabled={!canEdit}
                                  onClick={() => handleCycleTaskStatus(task)}
                                  className={`w-5 h-5 mx-auto rounded border flex items-center justify-center transition-all ${
                                    task.status === 'completed'
                                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                      : task.status === 'in_progress'
                                      ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                                      : 'bg-transparent border-emerald-800 text-transparent'
                                  } ${canEdit ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
                                  title={isAmharic ? 'ሁኔታ ቀይር' : 'Toggle status'}
                                >
                                  {task.status === 'completed' ? <Check size={13} strokeWidth={3} /> : task.status === 'in_progress' ? '⏳' : null}
                                </button>
                              </td>

                              {/* Task Title */}
                              <td className="py-2.5 px-4">
                                <span className={`font-medium ${task.status === 'completed' ? 'line-through text-emerald-300/50' : 'text-slate-100'}`}>
                                  {task.titleAm}
                                </span>
                              </td>

                              {/* Metric / Target */}
                              <td className="py-2.5 px-3 text-emerald-300/80 text-[11px]">
                                {task.metric || task.target ? (
                                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-900 text-emerald-300">
                                    {[task.metric, task.target].filter(Boolean).join(' ')}
                                  </span>
                                ) : (
                                  <span className="text-emerald-600">-</span>
                                )}
                              </td>

                              {/* Timeline */}
                              <td className="py-2.5 px-3 text-emerald-200/90 text-[11px]">
                                {task.monthTiming ? (
                                  <span className="font-sans text-amber-200/90">{task.monthTiming}</span>
                                ) : (
                                  <span className="text-emerald-600">-</span>
                                )}
                              </td>

                              {/* Budget */}
                              <td className="py-2.5 px-3 text-amber-300 font-mono text-[11px]">
                                {task.budget && task.budget !== '-' ? task.budget : <span className="text-emerald-600 font-sans">-</span>}
                              </td>

                              {/* SubUnit */}
                              <td className="py-2.5 px-3 text-emerald-300/80 text-[11px]">
                                {task.subUnitAm ? (
                                  <span className="px-2 py-0.5 rounded bg-[#041211] border border-emerald-900 text-amber-300/90">
                                    {task.subUnitAm}
                                  </span>
                                ) : (
                                  <span className="text-emerald-600">-</span>
                                )}
                              </td>

                              {/* Status Toggle Badge */}
                              <td className="py-2.5 px-3 text-center">
                                <button
                                  type="button"
                                  disabled={!canEdit}
                                  onClick={() => handleCycleTaskStatus(task)}
                                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border transition-all inline-flex items-center gap-1 ${
                                    task.status === 'completed'
                                      ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                                      : task.status === 'in_progress'
                                      ? 'bg-blue-950 text-blue-300 border-blue-600'
                                      : 'bg-amber-950 text-amber-300 border-amber-600'
                                  } ${canEdit ? 'hover:scale-105 cursor-pointer shadow' : 'cursor-default'}`}
                                  title={canEdit ? (isAmharic ? 'ሁኔታውን ለመቀየር እዚህ ይጫኑ' : 'Click to cycle status') : ''}
                                >
                                  {task.status === 'completed' 
                                    ? (isAmharic ? '✓ ተጠናቋል' : 'Completed') 
                                    : task.status === 'in_progress'
                                    ? (isAmharic ? '⏳ በሂደት' : 'In Progress')
                                    : (isAmharic ? '○ የታቀደ' : 'Planned')}
                                </button>
                              </td>

                              {/* Action */}
                              <td className="py-2.5 px-3 text-center">
                                {canEdit && (
                                  <button
                                    type="button"
                                    onClick={() => deleteTask(selectedDeptId, task.id)}
                                    className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                                    title="እቅዱን ሰርዝ"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {filteredTasks.length === 0 && (
                      <div className="py-8 text-center text-xs text-emerald-300/60 bg-[#061816]">
                        {isAmharic ? 'በዚህ ማጣሪያ የተገኘ እቅድ የለም።' : 'No tasks match this filter.'}
                      </div>
                    )}
                  </div>
                ) : (
                  /* CARD CHECKLIST VIEW */
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
                                {task.monthTiming && (
                                  <span className="px-2 py-0.5 rounded-md bg-[#041211] border border-emerald-900 text-emerald-300">
                                    📅 {task.monthTiming}
                                  </span>
                                )}
                                {task.budget && task.budget !== '-' && (
                                  <span className="px-2 py-0.5 rounded-md bg-amber-950/40 border border-amber-900/60 text-amber-300 font-mono">
                                    💰 {task.budget}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
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

                            {canEdit && (
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
                )}

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

                        {/* SUB-TAB: BELIEVERS' FEEDBACK & INQUIRIES (FOR LEADERSHIP & AUDIT) */}
            {deptSubTab === 'feedback' && (selectedDeptId === 'leadership' || selectedDeptId === 'audit') && (
              <div className="space-y-5 text-left animate-in fade-in duration-200">
                {/* Header & Sync */}
                <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0a2723] via-[#0d332e] to-[#0a2723] border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0 shadow">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>{isAmharic ? 'የምዕመናን አስተያየትና ጥያቄዎች ሳጥን' : 'Feedback & Inquiries Inbox'}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                          {feedbackList.length} {isAmharic ? 'መልዕክቶች' : 'Messages'}
                        </span>
                      </h4>
                      <p className="text-xs text-emerald-200/80 mt-0.5">
                        {isAmharic 
                          ? 'በድረ-ገጹ ላይ ከምዕመናን በቀጥታ ለሥራ አመራር እና ለኦዲትና ኢንስፔክሽን የተላኩ አስተያየቶችና ጥያቄዎች' 
                          : 'Direct feedback and inquiries submitted by believers to Executive Leadership & Audit.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={fetchFeedback}
                    disabled={isSyncingFeedback}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-auto shrink-0"
                  >
                    <RefreshCw size={14} className={isSyncingFeedback ? 'animate-spin' : ''} />
                    <span>{isSyncingFeedback ? (isAmharic ? 'በመጫን ላይ...' : 'Syncing...') : (isAmharic ? 'ከሰርቨር አድስ' : 'Sync Server')}</span>
                  </button>
                </div>

                {/* KPI Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80 shadow">
                    <span className="text-[11px] font-bold text-emerald-300/80 block uppercase">
                      {isAmharic ? 'ጠቅላላ መልዕክት' : 'Total Messages'}
                    </span>
                    <span className="text-2xl font-black text-white font-mono">{feedbackList.length}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#09201e] border border-rose-500/30 shadow">
                    <span className="text-[11px] font-bold text-rose-300 block uppercase">
                      {isAmharic ? 'ያልተነበበ / አዲስ' : 'Unread'}
                    </span>
                    <span className="text-2xl font-black text-rose-400 font-mono">{unreadFeedbackCount}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#09201e] border border-blue-500/30 shadow">
                    <span className="text-[11px] font-bold text-blue-300 block uppercase">
                      {isAmharic ? 'የተነበበ' : 'Read'}
                    </span>
                    <span className="text-2xl font-black text-blue-400 font-mono">
                      {feedbackList.filter(f => f.status === 'read').length}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-500/30 shadow">
                    <span className="text-[11px] font-bold text-emerald-400 block uppercase">
                      {isAmharic ? 'ምላሽ የተሰጠው' : 'Replied'}
                    </span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">
                      {feedbackList.filter(f => f.status === 'replied').length}
                    </span>
                  </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow">
                  <div className="relative flex-1">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                    <input
                      type="text"
                      value={feedbackSearchQuery}
                      onChange={(e) => setFeedbackSearchQuery(e.target.value)}
                      placeholder={isAmharic ? 'በስም፣ በስልክ፣ በርዕስ ወይም በመልዕክት ይፈልጉ...' : 'Search by name, contact, subject, or message...'}
                      className="w-full pl-9 pr-4 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {[
                      { id: 'all', label: isAmharic ? 'ሁሉም' : 'All' },
                      { id: 'unread', label: isAmharic ? 'ያልተነበበ' : 'Unread' },
                      { id: 'read', label: isAmharic ? 'የተነበበ' : 'Read' },
                      { id: 'replied', label: isAmharic ? 'ምላሽ የተሰጠ' : 'Replied' },
                    ].map(st => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setFeedbackFilterStatus(st.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          feedbackFilterStatus === st.id
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'bg-[#041211] text-emerald-300/80 hover:text-white border border-emerald-900'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback List */}
                <div className="space-y-3">
                  {visibleFeedback.map((item) => (
                    <div
                      key={item.id || item._id}
                      className={`p-5 rounded-2xl border transition-all text-left space-y-3 ${
                        item.status === 'unread'
                          ? 'bg-[#0b2b25] border-amber-500/50 shadow-lg ring-1 ring-amber-500/20'
                          : item.status === 'replied'
                          ? 'bg-[#061816]/70 border-emerald-800/60 opacity-90'
                          : 'bg-[#061816] border-emerald-900/80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/60 pb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-white text-sm">{item.name}</h5>
                            <span className="text-xs text-emerald-300 font-mono">({item.contactInfo})</span>
                          </div>
                          <div className="text-[11px] text-amber-300/80 font-medium mt-0.5">{item.subject}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                            item.status === 'unread'
                              ? 'bg-rose-950 text-rose-300 border-rose-600'
                              : item.status === 'read'
                              ? 'bg-blue-950 text-blue-300 border-blue-600'
                              : 'bg-emerald-950 text-emerald-300 border-emerald-600'
                          }`}>
                            {item.status === 'unread' ? 'አዲስ' : item.status === 'read' ? 'ተነቧል' : 'ምላሽ አግኝቷል'}
                          </span>
                          <span className="text-[10px] text-emerald-400/60 font-mono">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed bg-[#041211]/80 p-3.5 rounded-xl border border-emerald-900/50">
                        {item.message}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                        <div className="flex items-center gap-2">
                          {item.status !== 'read' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateFeedbackStatus(item.id || item._id || '', 'read')}
                              className="px-3 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700 text-xs font-semibold transition-all cursor-pointer"
                            >
                              {isAmharic ? 'እንደ ተነበበ ቁጠር' : 'Mark as Read'}
                            </button>
                          )}
                          {item.status !== 'replied' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateFeedbackStatus(item.id || item._id || '', 'replied')}
                              className="px-3 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 text-xs font-semibold transition-all cursor-pointer"
                            >
                              {isAmharic ? 'ምላሽ ተሰጥቷል' : 'Mark as Replied'}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteFeedback(item.id || item._id || '')}
                            className="px-3 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800 text-xs font-semibold transition-all cursor-pointer"
                          >
                            {isAmharic ? 'ሰርዝ' : 'Delete'}
                          </button>
                        </div>

                        {item.contactInfo.includes('@') ? (
                          <a
                            href={`mailto:${item.contactInfo}?subject=Re: ${encodeURIComponent(item.subject)}`}
                            className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                          >
                            <Mail size={12} />
                            <span>{isAmharic ? 'በኢሜይል መልስ' : 'Reply by Email'}</span>
                          </a>
                        ) : (
                          <a
                            href={`tel:${item.contactInfo.replace(/\s+/g, '')}`}
                            className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                          >
                            <Phone size={12} />
                            <span>{isAmharic ? 'በስልክ ደውል' : 'Call Phone'}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {visibleFeedback.length === 0 && (
                    <div className="py-12 text-center text-xs text-emerald-300/70 bg-[#09201e] rounded-3xl border border-dashed border-emerald-900 space-y-2">
                      <MessageSquare size={28} className="mx-auto text-emerald-500/40" />
                      <p className="font-semibold text-sm text-white">
                        {isAmharic ? 'ምንም የተቀበሉት አስተያየት ወይም ጥያቄ የለም።' : 'No feedback or inquiries found.'}
                      </p>
                      <p className="text-emerald-300/60 max-w-sm mx-auto">
                        {isAmharic 
                          ? 'ምዕመናን በድረ-ገጹ ላይ መልዕክት ሲልኩ እዚህ ጋር በቅጽበት ይደርሰዎታል' 
                          : 'Incoming messages from believers will appear here in real time'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB: MEZMUR & SACRED HYMNS (FOR CHOIR DEPARTMENT ONLY) */}
            {deptSubTab === 'mezmur' && selectedDeptId === 'choir' && (
              <div className="space-y-4 animate-in fade-in duration-200 text-left">
                <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0a2723] via-[#0d332e] to-[#0a2723] border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0 shadow">
                      <Music size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>{isAmharic ? "የመዝሙር ክፍል መንፈሳዊ መዝሙራትና ዝማሬ ማዕከል" : "Choir Spiritual Mezmur & Hymns Hub"}</span>
                        <Sparkles size={16} className="text-amber-400" />
                      </h3>
                      <p className="text-xs text-emerald-200/80 mt-0.5">
                        {isAmharic 
                          ? "የፍኖተ ትጉሃን ሰንበት ትምህርት ቤት የመዝሙር ክፍል የዝማሬዎች ማጫወቻ፣ ግጥሞችና የዜማ ስብስቦች ማስተዳደሪያ" 
                          : "Sacred Orthodox chants, audio hymns, lyrics, and choir selections managed by the Choir Department"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden border border-emerald-900/60 shadow-2xl bg-[#081716]">
                  <MezmurPlayer />
                </div>
              </div>
            )}

            {/* SUB-TAB 3: DEPARTMENT REGISTRATIONS */}
            {deptSubTab === 'students' && (
              <div className="space-y-4">
                {/* Special Academic Oversight Banner for Education Department */}
                {selectedDeptId === 'education' && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 via-[#09201e] to-emerald-950/80 border border-blue-500/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-start gap-2.5 text-blue-100">
                      <BookOpen size={20} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold text-sm mb-0.5">
                          {isAmharic ? 'የትምህርትና ስልጠና ክፍል የተማሪዎች ምዝገባ ማዕከል' : 'Education & Training Student Admissions Hub'}
                        </strong>
                        <p className="text-emerald-200/80">
                          {isAmharic 
                            ? 'ይህ ክፍል የሰንበት ትምህርት ቤቱን አዲስና ነባር ተማሪዎች የመቀበል፣ ሰነዶቻቸውን የማረጋገጥና የማጽደቅ (Approve & Enroll) ዋና ኃላፊነት አለበት።' 
                            : 'This department oversees student admissions, credential validation, approval, and class placement.'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSyncWithBackend}
                      disabled={isSyncing}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all disabled:opacity-50"
                    >
                      <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                      <span>{isSyncing ? (isAmharic ? 'በመጫን ላይ...' : 'Syncing...') : (isAmharic ? 'ከሰርቨር አድስ' : 'Sync Server')}</span>
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-900 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <UserCheck size={18} className="text-amber-400" />
                      <span>
                        {selectedDeptId === 'education'
                          ? (isAmharic ? 'በትምህርትና ስልጠና ክፍል ስር ያሉ ተማሪዎች' : 'All Enrolled Students & Applicants')
                          : (isAmharic ? `ለ${currentDeptObj.nameAm} የተመዘገቡ ተማሪዎችና አባላት` : 'Enrolled Students & Members')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold">
                        {deptRegistrations.length}
                      </span>
                    </h4>
                    <p className="text-xs text-emerald-200/70">
                      {isAmharic ? 'የተመዘገቡ ተማሪዎችን መረጃ ይመልከቱ፣ ሁኔታቸውን ያጽድቁ ወይም ወደ ክፍል ይመድቡ' : 'Review applicants, verify credentials, and approve or enroll students'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs flex-wrap">
                    {['all', 'pending', 'approved', 'enrolled'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setRegFilterStatus(st)}
                        className={`px-3 py-1 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                          regFilterStatus === st
                            ? 'bg-amber-500 text-slate-950 font-bold shadow'
                            : 'bg-[#09201e] text-emerald-200/80 border border-emerald-900/80 hover:text-white'
                        }`}
                      >
                        {st === 'all' ? (isAmharic ? 'ሁሉም' : 'All') :
                         st === 'pending' ? (isAmharic ? 'ማረጋገጫ የሚጠብቅ' : 'Pending') :
                         st === 'approved' ? (isAmharic ? 'የጸደቀ' : 'Approved') : (isAmharic ? 'የተመዘገበ' : 'Enrolled')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auth Gate Reminder for Approving Students */}
                {!currentUser && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 text-amber-300">
                      <Lock size={16} className="text-amber-400 shrink-0" />
                      <span>{isAmharic ? "🔒 ተማሪዎችን ለማጽደቅ ወይም ለመመደብ እባክዎ አስቀድመው በይለፍ ቃል ይግቡ፤ መለያ ከሌለዎት ይመዝገቡ።" : "Please sign in with password or sign up first to approve applicants."}</span>
                    </div>
                    {onOpenAuth && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onOpenAuth('login', selectedDeptId)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer shadow"
                        >
                          <LogIn size={13} />
                          <span>{isAmharic ? "ግባ" : "Sign In"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenAuth('signup', selectedDeptId)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#092b26] border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <UserPlus size={13} />
                          <span>{isAmharic ? "ተመዝገብ" : "Sign Up"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  {deptRegistrations.map((reg) => {
                    const targetDept = departmentsData.find(d => d.id === reg.departmentId);
                    const deptLabel = targetDept 
                      ? (isAmharic ? targetDept.nameAm : targetDept.nameEn)
                      : (reg.category === 'children' ? (isAmharic ? 'ሕጻናት ክፍል' : 'Children') : (isAmharic ? 'ትምህርት ክፍል' : 'Education'));

                    return (
                      <div 
                        key={reg.id}
                        className="p-4 sm:p-5 rounded-2xl bg-[#09201e] border border-emerald-900/80 hover:border-emerald-700/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow"
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
                              <span>ስልክ፦ <a href={`tel:${reg.phone}`} className="text-white hover:text-amber-300 font-mono underline decoration-dotted">{reg.phone}</a></span>
                              {reg.address && <span>አድራሻ፦ {reg.address}</span>}
                              {reg.registeredAt && <span className="text-emerald-400/60 font-mono text-[11px]">ቀን፦ {reg.registeredAt}</span>}
                            </div>

                            {reg.notes && (
                              <div className="text-[11px] text-amber-300/80 italic mt-0.5">
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

                          {/* Quick Approval Controls */}
                          {reg.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => {
                                if (!currentUser) {
                                  if (onOpenAuth) onOpenAuth('login', selectedDeptId);
                                  return;
                                }
                                updateRegistrationStatus(reg.id, 'approved', 'በትምህርትና ስልጠና ክፍል ጸድቋል');
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Check size={13} />
                              <span>{isAmharic ? 'አጽድቅ' : 'Approve'}</span>
                            </button>
                          )}

                          {reg.status === 'approved' && (
                            <button
                              type="button"
                              onClick={() => {
                                if (!currentUser) {
                                  if (onOpenAuth) onOpenAuth('login', selectedDeptId);
                                  return;
                                }
                                updateRegistrationStatus(reg.id, 'enrolled', 'ወደ ክፍል ተመድቧል');
                              }}
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

                  {deptRegistrations.length === 0 && (
                    <div className="py-12 text-center text-xs text-emerald-300/70 bg-[#09201e] rounded-3xl border border-dashed border-emerald-900 space-y-2">
                      <UserCheck size={28} className="mx-auto text-emerald-500/40" />
                      <p className="font-semibold text-sm text-white">
                        {isAmharic ? 'ምንም የተመዘገበ ተማሪ አልተገኘም።' : 'No registered students found.'}
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
        {/* TAB 4.5: BELIEVERS' FEEDBACK & INQUIRIES INBOX                            */}
        {/* ========================================================================= */}
        {mainTab === 'feedback' && !isStudent && (
          <div className="space-y-5 text-left animate-in fade-in duration-200">
            {/* Header & Sync */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-emerald-900 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xl font-black text-white flex items-center gap-2">
                    <MessageSquare size={22} className="text-amber-400" />
                    <span>{isAmharic ? 'የምዕመናን አስተያየትና ጥያቄዎች ሳጥን' : 'Feedback & Inquiries Inbox'}</span>
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold font-mono">
                    {feedbackList.length} {isAmharic ? 'መልዕክቶች' : 'Messages'}
                  </span>
                </div>
                <p className="text-xs text-emerald-200/70">
                  {isAmharic 
                    ? 'በድረ-ገጹ ላይ ከምዕመናን እና ከተማሪዎች በቀጥታ የተላኩ አስተያየቶች፣ ጥያቄዎችና ማሳሰቢያዎች' 
                    : 'Manage incoming questions, feedback, and inquiries submitted by visitors'}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchFeedback}
                disabled={isSyncingFeedback}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={14} className={isSyncingFeedback ? 'animate-spin' : ''} />
                <span>{isSyncingFeedback ? (isAmharic ? 'በመጫን ላይ...' : 'Syncing...') : (isAmharic ? 'ከሰርቨር አድስ' : 'Sync Server')}</span>
              </button>
            </div>

            {/* KPI Metric Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80 shadow">
                <span className="text-[11px] font-bold text-emerald-300/80 block uppercase">
                  {isAmharic ? 'ጠቅላላ መልዕክት' : 'Total Messages'}
                </span>
                <span className="text-2xl font-black text-white font-mono">{feedbackList.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#09201e] border border-rose-500/30 shadow">
                <span className="text-[11px] font-bold text-rose-300 block uppercase">
                  {isAmharic ? 'ያልተነበበ / አዲስ' : 'Unread'}
                </span>
                <span className="text-2xl font-black text-rose-400 font-mono">{unreadFeedbackCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#09201e] border border-blue-500/30 shadow">
                <span className="text-[11px] font-bold text-blue-300 block uppercase">
                  {isAmharic ? 'የተነበበ' : 'Read'}
                </span>
                <span className="text-2xl font-black text-blue-400 font-mono">
                  {feedbackList.filter(f => f.status === 'read').length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-500/30 shadow">
                <span className="text-[11px] font-bold text-emerald-400 block uppercase">
                  {isAmharic ? 'ምላሽ የተሰጠው' : 'Replied'}
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {feedbackList.filter(f => f.status === 'replied').length}
                </span>
              </div>
            </div>

            {/* Filters & Search Toolbar */}
            <div className="p-4 rounded-2xl bg-[#09201e] border border-emerald-900/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60" />
                <input
                  type="text"
                  value={feedbackSearchQuery}
                  onChange={(e) => setFeedbackSearchQuery(e.target.value)}
                  placeholder={isAmharic ? 'በስም፣ በስልክ፣ በርዕስ ወይም በመልዕክት ይፈልጉ...' : 'Search by name, contact, subject, or message...'}
                  className="w-full pl-9 pr-4 py-2 bg-[#041211] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['all', 'unread', 'read', 'replied'] as const).map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFeedbackFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      feedbackFilterStatus === st
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-[#041211] text-emerald-200/70 hover:text-white border border-emerald-800/80'
                    }`}
                  >
                    {st === 'all' ? (isAmharic ? 'ሁሉም' : 'All') :
                     st === 'unread' ? (isAmharic ? 'ያልተነበበ' : 'Unread') :
                     st === 'read' ? (isAmharic ? 'የተነበበ' : 'Read') : (isAmharic ? 'ምላሽ የተሰጠው' : 'Replied')}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Cards Feed */}
            <div className="space-y-3">
              {visibleFeedback.map((item, idx) => {
                const targetDept = departmentsData.find(d => d.id === item.departmentId);
                const deptLabel = targetDept 
                  ? (isAmharic ? targetDept.nameAm : targetDept.nameEn)
                  : (isAmharic ? 'አጠቃላይ / ሥራ አመራር' : 'General / Leadership');

                return (
                  <div
                    key={item.id || item._id || idx}
                    className={`p-5 rounded-2xl bg-[#09201e] border transition-all ${
                      item.status === 'unread' 
                        ? 'border-amber-500/60 shadow-lg shadow-amber-500/5 bg-gradient-to-r from-[#09201e] via-[#09201e] to-amber-950/20' 
                        : 'border-emerald-900/70 hover:border-emerald-700'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-bold text-white text-base flex items-center gap-2">
                            {item.name}
                            {item.status === 'unread' && (
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                            )}
                          </h5>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#041211] text-amber-300 border border-amber-500/30 font-bold">
                            🏛️ {deptLabel}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                            item.status === 'replied'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : item.status === 'read'
                              ? 'bg-blue-950 text-blue-300 border-blue-700'
                              : 'bg-rose-950 text-rose-300 border-rose-700'
                          }`}>
                            {item.status === 'replied' ? (isAmharic ? 'ምላሽ ተሰጥቷል' : 'Replied') :
                             item.status === 'read' ? (isAmharic ? 'የተነበበ' : 'Read') : (isAmharic ? 'አዲስ / ያልተነበበ' : 'Unread')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-emerald-200/80">
                          <span>
                            ግንኙነት፦ <strong className="text-white font-mono">{item.contactInfo}</strong>
                          </span>
                          {item.createdAt && (
                            <span className="text-emerald-400/60 font-mono text-[11px]">
                              ቀን፦ {new Date(item.createdAt).toLocaleString(isAmharic ? 'am-ET' : 'en-US')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {item.status === 'unread' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateFeedbackStatus(item.id || item._id || '', 'read')}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Check size={13} />
                            <span>{isAmharic ? 'አንብቤዋለሁ' : 'Mark Read'}</span>
                          </button>
                        )}

                        {item.status !== 'replied' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateFeedbackStatus(item.id || item._id || '', 'replied')}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 text-slate-950 font-black text-xs shadow transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Reply size={13} />
                            <span>{isAmharic ? 'ምላሽ ተሰጥቷል' : 'Mark Replied'}</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteFeedback(item.id || item._id || '')}
                          className="p-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 transition-colors cursor-pointer"
                          title={isAmharic ? 'መልዕክቱን ሰርዝ' : 'Delete Message'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Subject & Message Content Box */}
                    <div className="p-3.5 rounded-xl bg-[#041211] border border-emerald-900/60 space-y-1.5">
                      <div className="text-xs font-bold text-amber-300">
                        ርዕስ፦ {item.subject}
                      </div>
                      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed whitespace-pre-wrap">
                        {item.message}
                      </p>
                    </div>

                    {/* Quick Follow-Up Actions */}
                    <div className="mt-3 pt-2.5 border-t border-emerald-950/80 flex items-center gap-3 text-xs">
                      {item.contactInfo.includes('@') ? (
                        <a
                          href={`mailto:${item.contactInfo}?subject=Re: ${encodeURIComponent(item.subject)}`}
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                        >
                          <Send size={12} />
                          <span>{isAmharic ? 'በኢሜይል ምላሽ ስጥ' : 'Reply via Email'}</span>
                        </a>
                      ) : (
                        <a
                          href={`tel:${item.contactInfo.replace(/\s+/g, '')}`}
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                        >
                          <Phone size={12} />
                          <span>{isAmharic ? 'በስልክ ደውል' : 'Call Phone'}</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}

              {visibleFeedback.length === 0 && (
                <div className="py-12 text-center text-xs text-emerald-300/70 bg-[#09201e] rounded-3xl border border-dashed border-emerald-900 space-y-2">
                  <MessageSquare size={28} className="mx-auto text-emerald-500/40" />
                  <p className="font-semibold text-sm text-white">
                    {isAmharic ? 'ምንም የተቀበሉት አስተያየት ወይም ጥያቄ የለም።' : 'No feedback or inquiries found.'}
                  </p>
                  <p className="text-emerald-300/60 max-w-sm mx-auto">
                    {isAmharic 
                      ? 'ምዕመናን በድረ-ገጹ ላይ መልዕክት ሲልኩ እዚህ ጋር በቅጽበት ይደርሰዎታል' 
                      : 'Incoming messages from believers will appear here in real time'}
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
