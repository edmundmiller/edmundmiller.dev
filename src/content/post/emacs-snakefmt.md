---
title: Formatting Snakemake files Using snakefmt in Emacs
description: Formatting Snakemake files Using snakefmt in Emacs using Apheleia
draft: true
publishDate: "2024-06-10"
tags: ["emacs", "snakemake"]
series: "Snakeflow"
---

Dooms Emacs recently switched using [Apheleia](https://github.com/radian-software/apheleia) as it's default formatter, thanks to a huge effort from [Ellis Kenyő](https://elken.dev) to refactor the [format module](https://docs.doomemacs.org/latest/?#/modules/editor/format).

I've been writing a bit of [Snakemake](https://snakemake.github.io/) for the [Applied Genomics Course](https://applied-genomics.dev/) that I teach in the Summer. The last time that I wrote much Snakemake(circa 2020), [snakefmt](https://github.com/snakemake/snakefmt) didn't exist yet. It follows the design and specifications of Black.

## Aside: Packaging up `snakefmt` with Nix

I've chosen the path less traveled, and use NixOS. Meaning I've sworn off using Conda, global pip installs, and other small conviences in the already narrow path that is using linux as a desktop environment.

While Snakemake itself is packaged up in nixpkgs, snakefmt hasn't made it to the most magical repo on GitHub yet.

Recently though I found a handy tool for quickly generating package derivations, [nix-init](https://github.com/nix-community/nix-init).

```
nix run github:nix-community/nix-init -- --url https://github.com/snakemake/snakefmt
```

It pulls in the version and the dependencies, ✨Automagically✨.

```nix title="snakefmt.nix"
{ lib
, python3
, fetchFromGitHub
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

  pythonImportsCheck = [ "snakefmt" ];

  meta = with lib; {
    description = "The uncompromising Snakemake code formatter";
    homepage = "https://github.com/snakemake/snakefmt";
    changelog = "https://github.com/snakemake/snakefmt/blob/${src.rev}/CHANGELOG.md";
    license = licenses.mit;
    maintainers = with maintainers; [ edmundmiller ];
    mainProgram = "snakefmt";
  };
}
```

## Apheleia

```emacs-lisp
(set-formatter! 'snakefmt '("snakefmt" "-") :modes '(snakemake-mode))
```
