<template>
  <div class="demo-block">
    <h4>可复制的代码块（默认）</h4>
    <FeiCode
      :copyable="true"
      :initialCode="copyableCode"
      code="javascript"
    />

    <h4>不可复制的代码块</h4>
    <FeiCode
      :copyable="false"
      :initialCode="copyableCode"
      coder="javascript"
    />
  </div>
</template>

<script setup>
import FeiCode from "../../../src/components/Code/Code.vue";

const copyableCode = `
const copyableExample = {
  name: 'Copyable Code',
  description: 'This code can be copied to clipboard',
  features: ['Copy functionality', 'Easy to use']
};`;
</script>
