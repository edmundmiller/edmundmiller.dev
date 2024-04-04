---
title: Intro to GenomicFeatures in Julia
description: Comparision of GenomicRanges and GenomicFeatures
publishDate: 2023-08-16
draft: true
tags: ["Julia", "Genomics"]
---

<https://www.dominodatalab.com/blog/genomic-ranges-an-introduction-to-working-with-genomic-data>
<https://bioconductor.org/packages/release/bioc/vignettes/GenomicRanges/inst/doc/GenomicRangesIntroduction.html>
<https://www.dominodatalab.com/data-science-dictionary/genomicranges>

I\'ve been trying to use Julia more for some tertiary analysis of
genomic data. It seems that [BioJulia](https://biojulia.net/) has a
package for every bioinformatics format created, so far. However, I\'ve
been missing the supplementary blog posts that show you the real world
use of these packages. Or maybe something like the great documentation
[PyRanges](https://biocore-ntnu.github.io/pyranges/) has.

# Downloading our data

``` julia
using Downloads

if !isfile(raw"H3K27ac.consensus_peaks.bed")
    Downloads.download("https://utdallas.box.com/shared/static/y4glk8y8chjq5fuv6iowe6bjz1vovkr3.bed", "H3K27ac.consensus_peaks.bed")
    Downloads.download("https://utdallas.box.com/shared/static/y4glk8y8chjq5fuv6iowe6bjz1vovkr3.bed", "p63_4A4.consensus_peaks.bed")
end
```

# Find overlaps

So you want to find some overlaps?

``` julia
using GenomicFeatures
using BED

# Create an interval collection in memory.
h3k27ac_icol = open(BED.Reader, "H3K27ac.consensus_peaks.bed") do reader
    IntervalCollection(reader)
end

p63_icol = open(BED.Reader, "p63_4A4.consensus_peaks.bed") do reader
    IntervalCollection(reader)
end

overlap_icol = eachoverlap(h3k27ac_icol, p63_icol)
overlaps = collect(overlap_icol)
overlaps
```

# [TODO]{.todo .TODO} Write to bed file

# [TODO]{.todo .TODO} Find genes within 200KB
