import Meting from "../core/meting";
import chalk from "chalk";
import { Command } from "commander";

interface MusicItem {
  id: string;
  name: string;
  artist: string[];
  album: string;
  pic_id: string;
  url_id: string;
  lyric_id: string;
  source: string;
}

export default function list(program: Command) {
  program
    .command("list <resource-id>")
    .alias("ls")
    .description("List resources from a specific type.")
    .option("-t, --type <type>", "Resource type.", "playlist")
    .addHelpText(
      "after",
      `\n  Supported types: ${chalk.green("playlist, artist")}`,
    )
    .option("-s, --server <source>", "Specify source platform.", "netease")
    .option("-a, --api <url>", "Specify API endpoint.")
    .action(async (resourceId: string, options) => {
      const { server, type, api } = options;
      const meting = new Meting(server);
      meting.format(true);
      if (api) {
        meting.api(api);
      }

      try {
        let dataStr: string;

        switch (type) {
          case "artist":
            dataStr = await meting.artist(resourceId);
            break;
          case "playlist":
          default:
            dataStr = await meting.playlist(resourceId);
            break;
        }

        const data: MusicItem[] = JSON.parse(dataStr);

        if (!data || data.length === 0) {
          console.error(chalk.red.bold("error: ") + "No results found.");
          return;
        }

        for (const music of data) {
          console.log(
            chalk.blue.bold(` ${music.source}|${music.id} \t`) +
              chalk.bgGray.bold(` ${music.name} `) +
              chalk.gray(` ${music.artist.join(", ")} `),
          );
        }
      } catch (error) {
        const errorMessage = error instanceof Error
          ? error.message
          : String(error);
        console.error(chalk.red.bold("error: ") + errorMessage);
      }
    });
}
