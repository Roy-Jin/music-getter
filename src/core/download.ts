import { createWriteStream, mkdirSync } from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { SingleBar, Presets } from 'cli-progress';

function sanitizeFilename(filename: string): string {
  const illegalChars = /[<>:"/\\|?*\x00-\x1f]/g;
  const trimmed = filename.replace(illegalChars, '_');
  const normalized = trimmed.replace(/\s+/g, ' ').trim();
  return normalized || 'untitled';
}

interface DownloadTask {
  url: string | (() => Promise<string>);
  output: string;
  start: (index: number) => Promise<void>;
  index: number;
}

class DownloadManager {
  private stack: DownloadTask[] = [];
  private total: number = 0;

  add(url: string | (() => Promise<string>), output: string): void {
    const index = this.stack.length;
    const dir = path.dirname(output);
    const ext = path.extname(output);
    const basename = path.basename(output, ext);
    const sanitizedBasename = sanitizeFilename(basename);
    const sanitizedOutput = path.join(dir, sanitizedBasename + ext);

    const start = async (taskIndex: number): Promise<void> => {
      let resolvedUrl = url;
      if (typeof url === 'function') {
        resolvedUrl = await url();
      }

      try {
        const response = await fetch(resolvedUrl as string);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (!response.body) {
          throw new Error('Response body is null');
        }

        const total = +(response.headers.get('content-length') ?? 0);
        mkdirSync(dir, { recursive: true });

        const writer = createWriteStream(sanitizedOutput, { flags: 'w' });
        const progressBar = new SingleBar({
          format: ' {bar} {percentage}% | {value}/{total} bytes | ETA: {eta_formatted}',
          barCompleteChar: '\u2588',
          barIncompleteChar: '\u2591',
          hideCursor: true
        }, Presets.shades_classic);

        if (total > 0) {
          progressBar.start(total, 0);
        }

        let downloaded = 0;
        const reader = response.body.getReader();

        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            writer.end();
            reader.releaseLock();
            if (total > 0) {
              progressBar.stop();
            }
            break;
          }
          downloaded += value.length;
          if (total > 0) {
            progressBar.update(downloaded);
          }
          writer.write(value);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log(chalk.red(`Failed to download: ${resolvedUrl}`));
        console.log(chalk.red(`Error: ${errorMessage}`));
        throw error;
      }
    };

    this.stack.push({ url, output: sanitizedOutput, start, index });
    this.total++;
  }

  async startAll(): Promise<void> {
    for (const [index, task] of this.stack.entries()) {
      console.log(chalk.blue.bold(`\nDownloading ${index + 1}/${this.stack.length}:`));
      console.log(chalk.gray(`  File: ${path.basename(task.output)}`));
      await task.start(task.index);
    }
    console.log(chalk.green.bold('\nAll downloads finished!'));
  }

  clear(): void {
    this.stack = [];
    this.total = 0;
  }

  getCount(): number {
    return this.stack.length;
  }
}

const download = new DownloadManager();

export default download;