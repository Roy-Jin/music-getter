---
title: Meting API
---

# Meting API

`Meting` 类是与 Meting API 交互的核心类，提供所有音乐资源的获取方法。

## 构造函数

```ts twoslash
declare class Meting {
  constructor(server?: string);
}
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `server` | `string` | `'netease'` | 音乐平台，如 `netease` 等 |

## 配置方法

### site

设置音乐平台。

```ts twoslash
declare class Meting {
  site(server: string): this;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `server` | `string` | 平台名称，如 `netease` 等 |

### api

设置自定义 API 地址。默认使用 `https://api.qijieya.cn/meting/`。

```ts twoslash
declare class Meting {
  api(url: string): this;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | Meting API 地址 |

### cookie

设置 Cookie，用于需要认证的请求。

```ts twoslash
declare class Meting {
  cookie(cookie: string): this;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `cookie` | `string` | Cookie 字符串 |

### format

启用或禁用格式化响应。启用后，返回的数据会统一为 `Music` 接口格式。

```ts twoslash
declare class Meting {
  format(enable: boolean): this;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `enable` | `boolean` | 是否启用格式化 |

## 数据方法

所有数据方法均返回 `Promise<string>`（JSON 字符串）。

### search

搜索歌曲。

```ts twoslash
interface SearchOptions {
  type?: number;
  page?: number;
  limit?: number;
}
declare class Meting {
  search(keyword: string, options?: SearchOptions): Promise<string>;
}
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `keyword` | `string` | — | 搜索关键词 |
| `options.type` | `number` | `1` | 搜索类型 |
| `options.page` | `number` | `1` | 页码 |
| `options.limit` | `number` | `30` | 每页结果数 |

### song

获取单曲信息。

```ts twoslash
declare class Meting {
  song(id: string | number): Promise<string>;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string \| number` | 歌曲 ID |

### artist

获取歌手的歌曲列表。

```ts twoslash
declare class Meting {
  artist(id: string | number, limit?: number): Promise<string>;
}
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string \| number` | — | 歌手 ID |
| `limit` | `number` | `30` | 返回数量 |

### playlist

获取歌单中的所有歌曲。

```ts twoslash
declare class Meting {
  playlist(id: string | number): Promise<string>;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string \| number` | 歌单 ID |

### url

获取歌曲播放 URL。

```ts twoslash
declare class Meting {
  url(id: string | number, bitrate?: number): Promise<string>;
}
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string \| number` | — | 歌曲 ID |
| `bitrate` | `number` | `320` | 音频码率 |

### lyric

获取歌词信息。

```ts twoslash
declare class Meting {
  lyric(id: string | number): Promise<string>;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string \| number` | 歌词 ID |

### pic

获取封面图片信息。

```ts twoslash
declare class Meting {
  pic(id: string | number, size?: number): Promise<string>;
}
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string \| number` | — | 图片 ID |
| `size` | `number` | `300` | 图片尺寸（px） |

## 类型定义

### SearchOptions

```ts twoslash
interface SearchOptions {
  type?: number;   // 搜索类型：1=歌曲, 100=歌手, 1000=专辑, 1004=歌单, 1006=歌词, 1009=用户
  page?: number;   // 页码，默认 1
  limit?: number;  // 每页结果数，默认 30
}
```

### Music

```ts twoslash
interface Music {
  id: string;          // 歌曲 ID
  name: string;        // 歌曲名称
  artist: string[];    // 艺术家列表
  album: string;       // 专辑名称
  pic_id: string;      // 封面图片 ID
  pic: string;         // 封面图片 URL
  url_id: string;      // 播放 URL 或 ID
  lyric_id: string;    // 歌词 ID
  lrc: string;         // 歌词 URL
  source: string;      // 来源平台
}
```

### MusicResponse

```ts twoslash
interface MusicResponse {
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
```

## 完整示例

```ts twoslash
// @filename: music-getter.d.ts
declare module "music-getter" {
  export interface SearchOptions {
    type?: number;
    page?: number;
    limit?: number;
  }
  export class Meting {
    constructor(server?: string);
    format(enable: boolean): this;
    search(keyword: string, options?: SearchOptions): Promise<string>;
    song(id: string | number): Promise<string>;
    playlist(id: string | number): Promise<string>;
    url(id: string | number, bitrate?: number): Promise<string>;
    lyric(id: string | number): Promise<string>;
    pic(id: string | number, size?: number): Promise<string>;
  }
}
// @filename: index.ts
// ---cut---
import { Meting } from 'music-getter';

const meting = new Meting('netease');
meting.format(true);

// 搜索
const searchResults = JSON.parse(
  await meting.search('周杰伦', { type: 1, limit: 5 })
);

// 获取歌曲详情
const song = JSON.parse(await meting.song('1372188635'));

// 获取歌单
const playlist = JSON.parse(await meting.playlist('7697114803'));

// 获取播放 URL
const urlData = JSON.parse(await meting.url('1372188635', 320));

// 获取歌词
const lyricData = JSON.parse(await meting.lyric('1372188635'));

// 获取封面
const picData = JSON.parse(await meting.pic('1372188635', 300));
```