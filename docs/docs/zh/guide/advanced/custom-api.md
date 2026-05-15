# 自定义 API

Music Getter 默认使用公共 Meting API 服务（`https://api.qijieya.cn/meting/`），你也可以部署自己的 Meting API 服务或使用第三方服务。

## 使用自定义 API

### 命令行方式

在所有命令中都可以通过 `--api` 选项指定自定义 API 地址：

```sh
mg song 1372188635 --api https://your-api.example.com/meting/
mg playlist 7697114803 --api https://your-api.example.com/meting/
mg search "Daylight" --api https://your-api.example.com/meting/
```

### 编程方式

在代码中可通过 `meting.api()` 方法设置，详见 [Meting API 文档](/api/meting#api)。

## 部署 Meting API

Meting API 是一个开源项目，你可以参考 [Meting GitHub 仓库](https://github.com/metowolf/Meting) 自行部署。

### Docker 部署（推荐）

```sh
docker run -d --name meting -p 3000:3000 metowolf/meting
```

### 手动部署

```sh
git clone https://github.com/metowolf/Meting.git
cd Meting
composer install
cp .env.example .env
# 编辑 .env 文件配置数据库等
php -S 0.0.0.0:3000 -t public
```

## API 格式

自定义 API 需要兼容 Meting API 的请求格式：

```
GET {api_url}?server={platform}&type={type}&id={id}
```

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `server` | 音乐平台 | `netease` 等 |
| `type` | 资源类型 | `song` / `playlist` / `search` / `url` / `lrc` / `pic` |
| `id` | 资源 ID | `1372188635` |

### 响应格式

API 应返回 JSON 数组格式的数据：

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
