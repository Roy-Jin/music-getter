# Download Playlist

Use the `playlist` command to download all songs from a playlist with one command, supporting batch download of lyrics and covers.

## Basic Usage

```sh
mg playlist <playlist-id> [options]
```

`playlist-id` is the unique identifier of the playlist on the music platform.

### Examples

```sh
# Download an entire playlist (default 128kbps)
mg playlist 7697114803

# Download playlist with lyrics and covers
mg playlist 7697114803 --lyric --cover

# Specify output directory
mg playlist 7697114803 --output ./my-playlist

# High-quality download
mg playlist 7697114803 --bitrate 320
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `-l, --lyric` | Include lyrics for all songs | — |
| `-c, --cover [size]` | Include cover images (optional size) | — |
| `-o, --output <path>` | Output directory | `./` |
| `-s, --server <source>` | Music platform | `netease` |
| `-a, --api <url>` | Custom API endpoint | — |
| `-b, --bitrate <kbps>` | Audio bitrate (`128` / `192` / `320`) | `128` |

## Details

### Batch Download

The `playlist` command iterates through all songs in the playlist and downloads them one by one. A progress bar is displayed for each song during the download process:

```sh
mg playlist 7697114803 --lyric --cover --output ./my-playlist
```

### Getting the Playlist ID

**NetEase Cloud Music**: Open the playlist page, the number in the URL is the playlist ID.
- e.g., `https://music.163.com/playlist?id=7697114803` → `7697114803`

### Tips

- Playlist downloads process each song sequentially; please be patient for large playlists
- It's recommended to use the `list` command first to preview the playlist content before downloading
- Real-time progress bars show download speed and estimated completion time