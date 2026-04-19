---
title: Tree Shaking
category: performance
order: 4
---
# Tree Shaking

## What It Is

Tree shaking removes unused exports from final bundles by analyzing statically known module graphs.

## Deep Dive

- ES modules support static structure that bundlers can analyze.
- Side effects can prevent safe elimination.
- Dead-code elimination usually happens after bundling and minification stages cooperate.
- Library packaging style strongly affects downstream bundle size.
- Architects care because bundle cost scales across every user session.

## Diagram

~~~mermaid
flowchart LR
    A[Module graph] --> B[Mark used exports]
    B --> C[Drop unreachable code]
    C --> D[Smaller shipped bundle]
~~~

## Code Example

~~~js
import { formatDate } from './utils/date.js';
~~~

If the bundler can prove only formatDate is used, other unused exports may be removed.

## Google Architect Lens

Be ready to explain why a bundle stayed large even after “tree shaking” was enabled: side effects, CommonJS boundaries, and transitive dependencies are typical reasons.

## Common Pitfalls

- Assuming all unused code disappears automatically.
- Ignoring package sideEffects metadata.
- Mixing module systems carelessly.

