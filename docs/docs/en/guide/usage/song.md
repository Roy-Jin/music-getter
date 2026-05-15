# Download Song

Use the `song` command to download a single song, with support for custom output directory, audio bitrate, and optional lyrics and cover images.

## Basic Usage

```sh
mg song <song-id> [options]
```

`song-id` is the unique identifier of the song on the music platform.

### Examples

```sh
# Download a song with default bitrate (128kbps)
mg song 1372188635

# Download high-quality song with lyrics and cover
mg song 1372188635 --lyric --cover --bitrate 320

# Specify output directory
mg song 1372188635 --output ./downloads
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-l, --lyric` | Include `.lrc` lyrics file | — |
| `-c, --cover [size]` | Include cover image (optional size in px) | — |
| `-o, --output <path>` | Output directory | `./` |
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |
| `-b, --bitrate <kbps>` | Audio bitrate (`128` / `192` / `320`) | `128` |

## Details

### Lyrics (`--lyric`)

With the `--lyric` option, the tool will automatically download the LRC format lyrics file corresponding to the song, with the same filename as the song file.

```sh
mg song 1372188635 --lyric
```

### Cover Image (`--cover`)

With the `--cover` option, the song cover image (PNG format) will be downloaded. You can specify the cover size:

```sh
# Default size 300px
mg song 1372188635 --cover

# Specify cover size as 500px
mg song 1372188635 --cover 500
```

### Audio Bitrate (`--bitrate`)

Three bitrate options are supported. Higher bitrate means better quality but larger file size:

| Bitrate | Quality | Use Case |
|---------|---------|----------|
| `128` | Standard | Casual listening |
| `192` | Medium | Better quality |
| `320` | High | Music collection |

```sh
mg song 1372188635 --bitrate 320
```

### Platform (`--server`)

By default, resources are fetched from NetEase Cloud Music. You can switch to other platforms with `--server`:

```sh
mg song 1372188635 --server netease
```

### Custom API (`--api`)

If you need to use a custom Meting API service, specify it with this option:

```sh
mg song 1372188635 --api https://your-api.example.com/meting/
```

## Output Files

After downloading, files are saved in the specified directory with the naming format `SongName-Artist.mp3`. Long filenames are automatically truncated.

```
./Daylight-David Kushner.mp3
./Daylight-David Kushner.lrc    (with --lyric)
./Daylight-David Kushner.png    (with --cover)
```