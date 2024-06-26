---
title: Coming Home
description: Why I'm giving up on my k8s-at-home dreams and running everything on NixOS
publishDate: "Dec 15 2023"
tags: ["k8s", "NixOS", "homelab"]
draft: true
---

Why I\'m quitting [K8s at Home](https://k8s-at-home.com/) and running
everything on [NixOS](https://nixos.org/).

So, I wanted to... Let\'s see, how do I start this? Ever since I found a
series of blog posts after ETH Denver in 2019 on creating a Kubernetes
cluster to run a media server at home using Raspberry Pis and an
external drive. I think it dates back even further in college I really
had a dream of running a media server for my friends because we are
constantly wanting to watch old random movies, TV shows that we\'re just
struggling with all the streaming outlets at the time. So, the concept
that I has been there for a while. So, I originally tried to do it with
some Raspberry Pi\'s that I had laying around. Didn\'t really work out I
got k3s installed and stuff connected but I could never find a clean
solution to only use the VPN for qb.

So yeah, then I started to kind of play around with the various, you
know, went through that implementation, couldn\'t quite get the VPN
connecting to the torrent client was always just off. And so the dream
died for a while. And then I\'d bring it back. And then it\'d die again
because I would never get it up stuff. And then I found k8s@home. And I
got pretty fare. And then it\'d die again, because I had a dream that
this cluster would be a retirement home for all of my old laptops and
single board computers collecting dust.

Eventually I threw enough money at the hobby to get three intel NUCs
setup and got the proper hardware. And it\'s kind of running just on its
own right now[^1]. It seems to be working. The real issue, per se, is
that I\'m not actually running updates like I should be despite the pull
requests from renovate. The images are staying up to date, but the code
is rotting because FluxCD seems to always be updating the syntax.So
while I have learned all the Kubernetes lingo that I wanted to learn,
after you learn all of the deployment, service, pod, ingress jargon, and
peak behind the curtain the appeal kind of wears off.

Or like it is awesome. It works. It\'s so cool. It\'s great. Lovely
git-ops lovely tools. The real issue is that all the benefits that my
naive self dreamed up five years ago, I wasn\'t actually seeing. I
imagined a world where, the SD card dies on one of the Raspberry Pis and
suddenly all of the pods switch over and the services never go down.
Cool, right?

Yeah, that doesn\'t actually happen with a three node cluster, even in
high availability. The pod just kind of sit there in an unscheduled
state waiting for the node to come back.

Obviously, this is why we have entire day jobs for people who do this on
the regular. And if I did this for a day job, that\'d be cool. But this
was literally just a side hobby to learn about Kubernetes. So I did it.
I had a lot of fun with it. I learned a lot. It\'s come in handy to have
a better understanding of Kubernetes

# Where am I going from here?

I\'m going back to NixOS, it\'s been my bread and butter for the past 4
years my bread and butter. I love it. It just works. Nixpkgs works at a
blazingly fast pace and is an amazing community effort. If something
doesn\'t work, I can hack on it and get it going.

It\'s declarative. So I just write out what I want and then it figures
it out. I don\'t have to constantly be updating it based on new versions
weekly and whatnot. I can wait for the biannual stable releases, and if
I want a package from unstable, I can add an `unstable.<pkg>` and it\'ll
get pulled from the bleeding edge.

# So what am I planning?

I\'m just going to run the NAS by itself for backups, syncing, storage
as well on those. It\'s always been on NixOS. ThenI\'m just going to try
to run [nix-infect](https://github.com/elitak/nixos-infect) on one the
NUCs first, see what services I actually really want. If I need to
scale, I\'ll just throw another NUC at it. It just another host config
in [my dotfiles](https://github.com/Emiller88/dotfiles) away after all

# What happens if a node goes down?

Well, because of Nix, I\'m not really beholden to a specific piece of
hardware. I can just spin up a new one just Nix install, and boom. I\'m
off to the races and I have a new node up.

So it really let\'s you treat your pets like cattle. It\'s like the
services that will clone your favorite dog for it.

Then there\'s only two things that are needed, the config and the actual
data, both of witch are already backed up. I\'m sure this change will
allow me to do a better job of backing up the data and caring about that
and less caring about the actual nodes, backing up fancy cloud databases
and the yaml. [All of the yaml conflicts](https://noyaml.com/). I should
say. So yeah, turn your back on. Turn your back on. Turn your back on.

Most importantly, it\'s reproducible. Which is something I value a lot.

# The real thing that drew me in to k8s@home

The other cool feature that I wanted to mention that I really got from
the days of k8s@home was the creation of new services and then creating
new subdomains on my home services domain. That was really cool. It was
some magic to me that brought me in.

But I\'m a lot older and little wiser now, and I\'m pretty sure I can do
that in Nix in a similar fashion or even better. I was more afraid of
the DNS than the Nix expressions 4 years ago. But now I\'ve realized
that Kubernetes is even scarier than Nix.

So I\'m going back.

Worst case I\'ll just use
[Tailscale](https://tailscale.com/edmundmiller). 🙃

# Footnotes

[^1]: Update the NUCs didn\'t give out but the HDD disks that I wasn\'t paying attention to be I was constantly wrangling cattle died.
