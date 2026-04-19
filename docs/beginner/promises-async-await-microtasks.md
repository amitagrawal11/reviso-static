---
title: Promises, Async/Await, Microtasks
category: foundations
order: 7
---
# Promises, Async/Await, Microtasks

## 1-Line Intuition

Promises model future values, `async/await` makes them readable, and their callbacks run in the microtask queue.

## Why Interviewers Care

This topic tests async reasoning, error handling, ordering guarantees, and whether you understand how modern JavaScript coordinates background work.

## Visual Model

~~~mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Fulfilled
    Pending --> Rejected
    Fulfilled --> MicrotaskQueued
    Rejected --> MicrotaskQueued
    MicrotaskQueued --> ContinuationRuns
~~~

## 30-Second Cheat Sheet

- Promise states: pending, fulfilled, rejected
- `.then()` and `await` schedule continuation work
- Promise callbacks go to the microtask queue
- `await` pauses one async function, not the whole runtime
- `Promise.all` is usually better for parallel independent work

## Deep Dive

Promises are values that stand in for future completion. The runtime tracks their state and schedules continuation logic once the promise settles. `async/await` does not change the underlying machinery; it changes readability.

The important scheduling rule is that promise continuations run as microtasks. That makes them execute before the next task, which is why async ordering sometimes surprises people. In real apps, this matters when you chain many async updates or rely on paint timing.

From an interview perspective, the strongest answer is usually not syntax-focused. It is about modeling failure, parallelism, and responsiveness correctly.

## Minimal Code Example

~~~js
async function loadDashboard() {
  const [user, projects] = await Promise.all([
    fetch("/api/user").then((r) => r.json()),
    fetch("/api/projects").then((r) => r.json()),
  ]);

  return { user, projects };
}
~~~

## Real-World Example

A dashboard page loads user info, notifications, and recommendations. If those calls are independent, waiting for them sequentially wastes time. Running them in parallel improves overall readiness.

## Pros

- Cleaner async control flow
- Stronger error propagation than nested callbacks
- Easier composition with utilities like `Promise.all`

## Cons

- Ordering can still confuse people
- Sequential `await` can accidentally slow apps down
- Large microtask chains can delay rendering

## Limitations

- Promises do not make CPU-heavy work non-blocking
- `await` does not fix poor concurrency design
- You still need cancellation or stale-result handling in real UIs

## Performance Impact / Related Metrics

- Parallelizing async work can improve startup and readiness
- Too many chained microtasks can delay paint
- Heavy logic after an `await` still runs on the main thread and can hurt `INP`

## Interview Questions With Answers

### 1. What is the difference between `await a(); await b();` and `await Promise.all([a(), b()])`?

The first runs sequentially if `b()` starts only after `a()` finishes. `Promise.all` starts both immediately and waits for both results, which is better for independent work.

### 2. Why do promise callbacks run before `setTimeout` callbacks?

Because promise callbacks are microtasks, and the runtime drains the microtask queue before taking the next task.

### 3. Does `await` make code non-blocking by itself?

It makes waiting for async results easier, but any synchronous work you do before or after the await still blocks the main thread.

## Common Mistakes

- Awaiting independent requests one by one
- Ignoring rejection handling
- Believing `await` moves work off the main thread
- Forgetting stale-result protection in live UIs
