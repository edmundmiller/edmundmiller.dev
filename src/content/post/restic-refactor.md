---
title: Restic Refactor
description: Moving from backblaze to R2 and refactoring the configuration of my NixOS box to be easier to drop-in replace
publishDate: "2024-04-15"
draft: true
---

Awhile ago I setup restic backups on my NAS that is running NixOS. I was backing them up to a B2 bucket, but they&rsquo;ve changed their pricing model, and I started using R2 because of k8s@home. I also was using a file moved over through synchthing across computers, and I wanted to switch over to use age and agenix.

Mainly followed the lovely guide at <https://www.arthurkoziel.com/restic-backups-b2-nixos> and picked up a few things as I refactored some of my code.

Instead of desktop notifications, I&rsquo;ve always opted to use [Healthchecks.io](https://healthchecks.io/), since my NAS doesn&rsquo;t have a screen and I can&rsquo;t be bothered to astral project<sup><a id="fnr.1" class="footref" href="#fn.1" role="doc-backlink">1</a></sup> into it often enough to know if a critical backup has died

# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> [The image is from page 248 of The internet guide for new users. 1993 by Daniel P. Dern.](https://archive.org/details/internetguidefor00dern)
