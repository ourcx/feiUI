import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'

export default function useEventListener (
  target: EventTarget | Ref<EventTarget | null>,
  event: string,
  handlder: (e: Event) => void
) {
  if (isRef(target)) {
    watch(target, (newTarget, old) => {
      old?.removeEventListener(event, handlder)
      newTarget?.addEventListener(event, handlder)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handlder)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handlder)
  })
}
//事件和行为监听
//isref和unref
