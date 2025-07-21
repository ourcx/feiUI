
// 定义数据类型
type Data = {
  id: number;
  content: string;
};

// 修复接口名称和属性拼写
export interface ListProps {
  items: Data[];
  itemSize?: number;
  visibleCount?: number;
  title?: string;
  type?:'primary' | 'success' | 'info' | 'warning' | 'danger';
}

export interface ListEmits {
  (e: 'onClick', item: Data): void;
  (e: 'onScroll', scrollTop: number): void;
}
