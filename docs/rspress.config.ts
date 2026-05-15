import { defineConfig } from "@rspress/core";
import { pluginSitemap } from "@rspress/plugin-sitemap";
import { pluginLlms } from "@rspress/plugin-llms";
import { pluginTwoslash } from "@rspress/plugin-twoslash";

const isDeployWithBase = process.env.DEPLOY_WITH_BASE === "true";

export default defineConfig({
  title: "Music Getter",
  base: isDeployWithBase ? "/music-getter/" : "/",
  icon: "/favicon.webp",
  logo: "/logo.webp",
  logoText: "Music Getter",
  lang: "en",
  locales: [
    {
      lang: "en",
      label: "English",
      title: "Music Getter",
      description:
        "A music resource acquisition tool that supports the Meting API.",
    },
    {
      lang: "zh",
      label: "简体中文",
      title: "Music Getter",
      description: "一个支持 Meting API 的音乐资源获取工具。",
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/Roy-Jin/music-getter",
      },
      {
        icon: "npm",
        mode: "link",
        content: "https://www.npmjs.com/package/music-getter",
      },
    ],
  },
  plugins: [
    pluginSitemap({
      siteUrl: "https://roy-jin.github.io/music-getter/",
    }),
    pluginLlms(),
    pluginTwoslash(),
  ],
});
