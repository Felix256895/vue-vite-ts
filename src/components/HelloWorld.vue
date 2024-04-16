<script setup lang="ts">
import { useCounterStore } from '@/store/counter'

const counterStore = useCounterStore()
</script>

<template>
  <el-card>
    <template #header>子组件HelloWorld.vue</template>
    <el-form>
      <el-form-item label="数字：">{{ counterStore.count }}</el-form-item>
      <el-form-item label="加倍：">{{ counterStore.doubleCount }}</el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
