# Programmatic Usage

Music Getter is not just a CLI tool; it can also be integrated into your projects as a Node.js library.

## Installation

```sh
npm install music-getter
```

## Quick Start

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

// Create a Meting instance
const meting = new Meting('netease');
meting.format(true);

// Search for songs
const results = JSON.parse(await meting.search('Daylight', { limit: 10 }));
console.log(results);

// Get song details
const song = JSON.parse(await meting.song('1372188635'));
console.log(song);

// Download the song
download.add(song[0].url_id, './output.mp3');
await download.startAll();
```

## Core Modules

Music Getter provides two core modules:

- **Meting class** — Music resource acquisition client, supporting search, song/playlist/lyrics/cover retrieval, etc.
- **download instance** — Download manager, supporting queued downloads and progress display

For detailed API reference, see:

- [Meting API Docs](/api/meting) — Complete constructor, configuration methods, data methods, and type definitions
- [Download API Docs](/api/download) — Complete download management methods and examples

## Example: Batch Download a Playlist

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

// Get playlist
const songs = JSON.parse(await meting.playlist('7697114803'));

// Add download tasks
for (const song of songs) {
  download.add(song.url_id, `./downloads/${song.name}.mp3`);
}

// Start downloading
console.log(`Starting download of ${download.getCount()} songs...`);
await download.startAll();
```

## Custom API

If you need to deploy your own Meting API service, please refer to the [Custom API Docs](/guide/advanced/custom-api).
