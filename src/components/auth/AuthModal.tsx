import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { 
  X, Shield, User, LogIn, CheckCircle2, Lock, KeyRound, 
  ChevronRight, Building2, Search, Sparkles, Eye, EyeOff, 
  UserPlus, AlertCircle, Check, ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPortal: () => void;
  initialMode?: 'login' | 'signup';
  preselectedDeptId?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onOpenPortal,
  initialMode = 'login',
  preselectedDeptId
}) => {
  const { currentUser, login, signup } = useAuth();
  const { isAmharic } = useLanguage();

  // Mode: 'login' or 'signup'
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);
  const [authSubTab, setAuthSubTab] = useState<'departments' | 'leadership' | 'student' | 'custom'>('departments');

  // Form Fields
  const [deptSearch, setDeptSearch] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>(preselectedDeptId || 'education');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initial props
  useEffect(() => {
    if (isOpen) {
      setAuthMode(initialMode);
      setErrorMsg('');
      setSuccessMsg('');
      setPassword('');
      setConfirmPassword('');
      if (preselectedDeptId) {
        setSelectedDeptId(preselectedDeptId);
        setEmail(`${preselectedDeptId}@finoteteguhan.org`);
      } else {
        setEmail('education@finoteteguhan.org');
      }
    }
  }, [isOpen, initialMode, preselectedDeptId]);

  if (!isOpen) return null;

  // Handle department selection in Login mode
  const handleSelectDeptForLogin = (deptId: string) => {
    setSelectedDeptId(deptId);
    setEmail(`${deptId}@finoteteguhan.org`);
    setPassword('');
    setErrorMsg('');
    setAuthSubTab('departments');
  };

  // Handle Log In Form Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim()) {
      setErrorMsg(isAmharic ? 'እባክዎ ኢሜይል ያስገቡ' : 'Please enter your email');
      return;
    }
    if (!password.trim()) {
      setErrorMsg(isAmharic ? 'የይለፍ ቃል ማስገባት ግዴታ ነው' : 'Password is required to log in');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password.trim());
      setSuccessMsg(isAmharic ? 'በተሳካ ሁኔታ ገብተዋል!' : 'Successfully signed in!');
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        onOpenPortal();
      }, 500);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMsg((err as Error).message || (isAmharic ? 'የመግቢያ ስህተት ተከስቷል' : 'Login failed'));
    }
  };

  // Handle Sign Up Form Submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!fullName.trim()) {
      setErrorMsg(isAmharic ? 'እባክዎ ሙሉ ስምዎን ያስገቡ' : 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setErrorMsg(isAmharic ? 'እባክዎ ኢሜይል ያስገቡ' : 'Please enter your email');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg(isAmharic ? 'የይለፍ ቃል ቢያንስ 4 ፊደላት/ቁጥሮች መሆን አለበት' : 'Password must be at least 4 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg(isAmharic ? 'የተመዘገቡት የይለፍ ቃላት አይመሳሰሉም' : 'Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const role = selectedDeptId === 'leadership' 
        ? 'leadership' 
        : selectedDeptId === 'student' 
        ? 'student' 
        : 'dept_admin';

      await signup({
        name: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        role,
        departmentId: selectedDeptId === 'student' ? undefined : selectedDeptId,
        phone: phone.trim()
      });

      setSuccessMsg(isAmharic ? 'መለያዎ በተሳካ ሁኔታ ተፈጥሯል! እንኳን ደህና መጡ' : 'Account created successfully! Welcome');
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        onOpenPortal();
      }, 600);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMsg((err as Error).message || (isAmharic ? 'የምዝገባ ስህተት ተከስቷል' : 'Signup failed'));
    }
  };

  const filteredDepts = departmentsData.filter(d => 
    !deptSearch || 
    d.nameAm.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.nameEn.toLowerCase().includes(deptSearch.toLowerCase()) ||
    d.articleRef.toLowerCase().includes(deptSearch.toLowerCase())
  );

  const activeDeptObj = departmentsData.find(d => d.id === selectedDeptId) || departmentsData[0];

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
                <span>{isAmharic ? "የ14ቱ ክፍላት አስተዳደር ሥርዓት" : "14 Departments Admin Access"}</span>
                <Sparkles size={16} className="text-amber-400" />
              </h3>
              <p className="text-xs text-emerald-200/70">
                {isAmharic 
                  ? "ወደ ክፍላት አስተዳደር ለመግባት በይለፍ ቃል ይግቡ ወይም አስቀድመው ይመዝገቡ" 
                  : "Please sign up first or enter your password to access department management"}
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

        {/* PRIMARY MODE SWITCHER: SIGN IN vs SIGN UP */}
        <div className="grid grid-cols-2 bg-[#041210] p-1.5 border-b border-emerald-900/80">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-black'
                : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <LogIn size={15} />
            <span>{isAmharic ? "1. በይለፍ ቃል ግባ (Sign In)" : "1. Sign In with Password"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-black'
                : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserPlus size={15} />
            <span>{isAmharic ? "2. አዲስ ተመዝገብ (Sign Up First)" : "2. Sign Up First"}</span>
          </button>
        </div>

        {/* Error / Success Alerts */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <Check size={16} className="shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 1: LOG IN (REQUIRES PASSWORD)                                        */}
        {/* ========================================================================= */}
        {authMode === 'login' && (
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Quick Department Selector Tabs */}
            <div className="flex border-b border-emerald-900 bg-[#051614] rounded-xl px-2 py-1 gap-1.5 overflow-x-auto">
              <button
                type="button"
                onClick={() => setAuthSubTab('departments')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  authSubTab === 'departments'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 size={13} />
                <span>{isAmharic ? "የ14ቱ ክፍላት (14 Departments)" : "14 Departments"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthSubTab('leadership');
                  setSelectedDeptId('leadership');
                  setEmail('leadership@finoteteguhan.org');
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  authSubTab === 'leadership'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Shield size={13} />
                <span>{isAmharic ? "ሥራ አመራር ክፍል" : "Leadership"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthSubTab('student');
                  setSelectedDeptId('children');
                  setEmail('student@finoteteguhan.org');
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  authSubTab === 'student'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <User size={13} />
                <span>{isAmharic ? "ተማሪ / አባል" : "Student / Member"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthSubTab('custom');
                  setEmail('');
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  authSubTab === 'custom'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow'
                    : 'text-emerald-200/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <LogIn size={13} />
                <span>{isAmharic ? "በግል ኢሜይል" : "Custom Email"}</span>
              </button>
            </div>

            {/* If on departments tab: grid of 14 departments with active highlight */}
            {authSubTab === 'departments' && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <EthiopianCross size={13} variant="simple" />
                    <span>{isAmharic ? "የሚያስተዳድሩትን ክፍል ይምረጡ፦" : "Select Department to Sign In:"}</span>
                  </div>

                  <div className="relative w-full sm:w-56">
                    <Search size={13} className="absolute left-3 top-2.5 text-emerald-400/60" />
                    <input
                      type="text"
                      value={deptSearch}
                      onChange={(e) => setDeptSearch(e.target.value)}
                      placeholder={isAmharic ? "ክፍል ፈልግ..." : "Filter..."}
                      className="w-full pl-8 pr-3 py-1 bg-[#051413] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                  {filteredDepts.map((dept) => {
                    const isSelected = selectedDeptId === dept.id;
                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => handleSelectDeptForLogin(dept.id)}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#143e39] border-amber-400 shadow ring-1 ring-amber-400/50'
                            : 'bg-[#051514] border-emerald-900/70 hover:border-amber-400/60 hover:bg-[#08221f]'
                        }`}
                      >
                        <div className="text-[11px] font-bold text-white truncate">
                          {isAmharic ? dept.nameAm : dept.nameEn}
                        </div>
                        <div className="text-[9px] text-amber-400/80 font-mono mt-0.5">
                          {dept.id}@finoteteguhan.org
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dedicated Login Card with Selected Department and Password Input */}
            <form onSubmit={handleLoginSubmit} className="p-5 rounded-2xl bg-[#061715] border-2 border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {authSubTab === 'leadership' 
                        ? (isAmharic ? "የሥራ አመራር ክፍል መግቢያ" : "Leadership Login")
                        : authSubTab === 'student'
                        ? (isAmharic ? "የተማሪ / አባል መግቢያ" : "Student Login")
                        : (isAmharic ? `የ${activeDeptObj.nameAm} መግቢያ` : `${activeDeptObj.nameEn} Login`)}
                    </h4>
                    <span className="text-[11px] text-emerald-300/70">
                      {isAmharic ? "ወደ ስርዓቱ ለመግባት የይለፍ ቃልዎን ያስገቡ" : "Enter password to sign into this department"}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {authSubTab === 'leadership' ? 'ምዕራፍ 3' : activeDeptObj.articleRef.split('፣')[1]?.trim() || activeDeptObj.articleRef}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    {isAmharic ? "ኢሜይል (Email)" : "Email"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="education@finoteteguhan.org"
                    className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    {isAmharic ? "የይለፍ ቃል (Password)" : "Password"} *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-emerald-400/60 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Hint & Quick Sign Up prompt */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px]">
                <span className="text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  💡 {isAmharic ? "ነባሪ የክፍል ይለፍ ቃል፦" : "Default password:"} <strong className="text-amber-200 font-mono">orthodox1983</strong>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMsg('');
                  }}
                  className="text-emerald-300 hover:text-amber-300 underline underline-offset-2 font-medium cursor-pointer"
                >
                  {isAmharic ? "መለያ የለዎትም? አስቀድመው እዚህ ይመዝገቡ ➔" : "Don't have an account? Sign up first ➔"}
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <LogIn size={16} />
                <span>{isSubmitting ? (isAmharic ? "በማረጋገጥ ላይ..." : "Signing in...") : (isAmharic ? "በይለፍ ቃል ግባ (Sign In)" : "Sign In with Password")}</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: SIGN UP (CREATE NEW ACCOUNT TO LOG IN FIRST)                      */}
        {/* ========================================================================= */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold shrink-0">
                <UserPlus size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  {isAmharic ? "የአስተባባሪዎችና አባላት አዲስ ምዝገባ" : "Sign Up for Coordinator & Member Portal"}
                </h4>
                <p className="text-xs text-emerald-200/80">
                  {isAmharic 
                    ? "የክፍል ገጽን ለማስተዳደርና ተማሪዎችን ለማጽደቅ አስቀድመው እዚህ መለያ መፍጠር ይኖርብዎታል፤ ከዚያም በይለፍ ቃልዎ ይገባሉ።" 
                    : "To manage department pages and approve students, please create your account first."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "ሙሉ ስም (Full Name)" : "Full Name"} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder={isAmharic ? "ምሳሌ፦ መምህር ተስፋዬ / ዘማሪ አማኑኤል" : "e.g. Memhir Tesfaye"}
                  className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Department / Role Selector */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "የሚያገለግሉበት ክፍል (Department)" : "Assigned Department"} *
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => {
                    setSelectedDeptId(e.target.value);
                    if (e.target.value !== 'student') {
                      setEmail(`${e.target.value}@finoteteguhan.org`);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <optgroup label={isAmharic ? "14ቱ የአገልግሎት ክፍላት" : "14 Departments"}>
                    {departmentsData.map((d) => (
                      <option key={d.id} value={d.id}>
                        {isAmharic ? d.nameAm : d.nameEn} ({d.id})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={isAmharic ? "አጠቃላይ" : "General"}>
                    <option value="student">{isAmharic ? "ተማሪ / አባል (Student / Member)" : "Student / Member"}</option>
                  </optgroup>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "ኢሜይል (Email)" : "Email Address"} *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="yourname@finoteteguhan.org"
                  className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "ስልክ ቁጥር (Phone Number)" : "Phone Number"}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0911223344"
                  className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "የይለፍ ቃል (Password)" : "Password"} *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={4}
                    placeholder={isAmharic ? "ቢያንስ 4 ፊደላት/ቁጥሮች" : "Min 4 characters"}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-emerald-400/60 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1">
                  {isAmharic ? "የይለፍ ቃል አረጋግጥ (Confirm Password)" : "Confirm Password"} *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#040e0d] border border-emerald-900 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg('');
                }}
                className="text-xs text-emerald-300 hover:text-amber-300 underline underline-offset-2 font-medium cursor-pointer"
              >
                {isAmharic ? "አስቀድመው ተመዝግበዋል? ➔ እዚህ ይግቡ" : "Already registered? Sign in here ➔"}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <UserPlus size={16} />
                <span>{isSubmitting ? (isAmharic ? "በመመዝገብ ላይ..." : "Registering...") : (isAmharic ? "መለያ ፍጠርና ግባ (Sign Up & Enter)" : "Sign Up & Enter")}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
