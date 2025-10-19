# FeiButton 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

<button-demo-basic />

## 按钮类型

使用 `type` 属性来定义按钮的类型。

<button-demo-type />

## 按钮尺寸

使用 `size` 属性来定义按钮的尺寸。

<button-demo-size />

## 禁用状态

使用 `disabled` 属性来定义按钮是否禁用。

<button-demo-disabled />

## 加载状态

使用 `loading` 属性来显示加载中的状态。

<button-demo-loading />

## 其他样式

圆形按钮、圆角按钮、朴素按钮等样式。

<button-demo-other />

## 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| type | 按钮类型 | string | `primary` \| `success` \| `info` \| `warning` \| `danger` | — |
| size | 按钮尺寸 | string | `large` \| `small` \| `mini` \| `''` | — |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否加载中 | boolean | — | false |
| plain | 是否朴素按钮 | boolean | — | false |
| round | 是否圆角按钮 | boolean | — | false |
| circle | 是否圆形按钮 | boolean | — | false |
| native-type | 原生 type 属性 | string | `button` \| `submit` \| `reset` | button |
| autofocus | 是否自动聚焦 | boolean | — | false |
| icon | 图标类名 | string | — | — |
| width | 按钮宽度 | string \| number | — | — |

## 示例代码

```vue
<template>
  <div>
    <!-- 基础按钮 -->
    <Fei-Button>默认按钮</Fei-Button>
    
    <!-- 不同类型 -->
    <Fei-Button type="primary">主要按钮</Fei-Button>
    <Fei-Button type="success">成功按钮</Fei-Button>
    <Fei-Button type="info">信息按钮</Fei-Button>
    <Fei-Button type="warning">警告按钮</Fei-Button>
    <Fei-Button type="danger">危险按钮</Fei-Button>
    
    <!-- 不同尺寸 -->
    <Fei-Button size="large">大型按钮</Fei-Button>
    <Fei-Button size="small">小型按钮</Fei-Button>
    <Fei-Button size="mini">迷你按钮</Fei-Button>
    
    <!-- 禁用状态 -->
    <Fei-Button disabled>禁用按钮</Fei-Button>
    
    <!-- 加载状态 -->
    <Fei-Button loading>加载中</Fei-Button>
    
    <!-- 其他样式 -->
    <Fei-Button plain>朴素按钮</Fei-Button>
    <Fei-Button round>圆角按钮</Fei-Button>
    <Fei-Button circle>圆形按钮</Fei-Button>
  </div>
</template>

<script setup>
import FeiButton from "../../src/components/Button/Button.vue";
</script>
```