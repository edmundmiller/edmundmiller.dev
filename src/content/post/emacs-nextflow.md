---
title: Nextflow Emacs Workflow
description: How I hack on Nextflow scripts using Emacs
draft: false
publishDate: 2024-06-14
tags: ["emacs", "nextflow"]
---

I was chatting with [David](https://dcgemperline.github.io/) at the recent Nextflow Summit in Boston about Emacs and comparing our various workflows. I thought I might turn this into a blog post after a question about [Emacs workflows on the Seqera discourse](https://community.seqera.io/t/what-is-your-nextflow-emacs-setup).

When working with Nextflow and Emacs, my typical workflow involves having a local Emacs instance open with my project. I make changes to the source code within Emacs and run `nextflow run . -profile test,docker ...` in a separate terminal. I've tried integrated terminals in Emacs but it's just always _slightly off_, so I don't bother. Typically just have workspaces open with a Browser in workspace 1, Emacs in workspace 2, and a terminal open in workspace 3.

For projects that require a remote system, such as an HPC cluster, I utilize [emacs-ssh-deploy](https://github.com/cjohansson/emacs-ssh-deploy). This tool automatically copies the file from my local machine to the appropriate directory on the server upon saving using `sftp`. To execute Nextflow, I simply ssh into the remote system and run `nextflow run . -profile ...` in a terminal.

I have considered developing a [Transient](https://magit.vc/manual/transient/)-based launcher for [`nextflow-mode`](https://github.com/edmundmiller/nextflow-mode), similar to the one added to `snakemake-mode`. However, I have found these launchers to be fragile when dealing with terminal output. [I even created one for the NodeJS framework, Jest](https://github.com/edmundmiller/emacs-jest), but have not used it extensively myself.

My goal is to keep my workflow simple and flexible, allowing for easy substitution of Emacs with other editors like Neovim, Helix, or Zed. As for my Emacs setup, I have been using [Doom Emacs](https://github.com/doomemacs/doomemacs) since 2018 [^1], and [my .doom.d configuration is available on GitHub](https://github.com/edmundmiller/.doom.d).

[^1]: [Henrik](https://henrik.io/) really inspired my love of modules, and most of my development workflow.
