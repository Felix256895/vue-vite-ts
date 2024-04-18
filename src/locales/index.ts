import { createI18n } from "vue-i18n";
import { useAppStoreHook } from "@/store";
import en from "./lang/en";
import zhCn from "./lang/zh-cn";

const appStore = useAppStoreHook();

const messages = {
  "zh-cn": {
    ...zhCn,
  },
  en: {
    ...en,
  },
};

const i18n = createI18n({
  messages,
  legacy: false,
  locale: appStore.language,
  globalInjection: true,
});

export default i18n;
