
import { onMounted,onBeforeUnmount,isRef,watch } from "vue";
import type { Ref } from "vue";

export default function useEventListener(
  target: EventTarget|Ref<EventTarget | null>,
  event:string,
  handlder: (e: Event) => void
){
  onMounted(() => {
    if(isRef(target)){
      watch(target, (newTarget,old) => {
        old?.removeEventListener(event, handlder)
        newTarget?.addEventListener(event, handlder)
      })
    }else{
      target.addEventListener(event, handlder)
    }
  })
  onBeforeUnmount(() => {
    if(isRef(target)){
      target.value?.removeEventListener(event, handlder)
    }else{
       target.removeEventListener(event, handlder)
    }
  })
}
//事件和行为监听

