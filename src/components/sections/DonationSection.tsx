import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { siteContent } from '../../data/translations';
import { EthiopianCross } from '../common/EthiopianCross';
import { Heart, Copy, Check, Building, Smartphone, Sparkles, BookOpen } from 'lucide-react';

export const DonationSection: React.FC = () => {
  const { language, isAmharic } = useLanguage();
  const t = siteContent[language];

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const accounts = [
    {
      id: 'cbe',
      bankNameAm: 'የኢትዮጵያ ንግድ ባንክ (CBE)',
      bankNameEn: 'Commercial Bank of Ethiopia (CBE)',
      accountNumber: '1000568274311',
      holderAm: 'ምትኩ & እየሩሳሌም & ስንታየሁ',
      icon: Building,
      color: 'border-purple-500/30 hover:border-purple-400',
      badge: 'CBE',
      badgeColor: 'bg-purple-900/40 text-purple-300'
    },
    {
      id: 'telebirr',
      bankNameAm: 'ቴሌብር (Telebirr)',
      bankNameEn: 'Telebirr SuperApp',
      accountNumber: '0938952971',
      holderAm: 'ፍኖተ ትጉሃን ሰንበት ት/ቤት',
      icon: Smartphone,
      color: 'border-blue-500/30 hover:border-blue-400',
      badge: 'Telebirr',
      badgeColor: 'bg-blue-900/40 text-blue-300'
    },
    {
      id: 'awash',
      bankNameAm: 'አዋሽ ባንክ (Awash Bank)',
      bankNameEn: 'Awash International Bank',
      accountNumber: '151123546',
      holderAm: 'ፍኖተ ትጉሃን ሰንበት ት/ቤት',
      icon: Building,
      color: 'border-amber-500/30 hover:border-amber-400',
      badge: 'Awash',
      badgeColor: 'bg-amber-900/40 text-amber-300'
    }
  ];

  return (
    <section id="donate" className="py-12 sm:py-14 bg-[#081716] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header (Compact) */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <EthiopianCross size={13} variant="simple" />
            <span>{isAmharic ? "አገልግሎቱን ይደግፉ" : "Support Our Mission"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {t.givingTitle}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-2.5" />
          <p className="text-emerald-200/80 text-xs sm:text-sm">
            {t.givingSubtitle}
          </p>
        </div>

        {/* Giving Pillars Overview (Compact) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-7 text-left">
          <div className="p-4 rounded-2xl bg-[#09201e]/80 border border-emerald-800/60 space-y-1.5 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 w-fit shrink-0">
                <BookOpen size={17} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {isAmharic ? "የሕፃናት ትምህርት ቁሳቁስ" : "Children Curriculum"}
              </h4>
            </div>
            <p className="text-[11px] text-emerald-200/70 leading-relaxed">
              {isAmharic 
                ? "ለመማሪያ መጻሕፍት፣ ቀለማትና የዝማሬ መሣሪያዎች ድጋፍ።" 
                : "Books, coloring materials, and liturgical instruments for learners."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#09201e]/80 border border-emerald-800/60 space-y-1.5 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400 w-fit shrink-0">
                <Heart size={17} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {isAmharic ? "የአቅመ-ደካሞች ተራድዖ" : "Elderly & Needy Care"}
              </h4>
            </div>
            <p className="text-[11px] text-emerald-200/70 leading-relaxed">
              {isAmharic 
                ? "ለችግረኛ ወገኖችና አረጋውያን ወርሃዊ የምግብና የመድኃኒት ድጋፍ።" 
                : "Monthly food parcels and medical assistance for vulnerable members."}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#09201e]/80 border border-emerald-800/60 space-y-1.5 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 w-fit shrink-0">
                <Sparkles size={17} />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                {isAmharic ? "የሰንበት ት/ቤቱ አዳራሽና ሚዲያ" : "Hall & Media"}
              </h4>
            </div>
            <p className="text-[11px] text-emerald-200/70 leading-relaxed">
              {isAmharic 
                ? "የድምጽ፣ ምስልና የመገናኛ መሣሪያዎችን በማሟላት የወንጌል አገልግሎት።" 
                : "Audio-visual and broadcasting equipment for wider evangelism."}
            </p>
          </div>
        </div>

        {/* Bank & Payment Cards (Compact) */}
        <div className="space-y-3">
          <div className="text-[11px] sm:text-xs text-amber-400 font-semibold mb-2 text-center uppercase tracking-wider flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-amber-400/30" />
            <span>{t.givingAccountHolder}</span>
            <span className="w-8 h-px bg-amber-400/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left">
            {accounts.map((acc) => {
              const isCopied = copiedKey === acc.id;
              const IconComp = acc.icon;

              return (
                <div
                  key={acc.id}
                  className={`p-4 sm:p-5 rounded-2xl bg-[#09201e] border ${acc.color} transition-all duration-300 shadow-xl flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-white/5 text-amber-400">
                        <IconComp size={18} />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${acc.badgeColor}`}>
                        {acc.badge}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white mb-2 leading-snug">
                      {isAmharic ? acc.bankNameAm : acc.bankNameEn}
                    </h4>

                    <div className="py-2 px-3 rounded-xl bg-[#051413] border border-emerald-900/60 font-mono text-sm sm:text-base font-extrabold text-amber-300 tracking-wider text-center select-all mb-1.5">
                      {acc.accountNumber}
                    </div>
                    {acc.holderAm && (
                      <div className="text-[10px] sm:text-[11px] text-emerald-300/80 text-center mb-3 truncate">
                        <span>{acc.holderAm}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => copyToClipboard(acc.accountNumber, acc.id)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={13} />
                        <span>{t.givingCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>{t.givingCopy}</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

