<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  iconClass: {
    type: String,
    require: false,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
    default: "1em",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.iconClass}`);
</script>

<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="'width:' + size + ';height:' + size"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  outline: none;
  fill: currentcolor;
}
</style>
