#! /usr/bin/env node

import { Command } from "commander";
import { styleText } from "util";
import song from "../commands/song";
import playlist from "../commands/playlist";
import list from "../commands/list";
import search from "../commands/search";
import preview from "../commands/preview";
import packageJson from "../../package.json";

const program = new Command();

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description)
  .addHelpText(
    "before",
    `
${styleText("bold", "Author:")} ${
      styleText("bgGreen", " " + packageJson.author + " ")
    }
${styleText("bold", "Github:")} ${
      styleText("underline", packageJson.repository.url)
    }
${styleText("bold", "Supported source:")} ${
      styleText("green", "netease, tencent")
    }
`,
  );

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
