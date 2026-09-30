import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { MapPin, Phone, Mail, Clock, Heart, Send } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = siteContent[language];

  return (
    <footer className="bg-[#040e0d] text-emerald-100/80 border-t border-amber-500/20 pt-16 pb-10 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-40" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Church Branding & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo"
                className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover shadow"
              />
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {t.sundaySchoolName}
                </h3>
                <p className="text-xs text-amber-400 mt-0.5">{t.churchName}</p>
              </div>
            </div>
            <p className="text-xs text-emerald-200/70 leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
              {t.footerMotto}
            </p>
            <div className="text-xs text-amber-300/90 font-medium">
              {t.establishedText}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <EthiopianCross size={14} variant="simple" className="text-amber-400" />
              <span>{t.footerQuickLinks}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  {t.navAbout}
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-amber-300 transition-colors">
                  {t.navDepartments}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-300 transition-colors">
                  {t.navCourses}
                </a>
              </li>
              <li>
                <a href="#calendar" className="hover:text-amber-300 transition-colors">
                  {t.navCalendar}
                </a>
              </li>
              <li>
                <a href="#mezmur" className="hover:text-amber-300 transition-colors">
                  {t.navMezmur}
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-amber-300 transition-colors">
                  {t.navDonate}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Church Location */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <EthiopianCross size={14} variant="simple" className="text-amber-400" />
              <span>{t.contactTitle}</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{t.contactAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>{t.contactPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span>{t.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-amber-400 shrink-0" />
                <span>እሁድ፦ 2:00 - 12:00 ሙሉ ቀን</span>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Connected / Telegram */}
          <div>
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <EthiopianCross size={14} variant="simple" className="text-amber-400" />
              <span>የመገናኛ ብዙኃን አውታሮች</span>
            </h4>
            <p className="text-xs text-emerald-200/70 mb-4 leading-relaxed">
              ሳምንታዊ መንፈሳዊ ትምህርቶችን፣ የመዝሙር ጥናቶችንና ማስታወቂያዎችን በቴሌግራም ቻናላችን ይከታተሉ።
            </p>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#64B5F6] border border-[#229ED9]/40 text-xs font-semibold transition-all"
            >
              <Send size={14} />
              <span>Telegram ቻናላችንን ይቀላቀሉ</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/50 gap-4">
          <div className="flex items-center gap-2">
            <EthiopianCross size={16} className="text-amber-400/80" />
            <p>{t.footerCopyright}</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-300/60">
            <span>በፍቅርና በጸሎት የተዘጋጀ</span>
            <Heart size={12} className="text-rose-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
