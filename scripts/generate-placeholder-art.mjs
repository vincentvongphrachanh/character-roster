// Generates clearly-labeled placeholder SVG artwork into /public/characters/<slug>/
// Run with: node scripts/generate-placeholder-art.mjs
// Safe to delete once real artwork has replaced every path in lib/characters.ts.

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public", "characters");

const roster = [
  { slug: "kestrel-vane", c1: "#e2a15b", c2: "#7a4322", c3: "#3a2013", eye: "#1c1108", mode: "full-body",
    gallery: { final: 2, outfit: 1, concept: 2 } },
  { slug: "ondine-marchetti", c1: "#5fd0d6", c2: "#0d4a55", c3: "#082630", eye: "#062028", mode: "full-body",
    gallery: { final: 3, turn: 3, expr: 2 } },
  { slug: "sable-ferro", c1: "#c48fe0", c2: "#4a1c5a", c3: "#200d27", eye: "#0f0713", mode: "bust",
    gallery: { final: 1, detail: 2 } },
  { slug: "juno-halcyon", c1: "#e065c9", c2: "#5c1a6b", c3: "#180a24", eye: "#0e0616", mode: "full-body",
    gallery: { final: 2, outfit: 1, turn: 3, concept: 1 } },
  { slug: "percival-doyle", c1: "#c9a24b", c2: "#26401b", c3: "#0f1a0b", eye: "#0a0f07", mode: "portrait",
    gallery: { final: 1, expr: 3 } },
  { slug: "rhea-solheim", c1: "#dce9ee", c2: "#4a6470", c3: "#101820", eye: "#0a1216", mode: "full-body",
    gallery: { final: 2, outfit: 2, detail: 1 } },
];

function figureSvg({ id, mode, c1, c2, c3, eye, label }) {
  if (mode === "portrait" || mode === "bust") {
    return `<svg viewBox="0 0 520 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
  <ellipse cx="260" cy="560" rx="190" ry="120" fill="${c3}" opacity="0.9"/>
  <path d="M260 60 C 150 60 110 170 130 280 C 145 360 190 420 200 470 L320 470 C330 420 375 360 390 280 C 410 170 370 60 260 60 Z" fill="url(#g${id})"/>
  <circle cx="200" cy="250" r="10" fill="${eye}"/>
  <circle cx="320" cy="250" r="10" fill="${eye}"/>
  <text x="260" y="600" text-anchor="middle" font-family="sans-serif" font-size="13" fill="${eye}" opacity="0.55">PLACEHOLDER ARTWORK</text>
</svg>`;
  }
  return `<svg viewBox="0 0 520 760" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs><linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
  <ellipse cx="260" cy="700" rx="150" ry="34" fill="${c3}" opacity="0.55"/>
  <path d="M260 40 C 205 40 180 90 185 135 C 188 160 205 175 205 190 L165 220 C 90 260 70 340 78 430 L110 720 L200 720 L215 430 L260 400 L305 430 L320 720 L410 720 L442 430 C 450 340 430 260 355 220 L315 190 C 315 175 332 160 335 135 C 340 90 315 40 260 40 Z" fill="url(#g${id})"/>
  <circle cx="238" cy="130" r="7" fill="${eye}"/>
  <circle cx="282" cy="130" r="7" fill="${eye}"/>
  <text x="260" y="748" text-anchor="middle" font-family="sans-serif" font-size="13" fill="${eye}" opacity="0.55">PLACEHOLDER ARTWORK</text>
</svg>`;
}

function tileSvg(id, c1, c2) {
  return `<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="260" fill="${c1}"/>
  <path d="M20,80 L50,20 L80,80 Z" transform="translate(40,80) scale(1.6)" fill="${c2}" opacity="0.85"/>
  <text x="100" y="240" text-anchor="middle" font-family="sans-serif" font-size="10" fill="${c1}" opacity="0.7">PLACEHOLDER</text>
</svg>`;
}

for (const char of roster) {
  const dir = path.join(PUBLIC_DIR, char.slug);
  mkdirSync(dir, { recursive: true });

  writeFileSync(
    path.join(dir, "main.svg"),
    figureSvg({ id: "main-" + char.slug, mode: char.mode, c1: char.c1, c2: char.c2, c3: char.c3, eye: char.eye, label: char.slug + " main artwork placeholder" })
  );
  writeFileSync(
    path.join(dir, "thumbnail.svg"),
    figureSvg({ id: "thumb-" + char.slug, mode: "bust", c1: char.c1, c2: char.c2, c3: char.c3, eye: char.eye, label: char.slug + " thumbnail placeholder" })
  );

  const categoryPrefix = { final: "final", outfit: "outfit", turn: "turn", expr: "expr", concept: "concept", detail: "detail" };
  for (const [key, count] of Object.entries(char.gallery)) {
    for (let i = 1; i <= count; i++) {
      writeFileSync(
        path.join(dir, `${categoryPrefix[key]}-${i}.svg`),
        tileSvg(`${char.slug}-${key}-${i}`, char.c2, char.c1)
      );
    }
  }
  console.log("Generated placeholder art for", char.slug);
}
