<template>
  <form class="fei-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import type {
  FormProps,
  FormItemContext,
  FormContext,
  FormValidateFailure,
  FormInstance,
} from "./types";
import type { ValidateFieldsError } from "async-validator";
import { formContextKey } from "./types";
import { provide } from "vue";

defineOptions({
  name: "FeiForm",
});

const props = defineProps<FormProps>();
const fields: FormItemContext[] = [];
const addField: FormContext["addField"] = (field) => {
  fields.push(field);
};
const removeField: FormContext["removeField"] = (field) => {
  if (!field.prop) return;
  fields.splice(fields.indexOf(field), 1);
};
provide(formContextKey, { ...props, addField, removeField });


const resetFields = (keys:string[]=[]) => {
  const filterArr = keys.length>0 ? fields.filter(item=>keys.includes(item.prop)) : fields;
  filterArr.forEach(item=>{
    item.resetField();
  })
}
const clearValidate = (keys:string[]=[]) => {
  const filterArr = keys.length>0 ? fields.filter(item=>keys.includes(item.prop)) : fields;
  filterArr.forEach(item=>{
    item.clearValidate();
  })
}
const validate = async () => {
  let validationError: ValidateFieldsError = {};
  //使用allSettled,拿到每一个promise，并且不管成功与否
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (e: any) {
      const error = e as FormValidateFailure;
      validationError = {
        ...validationError,
        ...error.fields,
      };
    }
  }
  if (Object.keys(validationError).length === 0) {
    //没有任何错误
    return true;
  } else {
    return Promise.reject(validationError);
  }
};

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidate,
});
</script>
