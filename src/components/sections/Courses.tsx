import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { coursesData } from '../../data/coursesData';
import { EthiopianCross } from '../common/EthiopianCross';
import { Course } from '../../types';
import { Clock, BookCheck, Sparkles, UserCheck, ArrowRight } from 'lucide-react';

interface CoursesProps {
  onEnroll: (courseId?: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onEnroll }) => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [activeTab, setActiveTab] = useState<'children' | 'adult'>('children');

  const filteredCourses = coursesData.filter((course) => {
    if (activeTab === 'children') {
      return course.level === 'children' || course.level === 'youth';
    }
    return course.level === 'adult';
  });

  return (
    <section id="courses" className="py-24 bg-[#061514] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "መንፈሳዊ እውቀት" : "Spiritual Curriculum"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.coursesTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.coursesSubtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-[#0b2422] border border-amber-500/30 shadow-inner">
            <button
              onClick={() => setActiveTab('children')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'children'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              {t.coursesTabChildren}
            </button>
            <button
              onClick={() => setActiveTab('adult')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'adult'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-emerald-200/80 hover:text-white'
              }`}
            >
              {t.coursesTabAdults}
            </button>
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredCourses.map((course) => {
            const topics = isAmharic ? course.topicsAm : course.topicsEn;

            return (
              <div
                key={course.id}
                className="rounded-3xl bg-[#09201e]/85 border-2 border-amber-500/25 hover:border-amber-400/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 group relative"
              >
                <div>
                  {/* Top Target Audience Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {isAmharic ? course.targetAm : course.targetEn}
                    </span>
                    <Sparkles size={16} className="text-amber-400" />
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {isAmharic ? course.titleAm : course.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-5">
                    {isAmharic ? course.descAm : course.descEn}
                  </p>

                  {/* Schedule */}
                  <div className="p-3 rounded-2xl bg-[#061514] border border-emerald-900/80 mb-5 flex items-center gap-2.5 text-xs text-amber-300 font-medium">
                    <Clock size={16} className="text-amber-400 shrink-0" />
                    <span>{isAmharic ? course.scheduleAm : course.scheduleEn}</span>
                  </div>

                  {/* Key Topics List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
                      <BookCheck size={14} className="text-amber-400" />
                      <span>{t.coursesTopicsLabel}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {topics.map((topic, i) => (
                        <li key={i} className="text-xs text-emerald-100/80 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() => onEnroll(course.id)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <UserCheck size={16} />
                  <span>{t.coursesEnrollBtn}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
