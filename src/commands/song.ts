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

export function song(cmd: Command) {
    cmd
        .command("song <id...>")
        .description("Download song resource")
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
                        const songRaw = await ncm.song(id);
                        const songs: SongData[] = JSON.parse(songRaw);

                        if (songs.length === 0) {
                            console.log(
                                styleText(
                                    "yellow",
                                    `No song found for id: ${id}`,
                                ),
                            );
                            continue;
                        }

                        const song = songs[0];
                        const urlRaw = await ncm.url(song.url_id);
                        const urlData: UrlData = JSON.parse(urlRaw);

                        if (!urlData.url) {
                            console.log(
                                styleText(
                                    "yellow",
                                    `No URL available for: ${
                                        formatSongFilename(song, options.format)
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
                            options.output,
                            filename + ".mp3",
                        );
                        dlManager.add(urlData.url, outputPath);
                        console.log(
                            styleText(["bold", "bgGreen"], " + ") +
                                styleText("bgGray", ` ${filename} `),
                        );
                    } catch (error) {
                        const msg = error instanceof Error
                            ? error.message
                            : String(error);
                        console.log(
                            styleText(
                                "red",
                                `Failed to process song ${id}: ${msg}`,
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
