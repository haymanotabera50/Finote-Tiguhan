import { useLanguage } from '../../context/LanguageContext';
import { useCustomization } from '../../context/CustomizationContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { Sparkles, ArrowRight, BookOpen, Music, Users, Shield, Award, Calendar } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';
import churchPhoto from '../../assets/church-community.jpg';
import churchBuildingImg from '../../assets/church-building.jpg';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  const { language, isAmharic } = useLanguage();
  const { frontEndContent } = useCustomization();
  const t = siteContent[language];

  const dailyVerse = isAmharic 
    ? (frontEndContent?.heroDailyVerseAm || t.heroDailyVerse)
    : (frontEndContent?.heroDailyVerseEn || t.heroDailyVerse);

  const heroSubtitle = isAmharic 
    ? (frontEndContent?.heroSubtitleAm || "መንፈሳዊ የትምህርትና አገልግሎት ማዕከል")
    : (frontEndContent?.heroSubtitleEn || "Spiritual Education & Ministry");

  const heroDescription = isAmharic 
    ? (frontEndContent?.heroDescriptionAm || t.heroDescription)
    : (frontEndContent?.heroDescriptionEn || t.heroDescription);

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Authentic Church Photo Background with High Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={churchBuildingImg}
          alt="የላፍቶ ደብረ ትጉሃን ቅዱስ ሚካኤል ቤተክርስቲያን"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
        />
        {/* Lighter, balanced gradient that lets the church photo clearly show through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061514]/70 via-[#061514]/30 to-[#081716]/95" />
        {/* Soft vignette to frame the image and highlight the center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(6,21,20,0.65)_100%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Daily Verse Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#061514]/85 backdrop-blur-md border border-amber-500/50 text-amber-300 text-xs sm:text-sm font-medium mb-8 shadow-2xl hover:border-amber-400 transition-all cursor-default">
          <EthiopianCross size={14} variant="simple" className="text-amber-400 animate-pulse" />
          <span>{dailyVerse}</span>
        </div>

        {/* Floating Logo Badge */}
        <div className="relative mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40">
          <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 shadow-2xl">
            <img
              src={logoImg}
              alt="Finote Teguhan Sunday School Official Logo"
              className="w-full h-full object-cover rounded-full border-4 border-[#081716] shadow-inner"
            />
          </div>
        </div>

        {/* Headings with Drop Shadow for Maximum Legibility over Church Photo */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-xs sm:text-sm md:text-base font-semibold text-amber-300 tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {t.churchName}
          </h2>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
            <span className="block">{t.sundaySchoolName}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              {heroSubtitle}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-50 max-w-2xl mx-auto leading-relaxed pt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] font-medium">
            {heroDescription}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-14 pt-10 border-t border-emerald-800/40">
          <div className="p-4 rounded-2xl bg-[#061514]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{t.statYears}</div>
            <div className="text-xs text-emerald-200/70 font-medium">{t.statYearsLabel}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#061514]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{t.statStudents}</div>
            <div className="text-xs text-emerald-200/70 font-medium">{t.statStudentsLabel}</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#061514]/85 backdrop-blur-md border border-amber-500/20 hover:border-amber-400/50 transition-all">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{t.statAlumni}</div>
            <div className="text-xs text-emerald-200/70 font-medium">{t.statAlumniLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

