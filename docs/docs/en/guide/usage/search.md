# Search Music

Use the `search` command to search for songs across platforms, supporting multi-platform simultaneous search, pagination, and custom search types.

## Basic Usage

```sh
mg search <search-term> [options]
```

`search-term` is the keyword to search for, which can be a song name, artist name, etc.

### Examples

```sh
# Search on the default platform (NetEase)
mg search "Daylight"

# Specify result count and page number
mg search "Daylight" --limit 10 --page 2

# Specify search type
mg search "Jay Chou" --type 1
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-s, --server <source...>` | Music platform(s) (repeatable) | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |
| `-t, --type <type>` | Search type | `1` |
| `-p, --page <number>` | Page number | `1` |
| `-l, --limit <number>` | Results per page | `30` |

## Search Types

The `--type` parameter controls the search type:

| Value | Description |
|-------|-------------|
| `1` | Song |
| `100` | Artist |
| `1000` | Album |
| `1004` | Playlist |
| `1006` | Lyrics |
| `1009` | User |

## Multi-Platform Search

You can specify multiple platforms simultaneously, and results will be merged:

```sh
mg search "Daylight" --server netease
```

The output shows which platform each result comes from:

```
netease|1372188635 	Daylight David Kushner
```

## Search Results

Search results display the following information:

- **Platform and ID**: `platform|songID`, usable with the `song` or `preview` command
- **Song Name**: Displayed in bold
- **Artist**: Displayed in gray

```
 netease|1372188635 	Daylight  David Kushner
 netease|1387193847 	Blue and White Porcelain  Jay Chou
```