---
author: Edmund Miller
title: How This Site Was Made
publishDate: 'Aug 17 2023'
description: How Org mode, Nix, and Cloudflare Pages powered the 2023 version of this site
tags: ['Emacs', 'blog', 'meta', 'org-mode']
draft: true
---

In 2023, I built this site from Org files. Emacs exported static HTML, Nix
provided the build tools, and GitHub Actions deployed the result to Cloudflare
Pages.

# Choosing the publishing path

Ethan Post's article about
[how his website was made](https://notes.ethancpost.com/how_this_website_is_made.html)
prompted this version of my site. I considered publishing directly to
Cloudflare R2, but the implementation used Cloudflare Pages.

I chose `org-publish` to turn the Org source into a static site. The publishing
script handled pages, blog posts, the RSS feed, and static assets. Every project
wrote its output to `dist`.

# One environment for local builds and CI

The Nix flake supplied Emacs 29 and Openring. Devenv exposed a `build-site`
command that ran Emacs in batch mode with `publish.el`.

I based the script pattern on Determinate Systems'
[zero-to-nix flake](https://github.com/DeterminateSystems/zero-to-nix/blob/79f1bf64e66ec37232adbbb3673cf60664103b17/flake.nix#L60).
Their Nix installer, cache, and flake checker also informed the GitHub Actions
setup.

The workflow installed Nix, entered the development environment, and ran the
same batch export used locally. It then deployed the `dist` directory to
Cloudflare Pages.

# Generating the Openring section

I wanted the home page to include recent posts from sites I followed. The
[Openring integration by nixing.mx](https://nixing.mx/posts/integrating-openring-into-a-blog.html)
and [another implementation by The Dronely](https://www.thedroneely.com/posts/webrings-with-openring/)
showed how to generate that section. Drew DeVault's
[blog invitation](https://drewdevault.com/make-a-blog) supplied the broader
motivation.

The home page contained a shell block that ran Openring against three feeds.
Org Babel exported the command's HTML result directly into the page. Nix made
the Openring executable available both locally and in CI.

# Fixing the CI export

The Openring block worked inside interactive Emacs but failed during the CI
export with this message:

```text
Evaluation of this bash code block is aborted.
```

Loading Org Babel's shell support was necessary, but it did not resolve the
batch failure. Interactive Emacs could ask for permission before evaluating
the block. The batch process could not answer that prompt.

The publishing script fixed both parts explicitly:

```elisp
(setq org-confirm-babel-evaluate nil)
(org-babel-do-load-languages
 'org-babel-load-languages
 '((emacs-lisp . t)
   (shell . t)))
```

Disabling the prompt was acceptable for this build because it exported source
controlled in the repository. The
[Org Babel shell documentation](https://orgmode.org/worg/org-contrib/babel/languages/ob-doc-shell.html)
and a
[Stack Overflow answer about export evaluation](https://stackoverflow.com/questions/22668112/how-to-evaluate-all-code-blocks-when-exporting-in-emacs-org-mode)
helped identify the missing confirmation setting.

# Result

The final pipeline used one Nix environment for Emacs and Openring. Org
generated the complete static site, and Cloudflare Pages published the same
`dist` output produced by the local build.

R2 remained an early idea rather than part of this implementation. The useful
result was a repeatable Org export with the Openring content included.
