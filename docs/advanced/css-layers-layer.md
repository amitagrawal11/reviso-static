---
title: CSS Layers (@layer)
category: system
order: 6
---
# CSS Layers (@layer)

## What It Is

CSS layers provide ordered buckets of styles so cascade priority is easier to reason about without escalating specificity.

## Deep Dive

- Layer order defines precedence across groups.
- This is useful for resets, tokens, components, and utilities.
- Specificity still applies within the same layer.
- Layers help make large CSS systems more predictable.
- They are especially valuable when combining third-party and first-party styles.

## Diagram

~~~mermaid
flowchart TD
    A[reset layer] --> B[base layer]
    B --> C[components layer]
    C --> D[utilities layer]
~~~

## Code Example

~~~css
@layer reset, base, components, utilities;
~~~

## Google Architect Lens

Talk about maintainability at scale: predictable style ordering reduces override hacks and onboarding friction across large teams.

## Common Pitfalls

- Expecting layers to replace all cascade knowledge.
- Ignoring the interaction between layered and unlayered styles.
- Creating too many layers with unclear ownership.

