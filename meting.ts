import chalk from "@chalk";

interface MetingOptions {
  server: string;
  type: string;
  id: string | null;
}

interface Music {
  url: string;
  title: string;
  author: string;
  pic: string;
  lrc: string;
  [key: string]: unknown;
}

interface MusicResponse {
  url: string;
  title: string;
  author: string;
  pic: string;
  lrc: string;
  error?: string;
  [key: string]: unknown;
}

export default async function meting(
  _: MetingOptions,
): Promise<MusicResponse[]> {
  const api = new URL("https://api.i-meto.com/meting/api");

  api.searchParams.set("server", _.server);
  api.searchParams.set("type", _.type);
  api.searchParams.set("id", _.id ? `${_.id}` : "");

  const data = await fetch(api.href)
    .then(async (res) => {
      const _error = (text: string) =>
        console.log(`${chalk.red("error: ")}${text}`);
      if (res.ok) {
        const data = await res.json();
        if (data[0] && ("url" in data[0]) && !data[0].title) {
          _error(`Server [${chalk.yellow(_.server)}] is not supported.`);
          return [];
        }
        return data;
      } else {
        const text = await res.text();
        if (text.includes("server")) {
          _error(`Server [${chalk.yellow(_.server)}] is not supported.`);
        } else if (text.includes("API")) {
          _error(`The server api is busy, please try again later.`);
        } else {
          console.log(`${chalk.red("error: ")}${text}`);
        }
        return [];
      }
    });

  return data?.map((music: Music) => {
    music.server = _.server;
    music.id = new URL(music.url).searchParams.get("id");
    music.author = music.author.split(" / ").join(",");
    music.title = music.title.replace(/[\\/:*?"<>|]/g, "_");
    return music;
  });
}
