---
author: Edmund Miller
publishDate: '2024-04-19'
title: Setting up Doom Emacs for Astro Development
description: How I configured Doom Emacs for Astro syntax parsing, language-server support, formatting, and Tailwind completion.
tags: ['Emacs', 'webdev', 'Astro']
draft: false
---

I use [Astro](https://astro.build/) for this site, [my partner's site](https://monimiller.com/), and several other projects. I needed dependable Astro support in Doom Emacs.

The setup had four requirements:

1. Tree-sitter parsing for `.astro` files.
2. Language-server diagnostics and completion.
3. Prettier formatting that understood Astro templates.
4. Tailwind CSS completion.

Plain Prettier had wrapped parts of my Astro templates in quotes because it used the wrong parser. Disabling format-on-save avoided damage, but it also removed useful feedback. The following setup restored those editor features.

> This records my April 2024 lsp-mode setup. The original `astro-ts-mode` GitHub repository and standalone `lsp-tailwindcss` package were later archived. Check their current project pages before copying the configuration.

## Astro Tree-sitter Support

[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) gives editors a syntax tree for source code. [`astro-ts-mode`](https://github.com/Sorixelle/astro-ts-mode) used that tree to provide an Astro major mode.

I first installed the package and loaded it after `treesit-auto`:

```elisp title="packages.el"
(package! astro-ts-mode)
```

```elisp title="config.el"
(use-package! astro-ts-mode
  :after treesit-auto)
```

The major mode also needed the Astro Tree-sitter grammar. I used [treesit-auto](https://github.com/renzmann/treesit-auto) to install it. [Ian S. Pringle](https://github.com/ispringle) proposed the recipe, and `astro-ts-mode` author [Ruby Juric](https://github.com/Sorixelle) refined it:

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

Running `treesit-install-language-grammar` manually was another option. Both paths required a working C compiler because Emacs compiled the grammar locally.

## Emacs lsp-mode and Astro Language-server

The [Astro editor documentation](https://docs.astro.build/en/editor-setup/) links to an Emacs setup using Eglot. I used Doom's lsp-mode integration instead.

```bash
npm i -g @astrojs/language-server
```

After installing the Astro language server, I added lsp-mode to the `astro-ts-mode` hook:

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

Astro formatting requires local copies of Prettier and `prettier-plugin-astro`:

```bash
npm install --save-dev --save-exact prettier prettier-plugin-astro
```

[Ruby Juric's Emacs config](https://github.com/Sorixelle/dotfiles/blob/main/config/emacs-config.org#astro) showed how to pass `--parser=astro` through Apheleia:

```elisp title=config.el
(set-formatter! 'prettier-astro
  '("npx" "prettier" "--parser=astro"
    (apheleia-formatters-indent "--use-tabs" "--tab-width" 'astro-ts-mode-indent-offset))
  :modes '(astro-ts-mode))
```

## Tailwind CSS completion

My 2024 configuration used the separate [`lsp-tailwindcss`](https://github.com/merrickluo/lsp-tailwindcss) package in add-on mode. That repository is now archived because Tailwind support moved into lsp-mode. Current users should configure lsp-mode's built-in Tailwind client instead.

## Conclusion

The finished setup parsed Astro syntax and supplied diagnostics and completion. It also restored Astro-aware formatting and Tailwind suggestions. My [Doom Emacs Astro module](https://github.com/edmundmiller/.doom.d/tree/main/modules/lang/astro) preserves the complete 2024 configuration.

## Related next steps

If the Emacs and Astro crossover is what brought you here, these are good follow-ups:

<ul>
  <li>
    <a href="/posts/emacs-nextflow/" data-goatcounter-event="emacs-astro-next-emacs-nextflow">
      Read about my Emacs setup for Nextflow
    </a>
  </li>
  <li>
    <a href="/posts/openring-astro/" data-goatcounter-event="emacs-astro-next-openring">
      See another Astro site-building note
    </a>
  </li>
  <li>
    <a href="/stack/" data-goatcounter-event="emacs-astro-next-stack">
      Browse the rest of my software stack
    </a>
  </li>
</ul>
