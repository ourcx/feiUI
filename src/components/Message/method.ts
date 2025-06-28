import { render, h, shallowReactive, nextTick } from 'vue';
import MessageConstructor from './Messaage.vue';
import type { CreateMessageProps, MessageContext } from './type';
import useZindex from '@/hook/useZindex';

const instances: MessageContext[] = shallowReactive([]);
let seed = 1;

// 全局消息位置更新函数
const updateMessagePositions = async () => {
  await nextTick();

  // 按顺序计算每个消息框的位置
  let cumulativeOffset = 0;

  for (const instance of instances) {
    if (instance.vm.exposed) {
      try {
        // 更新当前消息框的顶部位置
        instance.vm.exposed.topOffset.value = cumulativeOffset;

        // 累积偏移量（高度 + 间隔）
        cumulativeOffset += (instance.vm.exposed.height.value || 10) + 70;
      } catch (error) {
        console.error(`更新消息位置时出错:`, error);
      }
    }
  }
};

export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZindex();
  const id = `message_${seed++}`;
  const container = document.createElement('div');

  const destroy = async () => {
    const idx = instances.findIndex(item => item.id === id);
    if (idx === -1) return;

    try {
      // 1. 从实例数组中移除当前实例
      instances.splice(idx, 1);

      // 2. 更新剩余消息框的位置（等待 DOM 更新完成）
      await nextTick();
      await updateMessagePositions();

      // 3. 从 DOM 中移除元素
      if (container.firstElementChild && document.body.contains(container.firstElementChild)) {
        document.body.removeChild(container.firstElementChild);
      }

      // 4. 卸载组件
      render(null, container);
    } catch (error) {
      console.error(`销毁消息框 ${id} 时出错:`, error);
    }
  };

  const manualDestroy = async () => {
    const instance = instances.find(item => item.id === id);
    if (instance && instance.vm.exposed) {
      try {
        // 隐藏消息框
        instance.vm.exposed.visible.value = false;

        // 等待动画完成后再完全销毁
        setTimeout(() => destroy(), 300);
      } catch (error) {
        console.error(`手动销毁消息框 ${id} 时出错:`, error);
      }
    }
  };

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destroy
  };

  // 创建虚拟节点并渲染
  const vnode = h(MessageConstructor, newProps);
  render(vnode, container);

  // 添加到 DOM
  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;
  const instance = {
    id,
    vnode,
    props: newProps,
    vm,
    destroy: manualDestroy
  };

  // 添加到实例数组
  instances.push(instance);

  // 更新所有消息框的位置
  updateMessagePositions();

  return instance;
};

// 其他辅助函数保持不变...
