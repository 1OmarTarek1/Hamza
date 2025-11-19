import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

// Get saved language from localStorage or default to Arabic
const savedLanguage = localStorage.getItem('i18nextLng') || 'ar';

// Set document direction based on language
if (savedLanguage === 'ar') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';
} else {
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = 'en';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, // Use saved language or default to Arabic
    fallbackLng: 'ar', // Fallback to Arabic if translation is missing
    supportedLngs: ['ar', 'en'], // Supported languages
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  if (lng === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }
});

export default i18n;
