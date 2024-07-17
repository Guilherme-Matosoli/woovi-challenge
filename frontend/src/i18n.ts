import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';

const currentLanguage = localStorage.getItem("lng") || "pt";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: ptTranslation
      },
      en: {
        translation: enTranslation
      },
    },
    lng: currentLanguage,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
