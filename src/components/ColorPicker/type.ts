export interface ColorPickerProps {
  isWidget?: boolean;// 是否为弹窗
  format?: "rgb" | "prgb" | "hex" | "hex6" | "hex3" | "hex4" | "hex8" | "name" | "hsl" | "hsv"; // 颜色格式
  shape?: "circle" | "square"; // 颜色形状
  pureColor?: string; // 纯色
  gradientColor?: string; // 渐变色
  pickerType?: "fk" | "chrome"; // 选择器类型
  useType?: "pure" | "gradient" | "both"; // 使用类型
  disableHistory?: boolean; // 禁用历史记录
  roundHistory?: boolean; // 禁用历史记录
  disableAlpha?: boolean; // 禁用透明度
  zindex?: number; // z-index
  width?: number;
  height?: number;
}



export interface ColorPickerEmits {
  (e: "change", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "update:pureColor", value: string): void;
  (e: "update:gradientColor", value: string): void;
  (e: "update:pickerType", value: string): void;
  (e: "update:disableHistory", value: boolean): void;
  (e: "update:roundHistory", value: boolean): void;
  (e: "update:disableAlpha", value: boolean): void;
  (e: "update:isWidget", value: boolean): void;
}
