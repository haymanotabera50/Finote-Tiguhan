import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCustomization } from '../../context/CustomizationContext';
import { siteContent } from '../../data/translations';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { Department } from '../../types';
import { 
  Shield, TrendingUp, BookOpen, Flame, HeartHandshake, 
  Coins, Video, Sparkles, Users, Baby, Palette, Music, 
  Building2, GraduationCap, Search, ArrowRight, Check, 
  Clock, Megaphone, Edit3, Eye, Lock, UserPlus, LogIn, KeyRound,
  ListTodo, Bookmark, Layers, FileText, X, CheckCircle2, ChevronRight
} from 'lucide-react';

interface DepartmentsProps {
  onJoinDepartment: (deptId?: string) => void;
  onOpenPortalWithDept?: (deptId: string) => void;
  onOpenAuth?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Shield, TrendingUp, BookOpen, Flame, HeartHandshake,
  Coins, Video, Sparkles, Users, Baby, Palette, Music,
  Building2, GraduationCap
};

export const Departments: React.FC<DepartmentsProps> = ({ 
  onJoinDepartment,
  onOpenPortalWithDept,
  onOpenAuth
}) => {
  const { language, isAmharic } = useLanguage();
  const { currentUser, canEditDepartment } = useAuth();
  const { departmentSettings, departmentTasks } = useCustomization();
  const t = siteContent[language];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBylawDept, setSelectedBylawDept] = useState<Department | null>(null);

  const filteredDepartments = useMemo(() => {
    return departmentsData.filter((dept) => {
      const matchesCategory = activeCategory === 'all' || dept.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        dept.nameAm.toLowerCase().includes(q) ||
        dept.nameEn.toLowerCase().includes(q) ||
        dept.descAm.toLowerCase().includes(q) ||
        dept.descEn.toLowerCase().includes(q) ||
        (dept.articleRef && dept.articleRef.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="departments" className="py-24 bg-[#081716] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. PUBLIC GUEST VIEW (When NOT logged in: Show Public Enrollment & Login Gateway) */}
      {/* ========================================================================= */}
      {!currentUser ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Public Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <EthiopianCross size={14} variant="simple" />
              <span>{isAmharic ? "የሰንበት ት/ቤት ክፍላትና አገልግሎት" : "Sunday School Ministries & Enrollment"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {isAmharic ? "የ14ቱ ክፍላትና የትምህርት መርሃ ግብሮች" : "The 14 Active Ministries & Classes"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
            <p className="text-emerald-200/80 text-base sm:text-lg">
              {isAmharic 
                ? "የሰንበት ት/ቤታችን 14 ንቁ ክፍላትና ዝርዝር መርሃ ግብሮች ለተመዘገቡ ተማሪዎችና አባላት የተዘጋጁ ናቸው። አዲስ ተማሪዎች እባክዎ አሁኑኑ ይመዝገቡ፤ ነባር ተማሪዎች ደግሞ ወደ መለያዎ ይግቡ።"
                : "Detailed curricula, class groupings, and schedules across our 14 ministries are reserved for enrolled members. New students may enroll below; existing students please sign in."}
            </p>
          </div>

          {/* Public Action Cards: New Student Registration vs Enrolled Student Sign In */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Card 1: New Student Registration */}
            <div className="rounded-3xl p-8 bg-gradient-to-b from-[#0e332f] to-[#071d1b] border-2 border-amber-400 shadow-xl shadow-amber-500/10 flex flex-col justify-between text-left relative overflow-hidden group hover:scale-[1.02] transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20">
                    <UserPlus size={26} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {isAmharic ? "ምዝገባ ክፍት ነው" : "Open Enrollment"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {isAmharic ? "አዲስ ተማሪዎች ምዝገባ" : "New Student Registration"}
                </h3>
                <p className="text-sm text-emerald-100/80 leading-relaxed mb-6">
                  {isAmharic 
                    ? "በፍኖተ ትጉሃን ሰንበት ትምህርት ቤት የሕፃናት፣ የወጣቶች፣ የአብነት ወይም የመዝሙር ክፍል ተማሪ ለመሆን አሁኑኑ በኦንላይን ይመዝገቡ።" 
                    : "Apply online today to join Sunday School classes, youth divisions, traditional Abnet studies, or sacred choir."}
                </p>

                <div className="space-y-2 mb-6 text-xs text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? "ቀጥታ የዲጂታል ምዝገባ ኮድ ማግኘት" : "Instant registration confirmation code"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? "በዕድሜ ደረጃ የተከፋፈሉ የመማሪያ ክፍሎች" : "Age-appropriate Orthodox curriculum"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? "የመማሪያ መጻሕፍትና መንፈሳዊ ቁሳቁሶች ድጋፍ" : "Access to spiritual books and learning resources"}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onJoinDepartment()}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus size={16} />
                <span>{isAmharic ? "አሁኑኑ ይመዝገቡ" : "Register Now as New Student"}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Card 2: Enrolled Student Sign In */}
            <div className="rounded-3xl p-8 bg-gradient-to-b from-[#0a2724] to-[#051614] border border-emerald-700/60 shadow-xl flex flex-col justify-between text-left relative overflow-hidden group hover:scale-[1.02] transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <LogIn size={26} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0a2724] text-emerald-300 border border-emerald-600/40">
                    {isAmharic ? "የተማሪዎችና አባላት መዳረሻ" : "Members Only Access"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {isAmharic ? "የሰንበት ት/ቤት ተማሪዎች መግቢያ" : "Enrolled Student Sign In"}
                </h3>
                <p className="text-sm text-emerald-100/80 leading-relaxed mb-6">
                  {isAmharic
                    ? "ቀድመው የተመዘገቡ የሰንበት ት/ቤት ተማሪዎች፣ መዘምራንና አገልጋዮች የ14ቱን ክፍላት ሙሉ ዝርዝር፣ መርሃ ግብሮችና ዲጂታል መታወቂያ ካርዳቸውን ለመመልከት እባክዎ ይግቡ።"
                    : "Already enrolled Sunday School students, choir members, and coordinators: please sign in to unlock full ministry details, class schedules, and your digital ID card."}
                </p>

                <div className="space-y-2 mb-6 text-xs text-emerald-200">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? "የ14ቱ ክፍላት ሙሉ መርሃ ግብርና መሪ ቃሎች" : "Curricula & schedules across all 14 ministries"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? "የተመደቡበት ክፍልና የአስተማሪዎች ማስታወቂያ" : "Assigned division & coordinator notices"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? "የግል ዲጂታል የተማሪ መታወቂያ ካርድ" : "Personal digital Student ID Badge"}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth ? onOpenAuth() : null}
                className="w-full py-3.5 rounded-2xl bg-[#0a2b27] hover:bg-[#0e3b35] text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <LogIn size={16} className="text-amber-400" />
                <span>{isAmharic ? "ይግቡና 14ቱን ክፍላት ይመልከቱ" : "Sign In to Unlock Ministries"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* 4 Pillars Overview Banner */}
          <div className="bg-[#051413] border border-emerald-900 rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <h4 className="text-base sm:text-lg font-bold text-amber-300">
                {isAmharic ? "በሰንበት ት/ቤታችን የሚሰጡ ዋና ዋና አገልግሎቶች" : "Core Sunday School Ministry Pillars"}
              </h4>
              <p className="text-xs text-emerald-200/60 mt-1">
                {isAmharic ? "ተማሪዎች ወደ ተመዘገቡበት ክፍል ሲገቡ የሚሳተፉባቸው መስኮች" : "Pillars unlocked upon student enrollment and login"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#081f1d] border border-emerald-800/60 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
                  <Baby size={20} />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">{isAmharic ? "ሕፃናትና ታዳጊዎች" : "Children & Youth"}</h5>
                <p className="text-xs text-emerald-200/70">{isAmharic ? "የማቴዎስ፣ ማርቆስ፣ ሉቃስ ክፍሎች" : "Graded classes from Matthew to Luke"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#081f1d] border border-emerald-800/60 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3">
                  <BookOpen size={20} />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">{isAmharic ? "ትምህርትና ስልጠና" : "Biblical Education"}</h5>
                <p className="text-xs text-emerald-200/70">{isAmharic ? "የነገረ መለኮት፣ ሥርዓተ ቤተክርስቲያንና ቋንቋ" : "Theology, church canon, and Ge'ez"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#081f1d] border border-emerald-800/60 text-left">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center mb-3">
                  <Music size={20} />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">{isAmharic ? "መዝሙርና ዜማ" : "Sacred Hymnody"}</h5>
                <p className="text-xs text-emerald-200/70">{isAmharic ? "ያሬዳዊ ዜማ፣ የበገናና የከበሮ ስልጠና" : "Yaredic chants, Begena harp, and drum"}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#081f1d] border border-emerald-800/60 text-left">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-3">
                  <HeartHandshake size={20} />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">{isAmharic ? "አገልግሎትና ፍቅር" : "Fellowship & Charity"}</h5>
                <p className="text-xs text-emerald-200/70">{isAmharic ? "የሕይወት ምክር፣ ማኅበራዊ አገልግሎትና ልማት" : "Counseling, outreach, and development"}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-900/60 text-center">
              <span className="text-xs text-amber-300/80 inline-flex items-center gap-1.5">
                <Lock size={12} className="text-amber-400" />
                <span>
                  {isAmharic
                    ? "የ14ቱ ክፍላት ሙሉ ዝርዝር፣ መሪ ቃልና የስብሰባ ሰዓታት የተማሪ መለያ አስገብተው ሲገቡ በሙሉ ይከፈታሉ።"
                    : "Full 14 ministry rosters, mottos, and meeting times unlock upon student sign-in."}
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. AUTHENTICATED STUDENT / MEMBER VIEW (Show full 14 Departments Grid)   */
        /* ========================================================================= */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Authenticated Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Check size={14} className="text-emerald-400" />
              <span>{isAmharic ? "የተማሪ/አባል መለያ ተረጋግጧል" : "Authenticated Member View"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.departmentsTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
            <p className="text-emerald-200/80 text-base sm:text-lg">
              {t.departmentsSubtitle}
            </p>

            {/* Authenticated User Role Banner */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061514] border border-amber-500/40 text-xs text-amber-300 shadow">
              <Shield size={14} className="text-amber-400" />
              <span>
                {currentUser.role === 'leadership'
                  ? (isAmharic 
                      ? `ሥራ አመራር ክፍል፦ ${currentUser.name} (ሁሉንም 14 ክፍላት የመመልከት ሙሉ ፈቃድ አለዎት)` 
                      : `Leadership: ${currentUser.name} (Full oversight across all 14 departments)`)
                  : currentUser.role === 'dept_admin'
                  ? (isAmharic
                      ? `${currentUser.departmentNameAm || 'ክፍልዎ'}፦ ${currentUser.name} (የክፍልዎ አስተባባሪ)`
                      : `${currentUser.departmentNameEn || 'Department'}: ${currentUser.name} (Department Coordinator)`)
                  : (isAmharic
                      ? `ተማሪ፦ ${currentUser.name} (የተመዘገቡበት ክፍል፡ ${currentUser.departmentId || 'ሕጻናት'})`
                      : `Student: ${currentUser.name} (Enrolled)`)}
              </span>
            </div>
          </div>

          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'all', label: t.departmentsFilterAll },
                { id: 'leadership', label: t.departmentsFilterLeadership },
                { id: 'education', label: t.departmentsFilterEducation },
                { id: 'service', label: t.departmentsFilterService },
                { id: 'creative', label: t.departmentsFilterCreative },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'bg-[#0b2422] text-emerald-200/80 hover:text-white hover:bg-[#0f3431] border border-emerald-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-3 text-emerald-400/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAmharic ? "ክፍል ወይም አንቀጽ ይፈልጉ..." : "Search departments..."}
                className="w-full pl-9 pr-4 py-2 bg-[#051413] border border-emerald-800/80 rounded-full text-xs sm:text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Departments Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => {
              const IconComponent = iconMap[dept.icon] || Shield;
              const subUnits = isAmharic ? dept.subSectionsAm : dept.subSectionsEn;
              const settings = departmentSettings[dept.id];
              const canEdit = canEditDepartment(dept.id);
              const isMyDept = currentUser?.departmentId === dept.id;
              const deptTasks = departmentTasks[dept.id] || [];
              const completedCount = deptTasks.filter(t => t.status === 'completed').length;
              const totalTasks = deptTasks.length;

              return (
                <div
                  key={dept.id}
                  className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl text-left relative overflow-hidden border-2 ${
                    isMyDept
                      ? 'bg-[#0c2a27] border-amber-400 shadow-amber-500/10'
                      : 'bg-[#09201e]/85 border-amber-500/25 hover:border-amber-400/60'
                  }`}
                >
                  <div>
                    {/* Top Bar with Icon, Constitution Article Badge & Permission */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                          <IconComponent size={24} />
                        </div>
                        {canEdit && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <Edit3 size={10} />
                            <span>{isAmharic ? 'የማረም ፈቃድ' : 'Editable'}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#061514] text-amber-400/90 border border-amber-500/30">
                          📜 {dept.articleRef.split('፣')[1]?.trim() || dept.articleRef}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                          {dept.category}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                      {isAmharic ? dept.nameAm : dept.nameEn}
                    </h3>

                    {/* Motto */}
                    {settings?.mottoAm && (
                      <div className="text-xs text-amber-300/90 font-serif italic mb-2 border-l-2 border-amber-500/50 pl-2">
                        {isAmharic ? settings.mottoAm : settings.mottoEn || settings.mottoAm}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-4">
                      {isAmharic ? dept.descAm : dept.descEn}
                    </p>

                    {/* Meeting Time */}
                    {settings?.meetingTimeAm && (
                      <div className="mb-3 p-2.5 rounded-xl bg-[#061514] border border-emerald-900/80 flex items-center gap-2 text-xs text-amber-300">
                        <Clock size={14} className="text-amber-400 shrink-0" />
                        <span>{isAmharic ? settings.meetingTimeAm : settings.meetingTimeEn || settings.meetingTimeAm}</span>
                      </div>
                    )}

                    {/* Notice */}
                    {settings?.announcementAm && (
                      <div className="mb-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200">
                        <Megaphone size={14} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{isAmharic ? settings.announcementAm : settings.announcementEn || settings.announcementAm}</span>
                      </div>
                    )}

                    {/* Task Progress Indicator */}
                    <div className="mb-4 p-2.5 rounded-xl bg-[#061514] border border-emerald-900/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-200">
                        <ListTodo size={14} className="text-amber-400" />
                        <span>{isAmharic ? 'የደንብ ተግባራት አፈጻጸም' : 'Bylaws Tasks'}</span>
                      </div>
                      <span className="font-mono text-amber-300 font-bold">
                        {completedCount}/{totalTasks} ({totalTasks > 0 ? Math.round((completedCount/totalTasks)*100) : 0}%)
                      </span>
                    </div>

                    {/* Sub Units List */}
                    {subUnits && subUnits.length > 0 && (
                      <div className="pt-3 border-t border-emerald-800/40 mb-4 space-y-1.5">
                        <div className="text-[11px] font-bold text-amber-400">
                          {t.departmentsSubUnits}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {subUnits.map((sub, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-[#061514] text-emerald-200/80 border border-emerald-900"
                            >
                              <Check size={10} className="text-amber-400" />
                              <span>{sub}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 space-y-2">
                    {/* View Mandate & Tasks Details Modal Button */}
                    <button
                      onClick={() => setSelectedBylawDept(dept)}
                      className="w-full py-2.5 rounded-xl bg-[#061514] hover:bg-[#0a2320] text-amber-300 border border-amber-500/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                    >
                      <ListTodo size={14} className="text-amber-400" />
                      <span>{isAmharic ? 'የደንብ ተግባራትና ዕቅድ ይመልከቱ' : 'View Tasks & Mandates'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onJoinDepartment(dept.id)}
                        className="flex-1 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 hover:border-amber-400 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{t.departmentsJoinBtn}</span>
                        <ArrowRight size={14} />
                      </button>

                      {onOpenPortalWithDept && (currentUser?.role === 'leadership' || canEdit) && (
                        <button
                          onClick={() => onOpenPortalWithDept(dept.id)}
                          className="px-3 py-2 rounded-xl bg-[#061514] border border-emerald-800 hover:border-amber-400 text-emerald-200 hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                          title={canEdit ? (isAmharic ? "ይህንን ክፍል አርም" : "Edit Department") : (isAmharic ? "የሥራ አመራር ቁጥጥር" : "Leadership Oversight")}
                        >
                          {canEdit ? <Edit3 size={14} className="text-amber-400" /> : <Eye size={14} className="text-amber-400" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DETAILED BYLAWS & TASKS MODAL (When clicking 'View Tasks & Mandates')    */}
      {/* ========================================================================= */}
      {selectedBylawDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
          <div 
            className="w-full max-w-3xl bg-[#09201e] border-2 border-amber-500/40 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-900 bg-[#061514]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <EthiopianCross size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {isAmharic ? selectedBylawDept.nameAm : selectedBylawDept.nameEn}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      📜 {selectedBylawDept.articleRef}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-300/80">
                    {isAmharic ? 'የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን ፍኖተ ትጉሃን ሰንበት ት/ቤት መተዳደሪያ ደንብ' : 'Sunday School Official Bylaws Mandate'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBylawDept(null)}
                className="p-1.5 rounded-full text-emerald-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-emerald-100 flex-1">
              
              {/* Statutory Objective (ዓላማ) */}
              <div className="p-4 rounded-2xl bg-[#061514] border border-amber-500/30">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                  <Bookmark size={15} />
                  <span>{isAmharic ? 'የክፍሉ ሕጋዊ ዓላማ (Objective)፦' : 'Statutory Objective:'}</span>
                </div>
                <p className="text-emerald-100/90 leading-relaxed font-serif text-sm">
                  {isAmharic ? selectedBylawDept.objectiveAm : selectedBylawDept.objectiveEn || selectedBylawDept.objectiveAm}
                </p>
              </div>

              {/* Action Tasks Status List */}
              <div className="space-y-3">
                <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  <ListTodo size={16} />
                  <span>{isAmharic ? 'የተግባራትና የዕቅድ አፈጻጸም ዝርዝር' : 'Trackable Action Plan Tasks'}</span>
                </div>

                <div className="space-y-2">
                  {(departmentTasks[selectedBylawDept.id] || []).map((task) => (
                    <div 
                      key={task.id}
                      className="p-3 rounded-xl bg-[#061514] border border-emerald-900/80 flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="font-semibold text-white">{task.titleAm}</div>
                        <div className="flex items-center gap-2 text-[10px] text-emerald-300/70">
                          {task.subUnitAm && <span className="text-amber-300/80">{task.subUnitAm}</span>}
                          {task.articleRef && <span>• {task.articleRef}</span>}
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border shrink-0 ${
                        task.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : task.status === 'in_progress'
                          ? 'bg-blue-950 text-blue-300 border-blue-700'
                          : 'bg-amber-950 text-amber-300 border-amber-700'
                      }`}>
                        {task.status === 'completed' 
                          ? (isAmharic ? '✓ የተጠናቀቀ' : 'Completed') 
                          : task.status === 'in_progress'
                          ? (isAmharic ? '⏳ በሂደት ላይ' : 'In Progress')
                          : (isAmharic ? '○ የታቀደ' : 'Planned')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Core Bylaws Duties (ዋና ዋና ተግባራት) */}
              <div className="space-y-3 pt-2 border-t border-emerald-900">
                <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  <FileText size={16} />
                  <span>{isAmharic ? 'ዋና ዋና ተግባራትና ኃላፊነቶች በመተዳደሪያ ደንቡ' : 'Statutory Core Responsibilities'}</span>
                </div>

                <div className="space-y-2">
                  {selectedBylawDept.tasksAm.map((duty, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-[#061514] border border-emerald-900/60 flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="font-mono text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{duty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Constituent Sub-Units (ንዑሳን ክፍላት) */}
              {selectedBylawDept.subUnitsDetailed && selectedBylawDept.subUnitsDetailed.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-emerald-900">
                  <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                    <Layers size={16} />
                    <span>{isAmharic ? 'ንዑሳን ክፍላትና ዝርዝር የሥራ ድርሻቸው' : 'Constituent Sub-Units & Mandates'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedBylawDept.subUnitsDetailed.map((sub, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-3.5 rounded-2xl bg-[#061514] border border-emerald-900/80 space-y-1.5"
                      >
                        <div className="font-bold text-white text-xs border-b border-emerald-950 pb-1 flex items-center gap-1.5">
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

            {/* Modal Footer */}
            <div className="p-4 border-t border-emerald-900 bg-[#061514] flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedBylawDept(null)}
                className="px-4 py-2 rounded-xl bg-[#09201e] border border-emerald-800 text-emerald-200 text-xs font-semibold cursor-pointer"
              >
                {isAmharic ? 'ዝጋ' : 'Close'}
              </button>

              {onOpenPortalWithDept && (currentUser?.role === 'leadership' || canEditDepartment(selectedBylawDept.id)) && (
                <button
                  onClick={() => {
                    const deptId = selectedBylawDept.id;
                    setSelectedBylawDept(null);
                    onOpenPortalWithDept(deptId);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Edit3 size={14} />
                  <span>{isAmharic ? 'በፖርታል ውስጥ አስተዳድር' : 'Manage in Portal'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
