<template>
  <div class="fei-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide,watch } from "vue";
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
watch(() => props.modelValue, (value) => {
  activeNames.value = value;
})
//监听函数

if (props.accordion && props.modelValue.length > 1) {
  console.warn("[FeiUI]: Collapse 组件的 accordion 属性，modelValue 的长度不能大于 1");
}
//手风琴就是modelValue.length === 1，只能有一项
const handleItemClick = (name: NameTYpe) => {
  let _activeNames= [...activeNames.value];
  activeNames.value = _activeNames;
  //复制一份activeNames的值，避免直接修改原来的值
  if (props.accordion) {
    //记得去开启手风琴模式
    activeNames.value = [activeNames.value[0] === name ? "" : name];
  } else {
    const index = _activeNames.indexOf(name);
    if (index > -1) {
      _activeNames.splice(index, 1);
      //删除数组中对应的一项
    } else {
      //不存在，就放入
      _activeNames.push(name);
    }
    activeNames.value = _activeNames;
  }
  emits("update:modelValue", _activeNames);
  emits("change", _activeNames);
  //通过 update:modelValue 事件通知父组件更新绑定的值。
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
//父子组件通信
// 后续要添加一个箭头，还要优化一下生成子组件的方法，还要用更多的样式什么的，添加一下暴露出来的api，
// 添加一个折叠面板，折叠面板的标题和内容，折叠面板的标题可以点击，折叠面板的标题可以折
</script>











