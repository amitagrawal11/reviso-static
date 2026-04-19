---
title: Chrome DevTools - Performance Panel
category: browser
order: 13
---
# Chrome DevTools: Performance Panel

## 1-Line Intuition
The Performance panel turns page activity into a timeline of scripting, rendering, painting, and frames.

## Why Interviewers Care
It is the clearest way to explain long tasks, main-thread saturation, and why an interaction feels janky.

## Visual Model

~~~mermaid
flowchart LR
  A["Record trace"] --> B["Main thread"]
  B --> C["Scripting"]
  B --> D["Rendering"]
  B --> E["Painting"]
  C --> F["Long tasks"]
  D --> G["Layout cost"]
  E --> H["Frame drops"]
~~~

## 30-Second Cheat Sheet

- Start a trace around the slow interaction
- Look for long tasks on the main thread
- Separate scripting from rendering and painting cost
- Check frames for dropped or slow rendering
- Correlate the trace with user input and UI changes

## Deep Dive

The Performance panel is about sequencing. A bad interaction usually shows one of three problems: too much JavaScript execution, too much rendering work, or too many paints and composites. A strong explanation names the dominant cost and the evidence from the trace.

When you inspect a trace, look at the call tree or flame chart to see which functions consumed time. Then ask whether the issue is algorithmic work, repeated DOM measurements, style recalculation, layout thrash, or expensive paint regions. If the page feels smooth but the trace looks busy, verify whether the work was split into smaller chunks or offloaded to a better moment.

## Minimal Code Example

~~~js
performance.mark('update-start');

renderLargeList(items);

performance.mark('update-end');
performance.measure('update', 'update-start', 'update-end');

const [entry] = performance.getEntriesByName('update');
console.log('render ms:', entry.duration);
~~~

## Real-World Example

A filter box feels laggy because each keystroke recomputes the visible list and forces layout before the browser can paint the next frame. In the Performance panel, that shows up as repeated long tasks and frame drops on the main thread.

## Pros

- Makes jank explainable
- Helps isolate scripting versus rendering cost
- Supports evidence-based performance fixes

## Cons

- Traces can be intimidating at first
- Easy to focus on a symptom instead of the root cause

## Limitations

- Trace quality depends on good reproduction
- Some issues are caused by network or third-party scripts outside the panel

## Performance Impact / Related Metrics

- Directly related to INP, frame rate, and long tasks
- Rendering-heavy traces often reveal layout and paint bottlenecks
- Helps validate improvements after optimization

## Interview Questions With Answers

### 1. What is a long task?
A chunk of main-thread work long enough to block responsiveness and delay input handling or painting.

### 2. How do you tell scripting from rendering cost?
The trace breaks the work into categories, so you can compare JavaScript execution against style, layout, and paint work.

### 3. Why does the Performance panel matter for INP?
Because input delay often comes from main-thread work that the trace can expose directly.

## Common Mistakes

- Looking only at summary numbers and ignoring the flame chart
- Blaming React without checking actual main-thread work
- Measuring once without reproducing the slow path
