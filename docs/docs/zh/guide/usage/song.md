# 下载歌曲

使用 `song` 命令下载单首歌曲，支持自定义输出目录、音频码率，并可选择下载歌词和封面图片。

## 基本用法

```sh
mg song <song-id> [options]
```

`song-id` 是歌曲在音乐平台上的唯一标识符。

### 示例

```sh
# 下载默认码率（128kbps）的歌曲
mg song 1372188635

# 下载高品质歌曲并包含歌词和封面
mg song 1372188635 --lyric --cover --bitrate 320

# 指定输出目录
mg song 1372188635 --output ./downloads
```

## 选项说明

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-l, --lyric` | 包含 `.lrc` 歌词文件 | — |
| `-c, --cover [size]` | 包含封面图片（可选尺寸，单位 px） | — |
| `-o, --output <path>` | 输出目录 | `./` |
| `-s, --server <source>` | 音乐平台 | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |
| `-b, --bitrate <kbps>` | 音频码率（`128` / `192` / `320`） | `128` |

## 详细说明

### 歌词下载 (`--lyric`)

添加 `--lyric` 选项后，工具会自动下载与歌曲对应的 LRC 格式歌词文件，文件名与歌曲文件相同。

```sh
mg song 1372188635 --lyric
```

### 封面下载 (`--cover`)

添加 `--cover` 选项后，会下载歌曲封面图片（PNG 格式）。可以指定封面尺寸：

```sh
# 默认尺寸 300px
mg song 1372188635 --cover

# 指定封面尺寸为 500px
mg song 1372188635 --cover 500
```

### 音频码率 (`--bitrate`)

支持三种码率选项，码率越高音质越好，文件体积也越大：

| 码率 | 音质 | 适用场景 |
|------|------|----------|
| `128` | 标准 | 普通收听 |
| `192` | 中等 | 较好音质需求 |
| `320` | 高品质 | 音乐收藏 |

```sh
mg song 1372188635 --bitrate 320
```

### 指定平台 (`--server`)

默认从网易云音乐获取资源，可以通过 `--server` 切换到其他平台：

```sh
mg song 1372188635 --server netease
```

### 自定义 API (`--api`)

如果需要使用自定义的 Meting API 服务，可以通过此选项指定：

```sh
mg song 1372188635 --api https://your-api.example.com/meting/
```

## 输出文件

下载完成后，文件将保存在指定目录中，命名格式为 `歌曲名-艺术家.mp3`。如果文件名过长，会自动截断。

```
./Daylight-David Kushner.mp3
./Daylight-David Kushner.lrc    （使用 --lyric 时）
./Daylight-David Kushner.png    （使用 --cover 时）
```