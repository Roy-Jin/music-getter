---
title: API Overview
overview: true
---

# API Documentation

Music Getter provides a complete Node.js programming interface that you can use as a library in your projects.

## Exported Modules

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

## Core Modules

- **[Meting API](/api/meting)** — Music resource acquisition client, supporting search, song/playlist/lyrics/cover retrieval, etc.
- **[Download API](/api/download)** — Download manager, supporting queued downloads and progress display

## Type Definitions

- **[Music](/api/meting#music)** — Formatted music data interface
- **[MusicResponse](/api/meting#musicresponse)** — Original API response interface
- **[SearchOptions](/api/meting#searchoptions)** — Search options interface

## Quick Example

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

// Search for songs
const results = JSON.parse(await meting.search('Daylight', { limit: 5 }));

// Download the first one
download.add(results[0].url_id, './Daylight.mp3');
await download.startAll();
```
