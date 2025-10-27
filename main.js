import { init, command } from "@/program";
import chalk from "@chalk";

init({
    name: "music-getter",
    version: "0.0.1",
    description: "A Music Resource Acquisition Tool.",
    metas: {
        "Author": chalk.bgGreen(" Roy-Jin. "),
        "Github": chalk.underline("https://github.com/Roy-Jin/music-getter"),
        "Supported source": chalk.green("netease, tencent, kugou"),
    }
})

if (Deno.args.length) {
    command.parse(Deno.args);
} else {
    command.showHelp();
}