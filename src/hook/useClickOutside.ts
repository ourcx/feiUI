import type {Ref} from 'vue'
import {onMounted, onUnmounted} from 'vue'
const useClickOutside = (elementRef: Ref<HTMLElement | undefined>, callback: (e:MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    if(elementRef.value&&e.target){
      if(!elementRef.value.contains(e.target as Node)){
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
