<template>
  <div class="fei-tinymce">
    <div class="fei-tinymce-title">{{ name }}</div>
    <Toolbar :editor="editorRef" :editorId="editorId" :defaultConfig="toolBarConfig" />
    <Editor
      v-model="htmlContent"
      :defaultConfig="editorConfig"
      :editorId="editorId"
      :style="editorStyle"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, watch, unref, computed, onBeforeUnmount, nextTick } from 'vue';
// @ts-ignore: package exports typings are not resolvable in this environment; provide a local declaration file if needed
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { ElMessage } from 'element-plus';
import type { TinymceProps,TinymceEmits } from './type'

const props = withDefaults(defineProps<TinymceProps & {
  name: string;
  editorId: string;
  height: string | number;
  editorConfig: Record<string, any>;
  toolBarConfig: Record<string, any>;
  readonly: boolean;
  modelValue: string;
  modelText: string;
  maxLength: number;
  placeholder: string;
}>(), {
  name: '文本编辑',
  upload: async (FormData: FormData) => {
    return {};
  },
  editorId: 'custom-editor',
  height: '500px',
  editorConfig: () => ({}),
  toolBarConfig: () => ({}),
  readonly: false,
  modelValue: '',
  modelText: '',
  maxLength: 600,
  placeholder: '请输入...'
});

const emit = defineEmits(['change', 'update:modelValue', 'update:modelText']);

const editorRef = shallowRef();

const htmlContent = ref('');

watch(
  () => props.modelValue,
  (val) => {
    if (val === unref(htmlContent)) return;
    htmlContent.value = val;
    nextTick(() => {
      const dom = editorRef.value.getEditableContainer();
      if (dom) {
        handleImage(dom);
      }
      emit('update:modelText', editorRef.value.getText().trim());
    });
  },
  {
    immediate: true,
  }
);

watch(
  () => htmlContent.value,
  (val) => {
    nextTick(() => {
      const dom = editorRef.value.getEditableContainer();
      if (dom) {
        handleImage(dom);
      }
    });
    emit('update:modelValue', val);
    emit('update:modelText', editorRef.value.getText().trim());
  }
);

const isNumber = (val: string | number) => {
  const num = Number(val);
  return !Number.isNaN(num) && Number.isFinite(num);
}

const handleCreated = (editor: any) => {
  editorRef.value = editor;
  editorRef.value.on('modalOrPanelShow', (modalOrPanel: { type?: any; $elem?: any; }) => {
    if (modalOrPanel.type !== 'modal') return;
    const { $elem } = modalOrPanel; // modal element
    const width = $elem.width();
    const height = $elem.height();
    $elem.css({
      left: '50%',
      top: '50%',
      marginLeft: `-${width / 2}px`,
      marginTop: `-${height / 2}px`,
      zIndex: 1000,
      position: 'fixed',
      height: 'fit-content',
    });
  });
};

// 编辑器配置
const editorConfig = computed(() => {
  return Object.assign(
    {
      placeholder: props.placeholder,
      maxLength: props.maxLength,
      readOnly: props.readonly,
      customAlert: (s: any, t: any) => {  // 自定义编辑器警告提示（比如：上传图片过大等）
        switch (t) {
          case 'success':
            ElMessage.success(s);
            break;
          case 'info':
            ElMessage.info(s);
            break;
          case 'warning':
            ElMessage.warning(s);
            break;
          case 'error':
            ElMessage.error(s);
            break;
          default:
            ElMessage.info(s);
            break;
        }
      },
      autoFocus: false,
      scroll: true,
      MENU_CONF: {
        ['uploadImage']: {
          async customUpload(file: string | Blob, insertFn: (arg0: string, arg1: string, arg2: string) => void) {
            const formData = new FormData();
            formData.append('file', file);
            const res = await props.upload(formData);
            // 插入图片 将id和sign传入并保存，渲染的时候使用
            insertFn('', '', `${res.data.id}&${res.data.sign}`);
          },
        },
      },
      hoverbarKeys: {
        // 在点击上传完成的图片时，会弹出快捷编辑框，去除'编辑'和'查看链接'按钮，只保留如下按钮配置
        image: {
          menuKeys: ['imageWidth30', 'imageWidth50', 'imageWidth100', 'deleteImage'],
        },
      },
    },
    props.editorConfig || {}
  );
});

// 工具栏配置
const toolBarConfig = computed(() => {
  return Object.assign(
    {
      excludeKeys: ['emotion', 'group-video'],  // 去除emo表情按钮，视频上传按钮
    },
    props.toolBarConfig
  );
});

// 编辑器样式
const editorStyle = computed(() => {
  return {
    height: isNumber(props.height) ? `${props.height}px` : props.height,
  };
});

const handleChange = (editor: any) => {
  emit('change', editor);
};

const getImage = async ({ id, sign }: { id: string; sign: string }): Promise<string> => {
  try {

    const res = await fetch(`/api/image/${encodeURIComponent(id)}?sign=${encodeURIComponent(sign)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.statusText}`);
    }
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error('getImage error', err);
    return '';
  }
};

const handleImage = (dom: { querySelectorAll: (arg0: string) => HTMLImageElement[]; } | null) => {
  if (dom instanceof Element) {
    dom.querySelectorAll('img').forEach((element) => {
      const href = element.getAttribute('data-href');
      if (href && href.includes('&')) {
        const [id, sign] = href.split('&');
        if (id && sign) {
          getImage({ id, sign }).then((url: string) => {
            if (url) {
              element.src = url;
            }
          });
        }
      }
    });
  } else {
    console.warn('不是一个dom元素');
  }
};

onBeforeUnmount(() => {
  const editor = unref(editorRef.value);
  editor.destroy();
});
</script>
