---
title: Auto Dogfluencer
order: 2
kind: Automation
status: Live
summary: Finley and Frankie's Instagram runs itself. I film; a Python pipeline and headless Claude do the rest, three times a day.
stack: [Python, claude -p, ffmpeg, edge-tts, launchd]
theme: ember
visual: grid
links:
  - label: '@finleyxfrankie'
    href: https://www.instagram.com/finleyxfrankie/
---

## The deal

My only jobs are filming the dogs into a Photos album and answering comments. Everything between the camera roll and the feed is automated.

## The pipeline

Photos come in with their EXIF data baked at intake, then get grouped: shots taken close together in time and place become a carousel, and videos always go out alone as Reels. The "brain" shells out to `claude -p` with the images and gets back a caption, hashtags, a voiceover script and which dog should narrate. edge-tts voices it, ffmpeg assembles it, and a launchd job posts on a jittered schedule three times a day.

## Two personalities

Finley is the patient older brother. Frankie is the puppy chaos agent. The recurring bits (the Snack Tribunal, the Neighborhood Watch) come from keeping those characters consistent across every caption.

## What keeps it safe

The posting ledger is the one file that must never be wrong. If it is corrupt, the pipeline stops loudly rather than resetting, because a reset would repost everything. Lockfiles carry PIDs so two runs can never overlap.
