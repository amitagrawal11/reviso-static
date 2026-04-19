---
title: Atomic Design
category: system
order: 1
---
# Atomic Design

## What It Is

Atomic Design is a mental model for composing small UI primitives into larger interface structures.

## Deep Dive

- Atoms are base elements such as buttons or labels.
- Molecules combine a few atoms into a useful unit.
- Organisms combine molecules into larger reusable sections.
- Templates and pages show layout-level assembly.
- The value is shared language and composition discipline, not rigid ceremony.

## Diagram

~~~mermaid
flowchart LR
    A[Atoms] --> B[Molecules]
    B --> C[Organisms]
    C --> D[Templates]
    D --> E[Pages]
~~~

## Code Example

~~~txt
Button -> SearchForm -> HeaderSearch -> PageHeader -> ProductPage
~~~

## Google Architect Lens

Use this carefully. For senior interviews, it is more valuable to discuss component boundaries and ownership than to over-index on naming layers.

## Common Pitfalls

- Turning a useful model into bureaucracy.
- Creating too many abstraction layers for small features.
- Avoiding directness in the name of “purity”.

