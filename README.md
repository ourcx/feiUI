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

4. FeiUI组件文档
访问 https://feiui.com/docs/introduction.html 获取更多信息。
本项目docs文件夹下面是本组件库的文档


5. 贡献指南
 1. Fork 本仓库
 2. 创建一个分支
 3. 提交你的修改
 4. 创建一个 Pull Request
 5. 联系我们


6. 贡献名单
1. [ourcx](https://github.com/ourcx)

