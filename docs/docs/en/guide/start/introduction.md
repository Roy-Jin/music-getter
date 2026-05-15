# Introduction

Music Getter is a command-line music resource acquisition tool based on the Meting API. It supports searching, previewing, and downloading music resources from multiple music platforms, and provides a complete Node.js programming interface for easy integration into other projects.

## Features

- **Multi-Platform** — Supports NetEase Cloud Music and other platforms
- **Song Search** — Cross-platform search with flexible control over type, pagination, and result count
- **Single Song Download** — Download individual songs with optional lyrics and covers
- **Playlist Download** — Download entire playlists with one command
- **Resource Listing** — List music resources from playlists or artists
- **Online Preview** — Preview songs directly in your browser
- **Lyrics & Covers** — Optionally download LRC lyrics files and cover images
- **Bitrate Control** — Supports 128kbps, 192kbps, and 320kbps audio bitrates
- **Custom API** — Support for custom Meting API endpoints
- **Progress Display** — Real-time progress bars and speed display during downloads

## Tech Stack

| Technology | Description |
|------------|-------------|
| **TypeScript** | Written in TypeScript with complete type definitions |
| **Commander.js** | CLI framework for command and argument parsing |
| **cli-progress** | Terminal progress bar display |
| **Meting API** | Unified music resource interface aggregating multi-platform data |
| **Node.js Fetch** | Built-in HTTP client for network requests |

## Project Structure

```
music-getter/
├── src/
│   ├── bin/
│   │   └── cli.ts          # CLI entry point
│   ├── commands/
│   │   ├── song.ts          # Single song download command
│   │   ├── playlist.ts      # Playlist download command
│   │   ├── list.ts          # Resource listing command
│   │   ├── search.ts        # Search command
│   │   └── preview.ts       # Preview command
│   ├── core/
│   │   ├── meting.ts        # Meting API client
│   │   ├── download.ts      # Download manager
│   │   └── util.ts          # Utility functions
│   └── index.ts             # Library entry point
├── docs/                    # Documentation directory
├── package.json
└── tsconfig.json
```

## How It Works

Music Getter uses the [Meting API](https://github.com/metowolf/Meting) as an intermediary layer to uniformly call interfaces from different music platforms. Users only need to specify the platform name and resource ID to get standardized music data.

```
User CLI → Music Getter → Meting API → Music Platform (NetEase, etc.)
                              ↓
                    Returns Standardized JSON Data
                              ↓
                  Music Getter Processes and Downloads
```

## Next Steps

- Check out the [Installation Guide](/guide/start/installation) to get started
- Check out the [Usage Guide](/guide/usage/song) for detailed command usage
- Check out the [API Documentation](/api/) for the programming interface