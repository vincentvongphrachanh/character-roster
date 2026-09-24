/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // The bundled placeholder art is SVG. Once you swap in real
    // PNG/WebP artwork you can delete these two SVG-specific lines.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
