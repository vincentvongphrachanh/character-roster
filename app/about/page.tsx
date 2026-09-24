import Navbar from "@/components/Navbar";
import SocialIcons from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "About — xmimiso" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar active="about" />
      <main className="max-w-[640px] mx-auto px-5 sm:px-8 pt-14 md:pt-20 pb-28">
        <h1 className="text-[32px] md:text-[38px] font-medium leading-tight tracking-[0.01em] mb-6">
          Placeholder Artist Name
        </h1>
        <div className="space-y-5 text-[17px] leading-[1.7] text-black/80">
          <p>
            This is prototype biography copy. The artist works primarily in semi-realistic original
            character design — developing outfits, personalities, and visual identities for
            characters that don&rsquo;t belong to any single world or style. Replace this paragraph
            with the real artist bio.
          </p>
          <p>
            Specialties include costume and silhouette design, expressive portraiture, and building
            cohesive visual identities for original characters across fantasy, modern, and
            historical settings.
          </p>
        </div>
        <div className="mt-7 -ml-2">
          <SocialIcons />
        </div>

        <section className="mt-16 pt-14 border-t border-black/10">
          <h2 className="text-[26px] font-medium tracking-[0.01em] mb-8">Contact</h2>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
