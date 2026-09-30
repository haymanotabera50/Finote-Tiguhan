import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName('');
      setContactInfo('');
      setSubject('');
      setMessage('');
    }, 400);
  };

  return (
    <section id="contact" className="py-24 bg-[#081716] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <EthiopianCross size={14} variant="simple" />
            <span>{isAmharic ? "አድራሻና ግንኙነት" : "Get In Touch"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contactTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Parish Details & Schedule Column */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#09201e]/85 border-2 border-amber-500/25 space-y-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isAmharic ? "የቤተክርስቲያኑ አድራሻ" : "Parish Location"}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                    {t.contactAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isAmharic ? "ስልክ ቁጥሮች" : "Phone Numbers"}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-mono">
                    {t.contactPhone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isAmharic ? "ኦፊሴላዊ ኢሜይል" : "Official Email"}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                    {t.contactEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isAmharic ? "የአገልግሎት ሰዓታት" : "Office Hours"}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                    {isAmharic 
                      ? "ቅዳሜ፦ 8:00 - 12:00 ከሰዓት | እሁድ፦ 2:00 - 12:00 ሙሉ ቀን" 
                      : "Saturdays: 2:00 PM - 6:00 PM | Sundays: 8:00 AM - 6:00 PM"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Message Form */}
          <div className="lg:col-span-7 bg-[#09201e] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Send size={18} className="text-amber-400" />
              <span>{isAmharic ? "መልዕክት ወይም ጥያቄ ይላኩልን" : "Send Us a Message"}</span>
            </h3>

            {sent ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-xl font-bold text-white">
                  {t.contactFormSent}
                </h4>
                <p className="text-xs text-emerald-200/80 max-w-sm mx-auto">
                  {isAmharic 
                    ? "መልዕክትዎ ለሰንበት ትምህርት ቤቱ አስተባባሪዎች ደርሷል። በቅርቡ ምላሽ እንሰጣለን።" 
                    : "Your message has been received by Sunday School leadership. We will follow up soon."}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  {isAmharic ? "ሌላ መልዕክት ይላኩ" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                      {t.contactFormName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isAmharic ? "ስምዎ" : "Your Name"}
                      className="w-full px-3 py-2.5 bg-[#051413] border border-emerald-800 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                      {t.contactFormEmail} *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder={isAmharic ? "ስልክ ወይም ኢሜይል" : "Email or Phone"}
                      className="w-full px-3 py-2.5 bg-[#051413] border border-emerald-800 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.contactFormSubject} *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={isAmharic ? "ምሳሌ፦ ስለ አዲስ ተማሪዎች ምዝገባ ጥያቄ" : "e.g. Inquiries about student enrollment"}
                    className="w-full px-3 py-2.5 bg-[#051413] border border-emerald-800 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                    {t.contactFormMessage} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isAmharic ? "መልዕክትዎን እዚህ ይጻፉ..." : "Write your message here..."}
                    className="w-full px-3 py-2.5 bg-[#051413] border border-emerald-800 rounded-xl text-sm text-white placeholder-emerald-700 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-sm shadow-xl hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <Send size={16} />
                  <span>{t.contactFormSend}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

