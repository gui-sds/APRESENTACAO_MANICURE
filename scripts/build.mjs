import { mkdirSync, copyFileSync, cpSync } from "node:fs";
import { execFileSync } from "node:child_process";
execFileSync(process.execPath, ["scripts/check.mjs"], { stdio: "inherit" });
mkdirSync("dist", { recursive: true });
for (const file of ["index.html", "style.css", "config.js", "app.js"])
  copyFileSync(file, `dist/${file}`);
cpSync("assets", "dist/assets", { recursive: true });
console.log("Site estático pronto em dist/.");
