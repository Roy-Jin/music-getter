import { Command } from "commander";
import { styleText } from "node:util";
import { NCMGET } from "../core/index.js";
import type { SongData } from "../core/types.js";
import { printSongList } from "../utils/Display.js";

export function info(cmd: Command) {
    cmd
        .command("info")
        .description("Show resource info")
        .argument("<type>", "resource type: song, album, artist, playlist")
        .argument("<id...>", "resource id")
        .action(async (type: string, ids: string[]) => {
            const ncm = new NCMGET();

            for (const id of ids) {
                try {
                    let songs: SongData[];
                    let label: string;

                    switch (type) {
                        case "song": {
                            const raw = await ncm.song(id);
                            songs = JSON.parse(raw);
                            label = `Song ${id}`;
                            break;
                        }
                        case "album": {
                            const raw = await ncm.album(id);
                            songs = JSON.parse(raw);
                            const albumName = songs.length > 0
                                ? songs[0].album
                                : id;
                            label = `Album: ${albumName}`;
                            break;
                        }
                        case "artist": {
                            const raw = await ncm.artist(id);
                            songs = JSON.parse(raw);
                            label = `Artist ${id}`;
                            break;
                        }
                        case "playlist": {
                            const raw = await ncm.playlist(id);
                            songs = JSON.parse(raw);
                            label = `Playlist ${id}`;
                            break;
                        }
                        default:
                            console.log(
                                styleText(
                                    "red",
                                    `Unknown type: ${type}. Supported: song, album, artist, playlist`,
                                ),
                            );
                            return;
                    }

                    if (songs.length === 0) {
                        console.log(
                            styleText("yellow", `No results for ${type} ${id}`),
                        );
                        continue;
                    }

                    printSongList(songs, {
                        title: `${label} (${songs.length} songs)`,
                    });
                } catch (error) {
                    const msg = error instanceof Error
                        ? error.message
                        : String(error);
                    console.log(
                        styleText(
                            "red",
                            `Failed to get info for ${type} ${id}: ${msg}`,
                        ),
                    );
                }
            }
        });
}
