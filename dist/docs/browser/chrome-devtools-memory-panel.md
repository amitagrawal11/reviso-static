---
title: Chrome DevTools - Memory Panel
category: browser
order: 14
---
# Chrome DevTools: Memory Panel

## 1-Line Intuition
The Memory panel helps you find where objects are retained, why memory grows, and whether detached DOM nodes are leaking.

## Why Interviewers Care
It tests whether you can reason about heap retention instead of just saying "there is a leak."

## Visual Model

~~~mermaid
flowchart LR
  A["User action"] --> B["Allocate objects"]
  B --> C["Remove UI"]
  C --> D["Objects still retained"]
  D --> E["Heap snapshot"]
  E --> F["Retainer path"]
~~~

## 30-Second Cheat Sheet

- Use heap snapshots to compare memory state over time
- Look for retained objects and retainer paths
- Check for detached DOM nodes
- Use allocation timelines to spot growth during repeated actions
- Confirm whether cleanup actually releases references

## Deep Dive

The Memory panel is about ownership and retention. A snapshot tells you what is in the heap at a point in time, but the useful question is why those objects still exist. Retainer paths show which references keep them alive. That is how you find leaks caused by global caches, event listeners, timers, closures, or forgotten subscriptions.

Detached DOM nodes are especially important in frontend interviews because they are easy to create accidentally. The DOM element may be removed from the document, but some JavaScript reference still points to it, so the browser cannot reclaim the memory.

## Minimal Code Example

~~~js
function mountWidget(container) {
  const node = document.createElement('div');
  node.textContent = 'Widget';
  container.appendChild(node);

  const intervalId = setInterval(() => {
    node.textContent = String(Date.now());
  }, 1000);

  return () => {
    clearInterval(intervalId);
    node.remove();
  };
}
~~~

## Real-World Example

A single-page app opens and closes a modal repeatedly, but memory keeps climbing because each modal registers listeners and timers without cleanup. Heap snapshots show the modal nodes are still retained after close.

## Pros

- Reveals actual retention rather than guessing
- Great for detached DOM and closure leaks
- Supports before/after verification

## Cons

- Requires careful reproduction
- Heap snapshots can be noisy if many objects are live for normal reasons

## Limitations

- A large heap is not always a leak
- Snapshots show state, not necessarily the exact moment the leak was introduced

## Performance Impact / Related Metrics

- Memory leaks increase heap size and garbage-collection pressure
- Excess retention can slow down interactions and lead to tab instability
- Allocation spikes can hint at poor lifecycle management

## Interview Questions With Answers

### 1. What is a heap snapshot used for?
It is used to inspect what objects are currently retained in memory and why they are still reachable.

### 2. What is a detached DOM node?
A node removed from the document that is still retained by JavaScript references.

### 3. What does the allocation timeline help with?
It helps you see whether repeated actions are allocating more memory over time.

## Common Mistakes

- Confusing high memory usage with a true leak
- Ignoring retainer paths
- Forgetting to clean up listeners, timers, or subscriptions
