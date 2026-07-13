---
title: Chaining Nextflow Pipelines with Snakemake
description: A design sketch for using Snakemake as an outer file-based graph around complete nf-core pipeline runs.
draft: true
publishDate: '2024-06-10'
tags: ['bioinformatics', 'nextflow', 'snakemake']
---

Snakemake can treat a complete Nextflow pipeline as one file-producing rule. That may help when a project already uses Snakemake to connect several pipelines and custom analyses.

This is an untested design note, not a report of a successful production run. The original draft ended before recording results and contained several code errors. I corrected the obvious defects below, but the exact pipeline versions and output paths still need an executed fixture before publication.

## The smallest useful chain

The first rule runs `nf-core/fetchngs` and produces a samplesheet. The second rule passes that file to `nf-core/rnaseq` and expects one stable report.

```python
from pathlib import Path


rule fetchngs:
    input:
        ids="ids.txt",
    output:
        "fetchngs-results/samplesheet/samplesheet.csv",
    params:
        pipeline="nf-core/fetchngs",
        revision="3.14.0",
        profile=["docker"],
        outdir=lambda wildcards, output: str(Path(output[0]).parents[-2]),
        nf_core_pipeline="rnaseq",
    handover: True
    wrapper:
        "v3.12.1/utils/nextflow"


rule rnaseq:
    input:
        input="fetchngs-results/samplesheet/samplesheet.csv",
    output:
        "results/multiqc/star_salmon/multiqc_report.html",
    params:
        pipeline="nf-core/rnaseq",
        revision="3.14.0",
        profile=["docker"],
        outdir=lambda wildcards, output: str(Path(output[0]).parents[-3]),
    handover: True
    wrapper:
        "v3.12.1/utils/nextflow"
```

The samplesheet path creates the dependency edge. Snakemake cannot run `rnaseq` until `fetchngs` creates that file.

The `pipeline` and `revision` parameters select the Nextflow project and release. `profile` becomes a Nextflow profile. Other named parameters become pipeline options through the wrapper.

The [official Nextflow wrapper example](https://snakemake-wrappers.readthedocs.io/en/stable/wrappers/utils/nextflow.html) also uses `handover: True`. I kept it here, but its behavior needs verification with the Snakemake version used by the project.

## When the pattern may help

This design fits a project with stable file boundaries between large stages. It may be useful when:

- each nf-core pipeline can run and resume independently;
- later notebook or script steps already live in Snakemake;
- durable files form a clear interface between pipelines;
- Snakemake already owns the outer project graph.

The pattern is less useful when Nextflow already expresses the full workflow. Adding Snakemake would create a second scheduler without adding a clear boundary.

## Costs to verify

Operators would debug two workflow engines. Each engine has separate configuration and execution settings. Their caches, logs, and resume behavior also differ. A failure inside Nextflow must still become a useful failure at the Snakemake rule boundary.

Output paths also become interfaces. A pipeline update that moves a report can break the outer graph even when the pipeline itself succeeds.

Nested cluster scheduling needs special care. Snakemake may reserve resources for a rule while Nextflow submits its own jobs. The executed fixture must show how those requests interact on the target system.

I would use this pattern only when Snakemake already owns the project and the handoff files are stable. Before publishing it as a recommendation, I still need to run this two-rule example and record its failure, resume, and output behavior.
