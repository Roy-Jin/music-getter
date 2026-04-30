import Meting from "../core/meting";
import download from "../core/download";
import { sanitize } from "../core/util";
import * as path from "path";
import { mkdirSync } from "fs";
import chalk from "chalk";
import { Command } from "commander";

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

function appendUrlParam(
  urlStr: string,
  key: string,
  value: string | number,
): string {
  try {
    const urlObj = new URL(urlStr);
    urlObj.searchParams.set(key, String(value));
    return urlObj.toString();
  } catch {
    return urlStr;
  }
}

function parseMusicUrl(music: MusicItem, bitrate: number = 320): string {
  const urlId = music.url_id;
  if (urlId) {
    try {
      const urlObj = new URL(urlId);
      if (
        urlObj.searchParams.has("type") &&
        urlObj.searchParams.get("type") === "url"
      ) {
        return urlId;
      }
    } catch {
      // not a valid URL, fall through
    }
  }
  return appendUrlParam(
    appendUrlParam(
      appendUrlParam(
        appendUrlParam(Meting.api, "server", music.source),
        "type",
        "url",
      ),
      "id",
      music.id,
    ),
    "br",
    bitrate,
  );
}

export default function song(program: Command) {
  program
    .command("song <song-id>")
    .description("Get single song resource.")
    .option("-l, --lyric", "Include lyrics file.")
    .option("-c, --cover [size]", "Include cover image.")
    .option("-o, --output <path>", "Custom output directory.", "./")
    .option("-s, --server <source>", "Specify music platform.", "netease")
    .option("-a, --api <url>", "Specify API endpoint.")
    .option(
      "-b, --bitrate <bitrate>",
      "Specify music bitrate (128, 192, 320).",
      "128",
    )
    .action(async (songId: string, options) => {
      const { lyric, cover, server, output, api, bitrate } = options;
      const meting = new Meting(server);
      meting.format(true);
      if (api) {
        meting.api(api);
      }

      const bitrateNum = parseInt(bitrate as string, 10);

      try {
        const dataStr = await meting.song(songId);
        const data: MusicItem[] = JSON.parse(dataStr);

        if (!data || data.length === 0) {
          console.error(chalk.red.bold("error: ") + "No song found.");
          return;
        }

        const outputDir = path.normalize(path.join(process.cwd(), output, "/"));
        mkdirSync(outputDir, { recursive: true });

        for (const music of data) {
          const out = (ext: string, isname?: boolean) => {
            let combineName = sanitize(`${music.name}-${music.artist}`);
            if (combineName.length > 57) {
              combineName = combineName.slice(0, 56) + "…";
            }
            if (isname) return combineName;
            return path.join(outputDir, combineName + (ext ? "." + ext : ""));
          };

          if (cover) {
            const coverSize = cover === "true" || cover === true
              ? 300
              : parseInt(cover as string, 10);
            if (music.pic) {
              const picUrl = appendUrlParam(music.pic, "cover", coverSize);
              download.add(picUrl, out("png"));
            }
          }

          if (lyric) {
            if (music.lrc) {
              download.add(music.lrc, out("lrc"));
            } else {
              const lrcStr = await meting.lyric(music.lyric_id);
              const lrcData = JSON.parse(lrcStr);
              if (lrcData && lrcData[0] && lrcData[0].url) {
                download.add(lrcData[0].url, out("lrc"));
              }
            }
          }

          const musicUrl = parseMusicUrl(music, bitrateNum);
          download.add(musicUrl, out("mp3"));

          console.log(
            chalk.bgGreen.bold(" + ") + chalk.bgGray(` ${out("", true)} `),
          );
        }

        console.log("");
        download.startAll();
      } catch (error) {
        const errorMessage = error instanceof Error
          ? error.message
          : String(error);
        console.error(chalk.red.bold("error: ") + errorMessage);
      }
    });
}
