---
title: Deep Clone
category: coding
order: 10
---
# Deep Clone

## 1-Line Intuition

Create a structurally independent copy of nested data.

## Why Interviewers Care

Tests recursion, cycles discussion, object traversal, and awareness of what cloning actually means in JavaScript.

## Visual Model

~~~mermaid
flowchart TD
    A[Source object] --> B[Visit property]
    B --> C{Primitive?}
    C -- Yes --> D[Copy value]
    C -- No --> E[Clone nested object or array]
    E --> B
~~~

## 30-Second Cheat Sheet

- Shallow copy is not deep clone
- Arrays and objects need recursive traversal
- Cycles require tracking seen references

## Deep Dive

Deep cloning is deceptively tricky because JavaScript values include arrays, plain objects, dates, maps, sets, and circular references. In interviews, clarify scope early: plain objects only, or all built-ins? The best answers also explain when deep clone is the wrong architectural move, since cloning large structures can be expensive and often unnecessary in modern state management.

## Minimal Code Example

~~~js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') {
    return value; // Primitives can be returned directly
  }

  if (seen.has(value)) {
    return seen.get(value); // Prevent infinite recursion on cyclic references
  }

  const output = Array.isArray(value) ? [] : {}; // Clone array shape vs object shape
  seen.set(value, output); // Register before recursion so self-references can resolve

  for (const key of Object.keys(value)) {
    output[key] = deepClone(value[key], seen); // Recursively clone each enumerable own property
  }

  return output;
}
~~~

## Real-World Example

Copying nested draft form state before applying destructive edits.

## Pros

- Protects callers from shared mutation
- Useful for simple serialization-like use cases

## Cons

- Can be expensive
- Easy to get wrong for non-plain objects

## Limitations

- Not every JS value clones meaningfully this way
- Can hide poor state architecture

## Performance Impact / Related Metrics

- Large deep clones increase CPU and memory pressure
- Can hurt INP if done on interaction paths

## Interview Questions With Answers

### 1. Why is JSON.parse(JSON.stringify(obj)) not a complete deep clone?

It drops functions, undefined, dates, maps, sets, and fails on cycles.

### 2. Why use WeakMap in a deep clone?

To handle circular references and avoid infinite recursion.

### 3. When is deep clone a design smell?

When you are cloning large state frequently instead of designing better ownership or immutable updates.

## Common Mistakes

- Ignoring cycles
- Assuming JSON stringify covers all cases
- Deep cloning large state inside hot UI paths
