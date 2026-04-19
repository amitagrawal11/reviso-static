---
title: Time Slicing
category: internals
order: 6
---
# Time Slicing

## What It Is

Time slicing breaks rendering work into chunks so the browser can process user input and urgent work in between.

## Deep Dive

- Large uninterrupted work hurts responsiveness.
- Splitting work creates opportunities to yield.
- It improves responsiveness, not necessarily total compute time.
- Scheduling priority determines which work can wait.
- This matters most when complex rendering competes with real user input.

## Diagram

~~~mermaid
flowchart LR
    A[Large render work] --> B[Chunk 1]
    B --> C[Yield to browser]
    C --> D[Chunk 2]
    D --> E[Yield again]
~~~

## Code Example

~~~txt
Process a large list in chunks so typing remains responsive while results update.
~~~

## Google Architect Lens

This is a classic responsiveness discussion: how do you preserve input latency while still making progress on expensive work?

## Common Pitfalls

- Confusing time slicing with multithreading.
- Assuming chunking removes the need for algorithmic optimization.
- Ignoring expensive synchronous handlers around the sliced work.

