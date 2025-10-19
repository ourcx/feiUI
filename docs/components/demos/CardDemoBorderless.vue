<template>
  <div class="demo-block">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; background: var(--fei-bg-color-page); padding: 20px;">
      <FeiCard
        title="无边框卡片"
        class="fei-card--borderless"
      >
        这个卡片没有边框，适合在有色背景上使用。
      </FeiCard>

      <FeiCard
        title="无边框主要卡片"
        type="primary"
        class="fei-card--borderless"
      >
        无边框的主要类型卡片，视觉效果更加简洁。
      </FeiCard>
    </div>
  </div>
</template>

<script setup>
import FeiCard from "../../../src/components/Card/Card.vue";
</script>
