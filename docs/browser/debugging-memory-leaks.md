---
title: Debugging Memory Leaks
category: browser
order: 17
---
# Debugging Memory Leaks

## 1-Line Intuition
A memory leak happens when objects stay reachable after the UI no longer needs them.

## Why Interviewers Care
This topic tests whether you can diagnose retained objects, not just describe garbage collection abstractly.

## Visual Model

~~~mermaid
flowchart LR
  A["Mount UI"] --> B["Attach listeners / timers / subscriptions"]
  B --> C["Unmount UI"]
  C --> D["Cleanup missing or incomplete"]
  D --> E["Objects still reachable"]
  E --> F["Memory grows over time"]
~~~

## 30-Second Cheat Sheet

- Reproduce with repeated mount/unmount cycles
- Look for retained listeners, timers, and subscriptions
- Inspect detached DOM nodes
- Check closures and module-level caches
- Confirm cleanup releases references

## Deep Dive

Memory leaks in frontend apps usually come from lifecycle mistakes. A component mounts, registers a listener, starts a timer, or subscribes to a data source, and then unmounts without cleaning up. The DOM may disappear, but the JavaScript references remain, so the garbage collector cannot reclaim the memory.

The interview-quality answer should talk about diagnosis as well as prevention. Start with reproduction, observe growth in the heap or allocation timeline, and inspect retainer paths in a heap snapshot. Then identify the owner of the leaked resource and add explicit cleanup. In React or similar frameworks, that usually means returning a cleanup function from an effect or disposing of subscriptions when the component unmounts.

## Minimal Code Example

~~~js
function attachTicker(node) {
  const onResize = () => {
    node.textContent = String(window.innerWidth);
  };

  window.addEventListener('resize', onResize);

  const intervalId = setInterval(() => {
    node.textContent = new Date().toISOString();
  }, 1000);

  return () => {
    window.removeEventListener('resize', onResize);
    clearInterval(intervalId);
  };
}
~~~

## Real-World Example

A modal opens and closes correctly, but memory climbs after every open. The leak is usually a listener, timer, or subscription attached during mount and never removed during unmount.

## Pros

- Directly maps to real production bugs
- Heap snapshots make the problem concrete
- Encourages disciplined lifecycle cleanup

## Cons

- Leaks can be intermittent and hard to reproduce
- A stable heap does not guarantee perfect cleanup

## Limitations

- Some retention is intentional, such as caches and pools
- Garbage collection timing can delay visible reclamation

## Performance Impact / Related Metrics

- Memory leaks increase heap size and GC pressure
- Excess retention can slow input handling and increase tab crashes
- Detached nodes and closure leaks often show up in snapshots and timelines

## Interview Questions With Answers

### 1. What is the most common source of frontend leaks?
Unreleased listeners, timers, subscriptions, and references to DOM or component state.

### 2. How do you prove a leak exists?
Reproduce the growth pattern, take heap snapshots or allocation timelines, and inspect retained objects over time.

### 3. Why are detached DOM nodes dangerous?
Because they should be collectible after removal, but lingering references keep them alive.

## Common Mistakes

- Calling any memory growth a leak
- Forgetting cleanup on unmount or teardown
- Ignoring closure references and module-level caches
