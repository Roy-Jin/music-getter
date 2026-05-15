# 安装

## 环境要求

- **Node.js** >= 20.0.0
- **npm**（随 Node.js 一起安装）或 **pnpm**

## 全局安装

通过 npm 全局安装，可在任意目录下使用 `music-getter` 或 `mg` 命令：

```sh
npm install -g music-getter
```

安装完成后，验证是否安装成功：

```sh
mg --version
```

## 免安装使用

如果不想全局安装，可以使用 `npx` 直接运行：

```sh
npx music-getter --help
```

## 从源码构建

如果你希望使用最新开发版本或自行修改代码，可以从 GitHub 克隆源码并构建：

```sh
git clone https://github.com/Roy-Jin/music-getter.git
cd music-getter
npm install
npm run build
```

构建完成后，可以通过以下方式运行：

```sh
node dist/bin/cli.js --help
```

或者链接到全局：

```sh
npm link
mg --help
```

## 开发模式

在开发过程中，可以使用 `tsx` 直接运行 TypeScript 源码，无需每次修改后都重新编译：

```sh
npm run dev -- --help
```

## 验证安装

运行以下命令查看帮助信息，确认安装成功：

```sh
mg --help
```

你应该能看到类似以下的输出：

```
Usage: music-getter <command> [options]

Commands:
  song <song-id>         Get single song resource.
  playlist <playlist-id> Get the entire playlist resource.
  list|ls <resource-id>  List resources from a specific type.
  search <search-term>   Search song resource.
  preview <song-id>      Open the web to preview music.

Options:
  -V, --version          output the version number
  -h, --help             display help for command
```

## 下一步

- 查看 [下载歌曲](/guide/usage/song) 了解如何下载单曲
- 查看 [下载歌单](/guide/usage/playlist) 了解如何批量下载
- 查看 [搜索音乐](/guide/usage/search) 了解如何搜索歌曲