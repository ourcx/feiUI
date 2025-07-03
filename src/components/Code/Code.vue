<template>
  <div
    class="fei-code"
    :class="{ [`fei-code--${type}`]: type }"
    :style="props.width ? { width: props.width + 'px' } : {}"
  >
    <div class="fei-code__header">
      <div class="fei-code__header_left">{{ code }}</div>
      <div class="fei-code__header_center">{{ theme }}</div>
      <div class="fei-code__header_right">{{ type }}</div>
    </div>
    <div class="actions">
      <Button @click="toggleEdit(isEditing)" :type="type" v-if="props.editable">
        {{ isEditing ? "进行预览" : "编辑代码" }}
      </Button>
      <Button :type="type" @click="copyCode()" v-if="copyable">
        <div class="icon-text">
          <Icon icon="copy"></Icon>
          {{ copyText }}
        </div>
      </Button>
    </div>
    <div class="fei-code__body">
      <div v-if="isEditing" class="edit-mode">
        <textarea
          ref="codeTextarea"
          v-model="sourceCode"
          class="code-textarea"
          :class="{ [`code-textarea--${textareType}`]: textareType }"
        ></textarea>
      </div>
      <div v-else class="body-edit" v-html="codeHtml"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 1. 导入必要的模块
import { watch, ref, computed } from "vue";
import type { Codeprops, CodeEmits } from "./types"; // 假设你的 props 类型定义在这里
import { codeToHtml } from "shiki";
import Button from "../Button/Button.vue";
import Icon from "../Icon/Icon.vue";
// 2. 定义组件选项和 Props
defineOptions({
  name: "FeiCode",
});

const props = withDefaults(defineProps<Codeprops>(), {
  theme: "github-dark",
  copyable: true,
  editable: false,
  type: "info",
});
let timer: number | null = null;
const sourceCode = ref(props.initialCode);
const isEditing = ref(false);
const codeHtml = ref("");
const emits = defineEmits<CodeEmits>();
const codeTextarea = ref<HTMLTextAreaElement | null>(null);
watch(
  () => props.initialCode,
  async (newCode) => {
    if (newCode) {
      codeHtml.value = await codeToHtml(newCode, {
        lang: props.code,
        theme: props.theme,
      });
      emits("update:modelValue", sourceCode.value);
    } else {
      // 如果传入的 code 为空，则清空显示
      codeHtml.value = "";
      emits("update:modelValue", sourceCode.value);
    }
  },
  {
    immediate: true, // 关键：让 watch 在组件初始化时立即执行一次
  }
);

watch(
  () => codeTextarea.value ? codeTextarea.value.scrollHeight : 0,
  (newCode) => {
    if (codeTextarea.value) {
      codeTextarea.value.style.height = codeTextarea.value.scrollHeight + "px";
    }
  }
);
watch( () => sourceCode.value, (newCode) => {
   if (codeTextarea.value) {
      codeTextarea.value.style.height = codeTextarea.value.scrollHeight + "px";
    }
})

function toggleEdit(state: boolean) {
  isEditing.value = !state;
  emits("edit", state);
  if (state) {
    codeToHtml(sourceCode.value, {
      lang: props.code,
      theme: props.theme,
    }).then((html) => {
      codeHtml.value = html;
    });
    emits("update:modelValue", sourceCode.value);
  }
}

const copyCode = () => {
  //复制代码到粘贴板
  copy(sourceCode.value).then(() => {
    emits("copy", sourceCode.value);
  });
  copyText.value = "已复制";
  if (timer) clearTimeout(timer); // 正确类型检查
  timer = window.setTimeout(() => {
    copyText.value = "";
  }, 2000);
};
const copyText = ref("");

const textareType = computed(() => {
  return props.theme === "vitesse-dark" || props.theme === "github-dark"
    ? "dark"
    : "light";
});
function copy(value: string) {
  return navigator.clipboard.writeText(value);
}
</script>
