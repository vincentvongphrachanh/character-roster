export type Illustration = {
  id: string;
  name: string;
  image: string;
  /** Optional context line shown under the name, e.g. a client or medium. */
  note?: string;
};

/**
 * ILLUSTRATIONS
 * ------------------------------------------------------------------
 * Standalone artwork that isn't tied to one of the original
 * characters -- book covers, personal pieces, fan art, studies.
 * Add an entry here and it appears on /illustrations automatically,
 * newest/first-listed at the top.
 * ------------------------------------------------------------------
 */
export const illustrations: Illustration[] = [
  { id: "il1", name: "", note: "", image: "/illustrations/ephermeral.png" },
  { id: "il2", name: "", note: "", image: "/illustrations/escape.png" },
  { id: "il3", name: "", note: "", image: "/illustrations/feelit.png" },
  { id: "il4", name: "", note: "", image: "/illustrations/Untitled_Artwork 3.jpg" },
  { id: "il5", name: "", note: "", image: "/illustrations/Untitled_Artwork 4.jpg" },
  { id: "il6", name: "", note: "", image: "/illustrations/Untitled_Artwork 5.jpg" },
  { id: "il7", name: "", note: "", image: "/illustrations/Untitled_Artwork 6.jpg" },
  { id: "il8", name: "", note: "", image: "/illustrations/Untitled_Artwork 181.PNG" },
  { id: "il9", name: "", note: "", image: "/illustrations/Untitled_Artwork copy 2.jpg" },
  { id: "il10", name: "", note: "", image:"/illustrations/Untitled_Artwork.jpg" },
];
