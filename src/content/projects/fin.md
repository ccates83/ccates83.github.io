---
title: Fin
order: 1
kind: iOS app
status: TestFlight
summary: A routine tracker for puppies. One-tap logging, shared with family and sitters, synced through hand-rolled CloudKit.
stack: [Swift, SwiftUI, SwiftData, CKSyncEngine, WidgetKit, App Intents]
theme: night
visual: phone
---

## The idea

A baby tracker, but for puppies. One tap logs a walk, a meal, a nap or an accident, and everyone who looks after the dog sees the same timeline. The goal is consistency, not coaching.

## Sync, by hand

Fin syncs through `CKSyncEngine` rather than SwiftData's built-in CloudKit mirroring. Each dog gets its own CloudKit record zone, so each dog can be shared on its own: a zone-wide `CKShare` means a sitter can see one dog without seeing the rest of the household. Two sync engines run side by side, one for the private database and one for shared zones. Conflicts resolve last-write-wins on `updatedAt`.

## A bug worth writing down

Invites to a new caregiver used to spin forever. Zone-wide shares have a fixed record name, so a share left over from an earlier attempt collided on save, the error was swallowed, and the app got back a share with no URL. The fix in 1.0.1 adopts the server's existing share and rethrows real errors instead of hiding them.

## Around the app

An interactive WidgetKit extension and Siri App Intents log events without opening the app. App, widget and shared code are three targets joined by an App Group.
