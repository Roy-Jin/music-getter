# Preview Music

Use the `preview` command to open a song's online playback page in your browser, allowing you to listen before deciding to download.

## Basic Usage

```sh
mg preview <song-id> [options]
```

`song-id` is the unique identifier of the song on the music platform.

### Examples

```sh
# Preview a song in the default browser
mg preview 1372188635
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |

## Use Cases

- **Preview before download**: Listen first to confirm it's the right version
- **Check audio quality**: Verify if the quality meets your needs through online playback
- **Quick access**: Quickly open the song page in your browser

## Notes

- This command automatically opens your system's default browser
- The preview URL comes from the Meting API's playback address
- Preview only supports HTTP/HTTPS protocol URLs