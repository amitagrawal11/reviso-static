---
title: IndexedDB & Storage APIs
category: internals
order: 7
---
# IndexedDB & Storage APIs

## What It Is

The browser offers multiple persistence layers, from small synchronous key-value storage to larger asynchronous structured storage.

## Deep Dive

- localStorage is synchronous and string-based.
- sessionStorage is scoped to the tab session.
- IndexedDB supports larger structured data and transactions.
- Storage choice affects performance, offline capability, and failure handling.
- At scale, storage strategy becomes part of product architecture, not just implementation detail.

## Diagram

~~~mermaid
flowchart LR
    A[Small simple prefs] --> B[localStorage]
    C[Larger structured offline data] --> D[IndexedDB]
~~~

## Code Example

~~~txt
Use localStorage for theme preference.
Use IndexedDB for offline drafts and cached records.
~~~

## Google Architect Lens

Be ready to explain trade-offs among synchronous APIs, quota limits, migration, and offline-first UX.

## Common Pitfalls

- Storing large datasets in localStorage.
- Ignoring quota and eviction behavior.
- Assuming browser persistence is always durable forever.

