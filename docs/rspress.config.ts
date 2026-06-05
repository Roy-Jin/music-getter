import { defineConfig } from "@rspress/core";
import { pluginSitemap } from "@rspress/plugin-sitemap";
import { pluginLlms } from "@rspress/plugin-llms";

const isDeployWithBase = process.env.DEPLOY_WITH_BASE === "true";

export default defineConfig({
  title: "NCMGET",
  base: isDeployWithBase ? "/ncmget/" : "/",
  icon: "/favicon.webp",
  logo: "/logo.webp",
  logoText: "NCMGET",
  lang: "en",
  locales: [
    {
      lang: "en",
      label: "English",
      title: "NCMGET - NetEase Cloud Music Getter",
      description:
        "A lightweight and powerful cli tool for NetEase Cloud Music.",
    },
    {
      lang: "zh",
      label: "简体中文",
      title: "NCMGET - 网易云音乐获取工具",
      description: "一个轻量且强大的网易云音乐命令行工具。",
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/Roy-Jin/ncmget",
      },
      {
        icon: "npm",
        mode: "link",
        content: "https://www.npmjs.com/package/ncmget",
      },
    ],
    footer: {
      message: "© 2026-present, Roy-Jin.",
    }
  },
  plugins: [
    pluginSitemap({
      siteUrl: "https://roy-jin.github.io/ncmget/",
    }),
    pluginLlms(),
  ],
});
