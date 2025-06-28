import { describe, it, expect, vi, beforeAll } from 'vitest';
import { h } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import Collapse from './Collapse.vue';
import CollapseItem from './CollapseItem.vue';

let wrapper: VueWrapper<any>;
let headers: ReturnType<typeof wrapper.findAll>;
let contents: ReturnType<typeof wrapper.findAll>;
let Change: ReturnType<typeof vi.fn>;

beforeAll(async () => {
  Change = vi.fn();
  const TestComponent = {
    setup() {
      return () =>
        h(
          Collapse,
          { modelValue: ['1'], onChange: Change },
          {
            default: () => [
              h(CollapseItem, { name: '1', title: 'title a' }, () => 'Item 1'),
              h(CollapseItem, { name: '2', title: 'title b' }, () => 'Item 2'),
              h(CollapseItem, { name: '3', title: 'title c', disabled: true }, () => 'Item 3'),
            ],
          }
        );
    },
  };

  wrapper = mount(TestComponent, {
    global: {
      stubs: {
        Icon: true,
      },
    },
    attachTo: document.body,
  });

  await new Promise(resolve => setTimeout(resolve, 0));
  headers = wrapper.findAll('.fei-collapse-item__header');
  contents = wrapper.findAll('.fei-collapse-item__wrapper');
});

describe('Collapse', () => {
  describe('渲染', () => {
    it('应渲染正确数量的 header 和内容', () => {
      expect(headers.length).toBe(3);
      expect(contents.length).toBe(3);
    });

    it('标题文本正确', () => {
      expect(headers[0].text()).toContain('title a');
      expect(headers[1].text()).toContain('title b');
      expect(headers[2].text()).toContain('title c');
    });

    it('内容文本正确', () => {
      expect(contents[0].text()).toContain('Item 1');
      expect(contents[1].text()).toContain('Item 2');
      expect(contents[2].text()).toContain('Item 3');
    });
  });

  describe('交互行为', () => {
    it('初始第一个内容可见', () => {
      expect(contents[0].isVisible()).toBeTruthy();
    });

    it('点击 header 展开/收起内容', async () => {
      await headers[0].trigger('click');
      expect(contents[0].isVisible()).toBeFalsy();

      await headers[1].trigger('click');
      expect(contents[1].isVisible()).toBeTruthy();
    });

    it('onChange 回调正确', async () => {
      expect(Change).toHaveBeenCalledWith([]);
      await headers[0].trigger('click');
      expect(Change).toHaveBeenCalledWith(['2']);
    });
  });

  describe('禁用项', () => {
    it('点击 disabled 的 header 不会展开内容', async () => {
      await headers[2].trigger('click');
      expect(contents[2].isVisible()).toBeFalsy();
    });
  });
});
