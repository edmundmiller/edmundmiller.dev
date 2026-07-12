---
title: 'Using Pixi for Bioinformatics Environments'
description: How Pixi combines Conda packages, locked environments, and project tasks in one workflow for laptops and HPC systems.
draft: false
publishDate: 2024-08-21
tags: ['bioinformatics', 'python']
---

In 2024, discussion about Anaconda's terms made one distinction important: Conda is a package format and tool, while Anaconda maintains the `defaults` channel. [Prefix.dev summarized the channel policy and lock-in concerns](https://prefix.dev/blog/towards_a_vendor_lock_in_free_conda_experience).

My problem was more practical. Collaborators could use Anaconda, Miniconda, or Mamba. Micromamba and Mambaforge added two more choices. Projects then needed separate tools for activation, tasks, and lock files.

[`Pixi`](https://pixi.sh/latest/) gave me one workflow for those jobs. It used the Conda package ecosystem while recording the project environment and commands together.

> These commands reflect my August 2024 setup. Check the current Pixi documentation before applying global configuration on a shared system.

## Optional global tools

```bash
curl -fsSL https://pixi.sh/install.sh | bash
# source ~/.bashrc
pixi global install -c conda-forge -c bioconda nextflow
pixi global install rclone
```

The same Pixi executable worked on my laptop and a remote server. Global installs were useful for stand-alone tools such as [Nextflow](https://www.nextflow.io/) and `rclone`. Project dependencies remained in the project manifest below.

## One project interface

### Installation

Instead of choosing among several Conda installers, collaborators could begin with one command:

```bash
curl -fsSL https://pixi.sh/install.sh | bash
```

### Environment commands

Every project exposed the same commands, so users did not need to remember an environment name:

- `pixi shell`
- `pixi shell-hook`
- `pixi run`

### Project tasks

Pixi stored common commands beside the environment. This project ran Snakemake before uploading its results:

```toml
[tasks]
run = "snakemake --cores 4"
upload = { cmd = "rclone sync results/ box:THK_LAB_DATA/results/", depends-on = ["run"] }
```

```sh
pixi run upload
```

Make or [just](https://github.com/casey/just) could provide the same task layer. Pixi's built-in tasks avoided another prerequisite for this project.

### Recorded dependency changes

`pixi add` changed the environment and updated `pixi.toml`. The dependency constraint recorded the compatible version range:

```toml
[dependencies]
python = ">=3.12.5,<4"
```

The same command updated `pixi.lock` with exact package versions. The manifest described what the project accepted. The lock file saved one complete result.

## Importing an existing Conda environment

With [pixi you can import `environment.yml` files into a pixi project](https://pixi.sh/latest/switching_from/conda/#automated-switching).

```bash
pixi init --import environment.yml
```

The command created a Pixi project from `environment.yml`. I could review the new manifest before asking collaborators to switch.

Pixi's main benefit was not a new package source. It put installation, package changes, locks, and project commands behind one interface. That reduced the setup each bioinformatics project had to explain.

## Related next steps

If you're thinking about Pixi because you want more reproducible bioinformatics workflows, you may also want to:

<ul>
  <li>
    <a href="/posts/emacs-nextflow/" data-goatcounter-event="pixi-next-emacs-nextflow">
      Set up a stronger Nextflow editing workflow
    </a>
  </li>
  <li>
    <a href="/speaking/" data-goatcounter-event="pixi-next-speaking">
      Watch talks about Nextflow, nf-core, and reproducible data processing
    </a>
  </li>
  <li>
    <a href="/about/" data-goatcounter-event="pixi-next-about">
      Learn more about the research context behind these workflow notes
    </a>
  </li>
</ul>
