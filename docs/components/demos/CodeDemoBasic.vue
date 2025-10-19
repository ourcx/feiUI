<template>
  <div class="demo-block">
    <FeiCode
      :initialCode="basicCode"
      code="javascript"
    />
  </div>
</template>

<script setup>
import FeiCode from "../../../src/components/Code/Code.vue";

const basicCode = `// 基础代码示例
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;
</script>
