---
title: Heaps & Priority Queues
category: dsa
order: 7
---
# Heaps & Priority Queues

## 1-Line Intuition

A heap keeps the next most important item easy to access without fully sorting everything all the time.

## Why Interviewers Care

Heaps show whether you understand partial ordering, repeated best-item extraction, and how to optimize "top k" or scheduling problems better than brute-force sorting on every step.

## When To Use

Use a heap or priority queue when the problem repeatedly asks for the current smallest, largest, earliest, or highest-priority item and the collection keeps changing as you process it.

## Visual Model

~~~mermaid
flowchart TD
  A["Insert items"] --> B["Heap array"]
  B --> C["Peek best item"]
  B --> D["Pop best item"]
  D --> E["Reheapify"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Peek min/max | O(1) | O(1) | Root element |
| Insert | O(log n) | O(1) extra | Bubble up |
| Remove top | O(log n) | O(1) extra | Bubble down |
| Build heap from array | O(n) | O(1) extra or O(n) | Depends on implementation |
| Full sort for one answer | O(n log n) | Depends | Often good enough if only needed once |
| Top-k with size-k heap | O(n log k) | O(k) | Better when `k << n` |

## 30-Second Cheat Sheet

- Heap is the data structure; priority queue is the use case.
- Root gives instant access to the best item.
- Use a min-heap for "keep the top k largest items."
- Use a max-heap for repeated largest-first extraction.
- Do not use a heap if you only need one final sorted pass.

## Brute Force Approach

For a classic "find the kth largest element" problem, brute force sorts the whole array and reads the kth position.

- Time: O(n log n)
- Space: Depends on sort implementation

That is perfectly valid, but it does more work than needed when you only care about one rank.

## Optimized Approach

Maintain a min-heap of size `k`.

- Push each number into the heap
- If the heap grows larger than `k`, pop the smallest
- At the end, the root is the kth largest element

This keeps only the most relevant `k` values.

- Time: O(n log k)
- Space: O(k)

## Commented Interview-Ready Code

~~~js
class MinHeap {
  constructor() {
    this.data = [];
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) {
      return undefined;
    }

    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.data[parent] <= this.data[index]) {
        break;
      }

      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }

  bubbleDown(index) {
    const length = this.data.length;

    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = index * 2 + 2;

      if (left < length && this.data[left] < this.data[smallest]) {
        smallest = left;
      }

      if (right < length && this.data[right] < this.data[smallest]) {
        smallest = right;
      }

      if (smallest === index) {
        break;
      }

      [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
      index = smallest;
    }
  }

  size() {
    return this.data.length;
  }
}

function findKthLargest(nums, k) {
  const heap = new MinHeap();

  for (const num of nums) {
    heap.push(num);

    if (heap.size() > k) {
      heap.pop(); // Remove the smallest so only the k largest remain.
    }
  }

  return heap.peek();
}
~~~

## Dry Run

Find the 2nd largest element in `[3, 2, 1, 5, 6, 4]`.

1. Push `3` -> heap `[3]`
2. Push `2` -> heap `[2, 3]`
3. Push `1` -> heap size becomes `3`, pop `1` -> heap `[2, 3]`
4. Push `5` -> heap `[2, 3, 5]`, pop `2` -> heap `[3, 5]`
5. Push `6` -> heap `[3, 5, 6]`, pop `3` -> heap `[5, 6]`
6. Push `4` -> heap `[4, 6, 5]`, pop `4` -> heap `[5, 6]`
7. Root is `5`, so the 2nd largest element is `5`

## Common Problem Types

- Kth largest / kth smallest
- Top k frequent elements
- Merge k sorted lists
- Meeting rooms / interval scheduling
- Dijkstra's algorithm
- Task scheduling and prioritization

## Real-World Frontend Analogy

Browsers and app schedulers constantly prioritize work: urgent user input, visible rendering, lower-priority background tasks. That is priority-queue thinking. You may not implement the heap yourself in product code often, but the scheduling model is highly relevant.

## Pros

- Fast repeated access to the most important item
- Better than repeated full sorts when only the top item or top `k` matters
- Natural fit for scheduling and stream processing

## Cons

- Harder to implement from scratch than arrays or maps
- Not good for arbitrary lookup or deletion by value
- Heap order is partial, not globally sorted

## Limitations

- If you only need one final sorted answer, sorting may be simpler
- JavaScript has no built-in heap, so interviews often require you to explain or sketch one
- Debugging array-index heap code can be fiddly

## Performance Impact / Trade-Offs

Heaps trade full ordering for cheaper repeated best-item access. That is the right trade when new items keep arriving and only the current highest-priority element matters. In frontend systems, this maps well to prioritized rendering, queued background jobs, and top-results features.

## Interview Questions With Strong Answers

### What is the difference between a heap and a sorted array?

A heap only guarantees that the root is the best item. It does not keep every element globally sorted, which is why insertion is cheaper than maintaining full order.

### When is sorting still the better answer?

If I only need one final ranking and no repeated insert/pop operations, sorting is often simpler and completely acceptable.

### Why use a min-heap for kth largest?

Because I want to keep the largest `k` items seen so far. The smallest among those `k` sits at the root, which is exactly the kth largest overall.

## Common Mistakes

- Choosing min-heap when the logic needs max-heap, or vice versa
- Forgetting that heap order is not full sorted order
- Using a heap when a one-time sort is simpler and fast enough
- Mishandling bubble-up or bubble-down index math
