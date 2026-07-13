---
title: 'The Protomolecule Approach: Building Tools with AI'
description: 'How building a global Beads search tool became a lesson in iterative AI collaboration.'
author: Edmund Miller
publishDate: 2026-01-16
tags: ['ai', 'tools', 'workflow', 'tmux', 'beads']
draft: true
---

I had 35 Git repositories under my home directory, each with its own `.beads/` issue database. [Beads](https://github.com/steveyegge/beads) worked well inside one repository, but `bd list` only showed that repository's issues. I wanted one tmux popup that could search them all.

## The protomolecule

In _The Expanse_, the protomolecule builds by repurposing what it finds. It adapts existing structures instead of starting from nothing. That is also how this tool grew.

Claude started with my existing `bd-capture` script, which opened a tmux popup for creating issues. It also read the patterns in my dotfiles. We reused both to build a global search instead of designing a separate system.

## Start with a small sketch

My first request was direct:

> "I want to search all beads across everything in my home directory. Like fcf but for issues."

The AI looked up the Beads CLI, read `bd-capture`, and used `fd` to find the 35 databases. It proposed this data flow:

```text
fd → bd list --json → jq → fzf → pbcopy
```

That was enough to build the first version.

## Test the sketch against the real config

The first suggested keybinding was `prefix + b`. My tmux config already used `b` and `B` for buffer work. Reading the full config also exposed two bindings for `r`.

We moved the search popup to `prefix + e` for "explore" and fixed the `r` conflict. The AI was useful here because it could scan the whole config at once. I still had to choose the binding that fit my habits.

The first working search exposed problems that static review could not. The display was cluttered, searching 35 repositories was slow, and `prefix + d` opened an empty picker. I recorded those problems as Beads issues and fixed them after using the tool.

Over the next few passes, I added a Bats test suite and simplified the display. I also fixed the preview's `jq` indexing and ignored `.beads/plugins` directories. The script grew from about 80 planned lines to 444 tested lines.

## Divide the work clearly

I supplied the goal, taste, tests, and decisions. The AI supplied quick code changes, documentation lookup, and config-wide pattern matching.

This was not "AI wrote my code." It was pair programming with a partner that could read a lot of context. It could not judge how the popup felt during daily use. Human use found the important second-round problems.

## The result

Pressing `prefix + e` now searches the Beads databases below the current path. If it finds none, it searches from my home directory. The fzf view shows each issue's repository, title, status, and priority.

Keyboard shortcuts filter by status, priority, and issue type. Enter copies the issue ID, and the preview pane shows the full issue. Searching all 35 repositories takes about two seconds, which is fast enough for my workflow.

The [full implementation](https://github.com/edmundmiller/dotfiles/blob/main/bin/bd-find-all) shows where the tool ended up.

## The protomolecule effect

The useful result came from reuse. `bd-capture` supplied the first structure, the tmux config supplied local rules, and real use supplied the next changes. AI shortened the time between noticing a problem and testing a fix.

If you want to build a tool this way, start with one small irritation. Ask for a sketch, use it, and let the next problem shape the next change.

Go build something. Make it bad. Make it better. Repeat.
