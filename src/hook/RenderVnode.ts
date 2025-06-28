import { defineComponent, reactive } from 'vue';
const RenderVnode = defineComponent({
  props: {
    vNode:{
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    return()=> props.vNode
  }
})

export default RenderVnode
