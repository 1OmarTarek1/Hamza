import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../Context';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  
  const languages = [
    { code: 'ar', name: t('language.ar', 'العربية') },
    { code: 'en', name: t('language.en', 'English') }
  ];

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      {languages.map((lng) => (
        <button
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentLanguage === lng.code
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label={t('language.switch', { language: lng.name })}
        >
          {lng.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
