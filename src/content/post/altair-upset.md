---
title: "altair-upset: The Evolution of UpSet plots in Altair"
description: How I turned a Jupyter notebook into a full-fledged Python package for UpSet plots
draft: true
publishDate: 2025-01-19
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

# What's Next?

I'm keeping this project lean and focused. Want a feature? PRs welcome!

Check it out on GitHub: [altair-upset](https://github.com/edmundmiller/altair-upset)
