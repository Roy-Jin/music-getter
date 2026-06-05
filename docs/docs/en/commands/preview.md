# preview

Preview a song in the browser.

## Usage

```bash
ncmget preview <id>
```

## Arguments

| Argument | Description |
|----------|-------------|
| `<id>` | Song ID (single ID only) |

## Examples

### Preview a song

```bash
ncmget preview 3374579108
```

This opens the song in your default web browser for playback.

## Notes

- The `preview` command accepts only a **single** song ID, unlike other download commands that support multiple IDs.
- The command opens the browser automatically using the system's default browser.
- Audio playback depends on the song's availability and your network connection.

