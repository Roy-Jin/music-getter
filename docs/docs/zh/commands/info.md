# info

查看资源信息，支持歌曲、专辑、歌手和歌单。

## 用法

```bash
ncmget info <type> <id...>
```

## 参数

| 参数 | 描述 |
|------|------|
| `<type>` | 资源类型：`song`、`album`、`artist`、`playlist` |
| `<id...>` | 资源ID，支持多个ID（空格分隔） |

## 示例

### 查看歌曲信息

```bash
ncmget info song 3374579108
```

### 查看专辑信息

```bash
ncmget info album 372893716
```

### 查看歌手信息

```bash
ncmget info artist 124180405
```

### 查看歌单信息

```bash
ncmget info playlist 7697114803
```

### 查看多个资源信息

```bash
ncmget info song 3374579108 111111 222222
```

## 输出

根据资源类型，输出对应的信息：

- **song**：歌曲名称、歌手、专辑、各资源ID等
- **album**：专辑名称、包含的歌曲列表
- **artist**：歌手名称、热门歌曲列表
- **playlist**：歌单名称、包含的歌曲列表

