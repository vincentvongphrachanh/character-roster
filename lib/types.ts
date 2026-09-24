export type GalleryCategory =
  | "finalArtwork"
  | "alternateOutfits"
  | "turnarounds"
  | "expressions"
  | "conceptArt"
  | "detailStudies"
  | "additionalArtwork";

export type Character = {
  id: string;
  slug: string;
  name: string;
  title?: string;
  description?: string;
  lore?: string;
  displayMode: "full-body" | "bust" | "portrait";
  /** Path under /public, e.g. "/characters/kestrel/thumbnail.webp" */
  thumbnail: string;
  /** Path under /public, e.g. "/characters/kestrel/main.png" */
  mainArtwork: string;
  theme: {
    backgroundColor: string;
    accentColor: string;
    secondaryColor?: string;
    textColor: string;
    /** Optional path under /public for a custom background illustration */
    backgroundImage?: string;
  };
  artworkPosition?: {
    x: string;
    y: string;
    scale: number;
  };
  gallery: Partial<Record<GalleryCategory, string[]>>;
  designNotes?: string;
};

export const galleryLabels: Record<GalleryCategory, string> = {
  finalArtwork: "Final Artwork",
  alternateOutfits: "Alternate Outfits",
  turnarounds: "Turnarounds",
  expressions: "Expressions",
  conceptArt: "Concept Art",
  detailStudies: "Detail Studies",
  additionalArtwork: "Additional Artwork",
};
