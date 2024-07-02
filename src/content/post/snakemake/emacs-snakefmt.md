---
title: Formatting Snakemake files Using snakefmt in Emacs
description: Formatting Snakemake files Using snakefmt in Emacs using Apheleia
draft: true
publishDate: "2024-06-10"
tags: ["emacs", "snakemake"]
---

Dooms Emacs recently switched using Apheleia as it's default formatter, thanks to a huge effort from [Ellis Kenyő](https://elken.dev) to refactor the format module.

I've been writing a bit of Snakemake for the [Applied Genomics Course](https://applied-genomics.dev/) that I teach in the Summer. The last time that I wrote much Snakemake(circa 2020), snakefmt didn't exist yet.

## Aside: Packaging up `snakefmt` with Nix

nix-init

## Apheleia

```emacs-lisp
(set-formatter! 'snakefmt '("snakefmt" "-") :modes '(snakemake-mode))
```
