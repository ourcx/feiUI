import type { VNode,ComponentInternalInstance } from "vue";
import { createMessage } from './method';
import type { Message } from "postcss";




export interface MessageProps{
  message?: string|VNode;
  duration?: number;
  showClose?: boolean;
  type?:'success'|'warning'|'info'|'error';
  onDestory?: () => void;
  id:string;
  offset?: number;
  zIndex?: number;
  destory?: () => void;
}

export interface MessageContext {
  id:string;
  vnode: VNode;
  props:MessageProps;
  vm: ComponentInternalInstance;
}


export type CreateMessageProps = Omit<MessageProps, 'onDestory'|'id'|'zIndex'>;
