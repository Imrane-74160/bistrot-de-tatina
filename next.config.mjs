/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Flux Instagram (placeholder) — décommenter les domaines réels si embed direct.
    remotePatterns: [],
  },
  async rewrites() {
    return [
      // Back-office Decap CMS (sert public/admin/index.html sur /admin partout)
      { source: '/admin', destination: '/admin/index.html' },
    ];
  },
};

export default nextConfig;
