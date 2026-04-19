---
title: Promise.any
category: coding
order: 2
---
# Promise.any

## 1-Line Intuition

Resolve as soon as the first promise fulfills.

## Why Interviewers Care

Tests whether you understand fallback strategies and how Promise.any differs from Promise.race and Promise.all.

## Visual Model

~~~mermaid
flowchart LR
    A[Start all promises] --> B{Any fulfilled?}
    B -- Yes --> C[Resolve first fulfilled value]
    B -- No, all rejected --> D[Reject AggregateError]
~~~

## 30-Second Cheat Sheet

- Resolves on first fulfillment
- Ignores earlier rejections until all reject
- Rejects with AggregateError if every input rejects

## Deep Dive

Promise.any is useful when you have multiple fallback sources and only need one success. It differs from Promise.race because race settles on the first settled promise, even if that is a rejection. In architect-style interviews, it is useful to discuss redundancy, multiple endpoints, and graceful fallback patterns.

## Minimal Code Example

~~~js
function promiseAny(values) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(values)) {
      reject(new TypeError('Expected an array')); // Keep the interview version scoped to array input
      return;
    }

    if (values.length === 0) {
      reject(new AggregateError([], 'All promises were rejected')); // Match native empty-input behavior
      return;
    }

    const errors = new Array(values.length); // Preserve rejection reasons by input index
    let rejectedCount = 0; // We reject only if every candidate fails

    values.forEach((value, index) => {
      Promise.resolve(value) // Normalizes plain values and promises into one flow
        .then(resolve) // First fulfillment wins immediately
        .catch((error) => {
          errors[index] = error;
          rejectedCount += 1;

          if (rejectedCount === values.length) { // No fulfillment happened, so bubble aggregate failure
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}
~~~

## Real-World Example

Use it when requesting mirrored resources from multiple endpoints and you only need one successful response.

## Pros

- Great for redundancy and fallback
- Can reduce perceived latency

## Cons

- Harder error handling than Promise.all
- Still starts all work

## Limitations

- Rejects only after all fail
- Not supported in very old environments without polyfill

## Performance Impact / Related Metrics

- Can improve resilience and tail latency
- May increase network load because all candidates start

## Interview Questions With Answers

### 1. How is Promise.any different from Promise.race?

Any resolves on first fulfillment, while race settles on the first settled promise whether fulfilled or rejected.

### 2. When does Promise.any reject?

Only when all input promises reject.

### 3. What error type does it reject with when all fail?

AggregateError.

## Common Mistakes

- Confusing it with race
- Ignoring extra network cost
- Forgetting AggregateError handling
