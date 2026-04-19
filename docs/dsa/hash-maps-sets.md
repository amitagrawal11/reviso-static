---
title: Hash Maps & Sets
category: foundations
order: 2
---
# Hash Maps & Sets

## 1-Line Intuition

Hash-based structures trade extra memory for fast lookup, which is often the first big optimization in interview code.

## Why Interviewers Care

This is one of the most common moves in algorithm interviews: replace repeated scanning with constant-time average lookup. It also shows whether you understand frequency counts, membership checks, caching, and visited tracking.

## When To Use

Use a map or set when you need:

- membership checks
- frequency counts
- deduplication
- key-to-metadata lookup
- visited tracking in graph/tree problems

## Visual Model

~~~mermaid
flowchart LR
  A["Input item"] --> B["Hash key"]
  B --> C{"Seen before?"}
  C -- Yes --> D["Update count / metadata"]
  C -- No --> E["Store first occurrence"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| `set.add(value)` / `map.set(key, value)` | O(1) average | O(1) extra | Hash-based insert |
| `set.has(value)` / `map.has(key)` | O(1) average | O(1) | Membership lookup |
| `map.get(key)` | O(1) average | O(1) | Metadata retrieval |
| Frequency counting over `n` items | O(n) | O(k) | `k` distinct keys |
| Repeated array membership scan | O(n) each | O(1) | Common brute-force baseline |

## 30-Second Cheat Sheet

- Use `Set` for membership.
- Use `Map` for key-to-value metadata.
- Hash maps often turn O(n^2) into O(n).
- In JavaScript, `Map` is usually cleaner than plain `Object` for algorithm work.
- Ask whether you need exact lookup, count, or "have I seen this before?"

## Brute Force Approach

For a problem like "contains duplicate," brute force compares every pair of elements.

- Time: O(n^2)
- Space: O(1)

That works, but it repeats the same equality checks over and over.

## Optimized Approach

Use a set:

- walk through the array once
- if the current value is already in the set, return `true`
- otherwise add it and continue

- Time: O(n)
- Space: O(n)

You trade memory for much faster lookup.

## Commented Interview-Ready Code

~~~js
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true; // We already saw this value earlier.
    }

    seen.add(num); // Remember it for future membership checks.
  }

  return false;
}
~~~

## Dry Run

Check `[4, 1, 7, 4]`.

1. `seen = {}`
2. Read `4`, not present, add it
3. Read `1`, not present, add it
4. Read `7`, not present, add it
5. Read `4`, already present
6. Return `true`

## Common Problem Types

- contains duplicate
- two sum
- group anagrams
- frequency counts
- visited nodes in BFS/DFS
- longest substring without repeating characters
- caching lookup results

## Real-World Frontend Analogy

Selections by ID, deduping fetched entities, caching expensive calculations, and tracking visited routes or nodes in a UI flow all rely on the same fast-lookup idea.

## Pros

- Huge speedup for repeated lookup
- Simple, reusable optimization pattern
- Fits many different problem shapes

## Cons

- Uses extra memory
- Easy to reach for it mechanically without explaining why

## Limitations

- Exact lookup only; ordering queries need different structures
- Worst-case hash behavior exists conceptually, even though average case is what we rely on in interviews

## Performance Impact / Trade-Offs

Maps and sets are often the difference between a solution timing out and passing comfortably. The trade-off is memory, which is usually acceptable when lookup cost dominates.

## Interview Questions With Strong Answers

### When should I choose a set over an array?

When repeated membership checking matters. Scanning an array each time is linear, while a set gives constant-time average lookup.

### Why prefer `Map` over plain object in JavaScript interviews?

`Map` has clearer semantics, safer key handling, and avoids prototype-related quirks that distract from the algorithm.

### What is the most common use of a hash map in interview questions?

Counting frequencies, storing first seen positions, and turning repeated lookup into O(1) average work.

## Common Mistakes

- Using arrays for repeated membership checks
- Choosing `Object` by habit when `Map` is clearer
- Adding a hash map without explaining what lookup it saves
- Forgetting memory trade-offs entirely
