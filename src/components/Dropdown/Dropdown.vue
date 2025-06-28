<template>
  <div class="fei-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="fei-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              @click="itemClick(item)"
              class="fei-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdrown-item-${item.key}`"
            >
            <RenderVnode :vNode="item.label" />
            <!-- 解析 vNode ，一个通用组件-->
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import { ref, watch, toRaw, nextTick } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import RenderVnode from "@/hook/RenderVnode";

const props = withDefaults(defineProps<DropdownProps>(), {hideAfterClick: true});
const emit = defineEmits<DropdownEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;
defineOptions({
  name: "FeiDropdown"
})

const visibleChange = (e: boolean) => {
  emit("visible-change", e);
};
const itemClick = (e: MenuOption) => {
  if (e.disabled) return;
  emit("select", e);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};
defineExpose<DropdownInstance>({
  show: ()=>tooltipRef.value?.show(),
  hide: ()=>tooltipRef.value?.hide()
})
</script>
