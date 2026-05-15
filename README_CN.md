<div align="center">

# 🎵 music-getter

**一个支持 Meting API 的音乐资源获取工具。**

[![NPMX Version](https://img.shields.io/npm/v/music-getter?style=flat-square&label=npmx&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj48cmVjdCB4PSIyLjUiIHk9IjIuNSIgd2lkdGg9IjE5IiBoZWlnaHQ9IjE5IiByeD0iMy44IiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iNi4zIiB5PSIxMy41NSIgd2lkdGg9IjMuNyIgaGVpZ2h0PSIzLjciIHJ4PSIwLjkiIGZpbGw9IiNBOUE5QTkiLz48cGF0aCBkPSJNMTUuODUgNi40NUgxOC44NUwxMi41IDE5LjJIOS41TDE1Ljg1IDYuNDVaIiBmaWxsPSIjNTU1NTU1Ii8+PC9zdmc+&logoWidth=16)](https://npmx.dev/package/music-getter)
[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/music-getter?style=flat-square&logo=github)](https://github.com/Roy-Jin/music-getter)
[![MIT License](https://img.shields.io/github/license/Roy-Jin/music-getter?style=flat-square&logo=licensemit)](LICENSE)
[![Node.js](https://img.shields.io/node/v/music-getter?style=flat-square&logo=nodedotjs)](https://nodejs.org)

[English](README.md) · [中文](README_CN.md)

</div>

---

## 特性

- 🎶 **多平台支持** — 支持网易云音乐等多平台
- 🔍 **支持搜索** — 可同时跨多个平台搜索歌曲
- 📦 **批量下载** — 一键下载整个歌单
- 📝 **歌词与封面** — 可选下载歌词文件和封面图片
- 🎚️ **码率控制** — 自选音码率
- 🌐 **在线预览** — 在浏览器中直接预览歌曲

## 文档

详细文档，请移至 [**文档**](https://roy-jin.github.io/music-getter).

## 快速开始

### 安装

```sh
npm install -g music-getter
```

免安装使用：

```sh
npx music-getter --help
```

### 用法

```sh
mg <command> [options]
```

> `music-getter` 和 `mg` 均可作为 CLI 命令使用。

详细命令文档参照：[使用指南](https://roy-jin.github.io/music-getter/guide/usage/song)

## 从源码构建

```sh
git clone https://github.com/Roy-Jin/music-getter.git
cd music-getter
npm install
npm run build
```

## 许可证

[MIT](LICENSE) © Roy-Jin
