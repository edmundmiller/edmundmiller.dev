---
author: Edmund Miller
publishDate: '2022-03-31T12:02Z'
title: 'Why Julia Fits Bioinformatics'
description: Julia can reduce the number of languages bioinformatics teams need without abandoning the tools they already trust.
tags: ['Julia', 'Bioinformatics']
---

Bioinformatics teams often maintain code in R, Python, and Bash. Java and a compiled language may join that stack. Julia could reduce the spread. It offers strong numerical performance while calling the tools a team already trusts.

My friend [Teco](https://github.com/tecosaur) prompted me to look at Julia in 2022. I expected another scientific language. I found a practical way to write new code without first replacing decades of existing work.

## More than a two-language problem

Many scientific projects use one language for analysis and another for performance. Bioinformatics adds years of accumulated tools to that pair.

A team may depend on an old Perl script, an R package such as DESeq2, and Python code for sample tracking. Its workflows may use Bash, while tools such as GATK add Java. New performance work can introduce C or Rust.

[Snakemake](https://snakemake.readthedocs.io/en/stable/) and [Nextflow](https://www.nextflow.io/) help teams run these tools together. Containers preserve their dependencies. Neither choice answers which language a team should use for new libraries and analyses.

Julia is interesting because the same language can support interactive analysis and compiled numerical code. That does not remove every boundary, but it can prevent another language from entering the stack.

![Julia reaches full speed without a separate compiled implementation](https://edmundmiller.dev/static/julia-100.png)

## Existing code can stay

Adopting Julia does not require a complete rewrite. [RCall.jl](https://juliainterop.github.io/RCall.jl/) can call R, while [PyCall.jl](https://www.juliapackages.com/p/pycall) can call Python. The [JuliaInterop](https://github.com/JuliaInterop) organization maintains more bridges.

That matters for a team with validated C functions or a Python library tied to internal systems. New Julia code can call those components while the team changes only what it needs to change.

## The BioJulia community

[BioJulia](https://biojulia.net/) collects packages for common biological data formats and analyses. In 2022, the community was smaller than its R and Python counterparts. It had already covered many formats I used each day.

Finding the active community took some effort. I first asked a question in Gitter. Someone there directed me to the [#biology channel in Julia Slack](https://julialang.slack.com/archives/CAKKFNYLD), where most live discussion happened.

I wanted to test these packages on real projects, improve documentation, and write about the missing pieces. That work would be more useful than claiming the ecosystem was already complete.

## Developer time is part of compute cost

Bioinformatics projects balance runtime, cloud cost, and grant limits. [Lynn Langit discussed that tradeoff](https://www.lastweekinaws.com/podcast/screaming-in-the-cloud/quantum-leaps-in-bioinformatics-with-lynn-langit/) on _Screaming in the Cloud_. A result tomorrow may be acceptable if running it today costs much more.

Developer time belongs in the same calculation. A faster program saves little if it takes months to write and remains hard to maintain.

Julia was [designed as a general programming language for scientists](https://julialang.org/blog/2012/02/why-we-created-julia/). Its creators wanted interactive work, compiled performance, familiar mathematics, and broad use in one open-source language. Bioinformatics needs that combination more than it needs another isolated fast tool.

Julia will not replace every established package. It can give teams one place for new analysis and performance code while letting proven tools remain in use. That is the practical reason I am excited about it.

## How to get started

- Browse [BioJulia](https://biojulia.net/) and its packages.
- Explore [JuliaData](https://github.com/JuliaData/) and [JuliaStats](https://juliastats.org/).
- Listen to the [Talk Julia podcast](https://www.talkjulia.com/).
- Work through a course on [JuliaAcademy](https://juliaacademy.com/).
- Read work from [Logan Kilpatrick](https://www.logankilpatrick.com/), then Julia's developer community advocate.

### 2023 update

The [BioJulia tutorials](https://github.com/BioJulia/BioTutorials) now provide notebooks for learning the ecosystem. BioJulia projects also gained new Documenter.jl documentation.
