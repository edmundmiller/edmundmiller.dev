---
title:
description: How to adopt pixi on an HPC cluster near you.
draft: true
publish: 2024-08-21
tags: ["bioinformatics", "python"]
---

Recently, Anaconda has decided to start charging users for access to the default channel. This change in policy has significant implications for the data science and machine learning community, as Anaconda is a widely used platform for managing Python and R packages.[^1][^2][^3]

The Python ecosystem has recently seen a proliferation of attempts to completely rework its package managers. Several new projects have emerged, each aiming to address in the existing package managers. An issue that isn't really due that "pip/conda" are bad. `pip` was released **April 4th, 2011** and `Anaconda` was first release **July 17th, 2012**. That's long before I even took an intro CS coures my freshman year of college, so I'm not gonna judge what everyone else was doing then.

The space is ripe for distruption. There have been some exciting complete rewrites that have come out recently with [ruff](https://docs.astral.sh/ruff) and [uv](https://docs.astral.sh/uv/) from Astral in the Python ecosystem. In the conda ecosystem, I've lost track of the different ways to install a conda package, Anaconda, miniconda, Mamba, micromamba, mambaforge. I can't keep up.

I recently started using [`Pixi`](https://pixi.sh/latest/) from [prefix.dev](https://prefix.dev/). It's been really nice. I want to forget about a package manager. It let's me do that.


[^1]: https://x.com/NM_Reid/status/1825997577151525338

[^2]: https://www.theregister.com/2024/08/08/anaconda_puts_the_squeeze_on/

[^3]: https://www.linkedin.com/feed/update/urn:li:share:7229549722070310912/
