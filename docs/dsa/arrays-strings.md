---
title: Arrays & Strings
category: foundations
order: 1
---
# Arrays & Strings

## 1-Line Intuition

Most interview problems start as sequence problems, so arrays and strings are where you learn to scan, compare, group, and optimize contiguous data.

## Why Interviewers Care

They are the most common entry point for frontend algorithm rounds. If you are strong here, you can usually recognize when a problem needs hashing, two pointers, sliding window, binary search, or sorting.

## When To Use

Use array and string thinking when the problem is about ordered data, contiguous ranges, character processing, filtering, indexing, deduping, or comparing neighboring values.

## Visual Model

~~~mermaid
flowchart LR
  A["Sequence"] --> B["Read by index"]
  B --> C["Compare / transform"]
  C --> D["Add helper structure if needed"]
  D --> E["Optimize pattern"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Read by index | O(1) | O(1) | Arrays support direct lookup |
| Scan full array/string | O(n) | O(1) | Baseline pattern |
| Insert/delete at end | O(1) amortized | O(1) | Arrays are good stacks |
| Insert/delete in middle | O(n) | O(1) | Elements shift |
| Build string repeatedly with `+` | Often O(n^2) total | Depends | Watch repeated copying |
| Sort | O(n log n) | Depends | Often unlocks two-pointer solutions |

## 30-Second Cheat Sheet

- Arrays and strings are the home base for interview patterns.
- Start with a linear scan, then ask whether hashing, sorting, or a moving window helps.
- Strings often behave like arrays of characters.
- Repeated rebuilding can be expensive.
- Nested loops are the biggest thing to justify or eliminate.

## Brute Force Approach

For many sequence problems, brute force means:

- try every start position
- try every end position
- inspect or compare the resulting slice

That can work, but it often becomes O(n^2) or O(n^3) because the same elements are reprocessed repeatedly.

## Optimized Approach

The optimized path depends on the structure:

- use a hash map for counting or seen-checks
- use two pointers or a sliding window for contiguous constraints
- sort when ordering makes the search easier
- use binary search if the sequence is sorted or monotonic

The key skill is recognizing which optimization preserves correctness while avoiding repeated scans.

## Commented Interview-Ready Code

~~~js
function firstUniqueCharIndex(s) {
  const counts = new Map();

  for (const ch of s) {
    counts.set(ch, (counts.get(ch) || 0) + 1); // Count each character once up front.
  }

  for (let index = 0; index < s.length; index += 1) {
    if (counts.get(s[index]) === 1) {
      return index; // First character whose total count stayed at 1.
    }
  }

  return -1;
}
~~~

## Dry Run

Find the first unique character in `"leetcode"`.

1. Count characters: `l=1, e=3, t=1, c=1, o=1, d=1`
2. Scan from left to right
3. At index `0`, `l` has count `1`
4. Return `0`

## Common Problem Types

- first unique character
- longest substring with a condition
- merge sorted arrays
- dedupe sorted array
- anagram grouping
- prefix/suffix comparisons
- interval-style array processing

## Real-World Frontend Analogy

Search suggestions, token parsing, filtering lists, diffing visible rows, and validating user input all reduce to array or string processing. Strong sequence thinking shows up constantly in frontend work.

## Pros

- Foundational for nearly every interview pattern
- Easy to model with indexes and loops
- Maps naturally to real UI/data tasks

## Cons

- Easy to write O(n^2) solutions by accident
- Strings can hide costly copying if handled carelessly

## Limitations

- Arrays alone are not enough when repeated lookup or grouping matters
- Strings are immutable in JavaScript, so rebuilding them repeatedly can be expensive

## Performance Impact / Trade-Offs

Array and string solutions are often the simplest to write, but performance depends on whether you are rescanning the same data. The right helper structure can turn a brute-force solution into a linear one.

## Interview Questions With Strong Answers

### Why do arrays and strings show up so often in interviews?

Because many problems are really sequence-processing problems before they become anything more specialized.

### What is the usual first optimization move on sequence problems?

Ask whether a hash map, sorting, or a moving window can avoid repeated work.

### Why do strings and arrays often share the same patterns?

Because string problems are often solved with indexing, counting, windows, and comparisons across contiguous characters.

## Common Mistakes

- Jumping into nested loops too early
- Rebuilding substrings or arrays unnecessarily
- Forgetting that sorted input unlocks different tools
- Missing that a problem is really about counts or windows
