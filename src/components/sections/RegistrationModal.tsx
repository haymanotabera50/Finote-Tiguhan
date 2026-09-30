import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { departmentsData } from '../../data/departmentsData';
import { EthiopianCross } from '../common/EthiopianCross';
import { X, CheckCircle2, User, Phone, MapPin, Sparkles, Download, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDeptId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  preselectedDeptId = ''
}) => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [fullName, setFullName] = useState('');
  const [christianName, setChristianName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('children');
  const [selectedDept, setSelectedDept] = useState(preselectedDeptId);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regCode, setRegCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const generatedCode = 'FT-' + Math.floor(100000 + Math.random() * 900000);
      setRegCode(generatedCode);
      setSubmitting(false);
      setIsSuccess(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#ef4444', '#3b82f6']
        });
      } catch (err) {
        // ignore if not supported
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setChristianName('');
    setAge('');
    setPhone('');
    setEmail('');
    setAddress('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#09201e] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-[#061514] via-[#0f3835] to-[#061514] px-6 py-5 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <EthiopianCross size={24} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{t.regTitle}</span>
                <Sparkles size={16} className="text-amber-400" />
              </h3>
              <p className="text-xs text-emerald-200/70">{t.regSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-emerald-200/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-emerald-100">
          {isSuccess ? (
            /* Success State */
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={44} />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-amber-300 mb-2">
                  {t.regSuccessTitle}
                </h4>
                <p className="text-sm text-emerald-200/80 max-w-md mx-auto leading-relaxed">
                  {t.regSuccessMsg}
                </p>
              </div>

              {/* Registration Confirmation Card */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#061514] border border-amber-500/30 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-emerald-800/60 pb-2">
                  <span className="text-xs text-amber-400 font-semibold">{t.sundaySchoolName}</span>
                  <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                    {regCode}
                  </span>
                </div>
                <div className="text-sm font-bold text-white">{fullName}</div>
                {christianName && (
                  <div className="text-xs text-emerald-300">
                    {isAmharic ? 'የክርስትና ስም፦ ' : 'Christian Name: '}{christianName}
                  </div>
                )}
                <div className="text-xs text-emerald-300/80 flex items-center gap-2">
                  <Phone size={12} className="text-amber-400" />
                  <span>{phone}</span>
                </div>
                <div className="text-xs text-emerald-300/80 flex items-center gap-2">
                  <MapPin size={12} className="text-amber-400" />
                  <span>{address || (isAmharic ? 'አዲስ አበባ' : 'Addis Ababa')}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow"
                >
                  {isAmharic ? 'እሺ፣ ተጠናቋል' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            /* Enrollment Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.regFullName} *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-emerald-400/60" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isAmharic ? "ምሳሌ፦ ዮሐንስ ተስፋዬ" : "e.g. Yohannes Tesfaye"}
                      className="w-full pl-9 pr-3 py-2 bg-[#051413] border border-emerald-800/80 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Christian Baptismal Name */}
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.regChristianName}
                  </label>
                  <input
                    type="text"
                    value={christianName}
                    onChange={(e) => setChristianName(e.target.value)}
                    placeholder={isAmharic ? "ምሳሌ፦ ገብረ ሚካኤል" : "e.g. Gebre Michael"}
                    className="w-full px-3 py-2 bg-[#051413] border border-emerald-800/80 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Age */}
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.regAge} *
                  </label>
                  <input
                    type="number"
                    required
                    min="3"
                    max="90"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="18"
                    className="w-full px-3 py-2 bg-[#051413] border border-emerald-800/80 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.regGender}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-[#051413] border border-emerald-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="male">{t.regGenderMale}</option>
                    <option value="female">{t.regGenderFemale}</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.regPhone} *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-3 text-emerald-400/60" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0911234567"
                      className="w-full pl-9 pr-3 py-2 bg-[#051413] border border-emerald-800/80 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  {t.regAddress} *
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3 text-emerald-400/60" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={isAmharic ? "ላፍቶ፣ ንፋስ ስልክ፣ ወረዳ 01" : "Lafto, Nifas Silk, Woreda 01"}
                    className="w-full pl-9 pr-3 py-2 bg-[#051413] border border-emerald-800/80 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Category Choice */}
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-2">
                  {t.regCategory} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'children', label: t.regCategoryChildren },
                    { id: 'adult', label: t.regCategoryAdult },
                    { id: 'choir', label: t.regCategoryChoir },
                    { id: 'volunteer', label: t.regCategoryVolunteer },
                  ].map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        category === cat.id
                          ? 'border-amber-400 bg-amber-500/10 text-white font-medium'
                          : 'border-emerald-800/60 bg-[#051413] text-emerald-200/80 hover:border-emerald-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="regCategory"
                        value={cat.id}
                        checked={category === cat.id}
                        onChange={() => setCategory(cat.id)}
                        className="mt-0.5 accent-amber-500"
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* If volunteer or adult, allow choosing specific department */}
              {(category === 'volunteer' || category === 'adult') && (
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.regPreferredDept}
                  </label>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full px-3 py-2 bg-[#051413] border border-emerald-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option value="">
                      {isAmharic ? '-- ክፍል ይምረጡ (አማራጭ) --' : '-- Select Department (Optional) --'}
                    </option>
                    {departmentsData.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {isAmharic ? dept.nameAm : dept.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-sm shadow-xl hover:shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <EthiopianCross size={16} variant="simple" className="text-black" />
                  <span>{submitting ? (isAmharic ? 'በማስኬድ ላይ...' : 'Processing...') : t.regSubmitBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

