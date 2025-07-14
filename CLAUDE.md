# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` or `pnpm start` - Start development server on localhost:3000
- `pnpm build` - Build production site to `./dist/`
- `pnpm postbuild` - Build Pagefind static search (run after build)
- `pnpm preview` - Preview production build locally

### Code Quality
- `pnpm format` - Format code with Prettier
- `pnpm check` - Run Astro type checking
- `pnpm lint` - Lint prose with Vale on src/ directory

### Deployment
- `pnpm deploy` - Build and deploy with Wrangler to Cloudflare
- `pnpm deploy:staging` - Deploy to staging environment

## Architecture

This is an Astro-based personal blog/website using the Astro Theme Cactus template.

### Content Management
- Blog posts are stored in `src/content/post/` as Markdown/MDX files
- Filename becomes the URL slug
- Uses Astro Content Collections with schema validation in `src/content/config.ts`
- Post frontmatter schema:
  - `title` (required, max 78 chars)
  - `description` (required, 30-283 chars)
  - `publishDate` (required)
  - `updatedDate` (optional)
  - `tags` (optional array)
  - `coverImage` (optional: {src, alt})
  - `ogImage` (optional URL)
  - `draft` (boolean, default false)

### Key Integrations
- **Search**: Pagefind static search (requires postbuild after build)
- **Styling**: TailwindCSS with dark/light theme support
- **Code Highlighting**: Expressive Code with dracula (dark) and github-light themes
- **SEO**: Auto-generated OG images using Satori, RSS feed, sitemap
- **Analytics**: Astro Analytics integration
- **Webmentions**: Social interaction support

### Custom Features
- Admonitions: Custom remark plugin for note/warning blocks (`src/utils/remark-admonitions.ts`)
- Reading Time: Automatic calculation (`src/utils/remark-reading-time.ts`)
- OG Image Generation: Customizable in `src/pages/og-image/[slug].png.ts`

### Site Configuration
- Main config: `src/site.config.ts` - Contains site metadata, author info, theme settings
- Astro config: `astro.config.ts` - Framework configuration
- Deploy target: Cloudflare (uses Wrangler)

### Code Style
- Formatter: Prettier with Biome (ultracite config)
- Prose linting: Vale for content quality
- Font: Monospace font family by default