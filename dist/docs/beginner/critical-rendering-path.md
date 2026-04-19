---
title: Critical Rendering Path
category: browser
order: 3
---
# Critical Rendering Path

## 1-Line Intuition

The critical rendering path is the browser’s route from raw files to painted pixels.

## Why Interviewers Care

This topic tests whether you understand render-blocking work, first paint, layout, and why some resources slow down user-visible startup more than others.

## Visual Model

~~~mermaid
flowchart LR
    A[HTML bytes] --> B[DOM]
    C[CSS bytes] --> D[CSSOM]
    B --> E[Render tree]
    D --> E
    E --> F[Layout]
    F --> G[Paint]
    G --> H[Composite]
~~~

## 30-Second Cheat Sheet

- HTML builds the DOM
- CSS builds the CSSOM
- DOM + CSSOM = render tree
- Layout computes geometry
- Paint draws pixels
- Blocking CSS or sync JS slows visible startup

## Deep Dive

The browser cannot draw meaningful UI until it knows structure and style. That is why CSS is often render-blocking. JavaScript can also delay progress if it blocks parsing or monopolizes the main thread.

Architecturally, the goal is to shorten the critical path for above-the-fold content. That often means prioritizing the hero image, shipping only essential CSS first, and deferring or splitting noncritical JavaScript.

This topic becomes more interesting in interviews when you connect it to user-visible metrics like LCP rather than describing the pipeline mechanically.

## Minimal Code Example

~~~html
<link rel="preload" href="/hero.avif" as="image" />
<link rel="stylesheet" href="/critical.css" />
<script defer src="/app.js"></script>
~~~

## Real-World Example

A landing page ships one giant CSS bundle, a heavy analytics script in the head, and an unprioritized hero image. Even with a fast backend, the page appears late because the critical path is crowded with unnecessary work.

## Pros

- Gives a strong mental model for load performance
- Helps prioritize what really blocks rendering
- Connects low-level browser work to UX outcomes

## Cons

- Easy to describe abstractly without fixing real issues
- Optimizations can conflict with maintainability
- Requires measuring the actual bottleneck, not guessing

## Limitations

- Not all startup issues come from the critical rendering path alone
- Backend latency and third-party scripts can dominate too
- Modern frameworks add hydration cost beyond first paint

## Performance Impact / Related Metrics

- Strongly related to `LCP`
- Impacts first paint and largest-content timing
- Excessive JS on the path can also hurt `INP` if startup remains busy

## Interview Questions With Answers

### 1. Why is CSS render-blocking?

Because the browser needs style information to build the render tree correctly before it can paint the page.

### 2. Why can `defer` help scripts?

Deferred scripts do not block HTML parsing the same way synchronous scripts do, so the DOM can continue building earlier.

### 3. What is a common mistake when optimizing the critical path?

Treating every asset as high priority instead of focusing only on what affects the initial visible experience.

## Common Mistakes

- Overloading the head with noncritical resources
- Ignoring JavaScript parse and execution time
- Not prioritizing hero assets
- Describing layout and paint without connecting them to UX
