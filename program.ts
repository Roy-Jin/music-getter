import { Command } from "@command";

let command: any;

import song from "@command/song.ts";
import playlist from "@command/playlist.ts";
import album from "@command/album.ts";
import list from "@command/list.ts";
import search from "@command/search.ts";
import preview from "@command/preview.ts";

interface InitOptions {
  name: string;
  version: string;
  description: string;
  metas: {
    [key: string]: string;
  };
}

const init = (_: InitOptions = {} as InitOptions) => {
  command = new Command()
    .name(_.name)
    .version(_.version)
    .option("--version-deno", "Show the version number for deno.")
    .action(() => {
      console.log("Deno %s", Deno.version.deno);
    })
    .description(_.description);

  for (const key in _.metas) {
    command.meta(key, _.metas[key]);
  }

  song(command);
  album(command);
  playlist(command);
  list(command);
  search(command);
  preview(command);
};

export { command, init };
