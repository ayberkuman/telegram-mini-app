import React, { createContext, useContext, useState, useCallback } from "react";
import i18n from "@/i18n/i18n";

interface LanguageContextType {
  language: string;
  changeLanguage: (lng: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = useCallback((lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
