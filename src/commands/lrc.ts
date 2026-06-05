import { Command } from "commander";
import { mkdirSync, writeFileSync } from "node:fs";
import * as path from "node:path";
import { styleText } from "node:util";
import { NCMGET } from "../core/index.js";
import type { LrcData, SongData } from "../core/types.js";
import {
    DEFAULT_FILENAME_FORMAT,
    formatSongFilename,
} from "../utils/Format.js";

export function lrc(cmd: Command) {
    cmd
        .command("lrc <id...>")
        .description("Download lyrics resource")
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

                for (const id of ids) {
                    try {
                        const lrcRaw = await ncm.lrc(id);
                        const lrcData: LrcData = JSON.parse(lrcRaw);

                        if (!lrcData.lrc) {
                            console.log(
                                styleText(
                                    "yellow",
                                    `No lrc found for id: ${id}`,
                                ),
                            );
                            continue;
                        }

                        const songRaw = await ncm.song(id);
                        const songs: SongData[] = JSON.parse(songRaw);
                        const filename = songs.length > 0
                            ? formatSongFilename(songs[0], options.format)
                            : `lrc_${id}`;

                        const outputPath = path.join(
                            options.output,
                            filename + ".lrc",
                        );
                        mkdirSync(path.dirname(outputPath), {
                            recursive: true,
                        });

                        let content = lrcData.lrc;
                        if (lrcData.tlrc) {
                            content += "\n\n--- Translation ---\n\n" +
                                lrcData.tlrc;
                        }

                        writeFileSync(outputPath, content, "utf-8");
                        console.log(styleText("green", `Saved: ${outputPath}`));
                    } catch (error) {
                        const msg = error instanceof Error
                            ? error.message
                            : String(error);
                        console.log(
                            styleText(
                                "red",
                                `Failed to process lrc ${id}: ${msg}`,
                            ),
                        );
                    }
                }
            },
        );
}
