<template>
  <Teleport :to="toNode">
    <transition-group name="dialog-transition">
      <div class="is-screen" v-if="instance"></div>
      <div
        class="fei-Dialog"
        :class="{ [`is-${props.type}`]: props.type }"
        :style="`width:${width}px;height:${height}px`"
        v-if="exist && buttonExist"
      >
        <div class="fei-Dialog__up">
          <div class="fei-Dialog__title">{{ title }}</div>
          <div class="fei-Dialog__close" @click="clickExist">
            <Icon type="info" icon="close"></Icon>
          </div>
        </div>
        <div class="fei-Dialog__body">
          <slot name="body"></slot>
        </div>
        <div class="fei-Dialog__footer">
          <slot name="footer">
            <Button :type="type" @click="emit('confirm')">确定</Button>
            <Button :type="type" plain @click="clickExist">取消</Button>
          </slot>
        </div>
      </div>
    </transition-group>
  </Teleport>
</template>

<script setup lang="ts">
import type { DialogProps, DialogEmits } from "./types";
import Button from "../Button/Button.vue";
import Icon from "../Icon/Icon.vue";
import { ref, computed, watch } from "vue";
const props = withDefaults(defineProps<DialogProps>(), {
  toNode: "body",
  type: "primary",
  width: "500",
  height: "auto",
  screen: true,
  exist: false,
});
const buttonExist = ref(true);
defineOptions({
  name: "FeiDialog",
});

const instance = computed(() => {
  return props.screen && props.exist && buttonExist.value;
});

const clickExist = () => {
  buttonExist.value = false;
  emit("close");
};
const emit = defineEmits<DialogEmits>();

</script>
