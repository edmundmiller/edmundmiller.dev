---
title: Generating Feed Recommendations for Astro with Openring
description: How this site turns a list of RSS feeds into static Astro data with Openring and a scheduled workflow.
publishDate: 2024-04-15
tags: ['Indieweb']
draft: true
---

I wanted my home page to recommend recent writing from people and projects I follow. That offers a small alternative to finding every link through social media.

[The Dronely's Openring setup](https://www.thedroneely.com/posts/webrings-with-openring/) showed the basic pattern. Openring reads RSS or Atom feeds and renders selected entries through a template.

This is closer to a feed recommendation section than a traditional web ring. Readers follow links to other sites instead of moving through a fixed ring of members.

## Generate Astro data

The project keeps the feed list in `.github/openring.sh`. The current command has this shape:

```sh
openring \
  -s https://monimiller.com/rss.xml \
  -s https://www.nextflow.io/feed.xml \
  -s https://nf-co.re/blog/rss.xml \
  < ./.github/openring.json.ts.tmpl \
  > ./src/data/openring-out.json.ts
```

The full script includes more feeds. A shorter sample makes the data flow easier to see.

The template writes a TypeScript module instead of an HTML fragment. Each item records its title and link. It also records the summary, source, and date.

```ts
export interface OpenringItem {
  title: string;
  link: string;
  summary: string;
  source_title: string;
  source_link: string;
  date: string;
}

export const openringData: OpenringItem[] = [
  // Generated entries
];
```

Generating TypeScript solved a problem from the first implementation. Multiline summaries could break plain JSON output. Template literals preserve those summaries while keeping the module importable by Astro.

## Render the entries in Astro

The `openring.astro` component defines the same item shape. Its markup maps each item into a title, summary, source link, and date.

The component should import `openringData` from the generated module. The home page can then render one component without fetching feeds in the browser.

This keeps feed parsing outside the Astro build. It also leaves a generated snapshot that can be reviewed before deployment.

## Refresh the snapshot on a schedule

The Nix flake adds `openring` to the development environment. Local generation and automation therefore use the same executable.

The `Openring` GitHub Actions workflow runs every Monday and supports manual runs. Its main steps are:

1. Check out the repository.
2. Install Nix and enter the development environment.
3. Run `.github/openring.sh`.
4. Commit the updated TypeScript module.

The repository history contains many `Run Openring` commits. The generated module currently contains three dated feed entries. Those files prove that scheduled generation has worked.

## Current result

The generation pipeline works, but the current site does not publish its output. The Astro component uses an empty local array instead of importing `openringData`.

It also hides the entire section when that array is empty. As a result, the home page includes `<Openring />` but renders no recommendations.

I need to connect the generated module to the component before publishing this post. A final check should run the generator, build the site, and inspect the rendered links.

Once connected, the benefit is modest and clear. The site can show fresh links without client-side feed requests or a social-media API.

## References

- [Openring source](https://git.sr.ht/~sircmpwn/openring)
- [The Dronely's Openring article](https://www.thedroneely.com/posts/webrings-with-openring/)
- [Another Openring integration by nixing.mx](https://nixing.mx/posts/integrating-openring-into-a-blog.html)
