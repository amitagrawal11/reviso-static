---
title: Union-Find
category: dsa
order: 9
---
# Union-Find

## 1-Line Intuition

Union-find keeps track of which items belong to the same connected group, even as new connections are added over time.

## Why Interviewers Care

It is a compact way to show you understand dynamic connectivity, amortized optimization, and when repeated graph traversal is overkill for a problem that is really about group membership.

## When To Use

Use union-find when the problem repeatedly merges sets and asks whether two items are connected, how many connected groups remain, or whether adding an edge would create a cycle.

## Visual Model

~~~mermaid
flowchart TD
  A["0"] --> B["root 0"]
  C["1"] --> B
  D["2"] --> E["root 2"]
  F["union(1,2)"] --> G["merge roots"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Find with path compression | Near O(1) amortized | O(1) extra | More precisely O(alpha(n)) |
| Union by rank / size | Near O(1) amortized | O(1) extra | Keeps trees shallow |
| Connectivity query | Near O(1) amortized | O(1) extra | Compare roots |
| BFS/DFS per query baseline | O(V + E) | O(V) | Too slow for many repeated queries |

## 30-Second Cheat Sheet

- `find(x)` returns the representative root of `x`'s set.
- `union(a, b)` merges the two sets if they are different.
- Path compression and union by rank make operations almost constant time.
- Great for dynamic connectivity, not for retrieving actual paths.
- If you only have one connectivity query, DFS/BFS may be simpler.

## Brute Force Approach

If edges are added one by one and you answer "are these two nodes connected?" after each addition, brute force can rerun BFS or DFS from scratch for every query.

- Time: O(q * (V + E)) for `q` queries
- Space: O(V)

That becomes expensive when unions and connectivity checks are frequent.

## Optimized Approach

Union-find stores each group as a tree of representatives.

- `find` climbs to the root
- path compression flattens the path for future queries
- `union` attaches one root under another, often by rank or size

- Time: Near O(1) amortized per operation
- Space: O(n)

## Commented Interview-Ready Code

~~~js
class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = new Array(size).fill(1);
    this.components = size;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression.
    }

    return this.parent[x];
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) {
      return false; // Already connected.
    }

    if (this.rank[rootA] < this.rank[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }

    this.parent[rootB] = rootA;

    if (this.rank[rootA] === this.rank[rootB]) {
      this.rank[rootA] += 1;
    }

    this.components -= 1;
    return true;
  }
}

function countComponents(n, edges) {
  const uf = new UnionFind(n);

  for (const [a, b] of edges) {
    uf.union(a, b);
  }

  return uf.components;
}
~~~

## Dry Run

Count components for `n = 5` and edges `[[0,1], [1,2], [3,4]]`.

1. Start with `5` separate components
2. `union(0,1)` merges two roots -> components `4`
3. `union(1,2)` really means merge root of `0/1` with `2` -> components `3`
4. `union(3,4)` merges another pair -> components `2`
5. Final answer: `2`

If we then ask whether `0` and `2` are connected, `find(0) === find(2)` returns `true`.

## Common Problem Types

- Number of connected components
- Redundant connection / cycle detection
- Accounts merge
- Network connectivity after incremental edge additions
- Kruskal's minimum spanning tree

## Real-World Frontend Analogy

Imagine a collaboration tool where users, devices, or tabs gradually join the same session groups. You do not care about the exact path between them every time. You care whether they belong to the same cluster. That is union-find thinking.

## Pros

- Extremely fast repeated connectivity queries
- Elegant for incremental merges
- Small API surface: `find`, `union`, and maybe component count

## Cons

- Less intuitive than BFS/DFS at first
- Does not tell you the actual traversal path
- Easy to misuse when the problem is not truly about dynamic grouping

## Limitations

- Best for undirected connectivity-style problems
- Not a replacement for full graph traversal when you need actual paths or neighbor exploration
- Requires careful explanation of representatives, compression, and rank

## Performance Impact / Trade-Offs

Union-find shines when many connectivity checks happen over time. It trades away path details for near-constant connectivity updates. In product systems, that is a good trade only when group membership matters more than traversal history.

## Interview Questions With Strong Answers

### When would you pick union-find over BFS or DFS?

When connectivity is queried many times as edges are added. Re-running graph traversal each time is wasteful, while union-find updates groups incrementally.

### What do path compression and union by rank actually buy you?

They keep the representative trees shallow, so future `find` operations become extremely cheap in practice.

### What can union-find not answer well?

It cannot give me the path between two nodes or do general graph exploration. It is specifically a connectivity maintenance tool.

## Common Mistakes

- Using union-find when plain DFS/BFS is simpler
- Forgetting to compress paths or balance unions
- Thinking the structure stores full graph paths
- Not explaining why the problem shape is dynamic connectivity
