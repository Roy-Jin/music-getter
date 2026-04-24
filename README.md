<div align="center">

# 🎵 music-getter

**A music resource acquisition tool that supports the Meting API.**

[![npm version](https://img.shields.io/npm/v/music-getter?style=flat-square)](https://www.npmjs.com/package/music-getter)
[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/music-getter?style=flat-square)](https://github.com/Roy-Jin/music-getter/stargazers)
[![MIT License](https://img.shields.io/github/license/Roy-Jin/music-getter?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/node/v/music-getter?style=flat-square)](https://nodejs.org)

[English](README.md) · [中文](README_CN.md)

</div>

---

## Features

- 🎶 **Multi-platform** — Supports NetEase (default) and Tencent
- 🔍 **Support search** — Search across multiple platforms simultaneously
- 📦 **Batch download** — Download entire playlists in one command
- 📝 **Lyrics & covers** — Optionally include lyrics and cover images
- 🎚️ **Bitrate control** — Choose audio quality
- 🌐 **Web preview** — Open songs directly in your browser

## Quick Start

### Install

```sh
npm install -g music-getter
```

Or use without installing:

```sh
npx music-getter --help
```

### Usage

```sh
mg <command> [options]
```

> `music-getter` and `mg` are both available as CLI commands.

## Commands

### `song <song-id>`

Download a single song.

```sh
mg song 1372188635
mg song 1372188635 --lyric --cover --output ./downloads
mg song 1372188635 --server tencent --bitrate 320
```

| Option | Description | Default |
|--------|-------------|---------|
| `-l, --lyric` | Include `.lrc` lyrics file | — |
| `-c, --cover [size]` | Include cover image (optional size in px) | — |
| `-o, --output <path>` | Output directory | `./` |
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |
| `-b, --bitrate <kbps>` | Audio bitrate (`128`, `192`, `320`) | `128` |

### `playlist <playlist-id>`

Download all songs from a playlist.

```sh
mg playlist 7697114803
mg playlist 7697114803 --lyric --cover --output ./my-playlist
```

| Option | Description | Default |
|--------|-------------|---------|
| `-l, --lyric` | Include lyrics for all songs | — |
| `-c, --cover [size]` | Include cover images | — |
| `-o, --output <path>` | Output directory | `./` |
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |
| `-b, --bitrate <kbps>` | Audio bitrate (`128`, `192`, `320`) | `128` |

### `search <keyword>`

Search for songs across platforms.

```sh
mg search "Daylight"
mg search "Daylight" --server netease --server tencent
mg search "Daylight" --limit 10 --page 2
```

| Option | Description | Default |
|--------|-------------|---------|
| `-s, --server <source...>` | Music platform(s) (repeatable) | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |
| `-t, --type <type>` | Search type | `1` |
| `-p, --page <number>` | Page number | `1` |
| `-l, --limit <number>` | Results per page | `30` |

### `list <resource-id>`

List resources from a playlist or artist.

```sh
mg list 7697114803
mg list 7697114803 --type artist
mg ls 7697114803
```

| Option | Description | Default |
|--------|-------------|---------|
| `-t, --type <type>` | Resource type (`playlist`, `artist`) | `playlist` |
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |

### `preview <song-id>`

Open a song in your default browser for preview.

```sh
mg preview 1372188635
mg preview 1372188635 --server tencent
```

| Option | Description | Default |
|--------|-------------|---------|
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |

## Programmatic API

You can also use `music-getter` as a library in your Node.js project.

```ts
import { Meting, download } from 'music-getter';

const meting = new Meting('netease');
meting.format(true);

// Search for songs
const results = JSON.parse(await meting.search('Daylight', { limit: 10 }));

// Get song details
const song = JSON.parse(await meting.song('1372188635'));

// Download
download.add(song[0].url_id, './output.mp3');
await download.startAll();
```

### Meting API

```ts
const meting = new Meting(server?: string);  // 'netease' | 'tencent'

meting.site(server: string)     // Set platform
meting.api(url: string)         // Set custom API endpoint
meting.cookie(cookie: string)   // Set cookie
meting.format(enable: boolean)  // Enable formatted response

await meting.search(keyword: string, options?: SearchOptions): Promise<string>
await meting.song(id: string | number): Promise<string>
await meting.artist(id: string | number, limit?: number): Promise<string>
await meting.playlist(id: string | number): Promise<string>
await meting.url(id: string | number, bitrate?: number): Promise<string>
await meting.lyric(id: string | number): Promise<string>
await meting.pic(id: string | number, size?: number): Promise<string>
```

## Build from Source

```sh
git clone https://github.com/Roy-Jin/music-getter.git
cd music-getter
npm install
npm run build
```

## License

[MIT](LICENSE) © Roy-Jin
