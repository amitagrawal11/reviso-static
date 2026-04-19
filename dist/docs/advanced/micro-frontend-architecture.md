---
title: Micro Frontend Architecture
category: system
order: 4
---
# Micro Frontend Architecture

## What It Is

Micro frontends split a large frontend into independently developed and deployed pieces that are composed into one user experience.

## Deep Dive

- The main driver is organizational scale, not technical novelty.
- Domain ownership can improve team autonomy.
- Shared design, routing, observability, and dependency strategy become critical.
- Runtime composition introduces integration complexity.
- This architecture is useful only when the ownership and release benefits outweigh the overhead.

## Diagram

~~~mermaid
flowchart LR
    A[Host shell] --> B[Checkout team app]
    A --> C[Account team app]
    A --> D[Search team app]
~~~

## Code Example

~~~txt
One team owns search results, another owns checkout, both mounted inside a shared shell.
~~~

## Google Architect Lens

Expect questions about boundary design, versioning, observability, performance budgets, and how you prevent each team from shipping its own siloed UX.

## Common Pitfalls

- Adopting micro frontends too early.
- Duplicating dependencies and design logic across remotes.
- Ignoring shared navigation, accessibility, and performance ownership.

