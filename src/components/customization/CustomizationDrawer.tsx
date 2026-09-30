import React from 'react';
import { useCustomization, AppTheme, FontSize } from '../../context/CustomizationContext';
import { useLanguage } from '../../context/LanguageContext';
import { EthiopianCross } from '../common/EthiopianCross';
import { X, Sliders, Palette, Type, Check, Sparkles } from 'lucide-react';

interface CustomizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationDrawer: React.FC<CustomizationDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, fontSize, setFontSize } = useCustomization();
  const { isAmharic } = useLanguage();

  if (!isOpen) return null;

  const themes: { id: AppTheme; nameAm: string; nameEn: string; color: string; descAm: string }[] = [
    {
      id: 'teal',
      nameAm: 'ደብረ ትጉሃን አረንጓዴ (ነባሪ)',
      nameEn: 'Sacred Parish Teal (Default)',
      color: 'bg-[#0f3835] border-amber-400',
      descAm: 'የደብራችን አርማና የቅዱስ ሚካኤል ጥቁር አረንጓዴ ከወርቃማ ድምቀት ጋር'
    },
    {
      id: 'gold',
      nameAm: 'ኢምፔሪያል ወርቃማ (በዓላዊ)',
      nameEn: 'Imperial Orthodox Gold (Festal)',
      color: 'bg-[#b45309] border-yellow-300',
      descAm: 'የንግሥና የበዓላት ደማቅ ወርቃማ ድባብ'
    },
    {
      id: 'crimson',
      nameAm: 'ገዳማዊ ቀይ / ሐምራዊ (ትውፊታዊ)',
      nameEn: 'Monastery Crimson (Vestment)',
      color: 'bg-[#881337] border-rose-400',
      descAm: 'የካህናትና የአበው የቅዳሴ ልብሰ ተክህኖ ደማቅ ቀለም'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md h-full bg-[#081b19] border-l-2 border-amber-500/40 shadow-2xl p-6 flex flex-col justify-between text-left overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-900 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Sliders size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <span>{isAmharic ? 'የድረ-ገጽ ማበጀትና ገጽታ' : 'Portal Customization'}</span>
                  <Sparkles size={14} className="text-amber-400" />
                </h3>
                <p className="text-[11px] text-emerald-200/70">
                  {isAmharic ? 'ቀለማት፣ የፊደል መጠንና ገጽታን ያብጁ' : 'Personalize theme colors & font sizes'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-emerald-300 hover:text-white hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Theme Selector */}
          <div className="space-y-3 mb-8">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Palette size={14} />
              <span>{isAmharic ? 'የቀለም ገጽታ (Theme)' : 'Theme Color Palette'}</span>
            </div>

            <div className="space-y-2.5">
              {themes.map((th) => {
                const isSelected = theme === th.id;

                return (
                  <div
                    key={th.id}
                    onClick={() => setTheme(th.id)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#123833] border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-[#051413] border-emerald-900/80 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border-2 ${th.color} shadow-inner shrink-0 flex items-center justify-center`}>
                        {isSelected && <Check size={14} className="text-white" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {isAmharic ? th.nameAm : th.nameEn}
                        </div>
                        <div className="text-[10px] text-emerald-200/70">
                          {th.descAm}
                        </div>
                      </div>
                    </div>

                    <EthiopianCross size={16} variant="simple" className={isSelected ? 'text-amber-400' : 'text-emerald-700'} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Font Size Selector */}
          <div className="space-y-3 mb-8">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Type size={14} />
              <span>{isAmharic ? 'የግዕዝ ፊደላት መጠን (Font Size)' : 'Ethiopic Typography Size'}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFontSize('standard')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  fontSize === 'standard'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                    : 'bg-[#051413] border-emerald-900 text-emerald-200/80 hover:text-white'
                }`}
              >
                <span className="text-base">ሀ ሁ ሂ ሃ</span>
                <span>{isAmharic ? 'መደበኛ (Standard)' : 'Standard'}</span>
              </button>

              <button
                onClick={() => setFontSize('large')}
                className={`p-3 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  fontSize === 'large'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                    : 'bg-[#051413] border-emerald-900 text-emerald-200/80 hover:text-white'
                }`}
              >
                <span className="text-lg font-black">ሀ ሁ ሂ ሃ</span>
                <span>{isAmharic ? 'ትልቅ (Large Font)' : 'Large'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Done Button */}
        <div className="pt-4 border-t border-emerald-950">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all shadow cursor-pointer"
          >
            {isAmharic ? 'ተጠናቋል' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
