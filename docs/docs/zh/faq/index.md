# 常见问题

## 如何获取歌曲/专辑/歌单的 ID？

- **歌曲 ID**：使用 `ncmget search` 搜索歌曲，结果中会显示每首歌的 ID
- **专辑 ID**：使用 `ncmget search -t 10` 搜索专辑，或在歌曲信息中查看专辑 ID
- **歌单 ID**：使用 `ncmget search -t 1000` 搜索歌单，或从网易云音乐网页版 URL 中获取（如 `playlist?id=7697114803` 中的数字）
- **歌手 ID**：使用 `ncmget search -t 100` 搜索歌手

## 下载失败怎么办？

下载失败可能有以下原因：

1. **网络问题**：检查网络连接，NCMGET 会自动重试 3 次
2. **版权限制**：部分歌曲因版权原因无法下载，会显示错误信息
3. **ID 无效**：确认使用的 ID 是否正确
4. **超时**：默认超时时间为 20 秒，网络较慢时可能超时

## 为什么有些歌曲显示版权受限？

网易云音乐的部分歌曲因版权协议限制，无法在所有地区播放或下载。你可以尝试：

- 设置 Cookie 后再下载（需要登录账号）
- 搜索其他版本或翻唱

## 如何下载高品质音频？

使用 `url` API 或通过 Core 模块指定更高的比特率：

```typescript
import { NCMGET } from 'ncmget';
const ncmget = new NCMGET();

// 获取最高品质
const result = await ncmget.url(3374579108, 999);
```

实际可获得的品质取决于歌曲本身是否有高品质音源。

## 下载的文件保存在哪里？

默认保存在当前目录（`./`）。你可以通过 `-o` 选项指定输出目录：

```bash
ncmget song 3374579108 -o ./downloads
```

## 文件名中包含特殊字符怎么办？

NCMGET 会自动将文件名中的非法字符（`<>:"/\|?*`）替换为 `_`，确保文件名在所有操作系统上都有效。

## 如何批量下载多个资源？

所有下载命令都支持传入多个 ID：

```bash
# 批量下载歌曲
ncmget song 3374579108 111111 222222

# 批量下载专辑
ncmget album 372893716 89498068

# 批量下载歌单
ncmget playlist 7697114803 111111
```

## 如何更新 NCMGET？

```bash
npm update -g ncmget
```

或安装最新版本：

```bash
npm install -g ncmget@latest
```

## 如何卸载 NCMGET？

```bash
npm uninstall -g ncmget
```

## 遇到 Bug 如何反馈？

请在 GitHub Issues 中提交反馈：

https://github.com/Roy-Jin/ncmget/issues

提交时请包含以下信息：

- NCMGET 版本（`ncmget -v`）
- Node.js 版本（`node -v`）
- 操作系统
- 复现步骤
- 错误信息
