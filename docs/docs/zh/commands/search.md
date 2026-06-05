# search

搜索音乐资源，支持歌曲、专辑、歌手和歌单。

## 用法

```bash
ncmget search <keyword> [选项]
```

## 参数

| 参数 | 描述 |
|------|------|
| `<keyword>` | 搜索关键词 |

## 选项

| 选项 | 默认值 | 描述 |
|------|--------|------|
| `-t, --type <type>` | `"1"` | 搜索类型：1=歌曲，10=专辑，100=歌手，1000=歌单 |
| `-l, --limit <limit>` | `"30"` | 返回数量限制 |
| `-p, --page <page>` | `"1"` | 页码 |

## 示例

### 搜索歌曲

```bash
ncmget search 淘气的Roy
```

### 搜索专辑

```bash
ncmget search 淘气的Roy -t 10
```

### 搜索歌手

```bash
ncmget search 淘气的Roy -t 100
```

### 搜索歌单

```bash
ncmget search 淘气的Roy -t 1000
```

### 限制结果数量

```bash
ncmget search 淘气的Roy -l 10
```

### 翻页

```bash
ncmget search 淘气的Roy -p 2
```

## 输出

搜索结果将以表格形式展示，包含序号、歌曲ID、歌曲名称和歌手信息。

