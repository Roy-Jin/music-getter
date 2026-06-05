# search

Search for music, albums, artists, or playlists on NetEase Cloud Music.

## Usage

```bash
ncmget search <keyword> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<keyword>` | Search keyword (required) |

## Options

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Type | `-t, --type <type>` | `1` | Search type: `1` = song, `10` = album, `100` = artist, `1000` = playlist |
| Limit | `-l, --limit <limit>` | `30` | Number of results per page |
| Page | `-p, --page <page>` | `1` | Page number (1-based) |

## Examples

### Search for songs

```bash
ncmget search "淘气的Roy"
```

Returns a numbered list of matching songs with their IDs, names, and artists.

### Search for albums

```bash
ncmget search "淘气的Roy" -t 10
```

### Search for artists

```bash
ncmget search "淘气的Roy" -t 100
```

### Search for playlists

```bash
ncmget search "淘气的Roy" -t 1000
```

### Limit results and paginate

```bash
ncmget search "淘气的Roy" -l 10 -p 2
```

Returns the second page with 10 results per page.

## Output

The search command displays a formatted list of results. For song searches, each entry includes:

- Index number
- Song ID
- Song name
- Artist name(s)
- Album name

Use the displayed IDs with other commands like `song`, `album`, `playlist`, etc.

