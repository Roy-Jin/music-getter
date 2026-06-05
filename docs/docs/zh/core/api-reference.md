# API 参考

NCMGET 类的完整 API 文档，包括构造函数、实例属性和所有方法。

## 构造函数

```typescript
new NCMGET()
```

创建一个新的 NCMGET 实例，无需传入任何参数。

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();
```

## 实例属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `VERSION` | `string`（readonly） | 从 package.json 读取的版本号 |
| `raw` | `string \| null` | 最近一次 HTTP 响应的原始文本 |
| `info` | `{ statusCode: number; headers: Record<string, string> } \| null` | 最近一次响应的状态码和响应头 |
| `error` | `string \| null` | 最近一次错误的名称（`"TIMEOUT"` 或 `Error.name`） |
| `status` | `string \| null` | 最近一次错误的错误消息 |
| `temp` | `Record<string, unknown>` | 临时数据存储 |
| `isFormat` | `boolean` | 是否格式化返回数据，默认 `true` |
| `header` | `Headers` | HTTP 请求头 |

```typescript
const ncmget = new NCMGET();

console.log(ncmget.VERSION);   // "1.0.0"（示例）
console.log(ncmget.isFormat);  // true

const result = await ncmget.search('淘气的Roy');
console.log(ncmget.raw);       // 原始 HTTP 响应文本
console.log(ncmget.info);      // { statusCode: 200, headers: {...} }
console.log(ncmget.error);     // null（无错误时）
```

## 配置方法

### cookie()

```typescript
cookie(cookie: string): this
```

设置 HTTP 请求的 Cookie，用于认证访问。支持链式调用。

**参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `cookie` | `string` | Cookie 字符串 |

**返回值：** `this`（当前实例，支持链式调用）

```typescript
const ncmget = new NCMGET();

// 设置 Cookie 后请求数据
const result = await ncmget.cookie('MUSIC_U=xxx; __csrf=yyy').song(3374579108);
```

### format()

```typescript
format(format = true): this
```

切换数据格式化模式。默认启用格式化，传入 `false` 可获取原始 API 响应。支持链式调用。

**参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `format` | `boolean` | `true` | 是否格式化返回数据 |

**返回值：** `this`（当前实例，支持链式调用）

```typescript
const ncmget = new NCMGET();

// 获取格式化数据（默认）
const formatted = await ncmget.format(true).song(3374579108);

// 获取原始 API 响应
const raw = await ncmget.format(false).song(3374579108);
```

## 数据检索方法

### search()

```typescript
search(keyword: string, option: SearchOption = {}): Promise<string>
```

搜索音乐资源。

**参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `keyword` | `string` | — | 搜索关键词 |
| `option` | `SearchOption` | `{}` | 搜索选项 |

**SearchOption 字段：**

| 字段 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `type` | `number` | `1` | 搜索类型：1=歌曲，10=专辑，100=歌手，1000=歌单 |
| `limit` | `number` | `30` | 返回数量限制 |
| `page` | `number` | `1` | 页码 |

**返回值：** `Promise<string>` — JSON 字符串

```typescript
const ncmget = new NCMGET();

// 搜索歌曲（默认）
const songs = await ncmget.search('淘气的Roy');

// 搜索专辑
const albums = await ncmget.search('淘气的Roy', { type: 10 });

// 搜索歌手
const artists = await ncmget.search('淘气的Roy', { type: 100 });

// 搜索歌单
const playlists = await ncmget.search('淘气的Roy', { type: 1000 });

// 自定义分页和数量
const result = await ncmget.search('淘气的Roy', { type: 1, limit: 10, page: 2 });
```

### song()

```typescript
song(id: string | number): Promise<string>
```

获取歌曲详情。

**参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 歌曲ID |

**返回值：** `Promise<string>` — JSON 字符串，解析后为 `SongData` 对象

```typescript
const ncmget = new NCMGET();

const result = await ncmget.song(3374579108);
const song = JSON.parse(result);

console.log(song.name);    // 歌曲名
console.log(song.artist);  // 歌手数组
console.log(song.album);   // 专辑名
```

### album()

```typescript
album(id: string | number): Promise<string>
```

获取专辑歌曲列表。

**参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 专辑ID |

**返回值：** `Promise<string>` — JSON 字符串，解析后为 `SongData[]` 数组

```typescript
const ncmget = new NCMGET();

const result = await ncmget.album(372893716);
const songs = JSON.parse(result);

console.log(`专辑包含 ${songs.length} 首歌曲`);
```

### artist()

```typescript
artist(id: string | number, limit = 50): Promise<string>
```

获取歌手热门歌曲。

**参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `id` | `string \| number` | — | 歌手ID |
| `limit` | `number` | `50` | 返回数量限制 |

**返回值：** `Promise<string>` — JSON 字符串，解析后为 `SongData[]` 数组

```typescript
const ncmget = new NCMGET();

// 获取前50首热门歌曲（默认）
const result = await ncmget.artist(124180405);

// 获取前10首热门歌曲
const result2 = await ncmget.artist(124180405, 10);
```

### playlist()

```typescript
playlist(id: string | number): Promise<string>
```

获取歌单歌曲列表。

**参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 歌单ID |

**返回值：** `Promise<string>` — JSON 字符串，解析后为 `SongData[]` 数组

```typescript
const ncmget = new NCMGET();

const result = await ncmget.playlist(7697114803);
const songs = JSON.parse(result);

console.log(`歌单包含 ${songs.length} 首歌曲`);
```

## 资源 URL 方法

### url()

```typescript
url(id: string | number, br = 320): Promise<string>
```

获取音频文件 URL。

**参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `id` | `string \| number` | — | 歌曲ID |
| `br` | `number` | `320` | 比特率，单位为 kbps |

**返回值：** `Promise<string>` — JSON 字符串，解析后为 `UrlData` 对象

```typescript
const ncmget = new NCMGET();

// 获取 320kbps 音频（默认）
const result = await ncmget.url(3374579108);
const urlData = JSON.parse(result);
console.log(urlData.url);  // 音频URL
console.log(urlData.br);   // 比特率
console.log(urlData.size); // 文件大小（字节）

// 获取 128kbps 音频
const result128 = await ncmget.url(3374579108, 128);

// 获取最高品质
const resultMax = await ncmget.url(3374579108, 999);
```

### lrc()

```typescript
lrc(id: string | number): Promise<string>
```

获取歌词（含翻译歌词）。

**参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 歌曲ID |

**返回值：** `Promise<string>` — JSON 字符串，解析后为 `LrcData` 对象

```typescript
const ncmget = new NCMGET();

const result = await ncmget.lrc(3374579108);
const lrcData = JSON.parse(result);

console.log(lrcData.lrc);   // 原文歌词（LRC格式）
console.log(lrcData.tlrc);  // 翻译歌词（LRC格式）
```

### pic()

```typescript
pic(id: string | number, size = 300): Promise<string>
```

获取封面图片 URL。

**参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `id` | `string \| number` | — | 封面图片ID |
| `size` | `number` | `300` | 图片尺寸（像素） |

**返回值：** `Promise<string>` — 封面图片 URL 字符串

```typescript
const ncmget = new NCMGET();

// 获取 300x300 封面（默认）
const url = await ncmget.pic(3374579108);
console.log(url);  // 图片URL

// 获取更高清的封面
const hdUrl = await ncmget.pic(3374579108, 800);
```
