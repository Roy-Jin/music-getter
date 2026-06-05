# API Reference

Complete reference for the `NCMGET` class, the core of the NCMGET library.

## Constructor

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();
```

Creates a new NCMGET instance with default settings. No constructor parameters are required.

## Instance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `VERSION` | `string` (readonly) | — | Version from package.json |
| `raw` | `string \| null` | `null` | Last HTTP response raw text |
| `info` | `{ statusCode: number; headers: Record<string, string> } \| null` | `null` | Last response status code and headers |
| `error` | `string \| null` | `null` | Last error name (`"TIMEOUT"` or `Error.name`) |
| `status` | `string \| null` | `null` | Last error message |
| `temp` | `Record<string, unknown>` | `{}` | Temporary data storage |
| `isFormat` | `boolean` | `true` | Whether to format data |
| `header` | `Headers` | — | HTTP request headers |

## Configuration Methods

### `cookie(cookie: string): this`

Set the cookie for authenticated API access. Returns `this` for chaining.

```typescript
const ncmget = new NCMGET().cookie('MUSIC_U=xxx; os=pc');
```

The cookie is typically used for accessing user-specific data such as playlists and higher-quality audio streams.

### `format(format?: boolean): this`

Toggle data formatting. When `true` (default), responses are formatted into structured objects. When `false`, raw API responses are returned. Returns `this` for chaining.

```typescript
// Enable formatting (default)
const ncmget = new NCMGET().format(true);

// Disable formatting to get raw API response
const ncmget = new NCMGET().format(false);
```

## Data Retrieval Methods

### `search(keyword: string, option?: SearchOption): Promise<string>`

Search for music resources on NetEase Cloud Music.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `keyword` | `string` | — | Search keyword |
| `option` | `SearchOption` | `{}` | Search options |

**SearchOption:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | `number` | `1` | Search type: `1` = song, `10` = album, `100` = artist, `1000` = playlist |
| `limit` | `number` | `30` | Number of results per page |
| `page` | `number` | `1` | Page number (1-based) |

**Example:**

```typescript
const ncmget = new NCMGET();

// Search for songs (default)
const songs = await ncmget.search('淘气的Roy');

// Search for albums
const albums = await ncmget.search('淘气的Roy', { type: 10 });

// Search with pagination
const page2 = await ncmget.search('淘气的Roy', { limit: 10, page: 2 });
```

### `song(id: string | number): Promise<string>`

Get song details by ID.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Song ID |

**Example:**

```typescript
const ncmget = new NCMGET();

const result = await ncmget.song(3374579108);
const song = JSON.parse(result);
// song: { id, name, artist, album, pic_id, url_id, lrc_id, source }
```

### `album(id: string | number): Promise<string>`

Get all songs in an album.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Album ID |

**Example:**

```typescript
const ncmget = new NCMGET();

const result = await ncmget.album(372893716);
const songs = JSON.parse(result);
// songs: SongData[]
```

### `artist(id: string | number, limit?: number): Promise<string>`

Get hot songs by an artist.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | Artist ID |
| `limit` | `number` | `50` | Maximum number of songs to return |

**Example:**

```typescript
const ncmget = new NCMGET();

// Get top 50 hot songs (default)
const result = await ncmget.artist(124180405);

// Get top 10 hot songs
const result = await ncmget.artist(124180405, 10);
```

### `playlist(id: string | number): Promise<string>`

Get all songs in a playlist.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Playlist ID |

**Example:**

```typescript
const ncmget = new NCMGET();

const result = await ncmget.playlist(7697114803);
const songs = JSON.parse(result);
// songs: SongData[]
```

## Resource URL Methods

### `url(id: string | number, br?: number): Promise<string>`

Get the audio playback URL for a song.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | Song ID |
| `br` | `number` | `320` | Bitrate in kbps |

**Example:**

```typescript
const ncmget = new NCMGET();

// Get 320kbps URL (default)
const result = await ncmget.url(3374579108);
const urlData = JSON.parse(result);
// urlData: { url, size, br }

// Get 128kbps URL
const result = await ncmget.url(3374579108, 128);
```

### `lrc(id: string | number): Promise<string>`

Get lyrics with translation for a song.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | Song ID |

**Example:**

```typescript
const ncmget = new NCMGET();

const result = await ncmget.lrc(3374579108);
const lrcData = JSON.parse(result);
// lrcData: { lrc, tlrc }
console.log(lrcData.lrc);   // Original lyrics (LRC format)
console.log(lrcData.tlrc);  // Translated lyrics (LRC format)
```

### `pic(id: string | number, size?: number): Promise<string>`

Get the cover image URL for a song.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | Song ID (uses `pic_id`) |
| `size` | `number` | `300` | Image size in pixels |

**Example:**

```typescript
const ncmget = new NCMGET();

// Get 300px cover (default)
const result = await ncmget.pic(3374579108);

// Get 800px cover
const result = await ncmget.pic(3374579108, 800);
```
