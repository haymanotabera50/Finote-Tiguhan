import React, { useRef, useEffect } from 'react';
import { useCustomization, AppTheme } from '../../context/CustomizationContext';
import { useLanguage } from '../../context/LanguageContext';
import { EthiopianCross } from '../common/EthiopianCross';
import { 
  X, 
  Sliders, 
  Palette, 
  Type, 
  Check, 
  Sparkles, 
  Minus, 
  Plus, 
  Moon, 
  Sun,
  RotateCcw
} from 'lucide-react';

interface CustomizationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizationDrawer: React.FC<CustomizationDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, fontScale, setFontScale } = useCustomization();
  const { isAmharic } = useLanguage();

  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopHolding = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  const startHolding = (delta: number) => {
    // Immediate step
    setFontScale((prev) => prev + delta);

    // If held for more than 250ms, start continuous interval
    stopHolding();
    holdTimeoutRef.current = setTimeout(() => {
      holdIntervalRef.current = setInterval(() => {
        setFontScale((prev) => prev + delta);
      }, 65);
    }, 250);
  };

  useEffect(() => {
    return () => {
      stopHolding();
    };
  }, []);

  if (!isOpen) return null;

  const themes: {
    id: AppTheme;
    nameAm: string;
    nameEn: string;
    descAm: string;
    descEn: string;
    icon: typeof Moon;
    previewBg: string;
    accentColor: string;
  }[] = [
    {
      id: 'dark',
      nameAm: 'ጨለማ ገጽታ (Dark Mode)',
      nameEn: 'Dark Mode (Sacred Obsidian)',
      descAm: 'ጥቁርና ጥልቅ አረንጓዴ ከወርቃማ ድምቀት ጋር ለምቾት እይታ',
      descEn: 'Deep obsidian & sacred emerald with rich orthodox gold',
      icon: Moon,
      previewBg: 'bg-[#081a18] border-emerald-700',
      accentColor: 'text-amber-400'
    },
    {
      id: 'light',
      nameAm: 'ብርሃን ገጽታ (Light Mode)',
      nameEn: 'Light Mode (Pure Daylight)',
      descAm: 'ንጹህና ብሩህ ነጭ ገጽታ ለቀን ንባብና ቀላል እይታ',
      descEn: 'Crisp white & daylight contrast with golden accents',
      icon: Sun,
      previewBg: 'bg-white border-amber-300',
      accentColor: 'text-amber-600'
    }
  ];

  // Descriptor for font scale percentage
  const getScaleLabel = (scale: number) => {
    if (scale <= 89) return isAmharic ? 'አነስተኛ' : 'Compact';
    if (scale <= 105) return isAmharic ? 'መደበኛ' : 'Default';
    if (scale <= 120) return isAmharic ? 'ትልቅ' : 'Large';
    return isAmharic ? 'በጣም ትልቅ' : 'Extra Large';
  };

  const sliderPercent = Math.round(((fontScale - 80) / (135 - 80)) * 100);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end p-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md h-full bg-[#081b19] border-l-2 border-amber-500/40 shadow-2xl p-6 flex flex-col justify-between text-left overflow-y-auto select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-900/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
                <Sliders size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <span>{isAmharic ? 'የድረ-ገጽ ማበጀትና ገጽታ' : 'Display & Theme Settings'}</span>
                  <Sparkles size={15} className="text-amber-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-emerald-200/70">
                  {isAmharic ? 'ገጽታንና የፊደል መጠንን እንደፍላጎትዎ ያብጁ' : 'Customize theme mode and font sizing'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-emerald-300 hover:text-white hover:bg-white/10 transition-colors"
              title={isAmharic ? 'ዝጋ' : 'Close'}
            >
              <X size={20} />
            </button>
          </div>

          {/* Theme Selector (Only Dark and Light) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Palette size={15} />
                <span>{isAmharic ? 'የቀለም ገጽታ (Theme)' : 'Color Theme'}</span>
              </div>
              <span className="text-[11px] text-emerald-300/70 font-medium">
                {theme === 'dark' 
                  ? (isAmharic ? 'ጨለማ ገጽታ በርቷል 🌙' : 'Dark Mode Active 🌙') 
                  : (isAmharic ? 'ብርሃን ገጽታ በርቷል ☀️' : 'Light Mode Active ☀️')}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {themes.map((th) => {
                const isSelected = theme === th.id;
                const IconComponent = th.icon;

                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id)}
                    className={`w-full p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                      isSelected
                        ? 'bg-[#123833] border-amber-400 shadow-lg ring-1 ring-amber-400/50'
                        : 'bg-[#051413] border-emerald-900/80 hover:border-amber-500/40 hover:bg-[#081e1c]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl border-2 ${th.previewBg} shadow-inner shrink-0 flex items-center justify-center transition-transform ${isSelected ? 'scale-105' : ''}`}>
                        <IconComponent size={20} className={th.id === 'light' ? 'text-amber-600' : 'text-amber-400'} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{isAmharic ? th.nameAm : th.nameEn}</span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Check size={11} /> {isAmharic ? 'ንቁ' : 'Active'}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-emerald-200/70 mt-0.5">
                          {isAmharic ? th.descAm : th.descEn}
                        </div>
                      </div>
                    </div>

                    <EthiopianCross 
                      size={18} 
                      variant="simple" 
                      className={isSelected ? 'text-amber-400' : 'text-emerald-800'} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size Controller (Touch, Hold, Slide, Reduce & Enlarge) */}
          <div className="space-y-3.5 pt-2 border-t border-emerald-950">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Type size={15} />
                <span>{isAmharic ? 'የፊደል መጠን መቆጣጠሪያ' : 'Font Size Controller'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                  {fontScale}%
                </span>
                <span className="text-[11px] text-emerald-300/80">
                  ({getScaleLabel(fontScale)})
                </span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-200/70">
              {isAmharic 
                ? 'ተጭነው በመያዝ ወይም በማንሸራተት የፊደል መጠኑን ያሳንሱ / ያሳድጉ (Touch & hold or slide)' 
                : 'Touch & hold the buttons or drag the slider to scale font size up and down'}
            </p>

            {/* Slider Control Bar with Touch-and-Hold Minus & Plus Buttons */}
            <div className="p-3.5 rounded-2xl bg-[#051413] border border-emerald-900/80 space-y-3">
              <div className="flex items-center gap-3">
                {/* Touch-and-Hold Reduce Button */}
                <button
                  type="button"
                  onPointerDown={() => startHolding(-2)}
                  onPointerUp={stopHolding}
                  onPointerLeave={stopHolding}
                  onPointerCancel={stopHolding}
                  disabled={fontScale <= 80}
                  className="w-10 h-10 rounded-xl bg-[#0e2a27] hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-black transition-all active:scale-95 shadow shrink-0 select-none cursor-pointer"
                  title={isAmharic ? 'የፊደል መጠን ቀንስ (ተጭነው በመያዝ ይቀንሱ)' : 'Reduce Font Size (Hold to reduce)'}
                  aria-label="Reduce font size"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>

                {/* Range Slider Track */}
                <div className="flex-1 relative flex items-center py-2">
                  <input
                    type="range"
                    min="80"
                    max="135"
                    step="1"
                    value={fontScale}
                    onChange={(e) => setFontScale(Number(e.target.value))}
                    className="font-size-slider w-full cursor-pointer accent-amber-500"
                    style={{
                      background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${sliderPercent}%, #113430 ${sliderPercent}%, #113430 100%)`
                    }}
                    aria-label="Font scale range slider"
                  />
                </div>

                {/* Touch-and-Hold Enlarge Button */}
                <button
                  type="button"
                  onPointerDown={() => startHolding(2)}
                  onPointerUp={stopHolding}
                  onPointerLeave={stopHolding}
                  onPointerCancel={stopHolding}
                  disabled={fontScale >= 135}
                  className="w-10 h-10 rounded-xl bg-[#0e2a27] hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-black transition-all active:scale-95 shadow shrink-0 select-none cursor-pointer"
                  title={isAmharic ? 'የፊደል መጠን አሳድግ (ተጭነው በመያዝ ያሳድጉ)' : 'Enlarge Font Size (Hold to enlarge)'}
                  aria-label="Enlarge font size"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>

              {/* Slider Scale Indicator Marks */}
              <div className="flex justify-between items-center text-[10px] text-emerald-300/60 font-mono px-1">
                <span>80% (ትንሽ)</span>
                <span>100% (መደበኛ)</span>
                <span>135% (ትልቅ)</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { scale: 85, labelAm: '85% አነስተኛ', labelEn: '85%' },
                { scale: 100, labelAm: '100% መደበኛ', labelEn: '100%' },
                { scale: 115, labelAm: '115% ትልቅ', labelEn: '115%' },
                { scale: 130, labelAm: '130% ግዙፍ', labelEn: '130%' }
              ].map((p) => {
                const isCurrent = Math.abs(fontScale - p.scale) <= 2;
                return (
                  <button
                    key={p.scale}
                    type="button"
                    onClick={() => setFontScale(p.scale)}
                    className={`py-1.5 px-1 rounded-xl text-[10px] font-bold border transition-all cursor-pointer truncate ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                        : 'bg-[#051413] text-emerald-200/80 border-emerald-900/80 hover:border-amber-500/50 hover:text-white'
                    }`}
                  >
                    {isAmharic ? p.labelAm : p.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Live Text Preview Box */}
            <div className="p-3.5 rounded-2xl bg-[#041211] border border-amber-500/30 shadow-inner">
              <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold mb-1.5 uppercase tracking-wider">
                <span>{isAmharic ? 'የእይታ ቅምሻ (Live Preview)' : 'Live Typography Preview'}</span>
                <span className="text-emerald-300/70 font-mono">{fontScale}%</span>
              </div>
              <div 
                className="transition-all duration-100 ease-out text-center py-2"
                style={{ fontSize: `${(fontScale / 100) * 1.05}rem` }}
              >
                <p className="font-bold text-amber-200 leading-tight">
                  «በስመ አብ ወወልድ ወመንፈስ ቅዱስ አሐዱ አምላክ አሜን»
                </p>
                <p className="text-emerald-100 text-xs mt-1">
                  ፍኖተ ትጉሃን ሰንበት ትምህርት ቤት
                </p>
              </div>
            </div>

            {/* Reset to 100% Button */}
            {fontScale !== 100 && (
              <button
                type="button"
                onClick={() => setFontScale(100)}
                className="w-full py-1.5 text-xs text-emerald-300 hover:text-amber-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>{isAmharic ? 'ወደ መደበኛ መጠን መልስ (100%)' : 'Reset to default font size (100%)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Done Button */}
        <div className="pt-4 border-t border-emerald-950 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:from-amber-400 hover:to-amber-500 transition-all shadow cursor-pointer flex items-center justify-center gap-2"
          >
            <Check size={16} />
            <span>{isAmharic ? 'ተጠናቋል' : 'Done'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

