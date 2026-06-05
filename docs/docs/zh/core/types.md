# 类型定义

NCMGET 导出的所有 TypeScript 类型定义。

## SongData

歌曲数据，表示一首歌曲的基本信息。

```typescript
interface SongData {
  id: string | number;       // 歌曲ID
  name: string;              // 歌曲名称
  artist: string[];          // 歌手名称数组
  album: string;             // 专辑名称
  pic_id: string | number;   // 封面图片ID
  url_id: string | number;   // 音频URL对应的ID
  lrc_id: string | number;   // 歌词对应的ID
  source: string;            // 数据来源
}
```

**使用示例：**

```typescript
import { NCMGET, SongData } from 'ncmget';

const ncmget = new NCMGET();
const result = await ncmget.search('淘气的Roy');
const songs: SongData[] = JSON.parse(result);

songs.forEach(song => {
  console.log(`${song.name} - ${song.artist.join('/')} [${song.album}]`);
});
```

## UrlData

音频 URL 数据，包含音频文件地址和相关信息。

```typescript
interface UrlData {
  url: string;       // 音频文件URL
  size?: number;     // 文件大小（字节）
  br?: number;       // 比特率（kbps）
}
```

**使用示例：**

```typescript
import { NCMGET, UrlData } from 'ncmget';

const ncmget = new NCMGET();
const result = await ncmget.url(3374579108);
const urlData: UrlData = JSON.parse(result);

console.log(`音频地址: ${urlData.url}`);
console.log(`比特率: ${urlData.br}kbps`);
if (urlData.size) {
  console.log(`文件大小: ${(urlData.size / 1024 / 1024).toFixed(2)}MB`);
}
```

## LrcData

歌词数据，包含原文歌词和翻译歌词。

```typescript
interface LrcData {
  lrc: string;    // 原文歌词（LRC格式）
  tlrc: string;   // 翻译歌词（LRC格式）
}
```

**使用示例：**

```typescript
import { NCMGET, LrcData } from 'ncmget';

const ncmget = new NCMGET();
const result = await ncmget.lrc(3374579108);
const lrcData: LrcData = JSON.parse(result);

console.log('原文歌词:');
console.log(lrcData.lrc);

if (lrcData.tlrc) {
  console.log('翻译歌词:');
  console.log(lrcData.tlrc);
}
```

## SearchOption

搜索选项，用于配置搜索行为。

```typescript
interface SearchOption {
  type?: number;    // 搜索类型：1=歌曲，10=专辑，100=歌手，1000=歌单
  limit?: number;   // 返回数量限制，默认30
  page?: number;    // 页码，默认1
}
```

**使用示例：**

```typescript
import { NCMGET, SearchOption } from 'ncmget';

const ncmget = new NCMGET();

// 搜索歌曲
const option: SearchOption = { type: 1, limit: 10, page: 1 };
const result = await ncmget.search('淘气的Roy', option);

// 搜索专辑
const albumResult = await ncmget.search('淘气的Roy', { type: 10 });

// 搜索歌手
const artistResult = await ncmget.search('淘气的Roy', { type: 100 });

// 搜索歌单
const playlistResult = await ncmget.search('淘气的Roy', { type: 1000 });
```

## ApiConfig

API 配置，用于定义内部 API 请求的参数。主要用于理解 NCMGET 内部管道机制。

```typescript
interface ApiConfig {
  method: "GET" | "POST";                    // HTTP 方法
  url: string;                               // 请求URL
  body: Record<string, unknown> | null;      // 请求体
  encode?: string;    // 加密方式，如 "netease_eapi"
  decode?: string;    // 解码方式，如 "netease_url" | "netease_lrc"
  format?: string;    // 格式化路径，点号分隔如 "result.songs"
}
```

**字段说明：**

| 字段 | 类型 | 描述 |
|------|------|------|
| `method` | `"GET" \| "POST"` | HTTP 请求方法 |
| `url` | `string` | 请求的 URL 地址 |
| `body` | `Record<string, unknown> \| null` | POST 请求的请求体 |
| `encode` | `string`（可选） | 加密方式，目前支持 `"netease_eapi"` |
| `decode` | `string`（可选） | 解码方式，支持 `"netease_url"` 和 `"netease_lrc"` |
| `format` | `string`（可选） | 格式化路径，使用点号分隔的属性路径，如 `"result.songs"` |

## Headers

HTTP 请求头类型。

```typescript
type Headers = Record<string, string>;
```

**使用示例：**

```typescript
import { NCMGET, Headers } from 'ncmget';

const ncmget = new NCMGET();

// 查看当前请求头
const headers: Headers = ncmget.header;
console.log(headers);

// 设置自定义请求头
ncmget.header['X-Custom-Header'] = 'value';
```
