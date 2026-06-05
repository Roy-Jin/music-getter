# Best Practices

## Batch Downloading

When downloading multiple songs, you can pass multiple IDs to a single command:

```bash
# Download multiple songs at once
ncmget song 3374579108 111111 222222

# Download multiple albums
ncmget album 11111 22222 33333
```

This is more efficient than running separate commands for each ID, as the download manager handles queuing and progress tracking.

## Output Organization

Use the format template to organize files into directories:

```bash
# Organize by album
ncmget album 372893716 -f "{album}/{name}"

# Organize by artist
ncmget song 3374579108 -f "{artist}/{album}/{name}"
```

Combine with the output directory option:

```bash
ncmget album 372893716 -o ~/Music -f "{artist}/{album}/{name}"
```

## Combine Search with Download

Use the search command to find IDs, then download them:

```bash
# Step 1: Search
ncmget search "淘气的Roy"

# Step 2: Download the results you want
ncmget song 3374579108 111111
```

## Use Info Before Downloading

Before downloading a large album or playlist, use the `info` command to preview its contents:

```bash
# Preview album contents
ncmget info album 372893716

# Then download if it looks good
ncmget album 372893716 -o ~/Music
```

This helps avoid downloading content you don't want.

## Handling Copyright-Restricted Songs

Some songs may be unavailable due to copyright restrictions. When this happens:

- NCMGET displays an error message in red for the affected song
- The download continues to the next song in the queue
- You can try using a cookie for authenticated access, which may unlock some restricted content:

```bash
# Set cookie via environment or use the HTTP server with a Cookie header
ncmget serve -p 3000

# Then make requests with the cookie header
curl -H "Cookie: MUSIC_U=xxx" http://localhost:3000/url?id=3374579108&br=999
```

## Download Lyrics and Covers Together

For a complete music library, download lyrics and covers alongside songs:

```bash
# Download song, lyrics, and cover
ncmget song 3374579108 -o ~/Music
ncmget lrc 3374579108 -o ~/Music/Lyrics
ncmget pic 3374579108 -o ~/Music/Covers -s 800
```

## Updating NCMGET

Keep NCMGET up to date for bug fixes and new features:

```bash
npm update -g ncmget
```

Check the current version:

```bash
ncmget -v
```

## Related

- [Introduction](./introduction) — Command overview
- [Filename Format](./filename-format) — Customize output filenames
- [Advanced Usage](/core/advanced) — Cookie and error handling
