---
title: Packaging CatGPT with Nix
description: How nix-init generated my first Go package derivation, what still needed manual repair, and how I verified it later.
draft: true
publishDate: '04 Jan 2024'
tags: ['ai', 'nix']
---

In January 2024, I wanted [`catgpt`](https://github.com/ibuildthecloud/catgpt) in my Nix configuration. The small Go CLI sends a prompt or standard input to an OpenAI-compatible API.

This post reconstructs the work from two commits in my dotfiles. I did not save the original build error. In July 2026, I rebuilt the same derivation and ran its help command to check that it still produced a working binary.

## Generating the first derivation

I used [`nix-init`](https://github.com/nix-community/nix-init) against the CatGPT repository. It selected `buildGoModule`, pinned release `0.0.1`, and filled the source hash and package metadata.

```nix
{
  lib,
  buildGoModule,
  fetchFromGitHub,
}:
buildGoModule rec {
  pname = "catgpt";
  version = "0.0.1";

  src = fetchFromGitHub {
    owner = "ibuildthecloud";
    repo = "catgpt";
    rev = "v${version}";
    hash = "sha256-2smt7C8YK2qPuUChmfDhWYYG2poxz/W5qXBgUtJLEIk=";
  };

  vendorHash = "sha256-0K2aq0jmbaVfK0TosAYpkQOQDpyn8LNeJVqY62Zzt+A=";

  ldflags = ["-s" "-w"];

  meta = with lib; {
    description = "CLI for sending prompts to an OpenAI-compatible API";
    homepage = "https://github.com/ibuildthecloud/catgpt";
    license = licenses.asl20;
    mainProgram = "catgpt";
  };
}
```

`vendorHash` pins the downloaded Go modules. The placeholder from `nix-init` failed with the expected hash mismatch, and Nix reported the value that belonged in the derivation.

## Handling the Go version

The upstream `go.mod` required Go 1.21.5, while my Nix package supplied 1.21.4. I added this patch on the same day:

```nix
# HACK: historical workaround from January 2024
prePatch = ''
  sed -i 's,go 1.21.5,go 1.21.4,' go.mod
'';
```

The patch only made the declared versions agree. It did not prove that Go 1.21.4 supported every feature required by the project. Updating the Go toolchain would have been safer. Another option was proving the lower version through upstream tests.

## Fresh verification

I rebuilt the derivation without creating a result symlink:

```bash
nix build --no-link --print-out-paths .#catgpt
```

The build completed on July 12, 2026, and returned a `catgpt-0.0.1` store path. Running `catgpt --help` listed the API key, base URL, model, and help flags without making a paid API request.

`nix-init` handled the package structure, source pin, and most metadata. I still had to supply the dependency hash and diagnose the toolchain mismatch. That boundary was the useful lesson from packaging my first Go program with Nix.
