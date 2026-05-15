# 常见问题

## 如何获取歌曲/歌单 ID？

### 网易云音乐

打开网易云音乐网页版，歌曲或歌单 URL 中的数字即为 ID。

- **歌曲**：`https://music.163.com/song?id=1372188635` → ID: `1372188635`
- **歌单**：`https://music.163.com/playlist?id=7697114803` → ID: `7697114803`

## 下载失败怎么办？

### 检查网络连接

确保你的网络可以正常访问 Meting API。

### 尝试自定义 API

如果默认 API 不可用，可以尝试使用其他 Meting API 服务：

```sh
mg song 1372188635 --api https://your-api.example.com/meting/
```

### 检查歌曲 ID

确认歌曲 ID 是否正确，可以先使用 `search` 命令搜索确认。

## 如何下载高品质音乐？

使用 `--bitrate` 参数指定码率：

```sh
mg song 1372188635 --bitrate 320
```

可用的码率选项：`128`（标准）、`192`（中等）、`320`（高品质）。

注意：实际音质取决于音乐平台提供的资源，并非所有歌曲都有 320kbps 版本。

## 下载的文件保存在哪里？

默认保存在当前工作目录。可以通过 `--output` 或 `-o` 选项指定：

```sh
mg song 1372188635 --output ./my-music
```

## 文件名中的特殊字符怎么处理？

工具会自动处理文件名中的非法字符，将 `<>:"/\|?*` 等字符替换为下划线 `_`，确保文件系统兼容性。

## 如何同时搜索多个平台？

使用 `--server` 参数指定平台：

```sh
mg search "Daylight" --server netease
```

## 如何更新到最新版本？

```sh
npm update -g music-getter
```

或者重新安装：

```sh
npm install -g music-getter@latest
```

## 如何卸载？

```sh
npm uninstall -g music-getter
```

## 是否支持其他音乐平台？

目前支持网易云音乐等多平台。未来可能会根据需求增加更多平台支持。

## 遇到 Bug 或有功能建议？

欢迎在 [GitHub Issues](https://github.com/Roy-Jin/music-getter/issues) 提交反馈。