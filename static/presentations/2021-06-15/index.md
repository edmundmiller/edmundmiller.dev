---
title: nf-core/bytesize 17 - pytest-workflow
tags: bytesize, nf-core, open-source, talk
slideOptions:
    spotlight:
        enabled: true
    allottedMinutes: 15
---

<section data-background-image="https://raw.githubusercontent.com/MaxUlysse/maxulysse.github.io/master/assets/img/svg/green_white_bg.svg" data-background-opacity=0.9 >

<a href="https://www.nf-co.re"><img src="https://raw.githubusercontent.com/nf-core/logos/master/byte-size-logos/bytesize-darkbg.svg" width="65%"><img></a>

# pytest-workflow

Edmund Miller / <img src="https://openmoji.org/data/color/svg/E040.svg" width=50> @E_Miller88 / <img src="https://openmoji.org/data/color/svg/E045.svg" width=50> @Emiller88
University of Texas at Dallas

---

# Overview

-   pytest-workflow and nf-core modules
-   Behind the curtains of the CI
-   Running pytest-workflow on nf-core modules locally
-   Testing pipelines with pytest-workflow

---

# pytest-workflow and nf-core modules

---

# Some benefits of using a testing framework

-   Version control and collaboration
    -   `git bisect`
-   Reproducibility
-   Run tests locally

---

# Anatomy of a pytest-workflow test

```yaml=test.yml
- name: Touch a file
  command: touch test.file
  files:
    - path: test.file
```

<aside class="notes">
  This will run touch test.file and check afterwards if a file with path: test.file is present.

It will also check if the command has exited with exit code 0

</aside>

---

# Example: gunzip `test.yml` file

```yaml [1|2|3-4|5-7]
- name: gunzip
  command: nextflow run ./tests/software/gunzip -entry test_gunzip -c tests/config/nextflow.config
  tags:
      - gunzip
  files:
      - path: ./output/gunzip/test_1.fastq
        md5sum: 4161df271f9bfcd25d5845a1e220dbec
```

---

# `nf-core modules create-test-yml`

-   Automates the creation of the yaml file(And the md5sums!)
-   Runs the tests
-   Just write the tests!

---

# `nf-core modules create-test-yml` Example

```groovy
include { STAR_GENOMEGENERATE } from '../../../../software/star/genomegenerate/main.nf' addParams( options: [args: '--genomeSAindexNbases 9'] )
include { STAR_ALIGN          } from '../../../../software/star/align/main.nf'          addParams( options: [args: '--readFilesCommand zcat'] )

workflow test_star_alignment_single_end {
    input = [ [ id:'test', single_end:true ], // meta map
              [ file("${launchDir}/tests/data/generic/fastq/test_single_end.fastq.gz", checkIfExists: true) ]
            ]
    fasta = file("${launchDir}/tests/data/generic/fasta/GCF_000019425.1_ASM1942v1_genomic.fna", checkIfExists: true)
    gtf   = file("${launchDir}/tests/data/generic/gtf/GCF_000019425.1_ASM1942v1_genomic.gtf", checkIfExists: true)

    STAR_GENOMEGENERATE ( fasta, gtf )
    STAR_ALIGN ( input, STAR_GENOMEGENERATE.out.index, gtf )
}
```

---

```shell
$ nf-core modules create-test-yml

                                          ,--./,-.
          ___     __   __   __   ___     /,-._.--~\
    |\ | |__  __ /  ` /  \ |__) |__         }  {
    | \| |       \__, \__/ |  \ |___     \`-._,-`-,
                                          `._,._,'

    nf-core/tools version 1.13


INFO     Press enter to use default values (shown in brackets) or type your own responses
? Tool name: star/align
Test YAML output path (- for stdout) (tests/software/star/align/test.yml):
File exists! 'tests/software/star/align/test.yml' Overwrite? [y/n]: y
INFO     Looking for test workflow entry points: 'tests/software/star/align/main.nf'
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
INFO     Building test meta for entry point 'test_star_alignment_single_end'
Test name (star align test_star_alignment_single_end):
Test command (nextflow run tests/software/star/align -entry test_star_alignment_single_end -c tests/config/nextflow.config):
Test tags (comma separated) (star_alignment_single_end,star_align,star):
Test output folder with results (leave blank to run test):
? Choose software profile  Docker
INFO     Running 'star/align' test with command:
         nextflow run tests/software/star/align -entry test_star_alignment_single_end -c tests/config/nextflow.config --outdir
         /var/folders/bq/451scswn2dn4npxhf_28lyt40000gn/T/tmp_p22f8bg
INFO     Test workflow finished!
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
INFO     Building test meta for entry point 'test_star_alignment_paired_end'
...
...
```

---

# Behind the Curtains of the CI

---

# The pieces

-   dorny/paths-filter GitHub action checks for changes
-   Based on the changes actions creates a matrix of jobs
-   Tests are ran on singularity, docker, and conda
-   pytest-workflow & Linting gets ran against the tags
-   On failures the logs get uploaded

---

# Checking for Changes

```yaml [10-13]
changes:
    name: Check for changes
    runs-on: ubuntu-latest
    outputs:
        # Expose matched filters as job 'modules' output variable
        modules: ${{ steps.filter.outputs.changes }}
    steps:
        - uses: actions/checkout@v2

        - uses: dorny/paths-filter@v2
          id: filter
          with:
              filters: "tests/config/pytest_software.yml"
```

---

# modules/tests/config/pytest_software.yml`

```yaml=538
star/align:
  - software/star/align/**
  - tests/software/star/align/**
```

---

# The matrix :dark_sunglasses:

```yaml=
matrix:
    nxf_version: ['21.04.0']
    tags: ['${{ fromJson(needs.changes.outputs.modules) }}']
    profile: ['docker', 'singularity', 'conda']
```

:::danger
The [CI fails if matrix is larger than 256](https://github.com/nf-core/modules/issues/391)
:::

---

# Running the tests

```yaml
- name: Run pytest-workflow
    # only use one thread for pytest-workflow to avoid race condition on conda cache.
    run: TMPDIR=~ PROFILE=${{ matrix.profile }} pytest --tag ${{ matrix.tags }} --symlink --kwdof
```

---

# Logs of the Fallen

```yaml
- name: Upload logs on failure
  if: failure()
  uses: actions/upload-artifact@v2
  with:
      name: logs-${{ matrix.tags }}-${{ matrix.profile }}-${{ matrix.nxf_version }}
      path: |
          /home/runner/pytest_workflow_*/*/.nextflow.log
          /home/runner/pytest_workflow_*/*/log.out
          /home/runner/pytest_workflow_*/*/log.err
          /home/runner/pytest_workflow_*/*/work
```

---

# Linting the modules

```yaml=
- name: Lint ${{ matrix.tags }}
  run: nf-core modules lint . -t ${{ matrix.tags }}
```

---

# Running pytest-workflow Locally

---

# Running pytest-workflow

```bash
nf-core/modules $ conda install pytest-workflow
nf-core/modules $ PROFILE=docker pytest --tag gunzip --symlink
nf-core/modules $ PROFILE=docker pytest --tag gunzip --symlink --basetemp ~/scratch/tmp/pytest
```

---

# Testing pipelines with pytest-workflow

---

# Oh the Things We'll Test!

-   Verify [expected outputs and their integrity](https://github.com/nf-core/tools/issues/605)
-   The CI can be generalized
-   Only testing sections of pipelines that have changes
    -   Save the GitHub runners!
-   Finer grained testing of subworkflows

---

# Examples PRs

-   [sarek](https://github.com/nf-core/sarek/pull/370)
-   [rnaseq](https://github.com/nf-core/rnaseq/pull/546)

---

# e2e Example

```yaml=
# NOTE For now these tests don't support any containers beside singularity
- name: Run default pipeline with test data
  command: nextflow run main.nf -profile test,docker
  tags:
    - default
  files:
    # fastqc
    - path: results/fastqc/RAP1_IAA_30M_REP1_1_fastqc.html
    - path: results/fastqc/RAP1_IAA_30M_REP1_1_fastqc.zip
    ...
    # multiqc
    - path: results/multiqc/star_salmon/multiqc_report.html
    ...
```

---

# Testing a Subworkflow

```groovy=
include { MARKDUPLICATES } from '../../../../subworkflows/nf-core/markduplicates' addParams(
    markduplicates_options:      modules['markduplicates'],
    markduplicatesspark_options: modules['markduplicatesspark']
)

workflow test_markduplicates {
    input = [[id: 'test'],
            [file(params.test_data['nf-core']['test_paired_end_sorted_bam'], checkIfExists: true)],
            [file(params.test_data['nf-core']['test_paired_end_sorted_bai'], checkIfExists: true)]]

    MARKDUPLICATES ( input, false, true )
}
```

---

# Testing a Subworkflow

```groovy=
- name: subworkflow markduplicates
  command: nextflow run ./tests/subworkflows/nf-core/markduplicates/ -entry test_markduplicates -c tests/config/nextflow.config
  tags:
    - markduplicates
    - gatk4
  files:
   - path: output/preprocessing/test/markduplicates/test.md.bam
   - path: output/preprocessing/test/markduplicates/test.md.bam.bai
```

---

## Need help?

Repository: [`nf-core/modules`](https://github.com/nf-core/modules)
Tutorial: [`https://nf-co.re/usage/usage_tutorials`](https://nf-co.re/usage/usage_tutorials)
Chat: [`https://nf-co.re/join`](https://nf-co.re/join) <img src="https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-6gwiyo/Slack_Mark.svg" width=7.5%></img>`#channel`

<div style="margin-top:0.1em">&nbsp;</div>

<p align="center">
Follow nf-core on
<a href="https://www.twitter.com/nf_core"><img src="https://openmoji.org/data/color/svg/E040.svg" width=6%></a>
<a href="https://github.com/nf-core"><img src="https://openmoji.org/data/color/svg/E045.svg"  width=6%></a>
<a href="https://www.youtube.com/c/nf-core"><img src="https://openmoji.org/data/color/svg/E044.svg" width=6%></a>
</a>
</p>

<a href="https://nf-co.re/" style="color: #000000; font-family:Monaco, monospace; font-weight:bold;">https://nf-co.re/</a>

<div style="display: flex; justify-content: space-evenly; align-items:center;">
<img src="https://chanzuckerberg.com/wp-content/themes/czi/img/logo.svg" width=15%>
<div style="font-style:italic; font-size: 0.5em; color: #666;">Icons:<br><a href="https://openmoji.org">openmoji.org</a></div></div>

<section .slide: data-background-image="https://raw.githubusercontent.com/MaxUlysse/maxulysse.github.io/master/assets/img/svg/green_white_bg.svg" data-background-opacity=0.9 >

<style>
.reveal section img { background:none; border:none; box-shadow:none; }

body {
    background-image: url(https://raw.githubusercontent.com/nf-core/logos/master/nf-core-logos/nf-core-logo-square.svg);
    background-size: 7.5%;
    background-repeat: no-repeat;
    background-position: 3% 96%;
    background-color: #181a1b;
}

.reveal body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;
}

.reveal p {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;
}

.reveal h1 {
    font-family: 'Roboto', sans-serif;
    font-style: bold;
    font-weight: 400;
    color: white;
    font-size: 62px;
}

.reveal h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;
}

.reveal h3 {
    font-family: 'Roboto', sans-serif;
    font-style: italic;
    font-weight: 300;
    color: white;
}

.reveal p {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;

}

.reveal li {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: white;

}

.reveal pre {
    background-color: #272822 !important;
    display: inline-block;
    border-radius: 7px;
    color: #aaaba9;
}

.reveal pre code {
    color: #eeeeee;
    background-color: #272822;
    font-size: 100%;
}

.reveal code {
    background-color: #272822;
    font-size: 75%;
}

.reveal .progress {
    color: #24B064;

}

.reveal .controls button {
    color: #24B064;
}

.reveal blockquote {
    display: block;
    position: relative;
    width: 90%;
    margin: 20px auto;
    padding: 5px;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0px 0px 2px rgb(0 0 0 / 20%);
}

</style>
