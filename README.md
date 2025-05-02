# Next News Feed

A modern, static news feed built with Next.js, React, and Tailwind CSS. Articles are written in Markdown and stored locally in `content/articles`. The site is statically generated at build time for optimal performance.

## Features
- Static Site Generation (SSG) with Next.js
- Markdown-based articles powered by gray-matter and remark
- Responsive, modern design with Tailwind CSS and typography plugin
- Article list on the homepage and individual article pages

## Getting Started

### Prerequisites
- Node.js v14 or newer (v16+ recommended)
- npm v6 or newer

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd next-news-feed
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### Building for Production
```bash
npm run build
npm start
```
By default, the production server runs on port 3000.

## Project Structure
```
.
├── components/       # Reusable React components (Layout, ArticleCard)
├── content/          # Markdown content
│   └── articles/     # Article files (.md)
├── lib/              # Helper modules (data fetching, markdown parsing)
├── pages/            # Next.js pages
│   ├── index.js      # Homepage listing articles
│   └── posts/        # Dynamic article pages ([slug].js)
├── styles/           # Global CSS (Tailwind imports)
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Managing Articles
All articles live as Markdown files in `content/articles`. To add a new article:
1. Create a `.md` file: `content/articles/my-article.md`.
2. Add front-matter:
   ```markdown
   ---
   title: 'My Article Title'
   date: 2025-05-03
   excerpt: 'Short summary shown on homepage.'
   ---

   Write your article content here in Markdown.
   ```
3. Save and rebuild (`npm run build`) or restart dev server.

**Required Front-Matter Fields:**
- `title` (string): The article title.
- `date` (YYYY-MM-DD): Publish date.
- `excerpt` (string, optional): Summary for the homepage (defaults to first 200 chars).

## Deployment
You can deploy to any hosting platform that supports Node.js or static exports.
For Vercel:
```bash
npm i -g vercel
vercel
```

## Customization
- Tailwind CSS: Edit `tailwind.config.js` for theme, colors, typography.
- Components: Add or modify UI in `components/`.
- Markdown Processing: Customize `lib/posts.js` to add remark plugins (e.g., syntax highlighting).

## Deployment to GitHub Pages

You can automatically build and deploy this static Next.js site to GitHub Pages using GitHub Actions.

1. Add static export config (`next.config.js`):
```js
/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
}
```

2. Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next export",
    "postbuild": "npm run export"
  }
}
```

3. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run build
      - run: npm run export
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: out
          publish_branch: gh-pages
          force_orphan: true
```

4. In GitHub Repo Settings → Pages, set Source to `gh-pages` branch, root folder. Your site will be available at:
   `https://<username>.github.io/<repo>/`

## Adding Articles via Apple Shortcut

You can use GitHub's REST API directly from an iPhone Shortcut to add new Markdown articles. Here's how:

1. Generate a GitHub Personal Access Token with `repo` scope and store it securely (e.g., in iCloud Keychain).
2. In the Shortcut, prompt for the article **title** and **body**.
3. Compute the filename (e.g., `2025-05-04-my-title.md`) and Base64‐encode the Markdown content (including front-matter).
4. Make a `PUT` request to the GitHub API endpoint:
   ```
   https://api.github.com/repos/<owner>/<repo>/contents/content/articles/<filename>.md
   ```
   with JSON payload:
   ```json
   {
     "message": "Add article: My Title",
     "content": "<BASE64_CONTENT>",
     "branch": "main"
   }
   ```
5. The file gets committed to `main`. The GitHub Action then builds and deploys the updated site.

This lets you publish new articles from your phone in seconds!

## GitHub Repository Setup and Publishing

To get the site live on GitHub and enable automated builds+deploys, follow these steps:

1. **Commit & push** your latest changes:
   ```bash
   git add .
   git commit -m "chore: configure GitHub Pages deployment"
   git remote add origin git@github.com:<username>/<repo>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository’s **Settings > Pages**.
   - Under **Source**, select the `gh-pages` branch and **/(root)** folder.
   - Save. Within a minute your site will be live at `https://<username>.github.io/<repo>/`.

3. **Verify the CI workflow**:
   - Open the **Actions** tab and confirm the “Deploy to GitHub Pages” workflow runs on each push to `main`.
   - It will publish the static export to the `gh-pages` branch.

4. **(Optional) Add articles via iPhone**:
   Leverage the **Adding Articles via Apple Shortcut** section above to commit new Markdown files from your phone, triggering an automatic rebuild and deploy.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
