# Collapse 折叠面板

通过折叠面板收纳内容区域。

## 基础用法

可同时展开多个面板，面板之间不影响。

<collapse-demo-basic />

## 手风琴模式

每次只能展开一个面板。

<collapse-demo-accordion />

## 禁用状态

设置禁用状态的面板。

<collapse-demo-disabled />

## 自定义箭头

控制是否显示展开箭头。

<collapse-demo-arrow />

## 自定义标题

通过插槽自定义标题内容。

<collapse-demo-custom />

## 动态控制

通过 v-model 动态控制展开状态。

<collapse-demo-dynamic />

## API

### Collapse 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| modelValue | 当前激活的面板 | `(string \| number)[]` | — |
| accordion | 是否手风琴模式 | `boolean` | `false` |

### Collapse 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| change | 当前激活面板改变时触发 | `(value: (string \| number)[])` |
| update:modelValue | 当前激活面板改变时触发 | `(value: (string \| number)[])` |

### CollapseItem 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 唯一标识符 | `string \| number` | — |
| title | 面板标题 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| arrow | 是否显示箭头 | `boolean` | `true` |

### CollapseItem 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 面板内容 |
| title | 自定义标题内容 |

## 示例代码

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <FeiCollapse v-model="activeNames">
      <FeiCollapseItem name="1" title="一致性 Consistency">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="反馈 Feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </FeiCollapseItem>
      <FeiCollapseItem name="3" title="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </FeiCollapseItem>
    </FeiCollapse>

    <!-- 手风琴模式 -->
    <FeiCollapse v-model="accordionActive" accordion>
      <FeiCollapseItem name="1" title="手风琴模式一">
        每次只能展开一个面板
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="手风琴模式二">
        展开一个面板时会自动收起其他面板
      </FeiCollapseItem>
    </FeiCollapse>

    <!-- 禁用状态 -->
    <FeiCollapse v-model="disabledActive">
      <FeiCollapseItem name="1" title="正常面板">
        这个面板可以正常操作
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="禁用面板" disabled>
        这个面板被禁用了
      </FeiCollapseItem>
    </FeiCollapse>

    <!-- 自定义箭头 -->
    <FeiCollapse v-model="arrowActive">
      <FeiCollapseItem name="1" title="显示箭头" :arrow="true">
        这个面板显示箭头
      </FeiCollapseItem>
      <FeiCollapseItem name="2" title="隐藏箭头" :arrow="false">
        这个面板隐藏了箭头
      </FeiCollapseItem>
    </FeiCollapse>

    <!-- 自定义标题 -->
    <FeiCollapse v-model="customActive">
      <FeiCollapseItem name="1">
        <template #title>
          <span style="color: var(--fei-color-primary); font-weight: bold;">
            自定义标题样式
          </span>
        </template>
        使用插槽自定义标题内容
      </FeiCollapseItem>
    </FeiCollapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeiCollapse from "../../src/components/Collapse/Collapse.vue";
import FeiCollapseItem from "../../src/components/Collapse/CollapseItem.vue";

const activeNames = ref(['1'])
const accordionActive = ref('1')
const disabledActive = ref(['1'])
const arrowActive = ref(['1'])
const customActive = ref(['1'])
</script>