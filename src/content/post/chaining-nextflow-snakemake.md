---
title: Chaining Nextflow Pipelines with Snakemake
description: Contender for controversial blog post of the year
draft: true
publishDate: "2024-06-10"
tags: ["bioinformatics", "nextflow", "snakemake"]
---

Alright, so this is going to be a hot take.
Recently, there's been some effort around trying to chain next float pipelines together.
And it's going all right.
There's various reasons for wanting to chain pipelines together.
Easier to split up, easier to run in smaller parts, but then at the same time, you also want something
they'll go into in from like fetch to G.S. to

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
        extra=["--nf_core_pipeline", "rnaseq"]
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

rule visualization_ercc:
    input:
        "results/star_salmon/deseq2_qc/deseq2.sample.dists.txt"
    output:
        "results/nf-core/results.csv"
    notebook:
        # TODO
        "notebooks/visualize.py.ipynb"

rule differentialabundance:
    input:
        input="fetchngs-results/samplesheet/samplesheet.csv",
        matrix="salmon.merged.gene_counts.tsv",
        transcript_length_matrix="salmon.merged.gene_lengths.tsv",
    output:
        "results/report/study.html"
    params:
        pipeline="nf-core/fetchngs",
        profile=["docker","rnaseq"]
        revision="3.14.0",
        outdir=lambda wildcards, output: str(Path(output[0]).parents[-2]),
        extra=["--shinyngs_build_app", "true"]
    handover: True
    wrapper:
        "v3.12.1/utils/nextflow"


```
