import meting from "@/meting.js";
import chalk from "@chalk";

export default function list(_com) {
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
                id: keyword,
                type
            })

            if (!data?.error) {
                for (const music of data) {
                    if (check) {
                        const length = await fetch(music.url, { method: 'HEAD' }).then(res => res.headers.get('content-length'));

                        if (length <= 1024 * 1024) {
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
                console.error(chalk.red.bold("error: ") + data.error);
            }
        })
}