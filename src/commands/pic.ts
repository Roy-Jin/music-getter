import { Command } from "commander";
import * as path from "node:path";
import { styleText } from "node:util";
import { NCMGET } from "../core/index.js";
import type { SongData } from "../core/types.js";
import dlManager from "../utils/DLManager.js";
import {
    DEFAULT_FILENAME_FORMAT,
    formatSongFilename,
} from "../utils/Format.js";

export function pic(cmd: Command) {
    cmd
        .command("pic <id...>")
        .description("Download picture resource")
        .option("-o, --output <output>", "output directory", "./")
        .option("-s, --size <size>", "picture size", "300")
        .option(
            "-f, --format <format>",
            "filename format template",
            DEFAULT_FILENAME_FORMAT,
        )
        .action(
            async (
                ids: string[],
                options: { output: string; size: string; format: string },
            ) => {
                const ncm = new NCMGET();
                dlManager.clear();
                const size = Number(options.size);

                for (const id of ids) {
                    try {
                        const picRaw = await ncm.pic(id, size);
                        const picData: { url: string; song: SongData | null } =
                            JSON.parse(picRaw);

                        if (!picData.url) {
                            console.log(
                                styleText(
                                    "yellow",
                                    `No picture URL for id: ${id}`,
                                ),
                            );
                            continue;
                        }

                        const filename = picData.song
                            ? formatSongFilename(picData.song, options.format)
                            : `pic_${id}`;

                        const outputPath = path.join(
                            options.output,
                            filename + ".jpg",
                        );
                        dlManager.add(picData.url, outputPath);
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
                                `Failed to process pic ${id}: ${msg}`,
                            ),
                        );
                    }
                }

                if (dlManager.getCount() > 0) {
                    await dlManager.startAll();
                } else {
                    console.log(
                        styleText("yellow", "No pictures to download."),
                    );
                }
            },
        );
}
