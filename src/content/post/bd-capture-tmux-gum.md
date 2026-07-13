---
title: 'Quick Issue Capture with Tmux and Gum'
description: 'Capturing repository issues from a tmux popup with Gum and beads'
draft: true
publishDate: 2026-01-13
tags: ['tools', 'workflow', 'tmux']
---

I often noticed follow-up work while concentrating on another task. Typing a
full `bd create` command interrupted me enough that I delayed recording the
issue.

I wanted a short form that opened inside tmux and used the current pane's
repository. The result was `bd-capture`, a Bash script built with
[Gum](https://github.com/charmbracelet/gum).

This post describes the implementation merged on January 13, 2026. The script
and tracker commands changed names later, so the examples are pinned to that
version.

## Capture flow

Pressing `prefix + i` opened a tmux popup in the pane's current directory. The
form collected:

1. a required title
2. an issue type
3. a priority from P0 through P4
4. an optional description

It then showed a confirmation summary and ran `bd create`. After creation, it
copied the issue ID and offered to mark the issue as in progress.

Keeping the pane's directory mattered because beads found its repository from
the local `.beads` directory. The script stopped with an error when that
directory was absent.

## Building the form with Gum

[Beads](https://github.com/edmundmiller/beads) stored issues beside the code
and exposed them through the `bd` command. Gum supplied the interactive inputs
around that command.

The required title used `gum input`:

```bash
TITLE=$(gum input --placeholder "Issue title..." --width 70 --header "Title")
[[ -z "$TITLE" ]] && exit 0
```

The type and priority used `gum choose` with task and P2 selected by default:

```bash
TYPE=$(gum choose --header "Type" --selected "task" \
    "task" "bug" "feature" "epic" "chore")

PRIORITY_FULL=$(gum choose --header "Priority" --selected "P2 (Medium)" \
    "P0 (Critical)" \
    "P1 (High)" \
    "P2 (Medium)" \
    "P3 (Low)" \
    "P4 (Backlog)")
PRIORITY=$(echo "$PRIORITY_FULL" | cut -d' ' -f1)
```

The script assembled the command as an array. This kept each user value in its
own shell argument:

```bash
CMD=(bd create --title "$TITLE" --type "$TYPE" --priority "$PRIORITY")
[[ -n "$DESC" ]] && CMD+=(--description "$DESC")
```

Before creation, `gum style` rendered the summary and `gum confirm` allowed a
cancel. `gum spin` displayed progress while the command ran.

## Quick mode

The `--quick` flag skipped the type, priority, and description prompts:

```bash
bd-capture --quick
```

Quick mode required only a title. It created a P2 task with no description.

## Tmux keybinding

One tmux binding opened the form:

```bash
bind i display-popup -E -w 80% -h 80% -d '#{pane_current_path}' "$DOTFILES_BIN/bd-capture"
```

The `-E` option closed the popup after the script exited. The width and height
options sized the form to 80 percent of the tmux client.

The `-d '#{pane_current_path}'` option started the script in the current pane's
directory. That connected one global keybinding to the correct repository.

## Installation

Gum is available from Nixpkgs:

```nix
user.packages = [ pkgs.gum ];
```

It is also available through Homebrew:

```bash
brew install gum
```

The remaining pieces are the
[January 2026 bd-capture script](https://github.com/edmundmiller/dotfiles/blob/05261192c0/bin/bd-capture)
and the tmux binding above. Place the script in `$DOTFILES_BIN`, or change the
binding to its installed location.

## Implementation note

I developed the UI, confirmation flow, and quick mode on three separate
worktrees. The merge commit combined those independent changes into the script
described here.

## Conclusion

The popup reduced issue capture to one keybinding and a short form. More
importantly, it kept the new issue attached to the repository where I noticed
the work.
