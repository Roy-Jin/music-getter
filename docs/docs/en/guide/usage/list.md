# List Resources

Use the `list` command (alias `ls`) to list music resources from a playlist or artist.

## Basic Usage

```sh
mg list <resource-id> [options]
```

`resource-id` is the unique identifier of the resource on the music platform.

### Examples

```sh
# List songs in a playlist
mg list 7697114803

# Use the ls alias
mg ls 7697114803

# List songs by an artist
mg list 6452 --type artist
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-t, --type <type>` | Resource type (`playlist` / `artist`) | `playlist` |
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |

## Resource Types

### Playlist

List all songs in a specified playlist. This is the default resource type.

```sh
mg list 7697114803
```

### Artist

List songs by a specified artist.

```sh
mg list 6452 --type artist
```

## Output Format

The list command displays the platform, ID, song name, and artist for each resource:

```
 netease|1372188635 	Daylight  David Kushner
 netease|1387193847 	Blue and White Porcelain  Jay Chou
```

The `platform|ID` combination can be directly used with the `song` command to download songs.

## Use Cases

1. **Preview playlist content**: Check which songs are in a playlist before downloading
2. **Get song IDs**: Copy song IDs from the list for downloading
3. **Browse artist works**: View the song list of a particular artist