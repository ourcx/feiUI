// type.ts
export interface DrawerProps {
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  visible: boolean; // 使用 v-model:visible 控制
  title?: string;
  mask?: boolean;
  maskClosable?: boolean; // 点击遮罩是否关闭
  showClose?: boolean;     // 是否显示关闭按钮
  direction?: 'left' | 'right' | 'top' | 'bottom';
  size?: string | number;
  beforeClose?: (done: () => void) => void;
}


export interface DrawerEmits {
  (e: 'update:visible', visible: boolean): void;
  (e: 'close'): void;
  (e: 'open'): void;
  (e: 'open-end'): void;
  (e: 'close-end'): void;
}
