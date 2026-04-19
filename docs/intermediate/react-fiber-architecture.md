---
title: React Fiber Architecture
category: internals
order: 4
---
# React Fiber Architecture

## What It Is

Fiber is React's internal architecture for representing rendering work as units that can be prioritized, paused, resumed, or discarded.

## Why It Matters For A Google-Style Interview

This is less about naming internals and more about explaining how a framework keeps input responsive under load.

## Deep Dive

- Fiber replaced the older recursive reconciler with a linked structure that can schedule work incrementally.
- Render work can be split into units rather than finishing the whole tree in one uninterruptible pass.
- The render phase prepares work; the commit phase applies side effects to the DOM.
- Priority-aware scheduling is what enables transitions and interruptible rendering.
- This architecture is crucial when reasoning about large trees, expensive updates, and responsiveness.

## Diagram

~~~mermaid
flowchart LR
    A[State update] --> B[Schedule fiber work]
    B --> C[Render phase builds next tree]
    C --> D[Commit phase mutates DOM]
~~~

## Code Example

~~~jsx
startTransition(() => {
  setFilter(query);
});
~~~

## Google Architect Lens

Talk about trade-offs: preserving responsiveness, limiting large synchronous work, and separating urgent from non-urgent updates.

## Common Pitfalls

- Confusing Fiber with true parallel DOM updates.
- Assuming render side effects are safe.
- Ignoring the difference between reconciliation and commit.

