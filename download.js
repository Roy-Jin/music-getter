import { createWriteStream } from "node:fs";
import { progress } from "@progress";
import * as path from "@path";
import chalk from "@chalk";

const download = {
    stack: [],
    count: 0,
    total: 0,
    p: null,
    /**
     * Add a download task to the stack
     * @param {string|function} url - Download URL
     * @param {*} output - Output directory
     */
    add: async (url, output) => {
        const start = async (index) => {
            if (typeof url == "function") url = await url();
            const response = await fetch(url);
            const reader = response.body.getReader();
            const total = +(response.headers.get('content-length') ?? 0);
            const writer = createWriteStream(output, { flag: 'w' });

            while (true) {
                const { value, done } = await reader.read();
                if (done) { writer.end(); reader.releaseLock(); break; };
                download.p.next(value.length / total * 100, { count: index, total: download.stack.length, percent: Math.floor(download.p._.count / download.p._.total * 100).toString().padStart(2, '0') });
                writer.write(value);
            };
        }
        download.stack.push({ url, output, start, index: download.stack.length });
    },
    /**
     * Start all download tasks in the stack
     */
    startAll: async () => {
        download.p = progress(` @ {{title}}\n {{percent}}% [[bar]] => [{{count}}/{{total}}] [[eta]]\n`, {
            total: 100,
            color: {
                terminated: chalk.blue.bold,
                error: chalk.red,
            },
            shape: {
                bar: {
                    start: '[',
                    end: ']',
                    completed: '█',
                    pending: '-',
                    color: chalk.blue,
                },
            },
            initialValues: {
                title: "######",
                count: "0",
                total: "0",
                percent: "0",
            }
        });
        download.p.error();
        for (const task of download.stack) {
            download.p.update(0, { title: path.parse(task.output).name });
            await task.start(task.index);
        };
        download.p.update(100, { title: "All finished.", count: download.stack.length });
    }
}

export default download;