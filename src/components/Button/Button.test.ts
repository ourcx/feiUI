import { describe, it, expect } from 'vitest'
import Button from './Button.vue'
import { mount } from '@vue/test-utils'
import test from 'node:test'

describe('Button Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        disabled: false
      },
      slots: {
        default: 'click me'
      }
    })

    // 验证类名
    expect(wrapper.classes()).toContain('fei-button')
    expect(wrapper.classes()).toContain('fei-button--primary')
    expect(wrapper.get('button').text()).toBe('click me')
    //得到按钮元素

    //事件
    const button = wrapper.get('button')
    button.trigger('click')
    console.log(wrapper.emitted())

    expect(wrapper.emitted()).toHaveProperty('click')
    //查看里面是否有对应属性
  })

  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        disabled: true
      },
      slots: {
        default: 'disable'
      }
    })

    // 验证类名
    expect(wrapper.classes()).toContain('fei-button')
    expect(wrapper.classes()).toContain('fei-button--primary')
    expect(wrapper.get('button').text()).toBe('disable')

    // 验证按钮是否被禁用
    const button = wrapper.get('button')
    expect(button.attributes('disabled')).toBeDefined()

    // 验证点击事件未触发
    button.trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')

    expect(wrapper.find('button').element.disabled).toBeDefined()
  })

  //测试和图标相关的内容
  test('renders icon correctly', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        icon: 'search'
      },
      slots: {
        default: 'search'
      },
      global: {
        stubs:["FontAwesomeIcon"]
      }
    })

    console.log(wrapper.html())
    const icon = wrapper.find('.fei-icon')
    expect(icon.exists()).toBe(true)
  })
})
