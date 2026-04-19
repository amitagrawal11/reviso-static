---
title: Virtual List / Windowing
category: performance
order: 8
---
# Virtual List / Windowing

## What It Is

Windowing renders only the visible slice of a large list plus some overscan instead of rendering every row at once.

## Deep Dive

- The main win is reducing DOM count and layout work.
- Visible range calculation maps scroll position to item indexes.
- Fixed-height rows are easier; variable-height rows need measurement or estimation.
- Overscan reduces visual pop-in.
- Accessibility and keyboard navigation still need careful support.

## Diagram

~~~mermaid
flowchart TD
    A[10,000 items total] --> B[Viewport computes visible range]
    B --> C[Render 30 to 60 items]
    C --> D[Reuse DOM nodes as user scrolls]
~~~

## Code Example

~~~txt
Total list: 10,000 rows
Viewport needs rows 220 to 250
Render only that window plus buffer
~~~

## Google Architect Lens

Discuss memory, layout cost, DOM pressure, and the trade-off between implementation complexity and rendering budget.

## Common Pitfalls

- Breaking accessibility semantics.
- Mishandling dynamic row heights.
- Measuring too often and creating more work than you save.

