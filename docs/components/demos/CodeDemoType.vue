<template>
  <div class="demo-block">
    <h4>Primary 类型</h4>
    <FeiCode
      type="primary"
      :initialCode="primaryCode"
      code="javascript"
    />

    <h4>Info 类型</h4>
    <FeiCode
      type="info"
      :initialCode="infoCode"
      code="javascript"
    />
  </div>
</template>

<script setup>
import FeiCode from "../../../src/components/Code/Code.vue";

const primaryCode = `// Primary 类型的代码块
const primaryFunction = () => {
  console.log('This is a primary code block');
  return 'primary';
};`;

const infoCode = `// Info 类型的代码块
const infoFunction = () => {
  console.log('This is an info code block');
  return 'info';
};`;
</script>
