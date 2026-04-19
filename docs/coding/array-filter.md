---
title: Array.prototype.filter
category: coding
order: 8
---
# Array.prototype.filter

## 1-Line Intuition

Keep only the items whose callback returns truthy.

## Why Interviewers Care

Tests iteration basics and is foundational for UI state shaping and search filtering.

## Visual Model

~~~mermaid
flowchart LR
    A[input items] --> B{predicate true?}
    B -- Yes --> C[keep item]
    B -- No --> D[discard item]
~~~

## 30-Second Cheat Sheet

- Returns new array
- Length can shrink
- Does not mutate original
- Predicate decides inclusion

## Deep Dive

Filter is core to search, permissions, list views, and conditional UI pipelines. Polyfilling it tests callback semantics and array iteration basics. In architect rounds, it often appears as part of data-shaping pipelines before rendering or caching decisions.

## Minimal Code Example

~~~js
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  const source = Object(this); // Support array-like receivers, not just real arrays
  const length = source.length >>> 0; // Normalize length into an unsigned integer
  const output = []; // Filter builds a compact result array of kept values

  for (let index = 0; index < length; index += 1) {
    if (index in source) { // Skip sparse holes like native filter
      const value = source[index];
      if (callback.call(thisArg, value, index, source)) {
        output.push(value); // Filter only keeps values whose predicate passes
      }
    }
  }

  return output;
};
~~~

## Real-World Example

Filtering a product list to only show in-stock items or permission-allowed actions.

## Pros

- Clear intent
- Non-mutating
- Fits declarative UI code

## Cons

- Allocates a new array
- Repeated filtering can become expensive on huge lists

## Limitations

- Predicate cost still matters
- Not ideal for extremely hot loops without profiling

## Performance Impact / Related Metrics

- Commonly paired with debounce or memoization in search UIs
- Large filter + rerender cost can hurt INP

## Interview Questions With Answers

### 1. What does filter return?

A new array containing only elements whose predicate returned truthy.

### 2. Does filter preserve original order?

Yes, it preserves the order of kept elements.

### 3. Why is filter common in frontend apps?

Because many views are derived subsets of larger datasets.

## Common Mistakes

- Using filter when you only need to find one item
- Running expensive filters on every keystroke without debouncing
