---
title: State Management Patterns (Flux, Zustand, Jotai)
category: internals
order: 3
---
# State Management Patterns (Flux, Zustand, Jotai)

## What It Is

State management patterns define where state lives, how updates flow, and how UI subscribes to changes.

## Deep Dive

- Flux emphasizes unidirectional flow and explicit updates.
- Zustand uses a lightweight shared store with selector-based subscriptions.
- Jotai models state as composable atoms.
- The main architectural question is not which library is coolest, but how local vs shared vs derived state should be shaped.
- Good state design minimizes unnecessary subscriptions and cross-surface coupling.

## Diagram

~~~mermaid
flowchart LR
    A[Action or event] --> B[State store]
    B --> C[Selectors or atoms]
    C --> D[Subscribed UI]
~~~

## Code Example

~~~txt
Local state for input focus.
Shared store for authenticated user.
Derived selector for visible dashboard cards.
~~~

## Google Architect Lens

Focus on data flow clarity, subscription granularity, and how state choices affect performance, testing, and ownership across a large app.

## Common Pitfalls

- Moving everything into a global store.
- Letting state shape follow library fashion instead of domain needs.
- Ignoring render churn from broad subscriptions.

