import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { Menu, X, Globe, UserPlus, Heart } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const { language, toggleLanguage, isAmharic } = useLanguage();
  const t = siteContent[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.navHome, href: "#hero" },
    { label: t.navAbout, href: "#about" },
    { label: t.navDepartments, href: "#departments" },
    { label: t.navCourses, href: "#courses" },
    { label: t.navCalendar, href: "#calendar" },
    { label: t.navMezmur, href: "#mezmur" },
    { label: t.navMedia, href: "#media" },
    { label: t.navDonate, href: "#donate" },
    { label: t.navContact, href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061514]/90 backdrop-blur-md border-b border-amber-500/20 py-2.5 shadow-xl'
          : 'bg-gradient-to-b from-[#061514]/95 via-[#061514]/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logoImg}
                alt="Finote Teguhan Sunday School Logo"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover border-2 border-amber-400/80 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-0.5 rounded-full shadow">
                <EthiopianCross size={10} variant="simple" className="text-black" />
              </span>
            </div>
            <div className="text-left">
              <div className="text-xs text-amber-400 font-medium tracking-wide flex items-center gap-1.5">
                <span>{t.churchName}</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                {t.sundaySchoolName}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-emerald-100/80 hover:text-amber-400 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/40 text-xs font-semibold text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 transition-all cursor-pointer"
              title={isAmharic ? "Switch to English" : "ወደ አማርኛ ቀይር"}
            >
              <Globe size={14} className="text-amber-400" />
              <span>{isAmharic ? 'EN' : 'አማ'}</span>
            </button>

            {/* Register Call to Action */}
            <button
              onClick={onOpenRegister}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer hover:scale-105"
            >
              <UserPlus size={14} />
              <span>{t.registerBtn}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full border border-amber-500/40 text-xs font-bold text-amber-300"
            >
              {isAmharic ? 'EN' : 'አማ'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-emerald-100 hover:bg-emerald-900/50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061514]/98 border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-emerald-100/90 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-800/50 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow"
            >
              <UserPlus size={16} />
              <span>{t.registerBtn}</span>
            </button>

            <a
              href="#donate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-emerald-800/40 border border-emerald-600/40 text-emerald-200 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Heart size={16} className="text-rose-400" />
              <span>{t.navDonate}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
