import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { BookOpen, Target, Eye, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  return (
    <section id="about" className="py-14 sm:py-16 bg-[#061514] relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <EthiopianCross size={13} variant="simple" />
            <span>{isAmharic ? "ማንነታችንና ጉዟችን" : "Our Heritage & Identity"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2.5">
            {t.aboutTitle}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-2.5" />
          <p className="text-emerald-200/80 text-xs sm:text-sm max-w-2xl mx-auto">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* 3 Pillars (History, Vision, Mission) with Wider Space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: History Description */}
          <div className="p-6 rounded-2xl bg-[#09201e]/80 border border-amber-500/30 shadow-xl flex flex-col justify-between text-left group hover:border-amber-400/60 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{t.historyTitle}</h3>
                  <p className="text-[11px] text-amber-400 font-medium">{t.establishedText}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {t.historyDesc}
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                {isAmharic ? "ዶግማና ቀኖና" : "Dogma & Canon"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                {isAmharic ? "የቅዱስ ያሬድ ዜማ" : "St. Yared"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                {isAmharic ? "ሐዋርያዊ ተልዕኮ" : "Apostolic"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                {isAmharic ? "በጎ አድራጎት" : "Charity"}
              </span>
            </div>
          </div>

          {/* Card 2: Vision Card */}
          <div className="p-6 rounded-2xl bg-[#09201e]/80 border border-amber-500/30 shadow-xl flex flex-col justify-between text-left relative overflow-hidden group hover:border-amber-400/60 transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                  <Eye size={22} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{t.visionTitle}</h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {t.visionDesc}
              </p>
            </div>
            <div className="pt-4 text-[11px] text-amber-400/80 font-mono">
              ✝ Finote Teguhan Vision
            </div>
          </div>

          {/* Card 3: Mission Card */}
          <div className="p-6 rounded-2xl bg-[#09201e]/80 border border-amber-500/30 shadow-xl flex flex-col justify-between text-left relative overflow-hidden group hover:border-amber-400/60 transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                  <Target size={22} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{t.missionTitle}</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90">
                {t.missionPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 text-[11px] text-emerald-400/80 font-mono">
              ✝ Finote Teguhan Mission
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
