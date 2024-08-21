---
title: The State of Reproducible Scripts
description: Making scripts reproducible for your future self
draft: true
publish: 2024-08-21
tags: ["bioinformatics", "python"]
---

You know that ice breaker, where everyone asks "What's your biggest pet peeve?"

I can never think of a good one in the moment. Not a lot of things bother me.

Except scripts that have zero thought about reproducibility. Especially when I'm the one who wrote them.

[This post by Simon Willison](https://simonwillison.net/2024/Aug/21/usrbinenv-uv-run/)

# uv run

Starting off with the package manager that inspired this post,
[`#!/usr/bin/env uv run`](https://github.com/alsuren/sixdofone/blob/3ed09b930b1bf6e553b382588ab41d0c43a52744/app.py#L1-L14). Start your Python script like this:

```python
#!/usr/bin/env uv run
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "flask==3.*",
# ]
# ///
import flask
# ...
```

[Quoting Simon Willison](https://simonwillison.net/2024/Aug/21/usrbinenv-uv-run/)

> And now if you chmod 755 it you can run it on any machine with the uv binary installed like this: ./app.py - and it will automatically create its own isolated environment and run itself with the correct installed dependencies and even the correctly installed Python version.

[What's next? Are they're going to make it easier to do specify dependancies in a jupyter Notebook?](https://x.com/strangemonad/status/1826080686203449633) Madness!

# Nix-shell
A drawback of `uv` is that it just works for Python (That I know of).
https://nix.dev/tutorials/first-steps/reproducible-scripts
