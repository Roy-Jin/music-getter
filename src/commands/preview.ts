import Meting from '../core/meting';
import chalk from 'chalk';
import { Command } from 'commander';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface MusicItem {
  id: string;
  name: string;
  artist: string[];
  album: string;
  pic_id: string;
  url_id: string;
  lyric_id: string;
  source: string;
}

export default function preview(program: Command) {
  program
    .command('preview <song-id>')
    .description('Open the web to preview music.')
    .option('-s, --server <source>', 'Specify music platform.', 'netease')
    .option('-a, --api <url>', 'Specify API endpoint.')
    .action(async (songId: string, options) => {
      const { server, api } = options;
      const meting = new Meting(server);
      meting.format(true);
      if (api) {
        meting.api(api);
      }

      try {
        const dataStr = await meting.song(songId);
        const data: MusicItem[] = JSON.parse(dataStr);

        if (!data || data.length === 0) {
          console.error(chalk.red.bold('error: ') + 'No song found.');
          return;
        }

        const music = data[0];
        const musicUrl = music.url_id;

        if (!musicUrl) {
          console.error(chalk.red.bold('error: ') + 'No streaming URL available.');
          return;
        }

        console.log(chalk.green.bold('Opening: ') + `${music.name} - ${music.artist.join(', ')}`);

        const openBrowser = async (url: string) => {
          let parsedUrl: URL;
          try {
            parsedUrl = new URL(url);
          } catch {
            console.error(chalk.red.bold('Invalid URL.'));
            process.exit(1);
            return;
          }

          if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
            console.error(chalk.red.bold('Only http/https URLs are allowed.'));
            process.exit(1);
          }

          const safeUrl = parsedUrl.toString();
          const platform = process.platform;
          let command: string;

          switch (platform) {
            case 'win32':
              command = `start "" "${safeUrl.replace(/"/g, '')}"`;
              break;
            case 'darwin':
              command = `open "${safeUrl.replace(/"/g, '')}"`;
              break;
            default:
              command = `xdg-open "${safeUrl.replace(/"/g, '')}"`;
          }

          try {
            await execAsync(command);
          } catch (error) {
            console.error(chalk.red.bold(`Failed to open URL in the default browser.`));
            process.exit(1);
          }
        };

        openBrowser(musicUrl);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(chalk.red.bold('error: ') + errorMessage);
      }
    });
}