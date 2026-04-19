---
title: getElementsByTagName
category: coding
order: 14
---
# getElementsByTagName

## 1-Line Intuition

Walk a DOM subtree and collect all elements with the requested tag.

## Why Interviewers Care

Another core DOM traversal problem that reveals how well you reason about trees and browser structure.

## Visual Model

~~~mermaid
flowchart TD
    A[Start at root] --> B[Visit node]
    B --> C{Tag matches?}
    C -- Yes --> D[Collect]
    C -- No --> E[Skip collect]
    D --> F[Traverse children]
    E --> F
~~~

## 30-Second Cheat Sheet

- DOM is a tree
- Traverse all descendants
- Compare normalized tag name

## Deep Dive

The value of this problem is less about the API itself and more about disciplined DOM tree traversal. It is a nice way to discuss DFS traversal, iterative vs recursive implementation, and why browser-native selector APIs are faster and more featureful than hand-rolled traversal for production use.

## Minimal Code Example

~~~js
function getElementsByTagName(root, tagName) {
  const target = tagName.toUpperCase(); // Normalize for consistent HTML tag matching
  const result = []; // Collect matches in DOM traversal order

  function walk(node) {
    if (!node || node.nodeType !== 1) {
      return; // Ignore missing nodes and non-element nodes
    }

    if (node.tagName === target) { // Compare normalized tag names for HTML nodes
      result.push(node);
    }

    for (const child of node.children) {
      walk(child); // Traverse every descendant in the subtree
    }
  }

  walk(root); // Start traversal from the provided subtree root
  return result;
}
~~~

## Real-World Example

Useful as interview practice for DOM traversal and DFS thinking.

## Pros

- Good tree traversal exercise
- Connects DOM structure to algorithmic traversal

## Cons

- Limited production value versus selectors

## Limitations

- Does not capture full selector complexity
- Native behavior details may differ

## Performance Impact / Related Metrics

- Traversal cost scales with subtree size
- Not something you want to run repeatedly on large DOMs without need

## Interview Questions With Answers

### 1. What algorithmic pattern is this?

Depth-first traversal of a tree.

### 2. Why normalize the tag name?

Because DOM tagName comparisons are commonly uppercase in HTML documents.

### 3. Why is querySelectorAll usually preferred in real apps?

Because it is more expressive and browser-optimized.

## Common Mistakes

- Not normalizing tag names
- Traversing text nodes unnecessarily
- Ignoring subtree size cost
