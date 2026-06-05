<div align="center">

# 🎵 NCMGET

**A lightweight and powerful cli tool for NetEase Cloud Music Getter**

[![NPMX](https://img.shields.io/npm/v/ncmget?style=flat-square&label=npmx&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cmVjdCB4PSIyLjUiIHk9IjIuNSIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMy44IiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iNi4zIiB5PSIxMy41NSIgd2lkdGg9IjMuNyIgaGVpZ2h0PSIzLjciIHJ4PSIwLjkiIGZpbGw9IiNBOUE5QTkiLz48cGF0aCBkPSJNMTUuODUgNi40NUgxOC44NUwxMi41IDE5LjJIOS41TDE1Ljg1IDYuNDVaIiBmaWxsPSIjNTU1NTU1Ii8+PC9zdmc+&logoWidth=16)](https://npmx.dev/package/ncmget)
[![Node.js](https://img.shields.io/node/v/ncmget?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![License](https://img.shields.io/github/license/Roy-Jin/ncmget?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/ncmget?style=flat-square&logo=github)](https://github.com/Roy-Jin/ncmget)

**English** · [中文](README_CN.md)

</div>


## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎵 **Programmatic API** | NCMGET class with full TypeScript support |
| 💻 **CLI Toolkit** | Batch processing, filename templates, browser preview |
| 🌐 **REST Server** | Hono-powered API server with CORS |
| 🔐 **EAPI Encryption** | Native AES-128-ECB, zero dependencies |
| 📥 **Streaming Downloads** | Queue management, progress bars, auto-retry |

## 📦 Installation

```bash
# Global install
npm install -g ncmget

# Or use directly
npx ncmget --help
```

## 🚀 Quick Start

### CLI Usage

```bash
ncmget <command> [options]

# Examples
ncmget search "hello"              # Search songs
ncmget song 123456                 # Get song info
ncmget url 123456                  # Get song URL
ncmget serve                       # Start REST API server
```

### API Usage

```typescript
import { NCMGET } from 'ncmget';

const ncm = new NCMGET();

// Search songs
const songs = await ncm.search('hello');

// Get song URL
const url = await ncm.url(123456, 320);

// Get lyrics
const lrc = await ncm.lrc(123456);
```

## 📚 Documentation

- [Documentation (GH Pages)](https://roy-jin.github.io/ncmget)
- [Documentation (CF Pages)](https://ncmget.pages.dev)
- [Documentation (Netlify)](https://ncmget.netlify.app)

## 🔧 Build from Source

```bash
git clone https://github.com/Roy-Jin/ncmget.git
cd ncmget
npm install
npm run build
```

## 📄 License

[MIT](LICENSE) © Roy-Jin