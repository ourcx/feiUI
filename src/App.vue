<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import Item from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Alert from "./components/Alert/Alert.vue";
import { ref, onMounted, h, reactive } from "vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import type { TooltipInstance } from "./components/Tooltip/types";
import type { Options } from "@popperjs/core";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import type { MenuOption } from "./components/Dropdown/types";
import { createMessage } from "./components/Message/method";
import Input from "./components/Input/Input.vue";
import Code from "./components/Code/Code.vue";
import Switch from "./components/Switch/Switch.vue";
import Divider from "./components/Divider/Divider.vue";
import Markdown from "./components/Markdown/Markdown.vue";
import Select from "./components/Select/Select.vue";
import Form from "./components/Form/Form.vue";
import FormItem from "./components/Form/FormItem.vue";
import type { FormRules,FormModel } from '@/components/Form/types';


const tooltipRef = ref<TooltipInstance | null>(null);
const openedValue = ref(["a"]);
const trigger = ref<any>("click");
const open = () => {
  tooltipRef.value?.show();
};

const close = () => {
  tooltipRef.value?.hide();
};
const options: Partial<Options> = { placement: "bottom", strategy: "fixed" };

const optionsMenu: MenuOption[] = [
  { key: 1, label: "item" },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];

const inlineConsole = (label: string, key: MenuOption) => {
  console.log(label, key);
};

onMounted(() => {
  const instance = createMessage({
    message: "hello world",
    duration: 0,
  });
  createMessage({
    message: "hello worlaaaaaaaaaaaaaaaaaaad",
    duration: 0,
    type: "success",
  });
  createMessage({
    message: "hello world aadfavfbdvd",
    duration: 0,
    type: "danger",
  });

  setTimeout(() => {
    instance.destroy();
  }, 2000);
});

const input = ref("xxxxxxxxxxxxx");

const change = (e: any) => {
  console.log(e);
};
const model: FormModel = reactive({
  email: '',
  password: ''
});


const rules: FormRules = reactive({
  email: [{
    type: 'email', // 使用专门的 email 类型
    required: true,
    message: '请输入有效的邮箱地址',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  }, {
    min: 6,
    max: 20,
    message: '密码长度需在6-20个字符之间',
    trigger: 'blur'
  }]
});
</script>

<template>
  <main>
    <header>
      <Select
        :options="[
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
          { label: '选项三', value: '3', disabled: true },
        ]"
        model-value="1"
        placeholder="请选择"
        :render-label="(option) => h('span', option.label)"
      />
      <Select
        :options="[
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
          {
            label: '选项三',
            value: '3',
            disabled: true,
          },
        ]"
        clearable
        filterable
      />
      <Tooltip
        content="动态提示"
        :popperOptions="options"
        ref="tooltipRef"
        :openDelay="200"
        :trigger="trigger"
        ColorType="success"
        manual
      >
        <div style="height: 200px">xxxxxxx</div>
      </Tooltip>
    </header>
    <Button plain @click="open">你好</Button>
    <Button type="primary" @click="close">Hello World</Button>
    <Button type="danger" disabled>Hello World</Button>
    <Button type="danger">Hello World</Button>
    <br /><br />
    <Button type="primary" loading>加载按钮</Button>
    <Button type="primary" icon="arrow-up">带图标的按钮</Button>

    <Collapse v-model="openedValue">
      <Item name="a" arrow>
        <template #title>
          <h1>nice title</h1>
        </template>
        <h1>headline title</h1>
        <div>this is content a aaa</div>
      </Item>

      <Item name="b" title="nice title b item b" arrow>
        <div>this is bbbbb test</div>
      </Item>

      <Item name="c" title="nice cccc" disabled arrow>
        <div>this is cccc test</div>
      </Item>
    </Collapse>

    <Icon icon="fa-solid fa-user" color="red" />
    <Icon icon="user-secret" type="primary" disabled />
    <Icon icon="arrow-up" size="2xl" spin type="success" />

    <br />
    <Alert
      type="info"
      title="成功提示"
      description="这是一个成功提示的 Alert"
      :duration="800"
      animation
    />
    <Alert
      type="warning"
      title="警告提示"
      description="这是一个警告提示的 Alert"
      :duration="1600"
      animation
    />
    <Alert type="error" title="错误提示" description="这是一个错误提示的 Alert" />
    <Alert type="success" title="成功提示" description="这是一个成功提示的 Alert" />
    <Alert type="primary" title="信息提示" description="这是一个信息提示的 Alert" />
    <Alert title="信息提示" description="这是一个信息提示的 Alert" />
    <Alert
      type="error"
      title="错误提示"
      description="这是一个错误提示的 Alert"
      effect="light"
    />
    <Alert
      type="success"
      title="成功提示"
      description="这是一个成功提示的 Alert"
      effect="dark"
    />
    <Alert
      type="info"
      title="信息提示"
      description="这是一个信息提示的 Alert"
      effect="dark"
    />
    <Alert
      type="warning"
      title="警告提示"
      description="这是一个警告提示的 Alert"
      effect="light"
    />
    <Alert
      type="primary"
      title="信息提示"
      description="这是一个信息提示的 Alert"
      effect="dark"
    />
    <Alert
      type="primary"
      title="信息提示"
      description="这是一个信息提示的 Alert"
      effect="light"
    />
    <br />
    <Alert type="info" title="成功提示" description="这是一个成功提示的 Alert" disIcon />
    <Alert
      type="warning"
      title="警告提示"
      description="这是一个警告提示的 Alert"
      disIcon
    />
    <Alert type="error" title="错误提示" description="这是一个错误提示的 Alert" disIcon />
    <Alert
      type="primary"
      title="信息提示"
      description="这是一个信息提示的 Alert"
      disIcon
    />
    <Alert
      type="success"
      title="成功提示"
      description="这是一个成功提示的 Alert"
      disIcon
    />
    <Alert
      type="primary"
      title="信息提示"
      description="这是一个信息提示的 Alert"
      disIcon
      effect="dark"
    />
    <Dropdown
      :menuOptions="optionsMenu"
      placement="bottom"
      :trigger="trigger"
      @visible-change="(key:boolean) => inlineConsole('ssss', key as any)"
      @select="(key) => inlineConsole('ssss1111', key)"
    >
      <div>
        <Button type="primary" @click="trigger = 'click'" width="100px">click</Button>
      </div>
    </Dropdown>
    <Input type="text" v-model="input" clearable />
    <Input type="text" v-model="input" show-password @change="change($event)" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div contenteditable="true">
      这是一个可编辑的区域。使用contenteditable属性来启用编辑框。
    </div>
    <br />
    <Code code="javascript" initialCode="const = 1;" editable :copyable="false" />
    <br />
    <br />
    <br />
    <Code
      code="javascript"
      initialCode="const = 1;"
      editable
      theme="github-light"
      type="primary"
    />
    <br />
    <br />
    <Switch
      @change="
        (value) => {
          console.log(value);
        }
      "
      active-text="ON"
      inactive-text="OFF"
    />
    <br />
    <br />
    <br />
    <br />
    <Divider orientation="right">你好</Divider>
    <Divider orientation="left">fei组件库</Divider>
    <Divider vertical></Divider>

    <br />
    <br />
    <Markdown src="../README.md" />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Form :model="model" :rules="rules">
      <FormItem label="用户名" prop="username">
        <Input type="text" v-model="model.email"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input type="password" v-model="model.password"></Input>
      </FormItem>
      <div>
        <Button type="primary">Submit</Button>
        <Button>Cancel</Button>
      </div>
    </Form>
    <p>
    form:
    <pre>{{ model }}</pre>
    </p>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
