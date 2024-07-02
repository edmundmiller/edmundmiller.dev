---
title: Formatting Snakemake files Using snakefmt in Emacs
description: Formatting Snakemake files Using snakefmt in Emacs using Apheleia
draft: true
publishDate: "2024-06-10"
tags: ["emacs", "snakemake"]
series: "Snakeflow"
---

Dooms Emacs recently switched using Apheleia as it's default formatter, thanks to a huge effort from [Ellis Kenyő](https://elken.dev) to refactor the format module.

I've been writing a bit of Snakemake for the [Applied Genomics Course](https://applied-genomics.dev/) that I teach in the Summer. The last time that I wrote much Snakemake(circa 2020), snakefmt didn't exist yet.

## Aside: Packaging up `snakefmt` with Nix

I've chosen the path less traveled, and use NixOS. Meaning I've sworn off using Conda, global pip installs, and other small conviences in the already narrow path that is using linux as a desktop environment.

While Snakemake itself is packaged up in nixpkgs, snakefmt hasn't made it to the most magical repo on GitHub yet.

Recently though I found a handy tool for quickly generating package derivations, [nix-init](https://github.com/nix-community/nix-init).

```
nix run github:nix-community/nix-init -- --url https://github.com/snakemake/snakefmt
```

It pulls in the version and the dependencies. ✨Automagically✨
## Apheleia

```emacs-lisp
(set-formatter! 'snakefmt '("snakefmt" "-") :modes '(snakemake-mode))
```
