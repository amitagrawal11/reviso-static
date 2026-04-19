---
title: Closures & Lexical Scope
category: foundations
order: 4
---
# Closures & Lexical Scope

## 1-Line Intuition

A closure is a function that remembers variables from where it was created.

## Why Interviewers Care

This topic tests whether you understand how JavaScript scope actually works and whether you can reason about callbacks, factories, private state, and memory retention.

## Visual Model

~~~mermaid
flowchart LR
    A[Outer function scope] --> B[Variable: count]
    B --> C[Inner function created]
    C --> D[Inner function returned]
    D --> E[Later call still reads count]
~~~

## 30-Second Cheat Sheet

- Scope is decided by where code is written
- Inner functions can access outer variables
- Closures keep referenced outer variables alive
- Useful for private state and factories
- Can accidentally retain memory if overused

## Deep Dive

Lexical scope means variable lookup depends on code structure, not call-site structure. When you create a function, it keeps access to the surrounding scope chain it was defined inside. That is closure behavior.

This is why event handlers, timers, and async callbacks can still access variables from outer functions long after those functions return. It is also why closures are useful for encapsulation. Instead of exposing raw state globally, you can keep it inside a function and return only controlled accessors.

Architecturally, closures are powerful because they reduce global mutable state. But they also create lifetime implications: if a closure captures something large, that data may stay in memory longer than expected.

## Minimal Code Example

~~~js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
~~~

## Real-World Example

A React event handler or a debounce wrapper captures values from a component scope. If you misunderstand which version of a variable was captured, you can end up with stale values or memory retention bugs.

## Pros

- Great for encapsulation
- Enables factory functions and memoization
- Reduces need for global state

## Cons

- Can be confusing in async flows
- Easy to retain more memory than needed
- Debugging captured values can be tricky

## Limitations

- Closures do not magically solve state management complexity
- Overusing them can obscure data flow
- They do not replace clear module boundaries

## Performance Impact / Related Metrics

- Usually not a direct metric issue on their own
- Can contribute to memory leaks or stale data bugs
- Large retained closures can increase memory pressure
- Memory pressure can indirectly hurt responsiveness

## Interview Questions With Answers

### 1. What is the difference between lexical scope and closure?

Lexical scope is the rule that variable access depends on where code is written. A closure is the runtime effect where a function retains access to variables from that lexical scope.

### 2. Why do closures help with private state?

Because the outer variable is not directly accessible from the outside world. Only the returned inner functions can read or modify it.

### 3. How can closures hurt performance?

They can accidentally keep large objects or DOM references alive longer than needed, which increases memory usage and can contribute to leaks.

## Common Mistakes

- Confusing simple nested functions with closure behavior
- Forgetting loop capture issues with `var`
- Retaining large objects unintentionally
- Treating closures as automatically bad for performance
