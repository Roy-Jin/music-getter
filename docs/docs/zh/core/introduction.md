# Core 模块介绍

NCMGET Core 是 `ncmget` 包的核心模块，提供了完整的编程式 API，用于与网易云音乐进行交互。

## 概述

NCMGET Core 将网易云音乐的所有功能封装在单一的 `NCMGET` 类中，支持音乐搜索、歌曲详情获取、专辑/歌手/歌单查询、音频URL获取、歌词获取和封面图片获取等功能。

## 架构概览

NCMGET 的架构分为以下几个层次：

```
┌─────────────────────────────────────────┐
│                 CLI 层                   │
│         commander 命令行界面              │
│              ↓ 调用                      │
├─────────────────────────────────────────┤
│               Core 层                    │
│            NCMGET 核心类                   │
│         ↓ 使用        ↓ 使用             │
├──────────────┬──────────────────────────┤
│    Utils     │        Server            │
│  DLManager   │     Hono HTTP 服务器      │
│  Display     │                          │
│  Format      │                          │
│  OpenBrowser │                          │
└──────────────┴──────────────────────────┘
```

- **Core 层**：`NCMGET` 类（`src/core/index.ts`、`src/core/types.ts`），负责所有数据交互逻辑
- **CLI 层**：基于 commander 的命令行界面（`src/bin/cli.ts`、`src/commands/*.ts`）
- **Utils**：辅助工具，包括 `DLManager`（单例下载管理器）、`Display`（输出展示）、`Format`（文件名模板）、`OpenBrowser`（浏览器打开）
- **Server**：基于 Hono 的 HTTP 服务器（`src/server.ts`）

## 关键设计决策

### 单类封装

所有功能封装在 `NCMGET` 类中，无需记忆多个模块或函数。创建一个实例即可访问所有能力：

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();
```

### 链式配置

`cookie()` 和 `format()` 方法支持链式调用，便于灵活配置：

```typescript
const result = await ncmget.cookie('your_cookie').format(false).song(3374579108);
```

### JSON 字符串返回

所有数据检索方法返回 `Promise<string>`（JSON 字符串），而非直接返回对象。这样做的好处是：
- 统一的返回类型，简化类型系统
- 调用方可以自行决定是否解析以及如何处理原始数据
- 与 `raw` 属性配合，可以同时获取原始响应和格式化数据

```typescript
const result = await ncmget.search('淘气的Roy');
const data = JSON.parse(result);
```

### 管道式数据处理

内部采用管道式处理流程：`_exec` 方法依次执行 **加密 → HTTP 请求 → 解码 → 格式化**，每一步都是可选的，通过 `ApiConfig` 中的配置决定是否启用。

## 快速示例

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();

// 搜索歌曲
const searchResult = await ncmget.search('淘气的Roy');
const songs = JSON.parse(searchResult);

// 获取歌曲详情
const songDetail = await ncmget.song(songs[0].id);

// 获取音频URL
const urlData = await ncmget.url(songs[0].id);
const { url } = JSON.parse(urlData);

// 获取歌词
const lrcData = await ncmget.lrc(songs[0].id);
const { lrc, tlrc } = JSON.parse(lrcData);
```

## 下一步

- [快速开始](/core/getting-started) — 安装并运行你的第一个 NCMGET 程序
- [API 参考](/core/api-reference) — 完整的 NCMGET 类方法和属性文档
- [类型定义](/core/types) — 所有导出的 TypeScript 类型
- [进阶用法](/core/advanced) — Cookie 配置、EAPI 加密、错误处理等
