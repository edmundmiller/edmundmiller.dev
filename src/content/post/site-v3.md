---
author: Edmund Miller
publishDate: '2023-07-17T18:09Z'
title: Site v3
description: 'Or is it like v5 at this point?'
draft: false
---

Or was it [v5 at this point](/posts/personal-rewrite/)?

Before [JuliaCon 2023](https://juliacon.org/2023/), I was finishing my talks and comparing notes with [Teco](https://tecosaur.net/). I opened the Org source for his presentation to see how its publishing setup worked.

That source showed me what my personal site required: static HTML, links, and a small stylesheet. Org's built-in HTML exporter already produced the first two.

I had kept choosing web frameworks because I wanted fast static output. I [knew enough React to assemble a site](/posts/learn-react/), but that did not mean the site needed a JavaScript application.

## What the publishing system needed

I reduced the plan to two constraints:

1. A push to the source repository should publish the site automatically.
2. Generated HTML should stay out of Git so commits show only source changes.

The build pipeline, not Org alone, would provide automated deployment and keep generated files out of the repository.

## The implementation order

1.  Start with plain html export
2.  Get all of the content in the right places
3.  Add the CSS needed for the design
4.  Add JavaScript only for a feature that required it

This was the plan in July 2023. The current site later returned to Astro, but the lesson held: choose tools from the site's requirements, not their novelty.
