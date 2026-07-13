---
title: Converting lcep to Julia
description: Comparing the data preparation required by Python and Julia implementations of a small expression classifier.
publishDate: 2024-06-01
draft: true
tags: ['Julia', 'Genomics', 'machine-learning']
---

This post follows my JuliaCon 2023 talk, [Exploring the State of Machine Learning for Biological Data](https://live.juliacon.org/speaker/AA9NAK). I wanted to learn which parts of a small Python machine-learning project became simpler in Julia.

I ported the data preparation from [mlf-core/lcep](https://github.com/mlf-core/lcep), a liver-cancer expression classifier. Related repositories package the Python model and call it from a [Nextflow pipeline](https://github.com/mlf-core/nextflow-lcep).

## The porting goal

The dataset stores genes in rows and samples in columns. A sample name beginning with `1_` represents cancer, while `0_` represents normal tissue.

The port needed to preserve three operations:

1. load the training and test tables;
2. extract the class label from each sample name;
3. present samples as rows for model training.

I focused on those transformations. I did not reproduce the complete Python package, container, or Nextflow integration in this draft.

## Loading the input

The original MLflow project accepts paths through parameters in its [MLproject file](https://github.com/mlf-core/lcep/blob/d463c9984c5669659b2cb77ba7cac0ed0e270294/MLproject#L13-L22). My Julia version downloaded the same checked-in tables and loaded them with CSV.jl and DataFrames.jl:

```julia
train_url = "https://github.com/mlf-core/lcep/raw/master/data/train.tsv"
test_url = "https://github.com/mlf-core/lcep/raw/master/data/test.tsv"

train_data = DataFrame(CSV.File(download(train_url)))
test_data = DataFrame(CSV.File(download(test_url)))
```

This made the source URLs visible beside the loading code. It did not solve data provenance. The upstream repository still needs to explain where the tables originated.

## Making samples into rows

The Python implementation parses the tab-separated file by hand. It builds feature values, labels, gene names, and sample names in separate lists.

The important operation is the transpose. Gene rows become feature columns, and sample columns become observations. The label prefix becomes a separate `status` column.

In Julia, I expressed those table operations directly:

```julia
function clean_data(input)
    input_zeros = input[findall(x -> x != 0, names(input)), :]
    input_id = input_zeros[!, Not(2)]
    input_flip = rename(permutedims(input_id, "Gene ID"), "Gene ID" => :status)

    transform(
        input_flip,
        :status => ByRow(x -> parse(Float64, split(x, "_")[1])) => :status,
    )
end
```

`permutedims` performs the transpose. `transform` then parses the label from each sample name. The transformation stays inside the table abstraction.

The code still needs clearer names and tests. The zero-row filter must also be verified against the intended feature-selection rule before publication.

## Preparing XGBoost input

The Python project converts its parsed lists into NumPy arrays and XGBoost matrices. It then wraps those values in a project-specific `Dataset` class.

The later code uses only part of that wrapper. In the Julia experiment, XGBoost.jl accepted a table of features paired with a label vector:

```julia
using DataFrames

df = DataFrame(randn(100, 3), [:a, :b, :y])
bst = xgboost((df[!, [:a, :b]], df.y))
```

That removed an intermediate project-specific container. It did not prove that Julia was faster or uniquely capable. Python could express the same transformation with pandas.

## Result

The port made the central data transformation easier for me to see. Loading, transposing, labeling, and training could remain table operations.

The experiment is incomplete. Before publication, it needs tests against the Python outputs and a recorded training result. The useful comparison is already narrower: Julia reduced adapter code in this example. The work around data provenance and workflow execution remained.
