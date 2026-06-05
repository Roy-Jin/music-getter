# HTTP Server Mode

NCMGET includes a built-in HTTP server powered by [Hono](https://hono.dev/), allowing you to access NCMGET's functionality via REST API endpoints.

## Starting the Server

Use the `serve` command to start the server:

```bash
# Start on default port 3000
ncmget serve

# Custom port and host
ncmget serve -p 8080 -h 127.0.0.1

# Enable request logging
ncmget serve --logger
```

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Port | `-p, --port <port>` | `3000` | Server port |
| Host | `-h, --host <host>` | `0.0.0.0` | Server host |
| Logger | `--logger` | `false` | Enable request logging |

See [serve](/commands/serve) for full command details.

## REST Endpoints

All endpoints are accessible via GET requests. Query parameters are used for input.

### `GET /search`

Search for music resources.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `keyword` | `string` | — | **Required.** Search keyword |
| `type` | `number` | `1` | Search type: 1=song, 10=album, 100=artist, 1000=playlist |
| `limit` | `number` | `30` | Results per page |
| `page` | `number` | `1` | Page number |

```
GET /search?keyword=淘气的Roy&type=1&limit=10&page=1
```

### `GET /song`

Get song details.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | **Required.** Song ID |

```
GET /song?id=3374579108
```

### `GET /album`

Get album songs.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | **Required.** Album ID |

```
GET /album?id=372893716
```

### `GET /artist`

Get artist hot songs.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | **Required.** Artist ID |
| `limit` | `number` | `50` | Maximum songs to return |

```
GET /artist?id=124180405&limit=20
```

### `GET /playlist`

Get playlist songs.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | **Required.** Playlist ID |

```
GET /playlist?id=7697114803
```

### `GET /url`

Get audio playback URL.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | **Required.** Song ID |
| `br` | `number` | `320` | Bitrate in kbps |

```
GET /url?id=3374579108&br=320
```

### `GET /lrc`

Get lyrics with translation.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string \| number` | **Required.** Song ID |

```
GET /lrc?id=3374579108
```

### `GET /pic`

Get cover image URL.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | `string \| number` | — | **Required.** Song ID |
| `size` | `number` | `300` | Image size in pixels |

```
GET /pic?id=3374579108&size=800
```

### `GET /`

Lists all available routes.

## Middleware Behavior

### CORS

CORS is enabled globally on all endpoints. All origins are allowed, making the server suitable for frontend integration.

### Per-Request NCMGET Instance

A new `NCMGET` instance is created for each incoming request. This ensures request isolation — one request's configuration (cookie, format mode) does not affect another.

### Cookie via Request Header

You can pass a cookie string via the `Cookie` HTTP header on any request. The server will apply it to the per-request NCMGET instance:

```bash
curl -H "Cookie: MUSIC_U=xxx" http://localhost:3000/url?id=3374579108&br=999
```

### Raw Mode

Append the `?raw` query parameter to any endpoint to receive the unformatted raw API response instead of the formatted output:

```bash
# Formatted response (default)
curl http://localhost:3000/song?id=3374579108

# Raw API response
curl http://localhost:3000/song?id=3374579108&raw
```

## Response Format

All endpoints return JSON responses. The structure depends on whether `?raw` is used:

- **Formatted** (default): Returns the structured data as documented in [Types](/core/types)
- **Raw**: Returns the original NetEase Cloud Music API response
