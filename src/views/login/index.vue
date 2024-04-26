<template>
  <div class="login">
    <language-select />
    <el-switch
      v-model="isDark"
      @change="toggleDark"
      :active-icon="IconEpMoon"
      :inactive-icon="IconEpSunny"
      inline-prompt
      active-color="var(--el-fill-color-dark)"
      inactive-color="var(--el-color-primary)"
    />
    <div class="home">Home {{ $t("login.username") }}</div>
  </div>
</template>
<script setup lang="ts">
import IconEpSunny from "~icons/ep/sunny";
import IconEpMoon from "~icons/ep/moon";
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = () => useToggle(isDark);
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}
</style>
