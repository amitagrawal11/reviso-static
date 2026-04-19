---
title: Web Workers
category: browser
order: 11
---
# Web Workers

## What It Is

Web Workers run JavaScript off the main thread so CPU-heavy work does not block rendering and input handling.

## Deep Dive

- Workers cannot directly touch the DOM.
- Communication happens by postMessage and structured cloning or transfer.
- They are excellent for parsing, transforms, and expensive computation.
- Workers help with throughput and responsiveness, not network latency.
- Transfer costs and orchestration overhead still matter.

## Diagram

~~~mermaid
flowchart LR
    A[Main thread UI] --> B[postMessage]
    B --> C[Worker thread computation]
    C --> D[postMessage result]
    D --> A
~~~

## Code Example

~~~js
const worker = new Worker('/csv-worker.js');
worker.postMessage(fileText);
worker.onmessage = (event) => renderRows(event.data);
~~~

## Google Architect Lens

Talk about when to move work off-thread, what the messaging overhead is, and how you measure whether the trade-off helped INP and dropped frames.

## Common Pitfalls

- Sending huge payloads too often.
- Expecting workers to fix poor UI architecture.
- Moving trivial work to a worker and increasing complexity for little gain.

