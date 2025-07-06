<template>
  <form class="fei-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import type { FormProps } from './types'
import { formContextKey } from './types';
import { provide } from 'vue';
defineOptions({
  name: 'FeiForm'
})

const props = defineProps<FormProps>()
provide(formContextKey, props)
</script>
