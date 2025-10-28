import meting from "@/meting";
import download from "@/download";
import * as path from "@path";
import chalk from "@chalk";

export default function song(_com) {
    _com
        .command("song <keyword>")
        .description("Get single song resource.")
        .option("-l, --lyric ", "Include lyrics file.")
        .option("-c, --cover [size]", "Include cover image.")
        .option("-o, --output <path>", "Custom output directory.", {
            default: "./"
        })
        .option("-s, --server <source>", "Specify music platform.", {
            default: "netease"
        })
        .action(async (options, keyword) => {
            const { lyric, cover, server, output } = options;

            const data = await meting({
                server: server,
                type: 'song',
                id: keyword
            })

            if (!data?.error) {
                const outputDir = path.normalize(`${Deno.cwd()}/${output}/`);
                Deno.mkdirSync(outputDir, { recursive: true });

                for (let music of data) {
                    const out = (etx, isname) => {
                        let conbine_name = `${music.title}-${music.author}`;
                        if (conbine_name.length > 57) conbine_name =  conbine_name.slice(0, 56) + "…";
                        if (isname) return conbine_name;
                        return path.join(outputDir, conbine_name + (etx ? '.' + etx : ''));
                    };

                    if (cover) {
                        await download.add(async () => fetch(music.pic, { method: "HEAD" })
                            .then(response => response.url)
                            .then(async (PicUrl) => {
                                const url = new URL(PicUrl);
                                if (cover === "trueytrue") { url.search = "" }
                                else { url.search = `?param=${cover}y${cover}` };
                                return url.href;
                            })
                            , out('png'))
                    }
                    lyric && await download.add(music.lrc, out('lrc'));
                    await download.add(music.url, out('mp3'));
                    console.log(chalk.bgGreen.bold(" + ") + chalk.bgGray(` ${out('', true)} `));
                }

                console.log("");
                download.startAll();
            } else {
                console.error(chalk.red.bold("error: ") + data.error);
            }
        });
}