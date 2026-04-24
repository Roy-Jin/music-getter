import chalk from 'chalk';

const DEFAULT_API = 'https://api.qijieya.cn/meting/';

export interface SearchOptions {
  type?: number;
  page?: number;
  limit?: number;
}

export interface Music {
  id: string;
  name: string;
  artist: string[];
  album: string;
  pic_id: string;
  pic: string;
  url_id: string;
  lyric_id: string;
  lrc: string;
  source: string;
}

export interface MusicResponse {
  id: string;
  name: string;
  artist: string[];
  album: string;
  pic: string;
  url: string;
  lrc: string;
  source: string;
  [key: string]: unknown;
}

export class Meting {
  private server: string;
  private cookieValue: string;
  private formatEnabled: boolean;
  private _api: string;

  constructor(server: string = 'netease') {
    this.server = server;
    this.cookieValue = '';
    this.formatEnabled = false;
    this._api = DEFAULT_API;
  }

  site(server: string): this {
    this.server = server;
    return this;
  }

  api(apiUrl: string): this {
    this._api = apiUrl;
    return this;
  }

  cookie(cookie: string): this {
    this.cookieValue = cookie;
    return this;
  }

  format(enable: boolean): this {
    this.formatEnabled = enable;
    return this;
  }

  private async request(type: string, id: string | number, options: Record<string, unknown> = {}): Promise<string> {
    const params = new URLSearchParams({
      server: this.server,
      type: type,
      id: String(id),
      ...options,
    });

    if (this.cookieValue) {
      params.set('cookie', this.cookieValue);
    }

    try {
      const requestUrl = new URL(this._api);
      params.forEach((value, key) => {
        requestUrl.searchParams.set(key, value);
      });

      const response = await fetch(requestUrl.toString());

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Empty response');
      }

      if (data[0] && 'name' in data[0]) {
        if (this.formatEnabled) {
          return JSON.stringify(this.formatData(data));
        }
        return JSON.stringify(data);
      }

      throw new Error('Invalid response format');
    } catch (error) {
      this.handleError(error, type);
      return '[]';
    }
  }

  private formatData(data: unknown[]): Music[] {
    return data.map((item: unknown) => {
      const music = item as Record<string, unknown>;

      let id = String(music.id || '');
      if (!id) {
        const url = String(music.url || '');
        if (url) {
          try {
            const urlObj = new URL(url);
            const extractedId = urlObj.searchParams.get('id');
            if (extractedId) {
              id = extractedId;
            }
          } catch {
            // Ignore URL parsing errors
          }
        }
      }

      return {
        id: id,
        name: String(music.name || ''),
        artist: Array.isArray(music.artist) ? music.artist as string[] : String(music.artist || '').split(' / '),
        album: String(music.album || ''),
        pic_id: String(music.pic_id || id),
        pic: String(music.pic || ''),
        url_id: String(music.url_id || music.url || ''),
        lyric_id: String(music.lyric_id || id),
        lrc: String(music.lrc || ''),
        source: String(music.source || this.server),
      };
    });
  }

  private handleError(error: unknown, type: string): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`${chalk.red('error: ')}${errorMessage}`);
  }

  async search(keyword: string, options: SearchOptions = {}): Promise<string> {
    const searchOptions = {
      search_type: options.type ?? 1,
      page: options.page ?? 1,
      limit: options.limit ?? 30,
    };
    return await this.request('search', keyword, searchOptions);
  }

  async song(id: string | number): Promise<string> {
    return await this.request('song', id);
  }

  async artist(id: string | number, limit: number = 30): Promise<string> {
    return await this.request('artist', id, { limit });
  }

  async playlist(id: string | number): Promise<string> {
    return await this.request('playlist', id);
  }

  async url(id: string | number, bitrate: number = 320): Promise<string> {
    return await this.request('url', id, { br: bitrate });
  }

  async lyric(id: string | number): Promise<string> {
    return await this.request('lrc', id);
  }

  async pic(id: string | number, size: number = 300): Promise<string> {
    return await this.request('pic', id, { cover: size });
  }
}

export default Meting;