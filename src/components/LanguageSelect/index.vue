<template>
  <el-dropdown trigger="click" @command="handleChange">
    <div>
      <svg-icon icon-class="language" :size="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :command="item.value"
          :disabled="appStore.language === item.value"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/store/modules/app";
import { LanguageEnum } from "@/enums/LanguageEnum";

defineProps({
  size: {
    type: String,
    require: false,
  },
});

const appStore = useAppStore();
const { locale, t } = useI18n();
const langOptions = [
  { label: "中文", value: LanguageEnum.ZH_CN },
  { label: "English", value: LanguageEnum.EN },
];
function handleChange(val: string) {
  locale.value = val;
  appStore.changeLanguage(val);
  ElMessage.success(t("language.success"));
}
</script>

<style></style>
