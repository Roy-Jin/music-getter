---
title: Download API
---

# Download API

The `DownloadManager` class manages the download queue, supporting progress display and batch downloads.

## Import

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

`download` is a singleton instance of `DownloadManager` that can be used directly.

## Methods

### add

Add a download task to the queue.

```ts twoslash
declare class DownloadManager {
  add(url: string | (() => Promise<string>), output: string): void;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string \| (() => Promise<string>)` | Download URL, can be a string or an async function returning a string |
| `output` | `string` | Output file path |

### startAll

Execute all download tasks.

```ts twoslash
declare class DownloadManager {
  startAll(): Promise<void>;
}
```

Real-time progress bars are displayed during the download process:

```
Downloading 1/3:
  File: Daylight-David Kushner.mp3
 ████████████████████ 100% | 3500000/3500000 bytes | ETA: 0s

Downloading 2/3:
  File: Blue and White Porcelain-Jay Chou.mp3
 ████████████████░░░░ 80% | 2800000/3500000 bytes | ETA: 2s

All downloads finished!
```

### clear

Clear the download queue.

```ts twoslash
declare class DownloadManager {
  clear(): void;
}
```

### getCount

Get the number of tasks in the queue.

```ts twoslash
declare class DownloadManager {
  getCount(): number;
}
```

## Complete Examples

### Download a Single Song

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

### Batch Download a Playlist

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

console.log(`Preparing to download ${download.getCount()} songs`);
await download.startAll();
```

### Using Dynamic URLs

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

// Use an async function to dynamically get the URL
download.add(async () => {
  const urlData = JSON.parse(await meting.url(song[0].id, 320));
  return urlData[0].url;
}, './Daylight.mp3');

await download.startAll();
```

## Notes

- Download tasks are executed sequentially in the order they were added
- Illegal characters in filenames are automatically replaced with underscores
- Output directories are created automatically if they don't exist
- Progress bars are only displayed when the server returns a `Content-Length` header
