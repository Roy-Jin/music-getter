# 列出资源

使用 `list` 命令（别名 `ls`）列出歌单或歌手的音乐资源列表。

## 基本用法

```sh
mg list <resource-id> [options]
```

`resource-id` 是资源在音乐平台上的唯一标识符。

### 示例

```sh
# 列出歌单中的歌曲
mg list 7697114803

# 使用 ls 别名
mg ls 7697114803

# 列出歌手的歌曲
mg list 6452 --type artist
```

## 选项说明

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-t, --type <type>` | 资源类型（`playlist` / `artist`） | `playlist` |
| `-s, --server <source>` | 音乐平台 | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |

## 资源类型

### 歌单 (`playlist`)

列出指定歌单中的所有歌曲。这是默认的资源类型。

```sh
mg list 7697114803
```

### 歌手 (`artist`)

列出指定歌手的歌曲列表。

```sh
mg list 6452 --type artist
```

## 输出格式

列表命令会显示每条资源的平台、ID、歌曲名和艺术家信息：

```
 netease|1372188635 	Daylight  David Kushner
 netease|1387193847 	青花瓷  周杰伦
```

这些信息中的 `平台|ID` 组合可以直接用于 `song` 命令下载歌曲。

## 使用场景

1. **预览歌单内容**：下载前先查看歌单包含哪些歌曲
2. **获取歌曲 ID**：从列表中复制歌曲 ID 用于下载
3. **查看歌手作品**：了解某个歌手的歌曲列表