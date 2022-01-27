---
title: 'Emacs Email Config'
description: 'Setting up Email in Emacs with mbsync, and Notmuch'
date: 2019-01-20 22:49:01
published: true
author: 'Edmund Miller'
tags: ['emacs', 'email', 'notmuch', 'doom', 'ubuntu', 'tutorial']
---

## Introduction

Like most people these days I have quite a few email addresses, personal, old
personal email, and school. In the past I've tried using Emacs to manage all of
these in one place. However, when I added a work email account into the mix that
didn't have `IMAP` enabled it was finally enough to make me go back to using the
web clients.

Recently I started to get the itch to bring the config into my [dotfiles](https://github.com/Emiller88/dotfiles/tree/master/shell/notmuch),
since the biggest pain was setting it all up on a new computer and making it
feel fragile.

### Guides:

- [Notmuch of a mail setup Part 1- mbsync, msmtp and systemd](https://bostonenginerd.com/posts/notmuch-of-a-mail-setup-part-1-mbsync-msmtp-and-systemd/)
- <http://www.macs.hw.ac.uk/~rs46/posts/2014-01-13-mu4e-email-client.html>
- <https://youtu.be/obY1um6ehDM>

### Notmuch config of my dotfiles:

- <https://github.com/Emiller88/dotfiles/tree/master/shell/notmuch>

# Fetching the Mail

In the past I've tried [offlineimap](https://github.com/OfflineIMAP/offlineimap) but it's slow when you have to pull down
years and years of email. So I first started with [mbsync](https://wiki.archlinux.org/index.php/Isync)(I've used the arch wiki
because it explains more than the actual documentation in my opinion).

To get that set up:

    sudo apt install isync

and then add a `~/.mbsyncrc` file and configure it according to one of the above
guides or the [arch wiki](https://wiki.archlinux.org/index.php/Isync). I will try to avoid going over things that I just copied and
pasted and they worked, in order to keep this short.

An issue that I ran into later down the road was that [mbsync](https://wiki.archlinux.org/index.php/Isync) doesn't sync just
any flag/label/tag back to Gmail. Enter [gmailieer](https://github.com/gauteh/gmailieer). Which was more of a pain to
setup.

To install from [here](https://launchpad.net/ubuntu/+source/gmailieer)

    sudo apt-get install gmailieer

The chicken and the egg problem with `gmailieer` is that it needs `notmuch` set
up in the `.mail` dir. So when I was setting `gmailieer` up, `notmuch` was
already up and running for me. We'll come back to it.

With `gmailieer` the important part, is if I check my email on my phone, another
computer, or Emacs, it will update as read, archived, deleted, and most
importantly the tags will be the same on it. For an added bonus it works for my
work account that uses Gsuite since it uses their API and not IMAP.

Now one key issue I had with `gmailieer` and my setup is that it depends on the
the `python3-notmuch` package, which is in the Ubuntu repos but not in `pypi`.
So this makes it necessary to use a different version of python than Conda
3.6(default in 18.04 i i i i i 3 but you can use the `python-notmuch` package if
you're on 16.04) I had to do the following(I use [pyenv](https://github.com/pyenv/pyenv) to manage different
python versions).

    sudo apt install python3-notmuch
    cd ~/.mail
    pyenv local 3.7.0 # or whatever version you like

We need to initialize the notmuch database.

    sudo apt-get install notmuch
    cd ~/.mail
    notmuch

Here you'll be prompted with some questions to get your config going. Below is
an example of what it'll look like afterwards

    [database]
    path=/home/$USER/.mail

    [user]
    name=Edmund Miller
    primary_email=USER1@gmail.com
    other_email=USER3@gmail.com;USER2@school.edu;

    [new]
    tags=new
    ignore=Trash;*.json;

    [search]
    exclude_tags=trash;deleted;spam;

    [maildir]
    synchronize_flags=true

# Checking Mail in the Background

Next we need to setup the mail to be ran in the background every so often. This
[guide](https://bostonenginerd.com/posts/notmuch-of-a-mail-setup-part-1-mbsync-msmtp-and-systemd/%0A) has a great setup for it.

    mklink checkmail.service $XDG_CONFIG_HOME/systemd/user/checkmail.service
    mklink checkmail.timer $XDG_CONFIG_HOME/systemd/user/checkmail.timer

And start and enable the timer

    systemctl --user start checkmail.timer
    systemctl --user enable checkmail.timer

The `checkmail.service` calls `checkmail.sh`

    #!/usr/bin/env bash

    STATE=$(nmcli networking connectivity)

    if [ $STATE = 'full' ]; then
      echo "Syncing email1"
      cd /home/emiller/.mail/email1/
      gmi sync
      echo "Syncing email2"
      cd /home/emiller/.mail/email2/
      gmi sync
      echo "Syncing work"
      cd /home/emiller/.mail/work/
      gmi sync
      echo "Checking school"
    # Non gmail email
    	mbsync -V school
    	exit 0
    fi
    echo "No internet connection."
    exit 0

The `gmi sync` command does a `push` followed by a `pull` so the tags from the
local overwrite anything that's on the remote. So later we'll write rules to tag
the new mail coming in.

# Tagging the Mail

The next step is to tag the mail. For that I use `notmuch`. I tried `mu` in
the past but it works by moving the emails into various dirs instead of just
tagging them and I found it messed with how the remote emails were treated too
often. Gmailieer pulls the tags down by default. But if we want to tag our mail
locally we'll need to expand `checkmail.sh`. [afew](https://github.com/afewmail/afew) is another option for more
elaborate initial tagging, but I didn't want to have more dependencies.

    #!/usr/bin/env bash

    STATE=$(nmcli networking connectivity)

    function tagMail {
      echo "Running tag additions to tag new mail"

      # github
      notmuch tag +github              -- from:notifications@github.com AND tag:new
      notmuch tag +github              -- from:noreply@github.com AND tag:new
      notmuch tag -inbox               -- tag:github AND tag:new

      # CI
      notmuch tag +CI                  -- from:builds@travis-ci.com AND tag:new
      notmuch tag +CI                  -- from:builds@circleci.com AND tag:new
      notmuch tag -inbox               -- tag:CI AND subject:Passed

      # Mailing Lists
      notmuch tag +list/emacs -inbox   -- from:help-gnu-emacs-request@gnu.org AND tag:new
      notmuch tag +list/haskell -inbox -- from:info@haskellweekly.news AND tag:new
      notmuch tag +list/IPFS -inbox    -- from:newsletter@ipfs.io AND tag:new
      notmuch tag +list/rust -inbox    -- from:twir@rust-lang.org AND tag:new
      notmuch tag +list/nixos -inbox   -- from:domen@enlambda.com AND tag:new

      # Remove new
      notmuch tag -new                 -- tag:new
    }
    if [ $STATE = 'full' ]; then
      echo "Syncing email1"
      cd /home/emiller/.mail/email1/
      gmi sync
      echo "Syncing email2"
      cd /home/emiller/.mail/email2/
      gmi sync
      echo "Syncing work"
      cd /home/emiller/.mail/work/
      gmi sync
      echo "Checking school"
    # Non gmail email
    	mbsync -V school
      echo "Running notmuch new"
    	notmuch new
      echo "Tagging mail"
      tagMail
    	exit 0
    fi
    echo "No internet connection."
    exit 0

So what we're doing here is first calling `notmuch new` which tags everything
according to this section of the config. Which just tags everything with `new`
and ignores anything with the `Trash` tag.

    [new]
    tags=new
    ignore=Trash;*.json;

# Deleting Email

Notmuch by default doesn't tag things with `+trash` which makes gmail move the
emails to the trash. Here's a snippet that does that. I have this bound to `d`.

    (defun +notmuch/search-delete ()
      (interactive)
      (notmuch-search-add-tag (list "+trash" "-inbox" "-unread"))
      (notmuch-tree-next-message))

# WIP: Sending Email

WIP: Currently I can only get this to work with my primary email address.

To set this up we'll need to get started with pass. I suggest you have a look at
the [Doom Notmuch module](https://github.com/hlissner/doom-emacs/blob/develop/modules/email/notmuch/config.el) if you're not using Doom to give you an idea of any
features you need to setup.

First setup `~/.msmtprc`

    # Set default values for all following accounts.
    defaults
    auth           on
    tls            on
    tls_trust_file /etc/ssl/certs/ca-certificates.crt
    logfile        ~/.msmtp.log

    # Gmail
    account        gmail
    host           smtp.gmail.com
    port           587
    from           USER1@gmail.com
    user           USER1
    passwordeval   pass mail/USER1

Then we'll setup `pass`.

    pass init <GPG KEY>
    pass insert mail/USER1

And type in the password.

You should be good to go and when in `notmuch` hit `C` and the `C-c C-c` to send
and `C-c C-k` to cancel.

    <normal-state> C	Compose new mail.
