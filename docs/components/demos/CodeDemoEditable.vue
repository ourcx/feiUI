<template>
  <div class="demo-block">
    <h4>可编辑的代码块</h4>
    <FeiCode
      :editable="true"
      :initialCode="editableCode"
      code="javascript"
      :copyable="true"
      @update:modelValue="handleCodeUpdate"
      @edit="handleEdit"
      @copy="handleCopy"
    />
    <div v-if="lastAction" class="action-message">
      最后操作: {{ lastAction }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FeiCode from "../../../src/components/Code/Code.vue";

const editableCode = `// 尝试编辑这段代码
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 计算前10个斐波那契数
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`;

const lastAction = ref('');

const handleCodeUpdate = (newCode) => {
  lastAction.value = `代码已更新，新代码长度: ${newCode.length} 字符`;
  console.log('Code updated:', newCode);
};

const handleEdit = (isEditing) => {
  lastAction.value = isEditing ? '进入编辑模式' : '退出编辑模式';
};

const handleCopy = (copiedCode) => {
  lastAction.value = `代码已复制: ${copiedCode.length} 字符`;
};
</script>

<style scoped>
.action-message {
  margin-top: 10px;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
}
</style>
