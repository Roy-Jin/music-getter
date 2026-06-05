# Advanced Usage

## Cookie Configuration

Some NetEase Cloud Music features require authentication, such as accessing user playlists or higher-quality audio streams. You can set the cookie using the chainable `cookie()` method:

```typescript
import { NCMGET } from 'ncmget';

const ncmget = new NCMGET().cookie('MUSIC_U=your_token_here; os=pc');

// Now you can access authenticated resources
const result = await ncmget.url(3374579108, 999);
```

### Obtaining Your Cookie

1. Log in to [NetEase Cloud Music](https://music.163.com/) in your browser
2. Open the browser's Developer Tools (F12)
3. Go to the **Application** or **Storage** tab
4. Find the cookies for `music.163.com`
5. Copy the full cookie string, particularly the `MUSIC_U` value

### Cookie in HTTP Server

When using the HTTP server, pass the cookie via the `Cookie` request header:

```bash
curl -H "Cookie: MUSIC_U=xxx" http://localhost:3000/url?id=3374579108&br=999
```

## Format Mode

NCMGET operates in two modes controlled by the `format()` method:

### Formatted Mode (Default)

When formatting is enabled (default), NCMGET extracts and structures the API response into consistent, predictable objects:

```typescript
const ncmget = new NCMGET(); // format is true by default

const result = await ncmget.search('淘气的Roy');
const songs = JSON.parse(result);
// songs is an array of SongData objects
```

### Raw Mode

When formatting is disabled, the raw API response is returned as-is:

```typescript
const ncmget = new NCMGET().format(false);

const result = await ncmget.search('淘气的Roy');
const rawData = JSON.parse(result);
// rawData is the original NetEase API response structure
```

The raw response structure differs from the formatted one and may contain additional fields from the NetEase API. Use raw mode when you need access to fields that are not included in the formatted output.

## EAPI Encryption

NCMGET supports NetEase Cloud Music's EAPI encryption (`netease_eapi`). This is used internally for certain API endpoints that require encrypted communication.

### How It Works

The `_exec` pipeline processes requests through these stages:

1. **Encode**: If the API config specifies `encode: "netease_eapi"`, the request body is encrypted using the EAPI algorithm before being sent
2. **HTTP**: The encrypted request is sent to the NetEase API server
3. **Decode**: If `decode` is specified (e.g., `"netease_url"`, `"netease_lrc"`), the response is decrypted and parsed
4. **Format**: If formatting is enabled, the parsed data is extracted using the `format` dot-path (e.g., `"result.songs"`)

You do not need to manually handle encryption — NCMGET applies it automatically based on the API endpoint being called.

## Error Handling

### Core Error Model

NCMGET does **not** throw exceptions on API errors. Instead, errors are stored in instance properties:

```typescript
const ncmget = new NCMGET();
const result = await ncmget.song(999999999999);

if (ncmget.error) {
  console.log('Error name:', ncmget.error);   // "TIMEOUT" or Error.name
  console.log('Error message:', ncmget.status); // Detailed error message
}
```

| Property | Type | Description |
|----------|------|-------------|
| `error` | `string \| null` | Error identifier: `"TIMEOUT"` for timeout errors, or the `Error.name` for other errors |
| `status` | `string \| null` | Human-readable error message |

### Timeout

The default request timeout is **20 seconds**. If a request exceeds this duration, `ncmget.error` will be set to `"TIMEOUT"`.

### Retry Mechanism

NCMGET automatically retries failed HTTP requests **3 times** with a **1 second interval** between retries. This handles transient network issues without manual intervention.

### Checking for Errors

Always check the `error` property after an API call:

```typescript
const ncmget = new NCMGET();

const result = await ncmget.url(3374579108);

if (ncmget.error) {
  // Handle error
  console.error(`Request failed: ${ncmget.status}`);
} else {
  // Process result
  const urlData = JSON.parse(result);
  console.log(urlData.url);
}
```

## Instance Safety

NCMGET instances are **not thread-safe**. The `error`, `status`, `raw`, and `info` properties are shared state on the instance. If you make concurrent requests with the same instance, these properties may be overwritten.

### Best Practice: One Instance Per Operation

For concurrent usage, create a new NCMGET instance for each independent operation:

```typescript
// ❌ Unsafe: shared instance for concurrent calls
const ncmget = new NCMGET();
const [r1, r2] = await Promise.all([
  ncmget.song(1),
  ncmget.song(2), // overwrites ncmget.error/status from first call
]);

// ✅ Safe: separate instances for concurrent calls
const [r1, r2] = await Promise.all([
  new NCMGET().song(1),
  new NCMGET().song(2),
]);
```

The HTTP server already follows this pattern — it creates a new NCMGET instance per request.
