<template>
  <div class="demo-block">
    <h4>默认宽度</h4>
    <FeiCode
      :initialCode="widthCode"
      code="javascript"
    />

    <h4>自定义宽度 (400px)</h4>
    <FeiCode
      :width="400"
      :initialCode="widthCode"
      code="javascript"
    />

    <h4>自定义宽度 (600px)</h4>
    <FeiCode
      :width="600"
      :initialCode="widthCode"
      code="javascript"
    />
  </div>
</template>

<script setup>
import FeiCode from "../../../src/components/Code/Code.vue";

const widthCode = `// 这是一个需要较宽显示区域的代码示例
const veryLongVariableName = {
  extremelyLongPropertyNameOne: 'This is a very long string value that requires more horizontal space',
  extremelyLongPropertyNameTwo: function(veryLongParameterNameOne, veryLongParameterNameTwo) {
    return veryLongParameterNameOne + veryLongParameterNameTwo;
  },
  extremelyLongPropertyNameThree: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
};`;
</script>
