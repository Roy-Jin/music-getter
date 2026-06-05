import pkg from "../../package.json" with { type: "json" };
import crypto from "node:crypto";
import type { ApiConfig, Headers, SearchOption, SongData } from "./types.js";

const EAPI_KEY = "e82ckenh8dichen8";

export class NCMGET {
  readonly VERSION = pkg.version;

  raw: string | null = null;
  info: { statusCode: number; headers: Record<string, string> } | null = null;
  error: string | null = null;
  status: string | null = null;
  temp: Record<string, unknown> = {};
  isFormat = true;
  header: Headers = {};

  constructor() {
    this.header = this.getHeaders();
  }

  cookie(cookie: string): this {
    this.header["Cookie"] = cookie;
    return this;
  }

  format(format = true): this {
    this.isFormat = format;
    return this;
  }

  // ========== HTTP Requests ==========

  async _exec(api: ApiConfig): Promise<string> {
    if (api.encode) {
      api = await this.handleEncode(api);
    }

    if (api.method === "GET" && api.body) {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(api.body)) {
        params.append(k, String(v));
      }
      api.url += "?" + params.toString();
      api.body = null;
    }

    await this._curl(api.url, api.body);

    if (!this.isFormat) {
      return this.raw ?? "";
    }

    let data = this.raw ?? "";

    if (api.decode) {
      data = await this.handleDecode(api.decode, data);
    }

    if ("format" in api) {
      data = this.cleanData(data, api.format);
    }

    return data;
  }

  async _curl(
    url: string,
    payload: unknown = null,
  ): Promise<NCMGET> {
    const requestOptions: RequestInit & { headers: Record<string, string> } = {
      method: payload ? "POST" : "GET",
      headers: { ...this.header },
    };

    let body: BodyInit | null = null;
    if (payload) {
      if (
        typeof payload === "object" &&
        !Buffer.isBuffer(payload) &&
        typeof payload !== "string"
      ) {
        body = new URLSearchParams(
          payload as Record<string, string>,
        ).toString();
        requestOptions.headers["Content-Type"] =
          "application/x-www-form-urlencoded";
      } else {
        body = payload as BodyInit;
      }
      requestOptions.body = body;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);
    requestOptions.signal = controller.signal;

    let retries = 3;
    const makeRequest = async (): Promise<NCMGET> => {
      try {
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);

        this.info = {
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        };

        this.raw = await response.text();
        this.error = null;
        this.status = "";

        return this;
      } catch (err: unknown) {
        clearTimeout(timeoutId);

        if (err instanceof DOMException && err.name === "AbortError") {
          this.error = "TIMEOUT";
          this.status = "Request timeout";
        } else if (err instanceof Error) {
          this.error = err.name;
          this.status = err.message;
        }

        if (retries > 0) {
          retries--;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return makeRequest();
        }

        return this;
      }
    };

    return makeRequest();
  }

  // ========== API Methods ==========

  async search(keyword: string, option: SearchOption = {}): Promise<string> {
    const api: ApiConfig = {
      method: "POST",
      url: "http://music.163.com/api/cloudsearch/pc",
      body: {
        s: keyword,
        type: option.type ?? 1,
        limit: option.limit ?? 30,
        total: "true",
        offset: option.page && option.limit
          ? (option.page - 1) * option.limit
          : 0,
      },
      encode: "netease_eapi",
      format: "result.songs",
    };
    return this._exec(api);
  }

  async song(id: string | number): Promise<string> {
    const api: ApiConfig = {
      method: "POST",
      url: "http://music.163.com/api/v3/song/detail/",
      body: { c: `[{"id":${id},"v":0}]` },
      encode: "netease_eapi",
      format: "songs",
    };
    return this._exec(api);
  }

  async album(id: string | number): Promise<string> {
    const api: ApiConfig = {
      method: "POST",
      url: `http://music.163.com/api/v1/album/${id}`,
      body: {
        total: "true",
        offset: "0",
        id: String(id),
        limit: "1000",
        ext: "true",
        private_cloud: "true",
      },
      encode: "netease_eapi",
      format: "songs",
    };
    return this._exec(api);
  }

  async artist(id: string | number, limit = 50): Promise<string> {
    const api: ApiConfig = {
      method: "POST",
      url: `http://music.163.com/api/v1/artist/${id}`,
      body: {
        ext: "true",
        private_cloud: "true",
        top: limit,
        id: String(id),
      },
      encode: "netease_eapi",
      format: "hotSongs",
    };
    return this._exec(api);
  }

  async playlist(id: string | number): Promise<string> {
    const api: ApiConfig = {
      method: "POST",
      url: "http://music.163.com/api/v6/playlist/detail",
      body: { s: "0", id: String(id), n: "1000", t: "0" },
      encode: "netease_eapi",
      format: "playlist.tracks",
    };
    return this._exec(api);
  }

  async url(id: string | number, br = 320): Promise<string> {
    this.temp.br = br;
    const api: ApiConfig = {
      method: "POST",
      url: "http://music.163.com/api/song/enhance/player/url",
      body: { ids: [id], br: br * 1000 },
      encode: "netease_eapi",
      decode: "netease_url",
    };
    return this._exec(api);
  }

  async lrc(id: string | number): Promise<string> {
    const api: ApiConfig = {
      method: "POST",
      url: "http://music.163.com/api/song/lyric",
      body: { id: String(id), os: "linux", lv: -1, kv: -1, tv: -1 },
      encode: "netease_eapi",
      decode: "netease_lrc",
    };
    return this._exec(api);
  }

  async pic(id: string | number, size = 300): Promise<string> {
    const songRaw = await this.song(id);
    const songs: SongData[] = JSON.parse(songRaw);

    if (songs.length === 0) {
      return JSON.stringify({ url: "", song: null });
    }

    const picId = String(songs[0].pic_id);
    const url = `https://p3.music.126.net/${
      this.encryptId(picId)
    }/${picId}.jpg?param=${size}y${size}`;
    return JSON.stringify({ url, song: songs[0] });
  }

  // ========== Request Headers ==========

  private getHeaders(): Headers {
    const timestamp = Date.now().toString();
    const deviceId = this.generateDeviceId();
    return {
      Referer: "music.163.com",
      Cookie:
        `osver=android; appver=8.7.01; os=android; deviceId=${deviceId}; channel=netease; requestId=${timestamp}_${
          Math.floor(Math.random() * 1000).toString().padStart(4, "0")
        }; __remember_me=true`,
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36 NeteaseMusic/8.7.01",
      Accept: "*/*",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  // ========== Encoding/Decoding ==========

  private async handleEncode(api: ApiConfig): Promise<ApiConfig> {
    if (api.encode === "netease_eapi") {
      return this.eapiEncrypt(api);
    }
    return api;
  }

  private async handleDecode(
    decodeType: string,
    data: string,
  ): Promise<string> {
    if (decodeType === "netease_url") return this.urlDecode(data);
    if (decodeType === "netease_lrc") return this.lrcDecode(data);
    return data;
  }

  // ========== Data Formatting/Cleaning ==========

  private formatSongData(data: Record<string, unknown>): SongData {
    const al = data.al as Record<string, unknown>;
    const ar = data.ar as Array<Record<string, unknown>>;

    const result: SongData = {
      id: data.id as string | number,
      name: data.name as string,
      artist: [],
      album: al.name as string,
      pic_id: (al.pic_str ?? al.pic ?? data.id) as string | number,
      url_id: data.id as string | number,
      lrc_id: data.id as string | number,
      source: "netease",
    };

    if (al.picUrl) {
      const match = String(al.picUrl).match(/\/(\d+)\./);
      if (match) {
        result.pic_id = match[1];
      }
    }

    ar.forEach((artist) => {
      result.artist.push(artist.name as string);
    });

    return result;
  }

  private cleanData(raw: string, rule: string | undefined): string {
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      return JSON.stringify([]);
    }

    if (rule) {
      data = this.pickupData(data as Record<string, unknown>, rule);
    }

    if (!Array.isArray(data) && typeof data === "object" && data !== null) {
      data = [data];
    }

    if (!Array.isArray(data)) {
      return JSON.stringify([]);
    }

    const result = data.map((item) =>
      this.formatSongData(item as Record<string, unknown>)
    );
    return JSON.stringify(result);
  }

  private pickupData(
    obj: Record<string, unknown>,
    rule: string,
  ): unknown {
    const parts = rule.split(".");
    let result: unknown = obj;
    for (const part of parts) {
      if (!result || typeof result !== "object" || !(part in result)) {
        return {};
      }
      result = (result as Record<string, unknown>)[part];
    }
    return result;
  }

  // ========== EAPI Encryption ==========

  private async eapiEncrypt(api: ApiConfig): Promise<ApiConfig> {
    const text = JSON.stringify(api.body);
    const url = api.url.replace(/https?:\/\/[^/]+/, "");

    const message = `nobody${url}use${text}md5forencrypt`;
    const digest = crypto.createHash("md5").update(message).digest("hex");
    const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;

    const cipher = crypto.createCipheriv(
      "aes-128-ecb",
      Buffer.from(EAPI_KEY, "utf8"),
      null,
    );
    cipher.setAutoPadding(true);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    api.url = api.url.replace("/api/", "/eapi/");
    api.body = { params: encrypted.toUpperCase() };

    return api;
  }

  // ========== Decoding ==========

  private urlDecode(result: string): string {
    const data = JSON.parse(result);
    const item = data.data[0];

    if (item.uf?.url) {
      item.url = item.uf.url;
    }

    const url = item.url
      ? { url: item.url, size: item.size, br: item.br / 1000 }
      : { url: "", size: 0, br: -1 };

    return JSON.stringify(url);
  }

  private lrcDecode(result: string): string {
    const data = JSON.parse(result);
    return JSON.stringify({
      lrc: data.lrc?.lyric ?? "",
      tlrc: data.tlyric?.lyric ?? "",
    });
  }

  // ========== Utility Methods ==========

  private generateDeviceId(): string {
    return crypto.randomBytes(16).toString("hex").toUpperCase();
  }

  private encryptId(id: string): string {
    const magic = "3go8&$8*3*3h0k(2)2".split("");
    const songId = id.split("");

    for (let i = 0; i < songId.length; i++) {
      songId[i] = String.fromCharCode(
        songId[i].charCodeAt(0) ^ magic[i % magic.length].charCodeAt(0),
      );
    }

    return crypto
      .createHash("md5")
      .update(songId.join(""), "binary")
      .digest("base64")
      .replace(/\//g, "_")
      .replace(/\+/g, "-");
  }
}

export default NCMGET;
