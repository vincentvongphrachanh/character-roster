import type { Metadata } from "next";
// Figtree is served from this project (installed as a package), not from
// Google, so it always loads -- including when you run the site locally.
import "@fontsource-variable/figtree";
import "./globals.css";

export const metadata: Metadata = {
  title: "xmimiso",
  description: "Illustrations and original character designs by xmimiso.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
