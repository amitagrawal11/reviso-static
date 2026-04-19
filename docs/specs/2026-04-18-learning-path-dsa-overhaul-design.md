# Reviso Learning Path And DSA Overhaul Design

## Goal

Reorganize Reviso into a true Google-style frontend learning path, ordered from fundamentals to architect-level preparation, while upgrading the DSA notes from light revision prompts into complete interview-prep material.

## Why This Change

The current app mixes topics by source category rather than by learning order. That creates two problems:

1. A learner does not know what to study first.
2. The DSA notes are too thin to support real preparation.

The new structure should make the app feel like a guided curriculum instead of a flat topic library.

## Target Sidebar Structure

The sidebar should be reorganized into these top-level categories:

1. `Foundations`
2. `JS Internals`
3. `Browser Platform`
4. `Coding Patterns`
5. `DSA`
6. `Performance`
7. `System Design`
8. `Security`
9. `Interview Prep`

## Learning Philosophy

The order is intentional:

- `Foundations` teaches the basic language and data-structure mental models first.
- `JS Internals` deepens understanding of runtime behavior and framework internals.
- `Browser Platform` teaches the execution environment and DOM/platform primitives.
- `Coding Patterns` focuses on polyfills and implementation exercises common in frontend interviews.
- `DSA` comes after the learner has enough JavaScript comfort to reason cleanly in code.
- `Performance` isolates rendering, loading, and responsiveness as a first-class study track.
- `System Design` comes later because strong design answers depend on runtime, browser, and performance knowledge.
- `Security` remains separate so it is not lost inside platform topics.
- `Interview Prep` stays as the checklist and meta-preparation area.

## Canonical Topic Order

Each topic should appear in exactly one primary category. No duplication in the sidebar.

### Foundations

1. `Arrays & Strings`
2. `Hash Maps & Sets`
3. `Stacks & Queues`
4. `Closures & Lexical Scope`
5. `Prototypal Inheritance`
6. `Event Loop & Call Stack`
7. `Promises, Async/Await, Microtasks`

### JS Internals

1. `Memory Management & Garbage Collection`
2. `Design Patterns (Observer, Singleton, Factory)`
3. `State Management Patterns (Flux, Zustand, Jotai)`
4. `React Fiber Architecture`
5. `Concurrent Mode`
6. `Time Slicing`
7. `IndexedDB & Storage APIs`

### Browser Platform

1. `DOM Traversal & Manipulation`
2. `DOM Events, Capture, Bubble & Delegation`
3. `Critical Rendering Path`
4. `Diffing Algorithm`
5. `Intersection Observer`
6. `MutationObserver`
7. `WebSockets & SSE`
8. `Service Workers & PWA`
9. `Browser Caching Strategies`
10. `Web Workers`

### Coding Patterns

1. `Array.prototype.map`
2. `Array.prototype.filter`
3. `Array.prototype.reduce`
4. `Promise.all`
5. `Promise.any`
6. `Deep Clone`
7. `JSON.stringify`
8. `Event Emitter / Observer Pattern`
9. `getElementsByClassName`
10. `getElementsByTagName`
11. `Debounce & Throttle`

### DSA

1. `Linked Lists`
2. `Trees & Binary Trees`
3. `BFS & DFS`
4. `Binary Search`
5. `Two Pointers & Sliding Window`
6. `Graphs`
7. `Heaps & Priority Queues`
8. `Tries`
9. `Union-Find`
10. `Recursion, Backtracking & DP Basics`

### Performance

1. `Web Vitals (LCP, CLS, INP)`
2. `Code Splitting & Lazy Loading`
3. `Image Optimization (WebP, AVIF, lazy load)`
4. `Tree Shaking`
5. `Bundle Analysis & Optimization`
6. `CSS Containment`
7. `Container Queries`
8. `Virtual List / Windowing`
9. `Hydration (Progressive / Partial / Selective)`
10. `Streaming SSR`
11. `Incremental Static Regeneration (ISR)`

### System Design

1. `Atomic Design`
2. `Island Architecture`
3. `Micro Frontend Architecture`
4. `Module Federation`
5. `CSS Layers (@layer)`
6. `Subgrid`
7. `CSS Houdini`

### Security

1. `XSS, CSRF, CORS & CSP Basics`

### Interview Prep

1. `Google Frontend Architect Interview Checklist`

## Topic Mapping Rules

The implementation should keep existing markdown files where possible and only remap them in the UI/server layer unless moving files is necessary for maintainability.

Rules:

- Existing notes under `docs/beginner`, `docs/intermediate`, and `docs/advanced` should continue to work.
- The app should expose the new category names and topic ordering in the sidebar.
- The routing layer should map each new visible category to the correct underlying markdown file path.
- Existing checklist links should be updated to the new category names.
- Existing hashes should be considered stale and can be remapped only if the effort is small. If not, the new path format becomes the canonical format.

## DSA Content Standard

Every DSA note should be rewritten to support actual preparation, not just quick recall.

Each note should use this structure:

1. `1-Line Intuition`
2. `Why Interviewers Care`
3. `When To Use`
4. `Visual Model`
5. `Core Operations / Complexity Table`
6. `30-Second Cheat Sheet`
7. `Brute Force Approach`
8. `Optimized Approach`
9. `Commented Interview-Ready Code`
10. `Dry Run`
11. `Common Problem Types`
12. `Real-World Frontend Analogy`
13. `Pros`
14. `Cons`
15. `Limitations`
16. `Performance Impact / Trade-Offs`
17. `Interview Questions With Strong Answers`
18. `Common Mistakes`

## DSA Quality Bar

Each DSA note should:

- include at least one meaningful Mermaid diagram
- include at least one commented JavaScript code example
- explain brute force before optimized thinking when relevant
- mention expected time and space complexity
- tie the concept back to frontend or UI/system reasoning when possible
- be understandable to a learner who is not already strong at algorithms

## UI/UX Expectations

The sidebar should feel like a guided curriculum:

- categories should appear in the new order only
- topics inside each category should appear in the exact order defined above
- progress tracking should continue to work without data loss if possible
- the active note should still render exactly as today

No new build step should be introduced.

## Implementation Scope

This work includes:

- updating sidebar categories and labels
- reordering topics in the app configuration
- remapping topic routes to the correct existing markdown files
- updating the interview checklist links
- rewriting all DSA notes to the new standard

This work does not include:

- rewriting every non-DSA note in this pass
- changing the overall server architecture
- changing progress storage format unless required for category remapping

## Risks And Decisions

### Risk: Topic moves may break existing links

Mitigation:

- update checklist links in the same change
- keep route-alias logic where practical

### Risk: DSA rewrite becomes inconsistent across files

Mitigation:

- use one shared structure for all DSA notes
- rewrite category by category rather than ad hoc

### Risk: Progress state may be lost if category keys change

Mitigation:

- if practical, add a migration map from old category keys to new ones
- otherwise document that new categories reset completion for moved topics

## Recommended Implementation Order

1. Update topic/category model in the app
2. Add server-side aliasing for the new category names
3. Update checklist links
4. Rewrite DSA notes one by one using the new standard
5. Verify rendering, navigation, and progress behavior

## Self-Review

Checked for:

- placeholder text: none
- contradictions in category placement: removed overlapping ownership where possible
- scope size: focused on curriculum restructuring plus DSA overhaul only
- ambiguity: exact category names, topic order, and DSA structure are explicit
