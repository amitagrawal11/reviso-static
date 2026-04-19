---
title: JSON.stringify
category: coding
order: 11
---
# JSON.stringify

## 1-Line Intuition

Turn a JavaScript value into a JSON string according to JSON rules.

## Why Interviewers Care

Senior-friendly coding question that tests recursion, type handling, and whether you understand what JSON can and cannot represent.

## Visual Model

~~~mermaid
flowchart TD
    A[Input value] --> B{Primitive, array, or object?}
    B -- Primitive --> C[Serialize directly]
    B -- Array --> D[Serialize each item in order]
    B -- Object --> E[Serialize enumerable keys]
    D --> F[Build JSON string]
    E --> F
~~~

## 30-Second Cheat Sheet

- JSON is not all of JavaScript
- Objects and arrays recurse
- Functions and undefined are special cases

## Deep Dive

A simplified JSON.stringify implementation is a strong interview exercise because it mixes recursion, type branching, and edge-case scoping. The best answers clarify scope up front: plain objects and arrays only, or full JSON semantics? Architecturally, it also ties back to serialization boundaries, logging, storage, and API payload shaping.

## Minimal Code Example

~~~js
function stringify(value) {
  if (value === null) {
    return 'null'; // JSON has a dedicated literal for null
  }

  if (typeof value === 'string') {
    return '"' + value
      .replace(/\\/g, '\\\\') // Escape backslashes first
      .replace(/"/g, '\\"') // Then escape quotes
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t') + '"';
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value); // Numbers and booleans serialize as primitive literals
  }

  if (Array.isArray(value)) {
    const items = value.map((item) => {
      const serialized = stringify(item);
      return serialized === undefined ? 'null' : serialized; // JSON arrays convert unsupported values to null
    });
    return '[' + items.join(',') + ']';
  }

  if (typeof value === 'object') {
    const parts = []; // Build up key:value pairs before joining into an object literal

    for (const key of Object.keys(value)) {
      const serialized = stringify(value[key]);
      if (serialized !== undefined) {
        parts.push(stringify(key) + ':' + serialized); // Skip unsupported object values like undefined and functions
      }
    }

    return '{' + parts.join(',') + '}';
  }

  return undefined;
}
~~~

## Real-World Example

Helpful for understanding why logs, storage payloads, and network payloads sometimes drop functions or undefined values.

## Pros

- Great recursion and serialization exercise
- Connects JS values to wire format thinking

## Cons

- Full native semantics are surprisingly broad
- Easy to overbuild in interviews

## Limitations

- A simplified version usually omits replacers, spacing, and many edge cases

## Performance Impact / Related Metrics

- Large object serialization is CPU-heavy
- Serializing on interaction-critical paths can hurt responsiveness

## Interview Questions With Answers

### 1. Why can JSON.stringify be a good senior interview question?

Because it tests recursion, type handling, scoping assumptions, and serialization reasoning.

### 2. Why is JSON different from general JavaScript objects?

JSON supports only a subset of JavaScript value types and has strict representation rules.

### 3. What should you do before implementing in an interview?

Clarify scope and edge cases so you do not accidentally reimplement the entire native spec.

## Common Mistakes

- Trying to support the full native spec without clarification
- Ignoring unsupported values
- Forgetting recursion through arrays and objects
