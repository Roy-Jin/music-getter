---
pageType: home
hero:
  name: NCMGET
  text: |
    网易云音乐
    获取工具
  tagline: 轻量、强大、类型安全
  image:
    src: /logo.webp
    alt: NCMGET Logo
  actions:
    - text: 快速开始
      link: /zh/introduction
      theme: brand
    - text: GitHub
      link: https://github.com/Roy-Jin/ncmget
      theme: alt
features:
  - icon: 🎵
    title: 编程式 API
    details: 可链式调用的 NCMGET 类，封装 search、song、album、artist、playlist、url、lrc、pic 全部能力，内置 Cookie 注入、原始模式与自动重试，完整 TypeScript 类型导出
    link: /zh/core/introduction
  - icon: 💻
    title: CLI 工具集
    details: 丰富的命令 — serve、search、song、album、playlist、lrc、pic、info、preview，支持批量 ID、文件名模板、浏览器试听，终端一站搞定
    link: /zh/introduction#命令概览
  - icon: 🌐
    title: REST API 服务器
    details: 基于 Hono 的 HTTP 服务器，全局 CORS、请求级 NCMGET 隔离、Cookie 透传与原始响应切换，部署即可查询
    link: /zh/server
  - icon: 🔐
    title: EAPI 加密
    details: 原生 NCM EAPI 加密（AES-128-ECB），含 encrypted_id 推导（XOR + MD5 + Base64），零逆向成本直连 API
    link: /zh/core/advanced#eapi-加密
  - icon: 📥
    title: 流式下载
    details: 队列式下载管理器，流式写入、实时进度条、失败自动重试、文件名模板（{name}-{artist}）、非法字符自动清理
    link: /zh/best-practices
  - icon: 📝
    title: 端到端类型安全
    details: SongData、UrlData、LrcData、SearchOption — 严格接口覆盖所有 API 响应，拒绝 any，放心交付
    link: /zh/core/types
---