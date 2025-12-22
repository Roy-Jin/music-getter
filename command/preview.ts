import meting from "@/meting.ts";
import chalk from "@chalk";
import { Command } from "@command";

export default function preview(_com: Command) {
  _com
    .command("preview <keyword>")
    .description("Open the web to preview music.")
    .option("-s, --server <source>", "Specify music platform.", {
      default: "netease"
    })
    .action(async (options, keyword: string) => {
      const { server } = options;

      const data = await meting({
        server: server,
        type: 'song',
        id: keyword
      });

      if (!data || !data.find(item => item.error)) {
        Deno.serve({
          port: 9264,
          handler: () => {
            setTimeout(() => { Deno.exit(0) }, 3000);
            return new Response(null, {
              status: 302,
              headers: {
                location: data[0].url
              }
            });
          },
          onListen: () => console.log(`Preview music: ${data[0].url}`)
        });
        const openBrowser = async (url: string) => {
          const command = {
            windows: ["cmd", "/c", "start", url],
            darwin: ["open", url],
            linux: ["xdg-open", url],
          };

          const platform = Deno.build.os as "windows" | "darwin" | "linux";
          const cmd = command[platform];

          if (cmd) {
            const process = new Deno.Command(cmd[0], {
              args: cmd.slice(1),
            });

            const { code } = await process.output();
            if (code !== 0) {
              console.error(chalk.red.bold(`Failed to open ${data[0].url} in the default browser.`));
              Deno.exit(1);
            }
          }
        };
        openBrowser("http://localhost:9264");
      } else {
        const errorData = data.find(item => item.error);
        console.error(chalk.red.bold("error: ") + (errorData ? errorData.error : 'Unknown error'));
      }
    });
}