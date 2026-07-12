---
author: Edmund Miller
publishDate: '2019-01-20T22:49Z'
title: Emacs Email Config
description: How I combined gmailieer, mbsync, and Notmuch to manage several email accounts from Emacs in 2019.
tags: ['Emacs']
draft: false
---

> This post records my January 2019 setup. Gmail authentication, package names, and Emacs APIs may have changed since then.

I had four email accounts: two personal accounts, a school account, and a work account. The work account did not expose IMAP, so my earlier `mbsync`-only setup could not include it.

I wanted one Notmuch database in Emacs. I also wanted the setup in my [dotfiles](https://github.com/Emiller88/dotfiles/tree/master/shell/notmuch) so a new computer would not require another manual rebuild.

## Why I used two synchronization tools

[gmailieer](https://github.com/gauteh/gmailieer) synchronized Gmail through its API. That kept message and label state consistent across devices. Read, archive, and delete actions followed the same path. It also handled the work account without IMAP.

[mbsync](https://wiki.archlinux.org/title/Isync) remained responsible for the school account. Both tools wrote messages into the same mail directory for Notmuch to index.

gmailieer expected an initialized Notmuch database. My database used a temporary `new` tag for messages that had not passed through local rules:

```toml
[database]
path=/home/USER/.mail

[user]
name=YOUR_NAME
primary_email=USER1@gmail.com
other_email=USER2@gmail.com;USER3@school.edu;

[new]
tags=new
ignore=Trash;*.json;

[search]
exclude_tags=trash;deleted;spam;

[maildir]
synchronize_flags=true
```

## The final synchronization script

A systemd user timer called one `checkmail.sh` script. The script checked connectivity, synchronized every account, indexed new mail, and applied local tags.

```bash
#!/usr/bin/env bash
set -euo pipefail

if [[ "$(nmcli networking connectivity)" != "full" ]]; then
  echo "No internet connection."
  exit 0
fi

sync_gmail() {
  local account_dir="$1"
  echo "Syncing ${account_dir}"
  (cd "$HOME/.mail/${account_dir}" && gmi sync)
}

tag_mail() {
  # GitHub
  notmuch tag +github -- from:notifications@github.com AND tag:new
  notmuch tag +github -- from:noreply@github.com AND tag:new
  notmuch tag -inbox -- tag:github AND tag:new

  # CI
  notmuch tag +ci -- from:builds@travis-ci.com AND tag:new
  notmuch tag +ci -- from:builds@circleci.com AND tag:new
  notmuch tag -inbox -- tag:ci AND subject:Passed

  # Mailing lists
  notmuch tag +list/emacs -inbox -- from:help-gnu-emacs-request@gnu.org AND tag:new
  notmuch tag +list/haskell -inbox -- from:info@haskellweekly.news AND tag:new
  notmuch tag +list/rust -inbox -- from:twir@rust-lang.org AND tag:new
  notmuch tag +list/nixos -inbox -- from:domen@enlambda.com AND tag:new

  notmuch tag -new -- tag:new
}

sync_gmail email1
sync_gmail email2
sync_gmail work
mbsync school
notmuch new
tag_mail
```

The order mattered. Synchronization first brought remote state into the mail directory. `notmuch new` then marked unseen messages with `new`. The rules assigned useful tags, removed messages such as CI notifications from the inbox, and cleared `new` last.

I kept the rules in shell instead of adding another tagging tool. That made each decision visible beside the synchronization order.

## Deleting mail from Emacs

My delete command added `trash` and removed `inbox` and `unread`. gmailieer could then carry that state back to Gmail.

```elisp
(defun +notmuch/search-delete ()
  (interactive)
  (notmuch-search-add-tag (list "+trash" "-inbox" "-unread"))
  (notmuch-tree-next-message))
```

Sending from several accounts was not reliable in this setup, so I left it out. The useful result was narrower: one Emacs search and tagging interface for every inbox, with remote state preserved.
