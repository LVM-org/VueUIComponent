<template>
  <div class="flex w-full flex-col space-y-2">
    <div
      v-for="(option, index) in options"
      :key="index"
      @click.stop="selectedOption = option.key"
      class="flex w-full flex-row items-center justify-between cursor-pointer py-3 border-b-[1px] border-gray-300"
    >
      <div class="flex flex-row space-x-2 items-center justify-between w-full">
        <div class="flex flex-row space-x-2 items-center justify-start">
          <span class="h-full flex items-start justify-center">
            <span
              :class="`h-[11px] w-[11px] rounded-full ${
                selectedOption == option.key ? 'bg-primaryOrange' : 'bg-[#D9D9D9]'
              }`"
            >
            </span>
          </span>
          <roof-normal-text>
            {{ option.value }}
          </roof-normal-text>
        </div>
        <template v-if="option.isImage != true">
          <roof-normal-text
            custom-class="!font-semibold"
            color="!text-primaryOrange"
            v-if="!option.hasIcon"
          >
            {{ option.extras }}
          </roof-normal-text>
          <roof-icon
            :name="option.extras || ''"
            :custom-class="`${option.extras == 'mastercard' ? 'h-[16px]' : 'h-[11px]'}`"
            v-if="option.hasIcon && option.extras"
          />
        </template>

        <img v-else :src="`${option.extras}`" class="h-[25px] w-auto" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import RoofNormalText from "../RoofTypography/normalText.vue";
import { onMounted, ref, watch } from "vue";
import { SelectOption } from "@squareroof/logic";
import RoofIcon from "../RoofIcon";

export default {
  components: {
    RoofNormalText,
    RoofIcon,
  },
  props: {
    options: {
      type: Array as () => SelectOption[],
      required: true,
    },
    modelValue: {
      required: false,
    },
  },
  name: "RoofRadio",
  emits: ["update:modelValue"],
  setup(props: any, context: any) {
    const selectedOption = ref("");

    watch(selectedOption, () => {
      context.emit("update:modelValue", selectedOption.value);
    });

    onMounted(() => {
      if (props.modelValue) {
        selectedOption.value = props.modelValue;
      }
    });

    return {
      selectedOption,
    };
  },
};
</script>
