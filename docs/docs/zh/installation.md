# 安装

## 前置条件

- **Node.js** >= 20

## 全局安装

使用 npm 全局安装 `ncmget`：

```bash
npm install -g ncmget
```

或使用 yarn：

```bash
yarn global add ncmget
```

或使用 pnpm：

```bash
pnpm add -g ncmget
```

## 验证安装

安装完成后，验证是否安装成功：

```bash
ncmget -v
```

如果安装成功，将输出版本号。

你也可以查看帮助信息：

```bash
ncmget --help
```

## 替代方式：npx

如果你不想全局安装，可以使用 `npx` 直接运行：

```bash
npx ncmget search 淘气的Roy
npx ncmget song 3374579108
```

`npx` 会临时下载并执行 `ncmget`，无需全局安装。
