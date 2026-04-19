---
title: Bundle Analysis & Optimization
category: performance
order: 5
---
# Bundle Analysis & Optimization

## What It Is

Bundle analysis shows which modules, assets, and duplicates are inflating shipped code so you can remove waste deliberately.

## Deep Dive

- Large dependencies often dominate first-load cost.
- Parse and execute cost matters in addition to transfer size.
- Duplicated packages can silently bloat bundles.
- Route and feature splits should mirror user journeys.
- Optimization work should start with measurement, not instinct.

## Diagram

~~~mermaid
flowchart TD
    A[Bundle report] --> B[Find biggest modules]
    B --> C[Check duplicates]
    C --> D[Split, replace, or defer code]
    D --> E[Measure again]
~~~

## Code Example

~~~txt
Main bundle includes a charting library used only on one report page.
Move it behind a lazy route boundary.
~~~

## Google Architect Lens

Speak in budgets: bytes, parse time, main-thread work, and critical-path ownership. Architectural decisions should be measurable.

## Common Pitfalls

- Optimizing tiny helpers while ignoring giant libraries.
- Looking only at compressed size.
- Making changes without re-measuring.

