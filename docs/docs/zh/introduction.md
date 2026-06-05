# 介绍

NCMGET 是一个功能齐全的网易云音乐命令行界面。它提供用于在终端直接搜索、下载和查看音乐资源的命令。

## 全局选项

| 选项 | 描述 |
|------|------|
| `-v, --version` | 显示版本号 |
| `--help` | 显示帮助信息 |

## 命令概览

| 命令 | 描述 |
|------|------|
| [`serve`](/commands/serve) | 启动 HTTP 服务器 |
| [`search`](/commands/search) | 搜索音乐 |
| [`song`](/commands/song) | 下载歌曲 |
| [`album`](/commands/album) | 下载专辑 |
| [`playlist`](/commands/playlist) | 下载歌单 |
| [`lrc`](/commands/lrc) | 下载歌词 |
| [`pic`](/commands/pic) | 下载封面图片 |
| [`info`](/commands/info) | 查看资源信息 |
| [`preview`](/commands/preview) | 在浏览器中预览歌曲 |

## 基本工作流

典型的使用流程是：先搜索找到资源，再使用下载命令获取文件。

```bash
# 1. 搜索歌曲
ncmget search 淘气的Roy

# 2. 使用搜索结果中的 ID 下载歌曲
ncmget song 3374579108

# 3. 或者先查看详细信息
ncmget info song 3374579108
```

## 下一步

- [安装](/installation) — 安装 NCMGET
- [命令参考](/commands/serve) — 查看每个命令的详细用法
- [文件名格式](/filename-format) — 自定义下载文件名
- [最佳实践](/best-practices) — 高效使用 NCMGET
