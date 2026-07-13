---
title: The State of Reproducible Scripts
description: Making scripts reproducible for your future self
draft: true
publishDate: 2024-08-21
tags: ['bioinformatics', 'python']
---

The hardest script to rerun is often one I wrote myself. Its imports remain, but the Python version, system tools, and installation steps have disappeared from memory.

A reproducible script should declare enough of its environment to run on a new machine. Three tools solve different parts of that problem: uv for Python dependencies, Nix for complete command environments, and Just for named project tasks.

## uv for a standalone Python script

[Simon Willison's example](https://simonwillison.net/2024/Aug/21/usrbinenv-uv-run/) introduced me to uv's inline script metadata. A Python file can name its interpreter constraint and packages beside the code:

```python
#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "flask==3.*",
# ]
# ///
import flask
```

After `chmod +x app.py`, a machine with uv can run `./app.py`. uv selects a compatible Python, creates an isolated environment, and installs the declared packages.

That is a strong default for a single Python script. An adjacent lock file can pin resolved dependencies more tightly. The boundary is also clear: uv manages the Python environment, not arbitrary command-line programs used by the script.

## Nix for system tools and interpreters

Nix covers a wider environment. Its [reproducible script tutorial](https://nix.dev/tutorials/first-steps/reproducible-scripts) shows a shell script that declares Bash, `curl`, `jq`, and an XML converter:

```bash
#!/usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash cacert curl jq python3Packages.xmljson
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/2a601aafdc5605a5133a2ca506a34a3a73377247.tar.gz
```

The pinned Nixpkgs revision selects exact package versions. The pure environment also reduces accidental dependence on programs already installed on the host.

This approach can describe Python, R, shell tools, and native libraries together. Its cost is requiring Nix and asking the reader to understand a denser shebang.

## Just for project entry points

A Justfile solves a different problem. It gives a project short, discoverable commands such as `just test` or `just report`. A recipe may be an ordinary shell command or a [shebang recipe](https://just.systems/man/en/shebang-recipes.html) written in Python, Ruby, or another interpreter.

Just does not make dependencies reproducible by itself. It is most useful as the front door to an environment managed elsewhere. For example, a recipe can call `uv run analysis.py` or `nix develop --command python analysis.py`.

## Choosing the boundary

For a standalone Python utility, I would start with uv metadata. For a script that mixes languages or system programs, I would use Nix. For a repository with several repeatable operations, I would put memorable names in a Justfile and let uv or Nix supply the environment.

The important change is not the tool. The script should carry its rerun instructions with it instead of relying on my future memory.
