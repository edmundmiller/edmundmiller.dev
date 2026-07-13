---
title: Intro to GenomicFeatures in Julia
description: Comparision of GenomicRanges and GenomicFeatures
publishDate: 2023-08-16
draft: true
tags: ['Julia', 'Genomics']
---

I wanted to use Julia for follow-up analysis of genomic intervals. [BioJulia's GenomicFeatures](https://github.com/BioJulia/GenomicFeatures.jl/tree/v2.0.5) had the core types and overlap code I needed. The missing piece was an end-to-end example with two BED files and a useful output.

R users may know the model from the [Bioconductor GenomicRanges introduction](https://bioconductor.org/packages/release/bioc/vignettes/GenomicRanges/inst/doc/GenomicRangesIntroduction.html). A `GRanges` object keeps ranges and annotations together. GenomicFeatures uses an `IntervalCollection`, and an interval's `metadata` field can retain its source [`BED.Record`](https://github.com/BioJulia/BED.jl/blob/v0.3.0/docs/src/man/bed.md).

This example targets GenomicFeatures 2.x and BED 0.3.x, the compatible package versions used when I started the draft. Add them from the Julia package prompt:

```julia
pkg> add GenomicFeatures@2 BED@0.3
```

## Prepare the BED files

Start with three coordinate-sorted BED files:

- `H3K27ac.consensus_peaks.bed`
- `p63_4A4.consensus_peaks.bed`
- `genes.bed`

The two peak files need at least the three required BED columns. Add names in column four if you want named peak-gene results. The gene file also needs gene names in column four.

The original draft downloaded the same URL under both peak filenames. I removed that block because it could not produce a valid comparison.

## Load the intervals

Use one helper to turn each BED reader into an indexed collection:

```julia
using BED
using GenomicFeatures

function read_bed(path)
    open(BED.Reader, path) do reader
        IntervalCollection(reader)
    end
end

h3k27ac = read_bed("H3K27ac.consensus_peaks.bed")
p63 = read_bed("p63_4A4.consensus_peaks.bed")
```

`IntervalCollection` expects sorted intervals. Sort the BED files by chromosome and start position before loading them.

## Find and write the overlaps

[`eachoverlap`](https://github.com/BioJulia/GenomicFeatures.jl/blob/v2.0.5/src/overlap.jl) yields one pair for each H3K27ac and p63 interval that overlaps:

```julia
overlaps = collect(eachoverlap(h3k27ac, p63))
```

The code below writes the shared span of each pair as a three-column BED record. GenomicFeatures uses one-based, closed intervals in memory. BED starts are zero-based, so the output start subtracts one.

```julia
open("H3K27ac_p63.intersections.bed", "w") do io
    writer = BED.Writer(io)

    for (h3k27ac_peak, p63_peak) in overlaps
        start = max(leftposition(h3k27ac_peak), leftposition(p63_peak))
        stop = min(rightposition(h3k27ac_peak), rightposition(p63_peak))
        record = BED.Record("$(seqname(h3k27ac_peak))\t$(start - 1)\t$(stop)")
        write(writer, record)
    end
end
```

## Find genes within 200 kb

"Within 200 kb" needs a precise rule. Here it means that a gene interval overlaps a peak after extending that peak by 200,000 bases on both sides.

```julia
genes = read_bed("genes.bed")

nearby = [
    (
        peak=BED.name(metadata(peak)),
        gene=BED.name(metadata(gene)),
    )
    for peak in h3k27ac
    for gene in eachoverlap(
        genes,
        Interval(
            seqname(peak),
            max(1, leftposition(peak) - 200_000),
            rightposition(peak) + 200_000,
        ),
    )
]
```

This returns peak-gene pairs. It does not calculate distance to a transcription start site or select one nearest gene. Those are different rules and should be encoded separately.

The useful pattern is small: load sorted records into `IntervalCollection`, stream overlap pairs with `eachoverlap`, and recover BED fields through `metadata`. That fills the practical gap I found without pretending GenomicFeatures is a direct copy of `GRanges`.
