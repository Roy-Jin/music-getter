# Installation

## Requirements

- **Node.js** >= 20.0.0
- **npm** (comes with Node.js) or **pnpm**

## Global Installation

Install globally via npm to use the `music-getter` or `mg` command from anywhere:

```sh
npm install -g music-getter
```

Verify the installation:

```sh
mg --version
```

## Use Without Installing

If you prefer not to install globally, you can use `npx` to run it directly:

```sh
npx music-getter --help
```

## Build from Source

If you want to use the latest development version or modify the code yourself, clone the repository and build:

```sh
git clone https://github.com/Roy-Jin/music-getter.git
cd music-getter
npm install
npm run build
```

After building, you can run it with:

```sh
node dist/bin/cli.js --help
```

Or link it globally:

```sh
npm link
mg --help
```

## Development Mode

During development, you can use `tsx` to run TypeScript source directly without recompiling after each change:

```sh
npm run dev -- --help
```

## Verify Installation

Run the following command to see the help information and confirm successful installation:

```sh
mg --help
```

You should see output similar to:

```
Usage: music-getter <command> [options]

Commands:
  song <song-id>         Get single song resource.
  playlist <playlist-id> Get the entire playlist resource.
  list|ls <resource-id>  List resources from a specific type.
  search <search-term>   Search song resource.
  preview <song-id>      Open the web to preview music.

Options:
  -V, --version          output the version number
  -h, --help             display help for command
```

## Next Steps

- Check out [Download Song](/guide/usage/song) to learn how to download a single song
- Check out [Download Playlist](/guide/usage/playlist) to learn about batch downloading
- Check out [Search Music](/guide/usage/search) to learn how to search for songs