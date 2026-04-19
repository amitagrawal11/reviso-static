---
title: Graphs
category: dsa
order: 6
---
# Graphs

## 1-Line Intuition

Graphs model arbitrary connections, so the job is usually to represent neighbors clearly and traverse without getting lost in cycles.

## Why Interviewers Care

Graphs reveal whether you can translate messy real-world relationships into an adjacency structure, choose BFS versus DFS, and control repeated work with a visited set. That is a strong signal of algorithmic maturity.

## When To Use

Use graph thinking when data is about relationships rather than strict order or hierarchy: routes, dependencies, friendships, recommendations, workflows, states, or connected regions in a grid.

## Visual Model

~~~mermaid
flowchart LR
  A["A"] --> B["B"]
  A --> C["C"]
  B --> D["D"]
  C --> D
  D --> E["E"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Build adjacency list | O(V + E) | O(V + E) | Standard representation |
| BFS traversal | O(V + E) | O(V) | Good for minimum-edge paths |
| DFS traversal | O(V + E) | O(V) | Good for exploration/components |
| Adjacency matrix edge lookup | O(1) | O(V^2) | Dense graphs only |
| Connected components | O(V + E) | O(V) | DFS/BFS or union-find |

## 30-Second Cheat Sheet

- If entities connect in many-to-many ways, think graph.
- Adjacency lists are the default choice in interviews.
- BFS is for shortest path in an unweighted graph.
- DFS is great for components, cycle detection, and exhaustive exploration.
- Always ask whether the graph is directed, undirected, weighted, or cyclic.

## Brute Force Approach

For a problem like counting connected components, brute force can repeatedly rescan all edges for every node and re-discover the same reachable nodes many times.

- Time: Often O(V * (V + E)) or worse, depending on the repeated rescans
- Space: O(V)

That wastes time because the graph's connectivity does not change during the query.

## Optimized Approach

The optimized solution builds an adjacency list once and runs DFS or BFS from each unvisited node. Every node gets visited once, and every edge is processed a constant number of times.

- Time: O(V + E)
- Space: O(V + E)

## Commented Interview-Ready Code

~~~js
function countComponents(n, edges) {
  const graph = Array.from({ length: n }, () => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a); // Undirected graph: add both directions.
  }

  const visited = new Array(n).fill(false);
  let components = 0;

  function dfs(node) {
    visited[node] = true;

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  for (let node = 0; node < n; node += 1) {
    if (visited[node]) {
      continue;
    }

    components += 1; // Found a new connected group.
    dfs(node);
  }

  return components;
}
~~~

## Dry Run

Count components for `n = 5` and edges `[[0,1], [1,2], [3,4]]`.

1. Build adjacency list:
   - `0 -> [1]`
   - `1 -> [0, 2]`
   - `2 -> [1]`
   - `3 -> [4]`
   - `4 -> [3]`
2. Start at node `0`, run DFS, visit `0, 1, 2`
3. Component count becomes `1`
4. Nodes `1` and `2` are already visited
5. Start at node `3`, run DFS, visit `3, 4`
6. Component count becomes `2`
7. Final answer: `2`

## Common Problem Types

- Connected components
- Number of islands
- Clone graph
- Course schedule / dependency ordering
- Shortest path in an unweighted graph
- Detect cycle in directed or undirected graphs

## Real-World Frontend Analogy

Frontend systems are full of graph-shaped problems: route transitions, dependency graphs between modules, state-machine transitions, or which components depend on which data sources. If it is "not quite a tree and not quite a list," it is often a graph.

## Pros

- Very flexible for relationship-heavy problems
- BFS and DFS unlock many solutions once the graph is modeled well
- Adjacency lists are memory-efficient for sparse graphs

## Cons

- The modeling step can be intimidating
- Cycles create easy bugs if visited tracking is missing
- Weighted and directed variants add extra nuance quickly

## Limitations

- Some graph problems need specialized algorithms beyond BFS/DFS
- Adjacency matrices become too large for sparse graphs
- Recursive DFS may hit stack limits on very large graphs in JavaScript

## Performance Impact / Trade-Offs

Graph performance depends heavily on representation choice. Adjacency lists are usually the right balance for sparse real-world systems, while matrices only make sense when the graph is dense and constant-time edge lookup matters more than memory.

## Interview Questions With Strong Answers

### How do you know a problem is secretly a graph problem?

If the entities have arbitrary relationships instead of strict sequence or parent-child structure, I start thinking about nodes and edges.

### Why is an adjacency list usually the default?

Because most interview graphs are sparse, so adjacency lists give O(V + E) traversal without paying O(V^2) memory for non-existent edges.

### What is the first bug you guard against in graph traversal?

Repeated work or infinite loops from revisiting nodes. I almost always mention the visited set before I start coding.

## Common Mistakes

- Forgetting whether the graph is directed or undirected
- Building the wrong representation for the problem
- Missing visited tracking
- Using BFS for weighted shortest paths without calling out the limitation
