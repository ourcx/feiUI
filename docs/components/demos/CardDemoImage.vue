<template>
  <div class="demo-block">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
      <FeiCard
        title="风景图片"
        image="https://picsum.photos/seed/picsum/200/300"
      >
        这是一个带风景图片的卡片，图片会自动适应卡片宽度。
      </FeiCard>

      <FeiCard
        title="产品展示"
        image="https://picsum.photos/200/300/?blur"
        type="success"
      >
        产品展示卡片，可以用于电商平台或产品介绍。
      </FeiCard>
    </div>
  </div>
</template>

<script setup>
import FeiCard from "../../../src/components/Card/Card.vue";
</script>
