---
title: Binary Search
category: dsa
order: 4
---
# Binary Search

## 1-Line Intuition

Binary search wins whenever the answer space is ordered enough that one comparison lets you throw away half the remaining work.

## Why Interviewers Care

It tests invariants, boundary discipline, and whether you recognize monotonic structure instead of defaulting to linear scans. Small off-by-one errors also reveal how carefully you reason.

## When To Use

Use binary search when the input is sorted or the answer space is monotonic, meaning once some condition becomes true it stays true on one side of the search range.

## Visual Model

~~~mermaid
flowchart TD
  A["Sorted range [left...right]"] --> B["Check mid"]
  B --> C{"Target smaller?"}
  C -- Yes --> D["Move right = mid - 1"]
  C -- No --> E{"Target larger?"}
  E -- Yes --> F["Move left = mid + 1"]
  E -- No --> G["Found answer"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Exact lookup in sorted array | O(log n) | O(1) | Iterative version |
| Lower bound / first valid index | O(log n) | O(1) | Boundary-sensitive |
| Upper bound / insertion position | O(log n) | O(1) | Common follow-up |
| Search in answer space | O(log range) * check cost | Depends | Needs monotonic check |

## 30-Second Cheat Sheet

- Sorted array or monotonic condition is the key prerequisite.
- Decide your invariant before coding: what do `left` and `right` mean?
- Exact match often uses `while (left <= right)`.
- Boundary-search variants often use `while (left < right)`.
- Say the rejected half out loud while coding to avoid pointer mistakes.

## Brute Force Approach

For simple lookup, brute force scans from left to right until it finds the target or reaches the end.

- Time: O(n)
- Space: O(1)

That is fine for small arrays, but it ignores the sorted structure completely.

## Optimized Approach

Binary search checks the middle element, uses the comparison to eliminate half the remaining range, and repeats.

Each iteration preserves the invariant that the target, if it exists, must still be inside `[left, right]`.

- Time: O(log n)
- Space: O(1)

## Commented Interview-Ready Code

~~~js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Midpoint of the active search range.

    if (nums[mid] === target) {
      return mid; // Found the exact target.
    }

    if (nums[mid] < target) {
      left = mid + 1; // Discard the left half including mid.
    } else {
      right = mid - 1; // Discard the right half including mid.
    }
  }

  return -1; // Target is not present.
}
~~~

## Dry Run

Search for `11` in `[1, 4, 7, 11, 15, 19]`.

1. `left = 0`, `right = 5`, `mid = 2`, value is `7`
2. `7 < 11`, so move `left = 3`
3. `left = 3`, `right = 5`, `mid = 4`, value is `15`
4. `15 > 11`, so move `right = 3`
5. `left = 3`, `right = 3`, `mid = 3`, value is `11`
6. Return index `3`

## Common Problem Types

- Find exact target in sorted array
- Find first or last occurrence
- Search insertion position
- Minimum feasible rate / capacity / threshold
- Rotated sorted array variants
- Binary search on answer space

## Real-World Frontend Analogy

If you have a sorted list of timestamps, route breakpoints, or virtualized row boundaries, binary search is how you jump straight near the right UI segment instead of scanning every item. Many rendering and scrolling optimizations rely on this kind of "ordered search space" thinking.

## Pros

- Massive speedup over linear scans on ordered data
- Small constant space with iterative implementation
- Generalizes beyond arrays to many monotonic decision problems

## Cons

- Easy to get boundaries wrong
- Only works when the underlying structure is ordered enough
- Lower-bound and upper-bound variants are easy to confuse

## Limitations

- Useless on unsorted arbitrary data
- Weighted or non-monotonic search problems need different tools
- In JavaScript, recursive versions add unnecessary stack usage for most interviews

## Performance Impact / Trade-Offs

Binary search reduces many read-heavy lookups from linear to logarithmic time, but only after you pay the cost of maintaining sorted order. In frontend systems, that trade-off is worth it when reads are frequent and the data can stay ordered.

## Interview Questions With Strong Answers

### What is the real prerequisite for binary search?

Not just "sorted array." The deeper requirement is a monotonic decision boundary so one comparison reliably tells you which half can be discarded.

### Why do off-by-one bugs happen so often here?

Because the algorithm depends on a precise loop invariant. If you do not define whether `right` is inclusive or exclusive, the updates become inconsistent.

### Where else would you use binary search besides direct lookup?

I use it for lower bounds, insertion points, and answer-space problems like finding the minimum feasible capacity, speed, or threshold that satisfies a check.

## Common Mistakes

- Running binary search on unsorted input
- Mixing inclusive and exclusive boundary rules
- Forgetting to update `left` or `right` past `mid`
- Not explaining why the condition is monotonic
