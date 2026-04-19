---
title: Debugging Frontend Performance
category: browser
order: 16
---
# Debugging Frontend Performance

## 1-Line Intuition
Performance debugging is a repeatable loop: measure, isolate, optimize, and verify.

## Why Interviewers Care
Google-frontend-architect interviews often test whether you can turn a vague complaint into a disciplined investigation.

## Visual Model

~~~mermaid
flowchart LR
  A["User complaint"] --> B["Reproduce"]
  B --> C["Measure"]
  C --> D["Form hypothesis"]
  D --> E["Optimize one bottleneck"]
  E --> F["Verify improvement"]
  F --> B
~~~

## 30-Second Cheat Sheet

- Start with a clear symptom
- Reproduce under consistent conditions
- Capture a trace or profile
- Change one thing at a time
- Verify with the same workload

## Deep Dive

The best performance engineers do not guess. They start with a user-visible symptom, reproduce it reliably, and collect evidence. Then they build a hypothesis: is the bottleneck network, JavaScript, rendering, data fetching, or something else? After that they make one focused change, verify the result, and avoid victory until the trace and the user experience both improve.

This workflow matters because performance problems often have multiple causes. A slow page might have a slow API, a heavy bundle, and an expensive list render all at once. If you change three things simultaneously, you cannot tell which fix mattered. The interview-quality answer is structured, measurable, and skeptical.

## Minimal Code Example

~~~js
performance.mark('search-start');
const results = filterAndSort(items, query);
renderResults(results);
performance.mark('search-end');
performance.measure('search', 'search-start', 'search-end');

const entry = performance.getEntriesByName('search').at(-1);
console.log('Search render took', entry.duration, 'ms');
~~~

## Real-World Example

An autocomplete feels slow. A good workflow measures keystroke latency, identifies that rendering the full suggestion list is the main issue, applies list virtualization, and then re-runs the same input sequence to confirm the improvement.

## Pros

- Prevents random optimization
- Produces defensible interview answers
- Works on almost any frontend performance issue

## Cons

- Takes discipline to avoid changing too much at once
- Can be slowed down by poor reproduction setup

## Limitations

- Traces can hide intermittent or environment-specific issues
- Some bottlenecks only appear at production scale

## Performance Impact / Related Metrics

- Useful across LCP, INP, long tasks, and frame rate
- Helps distinguish main-thread bottlenecks from network bottlenecks
- Improves the quality of before/after comparisons

## Interview Questions With Answers

### 1. What is your first step when someone says a page feels slow?
Reproduce the issue in a consistent way and measure it before changing anything.

### 2. Why is one change at a time important?
Because otherwise you cannot attribute the improvement to a specific fix.

### 3. What makes a performance investigation credible?
Evidence from traces, metrics, and a verified before/after result.

## Common Mistakes

- Optimizing without a hypothesis
- Measuring a different scenario after each change
- Focusing on averages instead of the user-visible path
