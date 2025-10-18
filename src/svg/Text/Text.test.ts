// @vitest-environment node
import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Text from './Text.vue'

test('Text',async () => {
  const wrapper = mount(Text, {
    props: {
      type: 'success',
      data: [
        { text: 'Vue', value: 100 },
        { text: 'TypeScript', value: 85 },
        { text: 'JavaScript', value: 95 },
        { text: 'React', value: 80 },
        { text: 'Node.js', value: 75 },
        { text: 'Python', value: 70 },
        { text: '数据可视化', value: 65 },
        { text: '前端开发', value: 90 },
        { text: 'CSS', value: 85 },
        { text: 'HTML', value: 80 },
        { text: 'Webpack', value: 60 },
        { text: 'Vite', value: 55 },
        { text: '组件库', value: 50 },
        { text: '响应式', value: 45 }
      ],
      colors:['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2'],
    },
  })
   // 等待组件渲染完成
  await wrapper.vm.$nextTick()

  // 检查渲染的内容
  console.log('组件HTML:', wrapper.html())
  console.log('组件文本:', wrapper.text())

  // 如果组件是 SVG 或使用 canvas，可能需要不同的断言方式
  // 尝试查找特定的 DOM 元素
  const vueElement = wrapper.find('[data-test="Vue"]')
  expect(vueElement.exists()).toBe(true)

  wrapper.unmount()

})
