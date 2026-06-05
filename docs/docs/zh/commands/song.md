# song

下载歌曲音频文件。

## 用法

```bash
ncmget song <id...> [选项]
```

## 参数

| 参数 | 描述 |
|------|------|
| `<id...>` | 歌曲ID，支持多个ID（空格分隔） |

## 选项

| 选项 | 默认值 | 描述 |
|------|--------|------|
| `-o, --output <output>` | `"./"` | 输出目录 |
| `-f, --format <format>` | `"{name} - {artist}"` | 文件名格式模板 |

## 示例

### 下载单首歌曲

```bash
ncmget song 3374579108
```

### 下载多首歌曲

```bash
ncmget song 3374579108 111111 222222
```

### 指定输出目录

```bash
ncmget song 3374579108 -o ./downloads
```

### 自定义文件名格式

```bash
ncmget song 3374579108 -f "{artist} - {name}"
```

### 组合使用

```bash
ncmget song 3374579108 111111 -o ./music -f "{album}/{name}"
```

## 输出

下载的音频文件将保存到指定目录，文件名根据格式模板生成。默认文件名格式为 `{name} - {artist}.mp3`。

