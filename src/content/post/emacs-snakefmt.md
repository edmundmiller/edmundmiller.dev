---
title: Formatting Snakemake in Doom Emacs with snakefmt
description: Connect the snakefmt executable to snakemake-mode through Doom Emacs and Apheleia with one formatter definition.
draft: false
publishDate: '2024-07-02'
tags: ['emacs', 'snakemake']
series: 'Snakeflow'
---

Doom Emacs can connect `snakefmt` to `snakemake-mode` with one `set-formatter!` form. The setup needs the `snakefmt` executable and Doom's [format module](https://docs.doomemacs.org/latest/?#/modules/editor/format), which uses [Apheleia](https://github.com/radian-software/apheleia).

I returned to [Snakemake](https://snakemake.github.io/) while teaching my [Applied Genomics course](https://applied-genomics.dev/) in summer 2024. When I last used Snakemake heavily around 2020, [snakefmt](https://github.com/snakemake/snakefmt) did not exist. Its Black-inspired formatting removed style decisions from the course examples.

## Installing snakefmt with Nix

In 2024, snakefmt was not yet available in nixpkgs. I used [nix-init](https://github.com/nix-community/nix-init) to generate a package definition for version 0.10.2:

```bash
nix run github:nix-community/nix-init -- --url https://github.com/snakemake/snakefmt
```

That generated derivation was specific to the old release, so I no longer recommend copying it. [snakefmt is now packaged in nixpkgs](https://github.com/NixOS/nixpkgs/blob/master/pkgs/by-name/sn/snakefmt/package.nix). A current Nix user can install that package directly.

## Apheleia

[Apheleia](https://github.com/radian-software/apheleia) runs installed formatter executables asynchronously after a save. It applies their changes while preserving the cursor position. [Ellis Kenyő](https://elken.dev) helped move Doom's format module to this shared interface.

Apheleia does not install snakefmt. Once `snakefmt` was on my `PATH`, this configuration connected it to `snakemake-mode`:

```emacs-lisp title="config.el"
(set-formatter! 'snakefmt '("snakefmt" "-") :modes '(snakemake-mode))
```

The form has three parts:

1. `snakefmt` names the formatter inside Doom.
2. `("snakefmt" "-")` sends the current buffer to snakefmt through standard input.
3. `snakemake-mode` limits the formatter to Snakefiles.

That single definition gave my Snakemake files the same format-on-save behavior as the rest of my Doom configuration.
