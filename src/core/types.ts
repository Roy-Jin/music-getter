export interface ApiConfig {
  method: "GET" | "POST";
  url: string;
  body: Record<string, unknown> | null;
  encode?: string;
  decode?: string;
  format?: string;
}

export interface SearchOption {
  type?: number;
  limit?: number;
  page?: number;
}

export interface SongData {
  id: string | number;
  name: string;
  artist: string[];
  album: string;
  pic_id: string | number;
  url_id: string | number;
  lrc_id: string | number;
  source: string;
}

export interface UrlData {
  url: string;
  size?: number;
  br?: number;
}

export interface LrcData {
  lrc: string;
  tlrc: string;
}

export type Headers = Record<string, string>;
