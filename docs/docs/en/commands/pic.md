# pic

Download cover images for songs.

## Usage

```bash
ncmget pic <id...> [options]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<id...>` | One or more song IDs (space-separated) |

## Options

| Option | Flag | Default | Description |
|--------|------|---------|-------------|
| Output | `-o, --output <output>` | `./` | Output directory for image files |
| Size | `-s, --size <size>` | `300` | Image size in pixels |
| Format | `-f, --format <format>` | `{name} - {artist}` | Filename format template |

## Examples

### Download cover image (default 300px)

```bash
ncmget pic 3374579108
```

### Download high-resolution cover (800px)

```bash
ncmget pic 3374579108 -s 800
```

### Download covers for multiple songs

```bash
ncmget pic 3374579108 111111
```

### Download to a specific directory

```bash
ncmget pic 3374579108 -o ~/Music/Covers
```

### Custom filename and size

```bash
ncmget pic 3374579108 -s 800 -f "{album}"
```

## Output

Each cover image is downloaded to the specified output directory. The filename is determined by the format template with an appropriate image extension.

