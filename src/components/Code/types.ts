export interface Codeprops {
  type?: 'primary' | 'info'
  code: string
  theme?:'github-light'|'github-dark'|'vitesse-dark'|'vitesse-light'
  copyable?: boolean
  editable?: boolean
  //使用分离式的方法可能会更好，因为编辑后的代码vue拿不到
  initialCode:string
  width?: number
}

export interface CodeEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'copy', value: string): void
  (e: 'edit', value: boolean): void
}
