import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../Context';
import { GrLanguage } from 'react-icons/gr';
import './LanguageToggleBtn.css';

const LanguageToggleBtn = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  };

  const ariaLabel = currentLanguage === 'en' 
    ? t('language.switchToArabic', 'Switch to Arabic') 
    : t('language.switchToEnglish', 'Switch to English');

  return (
    <div className="languageToggle">
      <button
        onClick={toggleLanguage}
        className="toggleButton"
        aria-label={ariaLabel}
      >
        <GrLanguage />
      </button>
    </div>
  );
};

export default LanguageToggleBtn;
