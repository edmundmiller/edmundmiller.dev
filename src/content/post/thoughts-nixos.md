---
author: Edmund Miller
publishDate: '2020-03-15T09:53Z'
title: Thoughts on NixOS
tags: ['nixos', 'linux']
description: What I liked about NixOS in 2020, where it was difficult, and why Nix shells became useful for development.
---

> This post describes my NixOS experience in March 2020. Commands and project details may have changed since then.

NixOS let me describe an operating system in configuration instead of changing it by hand. Most packages used their defaults. When I needed a different feature, I could express that choice in the package definition:

```nix
(polybar.override {
  mpdSupport = true;
  pulseSupport = true;
  nlSupport = true;
})
```

This override enabled MPD, PulseAudio, and network support in Polybar. The choice lived beside the rest of my system configuration.

## Rollbacks made experiments safer

Each NixOS rebuild created a system generation. The boot menu kept earlier generations available. If a new kernel or configuration failed, I could boot the previous one and undo the change.

That made system experiments less risky. It also made the current state easier to explain because the configuration recorded how I built it.

## The learning cost

NixOS still required me to learn the Nix language and some functional programming ideas. Its command-line tools also exposed the project's history. I used separate commands such as `nix-shell`, `nixos-install`, `nixos-rebuild`, and `nix-env`.

The system was consistent after I understood those parts. Reaching that point took more work than installing packages on a conventional Linux distribution.

## Reproducible visual customization

Linux users often call extensive visual customization “ricing.” NixOS moved that work from copied files and manual symlinks into reusable modules.

I followed a modular dotfiles setup that separated each theme from the window-manager logic. I could apply one theme to several window managers without repeating their configuration. My own [dotfiles repository](https://github.com/Emiller88/dotfiles) used the same idea.

This did not remove the design work. It made a finished design easier to reproduce on another machine.

## How Guix differed

GNU Guix addressed two problems differently. It used Guile Scheme instead of the Nix language. It also grouped more operations under the `guix` command, which made related commands easier for me to discover.

Guix followed stricter free-software rules than NixOS. That policy was a factual project difference. Whether it was helpful depended on the hardware and packages a user needed.

I preferred Scheme's syntax, but NixOS had the package coverage I wanted. That was my practical reason for staying with NixOS in 2020.

## Development shells were the lasting benefit

Nix and Guix could also create development environments on other Linux distributions and macOS. This became more useful to me than configuring the operating system.

One project required Node.js 10. I did not need to install it globally or manage several versions on my `PATH`. I opened a temporary shell instead:

```bash
nix-shell -p nodejs-10_x
```

The steps were simple:

1. Nix downloaded the requested package and its dependencies.
2. The shell exposed that Node.js version.
3. Exiting the shell returned me to my normal environment.

A project could record the same packages in a Nix expression. Teammates could then enter an equivalent shell. With `direnv`, entering the project directory could load that environment automatically.

NixOS asked me to learn a new language and toolset. In return, it made system changes reversible and development environments reproducible. The development shells became the part I used most.
