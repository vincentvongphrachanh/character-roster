import Navbar from "@/components/Navbar";

export const metadata = { title: "Contact — Roster" };

const LINKS = ["ArtStation", "Instagram", "Behance", "Email"];

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0c0b10", color: "#f3f1ec" }}>
      <Navbar active="contact" />
      <div className="max-w-[640px] mx-auto px-5 sm:px-12 pt-32 pb-20">
        <p className="text-sm mb-2" style={{ color: "rgba(243,241,236,0.62)" }}>
          CONTACT
        </p>
        <h1 className="font-display font-extrabold uppercase text-[clamp(38px,6vw,58px)] mb-5">
          Get in touch
        </h1>
        <p className="mb-6" style={{ color: "rgba(243,241,236,0.62)" }}>
          Prototype contact links below — connect each to the artist&rsquo;s real profiles and inbox.
        </p>
        <ul className="flex flex-col">
          {LINKS.map((label) => (
            <li key={label} className="border-b" style={{ borderColor: "rgba(243,241,236,0.14)" }}>
              <a href="#" className="flex justify-between items-center py-4 text-base hover:opacity-70">
                {label} <span>→</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6" style={{ color: "rgba(243,241,236,0.62)" }}>
          Commission information will appear here once provided by the artist.
        </p>
      </div>
    </div>
  );
}
