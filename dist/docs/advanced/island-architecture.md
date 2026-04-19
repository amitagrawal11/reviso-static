---
title: Island Architecture
category: system
order: 3
---
# Island Architecture

## What It Is

Island architecture keeps most of a page static and hydrates only isolated interactive regions.

## Deep Dive

- Static HTML handles the content-heavy majority cheaply.
- Interactive islands load and hydrate independently.
- Total shipped JavaScript can drop significantly.
- It works best for content-first pages with pockets of interactivity.
- Boundary design matters because shared state across islands can reintroduce coupling.

## Diagram

~~~mermaid
flowchart LR
    A[Static page shell] --> B[Search island]
    A --> C[Comments island]
    A --> D[Cart island]
~~~

## Code Example

~~~txt
Blog content remains static.
Search, comments, and purchase widgets hydrate only when needed.
~~~

## Google Architect Lens

Be ready to discuss composition boundaries, shared state challenges, and where island architecture fits or fails in app-like experiences.

## Common Pitfalls

- Splitting into too many tiny islands.
- Assuming every product surface is content-first.
- Reintroducing heavy client coordination across islands.

