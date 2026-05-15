# FAQ

## How do I get a song/playlist ID?

### NetEase Cloud Music

Open the NetEase Cloud Music website. The number in the song or playlist URL is the ID.

- **Song**: `https://music.163.com/song?id=1372188635` → ID: `1372188635`
- **Playlist**: `https://music.163.com/playlist?id=7697114803` → ID: `7697114803`

## What to do if download fails?

### Check Network Connection

Make sure your network can access the Meting API normally.

### Try a Custom API

If the default API is unavailable, you can try using another Meting API service:

```sh
mg song 1372188635 --api https://your-api.example.com/meting/
```

### Check Song ID

Confirm that the song ID is correct. You can use the `search` command first to verify.

## How to download high-quality music?

Use the `--bitrate` parameter to specify the bitrate:

```sh
mg song 1372188635 --bitrate 320
```

Available bitrate options: `128` (standard), `192` (medium), `320` (high quality).

Note: The actual quality depends on the resources provided by the music platform. Not all songs have a 320kbps version.

## Where are downloaded files saved?

Files are saved in the current working directory by default. You can specify a directory using the `--output` or `-o` option:

```sh
mg song 1372188635 --output ./my-music
```

## How are special characters in filenames handled?

The tool automatically handles illegal characters in filenames by replacing characters like `<>:"/\|?*` with underscores `_` to ensure filesystem compatibility.

## How to search multiple platforms simultaneously?

Use the `--server` parameter to specify platforms:

```sh
mg search "Daylight" --server netease
```

## How to update to the latest version?

```sh
npm update -g music-getter
```

Or reinstall:

```sh
npm install -g music-getter@latest
```

## How to uninstall?

```sh
npm uninstall -g music-getter
```

## Are other music platforms supported?

Currently supports NetEase Cloud Music and other platforms. More platform support may be added in the future based on demand.

## Found a bug or have a feature request?

Feel free to submit feedback on [GitHub Issues](https://github.com/Roy-Jin/music-getter/issues).
