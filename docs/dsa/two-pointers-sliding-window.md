---
title: Two Pointers & Sliding Window
category: dsa
order: 5
---
# Two Pointers & Sliding Window

## 1-Line Intuition

Instead of restarting work for every subarray or pair, move a small number of boundaries through the data and reuse what you already know.

## Why Interviewers Care

This pattern is a reliable signal that you can optimize nested-loop brute force into linear-time scans. It also shows up often in frontend-friendly interview questions about strings, arrays, and visible ranges.

## When To Use

Use two pointers when two indices can move monotonically through data, often on sorted arrays. Use sliding window when the problem is about a contiguous range whose state can be updated incrementally as the window expands or shrinks.

## Visual Model

~~~mermaid
flowchart LR
  A["left"] --> B["active window"]
  C["right"] --> B
  B --> D["expand to include more"]
  D --> E["shrink until valid"]
~~~

## Core Operations / Complexity Table

| Pattern | Time | Space | Notes |
| --- | --- | --- | --- |
| Pair search in sorted array | O(n) | O(1) | Left/right move inward |
| Fixed-size sliding window | O(n) | O(1) | Reuse rolling state |
| Variable-size sliding window | O(n) | O(k) | Often map/set for counts |
| Brute-force all subarrays | O(n^2) or worse | Depends | Baseline to beat |

## 30-Second Cheat Sheet

- Contiguous range usually means sliding window.
- Sorted pair-sum style question usually means two pointers.
- The key interview move is maintaining a window invariant.
- Each pointer should usually move only forward, giving O(n) total work.
- Use a map or set when the window needs frequency or uniqueness tracking.

## Brute Force Approach

For a problem like "longest substring without repeating characters," brute force starts from every left boundary, grows rightward, and rebuilds a fresh set each time until a duplicate appears.

- Time: O(n^2)
- Space: O(k), where `k` is distinct characters in the current substring

It works, but it repeats nearly the same checks over and over.

## Optimized Approach

The optimized sliding-window solution keeps one active window `[left, right]` and a set of characters currently inside it.

When the right side introduces a duplicate:
- shrink from the left
- remove characters until the window becomes valid again

Each character enters and leaves the window at most once.

- Time: O(n)
- Space: O(k)

## Commented Interview-Ready Code

~~~js
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right += 1) {
    while (seen.has(s[right])) {
      seen.delete(s[left]); // Remove characters until the duplicate is gone.
      left += 1;
    }

    seen.add(s[right]);
    best = Math.max(best, right - left + 1); // Current window is valid here.
  }

  return best;
}
~~~

## Dry Run

Find the longest substring without repeats in `"abcaef"`.

1. Window `"a"` -> best `1`
2. Window `"ab"` -> best `2`
3. Window `"abc"` -> best `3`
4. Right hits `"a"` again, shrink from left until old `"a"` is removed
5. Window becomes `"bca"` -> best still `3`
6. Expand to `"bcae"` -> best `4`
7. Expand to `"bcaef"` -> best `5`

Answer: `5`

## Common Problem Types

- Two sum in sorted array
- Remove duplicates from sorted array
- Container with most water
- Longest substring / smallest valid window
- Maximum sum subarray of size `k`
- Minimum window substring

## Real-World Frontend Analogy

A virtualized list keeps only the currently visible rows plus a little buffer. That is window thinking: keep a range valid, update it incrementally as the user scrolls, and avoid recomputing the entire list from scratch on every frame.

## Pros

- Often turns O(n^2) scans into O(n)
- Uses local, incremental updates instead of recomputation
- Extremely common in interview questions on strings and arrays

## Cons

- The pattern can be hard to spot at first
- Window invariants are easy to break accidentally
- Some problems look similar but are not truly contiguous-range problems

## Limitations

- Sliding window generally needs contiguous data
- Two-pointer tricks often depend on sorted order or monotonic movement
- Some substring problems need more than a set and require careful frequency bookkeeping

## Performance Impact / Trade-Offs

This family of patterns is often the difference between a timeout and an accepted solution. In frontend systems, it maps well to visible ranges, rolling metrics, streaming text analysis, and "only update what changed" thinking.

## Interview Questions With Strong Answers

### How do you know a sliding window might fit?

I look for contiguous ranges, especially when the question asks for the longest, shortest, or maximum window that satisfies a condition.

### Why is the optimized window solution still O(n) even with a nested `while` loop?

Because each pointer only moves forward. Every character is added once and removed once, so the total number of pointer moves is linear.

### What is the most important thing to say while coding this pattern?

I state the window invariant out loud. For example: "The current window always contains unique characters." That keeps the logic honest.

## Common Mistakes

- Treating non-contiguous problems like sliding-window problems
- Forgetting to shrink until the window is valid again
- Rebuilding maps or sets from scratch inside the loop
- Moving pointers backward and losing the O(n) guarantee
