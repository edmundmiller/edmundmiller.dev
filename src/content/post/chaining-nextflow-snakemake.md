---
title: Chaining Nextflow Pipelines with Snakemake
description: Contender for controversial blog post of the year
draft: true
publishDate: "2024-06-10"
tags: ["bioinformatics", "nextflow", "snakemake"]
---


```snakemake
rule fetchngs:
    input:
        input="ids.txt",
        nf_core_pipeline="rnaseq",
    output:
        "fetchngs-results/samplesheet/samplesheet.csv",
    params:
        pipeline="nf-core/fetchngs",
        revision="3.14.0",
        profile=["test", "docker"],
        outdir=lambda wildcards, output: str(Path(output[0]).parents[-2]),
    handover: True
    wrapper:
        "v3.12.1/utils/nextflow"

rule rnaseq:
    input:
        input="fetchngs-results/samplesheet/samplesheet.csv",
    output:
        "results/multiqc/star_salmon/multiqc_report.html",
        "results/star_salmon/deseq2_qc/deseq2.sample.dists.txt"
    params:
        pipeline="nf-core/fetchngs",
        revision="3.14.0",
        profile=["test", "docker"],
        outdir=lambda wildcards, output: str(Path(output[0]).parents[-2]),
    handover: True
    wrapper:
        "v3.12.1/utils/nextflow"

rule visualization:
    input:
        "results/star_salmon/deseq2_qc/deseq2.sample.dists.txt"
    output:
        "results/nf-core/results.csv"
    log:
        # optional path to the processed notebook
        notebook="logs/notebooks/processed_notebook.ipynb"
    notebook:
        # TODO
        "notebooks/visualize.py.ipynb"
```
