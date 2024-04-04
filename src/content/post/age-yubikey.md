---
title: Age of the Yubikey
description: Trying to use age with a Yubikey. Ended up giving up and using 1password
draft: true
publishDate: "04 Jan 2024"
tags: ["yubikey", "age"]
---

<https://debugging.works/blog/yubikey-cheatsheet/>
<https://xeiaso.net/blog/yubikey-ssh-key-storage/>
<https://words.filippo.io/dispatches/passage/>
<https://blog.nanax.fr/post/2023-10-31-yubikey-piv-setup/>

Okay, the year is 2024, the year that I finally clean up some listings
in my life. I\'m working for a long time, I\'ve just copied whatever
Heinrich Lissner has done, and so therefore I\'ve religiously signed all
of my Git commits over the past couple of years with GPG keys. However,
recently I\'ve had my eye on for the past couple of years that you can
sign your Git commits with an SSH key, and a year or so ago GitHub added
the functionality to GitHub to get those commits verified. So I thought
that was really cool, and I wanted to implement it. And so I\'d started,
I already had to switch over to Age for my encrypted journal files on my
computer, and wrote a blog post about that. However, I\'ve had a YubiKey
that I started using for GPG, but then it turned out to be really slow
to encrypt and sign stuff, and it was just painful to use. So I just use
it for 2FA currently. But I also saw that YubiKey had added in OpenSSH
that you could do direct keys on the YubiKey itself. So I thought that
was a really cool functionality, I wanted to use that. So I did that,
uploaded it to my GitHub, my brand new GitHub username, and went from
there. And I just assumed that would work with Rage, and started trying
to do it, and found that you can\'t, and it will essentially never be
possible. So I got baited by the Age.gl convict. So I then went and just
walked through and started down this path to try to get PIV SSH working
with the YubiKey, and working with Rage then. And that was a whole
gauntlet of things. So big break here. Some of the things I struggled
with across the board were trying to find documentation on what is in
these files in this example that the author of the package put out. And
I thought I had those right, then. The squirrely thing that got me was I
had encrypted a previous journal file last month, and when Org Journal
goes through to decrypt stuff, it decrypts everything. So that was
messing me up. That was what ultimately it was. So anyways, we\'ll walk
through some of how I set it up here in 2023. Big break. So in
conclusion, what I ended up with is I do have a signing SSH key and one
that I use for GitHub, and then one that I also used to log into
machines as well on my YubiKey, and then I have a separate SSH key that
I use for encrypting files via Rage and Age on my computer. I could
probably do YubiKey Agent and just have one key then. I\'m going to try
both for a little while and see which one I prefer over that, and then
go from there. And whether I want to keep two keys or just keep one key.
So that\'s it.
