# FAQ

## How do I get a song ID?

You can find song IDs using the `search` command:

```bash
ncmget search "song name"
```

Each result displays the song ID. You can also find IDs in the URL when browsing NetEase Cloud Music on the web — the number in the URL (e.g., `https://music.163.com/#/song?id=3374579108`) is the song ID.

## Why does a download fail?

Downloads may fail for several reasons:

- **Copyright restrictions**: The song is not available for download in your region
- **Network issues**: Temporary connectivity problems
- **Invalid ID**: The song ID does not exist

NCMGET retries failed requests 3 times automatically. If the download still fails, try again later or check if the song is available on the NetEase Cloud Music platform.

## What about copyright-restricted songs?

Some songs are restricted due to copyright and cannot be downloaded. This is a platform limitation, not a bug in NCMGET. You may be able to access restricted content by providing a valid cookie for an authenticated account.

## What audio quality is available?

NCMGET supports the following bitrates via the `url` method or the HTTP server:

- `128` — Standard quality (128kbps)
- `192` — Medium quality (192kbps)
- `320` — High quality (320kbps, default)
- `999` — Lossless quality (FLAC, requires authentication)

Higher quality may require a premium NetEase Cloud Music account.

## Where are downloaded files saved?

By default, files are saved in the current working directory (`./`). Use the `-o, --output` option to specify a different directory:

```bash
ncmget song 3374579108 -o ~/Music
```

## How are special characters in filenames handled?

Characters that are illegal in filenames (`<>:"/\|?*`) are automatically replaced with `_`. For example, a song named `情绪缓冲区溢出: 世界` becomes `情绪缓冲区溢出_ 世界`.

You can also customize the filename format using the `-f, --format` option. See [Filename Format](/filename-format) for details.

## Can I download multiple songs at once?

Yes. Pass multiple IDs separated by spaces:

```bash
ncmget song 3374579108 111111 222222
```

You can also download entire albums or playlists:

```bash
ncmget album 372893716
ncmget playlist 7697114803
```

## How do I update NCMGET?

Update NCMGET to the latest version:

```bash
npm update -g ncmget
```

Check your current version:

```bash
ncmget -v
```

## How do I uninstall NCMGET?

```bash
npm uninstall -g ncmget
```

## How do I report a bug?

Please open an issue on the [GitHub repository](https://github.com/Roy-Jin/ncmget/issues). Include:

- NCMGET version (`ncmget -v`)
- Node.js version (`node -v`)
- The command you ran
- The error message or unexpected behavior
- Steps to reproduce the issue
