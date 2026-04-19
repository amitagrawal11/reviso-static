---
title: DOM Traversal & Manipulation
category: browser
order: 1
---
# DOM Traversal & Manipulation

## 1-Line Intuition

Read the existing DOM structure carefully, then change only what you truly need.

## Why Interviewers Care

Strong frontend candidates are expected to understand the DOM directly, not only through frameworks.

## Visual Model

~~~mermaid
flowchart LR
    A[Find node] --> B[Read state or structure]
    B --> C[Update minimal DOM]
    C --> D[Avoid unnecessary reflows]
~~~

## 30-Second Cheat Sheet

- Query carefully
- Batch reads and writes when possible
- Minimize unnecessary DOM churn

## Deep Dive

Direct DOM work still matters in interviews, even if your daily job uses React or another framework. Traversal is about locating the right node efficiently; manipulation is about updating the DOM without triggering avoidable layout work. A strong answer connects correctness, readability, and rendering cost.

## Minimal Code Example

~~~js
const item = document.querySelector('[data-id="42"]');
item.textContent = 'Updated';
~~~

## Real-World Example

Tooltips, portals, embedded widgets, and framework-agnostic scripts often need direct DOM work.

## Pros

- Precise control
- Good understanding of browser behavior

## Cons

- Can become brittle if overused

## Limitations

- Manual DOM code scales poorly without structure

## Performance Impact / Related Metrics

- Repeated DOM reads and writes can cause layout thrashing

## Interview Questions With Answers

### 1. Why do interviewers still ask raw DOM questions?

Because they want to see mastery of browser fundamentals, not just framework APIs.

### 2. What is layout thrashing?

Repeated interleaving of DOM reads and writes that forces extra layout recalculation.

### 3. What is a safe DOM update principle?

Change the minimum necessary and avoid unnecessary synchronous measurement-update loops.

## Common Mistakes

- Over-querying the DOM
- Mixing reads and writes carelessly
- Using innerHTML where safer targeted updates would do
