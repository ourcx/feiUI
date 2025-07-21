const lazyLoad = {
  mounted (el: any, binding: any) {
    // 类型校验
    if (typeof binding.value !== 'string') {
      console.warn('需要图片URL')
      return
    }else if (binding.value=='') return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 图片进入视口时加载
            el.src = binding.value

            // 加载失败处理
            el.onerror = () => {
              console.error(`失败: ${binding.value}`)
              el.src = '' // 清空无效 src 或设置默认图
            }

            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.1 // 当10%的图片进入视口时触发
      }
    )

    observer.observe(el)

    // 保存 observer 到 el 属性上，便于卸载时清除
    el._lazyLoadObserver = observer
  }
}


export default lazyLoad
