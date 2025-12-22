import meting from "@/meting.ts";
import download from "@/download.ts";
import * as path from "@path";
import chalk from "@chalk";
import { Command } from "@command";

export default function playlist(_com: Command) {
  _com
    .command("playlist <keyword>")
    .description("Get the entire playlist resource.")
    .option("-l, --lyric ", "Include lyrics for all songs.")
    .option("-c, --cover [size]", "Include cover image for all songs.")
    .option("-o, --output <path>", "Custom output directory.", {
      default: "./"
    })
    .option("-s, --server <source>", "Specify source platform.", {
      default: "netease"
    })
    .action(async (options, keyword: string) => {
      const { lyric, cover, server, output } = options;

      const data = await meting({
        server: server!,
        type: 'playlist',
        id: keyword
      });

      if (!data || !data.find(item => item.error)) {
        const outputDir = path.normalize(`${Deno.cwd()}/${output}/`);
        Deno.mkdirSync(outputDir, { recursive: true });

        for (const music of data) {
          const out = (etx: string, isname?: boolean) => {
            let conbine_name = `${music.title}-${music.author}`;
            if (conbine_name.length > 57) conbine_name = conbine_name.slice(0, 56) + "…";
            if (isname) return conbine_name;
            return path.join(outputDir, conbine_name + (etx ? '.' + etx : ''));
          };

          if (cover) {
            download.add(() => fetch(music.pic, { method: "HEAD" })
              .then(response => response.url)
              .then((PicUrl: string) => {
                const url = new URL(PicUrl);
                if (cover === "trueytrue") { url.search = "" }
                else { url.search = `?param=${cover}y${cover}` };
                return url.href;
              }), out('png'));
          }
          lyric && download.add(music.lrc, out('lrc'));
          download.add(music.url, out('mp3'));
          console.log(chalk.bgBlue.bold(" + ") + chalk.bgGray(` ${out('', true)} `));
        }

        console.log("");
        download.startAll();
      }
      else {
        const errorData = data.find(item => item.error);
        console.error(chalk.red.bold("error: ") + (errorData ? errorData.error : 'Unknown error'));
      }
    });
}