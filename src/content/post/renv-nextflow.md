---
author: Edmund Miller
title: Reproducing R code in a container
description: Building an renv environment in a Docker container for Nextflow
publishDate: "Nov 26 2023"
tags: ["Nextflow", "R", "bioinformatics", "murder-mystery", "software"]
draft: true
---

It seems like every time that I talk to somebody who uses our, they have
an update, there are versions in a very long time, because every time
that they do, a package breaks on them. This happens pretty often in my
live group, for example. We have some projects that may not be able to
be picked back up after they\'re not working properly, or after that
computer dies on us. So, recently, I\'ve been trying to put everything
in a calm environment. But the issue that I\'ve ran into, some helping a
student turn a couple of our scripts into an excellent pipeline. And the
problem is that those scripts, we\'ve been running them, and they work
in our studio, but then they don\'t work when we run them on the
cluster. So we ran both of them, split up the scripts, ran it in our
studio, runs just fine on our laptop, doesn\'t run on the cluster. I\'m
very excited about this, because this is always the fun problem that I
love to solve of containerization of software packages. However, the
problem was that she was using an old version of R because if she
upgraded a package and filled in our local laptop, that should have been
hit number one, that something was wrong. So then we went down the
rabbit hole of trying out RIM. And RIM is a cool package that basically
scrapes your entire R project, pulls in all of your libraries,
independence, whether you include them or not, and then spits out the,
like I just did JSON file, and as a lock file, this is configurable by
the user, which I found interesting, and pulls the local versions that
you have on your laptop and the R version as well. So you can get a very
clean snapshot of that computer, and then just updates your gig or for
you and everything, and you can commit it. Works kind of like a Python
environment that just activates it via the R profile whenever you join,
or change it in the directory. So that\'s cool.

[Nice renv
explaination](https://www.joelnitta.com/posts/2021-11-16_r-bioinfo-flow/#maintain-r-packages-with-renv)

The real problem is nextflow\'s doesn\'t support for `renv`. Yeah,
don\'t know if they ever will. Probably not needed because you know we
are having a calm to support. The real issue is that now I\'m trying to
package up this RM into a Docker file and I was running into quite a few
issues with it.

It would get about halfway through installing all of the packages and
then it would hit a random error. Well, if you use the bioconductor
image, maybe that\'s it. Then I would have thought, what if it\'s
because our studio is uninstalled because I was using the R-A-R-R
package instead of the rocker R-Studio package. (keyboard clicking)

    - Installing BiocManager ...                    *** buffer overflow detected ***: terminated

[Maybe?](https://github.com/Bioconductor/BiocManager/issues/131#issuecomment-1112544882)

A fellow traveler
<https://community.rstudio.com/t/a-workflow-for-research-based-on-renv-and-docker/99838>

No dice.

Eventually I ended up finding a GitHub repo through just searching
GitHub for R&M and Docker. And then from those I found a reproducible
template and in that it had a really customized Docker file that had a
ton of caching built in. And I just kind of baked that into my image,
added some more. The main thing as well was just through everything
under the sun, edit on the install of the script for the base image. R
just needs a ton of things to build. Used rocker instead as well, but
the caching definitely sped up the local build times as well. Added
another units and then it built finally pushed it up.

<https://github.com/noamross/reprotemplate/blob/2cb5cb2706e6967a29870636d6ba23f566f04269/Dockerfile#L31C1-L33C31>
<https://docs.docker.com/build/cache/#use-the-dedicated-run-cache>

# Getting it to run in Nextflow-Mode

So right off the bat, the singularity converted docker container
couldn\'t find the bin/ directory. So I tried it locally with docker.

```console
Error in library(Seurat) : there is no package called ‘Seurat’
```

Hmm, how are we going to activate the renv environment in the image?

# Compilation issues

Package libtiff-4 was not found in the pkg-config search path.

# References

<http://haines-lab.com/post/2022-01-23-automating-computational-reproducibility-with-r-using-renv-docker-and-github-actions/>
<https://community.rstudio.com/t/a-workflow-for-research-based-on-renv-and-docker/99838>
