import Navbar from "@/components/Navbar";
import SocialIcons from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "About — xmimiso" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar active="about" />
      <div className="max-w-[640px] mx-auto px-5 sm:px-12 pt-10 pb-24">
        <p className="text-sm mb-2 text-black/50">ABOUT THE ARTIST</p>
        <h1 className="font-display font-extrabold uppercase text-[clamp(34px,6vw,54px)] mb-5 text-black">
          Placeholder Artist Name
        </h1>
        <p className="leading-relaxed mb-5 text-black/65">
          This is prototype biography copy. The artist works primarily in semi-realistic original
          character design — developing outfits, personalities, and visual identities for
          characters that don&rsquo;t belong to any single world or style. Replace this paragraph
          with the real artist bio.
        </p>
        <p className="leading-relaxed mb-6 text-black/65">
          Specialties include costume and silhouette design, expressive portraiture, and building
          cohesive visual identities for original characters across fantasy, modern, and
          historical settings.
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {["Character Design", "Digital Painting", "Costume Design", "Portraiture", "Procreate / Photoshop", "Clip Studio Paint"].map(
            (tag) => (
              <span key={tag} className="text-[12.5px] px-3 py-1.5 rounded-sm border border-black/15 text-black/60">
                {tag}
              </span>
            )
          )}
        </div>
        <div className="mb-14">
          <SocialIcons size={19} />
        </div>

        <div className="border-t border-black/10 pt-12">
          <p className="text-sm mb-2 text-black/50">GET IN TOUCH</p>
          <h2 className="font-display font-bold uppercase text-2xl mb-6 text-black">Contact</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
