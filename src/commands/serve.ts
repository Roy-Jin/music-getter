import { createApp } from "../server.js";
import { serve as serveHono } from "@hono/node-server";
import { styleText } from "node:util";
import type { Command } from "commander";

export function serve(cmd: Command) {
    cmd
        .command("serve")
        .description("Start a server")
        .option("-p, --port <port>", "port to listen on", "3000")
        .option("-h, --host <host>", "host to bind to", "0.0.0.0")
        .option("--logger", "enable logger", false)
        .action(
            async (
                options: { port: string; host: string; logger: boolean },
            ) => {
                const port = Number(options.port);
                const host = options.host;

                serveHono({
                    fetch: createApp({ logger: options.logger }).fetch,
                    port,
                    hostname: host,
                }, (info) => {
                    console.log(
                        `${
                            styleText("bold", cmd.name().toUpperCase())
                        } server starting on ${
                            styleText(
                                "underline",
                                `http://localhost:${info.port}`,
                            )
                        }`,
                    );
                });
            },
        );
}
