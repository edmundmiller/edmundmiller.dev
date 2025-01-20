---
title: "altair-upset: The Evolution of UpSet plots in Altair"
description: How I turned a Jupyter notebook into a full-fledged Python package for UpSet plots
draft: false
publishDate: 2025-01-20
tags: ["python", "data-visualization", "bioinformatics", "altair"]
---

[Altair](https://altair-viz.github.io) is the only plotting library that I've felt like loved me back. Maybe ggplot2 would love me back as well, but it's locked away in the tower of R.

I went on a bit of a lark when I stumbled upon the [original upset-altair-notebook from HMS-DBMI](https://github.com/hms-dbmi/upset-altair-notebook). It was just a Jupyter Notebook, and only worked with Altair 4, which met none of my requirements.

# The Journey

The original notebook was great, but I needed something I could quickly pip install and use across projects. Plus, I needed to use Altair 5 for [marimo](https://marimo.io), I wanted to future-proof this tool for the community.

Here's how it evolved:

```bash
# The old way
git clone https://github.com/hms-dbmi/upset-altair-notebook
conda env create -f environment.yml
conda activate upset-altair-env
jupyter notebook
```

```bash
# The new way
pip install altair-upset
```

# Making it easy to install

First step was packaging. I'm a big fan of not reinventing the wheel, so I kept the core visualization logic but wrapped it in a proper Python package structure. This meant:

```python
import altair_upset as au

# Create UpSet plot with one clean function call
chart = au.UpSetAltair(
    data=my_data,
    sets=["gene_set1", "gene_set2", "gene_set3"],
    title="Gene Set Intersections"
)
```

# Hitting Save Before the Boss Fight

Here's where it gets interesting - I created a snapshot of the Altair 4 functionality before diving into the Altair 5 boss battle. Think of it like saving your game before a major fight - if something goes wrong, you can always roll back to a working state.

Why? Because I've learned from enough bioinformatics murder mysteries that breaking changes in dependencies can be a nightmare. I tried to just port the function to Altair 5 and wound up with some really weird functionality that I couldn't make sense of.

The secret weapon here was [syrupy](https://github.com/syrupy-project/syrupy) - it let me capture the exact state of my plots before making any changes.

# Migrating to Altair 5

I think the [diff between the versions tells most of the story](https://github.com/edmundmiller/altair-upset/compare/0.1.1...0.2.0).

It was mostly just swapping out a properties calls that got moved.

![Shared Mutations of COVID Variants UpSet Plot](https://raw.githubusercontent.com/edmundmiller/altair-upset/3ab3e4de21fcaf02dd0ea0211cc14d08238a689b/tests/__snapshots__/test_covid_mutations/test_covid_mutations_subset%5Bimage%5D.png)

# Lessons Learned Along the Way

This was my first rodeo with creating a Python package from scratch, and boy was it a journey. Remember how I said Altair was the only plotting library that loved me back? Well, the Python packaging ecosystem...

First off, PyPI takes security more seriously than that one PI who makes you wear a lab coat just to look at a computer. I accidentally pushed v0.2.0 and then tried to yank it back - spoiler alert: you can't. It's like trying to take back an email after hitting send. That version now lives in infamy, a permanent reminder that "move fast and break things" doesn't fly with package registries.

But the real game-changer? Discovering [`uv`](https://docs.astral.sh/uv/) and [`pyproject.toml`](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/). After years of fighting with `setup.py` and virtual environments (and drowning in documentation that felt like it was written for people who already knew everything), this felt like finding the cheat codes. Finally, Python package management that doesn't feel like solving a Rubik's cube in the dark.

```shell
# The old way
python setup.py develop  # pray it works
pip install -e .  # pray harder
python -m venv venv  # why do I need this again?

# The new way
uv sync
```

If you're just starting out with Python packaging, do yourself a favor - skip the history lesson and jump straight to `pyproject.toml`. Your future self will thank you.

# What's Next?

I'm keeping this project lean and focused. Want a feature? PRs welcome!

Check it out on GitHub: [altair-upset](https://github.com/edmundmiller/altair-upset)
