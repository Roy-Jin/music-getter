# song

Download songs by ID.

## Usage

```bash
ncmget song <id...> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<id...>` | One or more song IDs (space-separated) |

## Options

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Output | `-o, --output <output>` | `./` | Output directory for downloaded files |
| Format | `-f, --format <format>` | `{name} - {artist}` | Filename format template |

## Examples

### Download a single song

```bash
ncmget song 3374579108
```

### Download multiple songs

```bash
ncmget song 3374579108 111111 222222
```

### Download to a specific directory

```bash
ncmget song 3374579108 -o ~/Music
```

### Custom filename format

```bash
ncmget song 3374579108 -f "{artist} - {name}"
```

## Output

Each song is downloaded as an MP3 file to the specified output directory. The filename is determined by the format template (default: `{name} - {artist}.mp3`).

If a song cannot be downloaded (e.g., due to copyright restrictions), an error message is displayed and the command continues to the next ID.

