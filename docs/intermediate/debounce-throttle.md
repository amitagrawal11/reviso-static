---
title: Debounce & Throttle
category: coding
order: 15
---
# Debounce & Throttle

## What It Is

Debounce delays work until input settles. Throttle limits work so it runs at most once per interval.

## Why It Matters For A Google-Style Interview

You are expected to reason about event pressure, input responsiveness, and main-thread budget, not just memorize utility implementations.

## Deep Dive

- Debounce is best when only the final state matters, such as search queries.
- Throttle is best when updates should happen regularly but not on every event, such as scroll position.
- Leading and trailing behavior changes perceived responsiveness.
- Incorrect timing policy can either overload the main thread or make the UI feel laggy.
- On modern apps, these techniques are often paired with requestAnimationFrame or scheduler-aware rendering.

## Diagram

~~~mermaid
flowchart LR
    A[Rapid events] --> B{Strategy}
    B -- Debounce --> C[Run once after quiet period]
    B -- Throttle --> D[Run at controlled intervals]
~~~

## Code Example

~~~js
function throttle(fn, delay) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) {
      last = now;
      fn(...args);
    }
  };
}
~~~

## Google Architect Lens

Be ready to justify which events should be reduced, which ones should stay immediate, and how your choice affects INP.

## Common Pitfalls

- Debouncing interactions that should feel immediate.
- Throttling network writes without understanding dropped intermediate state.
- Forgetting cleanup for delayed callbacks on unmount.

