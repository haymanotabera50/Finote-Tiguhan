import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { 
  X, Shield, User, LogIn, CheckCircle2, Lock, KeyRound, 
  ChevronRight, Building2, Search, Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPortal: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onOpenPortal }) => {
  const { currentUser, switchRole, login } = useAuth();
  const { isAmharic } = useLanguage();

  const [authTab, setAuthTab] = useState<'departments' | 'leadership' | 'student' | 'custom'>('departments');
  const [deptSearch, setDeptSearch] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSelectRole = (role: 'leadership' | 'dept_admin' | 'student', deptId?: string) => {
    switchRole(role, deptId);
    onClose();
    onOpenPortal();
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    const lower = customEmail.toLowerCase();
    
    // Check if matching any department
    const matchedDept = departmentsData.find(d => 
      lower.includes(d.id) || 
      lower === `${d.id}@finoteteguhan.org`
    );

    if (lower.includes('lead') || lower === 'leadership@finoteteguhan.org') {
      switchRole('leadership');
    } else if (matchedDept) {
      switchRole('dept_admin', matchedDept.id);
    } else if (lower.includes('student') || lower.includes('stud')) {
      switchRole('student');
    } else {
      await login(customEmail);
    }
    onClose();
    onOpenPortal();
  };

  const filteredDepts = departmentsData.filter(d => 
    !deptSearch || 
    d.nameAm.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.nameEn.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.articleRef.toLowerCase().includes(deptSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#081f1c] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#041211] via-[#092b27] to-[#041211] px-6 py-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <KeyRound size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{isAmharic ? "የ14ቱ ክፍላትና የአስተዳደር መግቢያ" : "Departments & Admin Access Portal"}</span>
                <Sparkles size={16} className="text-amber-400" />
              </h3>
              <p className="text-xs text-emerald-200/70">
                {isAmharic ? "ለ14ቱ የአገልግሎት ክፍላት ገጻቸውን የሚያስተዳድሩበት ማዕከል" : "Dedicated portal for the 14 departments to manage their pages"}
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

        {/* Top Role Selector Tabs */}
        <div className="flex border-b border-emerald-900 bg-[#051614] px-4 pt-2 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setAuthTab('departments')}
            className={`py-2.5 px-4 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
              authTab === 'departments'
                ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            <Building2 size={14} />
            <span>{isAmharic ? "የ14ቱ ክፍላት አስተዳዳሪዎች (14 Departments)" : "14 Department Admins"}</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthTab('leadership')}
            className={`py-2.5 px-4 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
              authTab === 'leadership'
                ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            <Shield size={14} />
            <span>{isAmharic ? "ሥራ አመራር ክፍል (ዋና አመራር)" : "Executive Leadership"}</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthTab('student')}
            className={`py-2.5 px-4 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
              authTab === 'student'
                ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            <User size={14} />
            <span>{isAmharic ? "ተማሪ / አባል" : "Student / Member"}</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthTab('custom')}
            className={`py-2.5 px-4 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${
              authTab === 'custom'
                ? 'border-amber-400 text-amber-300 bg-[#081f1c]'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            <LogIn size={14} />
            <span>{isAmharic ? "በኢሜይል ግባ" : "Email Sign In"}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: 14 DEPARTMENTS ADMIN SELECTION */}
          {authTab === 'departments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <EthiopianCross size={14} variant="simple" />
                    <span>{isAmharic ? "የሚያስተዳድሩትን ክፍል ይምረጡ፦" : "Select Your Department to Manage:"}</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/70 mt-0.5">
                    {isAmharic 
                      ? "የክፍልዎ አስተባባሪ በመሆን ይግቡና የክፍልዎን ገጽ፣ መሪ ቃል፣ ማስታወቂያና ተግባራት ያስተዳድሩ" 
                      : "Sign in as coordinator to manage your department's page, motto, notices and action tasks"}
                  </p>
                </div>

                <div className="relative w-full sm:w-60">
                  <Search size={14} className="absolute left-3 top-2.5 text-emerald-400/60" />
                  <input
                    type="text"
                    value={deptSearch}
                    onChange={(e) => setDeptSearch(e.target.value)}
                    placeholder={isAmharic ? "ክፍል ፈልግ..." : "Filter departments..."}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#051413] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Grid of All 14 Departments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {filteredDepts.map((dept) => {
                  const isCurrent = currentUser?.role === 'dept_admin' && currentUser?.departmentId === dept.id;

                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => handleSelectRole('dept_admin', dept.id)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left group ${
                        isCurrent
                          ? 'bg-[#123d38] border-amber-400 shadow-md ring-1 ring-amber-400'
                          : 'bg-[#051514] border-emerald-900/80 hover:border-amber-400 hover:bg-[#092420]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            {dept.articleRef.split('፣')[1]?.trim() || dept.articleRef}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                              <CheckCircle2 size={12} /> {isAmharic ? "ንቁ" : "Active"}
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          {isAmharic ? dept.nameAm : dept.nameEn}
                        </div>

                        <p className="text-[10px] text-emerald-200/70 mt-1 line-clamp-2">
                          {isAmharic ? dept.descAm : dept.descEn}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-emerald-950 flex items-center justify-between text-[11px] font-bold text-amber-400">
                        <span>{isAmharic ? "እንደ አስተባባሪ ግባ" : "Manage Page"}</span>
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: EXECUTIVE LEADERSHIP */}
          {authTab === 'leadership' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-600/20 to-amber-900/20 border-2 border-amber-500/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-lg">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {isAmharic ? "ሥራ አመራር ክፍል (ዋና አስተዳደር)" : "Executive Leadership"}
                    </h4>
                    <p className="text-xs text-emerald-100/80 leading-relaxed mb-2">
                      {isAmharic 
                        ? "በመተዳደሪያ ደንቡ መሠረት በሁሉም 14ቱ ክፍላት ላይ የቁጥጥርና የበላይ አመራር ፈቃድ አለው፤ የራሱን የሥራ አመራር ክፍል ብቻ ያርማል።"
                        : "Holds overall administrative oversight across all 14 departments; edits strictly the leadership department."}
                    </p>
                    <span className="text-[11px] font-mono text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
                      📜 ምዕራፍ 3፣ አንቀጽ 3 (ሥራ አመራር)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectRole('leadership')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shrink-0 cursor-pointer text-center"
                >
                  {isAmharic ? "እንደ ሥራ አመራር ግባ ➔" : "Sign In as Leadership ➔"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT / MEMBER */}
          {authTab === 'student' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#061514] border-2 border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-lg">
                    <User size={28} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">
                      {isAmharic ? "ተማሪ / የሰንበት ት/ቤት አባል" : "Student / Parish Member"}
                    </h4>
                    <p className="text-xs text-emerald-100/80 leading-relaxed mb-2">
                      {isAmharic 
                        ? "የግል ዲጂታል መታወቂያ ካርድ፣ የተመዘገቡባቸው ክፍሎችና የትምህርት መርሃ ግብር ማየት ይቻላል።"
                        : "Access your digital student ID badge, enrolled classes, and curriculum."}
                    </p>
                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      መታወቂያ፦ FT-849201 (ዮሐንስ ተስፋዬ)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectRole('student')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer text-center"
                >
                  {isAmharic ? "እንደ ተማሪ ግባ ➔" : "Sign In as Student ➔"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOM EMAIL LOGIN */}
          {authTab === 'custom' && (
            <form onSubmit={handleCustomLogin} className="space-y-3 bg-[#061514] p-5 rounded-2xl border border-emerald-900/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                    {isAmharic ? "ኢሜይል (Email)" : "Email"}
                  </label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="audit@finoteteguhan.org"
                    className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                    required
                  />
                  <span className="text-[10px] text-emerald-400/60 mt-1 block">
                    {isAmharic ? "ምሳሌ፦ audit@, choir@, media@, leadership@" : "e.g. audit@, choir@, media@"}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                    {isAmharic ? "የይለፍ ቃል (Password)" : "Password"}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow cursor-pointer mt-2"
              >
                {isAmharic ? "ግባ (Sign In)" : "Sign In"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
