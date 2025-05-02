/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // static‑export mode
  output: 'export',
  trailingSlash: true,

  // NEW: disable the Image Optimization API so `next export` succeeds
  images: { unoptimized: true },

  // Optional but handy on GitHub Pages if the site sits in a sub‑folder
  basePath: isProd ? '/aurora_news' : '',
  assetPrefix: isProd ? '/aurora_news/' : '',
};
