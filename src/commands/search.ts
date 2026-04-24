import Meting from '../core/meting';
import chalk from 'chalk';
import { Command } from 'commander';

interface MusicItem {
  id: string;
  name: string;
  artist: string[];
  album: string;
  pic_id: string;
  pic: string;
  url_id: string;
  lyric_id: string;
  lrc: string;
  source: string;
}

export default function search(program: Command) {
  program
    .command('search <search-term>')
    .description('Search song resource.')
    .option('-s, --server <source...>', 'Specify music platform.', ['netease'])
    .option('-a, --api <url>', 'Specify API endpoint.')
    .option('-t, --type <type>', 'Search type.', '1')
    .option('-p, --page <page>', 'Page number.', '1')
    .option('-l, --limit <limit>', 'Number of results per page.', '30')
    .action(async (searchTerm: string, options) => {
      const { server, type, page, limit, api } = options;

      try {
        const results = await Promise.all(server.map(async (srv: string) => {
          const meting = new Meting(srv);
          meting.format(true);
          if (api) {
            meting.api(api);
          }
          const result = await meting.search(searchTerm, {
            type: parseInt(type, 10),
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
          });
          return JSON.parse(result) as MusicItem[];
        }));

        const data = results.flat();

        if (!data || data.length === 0) {
          console.error(chalk.red.bold('error: ') + 'No results found.');
          return;
        }

        for (const music of data) {
          console.log(
            chalk.blue.bold(` ${music.source}|${music.id} \t`) +
            chalk.bgGray.bold(` ${music.name} `) +
            chalk.gray(` ${music.artist.join(', ')} `)
          );
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(chalk.red.bold('error: ') + errorMessage);
      }
    });
}