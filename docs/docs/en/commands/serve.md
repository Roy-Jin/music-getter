# serve

Start the NCMGET HTTP API server powered by Hono.

## Usage

```bash
ncmget serve [options]
```

## Options

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Port | `-p, --port <port>` | `3000` | Server listening port |
| Host | `-h, --host <host>` | `0.0.0.0` | Server listening host |
| Logger | `--logger` | `false` | Enable request logging |

## Examples

### Start with defaults

```bash
ncmget serve
```

Starts the server at `http://0.0.0.0:3000`.

### Custom port

```bash
ncmget serve -p 8080
```

Starts the server at `http://0.0.0.0:8080`.

### Custom host and port

```bash
ncmget serve -h 127.0.0.1 -p 8080
```

Starts the server at `http://127.0.0.1:8080`.

### Enable logging

```bash
ncmget serve --logger
```

Logs each incoming request to the console.

## Output

When the server starts, it displays the listening address:

```
Server running at http://0.0.0.0:3000
```

## Available Endpoints

Once running, the following REST endpoints are available:

| Endpoint | Description |
|----------|-------------|
| `GET /search` | Search for music |
| `GET /song` | Get song details |
| `GET /album` | Get album songs |
| `GET /artist` | Get artist hot songs |
| `GET /playlist` | Get playlist songs |
| `GET /url` | Get audio URL |
| `GET /lrc` | Get lyrics |
| `GET /pic` | Get cover image URL |
| `GET /` | List all routes |

See [HTTP Server](/server) for detailed endpoint documentation.

