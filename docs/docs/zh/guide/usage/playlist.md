# 下载歌单

使用 `playlist` 命令一键下载整个歌单的所有歌曲，支持批量下载歌词和封面。

## 基本用法

```sh
mg playlist <playlist-id> [options]
```

`playlist-id` 是歌单在音乐平台上的唯一标识符。

### 示例

```sh
# 下载整个歌单（默认码率 128kbps）
mg playlist 7697114803

# 下载歌单并包含歌词和封面
mg playlist 7697114803 --lyric --cover

# 指定输出目录
mg playlist 7697114803 --output ./my-playlist

# 高品质下载
mg playlist 7697114803 --bitrate 320
```

## 选项说明

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-l, --lyric` | 为所有歌曲包含歌词 | — |
| `-c, --cover [size]` | 包含封面图片（可选尺寸） | — |
| `-o, --output <path>` | 输出目录 | `./` |
| `-s, --server <source>` | 音乐平台 | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |
| `-b, --bitrate <kbps>` | 音频码率（`128` / `192` / `320`） | `128` |

## 详细说明

### 批量下载

`playlist` 命令会自动遍历歌单中的所有歌曲，逐一下载。下载过程中会显示每首歌曲的进度条：

```sh
mg playlist 7697114803 --lyric --cover --output ./my-playlist
```

### 获取歌单 ID

**网易云音乐**：打开歌单页面，URL 中的数字即为歌单 ID。
- 例如 `https://music.163.com/playlist?id=7697114803` 中的 `7697114803`

### 提示

- 歌单下载会依次处理每首歌曲，歌曲数量较多时请耐心等待
- 建议先使用 `list` 命令查看歌单内容，确认后再下载
- 下载过程中会显示实时进度条，包含下载速度和预计完成时间