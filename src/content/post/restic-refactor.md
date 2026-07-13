---
title: Restic Refactor
description: Moving my NixOS NAS backups to R2 and reducing four Restic jobs to one
publishDate: '2024-04-15'
draft: true
---

I had used Restic to back up my NixOS NAS to Backblaze B2 for several
years. A B2 pricing change prompted me to reconsider that setup.

I moved the repository to Cloudflare R2, which I already used through my
k8s-at-home cluster. I also replaced a secret file synchronized between
machines with secrets managed by age and agenix.

The storage move exposed a larger problem. My Nix configuration repeated the
same backup settings across several jobs.

# What I changed

I used Arthur Koziel's
[Restic backups on NixOS guide](https://www.arthurkoziel.com/restic-backups-b2-nixos/)
as a reference. The existing configuration had separate jobs for Google Drive,
two B2 paths, and Paperless documents.

The refactor replaced those jobs with one `daily` backup. It covered three
paths:

- my synchronized files
- my archive
- the Paperless document archive

The job kept one retention policy: seven daily snapshots, five weekly
snapshots, and twelve monthly snapshots.

This removed repeated repository, password, schedule, and user settings. It
also made the list of protected data visible in one place.

# Moving secrets into agenix

The old jobs pointed at a password file in my home directory. Repository
details also lived directly inside separate job definitions.

The new job reads three paths from agenix:

- the rclone configuration
- the Restic repository
- the Restic password

Nix receives paths to decrypted runtime files, not the secret values. The
encrypted source files remain with the host configuration.

This was the main portability improvement. A replacement NAS can receive the
same declarative backup job and decrypt its credentials through the configured
age identities.

# Why I kept Healthchecks

The NAS has no desktop, so a local notification would be easy to miss. I use
[Healthchecks.io](https://healthchecks.io/) as an external signal instead.

The backup preparation hook sends a start ping. The cleanup hook reports the
job's exit status. A missing completion ping can therefore reveal a failed or
stalled backup.

The refactor also replaced four Healthchecks identifiers with one identifier
for the consolidated daily job. Monitoring now follows the same boundary as
the backup configuration.

# Result

The configuration changed from several destination-specific jobs to one daily
backup with one retention policy. R2, the repository password, and the rclone
settings are supplied through agenix-managed files.

The important lesson was not specific to B2 or R2. Backup paths, retention,
credentials, and monitoring should each have one clear source of truth.

That structure makes the NAS easier to replace without hiding whether the
backup job actually ran.
