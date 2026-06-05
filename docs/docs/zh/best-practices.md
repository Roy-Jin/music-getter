# 最佳实践

高效使用 NCMGET 的技巧和建议。

## 批量下载技巧

### 使用多个 ID

所有下载命令都支持传入多个 ID，NCMGET 会依次处理：

```bash
# 批量下载多首歌曲
ncmget song 3374579108 111111 222222

# 批量下载多个专辑
ncmget album 372893716 89498068
```

### 结合搜索与下载

先搜索获取 ID，再批量下载：

```bash
# 1. 搜索获取 ID
ncmget search 淘气的Roy -l 10

# 2. 根据搜索结果中的 ID 下载
ncmget song <id1> <id2> <id3>
```

### 下载整个歌单

```bash
ncmget playlist 7697114803 -o ./my-playlist -f "{artist} - {name}"
```

## 输出目录组织

### 按类型分目录

```bash
# 歌曲下载到 music 目录
ncmget song 3374579108 -o ./music

# 歌词下载到 lyrics 目录
ncmget lrc 3374579108 -o ./lyrics

# 封面下载到 covers 目录
ncmget pic 3374579108 -o ./covers
```

### 按专辑组织

```bash
ncmget album 372893716 -o ./music -f "{album}/{artist} - {name}"
```

这样每张专辑会创建一个子目录，歌曲按专辑分组。

### 按歌手组织

```bash
ncmget song 3374579108 -o ./music -f "{artist}/{album}/{name}"
```

## 下载前使用 info 查看

在批量下载之前，建议先使用 `info` 命令查看资源信息，确认内容正确：

```bash
# 查看歌曲信息
ncmget info song 3374579108

# 查看专辑包含的歌曲
ncmget info album 372893716

# 查看歌单内容
ncmget info playlist 7697114803
```

## 处理版权受限歌曲

部分歌曲因版权限制可能无法下载，NCMGET 会在遇到错误时输出红色错误消息并继续处理下一个 ID。建议：

1. 使用 `info` 命令先确认歌曲是否可用
2. 批量下载时关注错误输出
3. 对于版权受限的歌曲，可以尝试设置 Cookie 后再下载

## 使用 HTTP 服务器

如果你需要在多个客户端之间共享 API，可以启动 HTTP 服务器：

```bash
ncmget serve -p 3000 --logger
```

然后通过 HTTP 请求访问：

```bash
curl "http://localhost:3000/search?keyword=淘气的Roy"
curl "http://localhost:3000/song?id=3374579108"
```

## 更新 NCMGET

保持 NCMGET 为最新版本以获取最新功能和修复：

```bash
npm update -g ncmget
```

或重新安装：

```bash
npm install -g ncmget@latest
```
