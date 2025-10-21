<template>
  <div class="demo-block">
    <div style="margin-bottom: 16px;">
      <button @click="toggleAll" style="margin-right: 8px;">
        {{ isAllExpanded ? '收起所有' : '展开所有' }}
      </button>
      <button @click="toggleSecond" style="margin-right: 8px;">
        {{ activeNames.includes('2') ? '收起第二个' : '展开第二个' }}
      </button>
      <span>当前展开: {{ activeNames.join(', ') }}</span>
    </div>

    <FeiCollapse v-model="activeNames">
      <FeiCollapseItem name="1" title="面板一">
        <p>这个面板的展开状态可以通过外部按钮控制。</p>
        <p>v-model 实现了双向绑定。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="面板二">
        <p>通过修改 v-model 绑定的数组可以动态控制面板的展开状态。</p>
        <p>这在与外部状态管理结合时非常有用。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="3" title="面板三">
        <p>支持同时展开多个面板。</p>
        <p>在 accordion 模式下只能展开一个。</p>
      </FeiCollapseItem>
    </FeiCollapse>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FeiCollapse from "../../../src/components/Collapse/Collapse.vue";
import FeiCollapseItem from "../../../src/components/Collapse/CollapseItem.vue";

const activeNames = ref(['1'])

const isAllExpanded = computed(() => activeNames.value.length === 3)

const toggleAll = () => {
  if (isAllExpanded.value) {
    activeNames.value = []
  } else {
    activeNames.value = ['1', '2', '3']
  }
}

const toggleSecond = () => {
  const index = activeNames.value.indexOf('2')
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    activeNames.value.push('2')
  }
}
</script>
