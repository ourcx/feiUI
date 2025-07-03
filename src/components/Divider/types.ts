export interface DividerProps {
  dashed?: boolean
  orientation?: 'left' | 'right' | 'center'
  vertical?: boolean
}

export interface DividerEmits {
  (e: 'click', event: MouseEvent): void
  (e: 'right-click', event: MouseEvent): void
}
