# Code 代码块

用于展示和编辑代码片段的组件。

## 基础用法

基础的代码块用法。

<code-demo-basic />

## 不同类型

使用 `type` 属性来定义代码块的类型。

<code-demo-type />

## 不同主题

使用 `theme` 属性来切换代码块的主题。

<code-demo-theme />

## 可复制功能

使用 `copyable` 属性来控制是否显示复制按钮。

<code-demo-copyable />

## 可编辑功能

使用 `editable` 属性来启用代码编辑功能。

<code-demo-editable />

## 自定义宽度

使用 `width` 属性来自定义代码块的宽度。

<code-demo-width />

## 属性

| 属性名      | 说明           | 类型    | 可选值                                                               | 默认值        |
| ----------- | -------------- | ------- | -------------------------------------------------------------------- | ------------- |
| type        | 代码块类型     | string  | `primary` \| `info`                                                  | `info`        |
| code        | 代码的语法     | string  | —                                                                    | —             |
| theme       | 代码高亮主题   | string  | `github-light` \| `github-dark` \| `vitesse-dark` \| `vitesse-light` | `github-dark` |
| copyable    | 是否可复制     | boolean | —                                                                    | `true`        |
| editable    | 是否可编辑     | boolean | —                                                                    | `false`       |
| initialCode | 初始代码内容   | string  | —                                                                    | —             |
| width       | 代码块宽度     | number  | —                                                                    | —             |

## 事件

| 事件名            | 说明               | 参数             |
| ----------------- | ------------------ | ---------------- |
| update:modelValue | 代码内容更新时触发 | `value: string`  |
| copy              | 复制代码时触发     | `value: string`  |
| edit              | 编辑状态改变时触发 | `value: boolean` |

## 示例代码

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <FeiCode code="console.log('Hello World!')" />

    <!-- 不同类型 -->
    <FeiCode type="primary" code="const message = 'Primary Code'" />
    <FeiCode type="info" code="const message = 'Info Code'" />

    <!-- 不同主题 -->
    <FeiCode theme="github-light" code="console.log('Light theme')" />
    <FeiCode theme="github-dark" code="console.log('Dark theme')" />
    <FeiCode theme="vitesse-light" code="console.log('Vitesse light')" />
    <FeiCode theme="vitesse-dark" code="console.log('Vitesse dark')" />

    <!-- 禁用复制 -->
    <FeiCode :copyable="false" code="This code cannot be copied" />

    <!-- 可编辑 -->
    <FeiCode
      :editable="true"
      :initialCode="editableCode"
      @update:modelValue="handleCodeUpdate"
      @edit="handleEdit"
    />

    <!-- 自定义宽度 -->
    <FeiCode
      :width="400"
      code="const longCode = 'This is a very long code snippet that needs more width to display properly'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FeiCode from '../../src/components/Code/Code.vue'


const editableCode = ref(
  '// Edit this code\nfunction example() {\n  return "Hello World";\n}'
)

const handleCodeUpdate = newCode => {
  console.log('Code updated:', newCode)
}

const handleEdit = isEditing => {
  console.log('Edit mode:', isEditing)
}
</script>
```
