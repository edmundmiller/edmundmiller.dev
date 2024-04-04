---
author: Edmund Miller
title: Nextflow Rclone
description: Been dying to try out the rclone stageoutmode
publishDate: "Sep 29 2023"
draft: true
tags: ["Nextflow"]
---

Okay, so like most people, I\'ve just been dying to try out the [nextlow
rclone
stageoutmode](https://www.nextflow.io/docs/latest/process.html#stageoutmode),
ever since I listened to the [channels podcast
episode](https://www.nextflow.io/podcast/2023/ep11_sarus_out_git.html)
that mentioned it. I just hadn\'t gotten around to it 😬.

# Setting up Rclone with Box

So, first and foremost, my lovely organization uses box to store all of
our files. We have unlimited box storage. However, box isn\'t like S3.
That\'s both good and bad. It\'s a little more user friendly to share
and organize files. Its also a lot less programmatic. So, I originally
set out to create a script and connect these things and try to write an
API to upload files from our HPC server to box because they don\'t want
you to have the data there, but we don\'t have anywhere else to store
the data. And also just so that people can access those files. So, did
that for a while, started down that path and then I found our clone and
I found love. So I just use our clone for S3 now, B2, R2, box, Google
Photos, everything into the sun. It just kind of seamlessly connects
between all of those locally and not. I even use it for my backups
through

\"So, first and foremost, my lovely organization uses Box to store all
of our files and we have unlimited storage. However, Box isn\'t like S3.
That\'s both good and bad. It\'s a little more user-friendly for sharing
and organizing files. It\'s also less programmable. Originally, I set
out to create a script to connect these things and write an API for
uploading files from our HPC server to Box because they don\'t allow
data to be stored on the stratch array, but we don\'t have anywhere else
to store the large data files. Another added benefit is I can quickly
share the results with labmates and we don\'t have to worry about
keeping multiple backups. I did that for a while, started down that
path, and then I found our [rclone](https://rclone.org/) and fell in
love. Now I just use our rclone for S3, B2, R2, Box, Google Photos, and
everything under the sun. It seamlessly connects between all of those
locally and remotely. I even use it for my backups using
[restic](https://restic.readthedocs.io/en/stable/index.html).

So, if we refer to the official [Rclone documentation for
box](https://rclone.org/box/), it\'s pretty easy to get started.
However, the problem is that logging into box through our SSO can become
a little bit of a problem. We ended up wanting something that looks like
this on there.

```toml
[remote]
type = box
token = {"access_token":"XXX","token_type":"bearer","refresh_token":"XXX","expiry":"2017-07-08T23:40:08.059167677+01:00"}
```

The problem with logging on through SSO is that we\'re gonna really
struggle if we do it on the HPC server. I typically like to just do this
on my local computer and then run rclone config. And then I will go into
a new remote, called box.

We\'ll select 8 for box. I leave everything blank and then select 1 for
\"Rclone should act on behalf of a user\". Lastly, the important message
is this web browser automatically authenticate rclone with the remote.
Basically, without web browser, I access this might be a little more
difficult.

```log
Use web browser to automatically authenticate rclone with remote?
 * Say Y if the machine running rclone has a web browser you can use
 * Say N if running rclone on a (remote) machine without web browser access
If not sure try Y. If Y failed, try N.

y) Yes (default)
n) No
y/n>
```

Pop it open and grant access to box.

Then we\'ll copy the three box lines of the config over to the HPC head
node.

```bash
rsync ~/.config/rclone/rclone.conf <user>@<server-hostname-or-ip>:~/.config/rclone/rclone.conf
```

We could use `rclone` to copy the whole config for style points if this
is your first rclone config and there\'s no other values in the config.

```toml
[hpc]
type = sftp
host = example.com
user = sftpuser
key_file = ~/id_rsa
pubkey_file = ~/id_rsa-cert.pub
```

```bash
rclone ~/.config/rclone/rclone.conf hpc:~/.config/rclone/rclone.conf
```

# Nextflow

<https://github.com/nextflow-io/rnaseq-nf>

So, what we\'re going to do now is, oh, a new example pipeline. So,
we\'re just going to use the, but we kind of need some output stacks to
copy these things. So, we\'re just going to use the next flow RNA-seq
enough pipeline. And I\'m going to run it with Singularity as well,
because I\'m on an HPC system. Probably I should just use the slurm
profile. First on those, but the other thing that we\'re going to need
to do is, we\'re going to need to create a nextflow.config first. And
we\'re not going to have to put too much in it.

```nextflow
process {
stageOutMode
}
```

Note from the docs:

> (note: it must be available in your cluster computing nodes, requires
> version 23.01.0-edge or later).

And that\'s the end of the line, I misunderstood. It\'s just for how the
files \"output files are staged-out from the scratch directory to the
process work directory\". To quote the docs.

We need a new [publishdir
mode](https://www.nextflow.io/docs/latest/process.html#publishdir). Stay
tuned!
