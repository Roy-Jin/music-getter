# Filename Format

When downloading songs, lyrics, or cover images, NCMGET uses a filename format template to determine the output filename.

## Default Template

The default filename format is:

```
{name} - {artist}
```

This produces filenames like: `情绪缓冲区溢出 - 淘气的Roy.mp3`

## Available Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{id}` | Song ID | `3374579108` |
| `{name}` | Song name | `情绪缓冲区溢出` |
| `{artist}` | Artist name(s) | `淘气的Roy` |
| `{album}` | Album name | `情绪缓冲区溢出` |
| `{pic_id}` | Cover image ID | `109951163286` |
| `{url_id}` | Audio URL ID | `3374579108` |
| `{lrc_id}` | Lyrics ID | `3374579108` |
| `{source}` | Data source | `netease` |

## Sanitize Rules

Characters that are illegal in filenames are automatically replaced with `_`:

```
<>:"/\|?*
```

For example, a song named `情绪缓冲区溢出: 世界` would become `情绪缓冲区溢出_ 世界` in the filename.

## Custom Format Examples

### Artist first

```bash
ncmget song 3374579108 -f "{artist} - {name}"
```

Output: `淘气的Roy - 情绪缓冲区溢出.mp3`

### Include album name

```bash
ncmget song 3374579108 -f "{album} - {name}"
```

Output: `情绪缓冲区溢出 - 情绪缓冲区溢出.mp3`

### Organize by album directory

```bash
ncmget song 3374579108 -f "{album}/{name}"
```

Output: `情绪缓冲区溢出/情绪缓冲区溢出.mp3` (creates the `情绪缓冲区溢出` directory if needed)

### Include song ID

```bash
ncmget song 3374579108 -f "{id} {name}"
```

Output: `3374579108 情绪缓冲区溢出.mp3`

### Simple name only

```bash
ncmget lrc 3374579108 -f "{name}"
```

Output: `情绪缓冲区溢出.lrc`

## Usage with Commands

The `-f, --format` option is available on all download commands:

- `song` — Default: `{name} - {artist}`
- `album` — Default: `{name} - {artist}`
- `playlist` — Default: `{name} - {artist}`
- `lrc` — Default: `{name} - {artist}`
- `pic` — Default: `{name} - {artist}`

## Related

- [song](/commands/song) — Download songs
- [album](/commands/album) — Download albums
- [playlist](/commands/playlist) — Download playlists
- [lrc](/commands/lrc) — Download lyrics
- [pic](/commands/pic) — Download cover images
