<template>
  <div class="flex flex-row items-center justify-center space-x-2 z-40 w-full">
    <span
      v-for="(eachValue, index) in numberOfInput"
      :key="index + '' + uniqueKey"
      :class="`bg-grayBackground rounded ${
        inputHasContent('' + uniqueKey + index) ? 'border-[1px] border-primaryOrange' : ''
      }`"
    >
      <input
        :id="'' + uniqueKey + index"
        :class="`md:w-[53px] md:h-[53px] w-[41px] h-[41px] text-lg text-center text-lightBlack flex-grow bg-transparent placeholder-primaryGray focus input focus:outline-none `"
        :disabled="true"
        :type="type"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "RoofOtpInput",
  props: {
    numberOfInput: {
      type: Number,
      required: false,
      default: 4,
    },
    otpValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "password",
    },
  },
  emits: ["OnFilled"],
  setup(props: any, context) {
    const uniqueKey = Math.floor(Math.random() * 100);

    const setInputValue = (id: string, value: string) => {
      if (document.getElementById(id)) {
        (document.getElementById(id) as HTMLInputElement).value = value;
      }
    };

    const fillOtpInput = () => {
      // clear all input values

      for (let index = 0; index < props.numberOfInput; index++) {
        const inputId = "" + uniqueKey + index;
        setInputValue(inputId, "");
      }

      // set string value
      let finalOtp =
        props.otpValue.length > props.numberOfInput
          ? props.otpValue.substring(0, props.numberOfInput)
          : props.otpValue;

      const otpArray = finalOtp.split("");

      if (otpArray.length <= props.numberOfInput) {
        for (let index = 0; index < otpArray.length; index++) {
          const inputId = "" + uniqueKey + index;
          const otpValue = otpArray[index];
          setInputValue(inputId, otpValue);
          if (otpArray.length == props.numberOfInput) {
            context.emit("OnFilled", props.otpValue);
          }
        }
      }
    };

    watch(props, () => {
      fillOtpInput();
    });

    onMounted(() => {
      fillOtpInput();
    });

    const inputHasContent = (id: string) => {
      const inputValue = (document.getElementById(id) as HTMLInputElement)?.value;

      return inputValue ? inputValue.length > 0 : false;
    };

    return {
      uniqueKey,
      inputHasContent,
    };
  },
});
</script>
