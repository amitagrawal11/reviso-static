---
title: WebSockets & SSE
category: browser
order: 9
---
# WebSockets & SSE

## 1-Line Intuition

WebSockets are for two-way live communication; SSE is for one-way live updates from server to client.

## Why Interviewers Care

This topic tests whether you can choose the right real-time transport instead of defaulting to the most complex option.

## Visual Model

~~~mermaid
flowchart LR
    A[Client] <--> B[WebSocket server]
    C[Client] --> D[SSE endpoint]
    D --> C
~~~

## 30-Second Cheat Sheet

- WebSocket = bidirectional persistent connection
- SSE = server pushes updates to client over HTTP
- SSE is simpler for one-way streams
- WebSocket is better for chat or collaboration
- Choice depends on interaction pattern, not hype

## Deep Dive

Real-time communication is not one-size-fits-all. If the client mostly listens for updates, SSE can be simpler, more HTTP-friendly, and easier to reason about. If both sides need to send data continuously, WebSockets are the stronger fit.

Architecturally, the question is about complexity versus capability. WebSockets introduce connection lifecycle, reconnection, backpressure, and coordination concerns. SSE keeps the model smaller, but it only flows from server to client.

In interviews, choosing the simpler mechanism when it fits is often a stronger answer than reaching for maximum power.

## Minimal Code Example

~~~js
const stream = new EventSource("/events");
stream.onmessage = (event) => {
  console.log(event.data);
};
~~~

## Real-World Example

Use SSE for stock updates or dashboard alerts where the browser mainly listens. Use WebSockets for a collaborative editor where users and server both send updates continuously.

## Pros

### WebSockets

- Full duplex communication
- Great for chat and collaboration
- Lower overhead than repeated polling

### SSE

- Simpler for one-way event streams
- Works naturally with HTTP semantics
- Often easier reconnection behavior

## Cons

### WebSockets

- More operational complexity
- Harder failure and reconnect management
- Requires more careful protocol design

### SSE

- One-way only
- Text/event-stream oriented
- Less suitable for highly interactive bidirectional apps

## Limitations

- Neither one removes the need for retry and backoff logic
- Both require resilience planning
- Network intermediaries and deployment setup matter

## Performance Impact / Related Metrics

- Can improve perceived freshness without polling overhead
- Poor reconnect or message handling can still hurt responsiveness
- Heavy message processing on the main thread can impact `INP`

## Interview Questions With Answers

### 1. When would you prefer SSE over WebSockets?

When the server mainly pushes updates to the client and the client does not need frequent two-way communication, such as a live dashboard or log stream.

### 2. When would WebSockets be a better choice?

For chat, collaborative editing, multiplayer interactions, or any product where both client and server send frequent real-time updates.

### 3. Why is polling often worse?

Polling adds repeated request overhead, wastes bandwidth when nothing changes, and introduces update latency between polls.

## Common Mistakes

- Choosing WebSockets when one-way streaming is enough
- Ignoring reconnect strategy
- Forgetting infrastructure constraints like proxies and load balancers
- Processing real-time messages too heavily on the main thread
