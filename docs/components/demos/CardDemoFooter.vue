<template>
  <div class="demo-block">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
      <FeiCard title="用户信息卡片">
        <p><strong>用户名：</strong>张三</p>
        <p><strong>邮箱：</strong>zhangsan@example.com</p>
        <p><strong>角色：</strong>管理员</p>

        <template #footer>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button style="padding: 6px 12px; border: 1px solid #ddd; border-radius: 4px; background: white;">
              编辑
            </button>
            <button style="padding: 6px 12px; border: 1px solid #ddd; border-radius: 4px; background: #f0f0f0;">
              删除
            </button>
          </div>
        </template>
      </FeiCard>

      <FeiCard title="操作卡片" type="primary">
        这个卡片包含多个操作按钮，放置在底部操作区域。

        <template #footer>
          <div style="display: flex; gap: 8px;">
            <button style="padding: 8px 16px; border: none; border-radius: 4px; background: var(--fei-color-primary); color: white;">
              主要操作
            </button>
            <button style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; background: white;">
              次要操作
            </button>
          </div>
        </template>
      </FeiCard>
    </div>
  </div>
</template>

<script setup>
import FeiCard from "../../../src/components/Card/Card.vue";
</script>
