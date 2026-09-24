/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // WebP only: it is created much faster than AVIF for very large
    // artwork files, so enlarged images appear sooner.
    formats: ["image/webp"],
    // The bundled placeholder art is SVG. Once you swap in real
    // PNG/WebP artwork you can delete these two SVG-specific lines.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  // The illustrations gallery is the home page now, so the old
  // /illustrations address forwards visitors there.
  async redirects() {
    return [{ source: "/illustrations", destination: "/", permanent: false }];
  },
};

export default nextConfig;
