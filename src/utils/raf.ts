// src/utils/index.ts
/**
 * 获取剩余秒数的详细信息
 * @param seconds 剩余秒数
 * @returns 天、时、分、秒对象
 */
export function getRemainingSecondsInfo(seconds: number) {
  return {
    d: Math.floor(seconds / (3600 * 24)),
    h: Math.floor((seconds % (3600 * 24)) / 3600),
    m: Math.floor((seconds % 3600) / 60),
    s: Math.floor(seconds % 60)
  }
}

// src/utils/raf.ts
/**
 * 取消requestAnimationFrame
 */
export function cancelRaf(timer: { id?: number }) {
  if (timer && timer.id) {
    cancelAnimationFrame(timer.id)
    timer.id = undefined
  }
}

/**
 * 使用requestAnimationFrame实现的setTimeout
 */
export function rafTimeout(callback: () => void, delay = 0, interval = false) {
	let start = performance.now()
	const raf = {
		// 引用类型保存，方便获取 requestAnimationFrame()方法返回的 ID.
		id: requestAnimationFrame(loop)
	}
	function loop(timestamp: number) {

		const elapsed = timestamp - start
		if (elapsed >= delay) {
			callback() // 执行目标函数func
			if (interval) {
				start = timestamp
				raf.id = requestAnimationFrame(loop)
			}
		} else {
			raf.id = requestAnimationFrame(loop)
		}
	}

	return raf
}
