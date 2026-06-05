import { Command } from "commander";
import * as path from "node:path";
import { styleText } from "node:util";
import { NCMGET } from "../core/index.js";
import type { SongData, UrlData } from "../core/types.js";
import dlManager from "../utils/DLManager.js";
import {
    DEFAULT_FILENAME_FORMAT,
    formatSongFilename,
} from "../utils/Format.js";

export function playlist(cmd: Command) {
    cmd
        .command("playlist <id...>")
        .description("Download playlist resource")
        .option("-o, --output <output>", "output directory", "./")
        .option(
            "-f, --format <format>",
            "filename format template",
            DEFAULT_FILENAME_FORMAT,
        )
        .action(
            async (
                ids: string[],
                options: { output: string; format: string },
            ) => {
                const ncm = new NCMGET();
                dlManager.clear();

                for (const id of ids) {
                    try {
                        const playlistRaw = await ncm.playlist(id);
                        const songs: SongData[] = JSON.parse(playlistRaw);

                        if (songs.length === 0) {
                            console.log(
                                styleText(
                                    "yellow",
                                    `No songs found for playlist id: ${id}`,
                                ),
                            );
                            continue;
                        }

                        const playlistDir = path.join(
                            options.output,
                            `playlist_${id}`,
                        );
                        console.log(
                            styleText(
                                ["bold", "cyan"],
                                `Playlist: ${id} (${songs.length} songs)`,
                            ),
                        );

                        for (const song of songs) {
                            const urlRaw = await ncm.url(song.url_id);
                            const urlData: UrlData = JSON.parse(urlRaw);

                            if (!urlData.url) {
                                console.log(
                                    styleText(
                                        "yellow",
                                        `  Skip (no URL): ${
                                            formatSongFilename(
                                                song,
                                                options.format,
                                            )
                                        }`,
                                    ),
                                );
                                continue;
                            }

                            const filename = formatSongFilename(
                                song,
                                options.format,
                            );
                            const outputPath = path.join(
                                playlistDir,
                                filename + ".mp3",
                            );
                            dlManager.add(urlData.url, outputPath);
                            console.log(
                                styleText(["bold", "bgGreen"], " + ") +
                                    styleText("bgGray", ` ${filename} `),
                            );
                        }
                    } catch (error) {
                        const msg = error instanceof Error
                            ? error.message
                            : String(error);
                        console.log(
                            styleText(
                                "red",
                                `Failed to process playlist ${id}: ${msg}`,
                            ),
                        );
                    }
                }

                if (dlManager.getCount() > 0) {
                    await dlManager.startAll();
                } else {
                    console.log(styleText("yellow", "No songs to download."));
                }
            },
        );
}
