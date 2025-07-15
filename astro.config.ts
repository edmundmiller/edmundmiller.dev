import fs from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
import remarkUnwrapImages from 'remark-unwrap-images';
import { expressiveCodeOptions } from './src/site.config';
import { remarkAdmonitions } from './src/utils/remark-admonitions';
import { remarkReadingTime } from './src/utils/remark-reading-time';

// https://astro.build/config
export default defineConfig({
  // ! Please remember to replace the following site property with your own domain
  site: 'https://edmundmiller.dev/',
  markdown: {
    remarkPlugins: [
      remarkUnwrapImages,
      remarkReadingTime,
      remarkDirective,
      remarkAdmonitions,
    ],
    rehypePlugins: [
      rehypeRaw,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow, noopener, noreferrer'],
        },
      ],
    ],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [''],
      },
    },
  },
  integrations: [
    expressiveCode(expressiveCodeOptions),
    icon(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx({
      remarkPlugins: [
        remarkUnwrapImages,
        remarkReadingTime,
        remarkDirective,
        remarkAdmonitions,
      ],
      rehypePlugins: [
        rehypeRaw,
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['nofollow, noopener, noreferrer'],
          },
        ],
      ],
    }),
  ],
  image: {
    domains: ['webmention.io'],
  },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: true,
  vite: {
    plugins: [rawFonts(['.ttf', '.woff'])],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});

function rawFonts(ext: string[]) {
  return {
    name: 'vite-plugin-raw-fonts',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
