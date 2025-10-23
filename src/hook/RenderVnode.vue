<template>
  <component :is="renderVnode" v-if="typeof vNode !== `string`" />
  <span v-else>{{ vNode }}</span>
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue'

interface RenderVnodeProps {
  vNode?: string | VNode | (() => VNode)
}

const props = defineProps<RenderVnodeProps>()

const renderVnode = computed(() => {
  if (typeof props.vNode === 'function') {
    return props.vNode()
  }
  return props.vNode
})
</script>
