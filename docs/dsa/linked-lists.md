---
title: Linked Lists
category: dsa
order: 1
---
# Linked Lists

## 1-Line Intuition

A linked list trades fast indexing for fast pointer rewiring, so you solve problems by changing `next` references instead of shifting whole arrays.

## Why Interviewers Care

Linked lists test whether you can reason carefully about pointers, null cases, and in-place updates under pressure. They also reveal whether you can keep track of state without leaning on array indexing.

## When To Use

Use a linked-list approach when you need cheap insert/delete after reaching a node, want stable node references, or the problem explicitly talks about `head`, `next`, cycle detection, reversal, or merging sorted streams.

## Visual Model

~~~mermaid
flowchart LR
  A["head -> 7"] --> B["3"]
  B --> C["9"]
  C --> D["1"]
  D --> E["null"]
  F["Reverse step"] --> G["prev <- curr -> next"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Access by index | O(n) | O(1) | Must walk node by node |
| Insert after known node | O(1) | O(1) | Rewire pointers only |
| Delete after known node | O(1) | O(1) | Requires access to previous node |
| Search by value | O(n) | O(1) | No binary search benefit |
| Reverse list | O(n) | O(1) | In-place pointer flipping |
| Detect cycle with two pointers | O(n) | O(1) | Floyd's algorithm |

## 30-Second Cheat Sheet

- Arrays optimize indexing; linked lists optimize pointer updates.
- Keep temporary references before mutating `next`, or you can lose the rest of the list.
- Common interview patterns: reverse list, middle node, cycle detection, merge two sorted lists, remove nth from end.
- Slow/fast pointers often remove the need for extra memory.

## Brute Force Approach

For a classic problem like reversing a linked list, the brute-force move is to copy node values into an array, reverse the array, then write the values back into the nodes.

That works, but it wastes extra memory and dodges the real skill interviewers want to see: safe pointer manipulation.

- Time: O(n)
- Space: O(n)

## Optimized Approach

The standard optimized solution reverses pointers in place.

At each step:
- store `curr.next` in a temp variable
- point `curr.next` backward to `prev`
- advance both pointers

You walk the list once and never allocate a second structure.

- Time: O(n)
- Space: O(1)

## Commented Interview-Ready Code

~~~js
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextNode = curr.next; // Save the remaining list before rewiring.
    curr.next = prev; // Flip the pointer so this node points backward.
    prev = curr; // Move prev forward to the node we just processed.
    curr = nextNode; // Continue with the original next node.
  }

  return prev; // Prev ends at the new head of the reversed list.
}
~~~

## Dry Run

Reverse `1 -> 2 -> 3 -> null`.

1. Start: `prev = null`, `curr = 1`
2. Save `nextNode = 2`, set `1.next = null`, move `prev = 1`, `curr = 2`
3. Save `nextNode = 3`, set `2.next = 1`, move `prev = 2`, `curr = 3`
4. Save `nextNode = null`, set `3.next = 2`, move `prev = 3`, `curr = null`
5. Loop ends, return `prev`

Result: `3 -> 2 -> 1 -> null`

## Common Problem Types

- Reverse a list or a sub-list
- Find middle node with slow/fast pointers
- Detect or locate a cycle
- Merge sorted linked lists
- Remove nth node from end
- Partition around a value

## Real-World Frontend Analogy

React's Fiber tree uses linked-node style relationships under the hood: each unit of work points to siblings and children. You usually do not hand-roll linked lists in UI code, but the mental model of "move through nodes and rewire references carefully" maps well to tree diffing and DOM traversal internals.

## Pros

- O(1) insertion or deletion once you already have the node
- Good fit for pointer-based interview patterns
- Can be memory-friendly for incremental growth when contiguous arrays are not ideal

## Cons

- No fast random access
- Pointer bugs are easy to make
- Usually worse than arrays for day-to-day frontend product code

## Limitations

- Singly linked lists cannot move backward unless you track extra state
- Many production problems are easier with arrays, maps, or plain objects
- Deep debugging is harder because the structure is spread across nodes rather than one compact block

## Performance Impact / Trade-Offs

Linked lists avoid array reindexing costs, but they pay for it with cache-unfriendly traversal and O(n) access. In frontend systems, that usually means arrays still win for rendering, filtering, and indexing work. Linked lists matter more as an interview tool and as a conceptual bridge to pointer-based internals.

## Interview Questions With Strong Answers

### Why are linked lists still asked if arrays are more common in JavaScript?

Because they isolate pointer reasoning. An interviewer wants to see whether you can mutate structure safely, handle null edges, and describe space trade-offs clearly.

### When is a linked list better than an array?

When you already hold a node reference and need constant-time insertions or deletions. If you need indexing, arrays are almost always better.

### What is the biggest source of bugs in linked-list questions?

Losing part of the list by overwriting `next` before saving it. I always keep a temporary pointer before rewiring nodes.

## Common Mistakes

- Overwriting `curr.next` before saving the original next node
- Forgetting edge cases like an empty list or single-node list
- Using extra arrays when the interviewer expects in-place pointer work
- Confusing node values with node references
