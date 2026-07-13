---
title: Reproducible Data Analysis with Emacs and Nix
description: A working design for running Org Babel analyses in a project Nix environment.
draft: true
publishDate: '04 Jan 2024'
tags: ['emacs', 'python', 'Nix']
---

I want to run Python and R analyses from Org mode without maintaining another editor setup. NixOS makes ad hoc package installation awkward by design. That constraint is useful when the environment belongs to the project.

The browser-based Jupyter interface also conflicts with my Emacs habits. For example, `C-w` closes a browser tab instead of deleting a word. I would rather keep the analysis, prose, and editor commands in one place.

## Three requirements

The setup needs to satisfy three requirements:

1. A project must declare its Python and R packages in a reproducible Nix environment.
2. The Org file must need only a few readable header arguments.
3. The same analysis must run from Emacs or a noninteractive command.

These requirements favor a small project around the Org document. They do not require embedding the entire Nix expression inside that document.

## Put the environment beside the analysis

A checked-in `flake.nix` can define the development shell. It can include Emacs, Python, R, and the required analysis packages. The lock file records the selected Nix inputs.

This structure also keeps environment changes visible in Git. Adding a library changes the project definition instead of an untracked global environment.

I would add this small `.envrc` file beside the flake:

```sh
use flake
```

[direnv](https://direnv.net/) loads the shell when a terminal enters the directory. In Emacs, [envrc](https://github.com/purcell/envrc) applies that environment to buffers in the project. Processes started from those buffers then receive the project environment.

This approach keeps the boundary simple. Nix defines the tools, direnv activates them, and Org Babel runs them.

## Keep the Org configuration short

Language-specific properties can set shared options once near the top of the Org file:

```org
#+title: Analysis
#+property: header-args:python :session *python* :results output
#+property: header-args:R :session *R* :results output
```

Each source block can then focus on code:

```org
#+begin_src python
import pandas as pd
print(pd.__version__)
#+end_src
```

The `:results output` setting captures printed output. A session keeps language state between blocks while I work interactively. File-specific options can still override either default.

Org supports other useful controls without adding editor plugins. Header arguments can cache results, write figures to files, or exclude setup code from exports. The [Org manual](https://orgmode.org/manual/Using-Header-Arguments.html) documents those options.

## Run the same document from the command line

The command-line path should enter the same Nix environment before starting Emacs:

```sh
nix develop --command emacs --batch \
  -l org -l ob-python -l ob-R analysis.org \
  --eval '(setq org-confirm-babel-evaluate nil)' \
  --eval '(org-babel-execute-buffer)'
```

Disabling confirmation is appropriate only for a trusted, version-controlled document. The command should fail in automation when a block fails. Its generated results can then feed the same export process used interactively.

A small wrapper script can hold this command. That gives a new project one obvious entry point without repeating batch options in documentation.

## Start from a small template

The reusable template only needs four pieces:

- `flake.nix` and `flake.lock` for the tools and packages
- `.envrc` for project activation
- `analysis.org` for prose, code, and results
- a script that executes the document in batch mode

This is enough structure to resume an analysis after months away. It also keeps the editor setup separate from the scientific environment.

The next step is to test this design with one mixed Python and R analysis. That test should verify interactive sessions, batch execution, figures, and exported results before this draft is published.

## References

- [Org Babel Python support](https://orgmode.org/worg/org-contrib/babel/languages/ob-doc-python.html)
- [Org Babel header arguments](https://orgmode.org/manual/Using-Header-Arguments.html)
- [Org Babel result handling](https://orgmode.org/manual/Results-of-Evaluation.html)
- [Org Babel code export](https://orgmode.org/manual/Exporting-Code-Blocks.html)
- [Nix development environments](https://nixos.org/manual/nixpkgs/stable/#sec-pkgs-mkShell)
- [envrc discussion about Org source blocks](https://github.com/purcell/envrc/issues/28)
