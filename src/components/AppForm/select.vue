<template>
  <div :class="`flex flex-col space-y-2 ${defaultSize} `">
    <app-normal-text v-if="hasTitle">
      <slot name="title" />
    </app-normal-text>
    <div
      :class="`flex relative flex-row items-center space-x-1 justify-between w-full rounded ${customClass} bg-grayBackground ${paddings}`"
      :id="'container' + tabIndex"
      @focus="
        showOption = true;
        isFocused = true;
        ShowSelectModal = true;
      "
      @blur="
        isFocused = false;
        showOption = false;
      "
      :tabindex="tabIndex"
      @click="ShowSelectModal = true"
    >
      <input
        ref="select"
        :value="withKey ? valueData : textValue"
        :placeholder="placeholder"
        disabled
        :class="` text-lightBlack flex-grow bg-transparent placeholder-primaryGray focus input w-full focus:outline-none  focus:border-primaryOrange`"
      />
      <app-icon
        @click="
          showOption = true;
          isFocused = true;
        "
        name="show-more"
        custom-class="md:h-[7px] h-[6px] cursor-pointer"
      />
    </div>
  </div>
  <app-modal
    :canClose="true"
    custom-class="mdlg:!hidden"
    :close="
      () => {
        ShowSelectModal = false;
      }
    "
    v-if="ShowSelectModal"
  >
    <div
      @click.stop="true"
      class="rounded-t-2xl flex flex-col space-y-2 bg-white w-full absolute overflow-y-auto h-[50%] bottom-0 left-0 pb-3 px-3 lg:!text-sm mdlg:!text-[12px] text-xs"
    >
      <div
        class="flex items-center justify-center sticky top-0 bg-white w-full pt-3"
      >
        <span class="bg-gray-700 rounded-full w-[30px] h-[4px]"></span>
      </div>
      <div class="w-full pt-1 sticky top-[18px] bg-white" v-if="autoComplete">
        <app-text-field placeholder="Search" v-model="searchValue">
        </app-text-field>
      </div>
      <app-radio
        :options="selectOptions"
        v-model="selectedKey"
        @click.stop="true"
      />
    </div>
  </app-modal>
</template>

<script lang="ts">
import { Logic } from "../../composable";
import { SelectOption } from "../../types";
import { capitalize, defineComponent, onMounted, ref, watch } from "vue";
import AppIcon from "../AppIcon/index.vue";
import AppModal from "../AppModal";
import AppNormalText from "../AppTypography/normalText.vue";
import AppTextField from "./textField.vue";
import AppRadio from "./radio.vue";

export default defineComponent({
  name: "AppSelect",
  components: {
    AppIcon,
    AppNormalText,
    AppModal,
    AppTextField,
    AppRadio,
  },
  props: {
    withKey: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array as () => SelectOption[],
    },
    paddings: {
      type: String,
      default: "py-4 px-3",
    },
    padding: {
      type: String,
      default: "py-4 px-3",
    },
    customClass: {
      type: String,
      default: "",
    },
    defaultValues: {
      required: false,
      default: [],
    },
    modelValue: {
      type: String || Array,
      default: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    hasTitle: {
      type: Boolean,
      default: false,
    },
    defaultSize: {
      type: String,
      default: "w-full",
    },
    autoComplete: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "OnOptionSelected", "OnSearch"],
  setup(props: any, context: any) {
    const isFocused = ref(false);
    const showOption = ref(false);

    const tabIndex = Math.random();

    const ShowSelectModal = ref(false);

    const OptionRef = ref<SelectOption[]>([]);

    const searchResult = ref<SelectOption[]>([]);

    const selectedKey = ref();

    const valueData = ref("");

    const textValue = ref("");

    const searchValue = ref("");

    const selectOptions = ref<any[]>([]);

    const prepareSelectOptions = () => {
      selectOptions.value.length = 0;

      if (Array.isArray(searchResult.value)) {
        searchResult.value.forEach((item: any) => {
          selectOptions.value.push({
            key: item.key,
            value: `${item.value}${props.withKey ? ` (${item.key})` : ""}`,
            hasIcon: item.hasIcon ? item.hasIcon : false,
            extras: item.extras ? item.extras : "",
            isImage: item.isImage ? item.isImage : false,
          });
        });
      }
    };

    watch(selectedKey, () => {
      if (selectedKey.value != 0) {
        const selectedOption = searchResult.value.filter((eachItem: any) => {
          return eachItem.key == selectedKey.value;
        });
        selectValue(selectedOption[0]);
        ShowSelectModal.value = false;
      }
    });

    const selectedItems = ref<any>([]);

    watch(props, () => {
      if (props.options) {
        OptionRef.value = props.options;
      }
      prepareSelectOptions();
    });

    onMounted(() => {
      if (props.defaultValues.length > 0) {
        selectedItems.value = props.defaultValues;
      }
      if (props.options) {
        OptionRef.value = props.options;
        searchResult.value = props.options;
      }

      if (props.modelValue) {
        const selectedOption = searchResult.value.filter((eachItem: any) => {
          return eachItem.key == props.modelValue;
        });
        selectedKey.value = props.modelValue;
        if (selectedOption.length > 0) {
          selectValue(selectedOption[0]);
        }
      }
      prepareSelectOptions();
    });

    const itemIsSelected = (inputKey: string) => {
      const item = selectedItems.value.filter((key: any) => {
        return key == inputKey;
      });

      return item.length > 0;
    };

    const selectValue = (option: any) => {
      if (props.autoComplete) {
        context.emit("OnOptionSelected", option.key);

        isFocused.value = false;
        showOption.value = false;

        if (props.withKey) {
          valueData.value = option.key;
        } else {
          valueData.value = option.value;
          textValue.value = option.value;
        }

        context.emit("update:modelValue", option.key);

        document.getElementById("container" + tabIndex)?.blur();
        return;
      }
      if (props.isMultiple) {
        if (itemIsSelected(option.key)) {
          selectedItems.value = selectedItems.value.filter((key: any) => {
            return key != option.key;
          });

          return;
        }
        selectedItems.value.push(option.key);
        context.emit("update:modelValue", selectedItems.value);
        context.emit("OnOptionSelected", option.key);
      } else {
        context.emit("update:modelValue", option.key);
        context.emit("OnOptionSelected", option.key);
        if (props.withKey) {
          valueData.value = option.key;
        } else {
          valueData.value = option.value;
          textValue.value = option.value;
        }
        isFocused.value = false;
        showOption.value = false;

        document.getElementById("container" + tabIndex)?.blur();
      }
    };

    const getSelectedOption = (keyValue: any) => {
      const option = searchResult.value.filter((eachItem: any) => {
        return eachItem.key == keyValue;
      });

      return option[0].value;
    };

    const searchOption = () => {
      if (props.autoComplete) {
        searchResult.value = Logic.Common.searchArray(
          OptionRef.value,
          capitalize(searchValue.value)
        );
      }
    };

    watch(searchValue, () => {
      searchOption();
    });

    watch(OptionRef, () => {
      searchOption();
    });

    watch(searchResult, () => {
      prepareSelectOptions();
    });

    return {
      showOption,
      valueData,
      isFocused,
      selectValue,
      tabIndex,
      textValue,
      itemIsSelected,
      selectedItems,
      getSelectedOption,
      ShowSelectModal,
      selectOptions,
      selectedKey,
      searchValue,
      searchResult,
    };
  },
});
</script>
