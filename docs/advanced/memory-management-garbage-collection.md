---
title: Memory Management & Garbage Collection
category: internals
order: 1
---
# Memory Management & Garbage Collection

## What It Is

JavaScript allocates memory automatically and reclaims unreachable objects through garbage collection.

## Deep Dive

- Reachability is the key mental model.
- Closures, listeners, DOM references, and caches can keep data alive unexpectedly.
- Modern engines use optimized tracing strategies rather than manual free calls.
- Large object graphs and leaks often show up as responsiveness problems before outright crashes.
- Architects care because leaks amplify over long-lived sessions.

## Diagram

~~~mermaid
flowchart LR
    A[Object created] --> B{Still reachable?}
    B -- Yes --> C[Remain in memory]
    B -- No --> D[Eligible for GC]
~~~

## Code Example

~~~js
const cache = [];
function remember(node) {
  cache.push(node);
}
~~~

This can leak detached nodes if the cache is never cleaned.

## Google Architect Lens

Explain how you would detect leaks in a complex app: heap snapshots, detached DOM analysis, long-session profiling, and eliminating accidental retainers.

## Common Pitfalls

- Assuming GC prevents all leaks.
- Keeping subscriptions and timers alive after component teardown.
- Retaining large response objects in global caches without policy.

