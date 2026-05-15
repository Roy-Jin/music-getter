# 介绍

Music Getter 是一个基于 Meting API 的命令行音乐资源获取工具。它支持从多个音乐平台搜索、预览和下载音乐资源，并提供完整的 Node.js 编程接口，方便集成到其他项目中。

## 功能特性

- **多平台支持** — 支持网易云音乐等多平台
- **歌曲搜索** — 支持跨平台同时搜索，可按类型、分页、数量灵活控制
- **单曲下载** — 下载单首歌曲，可选歌词和封面
- **歌单下载** — 一键下载整个歌单的所有歌曲
- **资源列表** — 列出歌单或歌手的音乐资源
- **在线预览** — 在浏览器中直接预览歌曲
- **歌词与封面** — 可选下载 LRC 歌词文件和封面图片
- **码率控制** — 支持 128kbps、192kbps、320kbps 三种音频码率
- **自定义 API** — 支持指定自定义 Meting API 地址
- **进度显示** — 下载时显示实时进度条和速度

## 技术栈

| 技术 | 说明 |
|------|------|
| **TypeScript** | 项目使用 TypeScript 编写，提供完整的类型定义 |
| **Commander.js** | 命令行框架，用于解析命令和参数 |
| **cli-progress** | 终端进度条显示 |
| **Meting API** | 音乐资源统一接口，聚合多平台数据 |
| **Node.js Fetch** | 内置 HTTP 客户端，用于网络请求 |

## 项目结构

```
music-getter/
├── src/
│   ├── bin/
│   │   └── cli.ts          # CLI 入口文件
│   ├── commands/
│   │   ├── song.ts          # 单曲下载命令
│   │   ├── playlist.ts      # 歌单下载命令
│   │   ├── list.ts          # 资源列表命令
│   │   ├── search.ts        # 搜索命令
│   │   └── preview.ts       # 预览命令
│   ├── core/
│   │   ├── meting.ts        # Meting API 客户端
│   │   ├── download.ts      # 下载管理器
│   │   └── util.ts          # 工具函数
│   └── index.ts             # 库入口文件
├── docs/                    # 文档目录
├── package.json
└── tsconfig.json
```

## 工作原理

Music Getter 通过 [Meting API](https://github.com/metowolf/Meting) 作为中间层，统一调用不同音乐平台的接口。用户只需指定平台名称和资源 ID，即可获取标准化的音乐数据。

```
用户 CLI → Music Getter → Meting API → 音乐平台（网易云等）
                              ↓
                         返回标准化 JSON 数据
                              ↓
                     Music Getter 处理并下载
```

## 下一步

- 查看 [安装指南](/guide/start/installation) 开始使用
- 查看 [使用指南](/guide/usage/song) 了解详细命令用法
- 查看 [API 文档](/api/) 了解编程接口