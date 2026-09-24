# xmimiso — Original Character Portfolio

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
  page.tsx                     → home page: the illustrations gallery
  character-select/page.tsx    → the character select screen
  characters/[slug]/page.tsx   → a single character's detail page
  about/page.tsx               → bio + the contact form
  layout.tsx, globals.css
components/
  Navbar.tsx        → the site header (logo + nav, centered)
  SocialIcons.tsx    → Instagram / VGen / Ko-fi / email icons
  ContactForm.tsx    → the form on the About page
  CharacterStage.tsx, RosterStrip.tsx, GalleryLightbox.tsx
lib/
  types.ts            → the Character type
  characters.ts        → THE ROSTER — every character lives here
  illustrations.ts     → the standalone illustration gallery list
  social-links.ts       → Instagram/VGen/Ko-fi/email URLs + contact form endpoint
  site.ts               → logo file path and size
public/
  brand/logo.png        → placeholder logo — replace with the real one
  characters/<slug>/     → artwork for each character
  illustrations/          → artwork for the illustrations gallery
scripts/
  generate-placeholder-art.mjs, generate-illustration-placeholders.mjs
```

## Adding the artist's real logo

1. Name the logo file `logo.png` and put it in `public/brand/`,
   replacing the placeholder that's there.
2. That's it. If you'd rather keep a different filename, open
   `lib/site.ts` and change `logoSrc` to match it exactly,
   capital letters included.
3. To make the logo bigger or smaller, change `logoHeight` in the
   same file.

On Windows, turn on File Explorer → View → Show → File name
extensions, so you can see whether a file is really `logo.png` and
not `logo.png.png`.

## Social / contact links

Open `lib/social-links.ts` and fill in the four real URLs
(Instagram, VGen, Ko-fi, email). Every icon across the whole site
reads from this one file.

The About page's contact form has no backend of its own (this is a
static site), so by default it opens the visitor's email app with
the message pre-filled. For a form that submits in-page with a
"message sent" confirmation instead, sign up free at
[formspree.io](https://formspree.io), create a form, and paste the
endpoint URL it gives you into `contactFormEndpoint` in the same
`lib/social-links.ts` file.

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
   - `theme.accentColor`: the one color used for this character (a
     thin highlight, not a background — the site is white/black)
   - `gallery`: only fill in the categories you actually have art
     for — empty/omitted categories are automatically hidden
   - `lore` / `designNotes`: optional longer-form text
4. Save. The new character appears in the roster, the select screen,
   and gets its own page at `/characters/<slug>` automatically.

To reorder characters, reorder the array. The first entry is what
visitors see when the site loads.

## Adding a new illustration

Open `lib/illustrations.ts`, copy an existing entry, give it a new
`id`, `name`, optional `note`, and an `image` path pointing at a file
you've added under `public/illustrations/`. It appears in the grid
on `/illustrations` automatically — no layout changes needed.

## Replacing the placeholder art

Every image path in `lib/characters.ts` and `lib/illustrations.ts`
currently points at a generated placeholder SVG. Replace the files
in `public/` with real artwork of the same filenames (or update the
paths to match new filenames) — the layout, transitions, and gallery
all adapt automatically to each image's real aspect ratio.

## Deploying

See the step-by-step hosting walkthrough provided alongside this
project. Short version: push this folder to GitHub, then import the
repo at vercel.com — no configuration needed, Vercel detects Next.js
automatically.
