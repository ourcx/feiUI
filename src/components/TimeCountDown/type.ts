type CountdownType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface DateInfo extends Record<string, any> {
  local_leftSeconds: number
  local_isExpired: boolean
  local_leftDay?: number
  local_leftHMS?: string
}

export interface TimeCountDownProps {
  record: DateInfo
  update?: boolean
  type?: CountdownType
}
