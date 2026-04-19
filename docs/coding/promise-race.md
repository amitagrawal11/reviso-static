---
title: Promise.race
category: coding
order: 3
---
# Promise.race

## 1-Line Intuition

`Promise.race` settles as soon as the first input promise settles, whether that result is a fulfillment or a rejection.

## Why Interviewers Care

It tests whether you understand the difference between "first settled" and "first fulfilled," and whether you can reason about timeout patterns, cancellation-like behavior, and fail-fast races.

## Visual Model

~~~mermaid
flowchart LR
  A["Start all promises"] --> B{"Which settles first?"}
  B -- "Fulfill first" --> C["Resolve outer promise"]
  B -- "Reject first" --> D["Reject outer promise"]
~~~

## 30-Second Cheat Sheet

- First settled wins
- Can resolve first or reject first
- Different from `Promise.any`
- Useful for timeouts and mirrors
- Does not cancel slower promises automatically

## Deep Dive

`Promise.race` is about settlement speed, not success. If the first thing to finish is a rejection, the outer promise rejects immediately. That makes it useful when you care about whichever result arrives first, such as a timeout guard or a fastest-response strategy.

In interviews, the strongest explanation contrasts it with:

- `Promise.all`: waits for all, fails fast on first rejection
- `Promise.any`: resolves on first fulfillment, ignores rejections until all reject
- `Promise.allSettled`: waits for everything and never fails fast

The subtle point is that `Promise.race` often looks like cancellation, but native promises do not cancel work automatically. The slower operations keep running unless you combine the race with something abortable like `AbortController`.

## Commented Interview-Ready Code

~~~js
function promiseRace(values) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(values)) {
      reject(new TypeError('Expected an array')); // Keep the interview scope narrow.
      return;
    }

    if (values.length === 0) {
      return; // Native Promise.race stays pending for empty input.
    }

    values.forEach((value) => {
      Promise.resolve(value) // Normalize plain values and promises into one flow.
        .then(resolve) // First fulfillment settles the outer promise if it wins the race.
        .catch(reject); // First rejection also wins if it settles first.
    });
  });
}
~~~

## Dry Run / Execution Flow

Race these inputs:

```js
promiseRace([
  new Promise((resolve) => setTimeout(() => resolve('slow success'), 50)),
  new Promise((_, reject) => setTimeout(() => reject(new Error('fast failure')), 10)),
]);
```

1. Both promises start immediately
2. The rejection settles first at 10ms
3. The outer promise rejects with `Error('fast failure')`
4. The slower fulfillment still runs later, but it no longer affects the result

## Real-World Example

Use `Promise.race` to combine a fetch with a timeout promise so the UI can fail fast when the backend is too slow to meet interaction expectations.

## Pros

- Very useful for timeout guards
- Easy to express "whoever finishes first"
- Good for fail-fast orchestration

## Cons

- Easy to confuse with `Promise.any`
- Slower work still continues unless separately aborted

## Limitations

- Empty input remains pending
- No automatic cancellation
- Not the right choice when you care specifically about the first success

## Performance Impact / Trade-Offs

`Promise.race` can improve perceived responsiveness because the UI can move on when one branch settles quickly, but it may still waste work in the background if the losing operations keep running.

## Interview Questions With Answers

### How is `Promise.race` different from `Promise.any`?

`Promise.race` settles on the first settled promise, whether it fulfilled or rejected. `Promise.any` only resolves on the first fulfillment and rejects only if all inputs reject.

### What happens when `Promise.race([])` is called?

It stays pending forever because there is no input that can settle it.

### Why is `Promise.race` common in timeout examples?

Because you can race the main async operation against a timer rejection and use whichever settles first as the result.

## Common Mistakes

- Treating it as "first success"
- Forgetting that the losing promises keep running
- Missing the empty-input pending behavior
