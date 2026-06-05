import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { NCMGET } from "./core/index.js";

type Variables = {
  ncmget: NCMGET;
};

export function createApp(options?: { logger?: boolean }) {
  const app = new Hono<{ Variables: Variables }>();

  app.use(cors());
  app.use(
    "/favicon.ico",
    async (c) => {
      return c.redirect("https://ncmget.pages.dev/favicon.webp");
    },
  );
  if (options?.logger) {
    app.use(logger());
  }
  app.use("*", async (c, next) => {
    const ncmget = new NCMGET();
    const cookie = c.req.header("Cookie");
    const raw = c.req.queries().raw;
    if (cookie) ncmget.cookie(cookie);
    if (raw) ncmget.format(false);
    c.set("ncmget", ncmget);
    await next();
  });

  app.all("/search", async (c) => {
    const keyword = c.req.query("keyword");
    if (!keyword) {
      return c.json({ error: "keyword is required" }, 400);
    }
    const type = c.req.query("type");
    const limit = c.req.query("limit");
    const page = c.req.query("page");

    const ncmget = c.get("ncmget");
    const option: Record<string, number> = {};
    if (type) option.type = Number(type);
    if (limit) option.limit = Number(limit);
    if (page) option.page = Number(page);

    const result = await ncmget.search(keyword, option);
    return c.json(JSON.parse(result));
  });

  app.all("/song", async (c) => {
    const id = c.req.query("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const ncmget = c.get("ncmget");
    const result = await ncmget.song(id);
    return c.json(JSON.parse(result));
  });

  app.all("/album", async (c) => {
    const id = c.req.query("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const ncmget = c.get("ncmget");
    const result = await ncmget.album(id);
    return c.json(JSON.parse(result));
  });

  app.all("/artist", async (c) => {
    const id = c.req.query("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const limit = c.req.query("limit");
    const ncmget = c.get("ncmget");
    const result = await ncmget.artist(id, limit ? Number(limit) : 50);
    return c.json(JSON.parse(result));
  });

  app.all("/playlist", async (c) => {
    const id = c.req.query("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const ncmget = c.get("ncmget");
    const result = await ncmget.playlist(id);
    return c.json(JSON.parse(result));
  });

  app.all("/url", async (c) => {
    const id = c.req.query("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const br = c.req.query("br");
    const ncmget = c.get("ncmget");
    const result = await ncmget.url(id, br ? Number(br) : 320);
    return c.json(JSON.parse(result));
  });

  app.all("/lrc", async (c) => {
    const id = c.req.query("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const ncmget = c.get("ncmget");
    const result = await ncmget.lrc(id);
    return c.json(JSON.parse(result));
  });

  app.all("/pic", async (c) => {
    const id = c.req.query("id");
    if (!id) {
      return c.json({ error: "id is required" }, 400);
    }
    const size = c.req.query("size");
    const ncmget = c.get("ncmget");
    const result = await ncmget.pic(id, size ? Number(size) : 300);
    return c.json(JSON.parse(result));
  });

  app.all("", (c) => {
    const routes = app.routes
      .filter((r) => !["/favicon.ico", "/*", "/"].includes(r.path))
      .map((r) => `${r.method}\t${r.path}`);
    return c.text(routes.join("\n"));
  });

  return app;
}
