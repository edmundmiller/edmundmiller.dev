---
title: Hosting a UCSC Track Hub on Hugging Face
description: How I arranged public ChIP-seq results in a Hugging Face dataset repository for the UCSC Genome Browser.
draft: true
publishDate: '25 July 2024'
tags: ['genomics', 'guide']
---

I reanalyzed the [Mikkelsen 2007](https://doi.org/10.1038/nature06008) data for my summer Applied Genomics course. The nf-core ChIP-seq results included BAM and BigWig files that students needed to inspect.

Downloading the full output was unnecessary. The UCSC Genome Browser can read indexed track files from a public web server. I needed a host for the results and three small hub configuration files.

## Why I used Hugging Face

I put the results in the public [`funlab/mikkelsen_2007`](https://huggingface.co/datasets/funlab/mikkelsen_2007) dataset repository. It contains the pipeline output and keeps its revisions in Git.

Several files in that repository exceed 100 MiB. GitHub requires Git LFS beyond that limit. Hugging Face dataset repositories track large files with Xet or Git LFS.

The repository also exposes each file through a stable HTTPS path. UCSC can follow those paths and request only the needed regions from indexed genomic files.

This was an operational choice, not a claim about unlimited or permanent free storage. Hosting also does not grant permission to redistribute data. The repository needs clear source and license metadata before this guide is published.

## Repository layout

The public repository uses this relevant subset of the nf-core output:

```text
hub.txt
genomes.txt
bowtie2/mergedLibrary/
├── trackDb.txt
└── bigwig/
    └── ESHyb_H3K4me3_IP.bigWig
```

Hugging Face serves files from the `main` branch under this base URL:

```text
https://huggingface.co/datasets/funlab/mikkelsen_2007/resolve/main/
```

The relative paths inside the hub files follow the repository layout. That lets the same commit contain configuration and track data.

## Define the hub

The top-level `hub.txt` points UCSC to `genomes.txt`:

```text
hub mikkelsen2007
shortLabel Mikkelsen 2007
longLabel Mikkelsen 2007 ChIP-seq reanalysis
genomesFile genomes.txt
email eam150030@utdallas.edu
```

The current public file already has this structure and maintainer address. Its generic long label should be replaced before publication.

The top-level `genomes.txt` selects the mouse `mm10` assembly and locates the track database:

```text
genome mm10
trackDb bowtie2/mergedLibrary/trackDb.txt
```

Finally, `bowtie2/mergedLibrary/trackDb.txt` defines the displayed track:

```text
track H3K4me3Signal
bigDataUrl bigwig/ESHyb_H3K4me3_IP.bigWig
shortLabel H3K4me3 Signal
longLabel Depth of alignments of H3K4me3 reads
type bigWig
```

The `bigDataUrl` is relative to `trackDb.txt`. It therefore resolves to the BigWig file in the neighboring `bigwig` directory.

Each additional BigWig needs its own stanza. A useful stanza names the sample and mark clearly enough to distinguish them in UCSC.

## Load the hub in UCSC

The hub entry point is the raw `hub.txt` URL:

```text
https://huggingface.co/datasets/funlab/mikkelsen_2007/resolve/main/hub.txt
```

In the Genome Browser, open **My Data**, choose **Track Hubs**, and select **My Hubs**. Paste that URL and choose **Add Hub**.

UCSC reads `hub.txt`, follows `genomes.txt`, and loads the `mm10` track definitions. The browser then requests BigWig regions from Hugging Face as the visible locus changes.

## What remains before publication

The public repository proves the file layout and HTTPS paths. It does not yet provide enough evidence for me to call the guide complete.

I still need to replace the generic hub metadata, add reuse terms, and run UCSC's `hubCheck`. I also need to record a browser smoke test showing the H3K4me3 signal on `mm10`.

Those checks separate “the files are hosted” from “students can load and interpret the hub.” The distinction matters more than the choice of storage service.

## References

- [UCSC Track Hub documentation](https://genome.ucsc.edu/goldenPath/help/hgTrackHubHelp)
- [Hugging Face repository documentation](https://huggingface.co/docs/hub/repositories)
- [GitHub large-file limits](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
