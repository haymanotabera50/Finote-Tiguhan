import React, { useState } from 'react';
import { useCustomization } from '../../context/CustomizationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Megaphone, X, ArrowRight } from 'lucide-react';

interface BannerProps {
  onOpenRegister: () => void;
}

export const GlobalAnnouncementBanner: React.FC<BannerProps> = ({ onOpenRegister }) => {
  const { announcement } = useCustomization();
  const { isAmharic } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (!announcement.enabled || dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs font-bold py-2 px-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap flex-1 justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-extrabold uppercase">
            <Megaphone size={12} />
            <span>{isAmharic ? announcement.badgeAm : announcement.badgeEn}</span>
          </span>
          <span className="text-slate-950 font-semibold leading-tight text-center sm:text-left">
            {isAmharic ? announcement.textAm : announcement.textEn}
          </span>
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1 underline text-slate-950 hover:text-black font-extrabold ml-1 cursor-pointer"
          >
            <span>{isAmharic ? "አሁኑኑ ይመዝገቡ" : "Register Online"}</span>
            <ArrowRight size={12} />
          </button>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-full hover:bg-black/10 text-slate-950 shrink-0"
          title="Dismiss Banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
