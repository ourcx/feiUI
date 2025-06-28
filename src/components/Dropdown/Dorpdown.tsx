import { computed, defineComponent, Transition, Fragment,ref } from "vue";
import type { PropType } from "vue";
import { type Placement, type Options, placements, popper } from "@popperjs/core";
import type { MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";

export default defineComponent({
  name: "FeiDropdown",
  props: {
    placements: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'hover'
    },
    Transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    MenuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    closeAfterClick: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots,emit,expose }) {
    const tooltipRef = ref<TooltipInstance|null>(null)
    const itemClick = (item: MenuOption) => {
      if (item.disabled) return
      emit('itemClick', item)
      if (props.closeAfterClick) {
        tooltipRef.value?.hide()
      }
    }
    const visibleChange = (visible: boolean) => {
      emit('visibleChange', visible)
    }
    //返回值
    const Options = computed(() => {
      return props.MenuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.divided ? <li role="separator" class="fei-dropdown__divider"></li> : ''}
            <li onClick={() => itemClick(item)} role="menuitem" id={`dropdown-item-${item.key}`} class={{ 'is-disabled': item.disabled, 'is-divided': item.divided, 'fei-dropdown__item': true }}>
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show: () => tooltipRef.value?.show,
      hide: () => tooltipRef.value?.hide
    })
    return () => (
      <div class="fei-dropdown">
        <Tooltip trigger={props.trigger} openDelay={props.openDelay} closeDelay={props.closeDelay} popperOptions={props.popperOptions} placement={props.placements} ref={tooltipRef} onVisible-change={visibleChange}>
          {{
            default: () => slots.default && slots.default(),
            content: () => (
              <ul class="fei-dropdown__menu">
                {Options.value}
              </ul>
            )
          }}
        </Tooltip>
      </div>
    )
  }
})
//使用jsx的写法去构建

