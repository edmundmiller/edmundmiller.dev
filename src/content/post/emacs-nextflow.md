---
title: Nextflow Emacs workflow
description: How I hack on Nextflow scripts using Emacs
draft: true
publishDate: 2024-06-14
tags: ["emacs", "nextflow"]
---

I was chatting with [David](https://dcgemperline.github.io/) at the recent Nextflow Summit in Boston about Emacs and comparing our various workflows. I thought I might turn this into a blog post after a question about [Emacs workflows on the Seqera discourse](https://community.seqera.io/t/what-is-your-nextflow-emacs-setup).

My workflow with Nextflow and Emacs typically consists of I will have an Emacs instance open locally with my project. I will hack on the source code there and make the changes to a file.

Then I just have a separate terminal open that I run `nextflow run . -profile test,docker ...` in. I've tried integrated terminals in Emacs but it's just always _slightly off_, so I don't bother. Typically just have workspaces open with a Browser in workspace 1, Emacs in workspace 2, and a terminal open in workspace 3.

If I'm working on something that needs a remote system like an HPC cluster, I use [emacs-ssh-deploy](https://github.com/cjohansson/emacs-ssh-deploy). On save it copies the file from my local machine to the directory on the server. Then I just have a terminal that's ssh'd into the system I'm working on to run `nextflow run . -profile ...`.

I've thought about writing a [Transient](https://magit.vc/manual/transient/) based launcher for [`nextflow-mode`](https://github.com/edmundmiller/nextflow-mode) like `snakemake-mode` has added, but I've always found those to be brittle with the terminal output as well. I wrote [one for the NodeJS framework, Jest](https://github.com/edmundmiller/emacs-jest), but haven't used it too much myself.

I try to keep it simple so that Emacs could be easily replaced by Neovim, Helix, Zed, whatever. In terms of the rest of the Emacs setup, I've used [Doom Emacs](https://github.com/doomemacs/doomemacs) since 2018([Henrik](https://henrik.io/) really inspired my love of modules, and most of my development workflow), and have [my .doom.d](https://github.com/edmundmiller/.doom.d) on GitHub.
