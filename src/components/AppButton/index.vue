<template>
  <button
    :class="`focus:outline-none shadow-sm rounded flex flex-row space-x-1 items-center justify-center ${padding} ${bgColor} ${textColor} ${customClass}`"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    bgColor: {
      type: String,
      default: "bg-primaryBlack",
    },
    textColor: {
      type: String,
      default: "text-white",
    },
    customClass: {
      type: String,
      default: "",
    },
    padding: {
      type: String,
      default: "py-2 px-4 ",
    },
  },
  name: "AppButton",
});
</script>
