//处理宽高,根据是数字还是字符串
const imgStyle = function (width: string | number, height: string | number) {
  if (typeof width === 'number' && typeof height === 'number') {
    return {
      width: `${width}px`,
      height: `${height}px`
    }
  }else{
    return {
      width: width,
      height: height
    }
  }
}

export default imgStyle
