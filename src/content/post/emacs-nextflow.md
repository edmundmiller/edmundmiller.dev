---
title: Nextflow Emacs Workflow
description: How I hack on Nextflow scripts using Emacs
draft: false
publishDate: 2024-06-14
tags: ['emacs', 'nextflow']
---

At the 2024 Nextflow Summit in Boston, [David](https://dcgemperline.github.io/) and I compared our Emacs workflows. A related question on [Seqera Discourse](https://community.seqera.io/t/what-is-your-nextflow-emacs-setup) prompted me to document mine.

For local work, I edit the project in Emacs and run `nextflow run . -profile test,docker ...` in a separate terminal. Integrated terminals in Emacs have always felt slightly off to me. I keep a browser, Emacs, and the terminal in three workspaces instead.

For work on an HPC cluster, I use [emacs-ssh-deploy](https://github.com/cjohansson/emacs-ssh-deploy). When I save a file, it copies that file over SFTP to the matching remote directory. I open a separate SSH session and run `nextflow run . -profile ...` there.

I considered adding a [Transient](https://magit.vc/manual/transient/) launcher to [`nextflow-mode`](https://github.com/edmundmiller/nextflow-mode). `snakemake-mode` had a similar launcher. In my experience, connecting launchers to terminal output added fragile integration that I did not want to maintain. I had built [an Emacs launcher for Jest](https://github.com/edmundmiller/emacs-jest) and rarely used it.

The separation is useful beyond Emacs. Editing, file transfer, and execution remain independent steps. Replacing Emacs with Neovim, Helix, or Zed would change only the editor.

I have used [Doom Emacs](https://github.com/doomemacs/doomemacs) since 2018.[^1] My [Doom configuration is available on GitHub](https://github.com/edmundmiller/.doom.d). These are the only Nextflow-specific pieces:

The Nextflow specific parts of my config:

```elisp title="packages.el"
(package! nextflow-mode :recipe (:host github :repo "edmundmiller/nextflow-mode"))
```

```elisp title="config.el"
(use-package! nextflow-mode
  :config
  (set-docsets! 'nextflow-mode "Groovy"))
```

[^1]: [Henrik](https://henrik.io/) inspired my use of modules throughout this development workflow.
