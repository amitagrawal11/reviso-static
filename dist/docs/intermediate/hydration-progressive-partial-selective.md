---
title: Hydration (Progressive / Partial / Selective)
category: performance
order: 9
---
# Hydration (Progressive / Partial / Selective)

## What It Is

Hydration attaches client-side behavior to server-rendered HTML. Progressive, partial, and selective hydration differ in how much JavaScript is activated and in what order.

## Deep Dive

- Standard hydration reuses existing HTML and binds interactive logic.
- Progressive hydration hydrates parts of a page in stages.
- Partial hydration limits hydration to interactive regions.
- Selective hydration prioritizes the areas users are likely to interact with first.
- The key trade-off is lower startup cost versus added complexity in boundaries and loading behavior.

## Diagram

~~~mermaid
flowchart LR
    A[SSR HTML arrives] --> B[Shell visible]
    B --> C[Hydrate critical UI first]
    C --> D[Hydrate deferred regions later]
~~~

## Code Example

~~~txt
Server renders product page HTML first.
Client hydrates nav, search, and cart first.
Reviews and recommendations hydrate later.
~~~

## Google Architect Lens

Frame this as a startup-budget problem: how do you minimize shipped JavaScript while keeping key interactions ready first?

## Common Pitfalls

- Treating SSR as automatically fast for interactivity.
- Causing server-client markup mismatches.
- Hydrating too much too early and losing the startup benefit.

