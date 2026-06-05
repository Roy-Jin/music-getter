# 进阶用法

深入了解 NCMGET 的高级功能，包括 Cookie 配置、格式化模式、EAPI 加密、错误处理等。

## Cookie 配置

部分网易云音乐资源需要登录认证才能访问。通过 `cookie()` 方法设置 Cookie：

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET();

// 设置 Cookie（支持链式调用）
const result = await ncmget.cookie('MUSIC_U=xxx; __csrf=yyy').song(3374579108);
```

### 获取 Cookie

1. 在浏览器中登录网易云音乐
2. 打开开发者工具（F12）
3. 切换到 Application（应用） → Cookies
4. 找到 `MUSIC_U` 和 `__csrf` 的值
5. 拼接为 Cookie 字符串：`MUSIC_U=xxx; __csrf=yyy`

### 注意事项

- Cookie 具有时效性，过期后需要重新获取
- 设置 Cookie 后，该实例的所有后续请求都会携带此 Cookie
- 每次调用 `cookie()` 会覆盖之前设置的 Cookie

## 格式化模式

NCMGET 默认启用格式化模式，将原始 API 响应转换为统一的数据结构。你可以通过 `format()` 方法切换模式：

### 格式化模式（默认）

```typescript
const ncmget = new NCMGET();

// 默认启用格式化
const result = await ncmget.song(3374579108);
const song = JSON.parse(result);
// song 的结构符合 SongData 类型定义
```

### 原始模式

```typescript
const ncmget = new NCMGET();

// 禁用格式化，获取原始 API 响应
const rawResult = await ncmget.format(false).song(3374579108);
const rawData = JSON.parse(rawResult);
// rawData 是网易云音乐 API 的原始返回结构
```

### 通过 raw 属性获取原始数据

即使启用格式化模式，也可以通过 `raw` 属性获取最近一次请求的原始响应：

```typescript
const ncmget = new NCMGET();

const result = await ncmget.song(3374579108);
console.log(ncmget.raw);  // 原始 HTTP 响应文本
```

## EAPI 加密

NCMGET 内部使用网易云音乐的 EAPI 加密协议进行通信。这是网易云音乐客户端使用的原生加密方式，比 Web API 更稳定。

### 内部机制

NCMGET 的数据处理管道如下：

```
_exec 执行流程：
加密（可选）→ HTTP 请求 → 解码（可选）→ 格式化（可选）
```

- **加密**：当 `ApiConfig.encode` 为 `"netease_eapi"` 时，请求参数会使用 EAPI 加密
- **解码**：当 `ApiConfig.decode` 为 `"netease_url"` 或 `"netease_lrc"` 时，响应数据会使用对应的解码方式处理
- **格式化**：当 `isFormat` 为 `true` 且 `ApiConfig.format` 有值时，会从响应中提取指定路径的数据

### ApiConfig 中的加密配置

```typescript
interface ApiConfig {
  method: "GET" | "POST";
  url: string;
  body: Record<string, unknown> | null;
  encode?: string;    // "netease_eapi"
  decode?: string;    // "netease_url" | "netease_lrc"
  format?: string;    // 点号路径如 "result.songs"
}
```

## 错误处理

NCMGET Core 层采用不抛出异常的错误处理模式，将错误信息存储在实例属性中。

### 错误属性

```typescript
const ncmget = new NCMGET();
const result = await ncmget.song(999999999);

if (ncmget.error) {
  console.error(`错误名称: ${ncmget.error}`);    // "TIMEOUT" 或 Error.name
  console.error(`错误消息: ${ncmget.status}`);   // 错误的详细消息
}
```

### 错误类型

| error 值 | 含义 |
|----------|------|
| `"TIMEOUT"` | 请求超时（默认20秒） |
| 其他 `Error.name` | HTTP 请求或其他运行时错误 |

### 检查错误模式

```typescript
const ncmget = new NCMGET();

const result = await ncmget.url(3374579108);

if (ncmget.error === 'TIMEOUT') {
  console.error('请求超时，请检查网络连接');
} else if (ncmget.error) {
  console.error(`请求失败: ${ncmget.status}`);
} else {
  const urlData = JSON.parse(result);
  console.log(`音频地址: ${urlData.url}`);
}
```

## 实例安全

NCMGET 实例**不是线程安全的**。在并发场景下，每个请求应创建独立的 NCMGET 实例：

```typescript
// ❌ 错误：并发共享实例可能导致数据混乱
const ncmget = new NCMGET();
const [r1, r2] = await Promise.all([
  ncmget.song(1),
  ncmget.song(2),  // raw、info 等属性会被覆盖
]);

// ✅ 正确：每个请求使用独立实例
const [r1, r2] = await Promise.all([
  new NCMGET().song(1),
  new NCMGET().song(2),
]);
```

### HTTP 服务器中的实例管理

NCMGET 的 HTTP 服务器已经正确处理了实例安全——每个请求都会创建新的 NCMGET 实例。

## 重试机制

NCMGET 内置了 HTTP 请求重试机制：

- **重试次数**：3 次
- **重试间隔**：1 秒
- **超时时间**：20 秒

当请求失败时，NCMGET 会自动重试最多 3 次，每次间隔 1 秒。如果所有重试均失败，错误信息将存储在 `error` 和 `status` 属性中。

```typescript
const ncmget = new NCMGET();

const result = await ncmget.song(3374579108);

// 如果 3 次重试后仍然失败
if (ncmget.error) {
  console.error(`经过 3 次重试后仍然失败: ${ncmget.error} - ${ncmget.status}`);
}
```
