import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { Sparkles, ArrowRight, BookOpen, Music, Users, Shield, Award, Calendar } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';
import churchPhoto from '../../assets/church-community.jpg';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with Ambient Glow */}
      <div className="absolute inset-0 bg-[#081716] z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/10 via-emerald-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        {/* Subtle Orthodox motif watermark */}
        <div className="absolute right-6 top-28 opacity-5 pointer-events-none hidden xl:block">
          <EthiopianCross size={380} variant="lalibela" className="text-amber-300" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Daily Verse Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d2e2b] border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-medium mb-8 shadow-lg hover:border-amber-400 transition-all cursor-default">
          <EthiopianCross size={14} variant="simple" className="text-amber-400 animate-pulse" />
          <span>{t.heroDailyVerse}</span>
        </div>

        {/* Floating Logo Badge */}
        <div className="relative mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40">
          <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 shadow-2xl">
            <img
              src={logoImg}
              alt="Finote Teguhan Sunday School Official Logo"
              className="w-full h-full object-cover rounded-full border-4 border-[#081716] shadow-inner"
            />
          </div>
        </div>

        {/* Headings */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-amber-400 tracking-widest uppercase">
            {t.churchName}
          </h2>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            <span className="block">{t.sundaySchoolName}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              {isAmharic ? "መንፈሳዊ የትምህርትና አገልግሎት ማዕከል" : "Spiritual Education & Ministry"}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed pt-2">
            {t.heroDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={onOpenRegister}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2.5"
          >
            <Sparkles size={18} />
            <span>{t.heroRegisterBtn}</span>
            <ArrowRight size={16} />
          </button>

          <a
            href="#departments"
            className="px-6 py-3.5 rounded-full bg-[#0d2e2b]/80 hover:bg-[#0d2e2b] border border-amber-500/30 hover:border-amber-400 text-emerald-100 font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <Shield size={18} className="text-amber-400" />
            <span>{isAmharic ? "የተማሪዎች ምዝገባ" : "Student Registration"}</span>
          </a>

          <a
            href="#mezmur"
            className="px-6 py-3.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 text-emerald-200 font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 hover:scale-105"
          >
            <Music size={18} className="text-amber-400" />
            <span>{t.navMezmur}</span>
          </a>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 pt-10 border-t border-emerald-800/40">
          <div className="p-4 rounded-2xl bg-[#09201e]/80 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{t.statYears}</div>
            <div className="text-xs text-emerald-200/70 font-medium">{t.statYearsLabel}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#09201e]/80 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{t.statDepartments}</div>
            <div className="text-xs text-emerald-200/70 font-medium">{t.statDepartmentsLabel}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#09201e]/80 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{t.statStudents}</div>
            <div className="text-xs text-emerald-200/70 font-medium">{t.statStudentsLabel}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#09201e]/80 border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{t.statAlumni}</div>
            <div className="text-xs text-emerald-200/70 font-medium">{t.statAlumniLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

