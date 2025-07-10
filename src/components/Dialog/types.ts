export interface DialogProps{
  toNode?:string
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  width?:string
  height?:string
  screen?:boolean
  title:string
  exist:boolean
}

export interface DialogEmits{
  (e: 'close'): void
  (e: 'confirm'): void
}




