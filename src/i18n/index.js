import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/en.json";
import koTranslation from "./locales/ko/ko.json";
import idTranslation from "./locales/id/id.json";
import esTranslation from "./locales/es/es.json";

const resources = {
  en: { translation: enTranslation },
  ko: { translation: koTranslation },
  id: { translation: idTranslation },
  es: { translation: esTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
