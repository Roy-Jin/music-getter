---
title: Download API
---

# Download API

`DownloadManager` 类管理下载队列，支持进度显示和批量下载。

## 导入

```ts twoslash
// @filename: music-getter.d.ts
declare module "music-getter" {
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
import { download } from 'music-getter';
```

`download` 是一个 `DownloadManager` 的单例实例，可以直接使用。

## 方法

### add

添加下载任务到队列。

```ts twoslash
declare class DownloadManager {
  add(url: string | (() => Promise<string>), output: string): void;
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string \| (() => Promise<string>)` | 下载 URL，可以是字符串或返回字符串的异步函数 |
| `output` | `string` | 输出文件路径 |

### startAll

开始执行所有下载任务。

```ts twoslash
declare class DownloadManager {
  startAll(): Promise<void>;
}
```

下载过程中会显示实时进度条：

```
Downloading 1/3:
  File: Daylight-David Kushner.mp3
 ████████████████████ 100% | 3500000/3500000 bytes | ETA: 0s

Downloading 2/3:
  File: 青花瓷-周杰伦.mp3
 ████████████████░░░░ 80% | 2800000/3500000 bytes | ETA: 2s

All downloads finished!
```

### clear

清空下载队列。

```ts twoslash
declare class DownloadManager {
  clear(): void;
}
```

### getCount

获取队列中的任务数量。

```ts twoslash
declare class DownloadManager {
  getCount(): number;
}
```

## 完整示例

### 下载单曲

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

const meting = new Meting('netease');
meting.format(true);

const song = JSON.parse(await meting.song('1372188635'));

download.add(song[0].url_id, './Daylight.mp3');
await download.startAll();
```

### 批量下载歌单

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

const songs = JSON.parse(await meting.playlist('7697114803'));

for (const song of songs) {
  const filename = `${song.name}-${song.artist.join(',')}.mp3`;
  download.add(song.url_id, `./downloads/${filename}`);
}

console.log(`准备下载 ${download.getCount()} 首歌曲`);
await download.startAll();
```

### 使用动态 URL

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
    song(id: string | number): Promise<string>;
    url(id: string | number, bitrate?: number): Promise<string>;
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

const meting = new Meting('netease');
meting.format(true);

const song = JSON.parse(await meting.song('1372188635'));

// 使用异步函数动态获取 URL
download.add(async () => {
  const urlData = JSON.parse(await meting.url(song[0].id, 320));
  return urlData[0].url;
}, './Daylight.mp3');

await download.startAll();
```

## 注意事项

- 下载任务会按添加顺序依次执行
- 文件名中的非法字符会自动替换为下划线
- 输出目录不存在时会自动创建
- 下载进度条仅在服务器返回 `Content-Length` 头时显示