import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { EthiopianCross } from '../common/EthiopianCross';
import { X, Shield, BookOpen, Baby, Music, User, LogIn, CheckCircle2, Lock, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPortal: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onOpenPortal }) => {
  const { currentUser, switchRole, login } = useAuth();
  const { isAmharic } = useLanguage();

  const [customEmail, setCustomEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const rolePresets = [
    {
      id: 'leadership',
      nameAm: 'ሥራ አመራር ክፍል (ዋና አስተዳደር)',
      nameEn: 'Executive Leadership (Full Admin Oversight)',
      icon: Shield,
      color: 'from-amber-600/30 to-amber-900/30 border-amber-500/50',
      badgeAm: 'ሁሉንም ክፍላት ይመለከታል | የራሱን ብቻ ያርማል',
      badgeEn: 'Full Oversight to all depts | Self-edit only',
      descAm: 'በሁሉም 14 ክፍላትና ክፍሎች ላይ የቁጥጥርና የአስተዳደር መብት አለው፤ ነገር ግን ማስተካከል የሚችለው የራሱን ክፍል ብቻ ነው።',
      descEn: 'Has administrative oversight across all 14 departments; permitted to edit only the leadership department.'
    },
    {
      id: 'education',
      nameAm: 'ትምህርትና ስልጠና ክፍል',
      nameEn: 'Education Department Coordinator',
      icon: BookOpen,
      color: 'from-blue-600/30 to-blue-900/30 border-blue-500/40',
      badgeAm: 'የትምህርት ክፍልን ብቻ',
      badgeEn: 'Education Dept Only',
      descAm: 'ሥርዓተ-ትምህርትን፣ የክፍል መርሃ ግብርንና የተመዘገቡ ተማሪዎችን በራሱ ክፍል ብቻ ያስተዳድራል።',
      descEn: 'Manages curricula, class schedules, and enrolled students exclusively for the Education Dept.'
    },
    {
      id: 'children',
      nameAm: 'ሕጻናት ክፍል አስተባባሪ',
      nameEn: "Children's Ministry Coordinator",
      icon: Baby,
      color: 'from-rose-600/30 to-rose-900/30 border-rose-500/40',
      badgeAm: 'የሕፃናት ክፍልን ብቻ',
      badgeEn: 'Children Dept Only',
      descAm: 'የማቴዎስ፣ ማርቆስና ሉቃስ ምድብ ሕፃናትን ምዝገባና መርሃ ግብር ያስተዳድራል።',
      descEn: 'Oversees young students in Matthew, Mark, and Luke divisions exclusively.'
    },
    {
      id: 'choir',
      nameAm: 'መዝሙር ክፍል አስተባባሪ',
      nameEn: 'Sacred Choir Coordinator',
      icon: Music,
      color: 'from-yellow-600/30 to-yellow-900/30 border-yellow-500/40',
      badgeAm: 'የመዝሙር ክፍልን ብቻ',
      badgeEn: 'Choir Dept Only',
      descAm: 'የመዘምራን ልምምድ፣ የበገና ስልጠናና የመዝሙር ቤተ-መጻሕፍትን ያስተዳድራል።',
      descEn: 'Coordinates choir practices, Begena harp lessons, and hymn catalog.'
    },
    {
      id: 'student',
      nameAm: 'ተማሪ / የሰንበት ት/ቤት አባል',
      nameEn: 'Student / Parish Member',
      icon: User,
      color: 'from-emerald-600/30 to-emerald-900/30 border-emerald-500/40',
      badgeAm: 'የግል መገለጫና ካርድ',
      badgeEn: 'Personal Profile & ID',
      descAm: 'የግል ዲጂታል መታወቂያ ካርድ፣ የተመዘገቡባቸው ክፍሎችና የትምህርት መርሃ ግብር።',
      descEn: 'Accesses digital student ID badge, enrolled course schedules, and certifications.'
    }
  ];

  const handleSelectRole = (roleId: string) => {
    if (roleId === 'leadership') {
      switchRole('leadership');
    } else if (roleId === 'student') {
      switchRole('student');
    } else {
      switchRole('dept_admin', roleId);
    }
    onClose();
    onOpenPortal();
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    login(customEmail);
    onClose();
    onOpenPortal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#09201e] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#061514] via-[#0f3835] to-[#061514] px-6 py-5 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <KeyRound size={22} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{isAmharic ? "የመግቢያና የተጠቃሚ ፈቃድ ማዕከል" : "Access & Authentication Portal"}</span>
              </h3>
              <p className="text-xs text-emerald-200/70">
                {isAmharic ? "እንደ ሥራ አመራር፣ የክፍል አስተባባሪ ወይም ተማሪ ይግቡ" : "Sign in as Leadership, Department Admin, or Student"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-emerald-200/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Switch Preset Cards */}
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <EthiopianCross size={14} variant="simple" />
              <span>{isAmharic ? "ሚና ይምረጡ (በአንድ ጠቅታ ይግቡ)" : "Select Account Role (One-Click Sign In)"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rolePresets.map((preset) => {
                const IconComp = preset.icon;
                const isCurrent = currentUser?.role === preset.id || (preset.id !== 'leadership' && preset.id !== 'student' && currentUser?.departmentId === preset.id);

                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectRole(preset.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg ${
                      isCurrent
                        ? 'bg-[#123d38] border-amber-400 shadow-md ring-1 ring-amber-400'
                        : `bg-[#061514] ${preset.color} hover:border-amber-400/70`
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                            <IconComp size={18} />
                          </div>
                          <span className="text-sm font-bold text-white">
                            {isAmharic ? preset.nameAm : preset.nameEn}
                          </span>
                        </div>
                        {isCurrent && (
                          <CheckCircle2 size={16} className="text-amber-400" />
                        )}
                      </div>

                      <div className="mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {isAmharic ? preset.badgeAm : preset.badgeEn}
                        </span>
                      </div>

                      <p className="text-[11px] text-emerald-200/70 leading-relaxed">
                        {isAmharic ? preset.descAm : preset.descEn}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-emerald-900/60 text-right">
                      <span className="text-[11px] font-bold text-amber-400 hover:underline inline-flex items-center gap-1">
                        <span>{isAmharic ? "ግባ" : "Select Role"} &rarr;</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-emerald-900" />
            <span className="flex-shrink mx-4 text-xs text-emerald-400/60 uppercase">
              {isAmharic ? "ወይም በኢሜይል መግቢያ" : "Or Custom Login"}
            </span>
            <div className="flex-grow border-t border-emerald-900" />
          </div>

          {/* Custom Login Form */}
          <form onSubmit={handleCustomLogin} className="space-y-3 bg-[#061514] p-4 rounded-2xl border border-emerald-900/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                  {isAmharic ? "ኢሜይል" : "Email"}
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="name@finoteteguhan.org"
                  className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                  {isAmharic ? "የይለፍ ቃል" : "Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-[#09201e] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <LogIn size={14} />
              <span>{isAmharic ? "ይግቡ" : "Sign In"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
