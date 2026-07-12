---
author: Edmund Miller
publishDate: '2024-04-09'
updatedDate: '2024-05-09'
title: Personal Site Analytics in 2024
description: Why GoatCounter remained my choice for private, low-maintenance analytics across two personal sites.
tags: ['blog']
draft: false
---

While redesigning this site and [my partner's site](https://monimiller.com/), I reconsidered how I measured their use. The [Blogging for Devs](https://bloggingfordevs.com/) course argued that analytics can motivate a writer to keep publishing. I wanted that feedback without tracking people across the web.

I already used [GoatCounter](https://www.goatcounter.com), but managing two sites exposed one missing feature. I compared it with Fathom, Plausible, and Umami before deciding whether to switch.

## What I needed

My analytics service had to meet four conditions:

1. Respect visitor privacy.
2. Support more than one site.
3. Offer a hosted service with little maintenance.
4. Allow self-hosting if my needs changed.

The sites had little traffic, so enterprise features did not justify a large monthly bill. Martin Tournoij, GoatCounter's author, explains the broader case in [Analytics on personal websites](https://www.arp242.net/personal-analytics.html).

## The 2024 comparison

[Fathom](https://usefathom.com/ref/DYRELW) offered a managed service with a simple interface. Its $15 monthly price in April 2024 was too high for these sites.

[Plausible](https://plausible.io) could be self-hosted and used [ClickHouse](https://clickhouse.com/). Its hosted plan started at $9 per month for the traffic level I needed. I did not need its extra infrastructure or features.

[Umami](https://umami.is) paired self-hosting with a free hosted hobby plan. That combination matched my requirements and made it the best alternative to GoatCounter.

## Why I stayed with GoatCounter

I planned to run Plausible, Umami, and GoatCounter together for a short comparison. Then I found that GoatCounter had added multiple sites under one login.

That feature removed my only reason to switch. Each site could keep separate settings and data while sharing the same account. GoatCounter still met my privacy and hosting requirements, and I already knew how to operate it.

The choice was not about finding the analytics service with the most features. I needed private analytics for two small sites without adding more maintenance. GoatCounter did that, so I kept it.
