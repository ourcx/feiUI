<template>
  <div class="fei-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from "vue";
import type { CollapseEmits, CollapseProps, NameTYpe } from "./types";
import { collapseContextKey } from "./types";

//拿到type里面的类型
defineOptions({
  name: "FeiCollapse",
});
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
const activeNames = ref<NameTYpe[]>(props.modelValue);
//当props.modelValue在其他地方改变的时候，这里要检测他的改变
watch(
  () => props.modelValue,
  (value) => {
    activeNames.value = value;
  }
);
//监听函数

if (props.accordion && props.modelValue.length > 1) {
  console.warn("[FeiUI]: Collapse 组件的 accordion 属性，modelValue 的长度不能大于 1");
}
//手风琴就是modelValue.length === 1，只能有一项
const handleItemClick = (name: NameTYpe) => {
  let _activeNames = [...activeNames.value];

  if (props.accordion) {
    // 手风琴模式：点击当前展开的项就收起，否则展开新项
    if (_activeNames[0] === name) {
      // 如果点击的是当前展开的项，则收起
      _activeNames = [];
    } else {
      // 否则展开新项
      _activeNames = [name];
    }
  } else {
    // 非手风琴模式：多选逻辑
    const index = _activeNames.indexOf(name);
    if (index > -1) {
      _activeNames.splice(index, 1);
    } else {
      _activeNames.push(name);
    }
  }

  activeNames.value = _activeNames;
  emits("update:modelValue", _activeNames);
  emits("change", _activeNames);
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});

//父子组件通信
// 后续要添加一个箭头，还要优化一下生成子组件的方法，还要用更多的样式什么的，添加一下暴露出来的api，
// 添加一个折叠面板，折叠面板的标题和内容，折叠面板的标题可以点击，折叠面板的标题可以折
</script>
