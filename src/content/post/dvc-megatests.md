---
title: Importing a Public S3 Directory with DVC
description: The filesystem flag DVC needed to import public nf-core megatest data from S3 without AWS credentials.
publishDate: 2024-12-21
tags: ['bioinformatics', 'dvc', 'data-science']
draft: true
---

I needed one directory from the public nf-core AWS megatests bucket. This command failed because DVC did not attempt anonymous S3 access:

```bash
dvc import-url \
  s3://nf-core-awsmegatests/nascent/GM_goldstandard/transcript_identification/ \
  transcript_identification
```

The bucket was public, but DVC still followed its authenticated access path. I spent about 40 minutes looking for the option that changed that behavior.

The working command added one filesystem setting:

```bash
dvc import-url \
  s3://nf-core-awsmegatests/nascent/GM_goldstandard/transcript_identification/ \
  transcript_identification \
  --fs-config allow_anonymous_login=true
```

[`dvc import-url`](https://dvc.org/doc/command-reference/import-url) passes `--fs-config` values to the filesystem for the source URL. The option became part of the generated dependency metadata.

```yaml
frozen: true
deps:
  - md5: 8701a499fbfc9d7980b39239706dc790.dir
    size: 3008566111
    nfiles: 324
    path: s3://nf-core-awsmegatests/nascent/GM_goldstandard/transcript_identification/
    fs_config:
      allow_anonymous_login: 'true'
outs:
  - path: transcript_identification
```

The import recorded the source URL, directory hash, size, and file count in `transcript_identification.dvc`. DVC could then place the directory in the project without AWS credentials.

This flag is a backend setting, not a universal rule for every public URL. Confirm the anonymous-access option supported by the storage backend and installed DVC version.

The result was a tracked external dependency covering 324 source objects and about 3.0 GB of nf-core megatest data.
