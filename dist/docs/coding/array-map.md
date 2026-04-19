---
title: Array.prototype.map
category: coding
order: 7
---
# Array.prototype.map

## 1-Line Intuition

Transform each item into a new array of the same length.

## Why Interviewers Care

Common polyfill question that tests iteration, callback semantics, sparse arrays, and output shaping.

## Visual Model

~~~mermaid
flowchart LR
    A[input array] --> B[apply callback to each present item]
    B --> C[return new array same length]
~~~

## 30-Second Cheat Sheet

- Returns new array
- Same length as input
- Does not mutate original array
- Callback receives value, index, array

## Deep Dive

Map is a pure transformation utility in idiomatic JavaScript and frontend rendering. Polyfilling it shows whether you understand callback invocation, array-like behavior, and non-mutating operations. In UI code, it is the bridge from data collections to rendered views.

## Minimal Code Example

~~~js
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  const source = Object(this); // Support array-like receivers, not just real arrays
  const length = source.length >>> 0; // Coerce to a valid non-negative integer length
  const output = new Array(length); // Map preserves the original array length

  for (let index = 0; index < length; index += 1) {
    if (index in source) { // Skip sparse holes like native map
      output[index] = callback.call(thisArg, source[index], index, source);
    }
  }

  return output;
};
~~~

## Real-World Example

Used constantly to turn API data into rows, cards, or menu options.

## Pros

- Readable transformation
- Encourages non-mutating style

## Cons

- Creates a new array each time
- Can be overused in hot paths

## Limitations

- Not meant for side effects
- Sparse array behavior surprises some people

## Performance Impact / Related Metrics

- Usually fine for UI code
- Can add allocation pressure in tight loops

## Interview Questions With Answers

### 1. Does map mutate the original array?

No, it returns a new array.

### 2. Why is map preferred over forEach for transformations?

Because map expresses that you are producing a new array result.

### 3. What should happen with sparse array holes?

Native map skips missing indexes while preserving array length.

## Common Mistakes

- Using map for side effects
- Forgetting sparse index behavior
- Mutating inside the callback without reason
