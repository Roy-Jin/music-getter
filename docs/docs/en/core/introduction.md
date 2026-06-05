# Introduction

NCMGET Core is the programmatic API layer of the **NCMGET** (NetEase Cloud Music Getter) project. It provides a single class `NCMGET` that encapsulates all interactions with the NetEase Cloud Music API, including search, metadata retrieval, audio URL resolution, lyrics fetching, and cover image access.

## Architecture Overview

NCMGET follows a layered architecture:

```
┌─────────────────────────────────────┐
│              CLI Layer              │
│         (commander commands)        │
├─────────────────────────────────────┤
│            Server Layer             │
│           (Hono HTTP server)        │
├─────────────────────────────────────┤
│             Core Layer              │
│          (NCMGET class + Utils)       │
├─────────────────────────────────────┤
│           NetEase Cloud API         │
└─────────────────────────────────────┘
```

- **Core → Utils**: The NCMGET class delegates download management to `DLManager`, display formatting to `Display`, filename templating to `Format`, and browser launching to `OpenBrowser`.
- **Core → Server**: The HTTP server creates a new NCMGET instance per request and exposes core methods as REST endpoints.
- **CLI → Core**: Each command instantiates NCMGET and calls the corresponding method.

## Key Design Decisions

### Single Class Encapsulation

All API interactions are encapsulated within the `NCMGET` class. There are no separate client objects or service classes — one instance handles everything.

### Chainable Configuration

The `cookie()` and `format()` methods return `this`, enabling a fluent configuration style:

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET().cookie('your_cookie').format(true);
```

### JSON String Returns

All data retrieval methods return `Promise<string>` — the result is a JSON string that you parse yourself with `JSON.parse()`. This design keeps the core lightweight and lets consumers decide how to handle the data.

```typescript
const result = await ncmget.search('淘气的Roy');
const data = JSON.parse(result);
```

### Pipeline Data Processing

Internally, the `_exec` method processes requests through a pipeline:

1. **Encode** — Apply API-specific encryption (e.g., `netease_eapi`)
2. **HTTP** — Send the request with retry logic (3 retries, 1s interval)
3. **Decode** — Parse the response (e.g., `netease_url`, `netease_lrc`)
4. **Format** — Extract and structure the data using a dot-path format string

## Quick Example

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();

// Search for songs
const searchResult = await ncmget.search('淘气的Roy');
const songs = JSON.parse(searchResult);

// Get song details
const songDetail = await ncmget.song(songs[0].id);

// Get audio URL
const urlResult = await ncmget.url(songs[0].id);
const urlData = JSON.parse(urlResult);

// Get lyrics
const lrcResult = await ncmget.lrc(songs[0].id);
const lrcData = JSON.parse(lrcResult);
```

## Next Steps

- [Getting Started](./getting-started) — Install and use NCMGET in your project
- [API Reference](./api-reference) — Complete method and property documentation
- [Types](./types) — TypeScript type definitions
- [HTTP Server](./server) — REST API server mode
- [Advanced](./advanced) — Cookie, encryption, and error handling
