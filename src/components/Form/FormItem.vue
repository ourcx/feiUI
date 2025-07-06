<template>
  <div class="fei-form-item"
  :class="{
    'is-error':validatorStatus.status==='error',
    'is-success':validatorStatus.status==='success',
    'is-loading':validatorStatus.loading,
  }"
  >
    <label class="fei-form-item_label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="fei-form-item_content">
      <slot :validate="validate"/>
      <!-- validate 验证方法，针对原生表单的验证，就是插槽用原生input也能生效 -->
      <div class="fei-form-item_error-msg" v-if="validatorStatus.status==='error'">{{ validatorStatus.errorMsg }}</div>
    </div>
    <button @click.prevent="validate">dianjjjjjj</button>
  </div>
</template>

<script setup lang="ts">
import type { FormItemProps,FormValidateFailure,FormItemContext } from "./types";
import { inject, computed,reactive, provide } from "vue";
import Schema from "async-validator";
//表单验证库

import { isNil } from "lodash-es";
import { formContextKey,formItemContextKey } from "./types";

defineOptions({
  name: "FeiFormItem",
});

const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);

const validatorStatus = reactive({
  status:'init',
  errorMsg :'',
  loading:false
})

const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});

const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
});
//根据props提取值和规则


const validate = () => {
  const modelName = props.prop;
  if (!modelName) return;

  // 确保值为字符串类型
  const value = String(innerValue.value);

  // 如果没有规则，直接标记为成功
  if (itemRules.value.length === 0) {
    validatorStatus.status = 'success';
    validatorStatus.errorMsg = '';
    return;
  }

  // 创建验证器
  const validator = new Schema({
    [modelName]: itemRules.value
  });

  validatorStatus.loading = true;

  validator.validate({ [modelName]: value })
    .then(() => {
      validatorStatus.status = 'success';
      validatorStatus.errorMsg = '';
      console.log(`${modelName} 验证成功`);
    })
    .catch((e: any) => {
      validatorStatus.status = "error";

      // 增强的错误提取
      let errorMessage = '验证失败';

      // 处理各种可能的错误结构
      if (Array.isArray(e)) {
        errorMessage = e[0]?.message || errorMessage;
      } else if (e.errors && Array.isArray(e.errors)) {
        errorMessage = e.errors[0]?.message || errorMessage;
      } else if (e.message) {
        errorMessage = e.message;
      }

      validatorStatus.errorMsg = errorMessage;
      console.log(`${modelName} 验证失败:`, e);
    })
    .finally(() => {
      validatorStatus.loading = false;
    });
};

const context:FormItemContext = {
  validate
}
provide(formItemContextKey, context);
</script>
