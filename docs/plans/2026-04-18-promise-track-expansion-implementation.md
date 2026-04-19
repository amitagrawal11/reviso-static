# Promise Track Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Reviso’s `Coding Patterns` section with a coherent promise-focused mini-track including `Promise.race`, `Promise.allSettled`, and interview-scoped `MyPromise` notes.

**Architecture:** Keep the existing no-build note app unchanged structurally. Update the client topic ordering in `app.js`, add route mappings in `server.js`, create four new markdown notes in `docs/coding`, and lightly update the checklist so the new promise track is discoverable.

**Tech Stack:** Node.js HTTP server, plain HTML/CSS/JS, Markdown notes, Mermaid

---

### Task 1: Reorder Coding Patterns And Add Promise Routes

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`

- [ ] **Step 1: Update `Coding Patterns` ordering in `app.js`**

Set the `coding` array in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js` to:

```js
  coding: [
    { title: "Promise.all", slug: "promise-all" },
    { title: "Promise.any", slug: "promise-any" },
    { title: "Promise.race", slug: "promise-race" },
    { title: "Promise.allSettled", slug: "promise-all-settled" },
    { title: "MyPromise (Prototype-Based)", slug: "my-promise-prototype" },
    { title: "MyPromise (Class-Based)", slug: "my-promise-class" },
    { title: "Array.prototype.map", slug: "array-map" },
    { title: "Array.prototype.filter", slug: "array-filter" },
    { title: "Array.prototype.reduce", slug: "array-reduce" },
    { title: "Deep Clone", slug: "deep-clone" },
    { title: "JSON.stringify", slug: "json-stringify" },
    { title: "Event Emitter / Observer Pattern", slug: "event-emitter-observer" },
    { title: "getElementsByClassName", slug: "get-elements-by-class-name" },
    { title: "getElementsByTagName", slug: "get-elements-by-tag-name" },
    { title: "Debounce & Throttle", slug: "debounce-throttle" },
  ],
```

- [ ] **Step 2: Add new route mappings in `server.js`**

Add these entries to `TOPIC_ROUTE_MAP` in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`:

```js
  ["coding:promise-race", ["coding", "promise-race"]],
  ["coding:promise-all-settled", ["coding", "promise-all-settled"]],
  ["coding:my-promise-prototype", ["coding", "my-promise-prototype"]],
  ["coding:my-promise-class", ["coding", "my-promise-class"]],
```

- [ ] **Step 3: Run syntax checks**

Run:

```bash
node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js
node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js
```

Expected: no output

### Task 2: Add The Four New Promise Notes

**Files:**
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/coding/promise-race.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/coding/promise-all-settled.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/coding/my-promise-prototype.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/coding/my-promise-class.md`

- [ ] **Step 1: Create `promise-race.md`**

Write a note with these sections:

```md
# Promise.race

## 1-Line Intuition
## Why Interviewers Care
## Visual Model
## 30-Second Cheat Sheet
## Deep Dive
## Commented Interview-Ready Code
## Dry Run / Execution Flow
## Real-World Example
## Pros
## Cons
## Limitations
## Performance Impact / Trade-Offs
## Interview Questions With Answers
## Common Mistakes
```

The note must emphasize:
- first settled wins
- can resolve or reject
- timeout and fallback patterns
- difference from `any`

- [ ] **Step 2: Create `promise-all-settled.md`**

Use the same section structure. The note must emphasize:
- waits for every input
- never fails fast
- returns result objects with `status`, `value`, and `reason`
- when partial success matters

- [ ] **Step 3: Create `my-promise-prototype.md`**

Use the same section structure. The note must:
- implement a constructor-function style `MyPromise`
- attach methods via `.prototype`
- explain `pending`, `fulfilled`, `rejected`
- queue callbacks while pending
- support interview-scoped `then`, `catch`, `finally`
- call out limitations versus native Promise

- [ ] **Step 4: Create `my-promise-class.md`**

Use the same section structure. The note must:
- implement `class MyPromise`
- explain the same promise mechanics as the prototype note
- highlight the style difference and trade-offs versus prototype-based implementation
- keep scope honest and interview-focused

- [ ] **Step 5: Verify the files exist**

Run:

```bash
ls /Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/coding
```

Expected: the four new files are present

### Task 3: Update The Checklist

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/prep/google-frontend-architect-interview-checklist.md`

- [ ] **Step 1: Add the new promise topics into the coding phase**

Make sure the checklist’s `Coding Patterns` section includes:

```md
- [ ] [Promise.all](#/coding/promise-all)
- [ ] [Promise.any](#/coding/promise-any)
- [ ] [Promise.race](#/coding/promise-race)
- [ ] [Promise.allSettled](#/coding/promise-all-settled)
- [ ] [MyPromise (Prototype-Based)](#/coding/my-promise-prototype)
- [ ] [MyPromise (Class-Based)](#/coding/my-promise-class)
```

- [ ] **Step 2: Mention promise implementations in limited-time prep**

Update the checklist so at least one `MyPromise` note appears in the “If Time Is Limited” or final-prep guidance.

### Task 4: Verification

**Files:**
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/coding/*.md`

- [ ] **Step 1: Verify endpoints**

Run:

```bash
curl -s "http://localhost:4321/api/topic?category=coding&slug=promise-race" | sed -n '1,24p'
curl -s "http://localhost:4321/api/topic?category=coding&slug=promise-all-settled" | sed -n '1,24p'
curl -s "http://localhost:4321/api/topic?category=coding&slug=my-promise-prototype" | sed -n '1,24p'
curl -s "http://localhost:4321/api/topic?category=coding&slug=my-promise-class" | sed -n '1,24p'
```

Expected: markdown content for all four topics

- [ ] **Step 2: Verify coding note presence**

Run:

```bash
rg -n "promise-race|promise-all-settled|my-promise-prototype|my-promise-class" /Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js /Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js /Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/prep/google-frontend-architect-interview-checklist.md
```

Expected: matches in all relevant files

## Self-Review

- Spec coverage: ordering, new notes, route mappings, and checklist updates are all covered
- Placeholder scan: none
- Type consistency: slugs and route keys match across `app.js`, `server.js`, and checklist paths
