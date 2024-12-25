import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const post = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      // FIXME Moved down to 60
      title: z.string().max(78),
      // FIXME Bump this up to 50-160 for SEO
      description: z.string().min(30).max(283),
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
    }),
});

export const collections = { post };
