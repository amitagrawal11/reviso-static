---
title: CSS Containment
category: performance
order: 6
---
# CSS Containment

## What It Is

CSS containment lets you isolate a subtree so layout, paint, style, or size calculations do not ripple unnecessarily through the rest of the page.

## Deep Dive

- Containment reduces invalidation scope.
- Layout containment limits how subtree layout affects outside layout.
- Paint containment limits painting effects.
- Stronger containment can improve performance but may change expected sizing behavior.
- It is most valuable for truly self-contained widgets.

## Diagram

~~~mermaid
flowchart LR
    A[Widget updates] --> B[Contained subtree]
    B --> C[Smaller layout and paint impact]
~~~

## Code Example

~~~css
.card-grid-widget {
  contain: layout paint;
}
~~~

## Google Architect Lens

This is the kind of optimization you mention when discussing large dashboards with many independently updating panels.

## Common Pitfalls

- Applying containment without understanding size effects.
- Using it where the component still depends on outside layout.
- Treating it as a blanket fix.

