---
author: Edmund Miller
publishDate: '2023-12-15T11:00Z'
title: Using age with org-journal
description: How I replaced a broken GPG journal workflow with age while keeping org-journal and my existing SSH key.
draft: false
tags: ['Emacs', 'org-mode', 'age']
---

## The problem

In 2023, [GnuPG 2.4.1 broke EasyPG](https://dev.gnupg.org/T6481) in my setup. Emacs hung whenever it saved my encrypted journal.

## Why I rejected the GPG workarounds

An `fset` workaround restored saving, but I had to run it in every Emacs instance. A report about [losing access to encrypted files](https://www.reddit.com/r/emacs/comments/18d6fmt/how_to_lock_yourself_out_of_a_gpg_encrypted_file/) also reduced my confidence in continuing with an ad hoc fix.

NixOS also marked `lib-gcrypt` as broken with the `gnupg22` package I used at the time. Overriding that safety check did not seem appropriate for an encrypted journal.

I chose to replace GPG instead of working around both failures.

## Why [age](https://github.com/FiloSottile/age)?

I already used [age](https://github.com/FiloSottile/age) through [agenix](https://github.com/ryantm/agenix), after seeing it in [Henrik's dotfiles](https://github.com/hlissner/). The k8s@home template had also [moved from GPG to age](https://github.com/onedr0p/flux-cluster-template/pull/153).

Two age features mattered here. Its command-line interface was small, and it could encrypt to my existing SSH public key. I did not need another key-management system for one journal.

## Why still org-journal?

I considered moving to [org-roam-dailies](https://www.orgroam.com/manual.html#org_002droam_002ddailies), which also supported [age-encrypted Org files](https://github.com/anticomputer/age.el#org-roam-support-for-age-encrypted-org-files). That would have added a journal migration to an encryption repair.

The immediate problem was saving encrypted entries. [org-journal](https://github.com/bastibe/org-journal) already fit the rest of my workflow, so I kept it.

## Setup

This was my [Doom Emacs](https://github.com/doomemacs/doomemacs) configuration. First, I installed `age.el`:

```elisp title="packages.el"
(package! age)
```

```elisp title="config.el"
(use-package! age
  :init
  (setq! age-program "rage")
  :config
  (setq! age-default-identity "~/.ssh/id_ed25519"
         age-default-recipient "~/.ssh/id_ed25519.pub")
  (age-file-enable))
```

I chose [rage](https://github.com/str4d/rage) for its [pinentry support](https://github.com/anticomputer/age.el#workaround-pinentry-support-through-rage), and because it was written in Rust. `age-file-enable` then let Emacs handle files with an age suffix.

Finally, I disabled org-journal's GPG encryption and changed the journal filename suffix:

```elisp title="config.el"
(after! org
  (setq org-journal-encrypt-journal nil
        org-journal-file-format "%Y%m%d.org.age"))
```

org-journal continued creating daily files. Emacs passed each `.org.age` file to age for encryption and decryption. I could resume journaling without changing the journal system itself.
