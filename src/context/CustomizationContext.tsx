import React, { createContext, useContext, useState, useEffect } from 'react';
import { DepartmentSettings } from '../types/auth';
import { api } from '../services/api';

export type AppTheme = 'teal' | 'gold' | 'crimson';
export type FontSize = 'standard' | 'large';

interface GlobalAnnouncement {
  enabled: boolean;
  textAm: string;
  textEn: string;
  badgeAm: string;
  badgeEn: string;
  updatedBy: string;
  updatedAt: string;
}

interface CustomizationContextType {
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  announcement: GlobalAnnouncement;
  updateAnnouncement: (announcement: Partial<GlobalAnnouncement>) => void;
  departmentSettings: Record<string, DepartmentSettings>;
  updateDepartmentSettings: (deptId: string, settings: Partial<DepartmentSettings>) => void;
  refreshSettings: () => Promise<void>;
}

const initialAnnouncement: GlobalAnnouncement = {
  enabled: true,
  badgeAm: "አስቸኳይ ማስታወቂያ",
  badgeEn: "PARISH NOTICE",
  textAm: "የ2026/2027 ዓ.ም አዲስ የሰንበት ት/ቤት ተማሪዎች ምዝገባ በይፋ ተጀምሯል! በድረ-ገጻችን አሁኑኑ ይመዝገቡ።",
  textEn: "Enrollment for the 2026/2027 Sunday School Academic Year is now open! Register online today.",
  updatedBy: "ሥራ አመራር ክፍል",
  updatedAt: "2026-09-30"
};

const initialDeptSettings: Record<string, DepartmentSettings> = {
  leadership: {
    id: "leadership",
    mottoAm: "«በመልካም ሥራ ሁሉ ፍሬ እያፈራችሁ» (ቆላ. 1:10)",
    mottoEn: "«Bearing fruit in every good work» (Col. 1:10)",
    meetingTimeAm: "ቅዳሜ ከሰዓት 10:00 ሰዓት",
    meetingTimeEn: "Saturdays at 4:00 PM",
    announcementAm: "የሥራ አመራር ክፍል ወርሃዊ የዕቅድ ግምገማ በሚቀጥለው ቅዳሜ ይካሄዳል።",
    announcementEn: "Executive leadership monthly planning review will be held this Saturday.",
    contactPersonAm: "ዲ/ን ዮሐንስ (ዋና ጸሐፊ)",
    contactPersonEn: "Dn. Yohannes (Secretary General)",
    contactPhone: "+251 91 123 4567",
    updatedAt: "2026-09-30"
  },
  education: {
    id: "education",
    mottoAm: "«ሕዝቤ እውቀት ከማጣቱ የተነሳ ጠፍቷል» (ሆሴዕ 4:6)",
    mottoEn: "«My people are destroyed for lack of knowledge» (Hosea 4:6)",
    meetingTimeAm: "እሁድ ከሰዓት 8:30 ሰዓት",
    meetingTimeEn: "Sundays at 2:30 PM",
    announcementAm: "ለአዲስ ተማሪዎች የመማሪያ መጻሕፍትና ማስታወሻዎች በትምህርት ክፍሉ ተዘጋጅተዋል።",
    announcementEn: "Textbooks and syllabi for incoming students are now available at the office.",
    contactPersonAm: "መምህር ተስፋዬ (የትምህርት ኃላፊ)",
    contactPersonEn: "Memhir Tesfaye (Education Head)",
    contactPhone: "+251 91 234 5678",
    updatedAt: "2026-09-30"
  },
  children: {
    id: "children",
    mottoAm: "«ሕፃናትን ወደ እኔ ይመጡ ዘንድ ተዉአቸው፤ አትከልክሏቸው» (ማቴ. 19:14)",
    mottoEn: "«Let the little children come to Me, and do not hinder them» (Matt. 19:14)",
    meetingTimeAm: "እሁድ ጠዋት 3:00 ሰዓት",
    meetingTimeEn: "Sundays at 9:00 AM",
    announcementAm: "የሕፃናት ክፍል የመዝሙርና የስዕል ቀን ዝግጅት በቅርቡ ይደረጋል።",
    announcementEn: "Children's hymn recital and biblical drawing exhibition is coming soon.",
    contactPersonAm: "እህት ጽዮን (የሕፃናት አስተባባሪ)",
    contactPersonEn: "Sister Tsion (Children Coordinator)",
    contactPhone: "+251 91 345 6789",
    updatedAt: "2026-09-30"
  },
  choir: {
    id: "choir",
    mottoAm: "«እግዚአብሔርን በዜማ አመስግኑት» (መዝ. 150)",
    mottoEn: "«Praise the Lord with melody and harp» (Psalm 150)",
    meetingTimeAm: "ቅዳሜ 9:00 - 12:00 ከሰዓት",
    meetingTimeEn: "Saturdays 3:00 PM - 6:00 PM",
    announcementAm: "የከበሮና የበገና ልምምድ በየሳምንቱ ቅዳሜ በዋናው አዳራሽ ይካሄዳል።",
    announcementEn: "Weekly Begena harp and Kebero drum practice takes place in the main hall.",
    contactPersonAm: "ዘማሪ አማኑኤል (የመዘምራን መሪ)",
    contactPersonEn: "Zemari Amanuel (Choir Director)",
    contactPhone: "+251 91 456 7890",
    updatedAt: "2026-09-30"
  }
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    return (localStorage.getItem('ft_theme') as AppTheme) || 'teal';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('ft_font_size') as FontSize) || 'standard';
  });

  const [announcement, setAnnouncementState] = useState<GlobalAnnouncement>(() => {
    const saved = localStorage.getItem('ft_announcement');
    return saved ? JSON.parse(saved) : initialAnnouncement;
  });

  const [departmentSettings, setDepartmentSettingsState] = useState<Record<string, DepartmentSettings>>(() => {
    const saved = localStorage.getItem('ft_dept_settings');
    return saved ? JSON.parse(saved) : initialDeptSettings;
  });

  const refreshSettings = async () => {
    try {
      const depts = await api.getDepartments();
      if (depts && Object.keys(depts).length > 0) {
        setDepartmentSettingsState((prev) => ({ ...prev, ...depts }));
        localStorage.setItem('ft_dept_settings', JSON.stringify({ ...departmentSettings, ...depts }));
      }
      const ann = await api.getAnnouncement();
      if (ann && ann.textAm) {
        setAnnouncementState((prev) => ({ ...prev, ...ann }));
        localStorage.setItem('ft_announcement', JSON.stringify(ann));
      }
    } catch (e) {
      // Keep local state if server is loading
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  const setTheme = (t: AppTheme) => {
    setThemeState(t);
    localStorage.setItem('ft_theme', t);
  };

  const setFontSize = (s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem('ft_font_size', s);
  };

  const updateAnnouncement = async (partial: Partial<GlobalAnnouncement>) => {
    const updated = { ...announcement, ...partial };
    setAnnouncementState(updated);
    localStorage.setItem('ft_announcement', JSON.stringify(updated));
    try {
      await api.updateAnnouncement(updated, 'leadership');
    } catch (e) {
      // Local fallback
    }
  };

  const updateDepartmentSettings = async (deptId: string, settings: Partial<DepartmentSettings>) => {
    const existing = departmentSettings[deptId] || {
      id: deptId,
      mottoAm: "",
      mottoEn: "",
      meetingTimeAm: "",
      meetingTimeEn: "",
      announcementAm: "",
      announcementEn: "",
      contactPersonAm: "",
      contactPersonEn: "",
      contactPhone: "",
      updatedAt: new Date().toISOString()
    };
    const updated = {
      ...departmentSettings,
      [deptId]: {
        ...existing,
        ...settings,
        updatedAt: new Date().toLocaleDateString('am-ET')
      }
    };
    setDepartmentSettingsState(updated);
    localStorage.setItem('ft_dept_settings', JSON.stringify(updated));

    try {
      await api.updateDepartment(deptId, settings, 'leadership', deptId);
    } catch (e) {
      // Local fallback
    }
  };

  useEffect(() => {
    document.body.classList.remove('theme-teal', 'theme-gold', 'theme-crimson');
    document.body.classList.add(`theme-${theme}`);
    
    document.documentElement.classList.remove('font-standard', 'font-large');
    document.documentElement.classList.add(`font-${fontSize}`);
  }, [theme, fontSize]);

  return (
    <CustomizationContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        announcement,
        updateAnnouncement,
        departmentSettings,
        updateDepartmentSettings,
        refreshSettings
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
