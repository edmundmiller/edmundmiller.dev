import { z } from 'zod';

/** IDs intentionally match the former Astro glob loader, including explicit slugs. */
export function contentId(entry: string, data: Record<string, unknown>): string {
  return typeof data.slug === 'string'
    ? data.slug
    : entry.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
}

const metadata = {
  title: z.string().max(78),
  description: z.string().min(30).max(283),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  coverImage: z.object({ src: z.string(), alt: z.string() }).optional(),
  draft: z.boolean().default(false),
  tags: z
    .array(z.string())
    .default([])
    .transform((tags) => [...new Set(tags.map((tag) => tag.toLowerCase()))]),
  ogImage: z.string().optional(),
  canonical: z.url().optional(),
  author: z.string().or(z.array(z.string())).optional(),
};

export const postSchema = z.object(metadata);
export const pageSchema = z.object({
  ...metadata,
  publishDate: metadata.publishDate.optional(),
  robots: z.string().optional(),
});
