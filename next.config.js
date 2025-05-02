/** @type {import('next').NextConfig} */
const nextConfig = {
  // tell Next.js we’re producing a static _export_
  output: 'export',

  // turn off the Image Optimization API so export succeeds
  images: {
    unoptimized: true,
  },

  // ---- only needed if the site is served from a sub‑path, e.g. /my-repo ----
  // replace "my-repo" with the repository name
  basePath: process.env.NODE_ENV === 'production' ? '/my-repo' : '',
  assetPrefix:
      process.env.NODE_ENV === 'production' ? '/my-repo/' : '',

  // optional but handy for GitHub Pages so links resolve to index.html files
  trailingSlash: true,
};

module.exports = nextConfig;
