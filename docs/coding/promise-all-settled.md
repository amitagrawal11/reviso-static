---
title: Promise.allSettled
category: coding
order: 4
---
# Promise.allSettled

## 1-Line Intuition

`Promise.allSettled` waits for every input to finish and tells you how each one ended.

## Why Interviewers Care

It tests whether you understand partial success handling and the difference between fail-fast orchestration and full outcome reporting.

## Visual Model

~~~mermaid
flowchart LR
  A["Start all promises"] --> B["Wait for every promise to settle"]
  B --> C["Collect {status, value/reason} for each input"]
  C --> D["Resolve outer promise once all outcomes are known"]
~~~

## 30-Second Cheat Sheet

- Waits for all outcomes
- Never fails fast
- Always resolves
- Returns per-item result objects
- Great when partial success still has value

## Deep Dive

`Promise.allSettled` is for workflows where every result matters, even failures. Instead of rejecting early, it waits until all inputs have either fulfilled or rejected, then resolves with an array describing each outcome.

This is valuable in architect-style frontend discussions because many real pages have optional data sources, non-critical widgets, or batch work where a partial result is still useful. Rather than letting one failure collapse the whole experience, you can inspect the results and degrade gracefully.

The main difference from `Promise.all` is not just "it waits." It also changes the error-handling contract: the outer promise resolves with structured outcomes instead of rejecting on first failure.

## Commented Interview-Ready Code

~~~js
function promiseAllSettled(values) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(values)) {
      reject(new TypeError('Expected an array'));
      return;
    }

    if (values.length === 0) {
      resolve([]); // Empty input resolves immediately with no outcomes.
      return;
    }

    const results = new Array(values.length);
    let settledCount = 0;

    values.forEach((value, index) => {
      Promise.resolve(value)
        .then((resolvedValue) => {
          results[index] = {
            status: 'fulfilled',
            value: resolvedValue,
          };
        })
        .catch((error) => {
          results[index] = {
            status: 'rejected',
            reason: error,
          };
        })
        .finally(() => {
          settledCount += 1; // Track completion regardless of outcome type.

          if (settledCount === values.length) {
            resolve(results); // All outcomes are now known.
          }
        });
    });
  });
}
~~~

## Dry Run / Execution Flow

Resolve:

```js
promiseAllSettled([
  Promise.resolve('profile'),
  Promise.reject(new Error('notifications failed')),
  'flags',
]);
```

The final result becomes:

```js
[
  { status: 'fulfilled', value: 'profile' },
  { status: 'rejected', reason: Error('notifications failed') },
  { status: 'fulfilled', value: 'flags' },
]
```

## Real-World Example

Load a dashboard where profile data is required, but recommendations, notifications, and experiments are optional. `allSettled` lets you render what worked and selectively degrade what failed.

## Pros

- Great for partial success workflows
- Preserves every outcome
- Makes graceful degradation easier

## Cons

- More verbose result handling
- Not ideal when one failure should stop everything immediately

## Limitations

- Always waits for all inputs
- Does not cancel ongoing work
- Requires callers to inspect `status` explicitly

## Performance Impact / Trade-Offs

`Promise.allSettled` can improve resilience because the UI can keep useful data even when some requests fail, but it also means you wait for slow failures before receiving the full result set.

## Interview Questions With Answers

### How is `Promise.allSettled` different from `Promise.all`?

`Promise.all` rejects on the first rejection. `Promise.allSettled` waits for every input and resolves with an array describing each outcome.

### When is `Promise.allSettled` the better choice?

When partial success is still useful and you need visibility into every result instead of failing the whole workflow early.

### What does each result object contain?

A `status` field, plus either `value` for fulfilled results or `reason` for rejected results.

## Common Mistakes

- Using it when fail-fast behavior is actually desired
- Forgetting to inspect `status`
- Assuming it will reject like `Promise.all`
