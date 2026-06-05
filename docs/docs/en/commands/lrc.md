# lrc

Download lyrics for songs.

## Usage

```bash
ncmget lrc <id...> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<id...>` | One or more song IDs (space-separated) |

## Options

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Output | `-o, --output <output>` | `./` | Output directory for lyric files |
| Format | `-f, --format <format>` | `{name} - {artist}` | Filename format template |

## Examples

### Download lyrics for a song

```bash
ncmget lrc 3374579108
```

### Download lyrics for multiple songs

```bash
ncmget lrc 3374579108 111111
```

### Download to a specific directory

```bash
ncmget lrc 3374579108 -o ~/Music/Lyrics
```

### Custom filename format

```bash
ncmget lrc 3374579108 -f "{name}"
```

## Output

Each lyric file is saved in LRC format. The filename is determined by the format template with a `.lrc` extension.

Lyrics include both the original text and translation (when available).

