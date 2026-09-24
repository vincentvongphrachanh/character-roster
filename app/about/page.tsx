import Navbar from "@/components/Navbar";

export const metadata = { title: "About — Roster" };

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0c0b10", color: "#f3f1ec" }}>
      <Navbar active="about" />
      <div className="max-w-[640px] mx-auto px-5 sm:px-12 pt-32 pb-20">
        <p className="text-sm mb-2" style={{ color: "rgba(243,241,236,0.62)" }}>
          ABOUT THE ARTIST
        </p>
        <h1 className="font-display font-extrabold uppercase text-[clamp(38px,6vw,58px)] mb-5">
          Placeholder Artist Name
        </h1>
        <p className="leading-relaxed mb-5" style={{ color: "rgba(243,241,236,0.62)" }}>
          This is prototype biography copy. The artist works primarily in semi-realistic original
          character design — developing outfits, personalities, and visual identities for
          characters that don&rsquo;t belong to any single world or style. Replace this paragraph
          with the real artist bio.
        </p>
        <p className="leading-relaxed mb-6" style={{ color: "rgba(243,241,236,0.62)" }}>
          Specialties include costume and silhouette design, expressive portraiture, and building
          cohesive visual identities for original characters across fantasy, modern, and
          historical settings.
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {["Character Design", "Digital Painting", "Costume Design", "Portraiture", "Procreate / Photoshop", "Clip Studio Paint"].map(
            (tag) => (
              <span
                key={tag}
                className="text-[12.5px] px-3 py-1.5 rounded-sm border"
                style={{ borderColor: "rgba(243,241,236,0.14)", color: "rgba(243,241,236,0.62)" }}
              >
                {tag}
              </span>
            )
          )}
        </div>
        <p style={{ color: "rgba(243,241,236,0.62)" }}>
          Portfolio and résumé links can be added here once supplied.
        </p>
      </div>
    </div>
  );
}
