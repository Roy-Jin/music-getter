---
pageType: home
hero:
  name: NCMGET
  text: NetEase Cloud Music Getter
  tagline: A lightweight, powerful, and type-safe cli tool for NetEase Cloud Music — search, download, and serve.
  image:
    src: /logo.webp
    alt: NCMGET Logo
  actions:
    - text: Get Started
      link: /introduction
      theme: brand
    - text: Core API
      link: /core/introduction
      theme: alt
    - text: GitHub
      link: https://github.com/Roy-Jin/ncmget
      theme: alt
features:
  - icon: 🎵
    title: Core API
    details: Complete programmatic API with NCMGET class — search, song, album, artist, playlist, url, lrc, pic. Full TypeScript support with exported types.
    link: /core/introduction
  - icon: 💻
    title: 9 Commands
    details: ncmget serve, search, song, album, playlist, lrc, pic, info, preview — everything you need from the terminal.
    link: /introduction
  - icon: 🌐
    title: HTTP Server
    details: Built-in REST API server powered by Hono. CORS-enabled, per-request isolation, cookie and raw mode support.
    link: /core/server
  - icon: 🔐
    title: EAPI Encryption
    details: Native NetEase Cloud Music EAPI encryption with AES-128-ECB. Seamless API access without reverse engineering.
    link: /core/advanced
  - icon: 📥
    title: Download Manager
    details: Queue-based download with streaming, progress bars, auto-retry, filename templating, and illegal character sanitization.
    link: /best-practices
  - icon: 📝
    title: Type Safe
    details: SongData, UrlData, LrcData, SearchOption — full TypeScript definitions exported and ready to use.
    link: /core/types
---
