---
title: Browser Rendering Pipeline
category: browser
order: 4
---
# Browser Rendering Pipeline

## 1-Line Intuition
The browser turns HTML, CSS, and JavaScript into pixels through a staged pipeline.

## Why Interviewers Care
This is the foundation for explaining reflow, repaint, jank, and rendering performance trade-offs.

## Visual Model

~~~mermaid
flowchart LR
  A["HTML + CSS"] --> B["DOM + CSSOM"]
  B --> C["Render Tree"]
  C --> D["Layout"]
  D --> E["Paint"]
  E --> F["Composite"]
~~~

## 30-Second Cheat Sheet

- Parse first
- Layout calculates geometry
- Paint creates visual layers
- Composite assembles layers efficiently

## Deep Dive

The browser starts by parsing HTML into the DOM and CSS into the CSSOM. Those two structures combine into a render tree, which contains only the nodes that actually participate in visual output. From there, layout computes size and position, paint draws pixels into layers, and compositing stitches those layers together on screen.

In interviews, the important follow-up is not just naming the stages. You should explain what kinds of changes trigger each stage. A width change usually affects layout because geometry changes. A background-color change usually affects paint because the geometry stays the same. A transform or opacity change is often cheaper because it can stay on the compositor path.

The practical lesson is to batch DOM writes, avoid layout thrashing, and animate properties that do not force expensive main-thread work unless you have a good reason.

## Minimal Code Example

~~~js
const box = document.querySelector('.box');

box.style.width = '400px'; // Likely triggers layout because geometry changed
box.style.backgroundColor = 'tomato'; // Usually paint only
box.style.transform = 'translateX(20px)'; // Often composite-friendly
~~~

## Real-World Example

Animating `top` and `left` on a large card grid can cause repeated layout work and visible jank. Switching the animation to `transform` usually keeps the work cheaper and more predictable.

## Pros

- Gives a strong mental model for performance debugging
- Explains why some DOM changes are expensive
- Helps you reason about animation choices

## Cons

- Easy to oversimplify without talking about invalidation and batching
- Can sound theoretical if you do not connect it to traces or metrics

## Limitations

- Exact browser implementation details vary across engines
- The same style change can have different costs depending on the page

## Performance Impact / Related Metrics

- Layout and paint cost directly affect responsiveness
- Poor rendering choices can hurt INP and frame rate
- Excessive main-thread rendering work often shows up as long tasks

## Interview Questions With Answers

### 1. What is the difference between layout and paint?
Layout computes geometry, while paint draws pixels for visual styling.

### 2. Why are transform animations preferred?
Because they often avoid layout and can stay on the compositor path.

### 3. Why should frontend engineers know this deeply?
Because rendering behavior explains many real-world performance issues.

## Common Mistakes

- Confusing repaint with reflow
- Assuming every DOM change costs the same
- Ignoring layout thrash from alternating reads and writes
