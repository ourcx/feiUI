<script setup lang="ts">
import { cancelRaf, rafTimeout } from '@/utils/raf'
import { onUnmounted, ref, watch, onMounted } from 'vue'
import type { TimeCountDownProps } from './type';

function getRemainingSecondsInfo(seconds: number) {
  return {
    d: Math.floor(seconds / (3600 * 24)),
    h: Math.floor((seconds % (3600 * 24)) / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: Math.floor(seconds % 60)
  }
}

defineOptions({ name: 'TimeCountDown' })

const props = withDefaults(defineProps<TimeCountDownProps>(), {
  record: () => ({
    local_leftSeconds: 0,
    local_isExpired: true,
    local_leftDay: 0,
    local_leftHMS: '00:00:00'
  }),
  update: false,
  type: 'primary'
})

// 定时器引用
let countdownTimer: { id?: number } | null = null
let lastTimestamp = 0

const isExpired = ref(props.record.local_isExpired)
const leftSeconds = ref(props.record.local_leftSeconds)
const leftDay = ref(props.record.local_leftDay || 0)
const leftHMS = ref(props.record.local_leftHMS)

const doubleNumStr = (num: number) => `0${num || 0}`.slice(-2)

/**
 * 更新显示状态
 */
function updateDisplayState(seconds: number) {
  console.log('updateDisplayState:', seconds) // 调试用

  if (seconds <= 0) {
    isExpired.value = true
    leftSeconds.value = 0
    leftDay.value = 0
    leftHMS.value = '00:00:00'

    if (props.update) {
      Object.assign(props.record, {
        local_isExpired: true,
        local_leftSeconds: 0,
        local_leftDay: 0,
        local_leftHMS: '00:00:00'
      })
    }
    return
  }

  const { d, h, m, s } = getRemainingSecondsInfo(seconds)
  const hms = `${doubleNumStr(h)}:${doubleNumStr(m)}:${doubleNumStr(s)}`

  isExpired.value = false
  leftSeconds.value = seconds
  leftDay.value = d
  leftHMS.value = hms

  if (props.update) {
    Object.assign(props.record, {
      local_isExpired: false,
      local_leftSeconds: seconds,
      local_leftDay: d,
      local_leftHMS: hms
    })
  }
}

/**
 * 更新倒计时状态
 */
function updateCountdown() {
  const now = Date.now()
  const elapsedSeconds = Math.floor((now - lastTimestamp) / 1000)

  console.log('updateCountdown:', { elapsedSeconds, leftSeconds: leftSeconds.value }) // 调试用

  if (elapsedSeconds >= 1) { // 改为 >= 1 确保至少过去1秒
    lastTimestamp = now
    const remainingSeconds = Math.max(leftSeconds.value - elapsedSeconds, 0)

    updateDisplayState(remainingSeconds)

    if (remainingSeconds > 0) {
      countdownTimer = rafTimeout(() => {
        updateCountdown()
      }, 1000)
    } else {
      stopCountdown()
    }
  } else {
    // 如果时间不够1秒，继续等待
    countdownTimer = rafTimeout(() => {
      updateCountdown()
    }, 1000 - (now - lastTimestamp))
  }
}

/**
 * 启动倒计时
 */
function startCountdown() {
  console.log('startCountdown:', leftSeconds.value) // 调试用
  stopCountdown()

  if (leftSeconds.value > 0) {
    lastTimestamp = Date.now()
    updateCountdown()
  } else {
    updateDisplayState(0)
  }
}

/**
 * 停止倒计时
 */
function stopCountdown() {
  if (countdownTimer) {
    cancelRaf(countdownTimer)
    countdownTimer = null
  }
}

/**
 * 组件挂载时启动倒计时
 */
onMounted(() => {
  console.log('onMounted:', props.record.local_leftSeconds) // 调试用
  if (props.record.local_leftSeconds > 0) {
    startCountdown()
  }
})

/**
 * 监听props变化
 */
watch(
  () => props.record.local_leftSeconds,
  (newSeconds) => {
    console.log('watch local_leftSeconds:', newSeconds) // 调试用
    const seconds = Math.max(newSeconds, 0)
    if (seconds !== leftSeconds.value) {
      leftSeconds.value = seconds
      updateDisplayState(seconds)
      if (seconds > 0) {
        startCountdown()
      } else {
        stopCountdown()
      }
    }
  },
  { immediate: true }
)

/**
 * 组件卸载时清除定时器
 */
onUnmounted(() => {
  stopCountdown()
})
</script>

<template>
  <div class="countdown-container" :class="{ [`fei-TimeCountDown-${type}`]: type }">
    <slot v-bind="{ leftDay, leftHMS, isExpired, leftSeconds }">
      <div v-if="isExpired" class="expired-text">已过期</div>
      <div v-else class="countdown-content">
        <div class="fei-CountDown-item" v-if="leftDay > 0">
          <span class="countdown-item">{{ leftDay < 10 ? '0' + leftDay : leftDay }}</span>
              <span class="countdown-item-label">天</span>
        </div>
        <span class="countdown-separator" v-if="leftDay > 0">:</span>
        <div class="fei-CountDown-item">
          <span class="countdown-item">{{ leftHMS?.split(':')[0] }}</span>
          <span class="countdown-item-label">时</span>
        </div>
        <span class="countdown-separator">:</span>
        <div class="fei-CountDown-item">
          <span class="countdown-item">{{ leftHMS?.split(':')[1] }}</span>
          <span class="countdown-item-label">分</span>
        </div>
        <span class="countdown-separator">:</span>
        <div class="fei-CountDown-item">
          <span class="countdown-item">{{ leftHMS?.split(':')[2] }}</span>
          <span class="countdown-item-label">秒</span>
        </div>
      </div>
    </slot>
  </div>
</template>
