---
title: Stacks & Queues
category: foundations
order: 3
---
# Stacks & Queues

## 1-Line Intuition

Stacks and queues are about processing order: stacks handle the newest item first, queues handle the oldest item first.

## Why Interviewers Care

These structures show whether you recognize when order of processing is the real constraint. They power parsing, traversal, scheduling, undo/redo, and many classic coding questions.

## When To Use

Use a stack when the most recent item should be handled first, such as nested parsing, recursion simulation, or DFS. Use a queue when work should happen in arrival order, such as BFS, scheduling, or layered processing.

## Visual Model

~~~mermaid
flowchart LR
  A["Push"] --> B["Stack top"]
  C["Enqueue"] --> D["Queue back"]
  D --> E["Queue front -> Dequeue"]
~~~

## Core Operations / Complexity Table

| Structure | Operation | Time | Space | Notes |
| --- | --- | --- | --- | --- |
| Stack | push | O(1) | O(1) extra | Add to top |
| Stack | pop | O(1) | O(1) extra | Remove top |
| Queue | enqueue | O(1) | O(1) extra | Add to back |
| Queue | dequeue | O(1) ideal | O(1) extra | Use real queue/deque semantics |
| BFS traversal | O(V + E) | O(V) | Queue-based graph walk |

## 30-Second Cheat Sheet

- Stack = LIFO.
- Queue = FIFO.
- Balanced parentheses usually means stack.
- Level-order traversal usually means queue.
- If the problem says "undo" or "backtrack," think stack.

## Brute Force Approach

If you ignore the ordering structure, you often end up rescanning arrays to find the "next" item to process.

For example, simulating level-order traversal without a queue can lead to awkward repeated passes over nodes by level.

That usually makes the code more complex and less efficient than necessary.

## Optimized Approach

Use the structure that matches the order constraint directly:

- stack for nested or reverse-order processing
- queue for arrival-order or level-order processing

This makes both the algorithm and the explanation cleaner.

## Commented Interview-Ready Code

~~~js
function isValidParentheses(s) {
  const stack = [];
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);

  for (const ch of s) {
    if (pairs.has(ch)) {
      const top = stack.pop(); // Most recent opener must match first.
      if (top !== pairs.get(ch)) {
        return false;
      }
    } else {
      stack.push(ch); // Remember opening bracket for a future closer.
    }
  }

  return stack.length === 0; // No unmatched openers should remain.
}
~~~

## Dry Run

Validate `"([{}])"`.

1. Read `(`, push it
2. Read `[`, push it
3. Read `{`, push it
4. Read `}`, pop `{`, match
5. Read `]`, pop `[`, match
6. Read `)`, pop `(`, match
7. Stack is empty, so return `true`

## Common Problem Types

- valid parentheses
- evaluate expression / parse nesting
- undo / redo
- browser back stack
- BFS / shortest path in unweighted graph
- moving average or task scheduling with a queue

## Real-World Frontend Analogy

Undo history is a stack. Notifications waiting to be processed resemble a queue. Breadth-first traversal of route or state graphs uses the same queue behavior as classic BFS questions.

## Pros

- Simple and expressive ordering model
- Maps directly to many real problems
- Helps recognize BFS vs DFS immediately

## Cons

- Easy to use the wrong one if you miss the order constraint
- Plain-array queue operations can be misleading in some languages

## Limitations

- Not enough on their own for arbitrary lookup or ranking
- Queue implementation details matter if performance is critical

## Performance Impact / Trade-Offs

The main win is correctness of processing order, not just raw speed. When the order constraint is central, the right structure keeps the algorithm both efficient and easy to explain.

## Interview Questions With Strong Answers

### When should I use a stack?

When the most recently seen item should be processed first, especially for nested structures, DFS, or undo/backtracking-style problems.

### When should I use a queue?

When items should be processed in arrival order, especially for BFS or step-by-step layer exploration.

### Why does BFS use a queue instead of a stack?

Because BFS must process nodes in the order they were discovered so it expands one level at a time.

## Common Mistakes

- Mixing up queue and stack semantics
- Missing that ordering is the core signal in the problem
- Using an awkward workaround instead of the right structure
- Forgetting that BFS and DFS are mainly different because of their support structure
