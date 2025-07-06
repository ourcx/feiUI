<template>
  <div
    class="fei-Switch"
    :class="{
      [`fei-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      type="checkbox"
      class="fei-switch__input"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
    />
    <div class="fei-switch__core" >
      <div class="fei-switch__core-inner">
      <span v-if="activeText||inactiveText" class="fei-switch__core-inner-text">
      {{ checked ? activeText : inactiveText }}
      </span>
      </div>
      <div class="fei-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed,onMounted } from "vue";
import type { SwitchProps, SwitchEmits } from "./types";
import { size } from "lodash-es";

defineOptions({
  name: "FeiSwitch",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();

const innerValue = ref(props.modelValue);
const input = ref<HTMLInputElement>();
//是否被选中
const checked = computed(() => innerValue.value===props.activeValue);
const switchValue = ()=>{
  if(props.disabled)return
  const newValue = !checked.value
  innerValue.value = newValue
  emits('update:modelValue', innerValue.value)
  emits('change', newValue)
}

onMounted(()=>{
  input.value!.checked = innerValue.value
})

watch(checked, (value)=>{
  input.value!.checked = value
})

watch(()=>props.modelValue, (value)=>{
  innerValue.value = value
})
</script>
