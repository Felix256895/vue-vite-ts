import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { store } from "@/store";

export const useAppStore = defineStore("app", () => {
  const language = useStorage("language", "en");

  const locale = computed(() => {
    if (language?.value === "en") {
      return en;
    } else {
      return zhCn;
    }
  });

  function changeLanguage(val: string) {
    language.value = val;
  }

  return {
    language,
    locale,
    changeLanguage,
  };
});

export function useAppStoreHook() {
  return useAppStore(store);
}
