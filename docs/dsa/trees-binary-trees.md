---
title: Trees & Binary Trees
category: dsa
order: 2
---
# Trees & Binary Trees

## 1-Line Intuition

Trees model hierarchical data, and binary-tree interview questions are usually about choosing the right traversal and combining child results correctly.

## Why Interviewers Care

Trees expose whether you understand recursion, traversal order, and bottom-up reasoning. They also connect directly to UI trees, DOM hierarchies, routing trees, and component ownership structures.

## When To Use

Use tree thinking when data has parent-child relationships, each node may branch into children, and the question asks about depth, balance, path sums, traversal order, or subtree properties.

## Visual Model

~~~mermaid
flowchart TD
  A["8"] --> B["4"]
  A --> C["12"]
  B --> D["2"]
  B --> E["6"]
  C --> F["10"]
  C --> G["14"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| DFS traversal | O(n) | O(h) | `h` is tree height |
| BFS traversal | O(n) | O(w) | `w` is max width |
| Search in arbitrary binary tree | O(n) | O(h) | No ordering guarantee |
| Search in balanced BST | O(log n) | O(1) or O(h) | Only if BST property holds |
| Height / depth computation | O(n) | O(h) | Usually recursive |
| Balance check | O(n) optimized | O(h) | Bottom-up is best |

## 30-Second Cheat Sheet

- DFS is natural when you need subtree answers.
- BFS is natural when you care about levels.
- For binary trees, recursion often gives the cleanest code.
- For BSTs, sorted-order reasoning becomes available.
- Always ask whether you need preorder, inorder, postorder, or level order.

## Brute Force Approach

For a classic "is this tree height-balanced?" problem, brute force checks the height of every subtree separately and then recursively checks the children.

That means the same heights are recalculated many times.

- Time: O(n^2) in the worst case
- Space: O(h)

## Optimized Approach

The optimized approach does one postorder traversal. Each call returns either:
- the subtree height, or
- a sentinel value meaning "this subtree is already unbalanced"

That lets us combine validation and height computation in one pass.

- Time: O(n)
- Space: O(h)

## Commented Interview-Ready Code

~~~js
function isBalanced(root) {
  function height(node) {
    if (node === null) {
      return 0; // Empty subtree has height 0.
    }

    const leftHeight = height(node.left);
    if (leftHeight === -1) {
      return -1; // Left subtree is already unbalanced, bubble it up.
    }

    const rightHeight = height(node.right);
    if (rightHeight === -1) {
      return -1; // Right subtree is already unbalanced, bubble it up.
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1; // Current node breaks the balance rule.
    }

    return Math.max(leftHeight, rightHeight) + 1; // Return subtree height.
  }

  return height(root) !== -1;
}
~~~

## Dry Run

Check whether this tree is balanced:

~~~text
    3
   / \
  9  20
    /  \
   15   7
~~~

1. `height(9)` returns `1`
2. `height(15)` returns `1`
3. `height(7)` returns `1`
4. `height(20)` returns `2`
5. Root compares left height `1` and right height `2`
6. Difference is `1`, so root is balanced
7. Final answer: `true`

## Common Problem Types

- Max depth / min depth
- Level order traversal
- Lowest common ancestor
- Validate BST
- Diameter of binary tree
- Balanced tree / symmetric tree

## Real-World Frontend Analogy

The DOM is a tree. A component tree is also a tree. When a frontend engineer says "walk down the subtree," "find a shared ancestor," or "render level by level," they are already using tree reasoning. Interview tree problems are the compressed algorithm version of that mental model.

## Pros

- Excellent for modeling nested structure
- Recursion often matches the problem naturally
- Traversal patterns transfer to many other domains

## Cons

- Recursive code can feel magical if you do not state the return contract clearly
- Deep skewed trees can blow the call stack
- Different traversal orders are easy to mix up

## Limitations

- A binary tree is only one kind of tree; many real systems use n-ary trees
- BST optimizations only apply when ordering is guaranteed
- Some tree questions are really graph questions once parent pointers or extra edges appear

## Performance Impact / Trade-Offs

DFS usually uses less memory on wide trees, while BFS is better for level-order questions but can hold many nodes at once. In frontend systems, tree walks are common, so understanding depth, breadth, and recursion costs helps you reason about rendering hierarchies and traversal-heavy UI work.

## Interview Questions With Strong Answers

### Why is postorder traversal so useful in tree interviews?

Because child answers are often needed before the parent can compute its own answer. Balance, height, diameter, and many validation problems are naturally bottom-up.

### When would you choose BFS over DFS?

If the problem is about levels, nearest node, or shortest number of edges in an unweighted tree. Otherwise DFS is often simpler for subtree computation.

### What do you say if recursion depth worries you?

I would call that out explicitly and mention the iterative alternative with a stack or queue, especially for highly skewed trees.

## Common Mistakes

- Forgetting the base case for `null`
- Mixing BST logic into a plain binary-tree problem
- Recomputing subtree work repeatedly instead of combining results
- Using the wrong traversal for the question's goal
