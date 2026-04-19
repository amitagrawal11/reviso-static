---
title: Concurrent Mode
category: internals
order: 5
---
# Concurrent Mode

## What It Is

Concurrent rendering lets React prepare multiple UI states and interrupt lower-priority rendering when more urgent work arrives.

## Deep Dive

- Concurrency is about scheduling, not magically making everything faster.
- React may start rendering a branch and abandon it before commit.
- Urgent interactions like typing can preempt background rendering.
- Transitions mark updates that can yield to more important work.
- This reduces perceived lag when large recalculations happen.

## Diagram

~~~mermaid
flowchart TD
    A[User typing] --> B[Urgent update]
    C[Large list filter] --> D[Transition update]
    D --> E[Background render]
    B --> F[Commit urgent work first]
~~~

## Code Example

~~~jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setResults(expensiveFilter(data, query)));
~~~

## Google Architect Lens

Explain why architects care about responsiveness under load and how concurrency changes failure modes, testing assumptions, and render behavior.

## Common Pitfalls

- Depending on render timing as if it were deterministic.
- Treating concurrent rendering as a replacement for algorithmic optimization.
- Forgetting that heavy synchronous event handlers still block input.

