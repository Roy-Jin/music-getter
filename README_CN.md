<div align="center">

# 🎵 music-getter

[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/music-getter?style=for-the-badge)](https://github.com/Roy-Jin/music-getter/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/Roy-Jin/music-getter?style=for-the-badge)](https://github.com/Roy-Jin/music-getter/issues)
[![MIT License](https://img.shields.io/github/license/Roy-Jin/music-getter?style=for-the-badge)](LICENSE)

一个运行在命令行的音乐资源获取工具。  
[English](README.md) | [中文](README_CN.md)
</div>

<details>
<summary>目录</summary>

- [核心功能](#-核心功能)
- [使用技术](#-使用技术)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
  - [前提条件](#前提条件)
  - [安装](#安装)
- [可用命令](#-可用命令)
  - [`song <keyword>`](#song-keyword)
  - [`album <keyword>`](#album-keyword)
  - [`playlist <keyword>`](#playlist-keyword)
  - [`ls, list <keyword>`](#ls-list-keyword)
  - [`search <keyword>`](#search-keyword)
- [许可证](#-许可证)
- [联系方式](#-联系方式)

</details>

## ✨ 核心功能

- **多平台音乐下载**: 支持netease(default)，tencent和kugou音乐平台
- **高级搜索**: 可同时跨多个平台搜索
- **批量下载**: 一键下载整张专辑或歌单
- **下载管理**: 进度跟踪和同步下载
- **资源验证**: 下载前检查资源可用性

## 🛠️ 使用技术

- [Deno](https://deno.land/) - 运行时环境
- [Cliffy Command](https://github.com/c4spar/deno-cliffy) - CLI框架
- [Meting API](https://api.i-meto.com/meting/api) - 音乐服务集成
- [Chalk](https://jsr.io/@nothing628/chalk) - 终端样式
- [Progress](https://jsr.io/@ryweal/progress) - 下载进度跟踪

## 🗂 项目结构

<details>
<summary>music-getter/</summary>

```
├── command/        # 命令实现
│   ├── album.ts    # 专辑操作
│   ├── list.ts     # 资源列表
│   ├── playlist.ts # 歌单操作
│   ├── search.ts   # 搜索功能
│   └── song.ts     # 单曲操作
├── download.ts     # 下载管理器
├── meting.ts       # 音乐API客户端
├── program.ts      # CLI设置
└── main.ts         # 入口文件
```

</details>

## 🚀 快速开始

### 前提条件
- [Deno](https://docs.deno.com/runtime/getting_started/installation/) >= 1.30.0

### 安装

- 从[Github Releases](https://github.com/Roy-Jin/music-getter/releases/latest)下载最新版本  
- 或者本地运行和打包:
```sh
# 克隆仓库
git clone https://github.com/Roy-Jin/music-getter.git

# 进入项目目录
cd music-getter

# 运行程序
deno task run

# 构建程序
deno task build
```

## 🎛️ 可用命令

### `song <keyword>`
获取单曲资源。

**选项:**
- `-l, --lyric`: 包含歌词文件。
- `-c, --cover [size]`: 包含封面图片。(例如 -c "120")
- `-o, --output <path>`: 自定义输出目录。
- `-s, --server <source>`: 指定音乐平台。

**示例:**
```sh
# 下载网易云音乐歌曲"Daylight-Seredris"，包含歌词和封面图片
mg song 1372188635 --lyric --cover --output out
```

### `album <keyword>`
获取整张专辑资源。

**选项:**
- `-l, --lyric`: 为所有歌曲包含歌词。
- `-c, --cover [size]`: 为所有歌曲包含封面图片。
- `-o, --output <path>`: 自定义输出目录。
- `-s, --server <source>`: 指定来源平台。

**示例:**
```sh
# 下载网易云音乐专辑"Daylight"，包含歌词和封面图片
mg album 79797968 --lyric --cover --output out
```

### `playlist <keyword>`
获取整个歌单资源。

**选项:**
- `-l, --lyric`: 为所有歌曲包含歌词。
- `-c, --cover [size]`: 为所有歌曲包含封面图片。
- `-o, --output <path>`: 自定义输出目录。
- `-s, --server <source>`: 指定来源平台。

**示例:**
```sh
# 下载网易云音乐歌单"咖啡很苦 生活很甜"
mg playlist 7697114803 --output out
```

### `ls, list <keyword>`
列出特定类型的资源。  
(支持类型: playlist, album, artist)

**选项:**
- `-t, --type <type>`: 资源类型。(默认: "playlist")
- `-c, --check`: 验证资源可用性。
- `-s, --server <source>`: 指定来源平台。

**示例:**
```sh
# 列出网易云音乐歌单"咖啡很苦 生活很甜"中的可用资源
mg list 7697114803 --check
```

### `search <keyword>`
搜索歌曲资源。

**选项:**
- `-s, --server <source>`: 指定音乐平台。(可多选)
- `-c, --check`: 验证资源可用性。

**示例:**
```sh
# 在网易云音乐和QQ音乐平台搜索"Daylight-Seredris"
mg search "Daylight-Seredris" --server netease --server tencent
```

### `preview <keyword>`
打开网页预览歌曲。

**选项:**
- `-s, --server <source>`: 指定音乐平台。

**示例:**
```sh
# 打开网易云音乐歌曲"Daylight-Seredris"的网页预览
mg preview 1372188635 --server netease
```

## 📜 许可证

基于MIT许可证分发。详情请参阅[`LICENSE`](LICENSE)。

## 📬 联系方式

Roy-Jin - [jinroy@outlook.com](mailto:jinroy@outlook.com)
