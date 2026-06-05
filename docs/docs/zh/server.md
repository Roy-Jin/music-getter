# HTTP 服务器

NCMGET 内置了基于 Hono 的 HTTP 服务器，可以通过 REST API 访问所有功能。

## 启动服务器

使用 `serve` 命令启动服务器：

```bash
ncmget serve
```

默认监听 `0.0.0.0:3000`，可通过选项自定义：

```bash
# 指定端口
ncmget serve -p 8080

# 指定主机和端口
ncmget serve -h 127.0.0.1 -p 8080

# 启用请求日志
ncmget serve --logger
```

更多详情请参阅 [serve 命令](/commands/serve)。

## REST 端点

### GET /search

搜索音乐资源。

**查询参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `keyword` | `string` | — | 搜索关键词（必填） |
| `type` | `number` | `1` | 搜索类型：1=歌曲，10=专辑，100=歌手，1000=歌单 |
| `limit` | `number` | `30` | 返回数量限制 |
| `page` | `number` | `1` | 页码 |

**示例：**

```bash
curl "http://localhost:3000/search?keyword=淘气的Roy&type=1&limit=10"
```

### GET /song

获取歌曲详情。

**查询参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 歌曲ID（必填） |

**示例：**

```bash
curl "http://localhost:3000/song?id=3374579108"
```

### GET /album

获取专辑歌曲列表。

**查询参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 专辑ID（必填） |

**示例：**

```bash
curl "http://localhost:3000/album?id=372893716"
```

### GET /artist

获取歌手热门歌曲。

**查询参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `id` | `string \| number` | — | 歌手ID（必填） |
| `limit` | `number` | `50` | 返回数量限制 |

**示例：**

```bash
curl "http://localhost:3000/artist?id=124180405&limit=10"
```

### GET /playlist

获取歌单歌曲列表。

**查询参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 歌单ID（必填） |

**示例：**

```bash
curl "http://localhost:3000/playlist?id=7697114803"
```

### GET /url

获取音频文件 URL。

**查询参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `id` | `string \| number` | — | 歌曲ID（必填） |
| `br` | `number` | `320` | 比特率（kbps） |

**示例：**

```bash
curl "http://localhost:3000/url?id=3374579108&br=320"
```

### GET /lrc

获取歌词。

**查询参数：**

| 参数 | 类型 | 描述 |
|------|------|------|
| `id` | `string \| number` | 歌曲ID（必填） |

**示例：**

```bash
curl "http://localhost:3000/lrc?id=3374579108"
```

### GET /pic

获取封面图片 URL。

**查询参数：**

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `id` | `string \| number` | — | 封面图片ID（必填） |
| `size` | `number` | `300` | 图片尺寸（像素） |

**示例：**

```bash
curl "http://localhost:3000/pic?id=3374579108&size=800"
```

### GET /

列出所有可用路由。

**示例：**

```bash
curl "http://localhost:3000/"
```

## 中间件行为

### CORS

全局启用 CORS，所有响应都包含跨域头，允许从任何域名访问 API。

### 每请求 NCMGET 实例

每个 HTTP 请求都会创建一个新的 `NCMGET` 实例，确保请求之间不会相互干扰。

### Cookie 传递

通过请求头 `Cookie` 传递认证信息。服务器会读取请求头中的 Cookie 并设置到 NCMGET 实例上：

```bash
curl -H "Cookie: MUSIC_U=xxx; __csrf=yyy" "http://localhost:3000/song?id=3374579108"
```

### raw 查询参数

所有端点都支持 `raw` 查询参数。当 `raw` 参数存在时，将禁用数据格式化，返回原始 API 响应：

```bash
# 格式化响应（默认）
curl "http://localhost:3000/song?id=3374579108"

# 原始响应
curl "http://localhost:3000/song?id=3374579108&raw"
```

## 响应格式

所有端点返回 JSON 格式的数据。格式化模式下的响应结构对应 Core API 返回的数据结构（解析后的 JSON）。原始模式下的响应为网易云音乐 API 的原始返回格式。
