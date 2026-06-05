<div align="center">

# 🎵 NCMGET

**一个轻量级且功能强大的命令行界面工具，用于获取网易云音乐资源**

[![NPMX](https://img.shields.io/npm/v/ncmget?style=flat-square&label=npmx&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cmVjdCB4PSIyLjUiIHk9IjIuNSIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMy44IiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iNi4zIiB5PSIxMy41NSIgd2lkdGg9IjMuNyIgaGVpZ2h0PSIzLjciIHJ4PSIwLjkiIGZpbGw9IiNBOUE5QTkiLz48cGF0aCBkPSJNMTUuODUgNi40NUgxOC44NUwxMi41IDE5LjJIOS41TDE1Ljg1IDYuNDVaIiBmaWxsPSIjNTU1NTU1Ii8+PC9zdmc+&logoWidth=16)](https://npmx.dev/package/ncmget)
[![Node.js](https://img.shields.io/node/v/ncmget?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![License](https://img.shields.io/github/license/Roy-Jin/ncmget?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/ncmget?style=flat-square&logo=github)](https://github.com/Roy-Jin/ncmget)

[English](README.md) · **中文**

</div>


## ✨ 特性

| 特性 | 说明 |
|------|------|
| 🎵 **编程式 API** | NCMGET 类，完整 TypeScript 类型支持 |
| 💻 **CLI 工具集** | 批量处理、文件名模板、浏览器试听 |
| 🌐 **REST 服务器** | 基于 Hono 的 API 服务器，全局 CORS |
| 🔐 **EAPI 加密** | 原生 AES-128-ECB，零依赖 |
| 📥 **流式下载** | 队列管理、进度条、自动重试 |

## 📦 安装

```bash
# 全局安装
npm install -g ncmget

# 免安装使用
npx ncmget --help
```

## 🚀 快速开始

### 命令行

```bash
ncmget <command> [options]

# 示例
ncmget search "hello"              # 搜索歌曲
ncmget song 123456                 # 获取歌曲信息
ncmget url 123456                  # 获取歌曲链接
ncmget serve                       # 启动 REST API 服务器
```

### 编程式调用

```typescript
import { NCMGET } from 'ncmget';

const ncm = new NCMGET();

// 搜索歌曲
const songs = await ncm.search('hello');

// 获取歌曲链接
const url = await ncm.url(123456, 320);

// 获取歌词
const lrc = await ncm.lrc(123456);
```

## 📚 文档

- [文档 (GH Pages)](https://roy-jin.github.io/ncmget/zh)
- [文档 (CF Pages)](https://ncmget.pages.dev/zh)
- [文档 (Netlify)](https://ncmget.netlify.app/zh)

## 🔧 从源码构建

```bash
git clone https://github.com/Roy-Jin/ncmget.git
cd ncmget
npm install
npm run build
```

## 📄 许可证

[MIT](LICENSE) © Roy-Jin