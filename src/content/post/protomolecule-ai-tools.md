---
title: "The Protomolecule Approach: Building Tools with AI"
description: "How building a global beads search tool became a lesson in iterative AI collaboration - it's like pottery"
author: Edmund Miller
publishDate: 2026-01-16
tags: ["ai", "tools", "workflow", "tmux", "beads"]
draft: true
---

I've got 35 git repositories scattered across my home directory, each with its own `.beads/` directory tracking issues. [Beads](https://github.com/steveyegge/beads) is great for local issue tracking, but `bd list` only shows issues in the current repo. I wanted to search *all* of them at once.

The idea was simple: what if I could hit a tmux keybinding and instantly fuzzy-search every issue across every project?

## The Protomolecule

If you've read *The Expanse* (or watched the show), you know about the protomolecule. Without spoilers: it's an alien technology that doesn't create from scratch. It repurposes existing structures, adapts iteratively, and builds on what it finds.

That's the best metaphor I've found for building tools with AI.

When I asked Claude to help build a global beads search, it didn't generate perfect code from nothing. It looked at my existing `bd-capture` script (a tmux popup for creating issues), understood the patterns in my dotfiles, and *repurposed* them into something new. Then we refined it. Then we refined it again.

It's like pottery. You start with a lump of clay, shape it, notice it's lopsided, adjust, notice the walls are too thick, thin them out. The final bowl doesn't come from a single perfect motion.

## The Initial Sketch

The conversation started simply:

> "I want to search all beads across everything in my home directory. Like fcf but for issues."

Before writing any code, the AI did something useful: it asked questions and did research. It used context7 to look up beads documentation. It read my existing `bd-capture` script to understand patterns. It ran `fd` to discover how many `.beads/` directories existed (35, it turned out).

Then it proposed an architecture:

```
fd (find .beads dirs) → bd list --json (per repo) → jq (aggregate) → fzf (interactive) → pbcopy (copy ID)
```

This wasn't a grand design document. It was a sketch on a napkin. Good enough to start shaping.

## Iteration 1: The Keybinding Conflict

The AI suggested `prefix + b` for the tmux popup. Mnemonic for "beads," easy to reach.

I tried it.

"Hmm, B is buffers."

So the AI read my tmux config. Not only did it find the `b`/`B` conflict with buffer management, it also spotted that I had *two* bindings for `r` - one for config reload, one for the file picker. A conflict I hadn't noticed.

We settled on `prefix + e` (explore) for beads search and fixed the `r` conflict while we were at it. Two commits, two problems solved.

**This is where AI shines:** reading config files, spotting conflicts across hundreds of lines, finding the non-obvious interactions. I knew my tmux config, but I didn't have it memorized. The AI did, temporarily.

## Iteration 2: Reality Hits

The tool "worked." I could search all 35 repos. But working isn't the same as good.

After actually using it:

1. The current directory display was ugly
2. Home-wide search was slow (35 repos × `bd list` calls)
3. The file picker was also slow
4. `prefix + d` opened a blank picker (oops)

Here's the meta part: I created beads issues for each of these problems. Issues about the issue-searching tool. Turtles all the way down.

```bash
bd create --title="bd-find-all: current dir display is ugly" --type=bug
bd create --title="bd-find-all: home search is slow" --type=bug
bd create --title="tmux prefix+d picker opens blank" --type=bug
```

The AI didn't catch these issues. It couldn't. They only emerged from actually *using* the tool in real conditions. Human testing found them; beads tracked them for later.

## The Pottery Phase

Over the following days, the tool evolved:

- Test suite added (switched to bats after the first attempt didn't work)
- Display cleaned up: `repo │ title │ hash` format instead of the cluttered original
- Fixed JQ array indexing in the preview pane
- Ignored `.beads/plugins` directories that were polluting results

What started as maybe 80 planned lines grew to 444. Not because of scope creep, but because reality is messier than plans.

<!-- TODO: Add screenshot -->

Each iteration was small. Fix one thing, commit, use it, notice another thing. The protomolecule at work - adapting to what it found, repurposing the existing structure.

## What Actually Happened

Looking back at the collaboration:

**What I provided:**
- The initial spark ("search all beads like fcf")
- Taste ("that display is ugly")
- Real-world testing ("home search is slow")
- Decisions ("let's use `e` instead of `b`")
- Judgment on when to ship vs. polish

**What AI provided:**
- Pattern recognition (bd-capture as template)
- Implementation speed (first working version in minutes)
- Config reading (spotting tmux conflicts)
- Documentation lookup (beads CLI options)
- Parallel exploration (checking multiple patterns at once)

**What emerged from iteration:**
- The actual tool
- Bug fixes neither of us anticipated
- A test suite
- Follow-up issues tracked in beads

This wasn't "AI wrote my code." It was pair programming where my partner has instant recall of documentation and config files but can't actually run the tool to see if it feels right.

## The Result

<!-- TODO: Add screenshot -->

Press `prefix + e` in tmux:

- Searches all `.beads/` directories under current path (falls back to `~/` if none found)
- Shows issues in fzf with repo name, title, status, priority
- Filter by status (`Ctrl-O` open, `Ctrl-P` in-progress, `Ctrl-B` blocked)
- Filter by priority (`Alt-1/2/3`)
- Filter by type (`Alt-F` features, `Alt-T` tasks, `Alt-G` bugs)
- Enter copies issue ID to clipboard
- Preview pane shows full issue details

The whole search across 35 repos takes about 2 seconds. Not instant, but fast enough that I actually use it.

## The Protomolecule Effect

The tool works, but that's not the interesting part.

The interesting part is *how* it came to exist. Not through a single brilliant prompt. Not through AI autonomously solving my problem. Through iteration.

The AI didn't replace my judgment - it amplified my ability to act on it. When I said "that's ugly," I didn't have to spend 20 minutes figuring out the jq incantation to fix it. When I noticed a keybinding conflict, I didn't have to grep through my config manually.

The protomolecule repurposes existing structures. So does good AI collaboration. My `bd-capture` script became the template. My tmux config patterns got extended. My workflow preferences got encoded. Nothing came from nothing.

And like the protomolecule, it kept evolving. The tool I have now isn't the tool we built in that first session. It's been through a dozen more iterations since. Some with AI help, some without.

## Try Building Something

If you're curious about AI-assisted tool building, here's my suggestion: start with something small that annoys you. Not a grand project. A tiny friction point.

Then don't ask for a complete solution. Ask for a sketch. Look at what emerges. Use it. Notice what's wrong. Iterate.

The pottery metaphor isn't just cute - it's the actual process. You can't think your way to a good bowl. You have to make a bad one first, then make it less bad, then make it okay, then eventually make it good.

AI makes each iteration faster. That's the whole trick. Not better first drafts. Faster iterations. More cycles through the loop before you get tired.

The [full implementation](https://github.com/edmundmiller/dotfiles/blob/main/bin/bd-find-all) is in my dotfiles if you want to see where it ended up. But honestly, the code matters less than the process that produced it.

Go build something. Make it bad. Make it better. Repeat.
