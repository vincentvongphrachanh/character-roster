// Generates clearly-labeled placeholder SVGs for the /illustrations page.
// Run with: node scripts/generate-illustration-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, "..", "public", "illustrations");
mkdirSync(DIR, { recursive: true });

const items = [
  { id: "il1", c1: "#cdbfae", c2: "#8a7259" },
  { id: "il2", c1: "#a9b7c2", c2: "#5c7488" },
  { id: "il3", c1: "#b9a8bd", c2: "#6d5678" },
  { id: "il4", c1: "#b7c4b0", c2: "#5c7255" },
  { id: "il5", c1: "#c9a89a", c2: "#8a4f3d" },
  { id: "il6", c1: "#b8b3ad", c2: "#615c56" },
];

function svg(c1, c2, id) {
  return `<svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
  <rect width="600" height="800" fill="url(#g${id})"/>
  <circle cx="300" cy="330" r="150" fill="${c1}" opacity="0.35"/>
  <path d="M60 620 Q300 500 540 620 L540 800 L60 800 Z" fill="${c2}" opacity="0.5"/>
  <text x="300" y="760" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#ffffff" opacity="0.75">PLACEHOLDER ARTWORK</text>
</svg>`;
}

for (const it of items) {
  writeFileSync(path.join(DIR, `${it.id}.svg`), svg(it.c1, it.c2, it.id));
  console.log("wrote", it.id);
}
