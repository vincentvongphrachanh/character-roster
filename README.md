# Roster — Original Character Portfolio

A fighting-game-inspired character select experience for showcasing original
character art. Built with Next.js (App Router), TypeScript, Tailwind CSS, and
Motion for React.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Edit files under `app/`, `components/`, or
`lib/` and the page reloads automatically.

## Project structure

```
app/
  page.tsx                 → the character select screen
  characters/[slug]/page.tsx → a single character's detail page
  about/page.tsx
  contact/page.tsx
  layout.tsx, globals.css
components/
  Navbar.tsx, CharacterStage.tsx, RosterStrip.tsx, GalleryLightbox.tsx
lib/
  types.ts        → the Character type
  characters.ts   → THE ROSTER — every character lives here
public/characters/<slug>/ → artwork files for each character
scripts/generate-placeholder-art.mjs → regenerates placeholder SVGs
```

## Adding a new character

1. Make a folder for their art: `public/characters/<slug>/`.
2. Drop in their artwork — at minimum a `main` image and a `thumbnail`
   image (PNG/WebP with a transparent background works best for
   full-body art). Add any gallery images too.
3. Open `lib/characters.ts` and copy an existing object in the
   `characters` array. Update:
   - `id`, `slug`, `name`, `title`, `description`
   - `displayMode`: `"full-body"`, `"bust"`, or `"portrait"`
   - `thumbnail` / `mainArtwork`: paths to the files you just added
   - `theme`: pick a background, accent, secondary, and text color
     for this character
   - `gallery`: only fill in the categories you actually have art
     for — empty/omitted categories are automatically hidden
   - `lore` / `designNotes`: optional longer-form text
4. Save. The new character appears in the roster, the select screen,
   and gets its own page at `/characters/<slug>` automatically —
   nothing else needs to change.

To reorder characters, reorder the array. The first entry is what
visitors see when the site loads.

## Replacing the placeholder art

Every image path in `lib/characters.ts` currently points at a
generated placeholder SVG (see `scripts/generate-placeholder-art.mjs`).
Replace the files in `public/characters/<slug>/` with real artwork of
the same filenames (or update the paths in `lib/characters.ts` to
match new filenames) — the layout, transitions, and gallery all adapt
automatically to each image's real aspect ratio.

## Deploying

See the step-by-step hosting walkthrough provided alongside this
project. Short version: push this folder to GitHub, then import the
repo at vercel.com — no configuration needed, Vercel detects Next.js
automatically.
