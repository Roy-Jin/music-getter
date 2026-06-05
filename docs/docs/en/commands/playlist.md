# playlist

Download all songs in a playlist.

## Usage

```bash
ncmget playlist <id...> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<id...>` | One or more playlist IDs (space-separated) |

## Options

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Output | `-o, --output <output>` | `./` | Output directory for downloaded files |
| Format | `-f, --format <format>` | `{name} - {artist}` | Filename format template |

## Examples

### Download all songs in a playlist

```bash
ncmget playlist 7697114803
```

### Download multiple playlists

```bash
ncmget playlist 7697114803 111111
```

### Download to a specific directory

```bash
ncmget playlist 7697114803 -o ~/Music/Playlists
```

### Custom filename format

```bash
ncmget playlist 7697114803 -f "{album}/{name}"
```

## Output

Each song in the playlist is downloaded as an MP3 file. The command first fetches the playlist's song list, then downloads each song individually.

If a particular song cannot be downloaded, an error message is displayed and the command continues to the next song.

