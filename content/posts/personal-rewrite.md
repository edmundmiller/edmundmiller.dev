---
title: 'Personal Site Rewrite'
description: ''
date: 2020-03-05 22:49:01
published: true
author: 'Edmund Miller'
tags: ['Vuejs']
---

# Personal Site Rewrite

I've been wanting to redo my personal site since I tried to add my presentations
to my hugo based site and struggled. Something that looked
cool. Something that was interesting.

At first I started looking at static site generators and found a great site,
[staticgen](https://www.staticgen.com/), that lists all the possible static site generators. I thought I
wanted one written in a cool language, like a lisp or Haskell, so I
went down all the lisps first, and I realized my first real requirement was
simple CI deployment. I like GitLab CI for it's control, [zeit now](https://zeit.co/) as a close
second for it's ease, and then maybe Netlify. The lisp
family didn't have anything quick to deploy and their installation stories
were equally poor.

So I jumped to Hakyll, there's an [example](https://gitlab.com/pages/hakyll) for GitLab Pages so I got started on
that. And I thought I wanted to build it with Nix and found a few brave souls
who had ventured down that path. But I figured I'll just try the example first,
why not. The pipeline took 30 minutes to build, because the Haskell packages
had to be installed, which would be fine, if the cache lasted longer than a
week. I then realized that I didn't really want just a static site generator,
they are using these fantastic powerful programming languages to just generate
static pages, just a glorified Makefile. And I didn't want to use someone else's
theme, but I didn't want to write my own in the generators specific formatting.
It felt limiting, but I didn't want to reinvent the wheel. I didn't like making
websites. Maybe I'm just not good at design, but I'd rather focus on the
content than trying to center a div. So I thought maybe it was just javascript.

So I tried Elm. I settled on [elm-pages](https://elm-pages.com/) , what finally sold me over elm-static
was the [introduction blog post](https://elm-pages.com/blog/introducing-elm-pages/) and it insightful into the JAMstack (JavaScript,
APIs, and Markup). I had used [gatsby](https://www.gatsbyjs.org/) to rewrite the [UTDallas Rugby Page](https://www.utdallasrugby.org/) with
[Tristen Even](https://www.tristeneven.com/) so the pieces were starting to fall together in my head about what
JAMstack is about. So I got it up and running. And it sat there because I don't
elm. It looks fantastic checks all the functional buzz word bingo card spots.
But my list of things to learn is taking on more water than I can bail out, and
elm kept sinking to the bottom.

Fast forward a couple of weeks, to [ETHDenver](https://www.ethdenver.com/) and I met Jeremy, a friend of a
friend and one of the creators of [loft.radio](https://loft.radio/), a lofi hip hop radio that you can
tip the artists in ETH. We we're chatting tech, as one does at a hackathon, and
he was raving about Vuejs, which he used to build loft. I had heard about it
from another friend and decided to checkout after I finished my weekend with
react. I had the perfect excuse to dip my toes in when I needed to build some
documentation for work, and settled on [VuePress](https://vuepress.vuejs.org/). I think all documentation
should be written in markdown, and then the site generated to prevent vendor
lock-in. It's been a great experience so far and has a ton of features out of
the box. But like Vue, it let's you walk into the water, rather than jump into
the deep end like React. Just my personal experience.

That small brush inspired me to dust off an old side project, [Multiverse](https://multiverse.gg/). It's
my buzzword labor of love, Nextjs, Tailwindcss, Typescript, Ava, Graphql, and Stripe.
I had patched into together like Frankenstein from several [examples](https://github.com/zeit/next.js/tree/master/examples), but I got
hung up between Typescript and Ava and getting it to build and test those. In a
perfect storm the Vuejs documentary came out at the same time so I rewrote my
tiny progress in [Nuxtjs](https://nuxtjs.org/). I think this quote from the Vuejs docs section
comparing it to other frameworks is my experience exactly

> For many developers who have been working with HTML, templates feel more natural to read and write. The preference itself can be somewhat subjective, but if it makes the developer more productive then the benefit is objective.

I'll just cover my experience really quick. Vue definitely takes the developer
experience as a priority and that reflects on the frameworks created on top of
it. Just give `vue create hello-world` or `npx create-nuxt-app <project-name>` a
shot and you'll see the difference from the blank canvas that `creat-react-app`
gives you. From `create-nuxt-app` I just had to add the [apollo-module](https://github.com/nuxt-community/apollo-module) and I had
most of my wish list taken care. In the past I had used [prisma](https://www.prisma.io/) for a quick DB
with Graphql on top, but I found they had updated their docs to offer more, but
I wanted something simpler. Enter, [Hasura](https://hasura.io/), one click deploy to Heroku. A docker
image for when you want to move somewhere else. Makes thinking about the back end
an after thought. I made more progress in the past two weeks than in the past 9
months. I'm just missing Typescript and Stripe so far, and I'm assuming Stripe
will be a breeze.

Maybe I'm just not a clever enough developer for React. I love functional
programming and React Hooks are just sexy and they still nearly lure me back in.
But Vue gave me a new light on web development and programming languages. Vue
gave me a paintbrush to finally appreciate design and the joy of making a web page come to
life rather than wrangling JavaScript and never getting anywhere. I realized
what the advice a language is a tool to get a job done meant. The paint from Vue
may crack after a while, as apposed to the copper statue that Elm and similar
languages promise. While it's great, it won't matter if I never make the statue
because I can't learn metallurgy at a craft store.
