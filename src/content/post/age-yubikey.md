---
title: Age of the YubiKey
description: Why I kept SSH signing and login keys on a YubiKey but used a separate local SSH key for age-encrypted journal files.
draft: true
publishDate: '04 Jan 2024'
tags: ['yubikey', 'age']
---

I wanted one YubiKey to handle Git commit signing, server login, and age encryption. The first two worked. Journal encryption required a separate local key in my final setup.

## Moving Git signing to SSH

I had signed Git commits with a GPG key for several years. The YubiKey made those operations slow enough that I used it mostly for two-factor authentication.

GitHub's support for verified SSH signatures gave me another path. OpenSSH could create a resident security-key credential on the YubiKey:

```bash
ssh-keygen \
  -t ed25519-sk \
  -O resident \
  -O verify-required \
  -O no-touch-required \
  -O application=ssh:github \
  -C "edmundmiller"
```

I added the public key to GitHub for commit signing. I also created a YubiKey-backed key for logging in to servers.

The [YubiKey SSH notes from Xe Iaso](https://xeiaso.net/blog/yubikey-ssh-key-storage/) and this [YubiKey cheat sheet](https://debugging.works/blog/yubikey-cheatsheet/) helped me understand the OpenSSH options.

## Why age used another key

I already used [age](https://age-encryption.org/) and [rage](https://github.com/str4d/rage) for encrypted org-journal files. I assumed the new `ed25519-sk` key would also work as an age recipient.

It did not work in my setup. I explored the YubiKey PIV path, using [this PIV guide](https://blog.nanax.fr/post/2023-10-31-yubikey-piv-setup/) as a reference. That added more configuration than I wanted for a journal.

An older encrypted journal file also confused the test. org-journal tried to open entries from both encryption setups. Once I separated that old file, I could see which failure came from the key and which came from journal history.

## The setup I kept

I ended with three roles:

- A YubiKey-backed SSH key signs Git commits on GitHub.
- Another YubiKey-backed SSH key authenticates to servers.
- A local SSH key encrypts journal files through age and rage.

[`yubikey-agent`](https://github.com/FiloSottile/yubikey-agent) could reduce the number of keys, but I did not need that extra change to restore journaling. The separate encryption key was simple and worked with my existing age configuration.

The YubiKey now protects the credentials that leave my laptop. The local age key protects the files that stay in my journal workflow. That was the practical boundary I kept.
