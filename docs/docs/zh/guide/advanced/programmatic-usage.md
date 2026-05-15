# 编程使用

Music Getter 不仅是一个 CLI 工具，也可以作为 Node.js 库集成到你的项目中。

## 安装

```sh
npm install music-getter
```

## 快速开始

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
  export class Meting {
    constructor(server?: string);
    format(enable: boolean): this;
    search(keyword: string, options?: SearchOptions): Promise<string>;
    song(id: string | number): Promise<string>;
  }
  export class DownloadManager {
    add(url: string | (() => Promise<string>), output: string): void;
    startAll(): Promise<void>;
  }
  export const download: DownloadManager;
}
// @filename: index.ts
// ---cut---
import { Meting, download } from 'music-getter';

// 创建 Meting 实例
const meting = new Meting('netease');
meting.format(true);

// 搜索歌曲
const results = JSON.parse(await meting.search('Daylight', { limit: 10 }));
console.log(results);

// 获取歌曲详情
const song = JSON.parse(await meting.song('1372188635'));
console.log(song);

// 下载歌曲
download.add(song[0].url_id, './output.mp3');
await download.startAll();
```

## 核心模块

Music Getter 提供两个核心模块：

- **Meting 类** — 音乐资源获取客户端，支持搜索、获取歌曲/歌单/歌词/封面等
- **download 实例** — 下载管理器，支持队列下载和进度显示

详细的 API 参考请查看：

- [Meting API 文档](/api/meting) — 完整的构造函数、配置方法、数据方法和类型定义
- [Download API 文档](/api/download) — 完整的下载管理方法和示例

## 示例：批量下载歌单

```ts twoslash
// @filename: music-getter.d.ts
declare module "music-getter" {
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
  export class Meting {
    constructor(server?: string);
    format(enable: boolean): this;
    playlist(id: string | number): Promise<string>;
  }
  export class DownloadManager {
    add(url: string | (() => Promise<string>), output: string): void;
    startAll(): Promise<void>;
    getCount(): number;
  }
  export const download: DownloadManager;
}
// @filename: index.ts
// ---cut---
import { Meting, download } from 'music-getter';

const meting = new Meting('netease');
meting.format(true);

// 获取歌单
const songs = JSON.parse(await meting.playlist('7697114803'));

// 添加下载任务
for (const song of songs) {
  download.add(song.url_id, `./downloads/${song.name}.mp3`);
}

// 开始下载
console.log(`开始下载 ${download.getCount()} 首歌曲...`);
await download.startAll();
```

## 自定义 API

如果你需要部署自己的 Meting API 服务，请参考 [自定义 API 文档](/guide/advanced/custom-api)。
