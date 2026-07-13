---
author: Edmund Miller
title: Nextflow Rclone
description: What Nextflow's rclone stage-out mode does and how I configured Box on an HPC system
publishDate: 'Sep 29 2023'
draft: true
tags: ['Nextflow']
---

I wanted to use Nextflow's
[`stageOutMode 'rclone'`](https://www.nextflow.io/docs/latest/reference/process.html#stageoutmode)
to send pipeline results from an HPC cluster to Box. It does not provide that
kind of transfer.

`stageOutMode` controls how a task moves declared outputs from node-local
scratch space into its Nextflow work directory. The rclone mode uses rclone for
that copy, so rclone must exist in the task environment.

It does not publish results from the work directory to a Box remote. That
requires a separate publishing or transfer step. I stopped this experiment
once I confirmed the limitation.

# Why I use rclone with Box

My organization stores shared files in Box. Our HPC scratch storage is not a
long-term home for large results, and Box makes those results accessible to my
labmates.

I first considered writing a Box upload script. Then I found
[rclone](https://rclone.org/), which already supports Box and the other storage
services I use. I also use it with
[restic](https://restic.readthedocs.io/en/stable/index.html) for backups.

# Configure Box from a browser

Follow the official [rclone Box setup](https://rclone.org/box/) on a machine
with a browser. Run `rclone config`, create a Box remote, and choose the user
account option.

If the Box enterprise account uses SSO, create a Box password under Settings,
Account, and Authentication. Then use that password during rclone setup.

For a headless cluster, begin configuration on the cluster and decline browser
authentication. Run the displayed `rclone authorize "box"` command on the
browser-equipped machine, then paste its token into the cluster prompt.

This keeps the cluster's Box token in the cluster configuration. It also
avoids sharing one refresh token between two active rclone installations.

# Copying an existing configuration

Rclone also documents copying an existing configuration to a headless host.
First, locate the file on both machines:

```bash
rclone config file
```

Create the destination directory, then transfer the file with `rsync`:

```bash
ssh <user>@<server> 'mkdir -p ~/.config/rclone'
rsync ~/.config/rclone/rclone.conf <user>@<server>:~/.config/rclone/rclone.conf
```

Treat that file as a secret because it contains access and refresh tokens.
After copying a Box remote, do not use the same remote from both machines. Box
refresh tokens are single-use and rotate when refreshed.

If an rclone SFTP remote named `hpc` already exists, `copyto` is an optional
transfer method:

```bash
rclone copyto ~/.config/rclone/rclone.conf hpc:.config/rclone/rclone.conf
```

This command copies one file to the named path. It is only useful when the
SFTP remote and destination directory are already configured.

# Result

The Box configuration remained useful, but it did not make rclone a Nextflow
publishing mode. The stage-out setting only changes the scratch-to-work copy.
