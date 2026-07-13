---
title: What Excited Me About Hugging Face
description: How separate repositories for models, datasets, and demos can make machine-learning work easier to share and reproduce.
publishDate: 'Mar 22 2024'
draft: true
tags: ['machine-learning']
---

Machine-learning projects are hard to repeat when they publish code without models, data versions, or software details. In early 2024, [Hugging Face](https://huggingface.co/) gave me a clear way to share those pieces.

Its split among models, datasets, and Spaces matched three different jobs. Each artifact could change at its own pace while remaining connected to the others.

## Model repositories

A model repository did not have to live inside the code that trained it. That separation let a project publish trained weights without filling the source repository with large files.

It also made checkpoints easier to share. A collaborator could compare stages of training or start from a saved point instead of repeating the full run.

The repository alone did not make a run repeatable. A useful model still needed its training code, package versions, input data, and test details. Hugging Face provided a place for the large file and its notes.

## Dataset repositories

Dataset repositories gave projects a named, versioned input. The datasets library could download a complete dataset or stream records without storing every file locally.

Loading and cleanup code could live beside the data notes. That reduced the hidden steps between a public dataset and the version used by a model.

This flexibility also made the platform feel large. A new user still needed to understand Git, repository versions, and the relationship between raw and processed data. The tools did not remove those concepts.

## Spaces

Spaces turned a small application into a hosted model demonstration. A demo could pull a model and dataset from their repositories, then expose the result through a web interface.

That made an experiment easier to inspect than a notebook screenshot. Someone could try the model before cloning its code or downloading its weights.

I used this pattern for a small project and planned to write about its implementation separately. The important point was the boundary: model, data, application, and training code remained distinct artifacts.

## The genomics limit

The platform felt most natural for text, images, and tabular examples. My genomics data did not fit those paths as cleanly. Large domain formats, reference files, and access controls added requirements that a general dataset repository did not solve.

Hugging Face raised my expectations for sharing machine-learning work. It did not make every project repeatable by default. For genomics, I still needed a plan for domain files, source history, and restricted data.
