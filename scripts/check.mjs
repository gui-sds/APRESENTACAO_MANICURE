import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
for (const file of ["app.js", "config.js", "server.js"])
  execFileSync(process.execPath, ["--check", file]);
const html = readFileSync("index.html", "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length)
  throw new Error("IDs duplicados no HTML.");
for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (ref.startsWith("https:")) continue;
  if (ref.startsWith("#")) {
    if (!ids.includes(ref.slice(1))) throw new Error(`Âncora ausente: ${ref}`);
  } else if (!existsSync(ref)) throw new Error(`Arquivo ausente: ${ref}`);
}
console.log("JavaScript, arquivos e âncoras: OK.");
