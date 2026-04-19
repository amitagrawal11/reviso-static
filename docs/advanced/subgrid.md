---
title: Subgrid
category: system
order: 7
---
# Subgrid

## What It Is

Subgrid lets nested grids inherit track sizing from their parent grid so alignment stays consistent across components.

## Deep Dive

- Parent-defined tracks can be reused by children.
- This avoids repeating column definitions manually.
- It helps with editorial layouts, dashboards, and aligned card systems.
- Shared alignment improves maintainability and consistency.
- It is especially valuable when multiple nested components must line up precisely.

## Diagram

~~~mermaid
flowchart LR
    A[Parent grid columns] --> B[Child subgrid uses same columns]
~~~

## Code Example

~~~css
.card-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.card {
  display: grid;
  grid-template-columns: subgrid;
}
~~~

## Google Architect Lens

Explain why layout systems should minimize duplicate constraints. Shared tracks are easier to evolve across a large design system.

## Common Pitfalls

- Recreating grid tracks manually and drifting over time.
- Using subgrid where simple independent grids would be clearer.
- Forgetting support and fallback considerations for your audience.

