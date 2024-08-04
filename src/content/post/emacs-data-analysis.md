---
title: Harnessing the Power of Emacs for Data Analysis on NixOS
description: >
    In this blog post, we explore the powerful combination of using Emacs, the highly extensible text editor, for data analysis tasks while using the NixOS operating system.
draft: true
publishDate: "04 Jan 2024"
tags: ["emacs", "python", "Nix"]
---

I'm writing this post to try to figure out what pain points I'm having with using Org-mode or Jupyter in Emacs.

I've tried to use VSCode for this, or the Jupyter web page. With the former, I'm always inundated with messages of "This plugin is out of date", "Syncing failed", and suffering from death by a thousand paper-cuts everytime I try to hit `ESC` to go to normal mode(It just doesn't seem to work right). The later, I just keep accidentally closing the tab every-time I hit `C-w` when I make a typo.

Sure, I could shave these yaks, but I already have a whole herd of yaks in my Emacs config that are well groomed.

## What are my issues?

So NixOS has this thing where it doesn't let Python and R just go around and do their thing, installing packages here, there, and everywhere.

I've mostly gotten around those pain points with arguably better ways of doing things those tasks are trying to accomplish[^12].

But org-mode isn't always as clever.

I also really like projects to be self-contained. Sometimes I'll leave them for a while, and I want it to be easy to pick them back up and not end up trying to reproduce the whole system.

1. I want a Nix shell for the project, with an easy and clear way to pull in more Python and R packages as the analysis progresses. It should be simple an clear what's going on. It doesn't need to cover every persons use-case ever, just mine.
2. Ideally I'd like this all contained within the org file itself.
3. Minimal boilerplate in the org file. The header shouldn't be a web of illegible nix, and every `src` block shouldn't go off the page with options.
4. A way to quickly rerun the analysis from the command line so I can walk away.
5. A template for a new analysis.
6. What are all the cool org-mode things I can do?

## Nix Shell and Org Mode

[^1] https://discourse.nixos.org/t/nix-shells-in-emacs-org-mode-source-blocks/12673

[^5]: https://nixos.org/guides/nix-pills/10-developing-with-nix-shell

[^2]: https://github.com/AntonHakansson/org-nix-shell

[^3]: https://www.arcadianvisions.com/blog/2018/org-nix-direnv.html

[^4]: https://matthewbauer.us/blog/nix-and-org.html

<!-- Also mentioned https://github.com/shlevy/nix-buffer -->

This turned out to be surprisingly easy. I found a thread of the NixOS Dicourse with my kind of people in it.[^1]

### Contained within the org file

### direnv and org-mode

https://github.com/purcell/envrc/issues/28

### Minimal Boilerplate

## Rerunning the Analysis

https://michaelneuper.com/posts/replace-jupyter-notebook-with-emacs-org-mode/
Integrating with external tools and libraries
Bonus: Importing existing Jupyter Notebooks into Org Mode

## Template

<!-- TODO Propably gonna be a nix flake init -->
<!-- TODO Maybe a quick org-mode template? -->

## Cool Org Mode tricks

https://orgmode.org/worg/org-contrib/babel/languages/ob-doc-python.html

# Literature Review

## Replacing Jupyter with Org Mode

[^5]: https://michaelneuper.com/posts/replace-jupyter-notebook-with-emacs-org-mode/

[^6]: https://orgmode.org/worg/org-contrib/babel/examples/data-collection-analysis.html

#### Nix Shell and Python

https://github.com/the-nix-way/dev-templates/blob/main/python/flake.nix
https://gist.github.com/bb010g/8a28a7d1fcdb021b42d1da71d2429a4b#venvshellhookshell
https://nixos.org/manual/nixpkgs/stable/#ad-hoc-temporary-python-environment-with-nix-shell

<!-- https://emacs.stackexchange.com/questions/17926/python-org-mode-source-block-output-is-always-none -->

#### Python and Org Mode

[^13]:
    Needed `:results output`
    https://orgmode.org/worg/org-contrib/babel/languages/ob-doc-python.html

## Org Mode Code Blocks

[^7]: https://orgmode.org/manual/Using-Header-Arguments.html

[^8]: https://orgmode.org/manual/Environment-of-a-Code-Block.html

[^9]: https://orgmode.org/manual/Evaluating-Code-Blocks.html#Cache-results-of-evaluation-1

[^10]: https://orgmode.org/manual/Results-of-Evaluation.html

[^11]: https://orgmode.org/manual/Exporting-Code-Blocks.html

[^12]: https://discourse.nixos.org/t/why-is-it-so-hard-to-use-a-python-package/19200

https://github.com/doomemacs/doomemacs/issues/2416`
