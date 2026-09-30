import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { monthlyFeasts, upcomingEvents, weeklySchedule } from '../../data/calendarData';
import { EthiopianCross } from '../common/EthiopianCross';
import { Calendar as CalendarIcon, Clock, MapPin, Sparkles, Star } from 'lucide-react';

export const FeastCalendar: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [activeTab, setActiveTab] = useState<'monthly' | 'upcoming' | 'weekly'>('monthly');

  return (
    <section id="calendar" className="py-24 bg-[#081716] relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "የቤተክርስቲያን ቀን መቁጠሪያ" : "Liturgical Calendar"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.calendarTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.calendarSubtitle}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-[#0b2422] border border-amber-500/30 shadow-inner gap-1">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'monthly'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              {t.calendarTabMonthly}
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              {t.calendarTabUpcoming}
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              {t.calendarTabWeekly}
            </button>
          </div>
        </div>

        {/* Content Tab 1: Monthly Feasts */}
        {activeTab === 'monthly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-left">
            {monthlyFeasts.map((feast) => {
              const isParishPatron = feast.dayOfMonth === 12; // 12 Michael

              return (
                <div
                  key={feast.dayOfMonth}
                  className={`p-5 rounded-2xl border transition-all duration-300 relative group flex flex-col justify-between ${
                    isParishPatron
                      ? 'bg-gradient-to-b from-[#123832] to-[#09201e] border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.03]'
                      : 'bg-[#09201e]/80 border-amber-500/20 hover:border-amber-400/60'
                  }`}
                >
                  {isParishPatron && (
                    <div className="absolute -top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow">
                      <Star size={10} fill="currentColor" />
                      <span>{isAmharic ? 'የደብራችን ጠባቂ' : 'Patron Saint'}</span>
                    </div>
                  )}

                  <div>
                    {/* Date Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300 text-base">
                        {feast.dayOfMonth}
                      </div>
                      <EthiopianCross size={16} variant="simple" className="text-amber-400/70" />
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1.5 leading-snug group-hover:text-amber-300 transition-colors">
                      {isAmharic ? feast.saintAm : feast.saintEn}
                    </h4>

                    <p className="text-xs text-emerald-200/70 leading-relaxed">
                      {isAmharic ? feast.significanceAm : feast.significanceEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-emerald-900/60 text-[11px] text-amber-400/80 font-medium">
                    {isAmharic ? `በየወሩ ${feast.dayOfMonth} ቀን` : `Monthly on Day ${feast.dayOfMonth}`}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content Tab 2: Upcoming Major Events */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#09201e]/80 border-2 border-amber-500/25 hover:border-amber-400/60 transition-all hover:-translate-y-1 shadow-xl relative overflow-hidden group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0">
                    <CalendarIcon size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                    {isAmharic ? event.dateAm : event.dateEn}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {isAmharic ? event.titleAm : event.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-4">
                  {isAmharic ? event.descAm : event.descEn}
                </p>

                <div className="pt-3 border-t border-emerald-900/80 flex flex-wrap items-center gap-4 text-xs text-amber-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-400" />
                    <span>{isAmharic ? event.timeAm : event.timeEn}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-amber-400" />
                    <span>{isAmharic ? event.locationAm : event.locationEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Tab 3: Weekly Sunday Service Schedule */}
        {activeTab === 'weekly' && (
          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {weeklySchedule.map((sched, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#09201e]/85 border border-amber-500/25 hover:border-amber-400/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    {isAmharic ? sched.dayAm : sched.dayEn}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {isAmharic ? sched.titleAm : sched.titleEn}
                  </h4>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#061514] border border-emerald-800 text-xs font-semibold text-emerald-200 shrink-0">
                  <Clock size={14} className="text-amber-400" />
                  <span>{isAmharic ? sched.timeAm : sched.timeEn}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
