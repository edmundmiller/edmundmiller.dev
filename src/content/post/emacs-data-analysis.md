---
title: Using Emacs for Data Analysis on NixOS
description: TODO
draft: true
publishDate: "04 Jan 2024"
tags: ["emacs", "python", "Nix"]
---

I'm writing this post to try to figure out what pain points I'm having with using Org-mode or Jupyter in Emacs.

I've tried to use VSCode for this, or the Jupyter web page. With the former, I'm always inundated with messages of "This plugin is out of date", "Syncing failed", and suffering from death by a thousand paper-cuts everytime I try to hit `ESC` to go to normal mode(It just doesn't seem to work right). The later, I just keep accidentally closing the tab every-time I hit `C-w` when I make a typo.

Sure, I could shave these yaks, but I already have a whole herd of yaks in my Emacs config that are well groomed.

## What are my issues?

So NixOS has this thing where it doesn't let Python and R just go around and do their thing, installing packages here, there, and everywhere.

I've mostly gotten around those pain points with arguably better ways of doing things those tasks are trying to accomplish.

But org-mode isn't always as clever.

I also really like projects to be self-contained. Sometimes I'll leave them for a while, and I want it to be easy to pick them back up and not end up trying to reproduce the whole system.

1. I want a Nix shell for the project, with an easy and clear way to pull in more Python and R packages as the analysis progresses. It should be simple an clear what's going on. It doesn't need to cover every persons use-case ever, just mine.
2. A template for a new analysis.
3. Ideally I'd like this all contained within the org file itself.
4. A way to quickly rerun the analysis from the command line so I can walk away.
5. Minimal boilerplate in the org file. The header shouldn't be a web of illegible nix, and every `src` block shouldn't go off the page with options.

# Links

https://michaelneuper.com/posts/replace-jupyter-notebook-with-emacs-org-mode/
https://orgmode.org/worg/org-contrib/babel/examples/data-collection-analysis.html
https://discourse.nixos.org/t/nix-shells-in-emacs-org-mode-source-blocks/12673
https://github.com/shlevy/nix-buffer
https://github.com/AntonHakansson/org-nix-shell
