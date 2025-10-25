<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import Item from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Alert from "./components/Alert/Alert.vue";
import { ref, onMounted, h, reactive, computed } from "vue";
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
import StatuesBar from "./page/bar/StatuesBar.vue";
import Dialog from "./components/Dialog/Dialog.vue";
import Slider from "./components/Slider/Slider.vue";
import Image from "./components/Image/Image.vue";
import Links from "./components/Links/Links.vue";
import List  from "./components/List/List.vue";
import DatePicker from "./components/DatePicker/DatePicker.vue";
import Comment from "./components/Comment/Comment.vue";
import Drawer from "./components/Drawer/Drawer.vue";
import BackTop from "./components/BackTop/BackTop.vue";
import Tag from "./components/Tag/Tag.vue";
import Space from "./components/Space/Space.vue";
import Point from "./components/Point/Point.vue";
import QRcode from "./components/QRcode/ORcode.vue";
import Swiper from "./components/Swiper/Swiper.vue";
import SwiperItem from "./components/Swiper/Swiper-item.vue";
import ColorPicker from "./components/ColorPicker/ColorPicker.vue";
import Text from "./svg/Text/Text.vue";
import Math from "./svg/Math/Math.vue";
import Footer from "./page/footer/footer.vue";
import Tinymce from "./components/Tinymce/Tinymce.vue";
import Card from "./components/Card/Card.vue";
import Split from "./components/Split/Split.vue";
import Line from "./D3/Line/Line.vue";
import Histogram from "./D3/Histogram/Histogram.vue";
import Hexbin from "./D3/Hexbin/Hexbin.vue";
import Treemap from "./D3/Treemap/Treemap.vue";

const tooltipRef = ref<TooltipInstance | null>(null);
const openedValue = ref(["a"]);
const trigger = ref<"click" | "focus" | "hover">("click");
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
  email: '@qq.com',
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
  }],
  confirmPwd: [{
    required: true,
    message: '请输入确认密码',
    trigger: 'blur'
  }]
});

//缺少一个自定义规则，确定两个输入的内容相同等等


const formRef = ref();
const submit = async () => {
  try {
    await formRef.value.validate();
    //那到表单的整体校验
    console.log('提交成功');
  }catch (e: any) {
    console.log(e);
  }
}

const reset = () => {
  formRef.value.resetFields();
}

const myStatusBar = ref<InstanceType<typeof StatuesBar> | null>(null);
const closeStatusBar = () => {
  myStatusBar.value?.scrollPinch()
}

const visibleDrawer = ref<boolean>(false);
const handleBeforeClose = (done: () => void) => {
  visibleDrawer.value = false;
  done();
}

const pureColor = ref('#71afe5');
const handleColorUpdate = (e:any) => {
  console.log(e);
}

const wordData = ref([
  { text: 'Vue', value: 100 },
  { text: 'TypeScript', value: 85 },
  { text: 'JavaScript', value: 95 },
  { text: 'React', value: 80 },
  { text: 'Node.js', value: 75 },
  { text: 'Python', value: 70 },
  { text: '数据可视化', value: 65 },
  { text: '前端开发', value: 90 },
  { text: 'CSS', value: 85 },
  { text: 'HTML', value: 80 },
  { text: 'Webpack', value: 60 },
  { text: 'Vite', value: 55 },
  { text: '组件库', value: 50 },
  { text: '响应式', value: 45 },
])

// 主题颜色
const isDarkTheme = ref(false)
const colors = computed(() =>
  isDarkTheme.value
    ? ['#ff6b6b', '#ffa8a8', '#ffd8a8', '#d8f5a2', '#96f2d7', '#63e6be', '#38d9a9']
    : ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2']
)

const selectedWord = ref<{ text: any } | null>(null)
const wordCloudRef = ref()

// 方法
const handleWordClick = (word: { text: any; }, event: any) => {
  selectedWord.value = word
  console.log('点击词汇:', word.text, event)
}

const handleWordHover = (word: { text: any; }, event: any) => {
  console.log('悬停词汇:', word.text)
}

const handleWordLeave = (word:any) => {
  console.log('离开词汇:', word.text)
}

const handleLayoutComplete = (words: any[]) => {
  console.log('布局完成，词汇数量:', words.length)
}

</script>

<template>
  <main>
  <BackTop>返回顶部</BackTop>
  <Drawer title="测试抽屉" :visible="visibleDrawer" @close="closeStatusBar" mask :before-close="handleBeforeClose"></Drawer>
  <StatuesBar status="success" title="表单" description="feiUI" ref="myStatusBar" @click="closeStatusBar">
  <template #befor>
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
      /></template>
  </StatuesBar>
  <Dialog title="测试-你好世界" type="success" :exist="false">
  <template #body>
  <p>你好世界</p>
  </template>
  </Dialog>
    <header>
      <Select
        :options="[
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
          { label: '选项三', value: '3', disabled: true },
        ]"
        model-value="1"
        placeholder="请选择"
      >
        <template #label="{ option }">
          <span>{{ option.label }}</span>
        </template>
      </Select>
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
    <Button type="danger" @click="visibleDrawer = !visibleDrawer">Hello World</Button>
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
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="用户名" prop="email">
        <Input type="text" v-model="model.email"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <template #label="{ label }">
          <Button>{{ label }}</Button>
        </template>
        <Input type="password" v-model="model.password"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="confirmPassword">
        <Button type="primary" @click="submit">Submit</Button>
        <Button @click.prevent="reset">Cancel</Button>
      </FormItem>
    </Form>
    <p>
    form:
    <pre>{{ model }}</pre>
    </p>
    <Slider type="success" show-stops ShowValue/>
    <Slider type="success" show-stops ShowValue progress :value="12"/>
    <br>
    <br>
    <br>
    <Image src="https://picsum.photos/200/300" mode="aspectFill" shape="square" title="title"  footer="footer" screen />
    <Links src="https://picsum.photos/200/300" name="name" description="description"  href="https://picsum.photos/200/300"/>
    <br>
    <br>
    <br>
<!-- 正确使用方式 -->
<List
  :items="Array.from({length: 100}, (_, i) => ({
    id: i,
    content: `Item ${i+1}`
  }))"
  :itemSize="60"
  :visibleCount="15"
  title="List一千万条数据展示"
  type="success"
/>
<br>
<br>
<DatePicker/>
<br>
<br>
<br>
<br>
<DatePicker type="success" range />
<br>
<br>
<br>
<br>
<Comment :reply="{content: '你在干嘛',author: '小海', datetime:'2021-01-01 00:00:00'}" content="这是评论内容" author="小海" datetime="2021-01-01 00:00:00"/>
<br>
<br>
<br>
  <Tag body="这是标签内容" :visible="true" round disabled></Tag>
  <Tag body="llm" :visible="true" round></Tag>
  <Tag body="viest" :visible="true" checkable :bordered="false"></Tag>
  <Tag body="css" :visible="true" checkable type="success"></Tag>


  <br>
  <br>
  <Space align="center" dirction="horizontal" size="middle" :wrap="true">
    <Tag body="是space包裹的标签内容" :visible="true" round disabled></Tag>
  <Tag body="llm" :visible="true" round></Tag>
  <Tag body="viest" :visible="true" checkable :bordered="false"></Tag>
  <Tag body="css" :visible="true" checkable type="success"></Tag>
  </Space>
  <br>
  <br>
  <br>
  <QRcode value="https://github.com"></QRcode>
  <br>
  <br>
  <br>
  <Point text="1024节日快乐!!" :width="800" :scale-val="0.8" :height="300"/>

  <br>
  <br>
  <br>
  <br>
  <Swiper :autoplay="false">
  <SwiperItem color="red">1</SwiperItem>
  <SwiperItem color="blue">2</SwiperItem>
  <SwiperItem color="green">3</SwiperItem>
  <SwiperItem color="pink">4</SwiperItem>
  </Swiper>
  <br>
  <br>
  <br>
  <ColorPicker   @update:pureColor="handleColorUpdate" />
  <br>
  <br>
 <Text
        :data="wordData"
        :colors="colors"
        :fontSizeRange="[20, 80]"
        :rotations="[-45, 0, 45]"
        autoFit
        @wordClick="handleWordClick"
        @wordHover="handleWordHover"
        @wordLeave="handleWordLeave"
        @layoutComplete="handleLayoutComplete"
        ref="wordCloudRef"
      ></Text>

  <br>
  <br>
    <Tinymce/>
    <Math/>
    <Math format="i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[ -\frac{\hbar^2}{2m}\nabla^2 + V(\mathbf{r},t) \right]\Psi(\mathbf{r},t)" />
    <Math format="\frac{1}{2}\sum_{i=1}^n x_i^2" />
    <br>
    <br>
    <br>
    <br>
    <Card type="success" title="xxxxxxxxxxx"></Card>
    <br>
    <br>
    <br>
    <Split title="xxxxxxxxxxx" >
    <template #left >
      <div style="padding: 20px;">
        这是左侧内容区域。你可以在这里放置任何你想要的内容，比如导航菜单、工具栏等。
      </div>
    </template>
    <template #right >
      <div style="padding: 20px;">
        这是右侧内容区域。你可以在这里放置主要内容，比如文本、图片、表格等。
      </div>
    </template>
    </Split>
        <Split title="例子2"  type="primary">
    <template #left >
      <div style="padding: 20px;">
        这是左侧内容区域。你可以在这里放置任何你想要的内容，比如导航菜单、工具栏等。
      </div>
    </template>
    <template #right >
      <div style="padding: 20px;">
        这是右侧内容区域。你可以在这里放置主要内容，比如文本、图片、表格等。
      </div>
    </template>
    </Split>
    <br>
    <br>
    <br>
    <br>
    <Line/>
    <br>
    <br>
    <br>
    <br>
    <br>
    <Line :isShowGrid="false" />
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <Histogram/>
    <br>
    <br>
    <br>
    <br>
    <Hexbin/>
    <br>
    <br>
    <br>
    <br>
    <Treemap/>
    <br>
    <Treemap :type="'success'" :borderWidth="2"/>
  <Footer> </Footer>
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
