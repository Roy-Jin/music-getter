# Custom API

Music Getter uses the public Meting API service (`https://api.qijieya.cn/meting/`) by default. You can also deploy your own Meting API service or use a third-party service.

## Using a Custom API

### Via Command Line

You can specify a custom API endpoint using the `--api` option in all commands:

```sh
mg song 1372188635 --api https://your-api.example.com/meting/
mg playlist 7697114803 --api https://your-api.example.com/meting/
mg search "Daylight" --api https://your-api.example.com/meting/
```

### Programmatically

Set it via the `meting.api()` method in code. See [Meting API Docs](/api/meting#api) for details.

## Deploying Meting API

Meting API is an open-source project. You can refer to the [Meting GitHub Repository](https://github.com/metowolf/Meting) to deploy your own.

### Docker Deployment (Recommended)

```sh
docker run -d --name meting -p 3000:3000 metowolf/meting
```

### Manual Deployment

```sh
git clone https://github.com/metowolf/Meting.git
cd Meting
composer install
cp .env.example .env
# Edit .env file to configure database, etc.
php -S 0.0.0.0:3000 -t public
```

## API Format

Custom APIs must be compatible with the Meting API request format:

```
GET {api_url}?server={platform}&type={type}&id={id}
```

### Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `server` | Music platform | `netease`, etc. |
| `type` | Resource type | `song` / `playlist` / `search` / `url` / `lrc` / `pic` |
| `id` | Resource ID | `1372188635` |

### Response Format

The API should return data as a JSON array:

```json
[
  {
    "id": "1372188635",
    "name": "Daylight",
    "artist": ["David Kushner"],
    "album": "Daylight",
    "pic_id": "109951168322702440",
    "url_id": "https://...",
    "lyric_id": "1372188635",
    "lrc": "https://...",
    "source": "netease"
  }
]
```
