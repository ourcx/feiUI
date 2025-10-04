<template>
  <div class="word-cloud-container" ref="containerRef">
    <svg
      :width="width"
      :height="height"
      ref="svgRef"
      class="word-cloud"
      @click="handleSvgClick"
    >
      <g :transform="`translate(${width / 2}, ${height / 2})`">
        <text
          v-for="(word, index) in words"
          :key="index"
          :transform="`translate(${word.x}, ${word.y}) rotate(${word.rotate})`"
          :font-size="word.size + 'px'"
          :fill="getColor(word, index)"
          :font-weight="fontWeight"
          :font-family="fontFamily"
          text-anchor="middle"
          dominant-baseline="middle"
          class="word-text"
          :class="{ [`fei-text-${type}`]: type }"
          @click="handleWordClick(word, $event)"
          @mouseenter="handleWordHover(word, $event)"
          @mouseleave="handleWordLeave(word, $event)"
        >
          {{ word.text }}
        </text>
      </g>
    </svg>

    <!-- 提示框 -->
    <transition name="fade">
      <div
        v-if="tooltip.visible"
        class="word-tooltip"
        :style="{
          left: tooltip.x + 'px',
          top: tooltip.y + 'px'
        }"
      >
        {{ tooltip.content }}
      </div>

    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { scaleOrdinal } from 'd3-scale'
import { schemeCategory10 } from 'd3-scale-chromatic'
import cloud from 'd3-cloud'
import type { Props, Tooltip, WordData, WordLayout } from './type';


const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 500,
  padding: 2,
  fontFamily: "'Quicksand', 'Nunito', 'Rubik', 'Karla', sans-serif",
  fontWeight: 'normal',
  fontSizeRange: () => [14, 60],
  rotations: () => [-45, 0, 45],
  colors: () => [...schemeCategory10],
  autoFit: true,
  type: 'primary'
})

// Emits
const emit = defineEmits<{
  wordClick: [word: WordData, event: MouseEvent]
  wordHover: [word: WordData, event: MouseEvent]
  wordLeave: [word: WordData, event: MouseEvent]
  layoutComplete: [words: WordLayout[]]
}>()

// Refs
const containerRef = ref<HTMLElement>()
const svgRef = ref<SVGSVGElement>()
const words = ref<WordLayout[]>([])
const tooltip = reactive<Tooltip>({
  visible: false,
  x: 0,
  y: 0,
  content: ''
})

// Computed
const computedWidth = computed(() => {
  if (props.autoFit && containerRef.value) {
    return containerRef.value.clientWidth
  }
  return props.width
})

const computedHeight = computed(() => {
  if (props.autoFit && containerRef.value) {
    return Math.min(containerRef.value.clientHeight, 500)
  }
  return props.height
})

const colorScale = computed(() => {
  return scaleOrdinal<string>()
    .domain(props.data.map(d => d.text))
    .range(props.colors)
})

// Methods
const getColor = (word: WordData, index: number): string => {
  return colorScale.value(word.text) || props.colors[index % props.colors.length]
}

//鼠标经过的处理
const handleWordClick = (word: WordData, event: MouseEvent) => {
  emit('wordClick', word, event)
}

const handleWordHover = (word: WordData, event: MouseEvent) => {
  tooltip.visible = true
  tooltip.x = event.clientX + 10
  tooltip.y = event.clientY + 10
  tooltip.content = `${word.text}: ${word.value}`
  emit('wordHover', word, event)
}

const handleWordLeave = (word: WordData, event: MouseEvent) => {
  tooltip.visible = false
  emit('wordLeave', word, event)
}

const handleSvgClick = (event: MouseEvent) => {
  // 点击空白区域隐藏tooltip
  if ((event.target as SVGElement).tagName !== 'text') {
    tooltip.visible = false
  }
}

// 词云布局
const generateWordCloud = async () => {
  if (!props.data.length) return

  const fontSizeScale = scaleLinear()
    .domain([minValue.value, maxValue.value])
    .range(props.fontSizeRange as [number, number])

  return new Promise<void>((resolve) => {
    const layout = cloud()
      .size([computedWidth.value, computedHeight.value])
      .words(props.data.map(d => ({
        size: fontSizeScale.value(d.value),
        ...d
      })))
      .padding(
        typeof props.padding === 'function'
          ? (datum: any, index: number) => (props.padding as (word: WordData) => number)({
              text: datum.text,
              value: datum.value,
              ...datum
            })
          : (props.padding as number)
      )
      .rotate(() => {
        if (props.rotations.length === 0) return 0
        return props.rotations[Math.floor(Math.random() * props.rotations.length)]
      })
      .font(props.fontFamily)
      .fontSize((d: any) => d.size)
      .on('end', (layoutWords: any[]) => {
        words.value = layoutWords.map(word => ({
          ...word,
          x: word.x || 0,
          y: word.y || 0,
          rotate: word.rotate || 0
        }))
        emit('layoutComplete', words.value)
        resolve()
      })

    layout.start()
  })
}

// 工具函数
const scaleLinear = () => {
  let domain: [number, number] = [0, 1]
  let range: [number, number] = [0, 1]

  return {
    domain(d: [number, number]) {
      domain = d
      return this
    },
    range(r: [number, number]) {
      range = r
      return this
    },
    value(x: number) {
      const [d0, d1] = domain
      const [r0, r1] = range
      return r0 + (x - d0) / (d1 - d0) * (r1 - r0)
    }
  }
}

const minValue = computed(() => {
  return Math.min(...props.data.map(d => d.value))
})

const maxValue = computed(() => {
  return Math.max(...props.data.map(d => d.value))
})

// 生命周期
onMounted(() => {
  generateWordCloud()
})

// 监听数据变化
watch(() => props.data, () => {
  generateWordCloud()
}, { deep: true })

watch([computedWidth, computedHeight], () => {
  generateWordCloud()
})

// 暴露方法给父组件
defineExpose({
  regenerateLayout: generateWordCloud,
  getWords: () => words.value
})
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
