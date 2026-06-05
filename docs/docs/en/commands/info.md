# info

View resource information without downloading.

## Usage

```bash
ncmget info <type> <id...>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<type>` | Resource type: `song`, `album`, `artist`, or `playlist` |
| `<id...>` | One or more resource IDs (space-separated) |

## Examples

### View song info

```bash
ncmget info song 3374579108
```

Displays song name, artist, album, and other metadata.

### View album info

```bash
ncmget info album 372893716
```

Lists all songs in the album with their details.

### View artist info

```bash
ncmget info artist 124180405
```

Displays the artist's hot songs.

### View playlist info

```bash
ncmget info playlist 7697114803
```

Lists all songs in the playlist with their details.

### View multiple resources

```bash
ncmget info song 3374579108 111111
```

## Output

The `info` command displays formatted resource information to the console. No files are downloaded. Use this command to inspect resources before deciding to download them.

