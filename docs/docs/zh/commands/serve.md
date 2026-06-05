# serve

启动 HTTP 服务器，通过 REST API 访问 NCMGET 的所有功能。

## 用法

```bash
ncmget serve [选项]
```

## 选项

| 选项 | 默认值 | 描述 |
|------|--------|------|
| `-p, --port <port>` | `"3000"` | 监听端口 |
| `-h, --host <host>` | `"0.0.0.0"` | 监听主机地址 |
| `--logger` | `false` | 启用请求日志 |

## 示例

### 默认启动

```bash
ncmget serve
```

服务器将在 `http://0.0.0.0:3000` 启动。

### 指定端口

```bash
ncmget serve -p 8080
```

### 指定主机和端口

```bash
ncmget serve -h 127.0.0.1 -p 8080
```

### 启用请求日志

```bash
ncmget serve --logger
```

启用后，每个请求都会在控制台输出日志信息。

## 输出

启动成功后，控制台将显示服务器地址：

```
Server running at http://0.0.0.0:3000
```

