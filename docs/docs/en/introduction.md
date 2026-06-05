# Introduction

NCMGET is a full-featured command line interface for NetEase Cloud Music. It provides 9 commands for searching, downloading, and viewing music resources directly from the terminal.

## Global Options

| Option | Description |
|--------|-------------|
| `-v, --version` | Display the NCMGET version number |
| `--help` | Display help information for any command |

## Command Overview

| Command | Description |
|---------|-------------|
| [`serve`](/commands/serve) | Start the HTTP API server |
| [`search`](/commands/search) | Search for music, albums, artists, or playlists |
| [`song`](/commands/song) | Download songs by ID |
| [`album`](/commands/album) | Download all songs in an album |
| [`playlist`](/commands/playlist) | Download all songs in a playlist |
| [`lrc`](/commands/lrc) | Download lyrics for songs |
| [`pic`](/commands/pic) | Download cover images for songs |
| [`info`](/commands/info) | View resource information without downloading |
| [`preview`](/commands/preview) | Preview a song in the browser |

## Basic Workflow

The typical NCMGET workflow is: **search → download**.

### Step 1: Search for a Song

```bash
ncmget search "淘气的Roy"
```

This returns a numbered list of matching songs with their IDs.

### Step 2: Download the Song

Use the ID from the search results:

```bash
ncmget song 3374579108
```

### Step 3: Download to a Specific Directory

```bash
ncmget song 3374579108 -o ~/Music
```

## Getting Started

- [Installation](./installation) — Install the NCMGET
- [Commands](/commands/serve) — Detailed command documentation
- [Filename Format](./filename-format) — Customize output file names
- [Best Practices](./best-practices) — Tips for efficient usage
