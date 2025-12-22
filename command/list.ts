import meting from "@/meting.ts";
import chalk from "@chalk";
import { Command } from "@command";

export default function list(_com: Command) {
  _com
    .command("ls, list <keyword>")
    .description("List resources from a specific type.")
    .option("-t, --type <type>", "Resource type.", {
      default: "playlist"
    })
    .meta("Supported types", chalk.green("playlist, album, artist"))
    .option("-c, --check", "Verify resource availability.")
    .option("-s, --server <source>", "Specify source platform.", {
      default: "netease"
    })
    .action(async (options, keyword) => {
      const { server, check, type } = options;

      const data = await meting({
        server: server,
        id: keyword as string,
        type: type
      });

      if (!data || !data.find(item => item.error)) {
        for (const music of data) {
          if (check) {
            const length = await fetch(music.url, { method: 'HEAD' }).then(res => res.headers.get('content-length'));

            if (length && parseInt(length) <= 1024 * 1024) {
              console.log(chalk.blue.bold(` ${music.server}|${music.id} \t`) + chalk.bgRed(' ') + chalk.bgGray.bold(` ${music.title} `) + chalk.gray(` ${music.author} `));
            } else {
              console.log(chalk.blue.bold(` ${music.server}|${music.id} \t`) + chalk.bgGreen(' ') + chalk.bgGray.bold(` ${music.title} `) + chalk.gray(` ${music.author} `));
            }
          } else {
            console.log(chalk.blue.bold(` ${music.server}|${music.id} \t`) + chalk.bgGray.bold(` ${music.title} `) + chalk.gray(` ${music.author} `));
          }
        }
      }
      else {
        const errorData = data.find(item => item.error);
        console.error(chalk.red.bold("error: ") + (errorData ? errorData.error : 'Unknown error'));
      }
    });
}