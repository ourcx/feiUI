export interface TagProps {
  bordered?: boolean // 是否有边框（可选）
  checkable?: boolean // 是否可勾选（可选）
  checked?: boolean // 是否被选中（可选）
  closable?: boolean // 是否可关闭（可选）
  color?: string // 标签颜色（可选）
  src?:string
  body:string
  disabled?: boolean // 是否禁用（可选
  visible: boolean
  round?: boolean // 是否圆角（可选）
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large' // 尺寸（可选预设值）
  strong?: boolean // 是否加粗（可选）
}

export interface TagEmints {
  (e: 'click', event: boolean): void
    (e: 'close', event: MouseEvent): void
}
