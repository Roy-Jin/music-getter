---
pageType: home
hero:
  name: NCMGET
  text: 网易云音乐获取工具
  tagline: 轻量、强大、类型安全的网易云音乐获取工具 — 搜索、下载、服务一站搞定
  image:
    src: /logo.webp
    alt: NCMGET Logo
  actions:
    - text: 快速开始
      link: /zh/introduction
      theme: brand
    - text: Core API
      link: /zh/core/introduction
      theme: alt
    - text: GitHub
      link: https://github.com/Roy-Jin/ncmget
      theme: alt
features:
  - icon: 🎵
    title: Core API
    details: 完整的编程式 API，NCMGET 类封装搜索、歌曲、专辑、歌手、歌单、URL、歌词、封面等全部能力，完整 TypeScript 类型导出
    link: /zh/core/introduction
  - icon: 💻
    title: 9 个命令
    details: ncmget serve、search、song、album、playlist、lrc、pic、info、preview — 终端一站搞定
    link: /zh/introduction
  - icon: 🌐
    title: HTTP 服务器
    details: 内置 Hono 驱动的 REST API 服务器，全局 CORS、请求隔离、Cookie 和原始模式支持
    link: /zh/core/server
  - icon: 🔐
    title: EAPI 加密
    details: 原生网易云音乐 EAPI 加密（AES-128-ECB），无需逆向即可无缝访问 API
    link: /zh/core/advanced
  - icon: 📥
    title: 下载管理
    details: 基于队列的流式下载，进度条、自动重试、文件名模板、非法字符自动清理
    link: /zh/best-practices
  - icon: 📝
    title: 类型安全
    details: SongData、UrlData、LrcData、SearchOption — 完整 TypeScript 类型定义，开箱即用
    link: /zh/core/types
---
