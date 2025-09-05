<template>
  <div class="fei-color-picker" :style="{width: width + 'px', height: height + 'px' }">
    <color-picker
      :pureColor="pureColor"
      format="hex6"
      shape="circle"
      useType="both"
      :gradientColor="gradientColor"
      :pickerType="pickerType"
      :disableHistory="disableHistory"
      :roundHistory="roundHistory"
      :disableAlpha="disableAlpha"
      :zindex="zindex"
      class="fei-color-picker"
      :isWidget="isWidget"
      @change="handleChange"
      @update:pureColor="handleUpdatePureColor"
      @update:gradientColor="handleUpdateGradientColor"
      @update:pickerType="handleUpdatePickerType"
      @update:disableHistory="handleUpdateDisableHistory"
      @update:roundHistory="handleUpdateRoundHistory"
      @update:disableAlpha="handleUpdateDisableAlpha"
      @update:isWidget="handleUpdateIsWidget"
    />
  </div>
</template>
<script setup lang="ts">
import { ColorPicker } from "vue3-colorpicker";
import { withDefaults } from "vue";
import "vue3-colorpicker/style.css";
import type { ColorPickerProps, ColorPickerEmits } from "./type";
const emit = defineEmits<ColorPickerEmits>();
const props = withDefaults(defineProps<ColorPickerProps>(), {
  isWidget: false,
  format: "hex",
  shape: "square",
  pickerType: "fk",
  useType: "pure",
  disableHistory: false,
  roundHistory: false,
  disableAlpha: false,
  zindex: 0,
  gradientColor: "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)",
  pureColor: "#71afe5",
  width: 200,
  height: 200
  // 控制自己点的样式，控制这个区域的大小
});
const handleChange = (event: any) => {
  emit("change", event);
};
const handleUpdatePureColor = (value: string) => {
  emit("update:pureColor", value);
};
const handleUpdateGradientColor = (value: string) => {
  emit("update:gradientColor", value);
};
const handleUpdatePickerType = (value: string) => {
  emit("update:pickerType", value);
};
const handleUpdateDisableHistory = (value: boolean) => {
  emit("update:disableHistory", value);
};
const handleUpdateRoundHistory = (value: boolean) => {
  emit("update:roundHistory", value);
};
const handleUpdateDisableAlpha = (value: boolean) => {
  emit("update:disableAlpha", value);
};
const handleUpdateIsWidget = (value: boolean) => {
  emit("update:isWidget", value);
};

//这里是一些通知进行更新的emit
</script>
