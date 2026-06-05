# album

Download all songs in an album.

## Usage

```bash
ncmget album <id...> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<id...>` | One or more album IDs (space-separated) |

## Options

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Output | `-o, --output <output>` | `./` | Output directory for downloaded files |
| Format | `-f, --format <format>` | `{name} - {artist}` | Filename format template |

## Examples

### Download all songs in an album

```bash
ncmget album 372893716
```

### Download multiple albums

```bash
ncmget album 372893716 111111
```

### Download to a specific directory

```bash
ncmget album 372893716 -o ~/Music/Albums
```

### Custom filename format

```bash
ncmget album 372893716 -f "{album}/{name}"
```

## Output

Each song in the album is downloaded as an MP3 file. The command first fetches the album's song list, then downloads each song individually.

If a particular song cannot be downloaded, an error message is displayed and the command continues to the next song.

