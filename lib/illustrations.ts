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
  { id: "il1", name: "Study in Amber", note: "Personal piece", image: "/illustrations/il1.svg" },
  { id: "il2", name: "Low Winter Light", note: "Personal piece", image: "/illustrations/il2.svg" },
  { id: "il3", name: "The Long Corridor", note: "Concept study", image: "/illustrations/il3.svg" },
  { id: "il4", name: "Paper Boats", note: "Personal piece", image: "/illustrations/il4.svg" },
  { id: "il5", name: "Wildfire Season", note: "Editorial study", image: "/illustrations/il5.svg" },
  { id: "il6", name: "Glasshouse", note: "Personal piece", image: "/illustrations/il6.svg" },
];
