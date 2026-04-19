---
title: Promise.all
category: coding
order: 1
---
# Promise.all

## 1-Line Intuition

Run multiple async operations together and fail fast if any one rejects.

## Why Interviewers Care

Interviewers use this to test promise composition, parallelism, and error behavior.

## Visual Model

~~~mermaid
flowchart LR
    A[Start promises together] --> B{All fulfilled?}
    B -- Yes --> C[Resolve ordered results]
    B -- No --> D[Reject immediately]
~~~

## 30-Second Cheat Sheet

- Starts all promises immediately
- Preserves result order
- Rejects on first rejection
- Best for independent async work

## Deep Dive

Promise.all is the standard way to express parallel async work when every result is required. It waits for all inputs to fulfill and returns results in input order. If any input rejects, the combined promise rejects immediately. In frontend interviews, the strongest answers connect Promise.all to latency reduction, dashboard loading, and avoiding unnecessary sequential awaits.

## Minimal Code Example

~~~js
function promiseAll(values) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(values)) {
      reject(new TypeError('Expected an array')); // Keep scope narrow for the interview version
      return;
    }

    if (values.length === 0) {
      resolve([]); // Native Promise.all resolves immediately for empty input
      return;
    }

    const results = new Array(values.length); // Preserve input order, not completion order
    let fulfilledCount = 0; // Track how many inputs have finished successfully

    values.forEach((value, index) => {
      Promise.resolve(value) // Normalizes plain values and promises into one flow
        .then((resolvedValue) => {
          results[index] = resolvedValue;
          fulfilledCount += 1;

          if (fulfilledCount === values.length) { // Resolve only after every input fulfills
            resolve(results);
          }
        })
        .catch(reject); // Fail fast on the first rejection
    });
  });
}
~~~

## Real-World Example

Use it to load user profile, feature flags, and notifications in parallel during dashboard startup.

## Pros

- Reduces total wait time for independent async work
- Clear intent for parallelism
- Keeps result order stable

## Cons

- Fails fast even if only one task matters less
- No partial-success result by default
- Still runs work on the main thread after resolution

## Limitations

- Does not cancel already-started work automatically
- Not ideal when you need all results including failures

## Performance Impact / Related Metrics

- Often improves startup latency
- Heavy post-processing can still hurt INP

## Interview Questions With Answers

### 1. When should you prefer Promise.all?

When multiple async operations are independent and you need all of their results before continuing.

### 2. Why is Promise.all usually better than sequential await for independent calls?

Because the requests start together instead of waiting on each other, reducing overall latency.

### 3. What happens if one promise rejects?

The combined promise rejects immediately with that reason.

## Common Mistakes

- Using it for dependent work
- Expecting automatic cancellation
- Forgetting that result order matches input order, not completion order
