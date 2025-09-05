# FeiUI

仿elementUI的项目，添加了自己的颜色系统和其他自己制作的组件

# 按需导入
本项目使用了babel-plugin-import，因此按需导入组件时，请使用如下方式：
1. 安装必要依赖
```bash
npm install unplugin-vue-components -D
```
2. 配置Vite
在vite.config.ts中添加配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { YourLibraryResolver } from 'your-library/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [YourLibraryResolver()],
    }),
  ],
})
```
3. 直接使用组件
在Vue组件中直接使用，无需手动导入：

```vue
<template>
  <Button>点击我</Button>
  <Alert type="success">操作成功！</Alert>
  <Card title="卡片标题">卡片内容</Card>
</template>

<script setup>
// 不需要手动导入Button、Alert、Card组件
// unplugin-vue-components会自动处理
</script>
```