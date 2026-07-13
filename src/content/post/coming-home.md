---
title: Coming Home
description: Why I'm replacing my Kubernetes homelab with simpler NixOS hosts
publishDate: 'Dec 15 2023'
tags: ['k8s', 'NixOS', 'homelab']
draft: true
---

I am replacing my three-node Kubernetes homelab with a few
[NixOS](https://nixos.org/) hosts. The cluster works, but maintaining it
costs more time than it saves.

# How I got here

In college, I wanted a media server for sharing old movies and television
shows with friends. After ETHDenver in 2019, I found guides for running one
on Kubernetes with Raspberry Pis and an external drive.

My first attempt used spare Raspberry Pis and k3s. I never found a reliable
way to route only qBittorrent through a VPN.

Later, [k8s-at-home](https://k8s-at-home.com/) gave me a clearer path. I
eventually bought three Intel NUCs and built a working cluster.

Renovate kept the container images current, but I did not maintain the rest
of the repository. FluxCD syntax changes accumulated while the cluster kept
running.

My hoped-for failover also did not happen. When one node disappeared, pods in
my setup often remained unscheduled until it returned.

The system may have been fixable. I did not want another operations job at
home.

# What Kubernetes taught me

I learned about deployments, services, and pods. I also learned how ingress
and GitOps fit into the system. That knowledge has helped me understand
Kubernetes at work.

The cluster completed its original job: it taught me Kubernetes. My homelab
now needs dependable services with less maintenance.

# Why NixOS fits

By late 2023, I had used NixOS for four years. Its declarative configuration
lets me describe a machine and reproduce it later.

I can stay on stable releases and pull selected packages from unstable
through my existing configuration. If something breaks, I can inspect and
change the relevant Nix expression.

More importantly, each machine's configuration lives in
[my dotfiles](https://github.com/Emiller88/dotfiles). I would rather maintain
those files than a Kubernetes control plane.

# The migration plan

The NAS already runs NixOS and will continue handling backups, syncing, and
storage. I will test
[nixos-infect](https://github.com/elitak/nixos-infect) on one NUC, then move
only the services I still use.

If I need more capacity, I can add another NUC and another host configuration.

# Recovering from failure

My machine configuration and service data are already backed up. If a host
fails, I can install NixOS on a replacement, apply its configuration, and
restore the data.

That is the resilience I need. I do not need automatic failover for every
home service.

The NUCs survived the Kubernetes experiment. The hard drives I neglected
while maintaining the cluster did not.

# What I am keeping

The k8s-at-home feature I valued most was automatic setup for new services and
their subdomains. Four years ago, DNS felt harder to me than Nix expressions.

I can reproduce that workflow in NixOS. If public DNS becomes more work than
it is worth, I can use [Tailscale](https://tailscale.com/edmundmiller).

So I am coming home to NixOS.
