<template>
  <div class="flex w-full flex-col space-y-2">
    <div
      @click="selected ? (selected = false) : (selected = true)"
      class="flex w-full flex-row space-x-2 items-center cursor-pointer"
    >
      <roof-icon
        :name="`${selected ? 'checkbox-active' : 'checkbox'}`"
        :customClass="`h-[17px]`"
      />
      <div class="flex flex-row space-x-2 items-center">
        <slot name="label" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, watch } from "vue";
import RoofIcon from "../RoofIcon/index.vue";

export default {
  components: {
    RoofIcon,
  },
  name: "RoofCheckbox",
  emits: ["update:modelValue"],
  setup(props: any, context: any) {
    const selected = ref(false);

    watch(selected, () => {
      context.emit("update:modelValue", selected.value);
    });

    return {
      selected,
    };
  },
};
</script>
