<template>
  <div class="demo-block">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
      <FeiCard title="主要卡片" type="primary">
        主要类型的卡片，用于重要信息展示。
      </FeiCard>

      <FeiCard title="成功卡片" type="success">
        成功类型的卡片，用于成功状态或正向操作。
      </FeiCard>

      <FeiCard title="警告卡片" type="warning">
        警告类型的卡片，用于提醒或警告信息。
      </FeiCard>

      <FeiCard title="危险卡片" type="danger">
        危险类型的卡片，用于错误或危险操作。
      </FeiCard>

      <FeiCard title="信息卡片" type="info">
        信息类型的卡片，用于普通信息展示。
      </FeiCard>
    </div>
  </div>
</template>

<script setup>
import FeiCard from "../../../src/components/Card/Card.vue";
</script>
