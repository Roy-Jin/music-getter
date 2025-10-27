import { Command } from "@command";

let command;
import song from "@command/song";
import playlist from "@command/playlist";
import album from "@command/album";
import list from "@command/list";
import search from "@command/search";

const init = (_ = {}) => {
    command = new Command()
        .name(_.name)
        .version(_.version)
        .option("--version-deno", "Show the version number for deno.")
        .action(() => {
            console.log("Deno %s", Deno.version.deno);
        })
        .description(_.description)

    for (let key in _.metas) {
        command.meta(key, _.metas[key]);
    }

    song(command)
    album(command)
    playlist(command)
    list(command)
    search(command)
}

export {
    init,
    command
}