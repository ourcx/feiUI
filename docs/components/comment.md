# Comment 评论组件

用于对内容进行评论操作。

## 基础用法

基础的评论用法。

<comment-demo-basic />

## 不同类型

使用 `type` 属性来定义评论的类型。

<comment-demo-type />

## 引用内容

通过 `quote` 属性添加引用内容。

<comment-demo-quote />

## 回复内容

通过 `reply` 属性添加回复内容。

<comment-demo-reply />

## 自定义操作

通过插槽自定义操作按钮。

<comment-demo-actions />

## 嵌套评论

评论组件可以嵌套使用。

<comment-demo-nested />

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| avatar | 头像图片地址 | `string` | `'url'` |
| author | 作者姓名 | `string` | `'作者'` |
| datetime | 评论时间 | `string` | `'2021-01-01'` |
| content | 评论内容 | `string` | `'内容'` |
| type | 评论类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| quote | 引用内容 | `object` | `() => ({})` |
| reply | 回复内容 | `object` | `() => ({})` |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| text | 自定义评论内容 |
| actions | 自定义操作区域 |

## 示例代码

```vue
<template>
  <div>
    <!-- 基础评论 -->
    <FeiComment
      author="张三"
      datetime="2024-01-15 14:30"
      content="这个功能非常实用，解决了我的问题！"
    />

    <!-- 不同类型 -->
    <FeiComment
      type="success"
      author="李四"
      datetime="2024-01-15 15:20"
      content="建议很好，我们会尽快采纳。"
    />

    <!-- 带引用 -->
    <FeiComment
      author="王五"
      datetime="2024-01-15 16:10"
      content="我同意这个观点"
      :quote="{
        content: '原始评论内容...',
        author: '原作者',
        datetime: '2024-01-14'
      }"
    />

    <!-- 带回复 -->
    <FeiComment
      author="赵六"
      datetime="2024-01-15 17:05"
      content="感谢反馈"
      :reply="{
        content: '不客气，希望继续改进',
        author: '回复者',
        datetime: '2024-01-15 17:00'
      }"
    />

    <!-- 自定义操作 -->
    <FeiComment
      author="自定义用户"
      datetime="2024-01-15 18:00"
      content="这是自定义操作的评论"
    >
      <template #actions>
        <div class="custom-actions">
          <span class="action-item">点赞</span>
          <span class="action-item">分享</span>
          <span class="action-item">收藏</span>
        </div>
      </template>
    </FeiComment>
  </div>
</template>

<script setup>
import FeiComment from "../../src/components/Comment/Comment.vue";
</script>