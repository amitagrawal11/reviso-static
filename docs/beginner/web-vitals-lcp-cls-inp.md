---
title: Web Vitals (LCP, CLS, INP)
category: performance
order: 1
---
# Web Vitals (LCP, CLS, INP)

## 1-Line Intuition

LCP measures loading, CLS measures stability, and INP measures responsiveness.

## Why Interviewers Care

This topic shows whether you understand performance from the user’s perspective rather than only from the engineer’s perspective.

## Visual Model

~~~mermaid
flowchart LR
    A[Page starts loading] --> B[LCP: main content appears]
    B --> C[Layout shifts tracked over time]
    B --> D[User clicks or types]
    D --> E[INP: time until next paint after interaction]
~~~

## 30-Second Cheat Sheet

- LCP = how quickly important content becomes visible
- CLS = how much layout jumps unexpectedly
- INP = how fast interaction leads to visible response
- Good performance is not just transfer speed
- Main-thread work matters a lot

## Deep Dive

Core Web Vitals are deliberately user-centric. Instead of focusing only on bundle size or raw load events, they ask what the user actually experiences.

LCP is often dominated by hero text or hero images. CLS comes from unexpected movement, often due to missing dimensions or injected UI. INP is strongly tied to main-thread pressure, expensive event handlers, and long tasks.

A strong answer connects each metric to concrete causes and trade-offs. For example, lazy loading can help many images but hurt LCP if applied to the hero image.

## Minimal Code Example

~~~html
<img
  src="hero.avif"
  width="1200"
  height="630"
  fetchpriority="high"
  alt="Hero banner"
/>
~~~

## Real-World Example

A product page loads quickly on paper, but the main hero image is lazy loaded, the review widget shifts content downward, and clicking filters triggers a 250ms synchronous computation. That combination hurts LCP, CLS, and INP at the same time.

## Pros

- Focuses on real user experience
- Gives teams shared performance goals
- Helps prioritize high-impact fixes

## Cons

- Can be oversimplified if treated as the only performance truth
- Requires both lab and field thinking
- Some regressions are subtle and context-dependent

## Limitations

- These metrics do not cover every product-quality concern
- A good score does not guarantee perfect UX
- Field data can lag behind deployments

## Performance Impact / Related Metrics

- Directly tied to `LCP`, `CLS`, and `INP`
- Related to long tasks, image priority, font loading, layout stability, and render cost

## Interview Questions With Answers

### 1. Why can lazy loading hurt LCP?

Because if the LCP element is the hero image or other main content, deferring it delays when that important content becomes visible.

### 2. What usually causes bad CLS?

Late-loading images without reserved dimensions, injected banners, ads, or UI that pushes existing content after initial render.

### 3. What usually causes bad INP?

Long main-thread tasks, expensive event handlers, large rerenders, and heavy JavaScript execution after user input.

## Common Mistakes

- Treating Web Vitals as only a network problem
- Optimizing lab results without checking field impact
- Ignoring responsiveness while focusing only on load
- Forgetting that layout stability matters after initial render too
