---
title: Array.prototype.reduce
category: coding
order: 9
---
# Array.prototype.reduce

## 1-Line Intuition

Fold an array into one accumulated result.

## Why Interviewers Care

Common interview favorite because it tests index handling, accumulator semantics, and whether you can build abstractions from iteration.

## Visual Model

~~~mermaid
flowchart LR
    A[item 1] --> B[accumulator]
    C[item 2] --> B
    D[item 3] --> B
    B --> E[final result]
~~~

## 30-Second Cheat Sheet

- Accumulator + current item
- Can return any type
- Initial value matters a lot

## Deep Dive

Reduce is more general than map or filter because it can build totals, objects, arrays, grouped structures, and more. Polyfilling reduce shows whether you can handle initialization, empty arrays, and index progression correctly. In system design discussions, it also maps nicely to aggregation and derived-state building.

## Minimal Code Example

~~~js
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  const source = Object(this);
  const length = source.length >>> 0;
  let index = 0;
  let accumulator = initialValue;

  if (arguments.length < 2) {
    while (index < length && !(index in source)) {
      index += 1;
    }

    if (index >= length) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    accumulator = source[index]; // First present element becomes the starting accumulator
    index += 1;
  }

  for (; index < length; index += 1) {
    if (index in source) {
      accumulator = callback(accumulator, source[index], index, source); // Fold current item into accumulated result
    }
  }

  return accumulator;
};
~~~

## Real-World Example

Building a frequency map, grouped object, or subtotal from cart items.

## Pros

- Very flexible
- Can express complex transformations compactly

## Cons

- Can become unreadable if overused
- Easy to misuse without an initial value

## Limitations

- Not always the clearest choice
- Harder to debug when nested

## Performance Impact / Related Metrics

- Performance is usually fine; readability is the bigger concern
- Badly written reducers can create many allocations

## Interview Questions With Answers

### 1. Why is an initial value important?

It makes behavior explicit and avoids edge cases for empty arrays.

### 2. What makes reduce harder than map or filter?

Because the accumulator can be any shape, so correctness depends on initialization and callback design.

### 3. When should you avoid reduce?

When a more specific operation like map, filter, or a simple loop would be clearer.

## Common Mistakes

- Skipping the initial value casually
- Packing too much logic into one reducer
- Sacrificing readability for cleverness
