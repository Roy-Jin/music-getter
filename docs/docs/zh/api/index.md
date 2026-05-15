---
title: API 概述
overview: true
---

# API 文档

Music Getter 提供完整的 Node.js 编程接口，你可以在项目中将其作为库使用。

## 导出模块

```ts twoslash
// @filename: music-getter.d.ts
declare module "music-getter" {
  export interface SearchOptions {
    type?: number;
    page?: number;
    limit?: number;
  }
  export interface Music {
    id: string;
    name: string;
    artist: string[];
    album: string;
    pic_id: string;
    pic: string;
    url_id: string;
    lyric_id: string;
    lrc: string;
    source: string;
  }
  export interface MusicResponse {
    id: string;
    name: string;
    artist: string[];
    album: string;
    pic: string;
    url: string;
    lrc: string;
    source: string;
    [key: string]: unknown;
  }
  export class Meting {
    constructor(server?: string);
    site(server: string): this;
    api(url: string): this;
    cookie(cookie: string): this;
    format(enable: boolean): this;
    search(keyword: string, options?: SearchOptions): Promise<string>;
    song(id: string | number): Promise<string>;
    artist(id: string | number, limit?: number): Promise<string>;
    playlist(id: string | number): Promise<string>;
    url(id: string | number, bitrate?: number): Promise<string>;
    lyric(id: string | number): Promise<string>;
    pic(id: string | number, size?: number): Promise<string>;
  }
  export class DownloadManager {
    add(url: string | (() => Promise<string>), output: string): void;
    startAll(): Promise<void>;
    clear(): void;
    getCount(): number;
  }
  export const download: DownloadManager;
}
// @filename: index.ts
// ---cut---
import { Meting, download } from 'music-getter';
import type { Music, MusicResponse, SearchOptions } from 'music-getter';
```

## 核心模块

- **[Meting API](/api/meting)** — 音乐资源获取客户端，支持搜索、获取歌曲/歌单/歌词/封面等
- **[Download API](/api/download)** — 下载管理器，支持队列下载和进度显示

## 类型定义

- **[Music](/api/meting#music)** — 格式化后的音乐数据接口
- **[MusicResponse](/api/meting#musicresponse)** — API 原始响应接口
- **[SearchOptions](/api/meting#searchoptions)** — 搜索选项接口

## 快速示例

```ts twoslash
// @filename: music-getter.d.ts
declare module "music-getter" {
  export interface SearchOptions {
    type?: number;
    page?: number;
    limit?: number;
  }
  export interface Music {
    id: string;
    name: string;
    artist: string[];
    album: string;
    pic_id: string;
    pic: string;
    url_id: string;
    lyric_id: string;
    lrc: string;
    source: string;
  }
  export interface MusicResponse {
    id: string;
    name: string;
    artist: string[];
    album: string;
    pic: string;
    url: string;
    lrc: string;
    source: string;
    [key: string]: unknown;
  }
  export class Meting {
    constructor(server?: string);
    site(server: string): this;
    api(url: string): this;
    cookie(cookie: string): this;
    format(enable: boolean): this;
    search(keyword: string, options?: SearchOptions): Promise<string>;
    song(id: string | number): Promise<string>;
    artist(id: string | number, limit?: number): Promise<string>;
    playlist(id: string | number): Promise<string>;
    url(id: string | number, bitrate?: number): Promise<string>;
    lyric(id: string | number): Promise<string>;
    pic(id: string | number, size?: number): Promise<string>;
  }
  export class DownloadManager {
    add(url: string | (() => Promise<string>), output: string): void;
    startAll(): Promise<void>;
    clear(): void;
    getCount(): number;
  }
  export const download: DownloadManager;
}
// @filename: index.ts
// ---cut---
import { Meting, download } from 'music-getter';

const meting = new Meting('netease');
meting.format(true);

// 搜索歌曲
const results = JSON.parse(await meting.search('Daylight', { limit: 5 }));

// 下载第一首
download.add(results[0].url_id, './Daylight.mp3');
await download.startAll();
```