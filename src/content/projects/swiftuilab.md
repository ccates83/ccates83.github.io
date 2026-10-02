---
title: SwiftUILab
order: 4
kind: iOS practice
status: Ongoing
summary: A lab app for hand-writing the newest SwiftUI APIs. Claude can review; it never writes the first version.
stack: [SwiftUI, iOS 26]
theme: moss
visual: spring
---

## Why it exists

The more code agents write for me, the more deliberately I keep my own hands on SwiftUI. SwiftUILab is a catalog app of small, self-contained experiments with the newest APIs, each with a note on its minimum OS and whether it is still current.

## The rules

- The first working version of every experiment is written by hand. Claude scaffolds, reviews and debugs, and never authors the first implementation.
- Build it wrong first. Hitting the sharp edge is the point.
- No premature structure: no registry or theming until real experiments justify it.
- After each OS release, sweep the catalog and mark experiments a native API has replaced.
