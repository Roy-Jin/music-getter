import { init, command } from "@/program.js";
import chalk from "@chalk";

init({
    name: "music-getter",
    version: "0.0.2",
    description: "A music resource acquisition tool that runs in the command line.",
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