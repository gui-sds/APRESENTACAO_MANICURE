import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ttf": "font/ttf",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const relative =
      pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    if (
      relative.split(/[\\/]/).some((part) => part.startsWith(".")) ||
      (!["index.html", "style.css", "config.js", "app.js"].includes(relative) &&
        !relative.startsWith("assets/"))
    ) {
      res.writeHead(404).end("Not found");
      return;
    }
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(Number(process.env.PORT) || 3000, "127.0.0.1", () =>
  console.log(`Local: http://localhost:${process.env.PORT || 3000}`),
);
