---
title: Streaming SSR
category: performance
order: 10
---
# Streaming SSR

## What It Is

Streaming SSR sends HTML to the client in chunks as portions of the page become ready instead of waiting for the entire render to complete first.

## Deep Dive

- The shell can reach the user earlier.
- Suspense boundaries often define streamable chunks.
- Streaming reduces time to visible structure but not necessarily time to interactivity.
- It pairs well with selective hydration.
- Error handling becomes trickier once bytes are already sent.

## Diagram

~~~mermaid
flowchart LR
    A[Request] --> B[Send shell HTML]
    B --> C[Stream section 1]
    C --> D[Stream section 2]
    D --> E[Hydrate incrementally]
~~~

## Code Example

~~~txt
Send header, nav, and main shell immediately.
Stream recommendations and comments when data is ready.
~~~

## Google Architect Lens

Explain where streaming helps, where it does not, and how you would measure the difference between earlier content visibility and actual usable interactivity.

## Common Pitfalls

- Treating streaming as a universal win.
- Causing layout instability while streamed sections appear.
- Ignoring hydration cost after HTML arrives.

