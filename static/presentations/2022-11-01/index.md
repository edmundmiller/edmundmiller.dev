---
title: nf-core/bytesize nascent
tags: bytesize, nf-core, open-source, talk, pipeline
---

<!-- .slide: data-background="https://raw.githubusercontent.com/maxulysse/maxulysse.github.io/main/assets/img/svg/green_white_bg.svg" -->

<a href="https://www.nf-co.re"><img src="https://raw.githubusercontent.com/nf-core/logos/master/byte-size-logos/bytesize-darkbg.svg" width="65%"><img></a>

# nascent

Edmund Miller / <img src="https://openmoji.org/data/color/svg/E040.svg" width=50> @e_miller88 / <img src="https://openmoji.org/data/color/svg/E045.svg" width=50> @emiller88
<a href="https://utdallas.edu"><img src="https://gist.githubusercontent.com/Emiller88/b2247c2883c3209950bebb89d5cb9a5f/raw/5455a28a6b27ffe90f32a947986eb80ebe63c6fa/utdmonogram.svg" width="80%"><img></a>

---

# Overview

- Background on Nascent Transcript Identification
- History of Development
- Pipeline Overview

---

#### Background on Nascent Transcript Identification

- Goal is to identify changes in transcription
  - Rather than RNAseq which isolates all of the RNA in cell
  - Pulling out the transcriptionally activate sites **through metabolical labelling**
- Covering a lot of different assays
- Slight variation in computational pipeline can result in **25% change in results**

---

# Enhancers

- Cis-acting DNA sequences that can increase the transcription of genes
- The human genome contains ++hundreds of thousands++ of enhancers
- Evidence of Enhancer-Promoter interaction from cross-linking assays (3c)
- enhancer RNAs (**eRNA**) have a short half-life so in low abundance

<!-- [^3]: Pennacchio 2013 -->

---

# Enhancer-promoter Looping

![](https://hackmd.io/_uploads/ByBEPgAEs.png)

<!-- Need an image that's simple but shows the eRNA coming from the region -->

---

# What the Reads Look Like

![Comparison of Assays](https://i.imgur.com/rcLuYPI.png =x500)

---

## Nascent Transcript(NT) and Transcription Start Sites(TSS)

![NT vs TSS](https://i.imgur.com/2PSwIKO.png)

- Currently 13+ assays for nascent transcript identification
- "minor changes in sample processing could lead to changes of up to >20% in the final results"

---

# History of Development

- Version 1.0 was developed by Ignacio Tripodi and Margaret Gruca and released Apr 16, 2019
- In 2017, THK lab started working to reproduce Kim et al. 2018 in a second dataset
- Struggled with building a reproducible pipeline in snakemake and creating CI/CD workflows and templates in January 2020
- Found nf-core in March 2020

---

# How far we've come

![Original DAG](https://i.imgur.com/vk93ZHL.png =210x)

[Original 2018 presentation](https://github.com/Emiller88/edmundmiller.dev/tree/master/static/presentations/2018-04-25)

---

# Obligatory Metro Map

![Nascent Metro Map](https://i.imgur.com/SQOYy6L.png =800x)

---

# CHM13 Support

![Increased MACS2 calls with CHM13](https://hackmd.io/_uploads/ryhtGhTVj.png)

---

# Transcript Identification

- GroHMM - Predicts transcripts from aligned GROSeq data in the form of bed files.
- HOMER - Transcript identification from GROSeq data
- PINTS - Identifies transcriptional regulatory elements (TREs) identified from nascent-transcript sequencing.

---

## GroHMM

![GroHMM vs HOMER](https://hackmd.io/_uploads/B1iWxl0Vj.png =450x)

- R package released in 2015 by Minho Chae, Charles Danko, & Lee Kraus
- Draw back is it requires tuning and is quite memory hungry
- [Recommended we use tunits instead](https://github.com/dankoc/groHMM/issues/4)

## <!-- .slide: font-size: 75%; -->

# HOMER

![HOMER Groseq](https://i.imgur.com/29L6tFA.png)

- Released in 2010 from the Glass lab and continued by Chris Brenner
- Created in a land before docker `configureHomer.pl`

---

# PINTS Identification

![PINTS Fig 5](https://hackmd.io/_uploads/SJ0tfx04s.png =750x)

<!-- TODO Check to see if groseq is giving a full transcript or just a start site -->

---

# PINTS

- Released in 2022 by Yu Lab and Lis Lab
- Determines the TSS site(opposed to entire transcription units)
- PINTS achieves optimal balance among resolution, robustness, sensitivity, specificity and computational resources required.
- Supports 10 assays out of the box

---

# Cunningham's Law

> The best way to get the right answer on the internet is not to ask a question; it's to post the wrong answer.

- Please open a issue or drop into slack!

---

## Need help?

<!-- .slide: data-background="https://raw.githubusercontent.com/maxulysse/maxulysse.github.io/main/assets/img/svg/green_white_bg.svg" -->

Repository: [`nf-core/nascent`](https://github.com/nf-core/nascent)
Tutorial: [`https://nf-co.re/nascent/2.0.0/usage`](https://nf-co.re/nascent/2.0.0/usage)
Chat: [`https://nf-co.re/join`](https://nf-co.re/join) <img src="https://cdn.brandfolder.io/5H442O3W/at/pl546j-7le8zk-6gwiyo/Slack_Mark.svg" width=7.5%></img>`#nascent`

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

---

# References

> Yao, L., Liang, J., Ozer, A. et al. A comparison of experimental assays and analytical methods for genome-wide identification of active enhancers.

> Pennacchio LA, Bickmore W, Dean A, Nobrega MA, Bejerano G. Enhancers: five essential questions. Nat Rev Genet. 2013 Apr;14(4):288-95. doi: 10.1038/nrg3458. PMID: 23503198; PMCID: PMC4445073.

> Chae M, Danko CG, Kraus WL (2015). “groHMM: a computational tool for identifying unannotated and cell type-specific transcription units from global run-on sequencing data.” BMC Bioinformatics, 16(222).

> Heinz S, Benner C, Spann N, et al. Simple combinations of lineage-determining transcription factors prime cis-regulatory elements required for macrophage and B cell identities. Mol Cell. 2010;38(4):576-589. doi:10.1016/j.molcel.2010.05.004

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

.reveal section img {
  border: none;
  margin: 0; }

.reveal img, .reveal video, .reveal iframe {
  max-height: 80%;
  height: 80%; }

.reveal figure img {
  box-shadow: none;
  max-width: 100%;
  object-fit: contain;
}

#refs { font-size: 0.5em; column-count: 2; }

</style>
