---
title: BFS & DFS
category: dsa
order: 3
---
# BFS & DFS

## 1-Line Intuition

BFS explores outward layer by layer, while DFS goes deep along one path first and backtracks when needed.

## Why Interviewers Care

These are core traversal tools for trees, graphs, matrices, dependency systems, and shortest-path reasoning. Interviewers expect you to know when each one fits and what data structure powers it.

## When To Use

Use BFS when you need minimum steps in an unweighted graph, level order, or nearest-match discovery. Use DFS when you need exhaustive exploration, connected components, cycle checks, topological-style reasoning, or subtree processing.

## Visual Model

~~~mermaid
flowchart LR
  A["Start"] --> B["BFS: queue"]
  A --> C["DFS: stack / recursion"]
  B --> D["Layer 1"]
  D --> E["Layer 2"]
  C --> F["Path deepens"]
  F --> G["Backtrack"]
~~~

## Core Operations / Complexity Table

| Pattern | Time | Space | Notes |
| --- | --- | --- | --- |
| BFS on graph | O(V + E) | O(V) | Queue + visited set |
| DFS on graph | O(V + E) | O(V) | Stack/recursion + visited set |
| BFS on tree | O(n) | O(w) | `w` is max width |
| DFS on tree | O(n) | O(h) | `h` is height |
| Shortest path in unweighted graph | O(V + E) | O(V) | BFS is the correct tool |

## 30-Second Cheat Sheet

- BFS uses a queue; DFS uses a stack or recursion.
- In graphs with cycles, both need a visited structure.
- BFS is best for minimum-edge distance in an unweighted graph.
- DFS is often best for "explore everything" and recursive structure.
- If the question says "level," think BFS first.

## Brute Force Approach

For a shortest-path style problem, brute force tries every possible path recursively and keeps the minimum valid length.

That explodes combinatorially because the search branches at every node.

- Time: Exponential in the worst case
- Space: O(path length) for recursion, plus any path tracking

## Optimized Approach

If all edges have equal cost, BFS is the optimized approach because the first time you reach a node, you reached it in the fewest number of edges.

You push the start node into a queue, pop nodes in FIFO order, and expand neighbors level by level.

- Time: O(V + E)
- Space: O(V)

## Commented Interview-Ready Code

~~~js
function shortestPathLength(graph, start, target) {
  if (start === target) {
    return 0;
  }

  const queue = [[start, 0]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const [node, distance] = queue.shift();

    for (const neighbor of graph.get(node) || []) {
      if (visited.has(neighbor)) {
        continue; // Skip nodes we already reached earlier.
      }

      if (neighbor === target) {
        return distance + 1; // First hit in BFS is the shortest path.
      }

      visited.add(neighbor);
      queue.push([neighbor, distance + 1]);
    }
  }

  return -1; // Target is unreachable from the start node.
}
~~~

## Dry Run

Graph:

~~~text
A -> B, C
B -> D
C -> E
D -> F
E -> F
~~~

Find shortest path from `A` to `F`.

1. Queue starts as `[(A, 0)]`
2. Pop `A`, push `B` and `C` with distance `1`
3. Pop `B`, push `D` with distance `2`
4. Pop `C`, push `E` with distance `2`
5. Pop `D`, see neighbor `F`
6. Return `3`

The shortest path is `A -> B -> D -> F`.

## Common Problem Types

- Level order traversal
- Number of islands / connected components
- Shortest path in unweighted graphs
- Clone graph
- Detect cycles or validate reachability
- Flood fill and grid traversal

## Real-World Frontend Analogy

BFS feels like expanding a search outward from the current screen state: find the nearest route, nearest DOM ancestor, or nearest matching node first. DFS feels like drilling deep through nested config, component children, or folder structures until you hit a leaf, then backing out.

## Pros

- Extremely reusable across trees, grids, and graphs
- BFS gives shortest-edge paths for free in unweighted graphs
- DFS often produces cleaner recursive solutions

## Cons

- BFS can use a lot of memory on wide structures
- DFS recursion can overflow on deep input
- It is easy to forget visited tracking in cyclic graphs

## Limitations

- BFS is not enough for weighted shortest paths; that is where Dijkstra or A* enters
- DFS does not guarantee shortest path
- Recursive DFS depends on stack depth limits in JavaScript

## Performance Impact / Trade-Offs

The main trade-off is memory shape. BFS may store an entire frontier at once, while DFS stores a path plus some call-stack state. In UI and system reasoning, choosing breadth versus depth often changes whether work feels responsive or memory-heavy.

## Interview Questions With Strong Answers

### How do you decide between BFS and DFS quickly?

I ask whether the problem is about layers or minimum steps. If yes, BFS. If it is about exploring full structure, subtree work, or exhaustive search, DFS is usually the better first tool.

### Why does BFS guarantee the shortest path in an unweighted graph?

Because it explores nodes in increasing distance order. The first time a node is dequeued or discovered, no shorter edge-count path exists.

### What changes when the graph has cycles?

You must track visited nodes, otherwise both BFS and DFS can loop forever or redo unnecessary work.

## Common Mistakes

- Using DFS for minimum-step problems in an unweighted graph
- Forgetting to mark nodes as visited
- Confusing queue behavior with stack behavior
- Writing recursive DFS without acknowledging stack depth risk
