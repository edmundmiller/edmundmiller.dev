---
title: Converting lcep to Julia
description: Exploring the State of Machine Learning for Biological
Data
publishDate: 2024-06-01
draft: true
tags: ["Julia", "Genomics", "machine-learning"]
---

This post is part of a follow-up blog series on a talk I gave a Juliacon
2023, [Exploring the State of Machine Learning for Biological
Data](https://live.juliacon.org/speaker/AA9NAK).

# Overview

The goal of this post is to explore the use of Julia for
machine-learning in biological data. To do this I\'ve converted several
projects that were written in python using the
[*mlf-core*]{.spurious-link target="TODO"} framework. These are a great
starting point because they were designed to demonstrate best practices
for reproducible machine learning with different machine learning
frameworks.

lcep was a nice warm-up in particular because it\'s purpose was to
demonstrate [creating a python package using
mlf-core](https://github.com/mlf-core/lcep-package), and using the
package in [a Nextflow
pipeline](https://github.com/mlf-core/nextflow-lcep).

Here\'s a link to the [original lcep
repo](https://github.com/Emiller88/state-of-ml-for-biology-julia/tree/main/lcep)
and here\'s the [*repo with the Julia code*]{.spurious-link
target="TODO"} if you want to view the project in it\'s entirety.

## Dataset

  Row   Gene ID           Gene Name   1\\~bce80114~-27b0-4318-9af1-d8fdf85ffd9c   0\\~SRR143622~
  ----- ----------------- ----------- ------------------------------------------- ----------------
  3     ENSG00000004975   missing     18.7965                                     14.2893
  4     ENSG00000005339   missing     78.4725                                     83.0387
  5     ENSG00000005884   missing     11.0217                                     2.70558
  7     ENSG00000006451   missing     34.9154                                     17.5549

Basically you have observations of genes in each row, and the columns
are the sample values. There\'s some hidden meta data in the sample
names where the `1_`{.verbatim} prefix indicates the sample is cancerous
and `0_`{.verbatim} indicates it\'s a normal sample.

# Data Loading

## Data loading

The data files were kept in the repo. Personally this is one of my pet
peeves to add inputs, or outputs of pipelines and analysis to a git
repo. If they\'re large slows the repo down and makes cloning difficult
on a poor internet connection. Second and more importantly, it removes
the origin of the data. Where did it come from? Is it a reputable
source? What if I want to find a similar adjacent dataset? What\'s the
metadata?

What\'s even worse is when it\'s just a local file path, without even a
url of where the file came from. We\'ll let it slide this time though
because it made it easy for me to find the dataset and reproduce.

### mlf-core

``` python
training_data, test_data = load_train_test_data(dict_args['training_data'], dict_args['test_data'])
```

In an MLFlow project the data can be loaded in from a cli arg using
`--training-data` and is configured in the [MLproject
file](https://github.com/mlf-core/lcep/blob/d463c9984c5669659b2cb77ba7cac0ed0e270294/MLproject#L13-L22)

``` yaml
entry_points:
  main:
    parameters:
      training-data: {type: string, default: 'train.tsv'}
```

### Julia

Because of some Julia niceties we can just download the file and load it
right into a DataFrame. [^1]

``` julia
train_url = "https://github.com/mlf-core/lcep/raw/master/data/train.tsv"
test_url = "https://github.com/mlf-core/lcep/raw/master/data/test.tsv"

train_data = DataFrame(CSV.File(download(train_url)))
test_data = DataFrame(CSV.File(download(test_url)))
```

## Data Cleaning

They say the data cleaning step is 90% of data science.

\"They\" are right.

### mlf-core

``` python
def parse_tpm_table(input):
    X_train = []
    y_train = []
    gene_names = []
    sample_names = []
    with open(input, "r") as file:
        all_runs_info = next(file).split("\n")[0].split("\t")[2:]
        for run_info in all_runs_info:
            split_info = run_info.split("_")
            y_train.append(int(split_info[0]))
            sample_names.append(split_info[1])
        for line in file:
            splitted = line.split("\n")[0].split("\t")
            X_train.append([float(x) for x in splitted[2:]])
            gene_names.append(splitted[:2])

    X_train = [list(i) for i in zip(*X_train)]

    return X_train, y_train, gene_names, sample_names
```

In an effort to explain what\'s going on here, they\'re parsing the TSV
by hand(for loop?). The important thing to note is they\'re splitting
the sample statuses off into the `y_train` array to be used as labels.
The TPM([*transcripts per million*]{.spurious-link
target="TODO add link to biostars"}) is then placed into the `X_train`
array.

To be fair this could probably be done in pandas and that might clean up
some of the syntax complexity and expose the business logic making it
easier for collaborators to read.

### Julia

``` julia
function clean_data(input)
    # Drop any rows that are 0s
    input_zeros = input[findall(x -> x != 0, names(input)), :]
    # Drop Gene Name col
    input_id = input_zeros[!, Not(2)]
    # Flip the dataframe
    input_flip = rename(permutedims(input_id, "Gene ID"), "Gene ID" => :status)

    # The 1_s(cancer) and 0_s(normal) are the labels
    # Split status column by _ and take the first
    transform(input_flip, :status => ByRow(x -> parse(Float64, split(x, "_")[1])) => :status)
end
```

Meanwhile in Julia, there\'s some fancy syntactical sugar going on that
may not make sense to new users but the logic is easy to follow.

## Data Loading

### mlf-core

``` python
def load_train_test_data(train_data, test_data):
    X_train, y_train, train_gene_names, train_sample_names = parse_tpm_table(train_data)
    X_test, y_test, test_gene_names, test_sample_names_test = parse_tpm_table(test_data)

    # Convert to Numpy Arrays
    X_train_np = np.array(X_train)
    X_test_np = np.array(X_test)

    # Convert from Numpy Arrays to XGBoost Data Matrices
    dtrain = xgb.DMatrix(X_train_np, label=y_train)
    dtest = xgb.DMatrix(X_test_np, label=y_test)

    training_data = Dataset(X_train_np, y_train, dtrain, train_gene_names, train_sample_names)
    test_data = Dataset(X_test, y_test, dtest, test_gene_names, test_sample_names_test)

    return training_data, test_data
```

The python version of the code isn\'t too complicated but there are some
extra steps. For example the training data must first be converted into
a numpy array, so it can then be converted into a XGB DMatrix. We\'re
also missing some context on what the `Dataset` class is.

``` python
@dataclass
class Dataset:
    X: np.ndarray
    y: list
    DM: xgb.DMatrix
    gene_names: list
    sample_names: list
```

This is a nice idea, it just doesn\'t get used later in the code because
the only thing that\'s used in the `DM` field and later the `y` field on
the test data.

### In Julia

The Julia package just accepts tabular data out of the box. A lot of
Julia packages just work together, and flow in and out with stdlib
Julia. Kinda like Tidyverse.

Here\'s the example from the docs because there\'s not a short example
to show this in the Julia version because it just happens and isn\'t
really obvious.

``` Julia
using DataFrames
df = DataFrame(randn(100,3), [:a, :b, :y])

# can accept tabular data, will keep feature names
bst = xgboost((df[!, [:a, :b]], df.y))
```

# Training the Model

# Appendix

## [TODO]{.todo .TODO} [GitHub - Evovest/EvoTrees.jl: Boosted trees in Julia](https://github.com/Evovest/EvoTrees.jl) {#github---evovestevotrees.jl-boosted-trees-in-julia}

## [TODO]{.todo .TODO} Add pandas TPM parsing {#add-pandas-tpm-parsing}

# Footnotes

[^1]: To be fair pandas and the readr have this functionality as well
