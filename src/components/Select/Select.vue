<template>
  <div
    class="fei-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    style="color: black"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
      @click-outside="contorlDropdown(false)"
    >
      <!-- 使用manual有一些问题 -->
      <Input
        type="text"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceHolder"
        :readonly="!filterable || !isDropdownShow"
        ref="inputRef"
        @input="onFilter"
      >
        <template #suffix>
          <div
            @click="onClear"
            style="display: inline-flex; align-items: center"
            v-if="showClearIcon"
          >
            <Icon
              icon="circle-xmark"
              class="header-angle"
              :class="iconClasses"
              @mousedown.prevent="NOOP"
            ></Icon>
          </div>
          <Icon icon="angle-down" class="header-angle" :class="iconClasses" v-else></Icon>
        </template>
      </Input>
      <template #content>
        <ul class="fei-select__menu">
          <template v-for="(option, index) in filteredOptions" :key="index">
            <li
              class="fei-select__item"
              :class="{
                'is-disabled': option.disabled,
                'is-selected': states.selectedOption?.value === option.value,
              }"
              :id="`select-item-${option.value}`"
              @click.stop="itemSelect(option)"
            >
              <RenderVnode
                :v-node="renderLabel ? renderLabel(option) : option.label"
              ></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { isFunction } from "lodash-es";
import { ref, reactive, computed, watch } from "vue";
import type { Ref } from "vue";
import type { SelectProps, SelectionOption, SelectEmits, SelectStates } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";
import Icon from "../Icon/Icon.vue";
import RenderVnode from "../../hook/RenderVnode";

const NOOP = () => {};
const iconClasses = computed(
  () => `header-angle ${isDropdownShow.value ? "is-active" : ""}`
);
const findOption = (value: any) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};
defineOptions({
  name: "FeiSelect",
});

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: "",
  filterable: false,
  options: () => [],
});
const initialOption = findOption(props.modelValue);
const emit = defineEmits<SelectEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
const isDropdownShow = ref(false);
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
});
const popperOptions: any = {
  //ppoper的配置
  modifiers: [
    {
      name: "offset",
      Options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};
const filteredOptions = ref(props.options);
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions;
  }
);

const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) {
    return;
  }
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (props.remoteMethod && isFunction(props.remoteMethod) && props.remote) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.error(e);
      filteredOptions.value = [];
      states.loading = false;
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    );
  }
};
const onFilter = () => {
  generateFilterOptions(states.inputValue);
};
const filteredPlaceHolder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder;
});
const contorlDropdown = (show: boolean) => {
  //控制打开或者关闭
  if (show) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = "";
      emit("update:modelValue", states.selectedOption.value);
      emit("change", states.selectedOption.value);
      filteredOptions.value = [...props.options];
    }
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : "";
    }
  }
  isDropdownShow.value = show;
  emit("visible-change", show);
};
const showClearIcon = computed(() => {
  return (
    props.clearable &&
    states.selectedOption &&
    states.selectedOption &&
    states.inputValue.trim() !== ""
  );
});

const onClear = () => {
  console.log(props.filterable);
  console.log("clear");
  states.selectedOption = null;
  states.inputValue = "";
  emit("clear");
  emit("change", "");
  emit("update:modelValue", "");
};
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    contorlDropdown(false);
  } else {
    contorlDropdown(true);
  }
};

//点击对应打开关闭的功能，需要研究一下下
const itemSelect = (e: SelectionOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emit("change", e.value);
  emit("update:modelValue", e.value);
  contorlDropdown(false);
  //关闭
  inputRef.value.ref.focus();
};
</script>
