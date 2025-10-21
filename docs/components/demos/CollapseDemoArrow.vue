<template>
  <div class="demo-block">
    <FeiCollapse v-model="activeNames">
      <FeiCollapseItem name="1" title="显示箭头（默认）" :arrow="true">
        <p>这个面板显示展开箭头，这是默认行为。</p>
        <p>用户可以通过箭头直观地识别面板的可折叠性。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="隐藏箭头" :arrow="false">
        <p>这个面板隐藏了展开箭头。</p>
        <p>通过设置 arrow 属性为 false 来隐藏箭头。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="3" title="另一个显示箭头的面板">
        <p>箭头显示状态可以针对每个面板单独设置。</p>
        <p>不影响其他面板的箭头显示。</p>
      </FeiCollapseItem>
    </FeiCollapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeiCollapse from "../../../src/components/Collapse/Collapse.vue";
import FeiCollapseItem from "../../../src/components/Collapse/CollapseItem.vue";

const activeNames = ref(['1'])
</script>
