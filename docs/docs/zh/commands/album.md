# album

下载专辑中的所有歌曲。

## 用法

```bash
ncmget album <id...> [选项]
```

## 参数

| 参数 | 描述 |
|------|------|
| `<id...>` | 专辑ID，支持多个ID（空格分隔） |

## 选项

| 选项 | 默认值 | 描述 |
|------|--------|------|
| `-o, --output <output>` | `"./"` | 输出目录 |
| `-f, --format <format>` | `"{name} - {artist}"` | 文件名格式模板 |

## 示例

### 下载单个专辑

```bash
ncmget album 372893716
```

### 下载多个专辑

```bash
ncmget album 372893716 89498068
```

### 指定输出目录

```bash
ncmget album 372893716 -o ./downloads
```

### 自定义文件名格式

```bash
ncmget album 372893716 -f "{album}/{artist} - {name}"
```

## 输出

专辑中所有歌曲的音频文件将依次下载到指定目录。

