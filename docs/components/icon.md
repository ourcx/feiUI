# Icon 图标

基于 FontAwesome 的图标组件，提供丰富的图标选择和灵活的样式配置。

## 基础用法

通过 `icon` 属性指定图标名称,具体的填写值可以查看[图标库](https://fontawesome.com/icons?d=gallery&p=2&m=free)来确定

<icon-demo-basic />

## 图标类型

使用 `type` 属性来定义图标的类型。

<icon-demo-type />

## 自定义颜色

使用 `color` 属性来自定义图标颜色。

<icon-demo-color />

## 图标大小

使用 `size` 属性来控制图标尺寸。

<icon-demo-size />

## 图标状态

图标支持激活状态和禁用状态。

<icon-demo-state />

## 动画效果

图标支持旋转和脉冲动画效果。

<icon-demo-animation />

## 翻转效果

图标支持水平和垂直翻转。

<icon-demo-flip />

## 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| icon | 图标名称 | string \| object \| string[] | — | — |
| type | 图标类型 | string | `primary` \| `success` \| `warning` \| `danger` \| `info` | — |
| color | 自定义颜色 | string | — | — |
| size | 图标大小 | string | `xs` \| `sm` \| `lg` \| `xl` \| `2xl` 等 | — |
| active | 是否激活状态 | boolean | — | false |
| disabled | 是否禁用状态 | boolean | — | false |
| spin | 是否旋转动画 | boolean | — | false |
| pulse | 是否脉冲动画 | boolean | — | false |
| flip | 翻转方向 | string | `horizontal` \| `vertical` \| `both` | — |
| rotation | 旋转角度 | number | 90, 180, 270 | — |
| border | 是否显示边框 | boolean | — | false |
| pull | 浮动方向 | string | `left` \| `right` | — |

## 示例代码

```vue
<template>
  <div>
    <!-- 基础图标 -->
    <FeiIcon icon="user" />
    <FeiIcon icon="home" />
    <FeiIcon icon="cog" />

    <!-- 不同类型 -->
    <FeiIcon icon="check" type="success" />
    <FeiIcon icon="exclamation" type="warning" />
    <FeiIcon icon="times" type="danger" />
    <FeiIcon icon="info" type="info" />

    <!-- 自定义颜色 -->
    <FeiIcon icon="star" color="#ffd700" />
    <FeiIcon icon="heart" color="#ff4757" />

    <!-- 不同大小 -->
    <FeiIcon icon="bell" size="sm" />
    <FeiIcon icon="bell" size="lg" />
    <FeiIcon icon="bell" size="2xl" />

    <!-- 状态控制 -->
    <FeiIcon icon="bookmark" :active="true" />
    <FeiIcon icon="bookmark" :disabled="true" />

    <!-- 动画效果 -->
    <FeiIcon icon="spinner" spin />
    <FeiIcon icon="sync" pulse />

    <!-- 翻转效果 -->
    <FeiIcon icon="arrow-right" flip="horizontal" />
    <FeiIcon icon="arrow-down" flip="vertical" />

    <!-- 旋转角度 -->
    <FeiIcon icon="arrow-up" :rotation="90" />
    <FeiIcon icon="arrow-up" :rotation="180" />
    <FeiIcon icon="arrow-up" :rotation="270" />
  </div>
</template>

<script setup>
import FeiIcon from "../../src/components/Icon/Icon.vue";
</script>
```