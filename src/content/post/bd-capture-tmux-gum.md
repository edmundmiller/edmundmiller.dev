---
title: "Quick Issue Capture with Tmux and Gum"
description: "Building a frictionless workflow for capturing issues without leaving your terminal"
draft: false
publishDate: 2026-01-13
tags: ["tools", "workflow", "tmux"]
---

You know that feeling when you're deep in flow, finally making progress on something, and then you realize you need to track an issue? Suddenly you're alt-tabbing to a browser, finding the right repo, clicking through forms, and by the time you're done... what was I working on again?

I've been using [beads](https://github.com/edmundmiller/beads) lately for tracking issues locally in git repos. It's great, but even `bd create --title "..." --type bug --priority 2` is enough friction that I'd put off capturing things. And that defeats the whole point.

What if I could capture issues without leaving tmux?

## The Ingredients

Two tools make this possible:

**[Gum](https://github.com/charmbracelet/gum)** - Charm's toolkit for building interactive CLI forms. Think of it as a way to add nice prompts, selectors, and spinners to shell scripts.

**Tmux popups** - A relatively recent tmux feature that overlays a temporary window on top of your current session. Perfect for quick interactions.

Combine them, and you get a popup form for instant issue capture.

## The Result

![bd-capture popup showing the issue creation form](placeholder-bd-capture-popup.png)

Press `prefix + i` in tmux, and a popup appears with:

1. Title input
2. Type selector (task, bug, feature, epic, chore)
3. Priority selector (P0-P4)
4. Optional description
5. Confirmation summary
6. "Start working on this?" prompt

The whole thing takes about 5 seconds. Issue captured, flow state preserved.

## How It Works

The core is a bash script called `bd-capture` that chains together gum commands:

```bash
# Title (required)
TITLE=$(gum input --placeholder "Issue title..." --width 70 --header "Title")

# Type selection with task as default
TYPE=$(gum choose --header "Type" --selected "task" \
    "task" "bug" "feature" "epic" "chore")

# Priority selection
PRIORITY_FULL=$(gum choose --header "Priority" --selected "P2 (Medium)" \
    "P0 (Critical)" "P1 (High)" "P2 (Medium)" "P3 (Low)" "P4 (Backlog)")
```

Before creating the issue, it shows a confirmation summary:

![Confirmation summary showing title, type, and priority](placeholder-confirmation.png)

```bash
gum style --border rounded --padding "0 1" "$SUMMARY"
gum confirm "Create this issue?"
```

And wraps the actual creation in a spinner for visual feedback:

```bash
gum spin --spinner dot --title "Creating issue..." -- bd create ...
```

## Quick Mode

For those times when even selecting type and priority is too much, there's a `--quick` flag:

```bash
bd-capture --quick
```

This only prompts for title and uses sensible defaults (task, P2, no description). In and out in under 3 seconds.

## The Tmux Keybinding

The magic that ties it together is a single line in your tmux config:

```tmux
bind i display-popup -E -w 80% -h 80% -d '#{pane_current_path}' "$DOTFILES_BIN/bd-capture"
```

- `-E` closes the popup when the command exits
- `-w 80% -h 80%` gives it plenty of room
- `-d '#{pane_current_path}'` respects your current directory (important for beads to find the right repo)

## What's Beads?

Quick aside: [beads](https://github.com/edmundmiller/beads) is a lightweight issue tracker that lives in your git repo. Issues are stored as JSON in a `.beads/` directory and sync with your commits. No external service, no context switching to a web UI. Just issues alongside your code.

The `bd` CLI lets you create, list, and manage issues from the terminal. `bd-capture` is just a nice wrapper for the create command.

## The Meta Part: Parallel AI Agents

Here's where it gets fun. After building the basic popup, I wanted to add a bunch of polish features:

- Header banner and progress indicators
- Confirmation summary before creation
- Clipboard copy of issue ID
- Quick mode flag
- "Start working?" prompt after creation

Instead of implementing these one by one, I created three git worktrees using [worktrunk](https://worktrunk.dev) and delegated each group of features to a separate AI agent:

```
bd-capture-ui       -> Header, progress, hints, spinner
bd-capture-core     -> Confirmation, clipboard copy
bd-capture-features -> Quick mode, start-working option
```

Each agent worked in isolation, committed their changes, and then I merged them back to main. Three branches, three commits, all the features. The merge conflicts were minimal since each focused on different parts of the script.

![Worktree list showing parallel branches](placeholder-worktrees.png)

Is this overkill for a ~80 line bash script? Absolutely. Was it fun? Also yes.

## Installation

If you're using nix-darwin or NixOS, gum is in nixpkgs:

```nix
user.packages = [ pkgs.gum ];
```

Or via homebrew:

```bash
brew install gum
```

Then drop the [bd-capture script](https://github.com/edmundmiller/dotfiles/blob/main/bin/bd-capture) in your PATH and add the tmux keybinding.

## Wrapping Up

Small friction reductions compound. Every time I capture an issue in 5 seconds instead of 30, I'm more likely to actually track things I should track. And staying in the terminal means staying in flow.

The popup pattern works for more than just issue capture. I've seen similar setups for:

- Quick notes to a journal
- Selecting git branches
- Running common commands with parameters

Gum makes building these surprisingly easy. If you're not already using it, give it a look.

---

Full implementation in my [dotfiles](https://github.com/edmundmiller/dotfiles/blob/main/bin/bd-capture).
