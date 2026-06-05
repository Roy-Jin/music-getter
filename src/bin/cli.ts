#! /usr/bin/env node

import pkg from "../../package.json" with { type: "json" };
import { styleText } from "node:util";
import { Command } from "commander";
import { serve } from "../commands/serve.js";
import { search } from "../commands/search.js";
import { song } from "../commands/song.js";
import { album } from "../commands/album.js";
import { playlist } from "../commands/playlist.js";
import { lrc } from "../commands/lrc.js";
import { pic } from "../commands/pic.js";
import { info } from "../commands/info.js";
import { preview } from "../commands/preview.js";

const cmd = new Command();

cmd
  .name(pkg.name)
  .version(pkg.version, "-v, --version")
  .description(pkg.description)
  .addHelpText(
    "before",
    `
${styleText("bold", "Author:")} ${styleText("bgGreen", " " + pkg.author + " ")}
${styleText("bold", "Github:")} ${styleText("underline", pkg.repository.url)}
`,
  );

serve(cmd);
search(cmd);
song(cmd);
album(cmd);
playlist(cmd);
lrc(cmd);
pic(cmd);
info(cmd);
preview(cmd);

cmd.parse();
