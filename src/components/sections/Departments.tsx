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
  Clock, Megaphone, Edit3, Eye, Lock
} from 'lucide-react';

interface DepartmentsProps {
  onJoinDepartment: (deptId: string) => void;
  onOpenPortalWithDept?: (deptId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Shield, TrendingUp, BookOpen, Flame, HeartHandshake,
  Coins, Video, Sparkles, Users, Baby, Palette, Music,
  Building2, GraduationCap
};

export const Departments: React.FC<DepartmentsProps> = ({ 
  onJoinDepartment,
  onOpenPortalWithDept 
}) => {
  const { language, isAmharic } = useLanguage();
  const { currentUser, canEditDepartment } = useAuth();
  const { departmentSettings } = useCustomization();
  const t = siteContent[language];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDepartments = useMemo(() => {
    return departmentsData.filter((dept) => {
      const matchesCategory = activeCategory === 'all' || dept.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        dept.nameAm.toLowerCase().includes(q) ||
        dept.nameEn.toLowerCase().includes(q) ||
        dept.descAm.toLowerCase().includes(q) ||
        dept.descEn.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="departments" className="py-24 bg-[#081716] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "የሰንበት ት/ቤቱ 14 ክፍላት" : "The 14 Active Ministries"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.departmentsTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.departmentsSubtitle}
          </p>

          {/* Role Status Note */}
          {currentUser && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061514] border border-amber-500/30 text-xs text-amber-300">
              <Shield size={14} className="text-amber-400" />
              <span>
                {currentUser.role === 'leadership'
                  ? (isAmharic 
                      ? 'ሥራ አመራር ክፍል፦ በሁሉም ክፍላት ላይ የቁጥጥር እይታ አለዎት (የራስዎን ክፍል ብቻ ማረም ይፈቀዳል)' 
                      : 'Leadership Mode: Full oversight of all departments (Self-edit restricted to Leadership)')
                  : (isAmharic
                      ? `${currentUser.departmentNameAm || 'ክፍልዎ'}፦ የራስዎን ክፍል ብቻ የማስተዳደር ፈቃድ አለዎት`
                      : `${currentUser.departmentNameEn || 'Department'}: You can manage only your department`)}
              </span>
            </div>
          )}
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
              placeholder={isAmharic ? "ክፍል ይፈልጉ..." : "Search departments..."}
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
                  {/* Top Bar with Icon & Permission Badges */}
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

                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                      {dept.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    {isAmharic ? dept.nameAm : dept.nameEn}
                  </h3>

                  {/* Motto (if customized by admin) */}
                  {settings?.mottoAm && (
                    <div className="text-xs text-amber-300/90 font-serif italic mb-2 border-l-2 border-amber-500/50 pl-2">
                      {isAmharic ? settings.mottoAm : settings.mottoEn || settings.mottoAm}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-4">
                    {isAmharic ? dept.descAm : dept.descEn}
                  </p>

                  {/* Meeting Time & Notice (if set) */}
                  {settings?.meetingTimeAm && (
                    <div className="mb-3 p-2.5 rounded-xl bg-[#061514] border border-emerald-900/80 flex items-center gap-2 text-xs text-amber-300">
                      <Clock size={14} className="text-amber-400 shrink-0" />
                      <span>{isAmharic ? settings.meetingTimeAm : settings.meetingTimeEn || settings.meetingTimeAm}</span>
                    </div>
                  )}

                  {settings?.announcementAm && (
                    <div className="mb-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200">
                      <Megaphone size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <span>{isAmharic ? settings.announcementAm : settings.announcementEn || settings.announcementAm}</span>
                    </div>
                  )}

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
                <div className="pt-3 flex items-center gap-2">
                  <button
                    onClick={() => onJoinDepartment(dept.id)}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 hover:border-amber-400 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.departmentsJoinBtn}</span>
                    <ArrowRight size={14} />
                  </button>

                  {onOpenPortalWithDept && (currentUser?.role === 'leadership' || canEdit) && (
                    <button
                      onClick={() => onOpenPortalWithDept(dept.id)}
                      className="px-3 py-2.5 rounded-xl bg-[#061514] border border-emerald-800 hover:border-amber-400 text-emerald-200 hover:text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                      title={canEdit ? (isAmharic ? "ይህንን ክፍል አርም" : "Edit Department") : (isAmharic ? "የሥራ አመራር ቁጥጥር" : "Leadership Oversight")}
                    >
                      {canEdit ? <Edit3 size={14} className="text-amber-400" /> : <Eye size={14} className="text-amber-400" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
