import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { BookOpen, Target, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import churchPhoto from '../../assets/church-community.jpg';

export const About: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  return (
    <section id="about" className="py-20 bg-[#061514] relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "ማንነታችንና ጉዟችን" : "Our Heritage & Identity"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.aboutTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Top Story & Parish Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Parish Photo with Liturgical Frame */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/30 to-emerald-500/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl">
              <img
                src={churchPhoto}
                alt="Finote Teguhan Sunday School Service"
                className="w-full h-80 object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061514] via-[#061514]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#09201e]/85 backdrop-blur-md border border-amber-500/30 text-left">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <EthiopianCross size={12} variant="simple" />
                  <span>{isAmharic ? "ላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል" : "Lafto Debre Teguhan St. Michael"}</span>
                </div>
                <div className="text-[11px] text-emerald-200/70">
                  {isAmharic ? "ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት (1983 ዓ.ም)" : "Finote Teguhan Sunday School (Est. 1991)"}
                </div>
              </div>
            </div>
          </div>

          {/* History Description */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#09201e]/70 border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t.historyTitle}</h3>
                  <p className="text-xs text-amber-400 font-medium">{t.establishedText}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                {t.historyDesc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                  {isAmharic ? "ዶግማና ቀኖና" : "Dogma & Canon"}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                  {isAmharic ? "የቅዱስ ያሬድ ዜማ" : "St. Yared Hymnody"}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                  {isAmharic ? "ሐዋርያዊ ተልዕኮ" : "Apostolic Service"}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-emerald-200">
                  {isAmharic ? "በጎ አድራጎት" : "Christian Charity"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Vision Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#09201e]/80 border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
                <Eye size={26} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.visionTitle}</h3>
            </div>
            <p className="text-emerald-100/90 leading-relaxed text-sm sm:text-base">
              {t.visionDesc}
            </p>
          </div>

          {/* Mission Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#09201e]/80 border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <Target size={26} />
              </div>
              <h3 className="text-2xl font-bold text-white">{t.missionTitle}</h3>
            </div>
            <ul className="space-y-3 text-sm text-emerald-100/90">
              {t.missionPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

