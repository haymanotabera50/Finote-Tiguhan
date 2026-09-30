import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { Department } from '../../types';
import { 
  Shield, TrendingUp, BookOpen, Flame, HeartHandshake, 
  Coins, Video, Sparkles, Users, Baby, Palette, Music, 
  Building2, GraduationCap, Search, ArrowRight, Check
} from 'lucide-react';

interface DepartmentsProps {
  onJoinDepartment: (deptId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Shield, TrendingUp, BookOpen, Flame, HeartHandshake,
  Coins, Video, Sparkles, Users, Baby, Palette, Music,
  Building2, GraduationCap
};

export const Departments: React.FC<DepartmentsProps> = ({ onJoinDepartment }) => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeptForDetail, setSelectedDeptForDetail] = useState<Department | null>(null);

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
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "የአገልግሎት ዘርፎች" : "Parish Ministries"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.departmentsTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.departmentsSubtitle}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
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

          {/* Search Input */}
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

            return (
              <div
                key={dept.id}
                className="rounded-3xl bg-[#09201e]/80 border border-amber-500/25 hover:border-amber-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 group text-left relative overflow-hidden"
              >
                {/* Background Card Gradient */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${dept.color} blur-2xl group-hover:scale-150 transition-transform duration-500`} />

                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300">
                      {dept.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {isAmharic ? dept.nameAm : dept.nameEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-4">
                    {isAmharic ? dept.descAm : dept.descEn}
                  </p>

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

                {/* Card Action Button */}
                <div className="pt-3">
                  <button
                    onClick={() => onJoinDepartment(dept.id)}
                    className="w-full py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 hover:border-amber-400 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t.departmentsJoinBtn}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="py-16 text-center text-emerald-300/60 text-sm">
            {isAmharic ? "ምንም የተገኘ ክፍል የለም።" : "No departments match your filter."}
          </div>
        )}
      </div>
    </section>
  );
};
