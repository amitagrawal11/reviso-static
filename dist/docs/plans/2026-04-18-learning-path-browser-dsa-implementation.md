# Reviso Learning Path Browser DSA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize Reviso into a fundamentals-to-advanced learning path, expand the browser track to include browser internals and DevTools workflows, and rewrite the DSA notes into complete interview-prep material.

**Architecture:** Keep the no-build Node + static HTML app as-is, but replace the sidebar/category model with a new canonical curriculum map. Use routing aliases in `server.js` to map visible categories to existing markdown locations where possible, then add the new browser notes and rewrite DSA notes directly in `docs/`. Update the interview checklist so in-app links match the new paths.

**Tech Stack:** Node.js HTTP server, plain HTML/CSS/JS, Markdown notes, Mermaid, Marked, Highlight.js

---

### Task 1: Update Curriculum Model In The Client

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/index.html`

- [ ] **Step 1: Replace the topic map with the new learning-path categories**

Replace the `TOPICS` and `CATEGORY_LABELS` definitions in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js` so the sidebar order becomes:

```js
const TOPICS = {
  prep: [
    {
      title: "Google Frontend Architect Interview Checklist",
      slug: "google-frontend-architect-interview-checklist",
    },
  ],
  foundations: [
    { title: "Arrays & Strings", slug: "arrays-strings" },
    { title: "Hash Maps & Sets", slug: "hash-maps-sets" },
    { title: "Stacks & Queues", slug: "stacks-queues" },
    { title: "Closures & Lexical Scope", slug: "closures-lexical-scope" },
    { title: "Prototypal Inheritance", slug: "prototypal-inheritance" },
    { title: "Event Loop & Call Stack", slug: "event-loop-call-stack" },
    { title: "Promises, Async/Await, Microtasks", slug: "promises-async-await-microtasks" },
  ],
  internals: [
    { title: "Memory Management & Garbage Collection", slug: "memory-management-garbage-collection" },
    { title: "Design Patterns (Observer, Singleton, Factory)", slug: "design-patterns-observer-singleton-factory" },
    { title: "State Management Patterns (Flux, Zustand, Jotai)", slug: "state-management-patterns-flux-zustand-jotai" },
    { title: "React Fiber Architecture", slug: "react-fiber-architecture" },
    { title: "Concurrent Mode", slug: "concurrent-mode" },
    { title: "Time Slicing", slug: "time-slicing" },
    { title: "IndexedDB & Storage APIs", slug: "indexeddb-storage-apis" },
  ],
  browser: [
    { title: "DOM Traversal & Manipulation", slug: "dom-traversal-manipulation" },
    { title: "DOM Events, Capture, Bubble & Delegation", slug: "dom-events-delegation" },
    { title: "Critical Rendering Path", slug: "critical-rendering-path" },
    { title: "Browser Rendering Pipeline", slug: "browser-rendering-pipeline" },
    { title: "Browser Networking & Request Lifecycle", slug: "browser-networking-request-lifecycle" },
    { title: "Browser Caching Strategies", slug: "browser-caching-strategies" },
    { title: "Intersection Observer", slug: "intersection-observer" },
    { title: "MutationObserver", slug: "mutationobserver" },
    { title: "WebSockets & SSE", slug: "websockets-sse" },
    { title: "Service Workers & PWA", slug: "service-workers-pwa" },
    { title: "Web Workers", slug: "web-workers" },
    { title: "Chrome DevTools: Network Panel", slug: "chrome-devtools-network-panel" },
    { title: "Chrome DevTools: Performance Panel", slug: "chrome-devtools-performance-panel" },
    { title: "Chrome DevTools: Memory Panel", slug: "chrome-devtools-memory-panel" },
    { title: "Chrome DevTools: Application Panel & Storage Debugging", slug: "chrome-devtools-application-panel-storage-debugging" },
    { title: "Debugging Frontend Performance", slug: "debugging-frontend-performance" },
    { title: "Debugging Memory Leaks", slug: "debugging-memory-leaks" },
  ],
  coding: [
    { title: "Array.prototype.map", slug: "array-map" },
    { title: "Array.prototype.filter", slug: "array-filter" },
    { title: "Array.prototype.reduce", slug: "array-reduce" },
    { title: "Promise.all", slug: "promise-all" },
    { title: "Promise.any", slug: "promise-any" },
    { title: "Deep Clone", slug: "deep-clone" },
    { title: "JSON.stringify", slug: "json-stringify" },
    { title: "Event Emitter / Observer Pattern", slug: "event-emitter-observer" },
    { title: "getElementsByClassName", slug: "get-elements-by-class-name" },
    { title: "getElementsByTagName", slug: "get-elements-by-tag-name" },
    { title: "Debounce & Throttle", slug: "debounce-throttle" },
  ],
  dsa: [
    { title: "Linked Lists", slug: "linked-lists" },
    { title: "Trees & Binary Trees", slug: "trees-binary-trees" },
    { title: "BFS & DFS", slug: "bfs-dfs" },
    { title: "Binary Search", slug: "binary-search" },
    { title: "Two Pointers & Sliding Window", slug: "two-pointers-sliding-window" },
    { title: "Graphs", slug: "graphs" },
    { title: "Heaps & Priority Queues", slug: "heaps-priority-queues" },
    { title: "Tries", slug: "tries" },
    { title: "Union-Find", slug: "union-find" },
    { title: "Recursion, Backtracking & DP Basics", slug: "recursion-backtracking-dp" },
  ],
  performance: [
    { title: "Web Vitals (LCP, CLS, INP)", slug: "web-vitals-lcp-cls-inp" },
    { title: "Code Splitting & Lazy Loading", slug: "code-splitting-lazy-loading" },
    { title: "Image Optimization (WebP, AVIF, lazy load)", slug: "image-optimization-webp-avif-lazy-load" },
    { title: "Tree Shaking", slug: "tree-shaking" },
    { title: "Bundle Analysis & Optimization", slug: "bundle-analysis-optimization" },
    { title: "CSS Containment", slug: "css-containment" },
    { title: "Container Queries", slug: "container-queries" },
    { title: "Virtual List / Windowing", slug: "virtual-list-windowing" },
    { title: "Hydration (Progressive / Partial / Selective)", slug: "hydration-progressive-partial-selective" },
    { title: "Streaming SSR", slug: "streaming-ssr" },
    { title: "Incremental Static Regeneration (ISR)", slug: "incremental-static-regeneration-isr" },
  ],
  system: [
    { title: "Atomic Design", slug: "atomic-design" },
    { title: "Diffing Algorithm", slug: "diffing-algorithm" },
    { title: "Island Architecture", slug: "island-architecture" },
    { title: "Micro Frontend Architecture", slug: "micro-frontend-architecture" },
    { title: "Module Federation", slug: "module-federation" },
    { title: "CSS Layers (@layer)", slug: "css-layers-layer" },
    { title: "Subgrid", slug: "subgrid" },
    { title: "CSS Houdini", slug: "css-houdini" },
  ],
  security: [
    { title: "XSS, CSRF, CORS & CSP Basics", slug: "xss-csrf-cors-csp" },
  ],
};

const CATEGORY_LABELS = {
  prep: "Interview Prep",
  foundations: "Foundations",
  internals: "JS Internals",
  browser: "Browser Platform",
  coding: "Coding Patterns",
  dsa: "DSA",
  performance: "Performance",
  system: "System Design",
  security: "Security",
};
```

- [ ] **Step 2: Keep the default landing topic stable**

Ensure the initial state remains:

```js
const state = {
  activeCategory: "prep",
  activeSlug: TOPICS.prep[0].slug,
  checked: {},
};
```

Expected result: the checklist still opens first, even after the curriculum reshuffle.

- [ ] **Step 3: Run syntax check**

Run: `node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`
Expected: no output

- [ ] **Step 4: Commit**

```bash
cd /Users/amitagrawal/Desktop/Projects/RevisoStatic && git add app.js && git commit -m "feat: reorganize reviso learning path categories"
```

### Task 2: Add Server Routing Aliases For The New Category Model

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`

- [ ] **Step 1: Expand the allowed visible categories**

Update the category regex in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`:

```js
const CATEGORY_PATTERN = /^(prep|foundations|internals|browser|coding|dsa|performance|system|security)$/;
```

- [ ] **Step 2: Replace the current internals-only mapping with a general route map**

Add a single canonical map in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`:

```js
const TOPIC_ROUTE_MAP = new Map([
  ["prep:google-frontend-architect-interview-checklist", ["prep", "google-frontend-architect-interview-checklist"]],

  ["foundations:arrays-strings", ["dsa", "arrays-strings"]],
  ["foundations:hash-maps-sets", ["dsa", "hash-maps-sets"]],
  ["foundations:stacks-queues", ["dsa", "stacks-queues"]],
  ["foundations:closures-lexical-scope", ["beginner", "closures-lexical-scope"]],
  ["foundations:prototypal-inheritance", ["beginner", "prototypal-inheritance"]],
  ["foundations:event-loop-call-stack", ["beginner", "event-loop-call-stack"]],
  ["foundations:promises-async-await-microtasks", ["beginner", "promises-async-await-microtasks"]],

  ["internals:memory-management-garbage-collection", ["advanced", "memory-management-garbage-collection"]],
  ["internals:design-patterns-observer-singleton-factory", ["intermediate", "design-patterns-observer-singleton-factory"]],
  ["internals:state-management-patterns-flux-zustand-jotai", ["intermediate", "state-management-patterns-flux-zustand-jotai"]],
  ["internals:react-fiber-architecture", ["intermediate", "react-fiber-architecture"]],
  ["internals:concurrent-mode", ["intermediate", "concurrent-mode"]],
  ["internals:time-slicing", ["advanced", "time-slicing"]],
  ["internals:indexeddb-storage-apis", ["intermediate", "indexeddb-storage-apis"]],

  ["browser:dom-traversal-manipulation", ["browser", "dom-traversal-manipulation"]],
  ["browser:dom-events-delegation", ["browser", "dom-events-delegation"]],
  ["browser:critical-rendering-path", ["beginner", "critical-rendering-path"]],
  ["browser:browser-rendering-pipeline", ["browser", "browser-rendering-pipeline"]],
  ["browser:browser-networking-request-lifecycle", ["browser", "browser-networking-request-lifecycle"]],
  ["browser:browser-caching-strategies", ["intermediate", "browser-caching-strategies"]],
  ["browser:intersection-observer", ["beginner", "intersection-observer"]],
  ["browser:mutationobserver", ["intermediate", "mutationobserver"]],
  ["browser:websockets-sse", ["beginner", "websockets-sse"]],
  ["browser:service-workers-pwa", ["beginner", "service-workers-pwa"]],
  ["browser:web-workers", ["advanced", "web-workers"]],
  ["browser:chrome-devtools-network-panel", ["browser", "chrome-devtools-network-panel"]],
  ["browser:chrome-devtools-performance-panel", ["browser", "chrome-devtools-performance-panel"]],
  ["browser:chrome-devtools-memory-panel", ["browser", "chrome-devtools-memory-panel"]],
  ["browser:chrome-devtools-application-panel-storage-debugging", ["browser", "chrome-devtools-application-panel-storage-debugging"]],
  ["browser:debugging-frontend-performance", ["browser", "debugging-frontend-performance"]],
  ["browser:debugging-memory-leaks", ["browser", "debugging-memory-leaks"]],

  ["coding:array-map", ["coding", "array-map"]],
  ["coding:array-filter", ["coding", "array-filter"]],
  ["coding:array-reduce", ["coding", "array-reduce"]],
  ["coding:promise-all", ["coding", "promise-all"]],
  ["coding:promise-any", ["coding", "promise-any"]],
  ["coding:deep-clone", ["coding", "deep-clone"]],
  ["coding:json-stringify", ["coding", "json-stringify"]],
  ["coding:event-emitter-observer", ["coding", "event-emitter-observer"]],
  ["coding:get-elements-by-class-name", ["coding", "get-elements-by-class-name"]],
  ["coding:get-elements-by-tag-name", ["coding", "get-elements-by-tag-name"]],
  ["coding:debounce-throttle", ["intermediate", "debounce-throttle"]],

  ["dsa:linked-lists", ["dsa", "linked-lists"]],
  ["dsa:trees-binary-trees", ["dsa", "trees-binary-trees"]],
  ["dsa:bfs-dfs", ["dsa", "bfs-dfs"]],
  ["dsa:binary-search", ["dsa", "binary-search"]],
  ["dsa:two-pointers-sliding-window", ["dsa", "two-pointers-sliding-window"]],
  ["dsa:graphs", ["dsa", "graphs"]],
  ["dsa:heaps-priority-queues", ["dsa", "heaps-priority-queues"]],
  ["dsa:tries", ["dsa", "tries"]],
  ["dsa:union-find", ["dsa", "union-find"]],
  ["dsa:recursion-backtracking-dp", ["dsa", "recursion-backtracking-dp"]],

  ["performance:web-vitals-lcp-cls-inp", ["beginner", "web-vitals-lcp-cls-inp"]],
  ["performance:code-splitting-lazy-loading", ["beginner", "code-splitting-lazy-loading"]],
  ["performance:image-optimization-webp-avif-lazy-load", ["beginner", "image-optimization-webp-avif-lazy-load"]],
  ["performance:tree-shaking", ["intermediate", "tree-shaking"]],
  ["performance:bundle-analysis-optimization", ["intermediate", "bundle-analysis-optimization"]],
  ["performance:css-containment", ["intermediate", "css-containment"]],
  ["performance:container-queries", ["intermediate", "container-queries"]],
  ["performance:virtual-list-windowing", ["intermediate", "virtual-list-windowing"]],
  ["performance:hydration-progressive-partial-selective", ["intermediate", "hydration-progressive-partial-selective"]],
  ["performance:streaming-ssr", ["advanced", "streaming-ssr"]],
  ["performance:incremental-static-regeneration-isr", ["advanced", "incremental-static-regeneration-isr"]],

  ["system:atomic-design", ["intermediate", "atomic-design"]],
  ["system:diffing-algorithm", ["beginner", "diffing-algorithm"]],
  ["system:island-architecture", ["advanced", "island-architecture"]],
  ["system:micro-frontend-architecture", ["advanced", "micro-frontend-architecture"]],
  ["system:module-federation", ["advanced", "module-federation"]],
  ["system:css-layers-layer", ["advanced", "css-layers-layer"]],
  ["system:subgrid", ["advanced", "subgrid"]],
  ["system:css-houdini", ["advanced", "css-houdini"]],

  ["security:xss-csrf-cors-csp", ["browser", "xss-csrf-cors-csp"]],
]);
```

- [ ] **Step 3: Change topic resolution to use the route map**

Replace the old `resolvedCategory` block in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js` with:

```js
  const route = TOPIC_ROUTE_MAP.get(`${category}:${slug}`);

  if (!route) {
    send(
      res,
      404,
      "application/json; charset=utf-8",
      JSON.stringify({ error: "Topic note not found" }),
    );
    return;
  }

  const [resolvedCategory, resolvedSlug] = route;
  const filePath = path.join(DOCS_DIR, resolvedCategory, `${resolvedSlug}.md`);
```

- [ ] **Step 4: Run syntax check**

Run: `node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`
Expected: no output

- [ ] **Step 5: Commit**

```bash
cd /Users/amitagrawal/Desktop/Projects/RevisoStatic && git add server.js && git commit -m "feat: route reviso topics through new learning paths"
```

### Task 3: Add The New Browser-Platform Notes

**Files:**
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/browser-rendering-pipeline.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/browser-networking-request-lifecycle.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/chrome-devtools-network-panel.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/chrome-devtools-performance-panel.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/chrome-devtools-memory-panel.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/chrome-devtools-application-panel-storage-debugging.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/debugging-frontend-performance.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/debugging-memory-leaks.md`

- [ ] **Step 1: Create the browser-rendering-pipeline note**

Write `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/browser-rendering-pipeline.md` with sections:

```md
# Browser Rendering Pipeline

## 1-Line Intuition
The browser turns HTML, CSS, and JavaScript into pixels through a staged pipeline.

## Why Interviewers Care
This is the foundation for explaining reflow, repaint, jank, and rendering performance trade-offs.

## Visual Model
~~~mermaid
flowchart LR
  A["HTML + CSS"] --> B["DOM + CSSOM"]
  B --> C["Render Tree"]
  C --> D["Layout"]
  D --> E["Paint"]
  E --> F["Composite"]
~~~

## 30-Second Cheat Sheet
- Parse first
- Layout calculates geometry
- Paint creates visual layers
- Composite assembles layers efficiently

## Deep Dive
Explain DOM construction, CSSOM, render tree, layout, paint, compositing, and what kinds of changes trigger each phase.

## Minimal Code Example
~~~js
const box = document.querySelector('.box');
box.style.width = '400px'; // Likely triggers layout because geometry changed
box.style.backgroundColor = 'tomato'; // Usually paint only
box.style.transform = 'translateX(20px)'; // Often composite-friendly
~~~

## Real-World Example
Connect this to animating transforms instead of top/left and to avoiding layout thrash in large UIs.

## Pros
- Gives a strong mental model for performance debugging

## Cons
- Easy to oversimplify without talking about invalidation and batching

## Limitations
- Exact browser implementation details vary across engines

## Performance Impact / Related Metrics
- Layout and paint cost directly affect responsiveness
- Poor rendering choices can hurt INP and frame rate

## Interview Questions With Answers
### 1. What is the difference between layout and paint?
Layout computes geometry, while paint draws pixels for visual styling.

### 2. Why are transform animations preferred?
Because they often avoid layout and can stay on the compositor path.

### 3. Why should frontend engineers know this deeply?
Because rendering behavior explains many real-world performance issues.

## Common Mistakes
- Confusing repaint with reflow
- Assuming every DOM change costs the same
```

- [ ] **Step 2: Create the remaining browser debugging notes in the same house style**

For each of the seven remaining files, use this structure:

```md
# <Topic Title>

## 1-Line Intuition
## Why Interviewers Care
## Visual Model
## 30-Second Cheat Sheet
## Deep Dive
## Minimal Code Example
## Real-World Example
## Pros
## Cons
## Limitations
## Performance Impact / Related Metrics
## Interview Questions With Answers
## Common Mistakes
```

Required emphasis by file:

- `browser-networking-request-lifecycle.md`
  - request lifecycle, DNS/TCP/TLS, headers, caching, service-worker interception
- `chrome-devtools-network-panel.md`
  - waterfall reading, priority, blocking, caching, request headers, initiators
- `chrome-devtools-performance-panel.md`
  - flame charts, long tasks, frames, CPU, scripting vs rendering vs painting
- `chrome-devtools-memory-panel.md`
  - heap snapshots, detached DOM nodes, allocation timeline
- `chrome-devtools-application-panel-storage-debugging.md`
  - cookies, localStorage, sessionStorage, IndexedDB, service-worker cache, quota
- `debugging-frontend-performance.md`
  - repeatable performance workflow, hypothesis -> trace -> optimize -> verify
- `debugging-memory-leaks.md`
  - event listeners, stale subscriptions, timers, detached nodes, closure leaks

- [ ] **Step 3: Verify the files exist**

Run: `ls /Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser`
Expected: includes all eight new markdown files

- [ ] **Step 4: Commit**

```bash
cd /Users/amitagrawal/Desktop/Projects/RevisoStatic && git add docs/browser && git commit -m "feat: add browser internals and devtools study notes"
```

### Task 4: Rewrite The DSA Notes To Full Prep Quality

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/linked-lists.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/trees-binary-trees.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/bfs-dfs.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/binary-search.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/two-pointers-sliding-window.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/graphs.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/heaps-priority-queues.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/tries.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/union-find.md`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/recursion-backtracking-dp.md`

- [ ] **Step 1: Use one canonical DSA structure for every file**

Each file must contain exactly these top-level sections:

```md
## 1-Line Intuition
## Why Interviewers Care
## When To Use
## Visual Model
## Core Operations / Complexity Table
## 30-Second Cheat Sheet
## Brute Force Approach
## Optimized Approach
## Commented Interview-Ready Code
## Dry Run
## Common Problem Types
## Real-World Frontend Analogy
## Pros
## Cons
## Limitations
## Performance Impact / Trade-Offs
## Interview Questions With Strong Answers
## Common Mistakes
```

- [ ] **Step 2: Add a concrete complexity table to each note**

Example to embed in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/binary-search.md`:

```md
## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Exact lookup in sorted array | O(log n) | O(1) | Iterative version |
| Lower bound / upper bound | O(log n) | O(1) | Boundary-sensitive |
| Answer-space search | O(log n) * check cost | depends | Requires monotonic condition |
```
```

- [ ] **Step 3: Upgrade the code blocks from fragments to full interview-ready solutions**

Example shape for `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/binary-search.md`:

```md
## Commented Interview-Ready Code

~~~js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Split the remaining search range

    if (nums[mid] === target) {
      return mid; // Found the target exactly
    }

    if (nums[mid] < target) {
      left = mid + 1; // Discard the left half including mid
    } else {
      right = mid - 1; // Discard the right half including mid
    }
  }

  return -1; // Target was not present
}
~~~
```

Apply the same “complete solution + important inline comments” standard to every DSA file.

- [ ] **Step 4: Add a dry run and common-problem list to each note**

Example sections to include in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/two-pointers-sliding-window.md`:

```md
## Dry Run

Walk through a concrete example such as longest substring without repeating characters or smallest subarray with sum at least target.

## Common Problem Types

- longest substring without repeating characters
- two sum in sorted array
- minimum window substring
- remove duplicates in sorted array
```

- [ ] **Step 5: Verify all DSA files contain the new structure**

Run:

```bash
for f in /Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/*.md; do
  echo "FILE: $(basename "$f")"
  rg -n "## When To Use|## Core Operations / Complexity Table|## Commented Interview-Ready Code|## Dry Run" "$f"
done
```

Expected: every file prints matches for all required sections

- [ ] **Step 6: Commit**

```bash
cd /Users/amitagrawal/Desktop/Projects/RevisoStatic && git add docs/dsa && git commit -m "feat: rewrite dsa notes for real interview preparation"
```

### Task 5: Update The Checklist Links To Match The New Learning Paths

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/prep/google-frontend-architect-interview-checklist.md`

- [ ] **Step 1: Replace old category links with the new canonical routes**

Update checklist links so they point to:

```md
#/foundations/arrays-strings
#/internals/react-fiber-architecture
#/browser/chrome-devtools-performance-panel
#/coding/promise-all
#/dsa/binary-search
#/performance/web-vitals-lcp-cls-inp
#/system/module-federation
#/security/xss-csrf-cors-csp
```

The checklist should read like a sequenced roadmap aligned to the new sidebar.

- [ ] **Step 2: Add the new browser-debugging topics into the checklist**

Ensure the checklist explicitly includes:

```md
- [ ] Browser Networking & Request Lifecycle
- [ ] Chrome DevTools: Network Panel
- [ ] Chrome DevTools: Performance Panel
- [ ] Chrome DevTools: Memory Panel
- [ ] Chrome DevTools: Application Panel & Storage Debugging
- [ ] Debugging Frontend Performance
- [ ] Debugging Memory Leaks
```

- [ ] **Step 3: Commit**

```bash
cd /Users/amitagrawal/Desktop/Projects/RevisoStatic && git add docs/prep/google-frontend-architect-interview-checklist.md && git commit -m "feat: align checklist with new study path"
```

### Task 6: End-To-End Verification

**Files:**
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/browser/*.md`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/dsa/*.md`

- [ ] **Step 1: Run syntax checks**

Run:

```bash
node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js
node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js
```

Expected: no output

- [ ] **Step 2: Verify representative topic endpoints**

Run:

```bash
curl -s "http://localhost:4321/api/topic?category=foundations&slug=event-loop-call-stack" | sed -n '1,20p'
curl -s "http://localhost:4321/api/topic?category=browser&slug=chrome-devtools-performance-panel" | sed -n '1,20p'
curl -s "http://localhost:4321/api/topic?category=dsa&slug=binary-search" | sed -n '1,20p'
curl -s "http://localhost:4321/api/topic?category=system&slug=module-federation" | sed -n '1,20p'
```

Expected: markdown content for all four topics

- [ ] **Step 3: Verify the app shell serves the new categories**

Run:

```bash
curl -s http://localhost:4321/ | sed -n '1,80p'
```

Expected: normal app shell response

- [ ] **Step 4: Manual browser verification**

Open `http://localhost:4321` and confirm:

- sidebar shows the new category order
- the checklist loads first
- clicking a browser note works
- clicking a DSA note works
- syntax-highlighted code blocks still render
- copy buttons still work

- [ ] **Step 5: Commit final verification pass if needed**

```bash
cd /Users/amitagrawal/Desktop/Projects/RevisoStatic && git status --short
```

Expected: clean working tree or only intentional follow-up edits

## Self-Review

- Spec coverage: includes curriculum reordering, browser internals expansion, checklist updates, and full DSA overhaul
- Placeholder scan: removed generic TODO-style directions and named exact files, routes, and commands
- Type consistency: category keys are consistent across `app.js`, `server.js`, and checklist route examples
