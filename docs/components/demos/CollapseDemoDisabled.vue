<template>
  <div class="demo-block">
    <FeiCollapse v-model="activeNames">
      <FeiCollapseItem name="1" title="正常面板">
        <p>这个面板可以正常点击展开和收起。</p>
        <p>用户可以自由操作这个面板。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="禁用面板" disabled>
        <p>这个面板被禁用了，无法点击展开。</p>
        <p>禁用状态通常用于某些条件下不可用的内容。</p>
      </FeiCollapseItem>
      <FeiCollapseItem name="3" title="另一个正常面板">
        <p>这个面板也是可以正常操作的。</p>
        <p>禁用状态不会影响其他面板的操作。</p>
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
