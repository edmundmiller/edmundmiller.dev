---
name: prototype
description: Builds throwaway prototypes. Use to explore a state model or compare UI directions before choosing an implementation.
---

# Prototype

A prototype is throwaway code that answers a specific question. State that question and the
assumptions that affect the answer.

## Choose the relevant guide

- Logic, state transitions, or data shape: [LOGIC.md](LOGIC.md), an interactive terminal app.
- Visual direction: [UI.md](UI.md), browser-comparable variations in the existing app.

## Success criteria

- Clearly marked prototype code near the module or page it explores, using the project's tooling.
- One run command or preview URL, with relevant state visible after actions or variant switches.
- In-memory state by default; persistence experiments use an explicitly disposable database or file.
- Enough verification to trust the answer, without production polish or speculative abstractions.
- A verdict with supporting evidence, or a runnable comparison when the choice belongs to the user.
  Production integration and branch/issue publication are separate work unless requested. If integration
  is requested, retain only the selected implementation in production and capture useful prototype
  evidence before removing task-created scaffolding.
