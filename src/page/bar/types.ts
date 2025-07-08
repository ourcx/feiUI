export interface StatuesBarProps {
  status: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  back?:boolean
  icon?: string
  height?: number
  top?: number
  backgroundColor?: string
  fixed?: boolean
}


export interface StatuesBarInstance {
  (e: "close"): void;
  (e: "hidden", props: Partial<StatuesBarProps>): void;
  (e: "show", props: Partial<StatuesBarProps>): void;
  (e: "scroll"):void
}



