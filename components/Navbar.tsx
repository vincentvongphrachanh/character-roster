import Link from "next/link";

export default function Navbar({ active }: { active: "select" | "about" | "contact" }) {
  const linkClass = (key: string) =>
    `text-[13px] tracking-wide pb-2 border-b transition-colors ${
      active === key
        ? "text-[var(--char-text)] border-[var(--char-accent)]"
        : "text-[var(--char-text)]/60 border-transparent hover:text-[var(--char-text)]"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-12 pt-[calc(env(safe-area-inset-top,0px)+18px)] pb-3.5">
      <Link href="/" className="font-display font-extrabold text-xl">
        ROSTER<span style={{ color: "var(--char-accent)" }}>.</span>
      </Link>
      <div className="flex gap-4 sm:gap-8">
        <Link href="/" className={linkClass("select")}>
          Character Select
        </Link>
        <Link href="/about" className={linkClass("about")}>
          About
        </Link>
        <Link href="/contact" className={linkClass("contact")}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
