module.export={
  plugins: [
    require('postcss-nested'),
    require('autoprefixer'),
    autoprefixer({ // 兼容市面所有版本浏览器
      browsers: ("> 0% ")
    }),
    require('postcss-for')
  ],
}
// This file is used to configure PostCSS plugins.
// The `postcss-nested` plugin allows you to use nested rules in your CSS.
