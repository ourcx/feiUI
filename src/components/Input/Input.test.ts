import { describe,expect,it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";


describe("Input", () => {
  it("检测dom", () => {
    //针对class是否正确
    //针对v-if
    //针对slots
    const wrapper = mount(Input, {
      props: {
        size: "samll",
        type:'text'
      },
      slots: {
        prepend:'prepend',
        prefix:'prefix'
      }
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('fei-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    //should render input
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe("text")
    //slot
    expect(wrapper.find('.fei-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.fei-input__prefix').text()).toBe('prefix')

    const wrappers = mount(Input, {
      props: {
        type:'textarea'
      }
    })
    expect(wrappers.find('textarea').exists()).toBeTruthy()


  })
it('model', async() => {
  let modelValue = 'test' // 在测试作用域中管理状态

  const wrapper = mount(Input, {
    props: {
      modelValue: 'test',
      'onUpdate:modelValue': (value: any) => {
        wrapper.setProps({ modelValue: value })
      },
      type:'text'
    }
  })

  const input = wrapper.find('input')
  expect(input.element.value).toBe('test')

  await input.setValue('update')

  // 检查模型值是否更新
  expect(modelValue).toBe('update')
  expect(input.element.value).toBe('update')

  await wrapper.setProps({ modelValue: 'newValue' })
  expect(input.element.value).toBe('newValue')


  const wrapper1 = mount(Input, {
    props: {
      type:'text',
      modelValue:'',
      showPassword:true
    },
    global: {
      stubs: ['Icon']
    }
  })

  expect(wrapper1.find('.fei-input__icon').exists()).toBeTruthy()
  const inputEye = wrapper1.get('input')
  expect(inputEye.element.type).toBe('password')

  await inputEye.setValue('update')
  const eyeIcon = wrapper1.find('.fei-input__password')
  expect(eyeIcon.exists()).toBeTruthy()
  expect(eyeIcon.attributes('icon')).toContain('eye-slash')

  await eyeIcon.trigger('click')
  expect(inputEye.element.type).toBe('text')
  expect(wrapper.find('.fei-input__password').attributes('icon')).toContain('eye')
})
})
