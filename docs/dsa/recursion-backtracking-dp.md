---
title: Recursion, Backtracking & DP Basics
category: dsa
order: 10
---
# Recursion, Backtracking & DP Basics

## 1-Line Intuition

Recursion solves a problem in terms of smaller versions of itself, backtracking explores choices and undoes them, and dynamic programming saves repeated subproblem work.

## Why Interviewers Care

This trio shows whether you can reason about state, base cases, branching, and optimization from exponential brute force to efficient memoized or tabulated solutions.

## When To Use

Use recursion when the problem is naturally hierarchical or self-similar. Use backtracking when you must explore combinations, permutations, or paths. Use dynamic programming when recursive subproblems overlap and caching or table-building avoids recomputation.

## Visual Model

~~~mermaid
flowchart TD
  A["Problem"] --> B["Recursive breakdown"]
  B --> C{"Many choices?"}
  C -- Yes --> D["Backtracking: try / undo"]
  C -- No --> E{"Repeated subproblems?"}
  E -- Yes --> F["DP: memoize / tabulate"]
  E -- No --> G["Plain recursion"]
~~~

## Core Operations / Complexity Table

| Pattern | Time | Space | Notes |
| --- | --- | --- | --- |
| Plain recursion | Often exponential or O(branch^depth) | O(depth) | Depends on branching |
| Backtracking search | Worst-case exponential | O(depth) | Explores and undoes state |
| DP with memoization | Usually number of states * transition cost | O(states) | Top-down cache |
| DP with tabulation | Usually number of states * transition cost | O(states) or less | Bottom-up table |

## 30-Second Cheat Sheet

- Base case stops recursion.
- Backtracking is recursion plus "undo the choice."
- DP is what you do when recursion repeats the same subproblem.
- Memoization keeps recursive structure; tabulation builds answers iteratively.
- Always define the state clearly before writing DP.

## Brute Force Approach

For a problem like climbing stairs, brute-force recursion says:

- ways from step `n` = ways from `n - 1` + ways from `n - 2`
- recurse until hitting base cases

That is easy to write, but it recomputes the same states again and again.

- Time: O(2^n)
- Space: O(n) recursion depth

## Optimized Approach

Memoized DP stores the answer for each step count the first time it is computed.

When the same state appears again, return the cached result immediately instead of branching again.

- Time: O(n)
- Space: O(n)

## Commented Interview-Ready Code

~~~js
function climbStairs(n) {
  const memo = new Map();

  function dp(stepsRemaining) {
    if (stepsRemaining <= 2) {
      return stepsRemaining; // 1 -> 1 way, 2 -> 2 ways.
    }

    if (memo.has(stepsRemaining)) {
      return memo.get(stepsRemaining); // Reuse solved subproblem.
    }

    const ways =
      dp(stepsRemaining - 1) + dp(stepsRemaining - 2);

    memo.set(stepsRemaining, ways);
    return ways;
  }

  return dp(n);
}
~~~

## Dry Run

Compute `climbStairs(5)`.

1. Need `dp(4) + dp(3)`
2. `dp(4)` needs `dp(3) + dp(2)`
3. `dp(3)` needs `dp(2) + dp(1)` -> `2 + 1 = 3`
4. Cache `dp(3) = 3`
5. `dp(4) = 3 + 2 = 5`, cache it
6. Original call becomes `dp(5) = dp(4) + dp(3) = 5 + 3 = 8`
7. Final answer: `8`

Without memoization, `dp(3)` would have been recomputed multiple times.

## Common Problem Types

- Tree recursion and divide-and-conquer
- Generate subsets, permutations, combinations
- N-Queens, Sudoku, word search
- Climbing stairs, house robber, coin change
- Longest common subsequence, edit distance
- Grid path counting

## Real-World Frontend Analogy

Recursive thinking shows up in nested UI trees. Backtracking feels like trying layout or filter combinations and undoing them. DP maps to caching expensive derived state so you do not recompute the same result tree every time inputs repeat.

## Pros

- Expressive for structured problems
- Backtracking cleanly explores choice trees
- DP can turn impossible brute-force runtimes into practical ones

## Cons

- Hard to debug if the state definition is vague
- Recursive call stacks can get deep
- DP can feel abstract until the state and transition are written clearly

## Limitations

- Not every repeated-looking problem actually needs DP
- Backtracking can still be exponential even when implemented correctly
- JavaScript recursion depth is limited for very deep inputs

## Performance Impact / Trade-Offs

The major trade-off is memory for speed. Memoization and tabulation store intermediate answers so runtime drops dramatically, but they consume extra space. In frontend systems, the same trade appears whenever we cache computed results to avoid redoing expensive work.

## Interview Questions With Strong Answers

### How do you know when to switch from recursion to DP?

When recursive calls overlap. If the same subproblem appears repeatedly, caching those answers is the signal that DP will help.

### What makes backtracking different from normal recursion?

Backtracking explores a choice, recurses, then explicitly undoes that choice so another branch can be tried from a clean state.

### How do you explain DP clearly in an interview?

I define the state, the recurrence or transition, the base cases, and whether I prefer memoization or tabulation for the problem's constraints.

## Common Mistakes

- Missing or incorrect base cases
- Mutating shared state in backtracking without undoing it
- Jumping into DP without defining the state
- Memorizing formulas instead of explaining why subproblems overlap
