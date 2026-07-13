---
title: Nextflow vs Snakemake
description: Choosing between target-driven rules, dataflow channels, and larger data orchestrators
draft: true
publishDate: 2024-06-10
tags: ['bioinformatics', 'nextflow', 'snakemake']
---

My team once used a Makefile-based pipeline and later moved to Nextflow. I
initially described the difference as pulling versus pushing data. That
shorthand hides the useful distinction.

Snakemake is target-driven. Nextflow uses a dataflow model. Neither description
refers to the physical direction of file transfers.

# Snakemake starts from a target

A [Snakemake rule](https://snakemake.readthedocs.io/en/stable/tutorial/basics.html)
declares how input files produce output files. A user requests a target file,
and Snakemake recursively finds rules that can produce its inputs.

Those rule matches form the job graph. Existing outputs can also keep
up-to-date jobs from running again.

This model fits an analysis whose products have clear file names. A plot can be
a target, while its data preparation remains a chain of prerequisites. The
author does not need to wire every job instance by hand.

# Nextflow starts from available values

A [Nextflow workflow](https://www.nextflow.io/docs/latest/workflow.html)
connects processes through asynchronous channels. Processes consume channel
values and emit values for later processes.

Operators make those relationships explicit. A workflow can transform or
filter values. It can also join, group, or combine them before another process
consumes them. Named workflows declare their inputs and outputs.

That model fits reusable pipelines where samples split into parallel work,
rejoin by metadata, and pass through several process boundaries. The graph
follows the values rather than inferred file-name matches.

# The complexity moves

Snakemake does not become difficult merely because it runs many jobs. The
target model becomes harder to read when rule matching carries more meaning.

Wildcards, target variants, aggregation rules, and conditional file patterns
can make one requested output match several possible paths. A collaborator must
reason backward through those matches.

Nextflow does not remove that complexity. It moves complexity into channel
contents, operators, joins, and process interfaces. A collaborator must track
the shape and timing of values moving forward.

The better model is the one that makes a workflow's changing parts explicit.
File-oriented analyses often fit Snakemake. Pipelines with repeated fan-out,
grouping, and reuse often fit Nextflow.

# Where Airflow and Dagster fit

The size of one analysis is not the only form of scale. Operational scale
includes schedules, external events, and retries. It also includes run history
and multiple teams.

[Airflow](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/overview.html)
includes a scheduler, API server, DAG processor, and metadata database. Those
components support operating scheduled workflows, but they also create a
service to deploy and maintain.

[Dagster](https://docs.dagster.io/) treats data products as assets and includes
lineage and observability. That is useful when a plot belongs to a recurring
data product with upstream assets and operational checks.

A single plot does not require either platform. A script or one Snakemake
target may be enough. Airflow or Dagster becomes relevant when operating the
workflow is a larger problem than creating the plot.

# My choice

I prefer Nextflow for reusable bioinformatics pipelines with several process
boundaries. Its channels expose the data relationships that I need to review
and change.

I would choose Snakemake for a smaller file-oriented analysis where the desired
outputs naturally define the work. The choice is not simple versus complex. It
is target resolution versus explicit dataflow, followed by the maintenance cost
of that model.
