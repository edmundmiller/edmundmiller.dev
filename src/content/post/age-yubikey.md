---
title: Age of the Yubikey
description: Trying to use age with a Yubikey. Ended up giving up and using 1password
draft: true
publishDate: "04 Jan 2024"
tags: ["yubikey", "age"]
---

How I Set Up SSH Commit Signing and Rage Encryption with a YubiKey

<https://debugging.works/blog/yubikey-cheatsheet/>
<https://xeiaso.net/blog/yubikey-ssh-key-storage/>
<https://words.filippo.io/dispatches/passage/>
<https://blog.nanax.fr/post/2023-10-31-yubikey-piv-setup/>

Okay, the year is 2024, the year that I finally clean up some listings in my life. I&rsquo;m working for a long time, I&rsquo;ve just copied whatever Heinrich Lissner has done, and so therefore I&rsquo;ve religiously signed all of my Git commits over the past couple of years with GPG keys. However, recently I&rsquo;ve had my eye on for the past couple of years that you can sign your Git commits with an SSH key, and a year or so ago GitHub added the functionality to GitHub to get those commits verified. So I thought that was really cool, and I wanted to implement it. And so I&rsquo;d started, I already had to switch over to Age for my encrypted journal files on my computer, and wrote a blog post about that. However, I&rsquo;ve had a YubiKey that I started using for GPG, but then it turned out to be really slow to encrypt and sign stuff, and it was just painful to use. So I just use it for 2FA currently. But I also saw that YubiKey had added in OpenSSH that you could do direct keys on the YubiKey itself. So I thought that was a really cool functionality, I wanted to use that. So I did that, uploaded it to my GitHub, my brand new GitHub username, and went from there. And I just assumed that would work with Rage, and started trying to do it, and found that you can&rsquo;t, and it will essentially never be possible. So I got baited by the Age.gl convict. So I then went and just walked through and started down this path to try to get PIV SSH working with the YubiKey, and working with Rage then. And that was a whole gauntlet of things. So big break here. Some of the things I struggled with across the board were trying to find documentation on what is in these files in this example that the author of the package put out. And I thought I had those right, then. The squirrely thing that got me was I had encrypted a previous journal file last month, and when Org Journal goes through to decrypt stuff, it decrypts everything. So that was messing me up. That was what ultimately it was. So anyways, we&rsquo;ll walk through some of how I set it up here in 2023. Big break. So in conclusion, what I ended up with is I do have a signing SSH key and one that I use for GitHub, and then one that I also used to log into machines as well on my YubiKey, and then I have a separate SSH key that I use for encrypting files via Rage and Age on my computer. I could probably do YubiKey Agent and just have one key then. I&rsquo;m going to try both for a little while and see which one I prefer over that, and then go from there. And whether I want to keep two keys or just keep one key. So that&rsquo;s it.

## Introduction

The year is 2024, the year that I finally clean up some lose-ends in my life. For the past few years, I&rsquo;ve been following in the footsteps of Heinrich Lissner, signing all of my Git commits with GPG keys. But times are changing, and so must my tools. I was captivated by the possibility of using my SSH key for commit signing, especially after GitHub began supporting it, verifying commits in the process. So, I embarked on a journey to update my setup to use a YubiKey for SSH commit signing while managing my encrypted journal files with Age.

\## The Draw of SSH-Key Signatures

Initially, I was using my YubiKey for GPG-based operations. However, its speed—or lack thereof—made encryption and signing tasks painfully slow. Resolving to use the key solely for 2FA (two-factor authentication), I was pleased to discover the ability to store direct keys on the YubiKey via OpenSSH. Transferring this functionality to GitHub under my new username, I was under the impression that this would all seamlessly integrate with Rage for encrypting my journal files. Alas, it did not.

\## Hitting a Roadblock with Rage

In trying to bridge my YubiKey with Rage, I hit a wall. No matter the creativity employed, it just wouldn&rsquo;t mesh. Age.gl had led me to believe in the possibility, but the truth was more unforgiving. Resolved to find a solution, I plunged into the complexities of getting PIV SSH working with the YubiKey and integrating this setup with Rage.

\## Digging into the Documentation

One recurring challenge was the lack of clarity in available documentation—particularly concerning configuration files provided in examples by package authors. Despite initial hardships, I managed to decipher the setup.

\### Encountering Unexpected Encryption Quirks

A peculiar issue arose when dealing with my previous month&rsquo;s journal, encrypted under the old system. Org Journal, which decrypts all entries during processing, was unexpectedly complicating my attempts to transition, as it couldn’t handle the new encryption method.

\## The Resulting Setup: A Hybrid Approach

Eventually, I carved out a stable workflow:

- \***\*Signing SSH Key\*\***: I created an SSH key for commit signing on GitHub and also for authenticating into servers.
- \***\*Encryption SSH Key\*\***: A separate key is dedicated to file encryption via Rage and Age.
- I contemplated the possibility of merging these roles using \`yubikey-agent\`, which might allow a single key for both purposes. However, I decided to experiment with both a single-key and dual-key setup before determining my preference.

\## Conclusion: Key Lessons Learned

The quest to streamline my security practices with a YubiKey led me down an unexpected path of trial, error, and discovery. As of 2023, the winning combination consists of distinct SSH keys on my YubiKey—one for committing to GitHub and server login, and another solely for file encryption. While I&rsquo;m tempted to unify them using \`yubikey-agent\`, I&rsquo;ll test both single and dual-key approaches to decide which suits my needs best.

Keeping two keys or consolidating to one remains an open question. Here&rsquo;s to simplifying security without compromising on the robustness or functionality. Stay tuned for updates on which way I go.

Remember, as with any development journey, the road less traveled often leads to the greatest discoveries.

ChatGPT(4-1106-preview/General)>

# More notes

<https://gist.github.com/Kranzes/be4fffba5da3799ee93134dc68a4c67b>

Command

    ssh-keygen -t ed25519-sk -O resident -O verify-required -O no-touch-required -O application=ssh:github -C "edmundmiller"
