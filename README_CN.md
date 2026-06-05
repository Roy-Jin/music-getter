<div align="center">

# 🎵 NCMGET

**一个轻量级且功能强大的命令行界面工具，用于获取网易云音乐资源。**
[![NPMX Version](https://img.shields.io/npm/v/ncmget?style=flat-square&label=npmx&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cmVjdCB4PSIyLjUiIHk9IjIuNSIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMy44IiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iNi4zIiB5PSIxMy41NSIgd2lkdGg9IjMuNyIgaGVpZ2h0PSIzLjciIHJ4PSIwLjkiIGZpbGw9IiNBOUE5QTkiLz48cGF0aCBkPSJNMTUuODUgNi40NUgxOC44NUwxMi41IDE5LjJIOS41TDE1Ljg1IDYuNDVaIiBmaWxsPSIjNTU1NTU1Ii8+PC9zdmc+&logoWidth=16)](https://npmx.dev/package/ncmget)
[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/ncmget?style=flat-square&logo=github)](https://github.com/Roy-Jin/ncmget)
[![MIT License](https://img.shields.io/github/license/Roy-Jin/ncmget?style=flat-square&logo=licensemit)](LICENSE)
[![Node.js](https://img.shields.io/node/v/ncmget?style=flat-square&logo=nodedotjs)](https://nodejs.org)

[English](README.md) · [中文](README_CN.md)

</div>

---

## 特性

- 🎵 **网易云音乐支持** — 专为网易云音乐打造，提供完整的音乐资源获取功能
- 🔍 **灵活搜索** — 支持搜索歌曲、歌手、专辑、歌单，可按类型、分页、数量灵活控制
- 📦 **批量下载** — 一键下载整个专辑或歌单，支持自定义输出目录和音频码率
- 📝 **歌词与封面** — 可选下载 LRC 歌词文件和封面图片，丰富你的音乐收藏
- 🔌 **编程接口** — 提供完整的 Node.js API，可在项目中集成使用
- 🌐 **在线预览** — 直接在浏览器中预览歌曲，试听后再决定是否下载


## 文档

详细文档，请移至 [**文档**](https://roy-jin.github.io/ncmget).

## 快速开始

### 安装

```sh
npm install -g ncmget
```

免安装使用：

```sh
npx ncmget --help
```

### 用法

```sh
ncmget <command> [options]
```

详细命令文档参照：[使用指南](https://roy-jin.github.io/ncmget/guide/usage/song)

## 从源码构建

```sh
git clone https://github.com/Roy-Jin/ncmget.git
cd ncmget
npm install
npm run build
```

## 许可证

[MIT](LICENSE) © Roy-Jin
