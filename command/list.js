import meting from "@/meting";
import chalk from "@chalk";

export default function list(_com) {
    _com
        .command("ls, list <keyword>")
        .description("list a playlist resource.")
        .option("-s, --server <source>", "Specify the server source to list.", {
            default: "netease"
        })
        .option("-t, --type <type>", "Specify the type of resource to list.", {
            default: "playlist"
        })
        .meta("Supported types", chalk.green("playlist, album, artist"))
        .option("-c, --check", "Check the song resource is available or not.")
        .action(async (options, keyword) => {
            const { server, check, type } = options;

            const data = await meting({
                server: server,
                id: keyword,
                type
            })

            if (!data?.error) {
                for (let music of data) {
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