---
author: Edmund Miller
publishDate: '2019-01-13T22:42Z'
title: CTRL to Caps Lock
description: How I made Caps Lock send Escape on a tap and Control when held, first with QMK and then on an X11 laptop.
tags: ['linux']
---

I grew up in a household where every computer mapped Control to Caps Lock. I never questioned the choice. After spending more time in Emacs and terminal applications, I understood why the easier key position helped.

My first mechanical keyboard was a Planck powered by [QMK](https://docs.qmk.fm/). I placed Escape where Caps Lock would normally sit because Vim and Evil use it often.

Later, an Ergodox EZ showed me QMK's tap-hold keys. One key could send a character when tapped and act as a modifier when held. I combined my Escape and Control mappings with one definition:

```c
CTL_T(KC_ESC)
```

A tap now sent Escape. Holding the same key sent Left Control. QMK's tap-hold settings controlled the timing.

## Applying the mapping to my laptop

Someone in the Doom Emacs Discord shared [Danny Guo's remapping guide](https://www.dannyguo.com/blog/remap-caps-lock-to-escape-and-control/). On my Ubuntu X11 session, I first opened GNOME Tweaks and selected “Caps Lock as Ctrl” under the Control-key position options.

That setting alone made Caps Lock act as Control. The guide's `xcape` step added Escape when I tapped the key.

This gave my laptop's built-in keyboard the same behavior as my QMK keyboards. The `xcape` method targets X11, so Wayland sessions need a different remapping tool.
