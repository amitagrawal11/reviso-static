---
title: getElementsByClassName
category: coding
order: 13
---
# getElementsByClassName

## 1-Line Intuition

Find every element that carries a given class name.

## Why Interviewers Care

Classic DOM polyfill-style problem that tests tree traversal, DOM APIs, and live vs static collection discussion.

## Visual Model

~~~mermaid
flowchart TD
    A[Root element] --> B[Walk descendants]
    B --> C{Has requested class?}
    C -- Yes --> D[Collect element]
    C -- No --> E[Continue traversal]
~~~

## 30-Second Cheat Sheet

- Traverses DOM tree
- Checks class membership
- Returns matching elements

## Deep Dive

This kind of DOM API implementation tests whether you can traverse tree structures and reason about browser-native behavior. In frontend interviews, it also opens discussion around live collections, static snapshots, and why selector engines evolved. It is a useful bridge between JS fundamentals and browser internals.

## Minimal Code Example

~~~js
function getElementsByClassName(root, className) {
  const result = []; // Collect matching elements in traversal order

  function walk(node) {
    if (!node || node.nodeType !== 1) {
      return; // Ignore missing nodes and non-element nodes
    }

    if (node.classList.contains(className)) { // Native classList avoids manual string splitting
      result.push(node);
    }

    for (const child of node.children) {
      walk(child); // DFS over the DOM tree
    }
  }

  walk(root); // Start traversal from the provided subtree root
  return result;
}
~~~

## Real-World Example

Helpful as a practice problem for DOM traversal and tree recursion, even if querySelectorAll is what you would usually use in production.

## Pros

- Good traversal practice
- Strengthens DOM understanding

## Cons

- Less relevant than modern selectors in production

## Limitations

- Real browser behavior can include nuances around live collections

## Performance Impact / Related Metrics

- Tree walks are proportional to subtree size
- Large DOM traversals on interaction paths can hurt responsiveness

## Interview Questions With Answers

### 1. What data structure does this problem resemble?

A tree traversal problem over the DOM.

### 2. Why is classList useful here?

It gives accurate class membership checks without manual string parsing.

### 3. What is a key follow-up on the native API?

Whether the returned collection is live or static.

## Common Mistakes

- Checking className strings naively
- Forgetting to traverse descendants
- Ignoring node type filtering
