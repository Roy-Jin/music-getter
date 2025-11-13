import meting from "@/meting.js";
import download from "@/download.js";
import * as path from "@path";
import chalk from "@chalk";

export default function album(_com) {
    _com
        .command("album <keyword>")
        .description("Get the entire album resource.")
        .option("-l, --lyric ", "Include lyrics for all songs.")
        .option("-c, --cover [size]", "Include cover image for all songs.")
        .option("-o, --output <path>", "Custom output directory.", {
            default: "./"
        })
        .option("-s, --server <source>", "Specify source platform.", {
            default: "netease"
        })
        .action(async (options, keyword) => {
            const { lyric, cover, server, output } = options;

            const data = await meting({
                server: server,
                type: 'album',
                id: keyword
            })

            if (!data?.error) {
                const outputDir = path.normalize(`${Deno.cwd()}/${output}/`);
                Deno.mkdirSync(outputDir, { recursive: true });

                for (const music of data) {
                    const out = (etx, isname) => {
                        let conbine_name = `${music.title}-${music.author}`;
                        if (conbine_name.length > 57) conbine_name = conbine_name.slice(0, 56) + "…";
                        if (isname) return conbine_name;
                        return path.join(outputDir, conbine_name + (etx ? '.' + etx : ''));
                    };

                    if (cover) {
                        download.add(() => fetch(music.pic, { method: "HEAD" })
                            .then(response => response.url)
                            .then((PicUrl) => {
                                const url = new URL(PicUrl);
                                if (cover === "trueytrue") { url.search = "" }
                                else { url.search = `?param=${cover}y${cover}` };
                                return url.href;
                            })
                            , out('png'))
                    }
                    lyric && download.add(music.lrc, out('lrc'));
                    download.add(music.url, out('mp3'));
                    console.log(chalk.bgBlue.bold(" + ") + chalk.bgGray(` ${out('', true)} `));
                }

                console.log("");
                download.startAll();
            }
            else {
                console.error(chalk.red.bold("error: ") + data.error);
            }
        })
}