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

export function album(cmd: Command) {
    cmd
        .command("album <id...>")
        .description("Download album resource")
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
                        const albumRaw = await ncm.album(id);
                        const songs: SongData[] = JSON.parse(albumRaw);

                        if (songs.length === 0) {
                            console.log(
                                styleText(
                                    "yellow",
                                    `No songs found for album id: ${id}`,
                                ),
                            );
                            continue;
                        }

                        const albumName = songs[0].album || `album_${id}`;
                        const albumDir = path.join(options.output, albumName);
                        console.log(
                            styleText(
                                ["bold", "cyan"],
                                `Album: ${albumName} (${songs.length} songs)`,
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
                                albumDir,
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
                                `Failed to process album ${id}: ${msg}`,
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
