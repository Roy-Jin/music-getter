# 搜索音乐

使用 `search` 命令跨平台搜索歌曲，支持多平台同时搜索、分页和自定义搜索类型。

## 基本用法

```sh
mg search <search-term> [options]
```

`search-term` 是要搜索的关键词，可以是歌曲名、艺术家名等。

### 示例

```sh
# 在默认平台（网易云）搜索
mg search "Daylight"

# 指定搜索结果数量和页码
mg search "Daylight" --limit 10 --page 2

# 指定搜索类型
mg search "周杰伦" --type 1
```

## 选项说明

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-s, --server <source...>` | 音乐平台（可重复指定多个） | `netease` |
| `-a, --api <url>` | 自定义 API 地址 | — |
| `-t, --type <type>` | 搜索类型 | `1` |
| `-p, --page <number>` | 页码 | `1` |
| `-l, --limit <number>` | 每页结果数 | `30` |

## 搜索类型

`--type` 参数控制搜索的类型：

| 值 | 说明 |
|----|------|
| `1` | 歌曲 |
| `100` | 艺术家 |
| `1000` | 专辑 |
| `1004` | 歌单 |
| `1006` | 歌词 |
| `1009` | 用户 |

## 多平台搜索

可以指定平台进行搜索：

```sh
mg search "Daylight" --server netease
```

输出结果中会显示每条结果来自哪个平台：

```
netease|1372188635 	Daylight David Kushner
```

## 搜索结果

搜索结果会显示以下信息：

- **平台和 ID**：`平台|歌曲ID`，可用于后续的 `song` 或 `preview` 命令
- **歌曲名**：加粗显示
- **艺术家**：灰色显示

```
 netease|1372188635 	Daylight  David Kushner
 netease|1387193847 	青花瓷  周杰伦
```