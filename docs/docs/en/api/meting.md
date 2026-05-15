---
title: Meting API
---

# Meting API

The `Meting` class is the core class for interacting with the Meting API, providing methods to retrieve all music resources.

## Constructor

```ts twoslash
declare class Meting {
  constructor(server?: string);
}
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `server` | `string` | `'netease'` | Music platform, e.g., `netease` |

## Configuration Methods

### site

Set the music platform.

```ts twoslash
declare class Meting {
  site(server: string): this;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `server` | `string` | Platform name, e.g., `netease` |

### api

Set a custom API endpoint. Default is `https://api.qijieya.cn/meting/`.

```ts twoslash
declare class Meting {
  api(url: string): this;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | Meting API endpoint |

### cookie

Set a cookie for authenticated requests.

```ts twoslash
declare class Meting {
  cookie(cookie: string): this;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `cookie` | `string` | Cookie string |

### format

Enable or disable formatted responses. When enabled, returned data will be unified to the `Music` interface format.

```ts twoslash
declare class Meting {
  format(enable: boolean): this;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `enable` | `boolean` | Whether to enable formatting |

## Data Methods

All data methods return a `Promise<string>` (JSON string).

### search

Search for songs.

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `keyword` | `string` | — | Search keyword |
| `options.type` | `number` | `1` | Search type |
| `options.page` | `number` | `1` | Page number |
| `options.limit` | `number` | `30` | Results per page |

### song

Get single song information.

```ts twoslash
declare class Meting {
  song(id: string | number): Promise<string>;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Song ID |

### artist

Get a list of songs by an artist.

```ts twoslash
declare class Meting {
  artist(id: string | number, limit?: number): Promise<string>;
}
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | Artist ID |
| `limit` | `number` | `30` | Number of results |

### playlist

Get all songs in a playlist.

```ts twoslash
declare class Meting {
  playlist(id: string | number): Promise<string>;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Playlist ID |

### url

Get song playback URL.

```ts twoslash
declare class Meting {
  url(id: string | number, bitrate?: number): Promise<string>;
}
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | Song ID |
| `bitrate` | `number` | `320` | Audio bitrate |

### lyric

Get lyrics information.

```ts twoslash
declare class Meting {
  lyric(id: string | number): Promise<string>;
}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Lyrics ID |

### pic

Get cover image information.

```ts twoslash
declare class Meting {
  pic(id: string | number, size?: number): Promise<string>;
}
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | Image ID |
| `size` | `number` | `300` | Image size (px) |

## Type Definitions

### SearchOptions

```ts twoslash
interface SearchOptions {
  type?: number;   // Search type: 1=song, 100=artist, 1000=album, 1004=playlist, 1006=lyrics, 1009=user
  page?: number;   // Page number, default 1
  limit?: number;  // Results per page, default 30
}
```

### Music

```ts twoslash
interface Music {
  id: string;          // Song ID
  name: string;        // Song name
  artist: string[];    // Artist list
  album: string;       // Album name
  pic_id: string;      // Cover image ID
  pic: string;         // Cover image URL
  url_id: string;      // Playback URL or ID
  lyric_id: string;    // Lyrics ID
  lrc: string;         // Lyrics URL
  source: string;      // Source platform
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

## Complete Example

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

// Search
const searchResults = JSON.parse(
  await meting.search('Jay Chou', { type: 1, limit: 5 })
);

// Get song details
const song = JSON.parse(await meting.song('1372188635'));

// Get playlist
const playlist = JSON.parse(await meting.playlist('7697114803'));

// Get playback URL
const urlData = JSON.parse(await meting.url('1372188635', 320));

// Get lyrics
const lyricData = JSON.parse(await meting.lyric('1372188635'));

// Get cover
const picData = JSON.parse(await meting.pic('1372188635', 300));
```
