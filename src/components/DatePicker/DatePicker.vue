<script setup lang="ts">
import { computed,ref } from 'vue'
// 1. 引入外部库的组件和样式
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type {DatePickerProps,DatePickerEmits  } from './types'

const props = withDefaults(defineProps<DatePickerProps>(), {
  type: 'primary',
  range: false,
  format: 'yyyy-MM-dd',
  disabled: false,
})

const emit = defineEmits<DatePickerEmits>()

const model = ref('')

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleClear = () => {
  emit('clear')
}

const wrapperClasses = computed(() => [
  'datepicker-wrapper',
  `datepicker-wrapper--${props.type}`,
])
</script>



<template>
  <div :class="wrapperClasses">
    <VueDatePicker
      v-model="model"
      :range="props.range"
      :format="props.format"
      :disabled="props.disabled"
      :enable-time-picker="false"
      auto-apply
      @focus="handleFocus"
      @cleared="handleClear"
    />
  </div>
</template>
