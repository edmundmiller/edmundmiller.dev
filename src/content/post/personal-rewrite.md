---
author: Edmund Miller
publishDate: '2020-03-05T22:49:01Z'
title: A New Vue on Life
description: 'Vue and Nuxt helped me stop comparing web frameworks and ship the personal projects I had left unfinished.'
tags: ['javascript']
---

I kept rebuilding my personal site without publishing it. I chose tools for their guarantees, then stalled while learning their ecosystems. Vue changed that pattern because its defaults helped me ship.

## What I needed

The project began when adding presentations to my Hugo site became harder than expected. I wanted control over the design, Markdown for the content, and a simple CI deployment.

I first tried tools written in languages I wanted to learn. A Hakyll example deployed to GitLab Pages, but its first pipeline spent 30 minutes installing Haskell packages. The cache expired often enough to make that delay routine.

I also built a version with [elm-pages](https://elm-pages.com/). Elm offered stronger guarantees than JavaScript, but using it meant learning another language before improving the site. The unfinished project sat in a repository.

Those tools were not bad choices. They optimized for properties I valued, such as types and reproducible builds. My immediate problem was different: I needed to finish a website.

## Why Vue worked for me

I tried [VuePress](https://vuepress.vuejs.org/) while writing documentation for work. It kept the source in Markdown and supplied the common parts of a documentation site. I could change the design without first assembling the entire build system.

That experience led me back to [Multiverse](https://multiverse.gg/), an abandoned side project. Its Next.js version combined TypeScript, Ava, GraphQL, and Stripe. It also pulled from several examples in the Next.js repository. I had spent more time connecting those choices than building the product.

I rewrote the small application with [Nuxt](https://nuxtjs.org/). Its project generator made the main choices up front. I added the [Apollo module](https://github.com/nuxt-community/apollo-module) for GraphQL and used [Hasura](https://hasura.io/) for the database API. Hasura could deploy to Heroku with one click and still offered a Docker image for moving elsewhere.

In two weeks, I made more progress than I had in the previous nine months. Vue did not prove that React or Elm were too difficult. It gave me a smaller set of decisions between an idea and a working page.

## Tailwind reduced another decision

I used the site rewrite to learn [Tailwind CSS](https://tailwindcss.com/). I had almost no CSS experience and had struggled to make component libraries match the layouts I wanted.

Tailwind let me adjust a design in the markup with a consistent set of utility classes. I could read the existing layout, change one property, and see the result. That was easier for me than tracing a large stylesheet.

The main exception was rendered Markdown. Gridsome returned each post through `v-html="$page.post.content"`, so utility classes could not reach the generated elements directly. I adapted the approach from the [Gridsome Portfolio Starter](https://gridsome.org/starters/gridsome-portfolio-starter/) and added a small [Markdown stylesheet](https://github.com/Emiller88/edmundmiller.dev/blob/3e57e2466116fc260c077239d5cfdf4c0063ee40/src/assets/css/github-markdown.css). The rewrite was complete in [commit 3e57e24661](https://github.com/Emiller88/edmundmiller.dev/tree/3e57e2466116fc260c077239d5cfdf4c0063ee40).

Elm offered stronger compile-time guarantees. React offered more control over each choice. Vue and Nuxt gave me enough structure to ship. For this project, shipping was the guarantee that mattered.
