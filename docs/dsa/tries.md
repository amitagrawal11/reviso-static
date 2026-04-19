---
title: Tries
category: dsa
order: 8
---
# Tries

## 1-Line Intuition

A trie stores strings character by character so shared prefixes are reused instead of rescanned.

## Why Interviewers Care

Tries test whether you can trade memory for faster prefix queries and explain why prefix-heavy problems need a different structure than plain maps or arrays.

## When To Use

Use a trie when prefix lookup is the main operation: autocomplete, command palettes, dictionary checks, search suggestions, or validating a stream of characters against known words.

## Visual Model

~~~mermaid
flowchart TD
  A["root"] --> B["c"]
  B --> C["a"]
  C --> D["t*"]
  C --> E["r*"]
  B --> F["o"]
  F --> G["d"]
  G --> H["e*"]
~~~

## Core Operations / Complexity Table

| Operation | Time | Space | Notes |
| --- | --- | --- | --- |
| Insert word of length `m` | O(m) | O(m) worst case | Shared prefixes reduce new nodes |
| Exact search | O(m) | O(1) extra | Follows character path |
| Prefix search | O(m) | O(1) extra | Stops at prefix node |
| Array/list prefix scan | O(n * m) | O(1) extra | Brute-force baseline |
| Enumerate all completions | O(p + output) | O(output) | `p` is prefix length |

## 30-Second Cheat Sheet

- Hash maps are great for exact lookup; tries are great for prefix lookup.
- Each node usually stores `children` plus an `isWord` flag.
- Shared prefixes are the whole reason the structure is useful.
- Memory overhead is the main trade-off.
- Interview follow-ups often ask for `insert`, `search`, and `startsWith`.

## Brute Force Approach

For autocomplete, brute force stores all words in an array and scans every word to see whether it starts with the query prefix.

- Time: O(n * m) per query in the worst case
- Space: O(n * m) to store the input strings

That gets expensive when the dictionary is large and queries happen frequently.

## Optimized Approach

A trie follows the prefix path character by character. If the path exists, you know all matching words live below that node.

- Insert: O(m)
- Search / startsWith: O(m)
- Extra memory: higher than a flat list because every node stores child references

## Commented Interview-Ready Code

~~~js
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }

      node = node.children.get(char);
    }

    node.isWord = true; // Mark the final node as a completed word.
  }

  search(word) {
    const node = this.walk(word);
    return node !== null && node.isWord;
  }

  startsWith(prefix) {
    return this.walk(prefix) !== null;
  }

  walk(text) {
    let node = this.root;

    for (const char of text) {
      if (!node.children.has(char)) {
        return null; // Prefix path breaks here.
      }

      node = node.children.get(char);
    }

    return node;
  }
}
~~~

## Dry Run

Insert `"cat"` and `"car"`, then search for `"car"` and prefix `"ca"`.

1. Insert `"cat"`:
   - root -> `c` -> `a` -> `t`
   - mark `t.isWord = true`
2. Insert `"car"`:
   - reuse `c` and `a`
   - create node `r`
   - mark `r.isWord = true`
3. Search `"car"`:
   - walk `c`, `a`, `r`
   - final node has `isWord = true`
   - return `true`
4. `startsWith("ca")`:
   - walk `c`, `a`
   - path exists
   - return `true`

## Common Problem Types

- Implement trie / prefix tree
- Autocomplete suggestions
- Search suggestions system
- Word dictionary with wildcard variants
- Replace words by roots
- Stream of characters / prefix validation

## Real-World Frontend Analogy

Command palettes, search bars, and IDE-like suggestion menus all care about fast prefix matching. A trie is the "structure-first" version of that UX: navigate directly to the shared prefix, then surface completions underneath.

## Pros

- Very fast prefix queries
- Shared prefixes reduce repeated comparison work
- Natural mental model for autocomplete

## Cons

- Higher memory usage than simple lists or maps
- More implementation complexity
- Harder to justify if prefix operations are rare

## Limitations

- Not ideal if you only need exact lookup
- Large alphabets increase node branching and memory usage
- Returning all completions can still be expensive if many words share a prefix

## Performance Impact / Trade-Offs

Tries trade memory for faster prefix lookup. In a frontend product, that trade can be worth it for suggestion-heavy experiences, but for small datasets a sorted array plus filtering may be simpler and good enough.

## Interview Questions With Strong Answers

### When is a trie better than a hash map?

When the question is about prefixes, not exact keys. A hash map can tell me whether `"cat"` exists, but it does not naturally help with `"ca..."` completions.

### What is the main downside of tries?

Memory overhead. Every node carries child references, so the structure can become much larger than the raw strings.

### Why might you still avoid a trie in production?

If the dataset is small or queries are infrequent, a simpler structure is easier to maintain and often fast enough.

## Common Mistakes

- Forgetting the `isWord` flag and treating every prefix as a full word
- Using a trie when exact lookup is all that matters
- Ignoring memory overhead in the explanation
- Confusing prefix existence with word existence
