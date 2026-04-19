---
title: Design Patterns (Observer, Singleton, Factory)
category: internals
order: 2
---
# Design Patterns (Observer, Singleton, Factory)

## What It Is

These patterns describe reusable approaches for communication, shared-instance control, and object creation.

## Deep Dive

- Observer fits subscriptions and event-driven updates.
- Singleton centralizes one shared instance, but can become hidden global state.
- Factory encapsulates creation decisions and dependency wiring.
- Patterns are tools, not goals.
- In frontend systems, patterns matter most when state, lifecycle, and team ownership become complex.

## Diagram

~~~mermaid
flowchart LR
    A[Publisher] --> B[Observer subscribers]
    C[Factory] --> D[Creates configured objects]
    E[Singleton] --> F[Shared instance]
~~~

## Code Example

~~~js
function createApiClient(baseUrl) {
  return {
    get(path) {
      return fetch(baseUrl + path);
    }
  };
}
~~~

## Google Architect Lens

Interviewers will often care less about names and more about whether you can justify lifecycle, ownership, and failure boundaries.

## Common Pitfalls

- Using singletons for convenience instead of explicit dependency flow.
- Forcing patterns onto simple code.
- Creating brittle event systems without observability.

