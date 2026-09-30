import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isAmharic: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ft_language');
    return (saved === 'en' || saved === 'am') ? saved : 'am';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ft_language', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'am' ? 'en' : 'am');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isAmharic: language === 'am',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

