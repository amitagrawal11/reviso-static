# Reviso Promise Track Expansion Design

## Goal

Expand the promise material inside Reviso so `Coding Patterns` includes a coherent promise-focused mini-track suitable for Google-style frontend interview preparation.

## Why This Change

The current coding section includes `Promise.all` and `Promise.any`, but it is missing other commonly asked promise utilities and a scoped `MyPromise` implementation. That leaves the promise story incomplete for interview prep.

## Design Decision

Do not create a new top-level category.

Instead, create a promise-focused ordered block inside `Coding Patterns` so learners encounter related promise topics together.

## Target Ordering In Coding Patterns

The `Coding Patterns` category should be ordered as:

1. `Promise.all`
2. `Promise.any`
3. `Promise.race`
4. `Promise.allSettled`
5. `MyPromise (Prototype-Based)`
6. `MyPromise (Class-Based)`
7. `Array.prototype.map`
8. `Array.prototype.filter`
9. `Array.prototype.reduce`
10. `Deep Clone`
11. `JSON.stringify`
12. `Event Emitter / Observer Pattern`
13. `getElementsByClassName`
14. `getElementsByTagName`
15. `Debounce & Throttle`

## New Notes To Add

Create these new files under `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/coding`:

- `promise-race.md`
- `promise-all-settled.md`
- `my-promise-prototype.md`
- `my-promise-class.md`

## Existing Notes To Keep And Improve

Keep:

- `promise-all.md`
- `promise-any.md`

These may receive a light upgrade so the promise block feels consistent, but they do not need a full rewrite if their quality already matches the coding-note standard.

## Content Standard For Promise Notes

Each promise note should use this structure:

1. `1-Line Intuition`
2. `Why Interviewers Care`
3. `Visual Model`
4. `30-Second Cheat Sheet`
5. `Deep Dive`
6. `Commented Interview-Ready Code`
7. `Dry Run / Execution Flow`
8. `Real-World Example`
9. `Pros`
10. `Cons`
11. `Limitations`
12. `Performance Impact / Trade-Offs`
13. `Interview Questions With Answers`
14. `Common Mistakes`

## Scope Rules For MyPromise Notes

The `MyPromise` notes must be honest interview-scoped implementations, not misleading “full native Promise spec” recreations.

They should explicitly cover:

- internal state machine: `pending`, `fulfilled`, `rejected`
- stored fulfillment and rejection values
- queued callbacks while pending
- async handler flushing behavior
- `then`
- `catch`
- `finally`
- basic chaining behavior at an interview-appropriate level

They should explicitly call out what is not implemented fully compared to native Promise behavior.

## Distinction Between The Two MyPromise Notes

### MyPromise (Prototype-Based)

This note should teach the classic constructor-function style:

- function constructor
- methods attached on `.prototype`
- useful for showing older-school JavaScript object model knowledge

### MyPromise (Class-Based)

This note should teach the modern class-based version:

- `class MyPromise`
- methods defined in class body
- cleaner syntax for most current interview discussion

The two notes should not be copy-paste duplicates. The underlying mechanics can be similar, but the explanation should emphasize the implementation style difference and when an interviewer may care.

## Topic-Specific Emphasis

### Promise.race

Should emphasize:

- first settled wins
- can resolve or reject first
- timeout patterns
- difference from `any`

### Promise.allSettled

Should emphasize:

- waits for all outcomes
- never fails fast
- useful for partial success reporting
- output shape with `status`, `value`, and `reason`

### Promise.any

Should retain emphasis on:

- first fulfillment wins
- rejects with `AggregateError`
- difference from `race`

### Promise.all

Should retain emphasis on:

- all required
- fail-fast semantics
- ordered results

## App Changes Required

Implementation should include:

- reordering `Coding Patterns` topics in `app.js`
- adding the four new promise notes to the topic list
- ensuring server routing works for the new note slugs
- updating the interview checklist if promise links or recommended study order should reflect the new promise track

## Checklist Updates

The interview checklist should:

- keep `Promise.all` and `Promise.any`
- add `Promise.race`
- add `Promise.allSettled`
- add at least one `MyPromise` note in the “if time is limited” or “coding patterns” guidance if that fits naturally

## Non-Goals

This change does not include:

- a full Promises/A+ compliance implementation
- adding every static or instance Promise method
- building an executable test harness for promise notes
- creating a separate top-level `Promises` sidebar category

## Risks And Mitigations

### Risk: MyPromise notes become too complex

Mitigation:

- keep them interview-scoped
- clearly state limitations
- prefer clarity over spec completeness

### Risk: Promise notes become repetitive

Mitigation:

- emphasize semantic differences between `all`, `any`, `race`, and `allSettled`
- make prototype-based and class-based notes explain style and trade-off differences

### Risk: Coding section becomes too wide

Mitigation:

- keep the promise topics grouped at the top
- avoid creating a new top-level category

## Recommended Implementation Order

1. Update `Coding Patterns` ordering in `app.js`
2. Add server route mappings for the new promise notes
3. Create the four new promise notes
4. Lightly align `Promise.all` and `Promise.any` if needed
5. Update the checklist links/order
6. Verify topic endpoints and sidebar rendering

## Self-Review

Checked for:

- placeholders: none
- contradictions: none
- ambiguity: exact files, ordering, and note expectations are explicit
- scope: tightly focused on the promise-track expansion only
