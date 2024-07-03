---
title: Formatting Snakemake using snakefmt in Emacs using Apheleia
description: Learn how to set up snakefmt, the code formatter for Snakemake, in Doom Emacs using the Apheleia package. This post covers installing snakefmt with Nix, configuring it in Doom Emacs, and provides an overview of how Apheleia aims to simplify formatting code across languages in Emacs.
draft: false
publishDate: "2024-07-02"
tags: ["emacs", "snakemake"]
series: "Snakeflow"
---

Dooms Emacs recently switched to using [Apheleia](https://github.com/radian-software/apheleia) as it's default formatter, thanks to a huge effort from [Ellis Kenyő](https://elken.dev) to refactor the [format module](https://docs.doomemacs.org/latest/?#/modules/editor/format).

I've been writing a bit of [Snakemake](https://snakemake.github.io/) for the [Applied Genomics Course](https://applied-genomics.dev/) that I teach in the Summer. The last time that I wrote much Snakemake(circa 2020), [snakefmt](https://github.com/snakemake/snakefmt) didn't exist yet. It follows the design and specifications of Black.

## Aside: Packaging up `snakefmt` with Nix

I've chosen the path less traveled, and use NixOS. Meaning I've sworn off using Conda, global pip installs, and other small conviences in the already narrow path that is using linux as a desktop environment.

While Snakemake itself is packaged up in nixpkgs, snakefmt hasn't made it to the most magical repo on GitHub yet.

Recently though I found a handy tool for quickly generating package derivations, [nix-init](https://github.com/nix-community/nix-init).

```sh
nix run github:nix-community/nix-init -- --url https://github.com/snakemake/snakefmt
```

It pulls in the version and the dependencies, ✨Automagically✨.

```nix title="snakefmt.nix"
{
  lib,
  python3,
  fetchFromGitHub,
}:
python3.pkgs.buildPythonApplication rec {
  pname = "snakefmt";
  version = "0.10.2";
  pyproject = true;

  src = fetchFromGitHub {
    owner = "snakemake";
    repo = "snakefmt";
    rev = "v${version}";
    hash = "sha256-Sp48yedUiL8NCF7WF9QdvaOGocPXIBZ5bXXj7r4RVIM=";
  };

  nativeBuildInputs = [
    python3.pkgs.poetry-core
  ];

  propagatedBuildInputs = with python3.pkgs; [
    black
    click
    importlib-metadata
    toml
  ];

  pythonImportsCheck = ["snakefmt"];

  meta = with lib; {
    description = "The uncompromising Snakemake code formatter";
    homepage = "https://github.com/snakemake/snakefmt";
    changelog = "https://github.com/snakemake/snakefmt/blob/${src.rev}/CHANGELOG.md";
    license = licenses.mit;
    maintainers = with maintainers; [edmundmiller];
    mainProgram = "snakefmt";
  };
}
```

## Apheleia

There are tons of code formatters out there. There's usually multiple for popular languages. Everyone's got an opinion on what style to use.

Apheleia aims to remove specific Emacs packages for formatters. It's goal is to have one interface to run all of your formatters from Emacs.

> running a code formatter on save suffers from the following two problems:

>    1. It takes some time (e.g. around 200ms for Black on an empty file), which makes the editor feel less responsive.
>    2. It invariably moves your cursor (point) somewhere unexpected if the changes made by the code formatter are too close to point's position.

> Apheleia is an Emacs package which solves both of these problems comprehensively for all languages, allowing you to say goodbye to language-specific packages such as Blacken and prettier-js.

The main opinion everyone shares is that a good code formatter should be fast, and therefore you should be able to forget about it.

It's really simple to configure formatters in [Doom Emacs](https://github.com/doomemacs/doomemacs).

```emacs-lisp title="config.el"
(set-formatter! 'snakefmt '("snakefmt" "-") :modes '(snakemake-mode))
```

The `set-formatter!` macro takes:
1. The name you want to give the formatter
`snakefmt`
2. The command you want ran (`--quiet` is used here often)
`snakefmt -`
3. The modes you want associated with the formatter
`snakemake-mode`

Another example for [Alejandra](https://github.com/kamadorueda/alejandra) for Nix.

```emacs-lisp title="config.el"
;;; :lang nix
(set-formatter! 'alejandra '("alejandra" "--quiet") :modes '(nix-mode))
```
