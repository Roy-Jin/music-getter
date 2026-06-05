# playlist

下载歌单中的所有歌曲。

## 用法

```bash
ncmget playlist <id...> [选项]
```

## 参数

| 参数 | 描述 |
|------|------|
| `<id...>` | 歌单ID，支持多个ID（空格分隔） |

## 选项

| 选项 | 默认值 | 描述 |
|------|--------|------|
| `-o, --output <output>` | `"./"` | 输出目录 |
| `-f, --format <format>` | `"{name} - {artist}"` | 文件名格式模板 |

## 示例

### 下载单个歌单

```bash
ncmget playlist 7697114803
```

### 下载多个歌单

```bash
ncmget playlist 7697114803 111111
```

### 指定输出目录

```bash
ncmget playlist 7697114803 -o ./downloads
```

### 自定义文件名格式

```bash
ncmget playlist 7697114803 -f "{album}/{artist} - {name}"
```

## 输出

歌单中所有歌曲的音频文件将依次下载到指定目录。

