---
title: "Simplify Your Bioinformatics Workflow with Pixi"
description: "How to adopt pixi on an HPC cluster near you. Simplify your bioinformatics workflow today, with Pixi!"
draft: false
publishDate: 2024-08-21
tags: ["bioinformatics", "python"]
---

Recently, Anaconda has decided to start charging users for access to the default channel. This change in policy has significant implications for the data science and machine learning community, as Anaconda is a widely used platform for managing Python and R packages.[^1][^2][^3] Prefix.dev has a [nice article summarizing the whole thing](https://prefix.dev/blog/towards_a_vendor_lock_in_free_conda_experience).

The Python ecosystem has recently seen a proliferation of attempts to completely rework its package managers. Several new projects have emerged, each aiming to address in the existing package managers. An issue that isn't really due that "pip and conda are bad". `pip` was released **April 4th, 2011** and `Anaconda` was first release **July 17th, 2012**. That's long before I even took an intro CS course my freshman year of college, so I'm not gonna judge what everyone else was doing then.

The space is ripe for disruption. There have been some exciting complete rewrites that have come out recently with [ruff](https://docs.astral.sh/ruff) and [uv](https://docs.astral.sh/uv/) from Astral in the Python ecosystem. In the conda ecosystem, I've lost track of the different ways to install a conda package, Anaconda, miniconda, Mamba, micromamba, mambaforge. I can't keep up.

I recently started using [`Pixi`](https://pixi.sh/latest/) from [prefix.dev](https://prefix.dev/). It's been really nice. I want to forget about a package manager. Pixi let's me do that.

# Pixi for Bioinformatics

## Set up on a server/locally

```bash
curl -fsSL https://pixi.sh/install.sh | bash
# source ~/.bashrc
pixi config append default-channels conda-forge --global
pixi config append default-channels bioconda --global

pixi global install -c bioconda nextflow
pixi g i rclone
```

Just thought I'd add a quick TL;DR here. This is how easy it is to get started. Works on your server, locally on your laptop. Makes me think of some other great [bioinformatics tools](https://www.nextflow.io/)...

## Things every Bioinformatician loves to see

### One way to install it just about everywhere

Problem: Which way should you install conda?

- Anaconda
- miniconda
- Mamba
- Micromamba
- mambaforge

Solution:

```bash
curl -fsSL https://pixi.sh/install.sh | bash
```

### Environment activation is automatic

Problem: In every new terminal users have to run `conda activate applied-genomics`.[^5]

Solution: Every project has the same commands

- `pixi shell`
- `pixi shell-hook`
- `pixi run`

### Tasks are built-in

Problem: `snakemake --cores 4`

Solution:

```toml
[tasks]
run = "snakemake --cores 4"
upload = { cmd = "rclone sync results/ box:THK_LAB_DATA/results/", depends-on = ["run"] }
```

```sh
pixi run upload
```

Sure, you could have a Makefile, or reach for [just](https://github.com/casey/just). But that's just one more tool everyone you collaborate with has to learn.

### Storing environment details is taken care of for you

Problem: `conda install` doesn't update the `environment.yml`[^4]

Solution: `pixi add` updates the `pixi.toml` for you.

But wait there's more!
It locks the version to avoid major version bumps automatically!

```toml
[dependencies]
python = ">=3.12.5,<4"
```

In case python4 sneaks up on you.

### No built in lock file

Problem: Versions in the `environment.yml` are only half the battle...[^6]

Solution: `pixi add` updates the `pixi.lock` file as well behind the scenes!

## It's gotta be difficult to migrate to, right?

With [pixi you can import `environment.yml` files into a pixi project](https://pixi.sh/latest/switching_from/conda/#automated-switching).

```bash
pixi init --import environment.yml
```

This will create a new project with the dependencies from the `environment.yml` file.

<!-- TODO # Conclusion -->

[^1]: https://x.com/NM_Reid/status/1825997577151525338

[^2]: https://www.theregister.com/2024/08/08/anaconda_puts_the_squeeze_on/

[^3]: https://www.linkedin.com/feed/update/urn:li:share:7229549722070310912/

[^4]: Which makes it really hard to reproduce research code as we've learned firsthand...

[^5]: Remembering the environment name in every project is really the issue.

[^6]: Going to avoid going off into the weeds here, there is [conda-lock](https://github.com/conda/conda-lock). Reach out [Jonathan Manning](https://github.com/pinin4fjords) for his upcoming TED talk on conda lock files.
