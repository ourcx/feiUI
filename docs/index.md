---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "FeiUI"
  text: "一个轻量级的 Vue 3 组件库"
  tagline: 简洁、易用、学习实践
  image:
    src: /logo.png  # 可以添加你的组件库 logo
    alt: FeiUI
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quickstart
    - theme: alt
      text: 组件展示
      link: /components/button
    - theme: alt
      text: GitHub
      link: https://github.com/ourcx/feiUI

features:
  - icon: ⚡️
    title: Vue 3 技术栈
    details: 基于 Vue 3 + TypeScript 开发，学习现代前端技术的最佳实践
  - icon: 🎨
    title: 简洁设计
    details: 干净直观的 UI 设计，适合个人项目和小型应用
  - icon: 🔧
    title: 易于使用
    details: 简单的 API 设计，文档清晰，上手快速
  - icon: 📱
    title: 响应式
    details: 基础响应式支持，适配主流设备
  - icon: 🛡️
    title: TypeScript
    details: 完整的类型提示，提升开发体验
  - icon: 📚
    title: 学习项目
    details: 主要用于技术学习和实践，持续完善中

style: |
  :root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --vp-button-brand-bg: #4f46e5;
    --vp-button-brand-hover-bg: #4338ca;
  }
  
  .VPHome {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }
  
  .VPFeature {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    padding: 24px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .VPFeature:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
---

<div class="custom-home" style="text-align: center; margin-top: 40px; padding: 30px 0;">
  <div style="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
    <h3 style="color: #4f46e5; margin-bottom: 15px;">关于这个项目</h3>
    <p style="color: #666; line-height: 1.6;">
      这是一个个人学习项目，旨在通过实践深入理解 Vue 3 和组件库开发。
      项目还在不断完善中，欢迎反馈和建议！
    </p>
  </div>
</div>