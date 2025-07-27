export interface DatePickerProps {
  value?: string | Date | Array<Date> | Array<string>;
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  range?: boolean;
  format?: string;
  disabled?: boolean;
}

export interface DatePickerEmits {
  (e: 'change', value: string | Date | Array<string | Date>): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'clear'): void;
  (e:'value', value: string | Date | Array<string | Date>): void;
}
