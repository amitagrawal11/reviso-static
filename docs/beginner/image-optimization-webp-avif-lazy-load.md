---
title: Image Optimization (WebP, AVIF, lazy load)
category: performance
order: 3
---
# Image Optimization (WebP, AVIF, lazy load)

## 1-Line Intuition

Image performance is mostly about serving the right image, in the right format, at the right time.

## Why Interviewers Care

Images dominate many pages’ transfer size and often control LCP, bandwidth cost, and layout stability.

## Visual Model

~~~mermaid
flowchart LR
    A[Choose image asset] --> B{In viewport early?}
    B -- Yes --> C[Eager or high-priority load]
    B -- No --> D[Lazy load]
    C --> E[Serve modern format and correct dimensions]
    D --> E
~~~

## 30-Second Cheat Sheet

- Use modern formats where supported
- Serve images near their display size
- Reserve width and height
- Lazy load offscreen images
- Do not lazy load the hero image

## Deep Dive

Image optimization is not just compression. It includes format choice, responsive sizing, delivery priority, and layout discipline. WebP and AVIF often reduce bytes substantially, but sending an oversized image can still waste bandwidth even in a modern format.

A key interview insight is priority. Lazy loading is great for images far below the fold, but harmful for the main hero image. Likewise, dimensions matter because the browser needs space reservation to avoid layout shift.

At scale, image strategy also touches CDN transforms, cacheability, device targeting, and authoring workflows.

## Minimal Code Example

~~~html
<picture>
  <source srcset="card.avif" type="image/avif" />
  <source srcset="card.webp" type="image/webp" />
  <img
    src="card.jpg"
    width="480"
    height="320"
    loading="lazy"
    alt="Card preview"
  />
</picture>
~~~

## Real-World Example

A content-heavy homepage uses AVIF for cards below the fold and reserves layout dimensions, but keeps the hero image eager and high priority to protect LCP.

## Pros

- Large bandwidth savings
- Better `LCP` when priority is correct
- Better `CLS` when dimensions are reserved

## Cons

- More delivery strategy to manage
- Browser support differences need fallback
- Wrong priority decisions can hurt UX

## Limitations

- Format optimization alone does not solve oversized delivery
- Visual quality trade-offs must be managed carefully
- Some images may still be expensive to decode and paint

## Performance Impact / Related Metrics

- Strong effect on `LCP`
- Width and height reservation reduces `CLS`
- Heavy image decoding can still impact responsiveness

## Interview Questions With Answers

### 1. Why should you not lazy load the hero image?

Because if the hero image is the main above-the-fold content, delaying it directly worsens LCP.

### 2. Why do width and height attributes matter?

They reserve layout space before the image loads, which helps prevent layout shifts and reduces CLS.

### 3. Is using AVIF enough to optimize images?

No. You still need correct sizing, correct loading priority, and a delivery strategy that matches the viewport and user flow.

## Common Mistakes

- Lazy loading important above-the-fold content
- Shipping one massive image to all devices
- Ignoring layout reservation
- Thinking format choice is the whole optimization story
