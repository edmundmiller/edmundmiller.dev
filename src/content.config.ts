import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) {
    return array;
  }
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const post = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/post',
    generateId: ({ entry, data }) => {
      if (typeof data.slug === 'string') {
        return data.slug;
      }
      return entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
    },
  }),
  schema: ({ image }) =>
    z.object({
      // FIXME Moved down to 60
      title: z.string().max(78),
      // FIXME Bump this up to 50-160 for SEO
      description: z.string().min(30).max(283),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      coverImage: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      ogImage: z.string().optional(),
      canonical: z.url().optional(),
      author: z.string().or(z.array(z.string())).optional(),
    }),
});

export const collections = { post };
