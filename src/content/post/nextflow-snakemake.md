---
title: Nextflow vs Snakemake
description: Nextflow and Snakemake comparison that actually takes a stance
draft: true
publishDate: 2024-06-10
tags: ["bioinformatics", "nextflow", "snakemake"]
---

In the past we did a Makefile based pipeline, and then moved on to Nextflow. The two have very different paradigmes a "pull" vs a "push" of the data.

The "pull" of Makefiles and Snakemake is clever and intuitive to use. You create "recipes" for files that you want to create and then you just ask for what you want and the DAG figures out how to make it. That's really great for simple analysis! It's quick and works.

However when you start trying to use the paradigm to process complex workflows the complexity becomes huge quickly and it's difficult to collaborate on and starts to move really slowly.
