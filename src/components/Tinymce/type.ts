export interface TinymceProps{
  name: string
  upload: (FormData: FormData) => Promise<any>
}


export interface TinymceEmits{
  (e: 'change', value: string): void
  (e: 'upload', value: string): void
  (e: 'blur', value: string): void
}
