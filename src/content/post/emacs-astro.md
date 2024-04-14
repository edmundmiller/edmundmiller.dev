---
author: Edmund Miller
publishDate: "2024-04-09"
title: Setting up Doom Emacs for Astro
description: Astro is the Nextflow of web development
tags: ["Emacs", "webdev"]
draft: true
---

Okay, so Astro is the new hot new web framework on the block. All the cool kids are using it. I've recently drank the Kool-Aid and gone all in on it. Rewritten this website, partner's website, and of course rewritten its website on Astro. Rewritten my old rugby club's website. I'm moving my course website to Starlight, the teams documention framework. All in. Quick aside, the beauty of Astro is it's like the next flow of web frameworks. In parentheses, can you use a niche, a very niche programming language to describe a niche programming language? If not, look up what Nextflow is. Essentially what I mean is it allows you to wrap other web frameworks in a web framework rather than forcing you to pick one so you don't just have to pick React or Vue. You can have both in the same application. That's the beauty. That's why it's exciting. That's why it's like I don't care. I can use whatever hot web framework someone comes up with. So anyways, I wanted to hook you, Max, up to Astro. For now, I've just kind of been roughing it out there and writing prettier by itself and turn off save on format and auto-complete. It's been scary.

So, what do I want from Emacs? Oh, I need TreeSitter support, LSP support, because I need to know when I'm messing up. And I need my formatter to be working properly. I'm not wrapping my JSX in her Azure templates and quotes. Give me bugs that she's around for an hour. What I did know as well was I also wanted Tailwind CSS LSP support for bonus points.

## Treesitter Support

> Treesitter aside

As the old saying goes, there's an Emacs package for everything. So, of course, someone's already written one for Astro and TreeSitter.

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
(use-package! treesit-auto
  :config
  (global-treesit-auto-mode)
  (let (astro-recipe (make-treesit-auto-recipe
                       :lang 'astro
                       :ts-mode 'astro-ts-mode
                       :url "https://github.com/virchau13/tree-sitter-astro"
                       :revision "master"
                       :source-dir "src"))
    (add-to-list 'treesit-auto-recipe-list astro-recipe)))
```

Oh by the way

> !NOTE
> Make sure you have a working C compiler as cc in your PATH, since this needs to compile the grammars.

## `prettier-plugin-astro` in Emacs with Apheleia

From [Sorixelle's Emacs config](https://github.com/Sorixelle/dotfiles/blob/main/config/emacs-config.org#astro) I found the magic snippet that had prettier use `--parser=astro` in `.astro` files. ✨

```eslip
(set-formatter! 'prettier-astro
  '("npx" "prettier" "--parser=astro"
    (apheleia-formatters-indent "--use-tabs" "--tab-width" 'astro-ts-mode-indent-offset))
  :modes '(astro-ts-mode))
```

## Links

https://medium.com/@jrmjrm/configuring-emacs-and-eglot-to-work-with-astro-language-server-9408eb709ab0
