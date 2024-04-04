---
author: Edmund Miller
publishDate: "2023-12-15T11:00Z"
title: Using age with org-journal
description: "Because gpg 2.4.1 borked Emacs's EasyPG, it just hangs on saving."
draft: false
tags: ["Emacs", "org-mode", "age"]
---

# The problem

Because [gpg 2.4.1 borked](https://dev.gnupg.org/T6481) Emacs\'s EasyPG.
It just hangs on saving.

## Why not just use gpg?

There are some ways around it, and I was using the `fset` hack until I
read this [post about the person who corrupted their encrypted
files](https://www.reddit.com/r/emacs/comments/18d6fmt/how_to_lock_yourself_out_of_a_gpg_encrypted_file/).
I also had to run the elisp on every new Emacs instance.

And then `lib-gcrypt` is marked as broken in NixOS if you use the
`gnupg22` package(Version: 2.2.41), and a blowing past that stop sign
sounded like a bad idea.

So I started thinking outside the box.

## Why [age](https://github.com/FiloSottile/age)?

I started using it with [agenix](https://github.com/ryantm/agenix), just
because [Henrik](https://github.com/hlissner/) started using it in his
dotfiles. The [k8s@home
template](https://github.com/onedr0p/flux-cluster-template) also
eventually [switched from gpg to
age](https://github.com/onedr0p/flux-cluster-template/pull/153) so I was
already pretty comfortable with using age.

TL;DR [Age: the modern alternative to GPG ---
nixFAQ](https://nixfaq.org/2021/01/age-the-modern-alternative-to-gpg.html):

-   Age is presented as a modern alternative to GPG that solves many of
    its limitations while maintaining security.
-   Age stands for \"Actually Good Encryption\" and has implementations
    in Go and Rust for improved security compared to GPG\'s C
    implementation.
-   Age uses smaller keys that are easier to store physically and has a
    simpler interface with no configuration options.
-   Files can be encrypted for multiple recipients simultaneously using
    Age.
-   Age supports encrypting for SSH public keys in addition to its own
    keys.
-   Age allows encrypting files for GitHub users by using their SSH keys
    from their profile.
-   Age offers a better user experience than GPG while maintaining an
    equally high level of security.

## Why still org-journal?

I\'ve considered using
[org-roam-dailies](https://www.orgroam.com/manual.html#org_002droam_002ddailies)
instead of [org-journal](https://github.com/bastibe/org-journal).
However, after some reflection, I\'m not entirely sure why. [Org Roam
supports Age
encryption](https://github.com/anticomputer/age.el#org-roam-support-for-age-encrypted-org-files),
and [org-journal has several PR
fixes](https://github.com/bastibe/org-journal/issues/400) for various
issues that have been neglected (this is not a judgment of the
maintainer, but problems like [journal files being decrypted whenever
the calendar is
invoked](https://github.com/bastibe/org-journal/issues/375) are
troublesome). I think I was just seeking a quick solution to resume
journaling.

# Setup

Now that you\'ve listened to me ramble on for a bit, here\'s the actual
setup. This is using [Doom
Emacs](https://github.com/doomemacs/doomemacs).

`packages.el`

``` elisp
(package! age)
```

`config.el`

``` elisp
(use-package! age
  :init
  (setq! age-program "rage")
  :config
  (setq! age-default-identity "~/.ssh/id_ed25519"
         age-default-recipient "~/.ssh/id_ed25519.pub")
  (age-file-enable))
```

Went with [rage](https://github.com/str4d/rage), because Rust. Also
there\'s [pinentry support through
rage](https://github.com/anticomputer/age.el#workaround-pinentry-support-through-rage).

`config.el`

``` elisp
(after! org
  (setq org-journal-encrypt-journal nil
        org-journal-file-format "%Y%m%d.org.age")
```

Only thing I had to do then was turn off the built-in gpg support on
org-journal, and update the naming scheme to have age as the suffix and
it just worked.™
