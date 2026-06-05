---
pageType: home
hero:
  name: NCMGET
  text: |
    NetEase Cloud
    Music Getter
  tagline: Lightweight, powerful, and type-safe
  image:
    src: /logo.webp
    alt: NCMGET Logo
  actions:
    - text: Get Started
      link: /introduction
      theme: brand
    - text: GitHub
      link: https://github.com/Roy-Jin/ncmget
      theme: alt
features:
  - icon: 🎵
    title: Programmatic API
    details: Chainable NCMGET class with search, song, album, artist, playlist, url, lrc, pic — cookie injection, raw mode, and auto-retry built in. Full TypeScript types exported.
    link: /core/introduction
  - icon: 💻
    title: CLI Toolkit
    details: Rich commands — serve, search, song, album, playlist, lrc, pic, info, preview. Batch IDs, filename templating, and browser preview out of the box.
    link: /introduction#command-overview
  - icon: 🌐
    title: REST API Server
    details: Hono-powered HTTP server with global CORS, per-request NCMGET isolation, Cookie passthrough, and raw response toggle — deploy and query instantly.
    link: /server
  - icon: 🔐
    title: EAPI Encryption
    details: Native NCM EAPI encryption via AES-128-ECB with encrypted-id derivation (XOR + MD5 + Base64). Zero reverse-engineering required.
    link: /core/advanced#eapi-encryption
  - icon: 📥
    title: Streaming Downloads
    details: Queue-based manager with streaming writes, real-time progress bars, auto-retry on failure, filename templating ({name}-{artist}), and illegal-character sanitization.
    link: /best-practices
  - icon: 📝
    title: End-to-End Type Safety
    details: SongData, UrlData, LrcData, SearchOption — strict interfaces covering every API response. Ship with confidence, no any types.
    link: /core/types
---