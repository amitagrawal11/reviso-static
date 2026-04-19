---
title: MutationObserver
category: browser
order: 8
---
# MutationObserver

## What It Is

MutationObserver watches the DOM for structural or attribute changes and reports them asynchronously.

## Deep Dive

- It is useful when integrating with DOM you do not fully control.
- It can observe child list changes, attributes, and text mutations.
- Notifications are batched rather than fired synchronously for every change.
- It is a bridge tool, not a replacement for proper state flow.
- Scope and cleanup matter because broad observation can become noisy and expensive.

## Diagram

~~~mermaid
flowchart TD
    A[DOM changes] --> B[MutationObserver queue]
    B --> C[Callback receives records]
    C --> D[Analytics or enhancement logic]
~~~

## Code Example

~~~js
const observer = new MutationObserver((records) => {
  console.log(records.length);
});
observer.observe(container, { childList: true, subtree: true });
~~~

## Google Architect Lens

Frame this as an escape hatch for third-party embeds, CMS regions, and hybrid systems where declarative ownership is incomplete.

## Common Pitfalls

- Observing the whole document without necessity.
- Forgetting to disconnect.
- Using MutationObserver where a normal data flow would be simpler.

