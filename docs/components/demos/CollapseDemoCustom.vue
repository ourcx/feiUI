<template>
  <div class="demo-block">
    <FeiCollapse v-model="activeNames">
      <FeiCollapseItem name="1">
        <template #title>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--fei-color-primary); font-weight: bold;">自定义标题</span>
            <span style="background: var(--fei-color-primary-light-13); padding: 2px 6px; border-radius: 4px; font-size: 12px;">
              新功能
            </span>
          </div>
        </template>
        <p>使用 title 插槽可以完全自定义标题区域的内容和样式。</p>
        <p>可以在标题中添加图标、徽章等元素。</p>
      </FeiCollapseItem>

      <FeiCollapseItem name="2">
        <template #title>
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <span>带图标的标题</span>
            <span style="color: var(--fei-color-warning);">⚠️ 重要</span>
          </div>
        </template>
        <p>标题区域可以包含任意自定义内容。</p>
        <p>这提供了极大的灵活性来满足不同的设计需求。</p>
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
