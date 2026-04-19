---
title: Event Emitter / Observer Pattern
category: coding
order: 12
---
# Event Emitter / Observer Pattern

## 1-Line Intuition

One part publishes events, many others subscribe and react.

## Why Interviewers Care

Frequently asked as a JS coding problem and useful for discussing decoupled architecture, event-driven UI, and cleanup.

## Visual Model

~~~mermaid
flowchart LR
    A[Publisher] --> B[Event emitter]
    B --> C[Subscriber 1]
    B --> D[Subscriber 2]
    B --> E[Subscriber 3]
~~~

## 30-Second Cheat Sheet

- on subscribes
- emit publishes
- off unsubscribes
- Cleanup is critical

## Deep Dive

An event emitter is a compact implementation of the observer pattern. It decouples publishers from subscribers, which is useful in UI infrastructure, analytics, and plugin systems. In interviews, it is not just about coding on, off, and emit; it is also about discussing listener leaks, ordering, once semantics, and whether this pattern is appropriate versus direct state flow.

## Minimal Code Example

~~~js
class EventEmitter {
  constructor() {
    this.events = new Map(); // Map event name -> subscribed handlers
  }

  on(type, handler) {
    const handlers = this.events.get(type) || []; // Reuse current subscribers if event already exists
    handlers.push(handler);
    this.events.set(type, handlers);

    return () => this.off(type, handler); // Returning cleanup mirrors real subscription APIs
  }

  emit(type, ...args) {
    const handlers = this.events.get(type) || [];
    for (const handler of [...handlers]) { // Copy array so emit stays safe if listeners mutate subscriptions
      handler(...args);
    }
  }

  off(type, handler) {
    const handlers = this.events.get(type) || []; // Missing event types simply behave like empty lists
    this.events.set(
      type,
      handlers.filter((fn) => fn !== handler), // Remove only the requested listener instance
    );
  }

  once(type, handler) {
    const unsubscribe = this.on(type, (...args) => {
      unsubscribe(); // Remove listener before running handler again
      handler(...args);
    });
  }
}
~~~

## Real-World Example

Use an emitter for analytics events or plugin hooks where multiple independent subscribers react to the same signal.

## Pros

- Loose coupling
- Flexible extension point

## Cons

- Harder tracing of data flow
- Listener leaks are common

## Limitations

- Not ideal for all state management
- Debugging can get messy at scale

## Performance Impact / Related Metrics

- Emit cost grows with subscriber count
- Forgotten listeners can hurt memory and responsiveness

## Interview Questions With Answers

### 1. Why is unsubscribe important?

Without cleanup, listeners can leak memory and keep stale behavior alive.

### 2. When is an emitter a good fit?

For decoupled event-driven behavior such as analytics, plugins, or infrastructure notifications.

### 3. When is it a poor fit?

When explicit state ownership or predictable data flow is more important than loose coupling.

## Common Mistakes

- Never removing listeners
- Using an emitter for everything
- Ignoring listener order or once semantics
