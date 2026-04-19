---
title: Incremental Static Regeneration (ISR)
category: performance
order: 11
---
# Incremental Static Regeneration (ISR)

## What It Is

ISR serves a cached static page and regenerates it in the background after a freshness window, combining static speed with eventual updates.

## Deep Dive

- Requests often hit a cached page first.
- After the revalidation window, regeneration can happen in the background.
- This is useful for mostly-static pages that still need periodic freshness.
- Content can be stale temporarily by design.
- Cache invalidation strategy is part of the system design.

## Diagram

~~~mermaid
flowchart TD
    A[Request page] --> B{Cached and fresh?}
    B -- Yes --> C[Serve cached page]
    B -- No --> D[Serve stale or regenerate depending on strategy]
    D --> E[Background rebuild]
~~~

## Code Example

~~~txt
Marketing pages, docs pages, or product catalog pages often fit ISR better than real-time dashboards.
~~~

## Google Architect Lens

Describe freshness guarantees honestly. Architects are expected to be explicit about stale windows, invalidation triggers, and failure behavior.

## Common Pitfalls

- Treating ISR as real-time.
- Forgetting purge paths after content updates.
- Not understanding what happens on regeneration failure.

