import type { VNode } from 'vue'
import lazyLoad from '../../directives/lazy';

export interface ImageProps {
  /**
   * 图片显示模式
   * - scaleToFill: 缩放填充整个容器（不保持比例）
   * - aspectFit: 保持比例缩放，完整显示图片
   * - aspectFill: 保持比例缩放，填充容器（可能裁剪）
   * - widthFix: 宽度固定，高度自适应
   * - heightFix: 高度固定，宽度自适应
   * - top: 顶部对齐
   * - bottom: 底部对齐
   * - center: 居中对齐
   * - left: 左对齐
   * - right: 右对齐
   * - topLeft: 左上对齐
   * - topRight: 右上对齐
   * - bottomLeft: 左下对齐
   * - bottomRight: 右下对齐
   */
  mode?:
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'heightFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'

  /**
   * 图片形状
   * - square: 方形
   * - circle: 圆形
   * - rounded: 圆角矩形
   */
  shape?: 'square' | 'circle' | 'rounded'

  /**
   * 圆角半径（当 shape 为 rounded 时生效）
   */
  radius?: number | string

  /**
   * 加载状态配置
   */
  // 是否显示加载中状态
  visible?: boolean
  placeholder?: string | VNode // 允许字符串或虚拟节点
  fallback?: string | VNode
  /**
   * 加载完成的回调
   */

  lazy?: boolean
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  // 底部内容
  footer?: string | VNode
  title?: string | VNode
  descriation?: boolean
  screen?: boolean
  lazyLoad?: boolean
}

export interface ImageEmits {
  (e: 'onLoad'): void
  (e: 'onClick'): void
  (e: 'onClose', event?: boolean): void // 可选参数
}
