# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

卡片包含标题、内容和操作。

<card-demo-basic />

## 不同类型

Card 组件提供了不同的类型，分别为 primary、success、warning、danger 和 info。

<card-demo-type />

## 带图片的卡片

可配置图片插槽。

<card-demo-image />

## 带底部操作的卡片

通过 footer 插槽添加底部操作区域。

<card-demo-footer />

## 无边框卡片

使用无边框样式。

<card-demo-borderless />

## 始终显示阴影

卡片始终显示阴影效果。

<card-demo-shadow />

## 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| title | 卡片标题 | string | — | `''` |
| image | 卡片图片 URL | string | — | `''` |
| type | 卡片类型 | string | `primary` \| `success` \| `warning` \| `danger` \| `info` | `primary` |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 卡片内容 |
| footer | 卡片底部操作区 |

## 示例代码

```vue
<template>
  <div>
    <!-- 基础卡片 -->
    <FeiCard title="基础卡片">
      这是一个基础卡片的内容区域，可以放置任何内容。
    </FeiCard>

    <!-- 不同类型的卡片 -->
    <FeiCard title="主要卡片" type="primary">
      主要类型的卡片
    </FeiCard>

    <FeiCard title="成功卡片" type="success">
      成功类型的卡片
    </FeiCard>

    <FeiCard title="警告卡片" type="warning">
      警告类型的卡片
    </FeiCard>

    <FeiCard title="危险卡片" type="danger">
      危险类型的卡片
    </FeiCard>

    <FeiCard title="信息卡片" type="info">
      信息类型的卡片
    </FeiCard>

    <!-- 带图片的卡片 -->
    <FeiCard 
      title="带图片的卡片" 
      image="https://via.placeholder.com/400x200"
    >
      这是一个带图片的卡片
    </FeiCard>

    <!-- 带底部操作的卡片 -->
    <FeiCard title="带操作的卡片">
      这是一个带底部操作的卡片
      <template #footer>
        <div style="display: flex; gap: 8px;">
          <button>操作一</button>
          <button>操作二</button>
        </div>
      </template>
    </FeiCard>

    <!-- 无边框卡片 -->
    <FeiCard 
      title="无边框卡片" 
      class="fei-card--borderless"
    >
      这是一个无边框的卡片
    </FeiCard>

    <!-- 始终显示阴影的卡片 -->
    <FeiCard 
      title="带阴影的卡片" 
      class="fei-card--shadow-always"
    >
      这个卡片始终显示阴影效果
    </FeiCard>
  </div>
</template>

<script setup>
import FeiCard from "../../src/components/Card/Card.vue";
</script>
```