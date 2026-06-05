import { Command } from "commander";
import { styleText } from "node:util";
import { NCMGET } from "../core/index.js";
import type { SongData, UrlData } from "../core/types.js";
import { openBrowser } from "../utils/OpenBrowser.js";

export function preview(cmd: Command) {
    cmd
        .command("preview <id>")
        .description("Preview song in browser")
        .action(async (id: string) => {
            const ncm = new NCMGET();

            try {
                const songRaw = await ncm.song(id);
                const songs: SongData[] = JSON.parse(songRaw);

                if (songs.length === 0) {
                    console.error(
                        styleText(["bold", "red"], "error: ") +
                            "No song found.",
                    );
                    return;
                }

                const song = songs[0];
                const urlRaw = await ncm.url(song.url_id);
                const urlData: UrlData = JSON.parse(urlRaw);

                if (!urlData.url) {
                    console.error(
                        styleText(["bold", "red"], "error: ") +
                            "No streaming URL available.",
                    );
                    return;
                }

                console.log(
                    styleText(["bold", "green"], "Opening: ") +
                        `${song.name} - ${song.artist.join(", ")}`,
                );

                await openBrowser(urlData.url);
            } catch (error) {
                const msg = error instanceof Error
                    ? error.message
                    : String(error);
                console.error(
                    styleText(["bold", "red"], "error: ") + msg,
                );
            }
        });
}
