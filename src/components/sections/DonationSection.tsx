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
    <section id="donate" className="py-24 bg-[#081716] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.givingTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full mb-4" />
          <p className="text-emerald-200/80 text-base sm:text-lg">
            {t.givingSubtitle}
          </p>
        </div>

        {/* Giving Pillars Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-6 rounded-2xl bg-[#09201e]/70 border border-emerald-800/60 space-y-2">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
              <BookOpen size={20} />
            </div>
            <h4 className="text-base font-bold text-white">
              {isAmharic ? "የሕፃናት ትምህርት ቁሳቁስ" : "Children Curriculum & Books"}
            </h4>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              {isAmharic 
                ? "ለማቴዎስ፣ ማርቆስና ሉቃስ ክፍላት የመማሪያ መጻሕፍት፣ ቀለማትና የዝማሬ መሣሪያዎች ድጋፍ።" 
                : "Supporting classroom books, coloring materials, and liturgical instruments for young learners."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#09201e]/70 border border-emerald-800/60 space-y-2">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit">
              <Heart size={20} />
            </div>
            <h4 className="text-base font-bold text-white">
              {isAmharic ? "የአቅመ-ደካሞች ተራድዖ" : "Vulnerable & Elderly Care"}
            </h4>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              {isAmharic 
                ? "በአጥቢያችን ለሚገኙ ችግረኛ ወገኖች፣ አረጋውያንና አቅመ-ደካሞች ወርሃዊ የምግብና የመድኃኒት ድጋፍ።" 
                : "Monthly food parcels, medical assistance, and emergency relief for needy community members."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#09201e]/70 border border-emerald-800/60 space-y-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Sparkles size={20} />
            </div>
            <h4 className="text-base font-bold text-white">
              {isAmharic ? "የሰንበት ት/ቤቱ አዳራሽና ሚዲያ" : "Sunday School Hall & Media"}
            </h4>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              {isAmharic 
                ? "የድምጽ፣ ምስልና የመገናኛ ብዙኃን መሣሪያዎችን በማሟላት የወንጌልን ብርሃን በሰፊው ማዳረስ።" 
                : "Upgrading audio-visual equipment, library, and broadcasting infrastructure for wider evangelism."}
            </p>
          </div>
        </div>

        {/* Bank & Payment Cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-xs text-amber-400 font-semibold mb-2 text-center uppercase tracking-wider">
            {t.givingAccountHolder}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {accounts.map((acc) => {
              const isCopied = copiedKey === acc.id;
              const IconComp = acc.icon;

              return (
                <div
                  key={acc.id}
                  className={`p-6 rounded-3xl bg-[#09201e] border-2 ${acc.color} transition-all duration-300 shadow-xl flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 text-amber-400">
                        <IconComp size={22} />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${acc.badgeColor}`}>
                        {acc.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                      {isAmharic ? acc.bankNameAm : acc.bankNameEn}
                    </h4>

                    <div className="p-3 rounded-xl bg-[#051413] border border-emerald-900/60 font-mono text-sm sm:text-base font-extrabold text-amber-300 tracking-wider text-center select-all mb-2">
                      {acc.accountNumber}
                    </div>
                    {acc.holderAm && (
                      <div className="text-[11px] text-emerald-300/80 text-center mb-3">
                        <span>{acc.holderAm}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => copyToClipboard(acc.accountNumber, acc.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} />
                        <span>{t.givingCopied}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
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

