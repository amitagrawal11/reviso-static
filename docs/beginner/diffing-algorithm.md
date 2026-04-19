---
title: Diffing Algorithm
category: system
order: 2
---
# Diffing Algorithm

## 1-Line Intuition

A diffing algorithm compares previous UI and next UI and updates only what seems necessary.

## Why Interviewers Care

This topic reveals whether you understand UI update cost, identity, rerender behavior, and why list keys matter in frameworks like React.

## Visual Model

~~~mermaid
flowchart TD
    A[Previous tree] --> C[Compare nodes]
    B[Next tree] --> C
    C --> D[Reuse matching nodes]
    C --> E[Insert new nodes]
    C --> F[Remove old nodes]
    C --> G[Move or remount list items depending on keys]
~~~

## 30-Second Cheat Sheet

- Diffing compares old and new trees
- It is heuristic, not mathematically perfect
- Keys preserve identity in lists
- Type changes often trigger replacement
- Stable identity protects state and focus

## Deep Dive

Directly rebuilding the entire DOM on every update would be too expensive. Frameworks instead build or compare an abstract tree and figure out what can be reused. The key trade-off is speed versus optimality: fast heuristics are preferred over expensive perfect diffing.

The most interview-relevant part is list identity. If keys are stable, the framework can match previous and next items correctly. If keys are unstable, input state, focus, or animations can break because the wrong node gets reused or remounted.

At scale, architects care about how diffing interacts with component boundaries, list size, memoization, and rerender frequency.

## Minimal Code Example

~~~jsx
items.map((item) => <Row key={item.id} item={item} />);
~~~

## Real-World Example

In a shopping cart list, if you use array indexes as keys and remove the first item, the framework may mismatch rows, causing wrong input values or preserved UI state in the wrong place.

## Pros

- Far cheaper than full DOM rebuilds
- Preserves identity when keys are stable
- Makes declarative UI practical at scale

## Cons

- Still does comparison work every update
- Wrong keys can cause subtle bugs
- Heuristics are not globally optimal

## Limitations

- Diffing does not remove the need for good component design
- Large rerender surfaces can still be expensive
- Poor data modeling can overwhelm even good diffing

## Performance Impact / Related Metrics

- Affects render cost and responsiveness
- Large unnecessary rerenders can hurt `INP`
- Bad list identity can cause extra mount/unmount work

## Interview Questions With Answers

### 1. Why are stable keys important?

They preserve item identity across rerenders, which helps the framework reuse the correct DOM nodes and preserve state correctly.

### 2. Why is using array index as a key risky?

If items are inserted, removed, or reordered, the index no longer represents stable identity, so the framework can mismatch nodes.

### 3. Is diffing always minimal?

No. Most UI libraries use heuristics that are fast enough in practice rather than computing the perfect minimum edit set.

## Common Mistakes

- Using random values as keys
- Using array indexes for dynamic lists
- Thinking diffing means rerenders are always cheap
- Ignoring component boundary design
