---
title: Container Queries
category: performance
order: 7
---
# Container Queries

## What It Is

Container queries let a component adapt to the size of its containing element instead of only the viewport.

## Deep Dive

- Viewport media queries answer page-level questions.
- Container queries answer component-level questions.
- The parent must declare itself as a query container.
- This is ideal for reusable cards, side panels, and embedded modules.
- Architects care because this improves portability across layouts without duplicating component variants.

## Diagram

~~~mermaid
flowchart TD
    A[Component in wide container] --> B[Use multi-column layout]
    C[Same component in narrow sidebar] --> D[Use stacked layout]
~~~

## Code Example

~~~css
.card-shell {
  container-type: inline-size;
}

@container (min-width: 40rem) {
  .card { grid-template-columns: 1fr 1fr; }
}
~~~

## Google Architect Lens

Describe how container queries help build resilient shared components that work across many host surfaces.

## Common Pitfalls

- Forgetting to declare a container.
- Falling back to viewport queries for component-local decisions.
- Overcomplicating layouts that do not actually need this power.

