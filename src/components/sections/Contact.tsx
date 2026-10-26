import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export const Contact: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactInfo.trim() || !message.trim()) {
      setErrorMessage(isAmharic ? 'እባክዎ አስፈላጊ መስኮችን በሙሉ ይሙሉ' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await api.sendContactMessage({
        name: name.trim(),
        contactInfo: contactInfo.trim(),
        subject: subject.trim() || (isAmharic ? 'አጠቃላይ አስተያየትና ጥያቄ' : 'General Inquiry / Feedback'),
        message: message.trim(),
        departmentId: 'leadership_and_audit'
      });

      setSent(true);
      setName('');
      setContactInfo('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      console.error('Contact submission error:', err);
      setErrorMessage(
        isAmharic
          ? 'መልዕክቱን ወደ ሰርቨር መላክ አልተቻለም። እባክዎ እንደገና ይሞክሩ።'
          : 'Failed to record feedback to the server. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-14 bg-[#081716] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header (Compact & Short) */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <EthiopianCross size={13} variant="simple" />
            <span>{isAmharic ? "አድራሻና ግንኙነት" : "Get In Touch"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {t.contactTitle}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-2.5" />
          <p className="text-emerald-200/80 text-xs sm:text-sm">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Parish Details Column */}
          <div className="md:col-span-5 text-left flex">
            <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#09201e]/85 border border-amber-500/30 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">
                      {isAmharic ? "የቤተክርስቲያኑ አድራሻ" : "Parish Location"}
                    </h4>
                    <p className="text-xs text-emerald-200/80 leading-relaxed">
                      {t.contactAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">
                      {isAmharic ? "ስልክ ቁጥሮች" : "Phone Numbers"}
                    </h4>
                    <p className="text-xs text-emerald-200/80 font-mono">
                      {t.contactPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">
                      {isAmharic ? "ኦፊሴላዊ ኢሜይል" : "Official Email"}
                    </h4>
                    <p className="text-xs text-emerald-200/80">
                      {t.contactEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">
                      {isAmharic ? "የአገልግሎት ሰዓታት" : "Office Hours"}
                    </h4>
                    <p className="text-xs text-emerald-200/80 leading-relaxed">
                      {isAmharic 
                        ? "ቅዳሜ፦ 8:00 - 12:00 | እሁድ፦ 2:00 - 12:00" 
                        : "Sat: 2:00 PM - 6:00 PM | Sun: 8:00 AM - 6:00 PM"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-900/60 text-[11px] text-amber-400/80 font-medium">
                {isAmharic ? "ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት" : "Finote Teguhan Sunday School"}
              </div>
            </div>
          </div>

          {/* Interactive Message Form */}
          <div className="md:col-span-7 bg-[#09201e] border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl text-left flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Send size={16} className="text-amber-400" />
                <span>{isAmharic ? "መልዕክት ወይም ጥያቄ ይላኩልን" : "Send Us a Message"}</span>
              </h3>

              {sent ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {t.contactFormSent}
                  </h4>
                  <p className="text-xs text-emerald-200/80 max-w-xs mx-auto">
                    {isAmharic 
                      ? "መልዕክትዎ ለሥራ አመራር ክፍል እና ለኦዲትና ኢንስፔክሽን ክፍል ደርሷል። በቅርቡ ምላሽ እንሰጣለን።" 
                      : "Your feedback has been delivered directly to Executive Leadership and Audit & Inspection."}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-5 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer shadow"
                  >
                    {isAmharic ? "ሌላ መልዕክት ይላኩ" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
                      <AlertCircle size={15} className="text-rose-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                        {t.contactFormName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isAmharic ? "ስምዎ" : "Your Name"}
                        className="w-full px-3 py-2 bg-[#051413] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                        {t.contactFormEmail} *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder={isAmharic ? "ስልክ ወይም ኢሜይል" : "Email or Phone"}
                        className="w-full px-3 py-2 bg-[#051413] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                      {t.contactFormSubject} *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={isAmharic ? "ምሳሌ፦ አጠቃላይ አስተያየት፣ ጥያቄ ወይም ማሳሰቢያ" : "e.g. Inquiry or suggestion"}
                      className="w-full px-3 py-2 bg-[#051413] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 mb-1">
                      {t.contactFormMessage} *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isAmharic ? "አስተያየትዎን ወይም ጥያቄዎን እዚህ ይጻፉ..." : "Write your feedback or inquiry here..."}
                      className="w-full px-3 py-2 bg-[#051413] border border-emerald-800 rounded-xl text-xs text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>{isAmharic ? "በመላክ ላይ..." : "Sending..."}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{t.contactFormSend}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
