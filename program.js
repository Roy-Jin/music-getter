import { Command } from "@command";

let command;
import song from "@command/song.js";
import playlist from "@command/playlist.js";
import album from "@command/album.js";
import list from "@command/list.js";
import search from "@command/search.js";
import preview from "@command/preview.js";

const init = (_ = {}) => {
    command = new Command()
        .name(_.name)
        .version(_.version)
        .option("--version-deno", "Show the version number for deno.")
        .action(() => {
            console.log("Deno %s", Deno.version.deno);
        })
        .description(_.description)

    for (const key in _.metas) {
        command.meta(key, _.metas[key]);
    }

    song(command)
    album(command)
    playlist(command)
    list(command)
    search(command)
    preview(command)
}

export {
    init,
    command
}