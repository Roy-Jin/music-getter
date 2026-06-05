# Getting Started

## Prerequisites

- **Node.js** >= 22.12.0
- **ESM** project (NCMGET is an ES module)

## Installation

Install NCMGET as a dependency in your project:

```bash
npm install ncmget
```

## Basic Usage

### Search and Download

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();

// Step 1: Search for a song
const searchResult = await ncmget.search('淘气的Roy');
const songs = JSON.parse(searchResult);

// Step 2: Get the audio URL for the first result
const urlResult = await ncmget.url(songs[0].id);
const urlData = JSON.parse(urlResult);

console.log(urlData.url); // The playable audio URL
```

### Get Song Details

```typescript
const ncmget = new NCMGET();

const songDetail = await ncmget.song(3374579108);
const song = JSON.parse(songDetail);

console.log(song.name);    // Song name
console.log(song.artist);  // Artist names (array)
console.log(song.album);   // Album name
```

### Get Lyrics

```typescript
const ncmget = new NCMGET();

const lrcResult = await ncmget.lrc(3374579108);
const lrcData = JSON.parse(lrcResult);

console.log(lrcData.lrc);   // Original lyrics
console.log(lrcData.tlrc);  // Translated lyrics
```

### Get Cover Image

```typescript
const ncmget = new NCMGET();

const picResult = await ncmget.pic(3374579108);
const picUrl = JSON.parse(picResult);

console.log(picUrl); // Cover image URL
```

## Understanding the Return Format

All NCMGET methods return `Promise<string>`. The string is a JSON representation of the result data. You need to call `JSON.parse()` to work with the data as a JavaScript object:

```typescript
const result = await ncmget.search('淘气的Roy');

// result is a JSON string
console.log(typeof result); // "string"

// Parse it to use as an object
const data = JSON.parse(result);
console.log(data[0].name);  // First song name
```

When `format` mode is disabled (via `.format(false)`), the raw API response is returned instead. See [Advanced Usage](./advanced) for details.

## Next Steps

- [API Reference](./api-reference) — Complete method documentation
- [Types](./types) — TypeScript type definitions
- [HTTP Server](./server) — Use NCMGET as a REST API
- [Advanced](./advanced) — Cookie, encryption, and error handling
