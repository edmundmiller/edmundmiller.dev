---
author: Edmund Miller
publishDate: "2024-04-09"
title: Setting up Doom Emacs for Astro
description: The beauty of Astro is it's like the Nextflow of web frameworks
tags: ["Emacs", "webdev", "Astro"]
draft: true
---

[Astro](https://astro.build/) is the new hot new web framework on the block. All the cool kids are using it. I've recently given up, drank the Kool-Aid, and gone all in on it.

I've rewritten this website, [my partner's website](https://monimiller.com/), my university rugby club's website. I'm moving my _Applied Genomics_ course website to [Starlight](https://monimiller.com/), the Astro team's documentation framework. The [nf-core site](https://github.com/nf-core/website) has been rewritten in it from PHP. _I'm all in_.

The beauty of Astro is it's the [Nextflow](https://www.nextflow.io) of web frameworks.[^1] It allows you to wrap other UI Frameworks in a web framework rather than forcing you to pick one so you don't just have to pick React, Vue, or Svelte. You can have them all in the same application. You can just use [HTML components](https://docs.astro.build/en/basics/astro-components/#html-components). That's the beauty. That's why it's exciting. That's why I think it'll stick around.

So anyways, I wanted to hook up Emacs with Astro support. For now, I've just been roughing it out there and running [Prettier](https://prettier.io/) by itself and turning off save on format and auto-complete. It's been scary.

What I'm seeking from Emacs is multifaceted: Tree-sitter support, LSP (Language Server Protocol) support—to alert me of any missteps—and a fully functional formatter. A frustrating hour was lost to Prettier misconstruing my Astro templates by wrapping them in quotes—a bug I could have done without. And while we're at it, add Tailwind CSS LSP support into the mix for good measure.

## Astro Tree-sitter Support

<!-- FIXME :::important -->

> Tree-sitter is an incremental parsing system for programming tools.
> Find out more about it on the [project's website](https://tree-sitter.github.io/tree-sitter/)!

<!-- ::: -->

As the old saying goes, there's an Emacs package for everything. So, of course, someone's already written one for Astro and Tree-sitter.

Setup for `astro-ts-mode` appears simple:

```elisp title="package.el"
(package! astro-ts-mode)
```

```elisp title="config.el"
(use-package! astro-ts-mode
  :after treesit-auto)
```

But wait there's [more](https://github.com/Sorixelle/astro-ts-mode?tab=readme-ov-file#setup)!

> Because this major mode is powered by Tree-sitter, it depends on an external grammar to provide a syntax tree for Astro templates. To set it up, you’ll need to set treesit-language-source-alist to point to the correct repositories for each language.

You can choose to set it up and run `treesit-install-language-grammar` for astro tsx and css.

Or you can take the red pill and use [treesit-auto](https://github.com/renzmann/treesit-auto) and automatically install the language grammar.

In case this your first Edmund experience, two things you should know. I love to automate things and I love a good rabbit hole.

### treesit-auto

There was [a tip](https://github.com/Sorixelle/astro-ts-mode/issues/5) from [Ian S. Pringle](https://github.com/ispringle)(Who owns both a farm and a digital garden!).

[Ruby Juric](https://github.com/Sorixelle/astro-ts-mode)(the author of `astro-ts-mode`) converted the snippet to use `let` to avoid creating a global variable.

```elisp title=config.el
(use-package! astro-ts-mode
  :config
  (global-treesit-auto-mode)
  (let ((astro-recipe (make-treesit-auto-recipe
                       :lang 'astro
                       :ts-mode 'astro-ts-mode
                       :url "https://github.com/virchau13/tree-sitter-astro"
                       :revision "master"
                       :source-dir "src")))
    (add-to-list 'treesit-auto-recipe-list astro-recipe)))
```

I think this worked for me. I had built it manually with `treesit-auto` before.

Oh by the way

> !NOTE
> Make sure you have a working C compiler as cc in your PATH, since this needs to compile the grammars.

## Emacs lsp-mode and Astro Language-server

The official Astro editor docs link to [an article](https://medium.com/@jrmjrm/configuring-emacs-and-eglot-to-work-with-astro-language-server-9408eb709ab0) with instructions to configure eglot, but there's no equivalent one for lsp-mode.

```bash
npm i -g @astrojs/language-server
```

I just had to add a hook to `astro-ts-mode` and it pulled right up.

```elisp title=config.el
(use-package! astro-ts-mode
  :after treesit-auto
  :init
  (when (modulep! +lsp)
    (add-hook 'astro-ts-mode-hook #'lsp! 'append))
  :config
;; ...
```

## `prettier-plugin-astro` in Emacs with Apheleia

From [Sorixelle's Emacs config](https://github.com/Sorixelle/dotfiles/blob/main/config/emacs-config.org#astro) I found the magic snippet that had prettier use `--parser=astro` in `.astro` files. ✨

```eslip title=config.el
(set-formatter! 'prettier-astro
  '("npx" "prettier" "--parser=astro"
    (apheleia-formatters-indent "--use-tabs" "--tab-width" 'astro-ts-mode-indent-offset))
  :modes '(astro-ts-mode))
```

## Tailwind CSS IntelliSense in Emacs

Of course there's already a package for [TailwindCSS using LSP](https://github.com/merrickluo/lsp-tailwindcss). With Doom Emacs installation instructions as well!

```elisp title="config.el" {"1. Launch the LSP in add-on-mode":4-5} {"2. Launch lsp-tailwindcss in astro-ts-mode":7-8}
(use-package! lsp-tailwindcss
  :when (modulep! +lsp)
  :init

  (setq! lsp-tailwindcss-add-on-mode t)
  :config

  (add-to-list 'lsp-tailwindcss-major-modes 'astro-ts-mode))
```

[^1]: Did I really just compare a very niche DSL to describe a niche programming language?
