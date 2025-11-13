<div align="center">

# 🎵 music-getter

[![GitHub Stars](https://img.shields.io/github/stars/Roy-Jin/music-getter?style=for-the-badge)](https://github.com/Roy-Jin/music-getter/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/Roy-Jin/music-getter?style=for-the-badge)](https://github.com/Roy-Jin/music-getter/issues)
[![MIT License](https://img.shields.io/github/license/Roy-Jin/music-getter?style=for-the-badge)](LICENSE)

A music resource acquisition tool that runs in the command line.  
[English](README.md) | [中文](README_CN.md)
</div>

<details>
<summary>Table of Contents</summary>

- [Core Features](#-core-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Commands](#-available-commands)
  - [`song <keyword>`](#song-keyword)
  - [`album <keyword>`](#album-keyword)
  - [`playlist <keyword>`](#playlist-keyword)
  - [`ls, list <keyword>`](#ls-list-keyword)
  - [`search <keyword>`](#search-keyword)
- [License](#-license)
- [Contact](#-contact)

</details>

## ✨ Core Features

- **Multi-platform Music Download**: Support netease(default), tencent and kugou platforms
- **Advanced Search**: Search across multiple platforms simultaneously
- **Batch Download**: Download entire albums or playlists with one command
- **Download Management**: Progress tracking and synchronized downloads
- **Resource Verification**: Check resource availability before download

## 🛠️ Technologies Used

- [Deno](https://deno.land/) - Runtime environment
- [Cliffy Command](https://github.com/c4spar/deno-cliffy) - CLI framework
- [Meting API](https://api.i-meto.com/meting/api) - Music service integration
- [Chalk](https://jsr.io/@nothing628/chalk) - Terminal styling
- [Progress](https://jsr.io/@ryweal/progress) - Download progress tracking

## 🗂 Project Structure

<details>
<summary>music-getter/</summary>

```
├── command/        # Command implementations
│   ├── album.js    # Album operations
│   ├── list.js     # Resource listing
│   ├── playlist.js # Playlist operations
│   ├── search.js   # Search functionality
│   └── song.js     # Song operations
├── download.js     # Download manager
├── meting.js       # Music API client
├── program.js      # CLI setup
└── main.js         # Entry point
```

</details>

## 🚀 Getting Started

### Prerequisites
- [Deno](https://docs.deno.com/runtime/getting_started/installation/) >= 1.30.0

### Installation

- Download the latest release from [Github Releases](https://github.com/Roy-Jin/music-getter/releases/latest).  
- Or run and package locally:
```sh
# Git clone the repository
git clone https://github.com/Roy-Jin/music-getter.git

# Change directory to music-getter
cd music-getter

# Run the program
deno task run

# Build the program
deno task build
```

## 🎛️ Available Commands

### `song <keyword>`
Get single song resource.

**Options:**
- `-l, --lyric`: Include lyrics file.
- `-c, --cover [size]`: Include cover image. (e.g. -c "120")
- `-o, --output <path>`: Custom output directory.
- `-s, --server <source>`: Specify music platform.

**Example:**
```sh
# Download netease song "Daylight-Seredris" with lyrics and cover image
mg song 1372188635 --lyric --cover --output out
```

### `album <keyword>`
Get the entire album resource.

**Options:**
- `-l, --lyric`: Include lyrics for all songs.
- `-c, --cover [size]`: Include cover image for all songs.
- `-o, --output <path>`: Custom output directory.
- `-s, --server <source>`: Specify source platform.

**Example:**
```sh
# Download netease album "Daylight" with lyrics and cover image
mg album 79797968 --lyric --cover --output out
```

### `playlist <keyword>`
Get the entire playlist resource.

**Options:**
- `-l, --lyric`: Include lyrics for all songs.
- `-c, --cover [size]`: Include cover image for all songs.
- `-o, --output <path>`: Custom output directory.
- `-s, --server <source>`: Specify source platform.

**Example:**
```sh
# Download netease playlist "咖啡很苦 生活很甜"
mg playlist 7697114803 --output out
```

### `ls, list <keyword>`
List resources from a specific type.  
(Supported types: playlist, album, artist)

**Options:**
- `-t, --type <type>`: Resource type. (default: "playlist")
- `-c, --check`: Verify resource availability.
- `-s, --server <source>`: Specify source platform.

**Example:**
```sh
# List  available resources from netease playlist "咖啡很苦 生活很甜"
mg list 7697114803 --check
```

### `search <keyword>`
search song resource.

**Options:**
- `-s, --server <source>`: Specify music platform. (Multiple allowed)
- `-c, --check`: Verify resource availability.

**Example:**
```sh
# Search for "Daylight-Seredris" on Netease and Tencent platforms
mg search "Daylight-Seredris" --server netease --server tencent
```

### `preview <keyword>`
Open the web to preview music.

**Options:**
- `-s, --server <source>`: Specify music platform.

**Example:**
```sh
# Preview netease song "Daylight-Seredris" on the web
mg preview 1372188635 --server netease
```

## 📜 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

## 📬 Contact

Roy-Jin - [jinroy@outlook.com](mailto:jinroy@outlook.com)
