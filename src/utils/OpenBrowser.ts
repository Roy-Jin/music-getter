import { styleText } from "node:util";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export function openBrowser(url: string): Promise<void> {
    let parsedUrl: URL;
    try {
        parsedUrl = new URL(url);
    } catch {
        console.error(styleText(["bold", "red"], "Invalid URL."));
        process.exit(1);
    }

    if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
    ) {
        console.error(
            styleText(["bold", "red"], "Only http/https URLs are allowed."),
        );
        process.exit(1);
    }

    const safeUrl = parsedUrl.toString();
    const platform = process.platform;
    let command: string;

    switch (platform) {
        case "win32":
            command = `start "" "${safeUrl.replace(/"/g, "")}"`;
            break;
        case "darwin":
            command = `open "${safeUrl.replace(/"/g, "")}"`;
            break;
        default:
            command = `xdg-open "${safeUrl.replace(/"/g, "")}"`;
    }

    return execAsync(command).then(() => {}).catch(() => {
        console.error(
            styleText(
                ["bold", "red"],
                "Failed to open URL in the default browser.",
            ),
        );
        process.exit(1);
    });
}
