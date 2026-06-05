# 快速开始

本页将引导你安装 NCMGET 并运行第一个程序。

## 前置条件

- **Node.js** >= 22.12.0
- 包管理器：npm、yarn 或 pnpm

## 安装

在你的项目目录中安装 `ncmget`：

```bash
npm install ncmget
```

或使用 yarn：

```bash
yarn add ncmget
```

或使用 pnpm：

```bash
pnpm add ncmget
```

## 基本用法

### 搜索并下载歌曲

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();

// 1. 搜索歌曲
const searchResult = await ncmget.search('淘气的Roy');
const songs = JSON.parse(searchResult);

console.log(`找到 ${songs.length} 首歌曲`);
console.log(`第一首: ${songs[0].name} - ${songs[0].artist.join('/')}`);

// 2. 获取音频URL
const urlResult = await ncmget.url(songs[0].url_id);
const urlData = JSON.parse(urlResult);

console.log(`音频地址: ${urlData.url}`);
console.log(`比特率: ${urlData.br}kbps`);
console.log(`文件大小: ${(urlData.size / 1024 / 1024).toFixed(2)}MB`);
```

### 获取歌词

```typescript
const lrcResult = await ncmget.lrc(songs[0].lrc_id);
const lrcData = JSON.parse(lrcResult);

console.log('原文歌词:');
console.log(lrcData.lrc);

console.log('翻译歌词:');
console.log(lrcData.tlrc);
```

### 获取封面图片

```typescript
const picResult = await ncmget.pic(songs[0].pic_id);
console.log(`封面图片URL: ${picResult}`);
```

## 理解返回格式

NCMGET 的所有数据检索方法返回 `Promise<string>`，即 JSON 字符串。你需要使用 `JSON.parse()` 来解析：

```typescript
const result = await ncmget.song(3374579108);

// result 是 JSON 字符串，需要解析
const data = JSON.parse(result);
```

如果需要获取原始 HTTP 响应（未经格式化处理），可以使用 `format(false)`：

```typescript
const ncmget = new NCMGET();
const rawResult = await ncmget.format(false).song(3374579108);
// rawResult 是未经格式化的原始 API 响应

// 也可以通过 raw 属性获取最近一次的原始响应
const result = await ncmget.song(3374579108);
console.log(ncmget.raw); // 原始 HTTP 响应文本
```

## 下一步

- [API 参考](/core/api-reference) — 查看 NCMGET 类的完整方法和属性文档
- [类型定义](/core/types) — 了解所有导出的 TypeScript 类型
- [进阶用法](/core/advanced) — 学习 Cookie 配置、EAPI 加密等高级功能
