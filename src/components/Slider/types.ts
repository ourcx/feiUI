export interface SliderProps{
  max?:number
  min?:number
  value?:number | number[]
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  step?:number
  showStops?:boolean
  progress?:boolean
  range?:boolean
  vertical?:boolean
  ShowValue?:boolean
}

export interface SliderEmits{
  (e: 'input', value: number | number[]): void
}
