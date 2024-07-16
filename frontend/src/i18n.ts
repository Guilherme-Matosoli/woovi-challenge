import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from './locales/en/translation.json';
import ptTranslation from './locales/pt/translation.json';


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
    lng: "pt",
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
