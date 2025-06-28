import {ref,computed} from 'vue'

const zIndex = ref(0)

const useZindex = (initialZIndex=2000) => {
  const initialZIndexRef = ref(initialZIndex)
  const currentZIndex =computed(() =>zIndex.value+initialZIndexRef.value)
  const nextZIndex = () => {
    zIndex.value ++
    return currentZIndex.value
  }  
  return {
    currentZIndex,
    nextZIndex,
    initialZIndexRef,
  }
}

export default useZindex
