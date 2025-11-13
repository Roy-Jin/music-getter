import meting from "@/meting.js";
import chalk from "@chalk";

export default function search(_com) {
    _com
        .command("search <keyword>")
        .description("search song resource.")
        .option("-s, --server <source>", "Specify music platform.", {
            default: ["netease"],
            collect: true
        })
        .option("-c, --check", "Verify resource availability.")
        .action(async (options, keyword) => {
            const { server, check } = options;

            const data = (await Promise.all(server.map(async (server) => {
                return await meting({
                    server: server,
                    type: 'search',
                    id: keyword
                })
            }))).flat();

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