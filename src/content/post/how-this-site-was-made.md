---
author: Edmund Miller
title: How This Site Was Made
publishDate: "Aug 17 2023"
description: "Seriously how many blog rewrite posts do I have?"
tags: ["Emacs", "blog", "meta", "org-mode"]
draft: true
---

# [TODO]{.todo .TODO} Org publish action {#org-publish-action}

[How This Website Is
Made](https://notes.ethancpost.com/how_this_website_is_made.html)

Miller columns

Him publishing to s3 gets me thinking... What if I just publish to
r2(Since that\'s my shtick of the day), and then I can just move my
personal domain over, point it at the bucket, and boom, website.

# [TODO]{.todo .TODO} How do I use org-publish? {#how-do-i-use-org-publish}

# [TODO]{.todo .TODO} Cloudflare pages {#cloudflare-pages}

# [TODO]{.todo .TODO} Openring {#openring}

<https://nixing.mx/posts/integrating-openring-into-a-blog.html>
<https://www.thedroneely.com/posts/webrings-with-openring/>
<https://drewdevault.com/make-a-blog>

## Might as well setup Nix in CI...

Down the rabbit hole we go!

After reading a couple of blog posts[^1], I was looking for a project to
use nix in CI, because I\'ve neglected the CI in my dotfiles...

I got those going and came to how to run the command inside of the nix
shell... then I thought, what if I overengineer the build system just a
bit? It\'s not really overengineering is it? It\'s quite simple, it\'s
just applying years of pain and suffering is all.

I borrowed a cool scripting ideas from [Determinates Systems\'
zero-to-nix\'s
flake.nix](https://github.com/DeterminateSystems/zero-to-nix/blob/79f1bf64e66ec37232adbbb3673cf60664103b17/flake.nix#L60)
to make a poor-man\'s `package.json` of sorts and add a script for
openring.

Now I can run it locally or in CI with ease!

In the future I plan on making the openring get handled by nix and then
inserted into the org files through that but for now this works.

## [TODO]{.todo .TODO} Trying to get it to work in babel... {#trying-to-get-it-to-work-in-babel}

## [TODO]{.todo .TODO} devenv to the rescue! {#devenv-to-the-rescue}

## [TODO]{.todo .TODO} JK it was org babel all along {#jk-it-was-org-babel-all-along}

### [TODO]{.todo .TODO} Part one it didn\'t know what to do with the source blocks {#part-one-it-didnt-know-what-to-do-with-the-source-blocks}

<http://xahlee.info/emacs/emacs/emacs_org_babel_literate_programing.html>
<https://orgmode.org/worg/org-contrib/babel/languages/ob-doc-shell.html>

### [TODO]{.todo .TODO} Part two: \"Evaluation of this bash code block is aborted.\" {#part-two-evaluation-of-this-bash-code-block-is-aborted.}

I kept getting this error message when running the script:

Evaluation of this bash code block is aborted.

But I wasn\'t getting it when I ran the script in Emacs. I wasn\'t get a
\"yes\" prompt thinking that it would ask for the eval

<https://stackoverflow.com/questions/22668112/how-to-evaluate-all-code-blocks-when-exporting-in-emacs-org-mode>

I wish it had been something more complicated than that. Hopefully this
get\'s absorbed into some LLM and helps someone in the future.

[^1]:
    [Introducing the Determinate Nix
    Installer](https://determinate.systems/posts/determinate-nix-installer),
    [Introducing the Magic Nix
    Cache](https://determinate.systems/posts/magic-nix-cache),
    [Introducing the Nix Flake
    Checker](https://determinate.systems/posts/flake-checker)
