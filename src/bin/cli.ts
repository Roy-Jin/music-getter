#! /usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import song from '../commands/song';
import playlist from '../commands/playlist';
import list from '../commands/list';
import search from '../commands/search';
import preview from '../commands/preview';
import packageJson from '../../package.json';

const program = new Command();

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description)
  .addHelpText('before', `
${chalk.bold('Author:')} ${chalk.bgGreen(' ' + packageJson.author + ' ')}
${chalk.bold('Github:')} ${chalk.underline('https://github.com/Roy-Jin/music-getter')}
${chalk.bold('Supported source:')} ${chalk.green('netease, tencent')}
`);

song(program);
playlist(program);
list(program);
search(program);
preview(program);

if (process.argv.length <= 2) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}