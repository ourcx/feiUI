<template>
  <div class="demo-block">
    <h4>GitHub Light</h4>
    <FeiCode
      theme="github-light"
      :initialCode="themeCode"
      code="javascript"
    />

    <h4>GitHub Dark</h4>
    <FeiCode
      theme="github-dark"
      :initialCode="themeCode"
      code="javascript"
    />

    <h4>Vitesse Light</h4>
    <FeiCode
      theme="vitesse-light"
      :initialCode="themeCode"
      code="javascript"
    />

    <h4>Vitesse Dark</h4>
    <FeiCode
      theme="vitesse-dark"
      code="javascript"
      :initialCode="themeCode"
    />
  </div>
</template>

<script setup>
import FeiCode from "../../../src/components/Code/Code.vue";

const themeCode = `// 不同主题的代码示例
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const doubled = computed(() => count.value * 2);

  const increment = () => count.value++;
  const decrement = () => count.value--;

  return {
    count,
    doubled,
    increment,
    decrement
  };
}`;
</script>
