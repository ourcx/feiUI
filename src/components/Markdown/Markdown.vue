<template>
  <div
    class="fei-markdown"
    :style="
      `${props.width ? `width:${props.width}px;` : ''}` +
      `${props.height ? `height:${props.height}px;` : ''}`
    "
  >
    <div v-if="renderMarkdown" class="fei-markdown-body" v-html="renderMarkdown"></div>
    <div v-else>
      <p>正在渲染...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MarkdownProps } from "./types";
import { computed, ref, watchEffect, onMounted } from "vue";
import MarkdownIt from "markdown-it";
import { codeToHtml } from "shiki";

const props = withDefaults(defineProps<MarkdownProps>(), {
  theme: "github-dark-dimmed",
  src: "",
  content: "",
  height: "auto",
  width: "auto",
});

const mdContent = ref("");
const renderMarkdown = ref("");
const error = ref(null);

onMounted(async () => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code, lang) => {
      return code;
    },
  });

  watchEffect(async () => {
    if (props.src) {
      try {
        mdContent.value = await fetch(props.src).then((res) => res.text());
        const highlighted = await highlightMarkdownWithShiki(
          mdContent.value,
          props.theme
        );
        renderMarkdown.value = md.render(highlighted);
        error.value = null;
      } catch (e) {
        error.value = e as null;
        const err = `# Error加载失败\n\n**错误**${error.value}`;
        renderMarkdown.value = md.render(err);
        console.error(e);
      }
    } else if (props.content) {
      try {
        const highlighted = await highlightMarkdownWithShiki(props.content, props.theme);
        renderMarkdown.value = md.render(highlighted);
        error.value = null;
      } catch (e) {
        error.value = e as null;
        const err = `# Error加载失败\n\n**错误**${error.value}`;
        renderMarkdown.value = md.render(err);
        console.error(e);
      }
    }
  });
});

async function highlightMarkdownWithShiki(markdown: string, theme: string) {
  // Find all code blocks
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: { match: string; lang: string; code: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    blocks.push({
      match: match[0],
      lang: match[1] || "text",
      code: match[2],
    });
  }

  let highlighted = markdown;
  for (const block of blocks) {
    const html = await codeToHtml(block.code, { lang: block.lang, theme });
    highlighted = highlighted.replace(block.match, html);
  }
  return highlighted;
}
</script>
