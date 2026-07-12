---
title: 'altair-upset: The Evolution of UpSet plots in Altair'
description: How I turned a Jupyter notebook into a full-fledged Python package for UpSet plots
draft: false
publishDate: 2025-01-20
tags: ['python', 'data-visualization', 'bioinformatics', 'altair']
---

[Altair](https://altair-viz.github.io) is the only plotting library that has felt like it loved me back.

I found the [HMS-DBMI UpSet notebook](https://github.com/hms-dbmi/upset-altair-notebook) while looking for an Altair implementation of UpSet plots. Its visualization worked, but it lived in one Jupyter notebook and targeted Altair 4.

I needed a package that I could install across projects. It also needed Altair 5 for use with [marimo](https://marimo.io). That work became `altair-upset`.

## From notebook to package

The original setup required cloning a repository and creating its environment:

```bash
# The old way
git clone https://github.com/hms-dbmi/upset-altair-notebook
conda env create -f environment.yml
conda activate upset-altair-env
jupyter notebook
```

```bash
# The packaged version
pip install altair-upset
```

I kept the notebook's core visualization logic and wrapped it in a Python package. The package exposed one function for creating a chart:

```python
import altair_upset as au

# Create UpSet plot with one clean function call
chart = au.UpSetAltair(data=my_data, sets=["gene_set1", "gene_set2", "gene_set3"], title="Gene Set Intersections")
```

## Snapshot-testing the Altair 4 output

Before changing the Altair API calls, I recorded the existing chart output with [syrupy](https://github.com/syrupy-project/syrupy). The snapshot gave me a baseline for the migration.

My first Altair 5 port produced output I did not expect. Comparing it with the baseline showed whether each change preserved the chart's structure. This was more useful than checking only that the function ran.

The [diff from version 0.1.1 to 0.2.0](https://github.com/edmundmiller/altair-upset/compare/0.1.1...0.2.0) shows the migration. Most changes updated property and configuration calls for Altair 5.

![Shared Mutations of COVID Variants UpSet Plot](https://raw.githubusercontent.com/edmundmiller/altair-upset/3ab3e4de21fcaf02dd0ea0211cc14d08238a689b/tests/__snapshots__/test_covid_mutations/test_covid_mutations_subset%5Bimage%5D.png)

## What I learned about packaging

This was my first Python package. I accidentally published version 0.2.0 before I intended to. PyPI supports [yanking files](https://packaging.python.org/en/latest/specifications/file-yanking/) so installers usually avoid them. However, a published version number cannot be reused. I kept the release and treated the mistake as part of the package history.

[`pyproject.toml`](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/) gave the project one place for build metadata and tool configuration. [`uv`](https://docs.astral.sh/uv/) then reduced the local setup to one command:

```shell
uv sync
```

The result is a pip-installable, Altair 5-compatible package with snapshot tests for its plots. The source is available in the [`altair-upset` repository](https://github.com/edmundmiller/altair-upset).
