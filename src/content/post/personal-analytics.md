---
author: Edmund Miller
publishDate: "2024-04-09"
updatedDate: "2024-05-09"
title: Personal Site Analytics in 2024
description: What's the move for something that gives you feedback and isn't creepy
tags: ["blog"]
draft: false
---

If you've ever experienced the itch to refresh your online presence, you'll know the feeling all too well. Recently, I gave my personal website a facelift (keep your eyes peeled for that upcoming blog post!), and took on the task of revamping [my partner's site](https://monimiller.com/) as well. During this period of digital rejuvenation, I stumbled upon a nugget of wisdom from the [Blogging for Devs](https://bloggingfordevs.com/) email course. They insist on setting up site analytics, not just for the sake of data, but for a source of motivation to keep pushing forward.

This advice couldn't have come at a better time. Amidst the redesign, I found myself pondering over website analytics options. I have been utilizing [GoatCounter](https://www.goatcounter.com) for a while now, but as someone who strives to maintain efficiency (which I like to metaphorically describe as 'keeping my yak herd well shaven'), I'm always on the lookout for tools that streamline my workflow and bolster my motivation. Thus began my quest to find the perfect analytics tool to accompany my freshly updated sites.

## Requirements

The list I'm looking to tick-off:

1. Not creepy
2. Self-hostable
3. But has a cloud option (I'm trying this new thing where I outsource my yak shaving)

Martin Tournoij, the author of GoatCounter, has a [good piece on analytics on personal websites](https://www.arp242.net/personal-analytics.html).

## Initial Research

I tried [Fathom](https://usefathom.com/ref/DYRELW) first. It seemed popular, and it was alright but the pricing at $15 a month was unreasonable for our web traffic currently.

I'd tested out [Plausible](https://plausible.io) in the past. It looks cool, but there's no free tier. It's self-hostable, built on [ClickHouse](https://clickhouse.com/), it's flashy, but probably overkill.

I was pretty excited to try [Umami](https://umami.is), the last time I had looked at it a while ago before it had a cloud hosting option. I think this one might be the only one to give GoatCounter a run for it's money. It has a hobby pricing of _free_ so it'll be hard to justify Plausible's $9 a month for the same 10K views.

My first stop was Fathom (you can check it out [here](https://usefathom.com/ref/DYRELW)). It's garnered quite a following, perhaps for its ease of use and solid feature set. However, at $15 a month, I couldn't quite make peace with their pricing, especially given our modest web traffic.

Then, my attention turned to Plausible (find it [here](https://plausible.io)). There's no doubt it's slick, with a contemporary look and feel that can be quite enticing. Plus, it's built on the foundation of ClickHouse. However, the catch? They don't offer a free tier, and for something with such flash, I had to ask myself if it was too much for our needs.

Finally, there was [Umami](https://umami.is). I had my eye on it some time ago, but back then, cloud hosting wasn't on the menu. What's especially exciting is its 'hobby' tier priced at _free_. When comparing that to Plausible's $9 per month for an equivalent 10K views, it's challenging to justify the cost of Plausible.

## Conclusion

In summary, Umami is emerging as a strong contender. I'm going to use Plausible's free month to test Plausible, Umami, and GoatCounter together for a week or two since I've got it set up. Sorry for the slight performance hit for anyone reading this! 😬

## **Update**

Figured out GoatCounter added the ability to have multiple website under one login. This fixed my only grip with GoatCounter

From the settings page:

> Sites

> Add GoatCounter to multiple websites by creating new sites. All sites will share the same users, and logins, but are otherwise completely separate. The current site’s settings are copied on creation, but are independent afterwards.

> You can add as many as you want.
