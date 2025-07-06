<template>
  <div
    class="fei-input"
    :class="{
      [`fei-input--${type}`]: type,
      [`fei-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div class="fei-input__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="fei-input__wrapper">
        <!-- prefix slot -->
        <span class="fei-input__prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          class="fei-input__inner"
          v-bind:attrs
          :disabled="disabled"
          v-model="innerValue"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :form="form"
          :placeholder="placeholder"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        />
        <!-- suffix slot -->
        <span
          class="fei-input__suffix"
          v-if="$slots.suffix || showClear || showPassword"
          @mousedown.prevent="clear"
          @click="togglePasswordVisible"
        >
        <!-- 阻止了默认事件的发生 -->
          <slot name="suffix"></slot>
          <Icon icon="circle-xmark" v-if="showClear" class="fei-input__clear" />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="fei-input__password"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="fei-input__password"
          />
        </span>
      </div>
      <!-- append slot -->
      <div class="fei-input__append" v-if="$slots.append">
        <slot name="append"> </slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        class="fei-textarea__wrapper"
        v-bind:attrs
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :form="form"
        :placeholder="placeholder"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from "./types";
import { ref, watch, computed, useAttrs,nextTick,inject } from "vue";
import Icon from "../Icon/Icon.vue";
import type {Ref} from 'vue';
defineOptions({
  name: "FeiInput",
  size: "samll",
  modelValue: "",
  inheritAttrs: false,
});
import { formItemContextKey } from '../Form/types';

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",

});
const innerValue = ref(props.modelValue);

const emit = defineEmits<InputEmits>();
const handleInput = () => {
  emit("update:modelValue", innerValue.value ?? "");
  emit("input", innerValue.value ?? "");
};
const handleChange = () => {
  emit("change", innerValue.value ?? "");
};
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emit("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emit("blur", event);
  runValidate()
};
const attrs= useAttrs();
const isFocus = ref(false);
const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);
const showPasswordArea = computed(() => {
  return props.showPassword && !props.disabled && !!innerValue.value;
});
const togglePasswordVisible = () => {
  keepFocus();
  if (showClear.value) return;
  passwordVisible.value = !passwordVisible.value;
};

const clear = () => {
  if (!showClear.value) return;
  innerValue.value = "";
  emit("update:modelValue", "");
  emit("clear");
  emit("input", "");
  emit("change", "");
};
const passwordVisible = ref(false);
//标识图标的状态：是否显示

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value;
  }
);

const inputRef = ref() as Ref<HTMLInputElement>;
defineExpose({
   ref:inputRef,
})

const keepFocus = async() => {
  await nextTick();
  inputRef.value.focus();
}


const formItemContext = inject(formItemContextKey)
const runValidate = () => {
  formItemContext?.validate()
}

//自动进行校验数据正确性

</script>
