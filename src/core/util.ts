function sanitize(filename: string): string {
    let processed = filename.replace(
        /^(.+?)-([^/\\:*?"<>|\x00-\x1f]+(?:\/[^/\\:*?"<>|\x00-\x1f]+)+)/,
        (match, title, artists) => {
            const normalizedArtists = artists.replace(/\//g, "、");
            return title + "-" + normalizedArtists;
        },
    );

    const illegalChars = /[<>:"/\\|?*\x00-\x1f]/g;
    let cleaned = processed.replace(illegalChars, "_");

    cleaned = cleaned.replace(/\s+/g, " ").trim();

    return cleaned || "untitled";
}

export { sanitize };
