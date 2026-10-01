import React, { createContext, useContext, useState, useEffect } from 'react';
import { DepartmentSettings } from '../types/auth';
import { DepartmentTaskItem } from '../types';
import { departmentsData } from '../data/departmentsData';
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
  departmentTasks: Record<string, DepartmentTaskItem[]>;
  updateTaskStatus: (deptId: string, taskId: string, status: 'planned' | 'in_progress' | 'completed') => void;
  addTask: (deptId: string, task: Omit<DepartmentTaskItem, 'id'>) => void;
  deleteTask: (deptId: string, taskId: string) => void;
  refreshSettings: () => Promise<void>;
}

const initialAnnouncement: GlobalAnnouncement = {
  enabled: true,
  badgeAm: "አስቸኳይ ማስታወቂያ",
  badgeEn: "PARISH NOTICE",
  textAm: "የአዲስ የሰንበት ት/ቤት ተማሪዎች ምዝገባ በይፋ ተጀምሯል! በድረ-ገጻችን አሁኑኑ ይመዝገቡ።",
  textEn: "Enrollment for the Sunday School Academic Year is now open! Register online today.",
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
  audit: {
    id: "audit",
    mottoAm: "«በሁሉ ነገር እውነተኞችና ታማኞች ሁኑ» (ዕብ. 13:18)",
    mottoEn: "«Desiring to act honorably in all things» (Heb. 13:18)",
    meetingTimeAm: "እሁድ ከሰዓት 11:00 ሰዓት",
    meetingTimeEn: "Sundays at 5:00 PM",
    announcementAm: "የሩብ ዓመት የፋይናንስና ንብረት ኢንስፔክሽን ተጠናቋል።",
    announcementEn: "Quarterly financial and asset inspection has commenced.",
    contactPersonAm: "አቶ ገብረ ሥላሴ (የኦዲት ሰብሳቢ)",
    contactPersonEn: "Ato Gebresellassie (Audit Head)",
    contactPhone: "+251 91 765 4321",
    updatedAt: "2026-09-30"
  },
  development: {
    id: "development",
    mottoAm: "«እግዚአብሔር ቤትን ካልሠራ ሠሪዎች በከንቱ ይደክማሉ» (መዝ. 127:1)",
    mottoEn: "«Unless the Lord builds the house, the builders labor in vain» (Psalm 127:1)",
    meetingTimeAm: "ቅዳሜ ጠዋት 3:30 ሰዓት",
    meetingTimeEn: "Saturdays at 9:30 AM",
    announcementAm: "ለመጪው በዓል አዳዲስ መንፈሳዊ አልባሳትና መጻሕፍት በሽያጭ ሱቃችን ቀርበዋል።",
    announcementEn: "New spiritual vestments and books now available at parish store.",
    contactPersonAm: "አቶ ሚካኤል (የቦርድ ሰብሳቢ)",
    contactPersonEn: "Ato Michael (Board Chair)",
    contactPhone: "+251 91 876 5432",
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
  apostolic: {
    id: "apostolic",
    mottoAm: "«ወደ ዓለም ሁሉ ሂዱ ወንጌልንም ለፍጥረት ሁሉ ስበኩ» (ማር. 16:15)",
    mottoEn: "«Go into all the world and proclaim the gospel» (Mark 16:15)",
    meetingTimeAm: "እሁድ ከሰዓት 10:00 ሰዓት",
    meetingTimeEn: "Sundays at 4:00 PM",
    announcementAm: "የአጥቢያ የወንጌል ጉባኤ በዚህ ሳምንት አርብ ይካሄዳል።",
    announcementEn: "Parish revival assembly will take place this Friday evening.",
    contactPersonAm: "ዲ/ን ዳንኤል (ሐዋርያዊ አስተባባሪ)",
    contactPersonEn: "Dn. Daniel (Evangelism Coordinator)",
    contactPhone: "+251 91 654 3210",
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
  },
  charity: {
    id: "charity",
    mottoAm: "«እርስ በርሳችሁ ፍቅር ቢኖራችሁ ደቀ መዛሙርቴ እንደ ሆናችሁ ሰዎች ሁሉ በዚህ ያውቃሉ» (ዮሐ. 13:35)",
    mottoEn: "«By this everyone will know that you are my disciples, if you love one another» (John 13:35)",
    meetingTimeAm: "እሁድ ከሰዓት 9:00 ሰዓት",
    meetingTimeEn: "Sundays at 3:00 PM",
    announcementAm: "ለተቸገሩ ወገኖች የሚሰበሰበው ወርሃዊ የልብስና የእህል ድጋፍ እየተካሄደ ነው።",
    announcementEn: "Monthly relief collection for vulnerable parishioners is active.",
    contactPersonAm: "ወ/ሮ ራሔል (የበጎ አድራጎት ኃላፊ)",
    contactPersonEn: "W/ro Rahel (Charity Coordinator)",
    contactPhone: "+251 91 543 2109",
    updatedAt: "2026-09-30"
  },
  finance: {
    id: "finance",
    mottoAm: "«በጥቂቱ የታመንህ በብዙ እሾምሃለሁ» (ማቴ. 25:21)",
    mottoEn: "«You have been faithful with a few things; I will put you in charge of many» (Matt. 25:21)",
    meetingTimeAm: "ቅዳሜ ከሰዓት 8:00 ሰዓት",
    meetingTimeEn: "Saturdays at 2:00 PM",
    announcementAm: "የወርሃዊ መዋጮ በድረ-ገጻችን ወይም በዋና ገንዘብ ያዥ በኩል መክፈል ይችላሉ።",
    announcementEn: "Monthly contributions can be remitted online or via treasurer.",
    contactPersonAm: "አቶ ተክለ ሃይማኖት (ገንዘብ ያዥ)",
    contactPersonEn: "Ato Teklehaimanot (Treasurer)",
    contactPhone: "+251 91 432 1098",
    updatedAt: "2026-09-30"
  },
  media: {
    id: "media",
    mottoAm: "«የእግዚአብሔር ቃል ይስፋፋ ነበረ» (የሐዋ. 6:7)",
    mottoEn: "«So the word of God spread» (Acts 6:7)",
    meetingTimeAm: "እሁድ ከሰዓት 10:30 ሰዓት",
    meetingTimeEn: "Sundays at 4:30 PM",
    announcementAm: "አዳዲስ መንፈሳዊ ትምህርቶች በዩቲዩብ ቻናላችን ተጭነዋል።",
    announcementEn: "New spiritual lectures uploaded on our YouTube channel.",
    contactPersonAm: "ዲ/ን ቴዎድሮስ (የሚዲያ አስተባባሪ)",
    contactPersonEn: "Dn. Tewodros (Media Coordinator)",
    contactPhone: "+251 91 321 0987",
    updatedAt: "2026-09-30"
  },
  counseling: {
    id: "counseling",
    mottoAm: "«ምክር ከሌለ ዘንድ የታሰበው አይጸናም፤ አማካሪዎች በበዙበት ግን ይጸናል» (ምሳሌ 15:22)",
    mottoEn: "«Plans fail for lack of counsel, but with many advisers they succeed» (Prov. 15:22)",
    meetingTimeAm: "ቅዳሜ ከሰዓት 11:00 ሰዓት",
    meetingTimeEn: "Saturdays at 5:00 PM",
    announcementAm: "የግልና የቤተሰብ ምስጢራዊ የምክር ቀጠሮ በቢሮአችን ክፍት ነው።",
    announcementEn: "Confidential counseling appointments are available upon request.",
    contactPersonAm: "ቀሲስ ሰሎሞን (የምክር አስተባባሪ)",
    contactPersonEn: "Qes Solomon (Counseling Head)",
    contactPhone: "+251 91 210 9876",
    updatedAt: "2026-09-30"
  },
  members: {
    id: "members",
    mottoAm: "«በአንድ ልብ ሆነው በቤተ መቅደስ ይተጉ ነበር» (የሐዋ. 2:46)",
    mottoEn: "«They broke bread together with glad and sincere hearts» (Acts 2:46)",
    meetingTimeAm: "እሁድ ከሰዓት 8:00 ሰዓት",
    meetingTimeEn: "Sundays at 2:00 PM",
    announcementAm: "የአባላት ዲጂታል መታወቂያ ካርድ በፖርታሉ ላይ ዝግጁ ሆኗል።",
    announcementEn: "Digital Member ID cards are now active in the portal.",
    contactPersonAm: "አቶ ማቴዎስ (የአባላት ኃላፊ)",
    contactPersonEn: "Ato Mathewos (Members Head)",
    contactPhone: "+251 91 109 8765",
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
  abnet: {
    id: "abnet",
    mottoAm: "«የቀደመችውን መንገድ ጠይቁ፤ መልካሚቱንም መንገድ እዩና በእርስዋ ላይ ሂዱ» (ኤር. 6:16)",
    mottoEn: "«Ask for the ancient paths, where the good way is, and walk in it» (Jer. 6:16)",
    meetingTimeAm: "ዘወትር ከሰኞ እስከ ዓርብ ከምሽቱ 12:00",
    meetingTimeEn: "Monday to Friday at 6:00 PM",
    announcementAm: "የዳዊት ንባብና የዜማ አዳዲስ ተማሪዎች ምዝገባ እየተካሄደ ነው።",
    announcementEn: "New student registration for Ge'ez Psalter and Zema is underway.",
    contactPersonAm: "መምህር ገብረ እግዚአብሔር (የአብነት መምህር)",
    contactPersonEn: "Memhir Gebreegziabher (Abnet Master)",
    contactPhone: "+251 91 998 8776",
    updatedAt: "2026-09-30"
  },
  arts: {
    id: "arts",
    mottoAm: "«በጥበብና በማስተዋል በእውቀትም በብልሃትም ሁሉ የእግዚአብሔር መንፈስ ሞላበት» (ዘፀ. 31:3)",
    mottoEn: "«Filled with the Spirit of God, in wisdom, ability, and craftsmanship» (Ex. 31:3)",
    meetingTimeAm: "ቅዳሜ ከሰዓት 10:00 ሰዓት",
    meetingTimeEn: "Saturdays at 4:00 PM",
    announcementAm: "ለቀጣዩ ንግሥ በዓል የሚቀርበው አዲስ መንፈሳዊ ድራማ ዝግጅት ተጀምሯል።",
    announcementEn: "Rehearsals for the upcoming saint feast play have commenced.",
    contactPersonAm: "ዲ/ን ዮሴፍ (የስነ ጥበባት ኃላፊ)",
    contactPersonEn: "Dn. Yosef (Arts Director)",
    contactPhone: "+251 91 887 7665",
    updatedAt: "2026-09-30"
  },
  institutions: {
    id: "institutions",
    mottoAm: "«ሁሉ በአግባብና በሥርዓት ይሁን» (1 ቆሮ. 14:40)",
    mottoEn: "«Let all things be done decently and in order» (1 Cor. 14:40)",
    meetingTimeAm: "ቅዳሜ ጠዋት 4:00 ሰዓት",
    meetingTimeEn: "Saturdays at 10:00 AM",
    announcementAm: "የሰንበት ት/ቤቱ አዳራሾች እድሳትና የድምጽ ስርዓት ዝግጅት ተጠናቋል።",
    announcementEn: "Assembly halls renovation and audio setup successfully finalized.",
    contactPersonAm: "አቶ ሳሙኤል (የተቋማት ኃላፊ)",
    contactPersonEn: "Ato Samuel (Institutions Head)",
    contactPhone: "+251 91 776 6554",
    updatedAt: "2026-09-30"
  }
};

const buildInitialTasks = (): Record<string, DepartmentTaskItem[]> => {
  const result: Record<string, DepartmentTaskItem[]> = {};
  departmentsData.forEach((dept) => {
    result[dept.id] = dept.defaultActionTasks ? [...dept.defaultActionTasks] : [];
  });
  return result;
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
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initialDeptSettings, ...parsed };
      } catch (e) {
        return initialDeptSettings;
      }
    }
    return initialDeptSettings;
  });

  // Trackable Tasks per Department from the Bylaws
  const [departmentTasks, setDepartmentTasksState] = useState<Record<string, DepartmentTaskItem[]>>(() => {
    const saved = localStorage.getItem('ft_dept_tasks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const defaults = buildInitialTasks();
        return { ...defaults, ...parsed };
      } catch (e) {
        return buildInitialTasks();
      }
    }
    return buildInitialTasks();
  });

  const updateTaskStatus = (deptId: string, taskId: string, status: 'planned' | 'in_progress' | 'completed') => {
    setDepartmentTasksState((prev) => {
      const list = prev[deptId] || [];
      const updatedList = list.map((t) => (t.id === taskId ? { ...t, status } : t));
      const nextState = { ...prev, [deptId]: updatedList };
      localStorage.setItem('ft_dept_tasks', JSON.stringify(nextState));
      return nextState;
    });
  };

  const addTask = (deptId: string, task: Omit<DepartmentTaskItem, 'id'>) => {
    setDepartmentTasksState((prev) => {
      const list = prev[deptId] || [];
      const newTask: DepartmentTaskItem = {
        ...task,
        id: `${deptId}-custom-${Date.now()}`
      };
      const nextState = { ...prev, [deptId]: [newTask, ...list] };
      localStorage.setItem('ft_dept_tasks', JSON.stringify(nextState));
      return nextState;
    });
  };

  const deleteTask = (deptId: string, taskId: string) => {
    setDepartmentTasksState((prev) => {
      const list = prev[deptId] || [];
      const nextState = { ...prev, [deptId]: list.filter((t) => t.id !== taskId) };
      localStorage.setItem('ft_dept_tasks', JSON.stringify(nextState));
      return nextState;
    });
  };

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
        departmentTasks,
        updateTaskStatus,
        addTask,
        deleteTask,
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
