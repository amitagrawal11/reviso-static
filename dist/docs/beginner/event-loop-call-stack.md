---
title: Event Loop & Call Stack
category: foundations
order: 6
---
# Event Loop & Call Stack

## 1-Line Intuition

The call stack is what JavaScript is doing right now, and the event loop decides what gets to run next.

## Why Interviewers Care

This topic reveals whether you truly understand async JavaScript, UI blocking, and why some apps feel slow even when network responses are fast.

## Visual Model

~~~mermaid
flowchart TD
    A[Sync code enters call stack] --> B{Stack empty?}
    B -- No --> A
    B -- Yes --> C[Flush microtask queue]
    C --> D[Pick next task from task queue]
    D --> E[Run callback on call stack]
    E --> B
    C --> F[Browser gets chance to render]
~~~

## 30-Second Cheat Sheet

- Stack = active synchronous work
- Task queue = timers, DOM events, message events
- Microtask queue = promises, queueMicrotask
- Microtasks always run before the next task
- Long sync work blocks rendering and user input

## Deep Dive

JavaScript on the browser main thread uses a run-to-completion model. That means once a function starts running, nothing else can interrupt it until it finishes. Browser APIs like timers and fetch do not run on the JavaScript call stack. Instead, when they complete, they schedule callbacks into queues.

The subtle but important rule is that once the current stack is empty, the runtime drains the microtask queue first. Only after that does it take the next task from the task queue. This is why promise callbacks typically run before `setTimeout(fn, 0)`.

From a performance perspective, the event loop is also where responsiveness is won or lost. If you keep the main thread busy for too long, rendering and user input both wait behind that work.

## Minimal Code Example

~~~js
console.log("A");

setTimeout(() => console.log("timer"), 0);

Promise.resolve()
  .then(() => console.log("microtask 1"))
  .then(() => console.log("microtask 2"));

console.log("B");
~~~

Expected output:

~~~txt
A
B
microtask 1
microtask 2
timer
~~~

## Real-World Example

A search page receives a keystroke, schedules state updates, performs promise-based work, and also has a timer for analytics. If your input handler is heavy, the browser cannot paint the updated input quickly, and INP gets worse even though the network is not the bottleneck.

## Pros

- Simple mental model for single-threaded execution
- Predictable ordering once you understand microtasks vs tasks
- Makes many async bugs easier to reason about

## Cons

- Easy to misuse if you do too much synchronous work
- Ordering between queues can surprise people
- Main-thread contention hurts everything at once

## Limitations

- This model explains main-thread JS, not all browser internals
- Workers use a related but separate event loop
- Understanding the event loop does not replace profiling real bottlenecks

## Performance Impact / Related Metrics

- Strongly related to `INP`
- Long tasks block rendering and input responsiveness
- Heavy synchronous work can delay paint and layout too
- Promise-heavy microtask chains can starve the browser from painting

## Interview Questions With Answers

### 1. Why does `Promise.resolve().then(...)` run before `setTimeout(..., 0)`?

Because promise callbacks go to the microtask queue, and microtasks are drained before the runtime takes the next task from the task queue.

### 2. Why can a CPU-heavy loop hurt UI responsiveness even if there is no network request?

Because the loop occupies the main thread. The browser cannot paint, handle input, or run queued callbacks until that synchronous work finishes.

### 3. Does `await` block the browser?

No. `await` pauses only the async function and schedules its continuation later. It does not freeze the entire runtime by itself.

## Common Mistakes

- Saying JavaScript is multithreaded on the main thread
- Treating `setTimeout(fn, 0)` as immediate
- Ignoring long-task impact on responsiveness
- Forgetting that microtasks can delay rendering too
