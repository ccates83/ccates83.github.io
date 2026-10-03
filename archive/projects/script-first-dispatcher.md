---
title: Script-first dispatcher
order: 3
kind: Tooling
status: In daily use
summary: The setup my writing documents. A deterministic shell around a model that only writes code, judges a review, or drafts prose.
stack: [zsh, Claude Code, git, Obsidian]
theme: paper
visual: terminal
links:
  - label: Read the series
    href: https://medium.com/@connorcates/from-agent-swarm-to-shell-script-f515498ecb9e
---

## From more model to less model

It started as a multi-agent framework with its own MCP servers. Five months later it is a shell dispatcher that starts a model only when there is real work to produce. Each step came from a measurement or an incident, not a change in taste.

## The rules

- **Determinism beats orchestration.** Anything that is rules over fetched data belongs in a script you can test, not a prompt you have to trust.
- **Measure before and after.** Opinions without numbers stay out.
- **Safety through revert, not approval.** Every autonomous change is one commit with a revert SHA.

## Where it is now

With so few model runs left, each one is a row in Claude Code's agent view, next to the one-off sessions I start from the same screen. The whole arc is written up, one era per post.
