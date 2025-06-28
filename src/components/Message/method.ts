import type { MessageProps } from './type'
import { render, h,shallowReactive } from 'vue'
import MessageConstructor from './Messaage.vue'
// import { create } from 'some-module' // Uncomment and specify the module if needed, or remove this line if not used
import type { CreateMessageProps, MessageContext } from './type'
import useZindex from '@/hook/useZindex'


const instances: MessageContext[] =shallowReactive([])
//优化性能，浅层响应式对象
let seed = 1
export const createMessage = (props: CreateMessageProps) => {
  const {nextZIndex} = useZindex()
  const id = `message_${seed++}`
  const container = document.createElement('div')

  //要清除组件什么的用render(null, container)
  const destory = () => {
    const idx = instances.findIndex(item => item.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }
  const manualDestroy = () => {
    //手动删除，其实就是手动调节expose传出来的值
    const  instance = instances.find(item => item.id === id)
    if(instance){
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex:nextZIndex(),
    onDestoty: destory,

  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id: id,
    vnode,
    props: newProps,
    vm,
    destory:manualDestroy
  }

  instances.push(instance)
  //非空标识符
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
  //返回最后一个参数
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(item => item.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}
