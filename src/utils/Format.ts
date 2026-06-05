import type { SongData } from "../core/types.js";

export const DEFAULT_FILENAME_FORMAT = "{name} - {artist}";

export function formatArtistName(song: SongData): string {
    return song.artist.length > 0 ? song.artist.join(", ") : "Unknown";
}

export function formatSongFilename(
    song: SongData,
    template: string = DEFAULT_FILENAME_FORMAT,
): string {
    const values: Record<string, string> = {
        id: String(song.id),
        name: song.name,
        artist: formatArtistName(song),
        album: song.album || "Unknown",
        pic_id: String(song.pic_id),
        url_id: String(song.url_id),
        lrc_id: String(song.lrc_id),
        source: song.source,
    };

    return template.replace(/\{(\w+)\}/g, (match, key: string) => {
        return key in values ? values[key] : match;
    });
}

export function sanitizeFilename(filename: string): string {
    const illegalChars = /[<>:"/\\|?*\x00-\x1f]/g;
    const trimmed = filename.replace(illegalChars, "_");
    const normalized = trimmed.replace(/\s+/g, " ").trim();
    return normalized || "untitled";
}
