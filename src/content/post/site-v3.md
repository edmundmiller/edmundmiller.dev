---
author: Edmund Miller
publishDate: "2023-07-17T18:09Z"
title: Site v3
description: "Or is it like v5 at this point?"
draft: false
---

Or is it like [v5 at this point](personal-rewrite.org)?

In the lead up to [JuliaCon 2023](https://juliacon.org/2023/) I was
throwing together the final touches on my presentations and talking to
[Teco](https://tecosaur.net/) a lot about his presentation and started
digging into the org file he used to create it. I had followed his
beamer recommendations in the past, I just had never seen behind the
curtain of how he does it.

Then it hit me. Why did I never try just using org export for my
personal site? I continually searched for ways to write my posts in
org-mode, but I always wanted to use the newest and fanciest web
framework. Why? I\'m not a web developer. [I know enough to be
dangerous](learn-react.org), but the things I was trying to do were
vastly over complicated for a personal site. It\'s some static text, and
some links. It was never going to need all of the functionality of
astro. I mainly wanted to use astro because it would just ship html by
default and be fast.

Spoiler alert, org-mode does that out of the box.

# Scoping what I actually needed

1.  I love automated publishing. I literally don\'t think I could run a
    website or software project without it. The thought of manually
    walking through the build process manually is like nails on a
    chalkboard for me. I should just push it to a repo, and boom
    results. Manual steps are prone to me getting bored halfway through
    and never finishing it.
2.  I hate checking generated files into repos. That means html files,
    coverted markdown files from org-export. It just clutters the
    commits and you can\'t follow the history.

So from that I planned on:

1.  Start with plain html export
2.  Get all of the content in the right places
3.  Throw some css on there.
4.  Then answer the age old question, do you really need JavaScript?[^1]

[^1]:
    I noticed [NvChad](https://nvchad.com/) used
    [UnoCSS](https://unocss.dev/) and
    [Solid.js](https://www.solidjs.com/), which seem minimal, while I
    was looking for a [Doom
    Emacs](https://github.com/doomemacs/doomemacs) like
    [Neovim](https://neovim.io/) experience. Planning on using those
    first.
