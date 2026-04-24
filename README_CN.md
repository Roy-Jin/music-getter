<div align="center">

# 🎵 music-getter

**一个支持 Meting API 的音乐资源获取工具。**

[![npm version](https://img.shields.io/npm/v/music-getter?style=flat-square)](https://www.npmjs.com/package/music-getter)
[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/music-getter?style=flat-square)](https://github.com/Roy-Jin/music-getter/stargazers)
[![MIT License](https://img.shields.io/github/license/Roy-Jin/music-getter?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/node/v/music-getter?style=flat-square)](https://nodejs.org)

[English](README.md) · [中文](README_CN.md)

</div>

---

## 特性

- 🎶 **多平台支持** — 支持网易云音乐（默认）、QQ音乐
- 🔍 **支持搜索** — 可同时跨多个平台搜索歌曲
- 📦 **批量下载** — 一键下载整个歌单
- 📝 **歌词与封面** — 可选下载歌词文件和封面图片
- 🎚️ **码率控制** — 自选音码率
- 🌐 **在线预览** — 在浏览器中直接预览歌曲

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

## 命令

### `song <song-id>`

下载单曲。

```sh
mg song 1372188635
mg song 1372188635 --lyric --cover --output ./downloads
mg song 1372188635 --server tencent --bitrate 320
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-l, --lyric` | 包含 `.lrc` 歌词文件 | — |
| `-c, --cover [size]` | 包含封面图片（可选尺寸，单位 px） | — |
| `-o, --output <path>` | 输出目录 | `./` |
| `-s, --server <source>` | 音乐平台 | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |
| `-b, --bitrate <kbps>` | 音频码率（`128`、`192`、`320`） | `128` |

### `playlist <playlist-id>`

下载整个歌单。

```sh
mg playlist 7697114803
mg playlist 7697114803 --lyric --cover --output ./my-playlist
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-l, --lyric` | 为所有歌曲包含歌词 | — |
| `-c, --cover [size]` | 包含封面图片 | — |
| `-o, --output <path>` | 输出目录 | `./` |
| `-s, --server <source>` | 音乐平台 | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |
| `-b, --bitrate <kbps>` | 音频码率（`128`、`192`、`320`） | `128` |

### `search <keyword>`

跨平台搜索歌曲。

```sh
mg search "Daylight"
mg search "Daylight" --server netease --server tencent
mg search "Daylight" --limit 10 --page 2
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-s, --server <source...>` | 音乐平台（可重复指定） | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |
| `-t, --type <type>` | 搜索类型 | `1` |
| `-p, --page <number>` | 页码 | `1` |
| `-l, --limit <number>` | 每页结果数 | `30` |

### `list <resource-id>`

列出歌单或歌手的资源列表。

```sh
mg list 7697114803
mg list 7697114803 --type artist
mg ls 7697114803
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-t, --type <type>` | 资源类型（`playlist`、`artist`） | `playlist` |
| `-s, --server <source>` | 音乐平台 | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |

### `preview <song-id>`

在浏览器中预览歌曲。

```sh
mg preview 1372188635
mg preview 1372188635 --server tencent
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-s, --server <source>` | 音乐平台 | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |

## 编程接口

你也可以在 Node.js 项目中将 `music-getter` 作为库使用。

```ts
import { Meting, download } from 'music-getter';

const meting = new Meting('netease');
meting.format(true);

// 搜索歌曲
const results = JSON.parse(await meting.search('Daylight', { limit: 10 }));

// 获取歌曲详情
const song = JSON.parse(await meting.song('1372188635'));

// 下载
download.add(song[0].url_id, './output.mp3');
await download.startAll();
```

### Meting API

```ts
const meting = new Meting(server?: string);  // 'netease' | 'tencent'

meting.site(server: string)     // 设置平台
meting.api(url: string)         // 设置自定义 API 地址
meting.cookie(cookie: string)   // 设置 Cookie
meting.format(enable: boolean)  // 启用格式化响应

await meting.search(keyword: string, options?: SearchOptions): Promise<string>
await meting.song(id: string | number): Promise<string>
await meting.artist(id: string | number, limit?: number): Promise<string>
await meting.playlist(id: string | number): Promise<string>
await meting.url(id: string | number, bitrate?: number): Promise<string>
await meting.lyric(id: string | number): Promise<string>
await meting.pic(id: string | number, size?: number): Promise<string>
```

## 从源码构建

```sh
git clone https://github.com/Roy-Jin/music-getter.git
cd music-getter
npm install
npm run build
```

## 许可证

[MIT](LICENSE) © Roy-Jin
