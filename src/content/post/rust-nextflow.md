---
title: Rust Nextflow
description: What Is This, a Crossover Episode?
draft: true
publishDate: "Nov 6 2023"
---

Let\'s see, so I love a good crossover episode. As we could tell, I all
my cross-ipper posts. So I get to talk into your new friend at the next
little summit. And we noticed I was wearing a rest comp shirt, and so we
started talking about rust, and we asked if I\'d ever used rust for the
next one. So now, all right, I had, but I was using it in a, like, a
pre-compiled bin, a binary, and then just dropping it in the bin
directory. And while that was cool, you know, you got to use rust, but
we just didn\'t. Snakebake had like native rust support, so. We got to
talking and thinking, and then, you know, we were at side track by the
hackathon. And then so after the summit, we were talking about things,
because I had some issues in my slides, and there\'d be a beamer, and
then we were talking about rust, and we ended up talking about nicks as
well. I think it\'s not my message. I\'d plan to do the rust script
thing, and he wanted to look at using cargo. And the rest is kind of
history. So first and foremost, I just kind of made a very simple
workflow. I just took the rust script in from Snakebake, and then I
added a quick little test manifest script that used in Snakebake. With
that, from that then, I set up this very simple little workflow. The
only thing that does is just call that rust script, and then I gave it a
run, and it failed. With like a ton of error messages, but the main line
was like, just not such file directory, and you didn\'t know what to do
with the create doc comment. So what I realized was I had not properly
got waves set up on that, or I hadn\'t had a shabeng, so I had a
shabeng. And then using Wave, I built it a Docker just for the sake of
time, and then just had a rust script go to town. \[silence\]

Yeah cool, that worked. Using the negative rust and rust script out of
the box, built it, installed it, sick. Love it. Can\'t wait to use it,
more in pipelines.
