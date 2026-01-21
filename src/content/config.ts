import { defineCollection, z } from 'astro:content';

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) {
    return array;
  }
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const post = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // SEO optimal: Google displays up to ~60 characters in search results
      title: z.string().max(60),
      // SEO optimal: Google displays up to ~160 characters for meta descriptions
      description: z.string().min(50).max(160),
      publishDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      coverImage: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      ogImage: z.string().optional(),
      canonical: z.string().url().optional(),
      author: z.string().or(z.array(z.string())).optional(),
    }),
});

export const collections = { post };
