<template>
  <div class="demo-block">
    <FeiCollapse v-model="activeName" accordion>
      <FeiCollapseItem name="1" title="手风琴模式一">
        <p>在 accordion 模式下，每次只能展开一个面板。</p>
        <p>展开一个面板时，其他已展开的面板会自动收起。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="手风琴模式二">
        <p>这种模式适合内容相互排斥的场景。</p>
        <p>比如设置选项的分类展示。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="3" title="手风琴模式三">
        <p>通过设置 accordion 属性为 true 来启用手风琴模式。</p>
        <p>此时 v-model 应该绑定一个字符串或数字，而不是数组。</p>
      </FeiCollapseItem>
    </FeiCollapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeiCollapse from "../../../src/components/Collapse/Collapse.vue";
import FeiCollapseItem from "../../../src/components/Collapse/CollapseItem.vue";

const activeName = ref('1')
</script>
