import { Command } from "commander";
import { styleText } from "node:util";
import { NCMGET } from "../core/index.js";
import type { SongData } from "../core/types.js";
import { printSongList } from "../utils/Display.js";

export function search(cmd: Command) {
    cmd
        .command("search")
        .description("Search for music")
        .argument("<keyword>", "search keyword")
        .option(
            "-t, --type <type>",
            "search type: 1=song, 10=album, 100=artist, 1000=playlist",
            "1",
        )
        .option("-l, --limit <limit>", "number of results", "30")
        .option("-p, --page <page>", "page number", "1")
        .action(action);
}

const action = async (
    keyword: string,
    options: { type: string; limit: string; page: string },
) => {
    const ncm = new NCMGET();

    try {
        const result = await ncm.search(keyword, {
            type: Number(options.type),
            limit: Number(options.limit),
            page: Number(options.page),
        });

        const songs: SongData[] = JSON.parse(result);

        if (songs.length === 0) {
            console.log(
                styleText("yellow", `No results found for: ${keyword}`),
            );
            return;
        }

        printSongList(songs, {
            title: `Search results for "${keyword}" (${songs.length} songs):`,
        });
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.log(styleText("red", `Search failed: ${msg}`));
    }
};
