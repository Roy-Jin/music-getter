# Type Definitions

NCMGET exports the following TypeScript types for use in your projects.

## SongData

Represents a song's metadata.

```typescript
interface SongData {
  id: string | number;
  name: string;
  artist: string[];
  album: string;
  pic_id: string | number;
  url_id: string | number;
  lrc_id: string | number;
  source: string;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string \| number` | Song ID |
| `name` | `string` | Song name |
| `artist` | `string[]` | Array of artist names |
| `album` | `string` | Album name |
| `pic_id` | `string \| number` | Cover image ID |
| `url_id` | `string \| number` | Audio URL ID |
| `lrc_id` | `string \| number` | Lyrics ID |
| `source` | `string` | Data source identifier |

**Usage:**

```typescript
import { NCMGET, SongData } from 'ncmget';

const ncmget = new NCMGET();
const result = await ncmget.search('淘气的Roy');
const songs: SongData[] = JSON.parse(result);

songs.forEach(song => {
  console.log(`${song.name} - ${song.artist.join(', ')}`);
});
```

## UrlData

Represents an audio URL with metadata.

```typescript
interface UrlData {
  url: string;
  size?: number;
  br?: number;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `url` | `string` | Playable audio URL |
| `size` | `number` (optional) | File size in bytes |
| `br` | `number` (optional) | Bitrate in kbps |

**Usage:**

```typescript
import { NCMGET, UrlData } from 'ncmget';

const ncmget = new NCMGET();
const result = await ncmget.url(3374579108);
const urlData: UrlData = JSON.parse(result);

console.log(`URL: ${urlData.url}`);
console.log(`Bitrate: ${urlData.br}kbps`);
console.log(`Size: ${urlData.size} bytes`);
```

## LrcData

Represents lyrics with optional translation.

```typescript
interface LrcData {
  lrc: string;
  tlrc: string;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `lrc` | `string` | Original lyrics in LRC format |
| `tlrc` | `string` | Translated lyrics in LRC format |

**Usage:**

```typescript
import { NCMGET, LrcData } from 'ncmget';

const ncmget = new NCMGET();
const result = await ncmget.lrc(3374579108);
const lrcData: LrcData = JSON.parse(result);

console.log(lrcData.lrc);   // Original lyrics
console.log(lrcData.tlrc);  // Translation
```

## SearchOption

Options for the `search` method.

```typescript
interface SearchOption {
  type?: number;
  limit?: number;
  page?: number;
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | `number` | `1` | Search type: `1` = song, `10` = album, `100` = artist, `1000` = playlist |
| `limit` | `number` | `30` | Number of results per page |
| `page` | `number` | `1` | Page number (1-based) |

**Usage:**

```typescript
import { NCMGET, SearchOption } from 'ncmget';

const ncmget = new NCMGET();

const option: SearchOption = { type: 10, limit: 20, page: 1 };
const result = await ncmget.search('淘气的Roy', option);
```

## ApiConfig

Internal API request configuration. Used to define how an API call should be made.

```typescript
interface ApiConfig {
  method: "GET" | "POST";
  url: string;
  body: Record<string, unknown> | null;
  encode?: string;
  decode?: string;
  format?: string;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `method` | `"GET" \| "POST"` | HTTP method |
| `url` | `string` | Request URL |
| `body` | `Record<string, unknown> \| null` | Request body (for POST) |
| `encode` | `string` (optional) | Encoding method: `"netease_eapi"` |
| `decode` | `string` (optional) | Decoding method: `"netease_url"` or `"netease_lrc"` |
| `format` | `string` (optional) | Dot-path format string, e.g. `"result.songs"` |

**Usage:**

This type is primarily used internally by the NCMGET class. You typically don't need to construct `ApiConfig` objects directly unless you are extending the library.

## Headers

HTTP request headers type.

```typescript
type Headers = Record<string, string>;
```

A simple key-value map of HTTP headers. Used as the type for the `header` instance property.

**Usage:**

```typescript
import { NCMGET, Headers } from 'ncmget';

const ncmget = new NCMGET();
const headers: Headers = ncmget.header;

console.log(headers['User-Agent']);
```
