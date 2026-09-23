/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (no server, fully browser-based app)
  output: 'export',
  // Project site: https://<owner>.github.io/Signature-Maker/
  // Keep empty in dev so localhost stays at http://localhost:3000
  basePath: isProd ? '/Signature-Maker' : '',
  assetPrefix: isProd ? '/Signature-Maker/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
