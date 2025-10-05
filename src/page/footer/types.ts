export interface FooterProps {
  height?: string | number;
  width?: string | number;
  background?: string;
  color?: string;
  border?: string;
  padding?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  bottom?: string;
  main?: string[];
  copyright?: string[];
  social?: string[];
  right?: string;
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
}
