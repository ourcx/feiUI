<template>
  <div class="fei-QRcode" :style="{ width: size + 'px', height: size + 'px' }">
    <Image
      v-if="type === 'img'"
      :src="qrCodeUrl || ''"
      :width="size"
      :height="size"
      :status="status"
      @click="$emit('click')"
    />
    <canvas v-else ref="canvas" @click="$emit('click')" />
  </div>
</template>

<script setup lang="ts">
import type { QRcodeProps, QRcodeEmits } from "./type";
import Image from "../Image/Image.vue";
import { ref, onMounted, watchEffect, withDefaults, nextTick } from "vue";
import QRCode from "qrcode";

const qrCodeUrl = ref<string | null>(null);
const props = withDefaults(defineProps<QRcodeProps>(), {
  value: "",
  type: "img",
  size: 200, // 二维码尺寸
  level: "M",
  bgColor: "#ffffff", // 二维码背景色
  fgColor: "#000000", // 二维码前色
  status: "success",
  icon: "",
  iconSize: 40,
});
const emit = defineEmits<QRcodeEmits>();

const isLoading = ref(false);
const generationError = ref<Error | null>(null);
const canvas = ref<HTMLCanvasElement>();

watchEffect(async () => {
  if (!props.value) {
    qrCodeUrl.value = "";
    return;
  }
  isLoading.value = true;
  generationError.value = null;
  try {
    const options = {
      errorCorrectionLevel: props.level,
      width: props.size,
      margin: 1,
      color: {
        dark: props.fgColor,
        light: props.bgColor,
      },
    };

    if (props.icon === "") {
      if (props.type !== "img") {
        if (canvas.value) {
          await QRCode.toCanvas(canvas.value, props.value.trim(), options);
        }
      } else {
        qrCodeUrl.value = await QRCode.toDataURL(props.value.trim(), options);
      }
    } else {
      //带图标
      // 1. 创建一个临时的、在内存中的 canvas
      const tempCanvas = document.createElement("canvas");

      // 2. 将二维码绘制到这个临时 canvas 上
      await QRCode.toCanvas(tempCanvas, props.value.trim(), options);

      // 3. 绘制图标
      const ctx = tempCanvas.getContext("2d");
      if (ctx) {
        const iconImg = document.createElement("img");
        iconImg.src = props.icon;
        // 必须等图标加载完成才能绘制
        iconImg.onload = () => {
          // 计算图标在 canvas 中居中绘制的位置和大小
          const iconW = props.iconSize;
          const iconH = props.iconSize;
          const iconX = (props.size - iconW) / 2;
          const iconY = (props.size - iconH) / 2;

          // 在图标后面绘制一个白色背景，防止图标和二维码图案重叠导致无法识别
          ctx.fillStyle = props.bgColor;
          ctx.fillRect(iconX, iconY, iconW, iconH);

          // 将图标绘制到 canvas 上
          ctx.drawImage(iconImg, iconX, iconY, iconW, iconH);
        };
      }

      if (props.type !== "img") {
        qrCodeUrl.value = tempCanvas.toDataURL();
      } else {
        const targetCanvas = canvas.value;
        if (targetCanvas) {
          targetCanvas.width = props.size;
          targetCanvas.height = props.size;
          const targetCtx = targetCanvas.getContext("2d");
          targetCtx?.drawImage(tempCanvas, 0, 0);
        }
      }
    }
  } catch (error) {
    console.error("Error generating QR code:", error);
    generationError.value = error as Error; // 捕获错误状态
    emit("error", generationError.value);
  } finally {
    isLoading.value = false; // 无论成功或失败，都结束加载状态
    if (!generationError.value) {
      emit("success", qrCodeUrl.value);
    }
  }
});
</script>
