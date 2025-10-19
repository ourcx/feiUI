<template>
  <div class="demo-block">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
      <FeiCard
        title="普通阴影卡片"
        class="fei-card--shadow-always"
      >
        这个卡片始终显示阴影效果，悬停时阴影会加深。
      </FeiCard>

      <FeiCard
        title="带阴影的主要卡片"
        type="primary"
        class="fei-card--shadow-always"
      >
        主要类型的卡片加上阴影效果，层次感更强。
      </FeiCard>
    </div>
  </div>
</template>

<script setup>
import FeiCard from "../../../src/components/Card/Card.vue";
</script>
