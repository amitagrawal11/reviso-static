---
title: Google Frontend Architect Interview Checklist
category: prep
order: 1
---
# Google Frontend Architect Interview Checklist

Use this as a guided roadmap, not just a bucket list. The links jump directly to the matching Reviso notes in learning order.

## Recommended Learning Path

1. Build core JavaScript and data-structure intuition
2. Understand how the browser works internally
3. Build accessibility fluency for real UI implementation
4. Practice implementation-heavy coding patterns
5. Strengthen core DSA patterns used in interviews
6. Go deep on performance and rendering trade-offs
7. Finish with system design, security, and interview strategy

## Phase 1: Foundations

- [ ] [Arrays & Strings](#/foundations/arrays-strings)
- [ ] [Hash Maps & Sets](#/foundations/hash-maps-sets)
- [ ] [Stacks & Queues](#/foundations/stacks-queues)
- [ ] [Closures & Lexical Scope](#/foundations/closures-lexical-scope)
- [ ] [Prototypal Inheritance](#/foundations/prototypal-inheritance)
- [ ] [Event Loop & Call Stack](#/foundations/event-loop-call-stack)
- [ ] [Promises, Async/Await, Microtasks](#/foundations/promises-async-await-microtasks)

Why this phase matters:

- This is the baseline for every later discussion. If you are shaky here, browser, performance, and architecture answers usually become vague.

## Phase 2: JS Internals

- [ ] [Memory Management & Garbage Collection](#/internals/memory-management-garbage-collection)
- [ ] [Design Patterns (Observer, Singleton, Factory)](#/internals/design-patterns-observer-singleton-factory)
- [ ] [State Management Patterns (Flux, Zustand, Jotai)](#/internals/state-management-patterns-flux-zustand-jotai)
- [ ] [React Fiber Architecture](#/internals/react-fiber-architecture)
- [ ] [Concurrent Mode](#/internals/concurrent-mode)
- [ ] [Time Slicing](#/internals/time-slicing)
- [ ] [IndexedDB & Storage APIs](#/internals/indexeddb-storage-apis)

Why this phase matters:

- This is where “I can build UI” becomes “I understand how modern frontend systems behave under the hood.”

## Phase 3: Browser Platform

- [ ] [DOM Traversal & Manipulation](#/browser/dom-traversal-manipulation)
- [ ] [DOM Events, Capture, Bubble & Delegation](#/browser/dom-events-delegation)
- [ ] [Critical Rendering Path](#/browser/critical-rendering-path)
- [ ] [Browser Rendering Pipeline](#/browser/browser-rendering-pipeline)
- [ ] [Browser Networking & Request Lifecycle](#/browser/browser-networking-request-lifecycle)
- [ ] [Browser Caching Strategies](#/browser/browser-caching-strategies)
- [ ] [Intersection Observer](#/browser/intersection-observer)
- [ ] [MutationObserver](#/browser/mutationobserver)
- [ ] [WebSockets & SSE](#/browser/websockets-sse)
- [ ] [Service Workers & PWA](#/browser/service-workers-pwa)
- [ ] [Web Workers](#/browser/web-workers)
- [ ] [Chrome DevTools: Network Panel](#/browser/chrome-devtools-network-panel)
- [ ] [Chrome DevTools: Performance Panel](#/browser/chrome-devtools-performance-panel)
- [ ] [Chrome DevTools: Memory Panel](#/browser/chrome-devtools-memory-panel)
- [ ] [Chrome DevTools: Application Panel & Storage Debugging](#/browser/chrome-devtools-application-panel-storage-debugging)
- [ ] [Debugging Frontend Performance](#/browser/debugging-frontend-performance)
- [ ] [Debugging Memory Leaks](#/browser/debugging-memory-leaks)

Why this phase matters:

- This is the browser-engineer track: request lifecycle, rendering, storage, memory, and DevTools fluency. Google-style frontend rounds reward this depth heavily.

## Phase 4: Accessibility

- [ ] [Semantic HTML & Landmarks](#/accessibility/semantic-html-landmarks)
- [ ] [Keyboard Navigation & Focus Management](#/accessibility/keyboard-navigation-focus-management)
- [ ] [ARIA Roles, States & Properties](#/accessibility/aria-roles-states-properties)
- [ ] [Forms, Labels & Validation Accessibility](#/accessibility/forms-labels-validation-accessibility)
- [ ] [Screen Readers & Announcements](#/accessibility/screen-readers-announcements)
- [ ] [Color Contrast & Visual Accessibility](#/accessibility/color-contrast-visual-accessibility)
- [ ] [Accessible Modals, Menus & Composite Widgets](#/accessibility/accessible-modals-menus-composite-widgets)
- [ ] [Tables, Lists & Reading Order](#/accessibility/tables-lists-reading-order)
- [ ] [Accessibility Testing & Auditing](#/accessibility/accessibility-testing-auditing)
- [ ] [WCAG Basics For Frontend Engineers](#/accessibility/wcag-basics-frontend-engineers)

Why this phase matters:

- Accessibility is a core frontend engineering skill, not a side checklist. It regularly appears in implementation, architecture, and quality discussions.

## Phase 5: Coding Patterns

- [ ] [Promise.all](#/coding/promise-all)
- [ ] [Promise.any](#/coding/promise-any)
- [ ] [Promise.race](#/coding/promise-race)
- [ ] [Promise.allSettled](#/coding/promise-all-settled)
- [ ] [MyPromise (Prototype-Based)](#/coding/my-promise-prototype)
- [ ] [MyPromise (Class-Based)](#/coding/my-promise-class)
- [ ] [Array.prototype.map](#/coding/array-map)
- [ ] [Array.prototype.filter](#/coding/array-filter)
- [ ] [Array.prototype.reduce](#/coding/array-reduce)
- [ ] [Deep Clone](#/coding/deep-clone)
- [ ] [JSON.stringify](#/coding/json-stringify)
- [ ] [Event Emitter / Observer Pattern](#/coding/event-emitter-observer)
- [ ] [getElementsByClassName](#/coding/get-elements-by-class-name)
- [ ] [getElementsByTagName](#/coding/get-elements-by-tag-name)
- [ ] [Debounce & Throttle](#/coding/debounce-throttle)

Why this phase matters:

- Many companies, including Google-adjacent frontend interview loops, will expect you to implement utilities, polyfills, or reduced-scope browser APIs cleanly in JavaScript.

## Phase 6: DSA

- [ ] [Linked Lists](#/dsa/linked-lists)
- [ ] [Trees & Binary Trees](#/dsa/trees-binary-trees)
- [ ] [BFS & DFS](#/dsa/bfs-dfs)
- [ ] [Binary Search](#/dsa/binary-search)
- [ ] [Two Pointers & Sliding Window](#/dsa/two-pointers-sliding-window)
- [ ] [Graphs](#/dsa/graphs)
- [ ] [Heaps & Priority Queues](#/dsa/heaps-priority-queues)
- [ ] [Tries](#/dsa/tries)
- [ ] [Union-Find](#/dsa/union-find)
- [ ] [Recursion, Backtracking & DP Basics](#/dsa/recursion-backtracking-dp)

Why this phase matters:

- You do not need to become a competitive programmer, but you do need enough fluency to solve standard problems in idiomatic JavaScript and explain trade-offs clearly.

## Phase 7: Performance

- [ ] [Web Vitals (LCP, CLS, INP)](#/performance/web-vitals-lcp-cls-inp)
- [ ] [Code Splitting & Lazy Loading](#/performance/code-splitting-lazy-loading)
- [ ] [Image Optimization (WebP, AVIF, lazy load)](#/performance/image-optimization-webp-avif-lazy-load)
- [ ] [Tree Shaking](#/performance/tree-shaking)
- [ ] [Bundle Analysis & Optimization](#/performance/bundle-analysis-optimization)
- [ ] [CSS Containment](#/performance/css-containment)
- [ ] [Container Queries](#/performance/container-queries)
- [ ] [Virtual List / Windowing](#/performance/virtual-list-windowing)
- [ ] [Hydration (Progressive / Partial / Selective)](#/performance/hydration-progressive-partial-selective)
- [ ] [Streaming SSR](#/performance/streaming-ssr)
- [ ] [Incremental Static Regeneration (ISR)](#/performance/incremental-static-regeneration-isr)

Why this phase matters:

- This is where you learn to talk about user-perceived speed, not just code organization. Google frontend interviews often care about metrics and debugging, not just optimizations by name.

## Phase 8: System Design

- [ ] [Atomic Design](#/system/atomic-design)
- [ ] [Diffing Algorithm](#/system/diffing-algorithm)
- [ ] [Island Architecture](#/system/island-architecture)
- [ ] [Micro Frontend Architecture](#/system/micro-frontend-architecture)
- [ ] [Module Federation](#/system/module-federation)
- [ ] [CSS Layers (@layer)](#/system/css-layers-layer)
- [ ] [Subgrid](#/system/subgrid)
- [ ] [CSS Houdini](#/system/css-houdini)

Why this phase matters:

- These topics help you answer “what architecture would you choose and why?” with better reasoning around scale, team boundaries, and long-term maintainability.

## Phase 9: Security

- [ ] [XSS, CSRF, CORS & CSP Basics](#/security/xss-csrf-cors-csp)

Why this phase matters:

- Security topics are usually short but high-signal. Clear definitions and practical mitigations matter more than buzzwords.

## If Time Is Limited

Do these first:

1. [Event Loop & Call Stack](#/foundations/event-loop-call-stack)
2. [Promises, Async/Await, Microtasks](#/foundations/promises-async-await-microtasks)
3. [Critical Rendering Path](#/browser/critical-rendering-path)
4. [Browser Networking & Request Lifecycle](#/browser/browser-networking-request-lifecycle)
5. [Chrome DevTools: Performance Panel](#/browser/chrome-devtools-performance-panel)
6. [Debugging Frontend Performance](#/browser/debugging-frontend-performance)
7. [Semantic HTML & Landmarks](#/accessibility/semantic-html-landmarks)
8. [Keyboard Navigation & Focus Management](#/accessibility/keyboard-navigation-focus-management)
9. [Promise.all](#/coding/promise-all)
10. [MyPromise (Class-Based)](#/coding/my-promise-class)
11. [Debounce & Throttle](#/coding/debounce-throttle)
12. [Binary Search](#/dsa/binary-search)
13. [BFS & DFS](#/dsa/bfs-dfs)
14. [Web Vitals (LCP, CLS, INP)](#/performance/web-vitals-lcp-cls-inp)
15. [Hydration (Progressive / Partial / Selective)](#/performance/hydration-progressive-partial-selective)
16. [React Fiber Architecture](#/internals/react-fiber-architecture)
17. [Memory Management & Garbage Collection](#/internals/memory-management-garbage-collection)
18. [Module Federation](#/system/module-federation)

## Final 24-Hour Prep

1. Re-implement `debounce`, `throttle`, `Promise.all`, `Promise.race`, and one scoped `MyPromise`.
2. Solve 2 sequence problems, 2 tree/graph problems, and 1 binary-search problem in JavaScript.
3. Review event loop, rendering pipeline, request lifecycle, and DevTools workflows.
4. Revisit the “If Time Is Limited” list.
5. Practice one frontend system design and one debugging-heavy performance discussion.
6. Prepare 3 behavioral stories around performance wins, architecture decisions, and trade-off communication.

## Notes

- Do not prepare only by grinding DSA. Browser internals, debugging depth, and performance reasoning matter a lot for strong frontend interviews.
- Prefer being able to explain trade-offs clearly over memorizing labels.
- If a topic feels vague, make yourself explain it using a real browser trace, code example, or production-style scenario.
