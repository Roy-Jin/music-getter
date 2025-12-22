import { createWriteStream } from "node:fs";
import { progress } from "@progress";
import * as path from "@path";
import chalk from "@chalk";

interface DownloadTask {
  url: string | (() => Promise<string>);
  output: string;
  start: (index: number) => Promise<void>;
  index: number;
}

interface ProgressOptions {
  total: number;
  color?: {
    terminated: unknown;
    error: unknown;
  };
  shape?: {
    bar: {
      start: string;
      end: string;
      completed: string;
      pending: string;
      color: unknown;
    };
  };
  initialValues: {
    title: string;
    count: string;
    total: string;
    percent: string;
  };
}

interface Progress {
  next: (
    percent: number,
    options: { count: number; total: number; percent: string },
  ) => void;
  error: () => void;
  update: (
    percent: number,
    options: { title: string; count?: string | number; total?: string; percent?: string },
  ) => void;
  _?: {
    count: number;
    total: number;
  };
}

const download = {
  stack: [] as DownloadTask[],
  count: 0,
  total: 0,
  p: null as Progress | null,
  /**
   * Add a download task to the stack
   * @param {string|function} url - Download URL
   * @param {*} output - Output directory
   */
  add: (url: string | (() => Promise<string>), output: string) => {
    const start = async (index: number) => {
      let resolvedUrl = url;
      if (typeof url === "function") resolvedUrl = await url();
      const response = await fetch(resolvedUrl as string);
      if (!response.body) return;
      const reader = response.body.getReader();
      const total = +(response.headers.get("content-length") ?? 0);
      const writer = createWriteStream(output, { flag: "w" });

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          writer.end();
          reader.releaseLock();
          break;
        }
        if (!download.p || !download.p._) continue;
        download.p.next(value.length / total * 100, {
          count: index,
          total: download.stack.length,
          percent: Math.floor(download.p._.count / download.p._.total * 100)
            .toString().padStart(2, "0"),
        });
        writer.write(value);
      }
    };
    download.stack.push({ url, output, start, index: download.stack.length });
  },
  /**
   * Start all download tasks in the stack
   */
  startAll: async () => {
    download.p = progress(
      ` @ {{title}}\n {{percent}}% [[bar]] => [{{count}}/{{total}}] [[eta]]\n`,
      {
        total: 100,
        color: {
          terminated: chalk.blue.bold,
          error: chalk.red,
        },
        shape: {
          bar: {
            start: "[",
            end: "]",
            completed: "█",
            pending: "-",
            color: chalk.blue,
          },
        },
        initialValues: {
          title: "######",
          count: "0",
          total: "0",
          percent: "0",
        },
      },
    );
    download.p.error();
    for (const task of download.stack) {
      download.p.update(0, { title: path.parse(task.output).name });
      await task.start(task.index);
    }
    download.p.update(100, {
      title: "All finished.",
      count: download.stack.length,
    });
  },
};

export default download;
