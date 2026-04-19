---
title: CSS Houdini
category: system
order: 8
---
# CSS Houdini

## What It Is

CSS Houdini exposes lower-level hooks into parts of the CSS pipeline, such as custom paint worklets and typed custom properties.

## Deep Dive

- Paint worklets can generate custom visuals.
- Typed custom properties are more expressive and animatable.
- Houdini expands what CSS can do without jumping directly to canvas for some use cases.
- Support and complexity must be evaluated carefully.
- This is an advanced tool best reserved for places where standard CSS is insufficient.

## Diagram

~~~mermaid
flowchart LR
    A[CSS custom property] --> B[Houdini worklet]
    B --> C[Custom visual output]
~~~

## Code Example

~~~txt
Use a paint worklet to render a decorative pattern that reacts to typed custom properties.
~~~

## Google Architect Lens

Architect-level discussion should include support strategy, progressive enhancement, and whether the feature justifies operational complexity.

## Common Pitfalls

- Using Houdini where normal CSS is enough.
- Ignoring browser support constraints.
- Turning visual flourish into a maintenance liability.

