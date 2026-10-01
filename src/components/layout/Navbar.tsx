import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { Menu, X, Globe, UserPlus, Sliders, Shield, User, LogIn, ChevronDown, LogOut } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenAuth: () => void;
  onOpenPortal: () => void;
  onOpenCustomization: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenRegister, 
  onOpenAuth, 
  onOpenPortal, 
  onOpenCustomization 
}) => {
  const { language, toggleLanguage, isAmharic } = useLanguage();
  const { currentUser, isAuthenticated, logout } = useAuth();
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
    { label: isAuthenticated ? t.navDepartments : (isAmharic ? "አዲስ ምዝገባ" : "Registration"), href: "#departments" },
    { label: t.navCourses, href: "#courses" },
    { label: t.navCalendar, href: "#calendar" },
    { label: t.navMezmur, href: "#mezmur" },
    { label: t.navMedia, href: "#media" },
    { label: t.navDonate, href: "#donate" },
    { label: t.navContact, href: "#contact" },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#061514]/95 backdrop-blur-md border-b border-amber-500/25 py-2.5 shadow-2xl'
          : 'bg-[#061514]/90 backdrop-blur-sm border-b border-emerald-950 py-3.5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Parish Identity */}
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative shrink-0">
              <img
                src={logoImg}
                alt="Finote Teguhan Sunday School Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-0.5 rounded-full shadow">
                <EthiopianCross size={10} variant="simple" className="text-black" />
              </span>
            </div>
            <div className="text-left shrink-0">
              <div className="text-[11px] sm:text-xs text-amber-400 font-medium tracking-wide whitespace-nowrap">
                <span>{t.churchName}</span>
              </div>
              <div className="text-xs sm:text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors whitespace-nowrap">
                {t.sundaySchoolName}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links - Single straight line with whitespace-nowrap */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 text-xs xl:text-[13px] 2xl:text-sm font-medium shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-emerald-100/85 hover:text-amber-400 transition-colors py-1 relative group whitespace-nowrap inline-block"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Customization Toggle */}
            <button
              onClick={onOpenCustomization}
              className="p-2 rounded-full border border-emerald-800/80 hover:border-amber-400 text-emerald-300 hover:text-amber-300 hover:bg-emerald-900/40 transition-all cursor-pointer"
              title={isAmharic ? "ገጽታን አብጅ (Theme & Font)" : "Customize Theme & Fonts"}
            >
              <Sliders size={15} />
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-amber-500/40 text-xs font-semibold text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 transition-all cursor-pointer"
              title={isAmharic ? "Switch to English" : "ወደ አማርኛ ቀይር"}
            >
              <Globe size={13} className="text-amber-400" />
              <span>{isAmharic ? 'EN' : 'አማ'}</span>
            </button>

            {/* Authentication / Portal Dashboard Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenPortal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a2724] border border-amber-500/50 hover:border-amber-400 text-white text-xs font-bold transition-all cursor-pointer hover:scale-105"
                  title="የአስተዳደርና የተማሪ ፖርታል"
                >
                  {currentUser?.role === 'leadership' ? (
                    <Shield size={14} className="text-amber-400" />
                  ) : (
                    <User size={14} className="text-amber-400" />
                  )}
                  <span className="max-w-[100px] truncate">
                    {currentUser?.role === 'leadership' ? (isAmharic ? 'ሥራ አመራር' : 'Leadership') : currentUser?.name}
                  </span>
                  <ChevronDown size={12} className="text-amber-400" />
                </button>

                <button
                  onClick={logout}
                  className="p-1.5 rounded-full border border-red-500/50 hover:border-red-400 text-red-400 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
                  title={isAmharic ? "ውጣ (Sign Out)" : "Sign Out"}
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a2724] border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
                title={isAmharic ? "የአስተዳደርና የተማሪ መግቢያ" : "Admin & Student Sign In"}
              >
                <LogIn size={13} className="text-amber-400" />
                <span>{isAmharic ? 'ይግቡ / አስተዳደር' : 'Sign In / Admin'}</span>
              </button>
            )}

            {/* Register Call to Action */}
            <button
              onClick={onOpenRegister}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:shadow-amber-500/25 transition-all cursor-pointer hover:scale-105"
            >
              <UserPlus size={13} />
              <span>{t.registerBtn}</span>
            </button>
          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCustomization}
              className="p-1.5 rounded-full border border-emerald-800 text-amber-300"
            >
              <Sliders size={16} />
            </button>

            <button
              onClick={toggleLanguage}
              className="px-2 py-0.5 rounded-full border border-amber-500/40 text-xs font-bold text-amber-300"
            >
              {isAmharic ? 'EN' : 'አማ'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-emerald-100 hover:bg-emerald-900/50"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061514]/98 border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 text-left">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs text-emerald-100/90 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-800/50 flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPortal();
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#0a2724] border border-amber-400 text-amber-300 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Shield size={14} />
                  <span>{isAmharic ? 'ወደ አስተዳደር / ተማሪ ፖርታል ግባ' : 'Open Portal Dashboard'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 rounded-lg bg-red-950/40 border border-red-500/50 text-red-300 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-red-900/50 transition-colors"
                >
                  <LogOut size={14} />
                  <span>{isAmharic ? 'ከመለያ ውጣ (Sign Out)' : 'Sign Out'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-lg bg-[#0a2724] border border-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogIn size={14} className="text-amber-400" />
                <span>{isAmharic ? 'የአስተዳዳሪ / የተማሪ መግቢያ' : 'Sign In'}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <UserPlus size={14} />
              <span>{t.registerBtn}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
