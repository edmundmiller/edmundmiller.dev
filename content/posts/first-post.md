---
title: "CTRL to Caps Lock"
description: "With a bonus ESC on tap"
date: 2019-01-13 22:42:55
published: true
author: "Edmund Miller"
slug: first-post
tags: ["development", "qmk", "keyboard", "emacs"]
---

I grew up in a household where `CTRL` has been mapped to `Caps Lock` on every
computer. It was just something I had never questioned until recently. As a
heavy `CTRL` user between Emacs and terminal apps now, I understand.I thought
this would be fitting for a first blog post as kind of an origin story.

So I got my first mechanical keyboard about a year and a half ago, and since
it&rsquo;s powered by [qmk](https://docs.qmk.fm/#/), I decided to replace where caps lock might have been on my
planck, to `ESC` to make Vim and evil a little easier instead of using `jk` or
other ways to switch back to normal mode.

Fast-forward to recently and my mechanical keyboard family has grown with the
addition of an ergodox-ez. The default bindings had a lot of keys that with a
quick tap was a letter, and a hold became a modifier key. So I thought it might
be useful to do this with `ESC` and `CTRL`. This is the line to make it happen
with [qmk](https://docs.qmk.fm/#/).

    CTL_T(KC_ESC)

But it wasn&rsquo;t just enough to have it on my keyboards. I needed this magic everywhere.

After mentioning what I had done on the Doom Emacs discord one of them found a
[guide by Danny Guo](https://www.dannyguo.com/blog/remap-caps-lock-to-escape-and-control/) to set this up on most systems.

[Instructions for Ubuntu](https://www.dannyguo.com/blog/remap-caps-lock-to-escape-and-control/#xcape) however, under `gnome tweaks` under keyboard, additional layout
options, Ctrl position, it was `Caps Lock as Ctrl`.

I now have ESC/CTRL set to caps lock on keyboards not powered by qmk, such as my
laptops built in keyboard.
