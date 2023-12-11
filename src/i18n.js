import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_translate from "./assets/locales/en.json";
import zh_translation from "./assets/locales/zh.json";

i18n.use(initReactI18next).init({
  // fallbackLng: 'zh',
  // lng: 'zh',
  fallbackLng: localStorage.getItem("lang")
    ? localStorage.getItem("lang")
    : "zh_CN",
  resources: {
    en: {
      translation: en_translate,
    },
    zh_CN: {
      translation: zh_translation,
    },
  },
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});
export default i18n;
