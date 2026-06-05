import { styleText } from "node:util";
import type { SongData } from "../core/types.js";

interface DisplayOptions {
    title?: string;
    showIndex?: boolean;
}

function printSongList(
    songs: SongData[],
    options: DisplayOptions = {},
): void {
    const { title, showIndex = true } = options;

    if (songs.length === 0) return;

    if (title) {
        console.log(styleText(["bold", "cyan"], title));
        console.log("─".repeat(60));
    }

    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        const pad = showIndex ? "     " : "   ";

        if (showIndex) {
            console.log(
                styleText(
                    ["bold", "cyan"],
                    ` ${(i + 1).toString().padStart(3)}.`,
                ) +
                    styleText("bold", ` ${song.name}`),
            );
        } else {
            console.log(styleText("bold", ` ${song.name}`));
        }
        console.log(
            styleText(
                "gray",
                `${pad}ID:\t[${styleText(["green"], String(song.id))}]`,
            ),
        );
        console.log(
            styleText(
                "gray",
                `${pad}Author:\t${song.artist.join(", ") || "Unknown"}`,
            ),
        );
        console.log(styleText("gray", `${pad}Album:\t${song.album || ""}`));

        if (i < songs.length - 1) {
            console.log("");
        }
    }

    if (title) {
        console.log("─".repeat(60));
    }
}

export { printSongList };
export type { DisplayOptions };
