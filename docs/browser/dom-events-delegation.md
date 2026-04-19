---
title: DOM Events, Capture, Bubble & Delegation
category: browser
order: 2
---
# DOM Events, Capture, Bubble & Delegation

## 1-Line Intuition

Events travel through the DOM, and delegation lets one listener handle many child interactions.

## Why Interviewers Care

This is one of the most common frontend fundamentals questions.

## Visual Model

~~~mermaid
flowchart TD
    A[Window] --> B[Document]
    B --> C[Parent]
    C --> D[Target]
    D --> C
    C --> B
    B --> A
~~~

## 30-Second Cheat Sheet

- Capture goes down
- Bubble goes up
- Delegation listens high and handles many children

## Deep Dive

DOM events have phases, and understanding propagation is critical for real UIs. Delegation lets one parent listener handle events from many children, which simplifies dynamic interfaces and reduces listener churn. In interviews, strong answers connect propagation to performance, maintainability, and real component behavior.

## Minimal Code Example

~~~js
list.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  handleAction(button.dataset.action);
});
~~~

## Real-World Example

Menus, tables, and todo lists often use delegation so new child items work automatically.

## Pros

- Fewer listeners
- Works well for dynamic child elements

## Cons

- Requires careful target matching
- Can be confusing with nested handlers

## Limitations

- Not every event bubbles the same way

## Performance Impact / Related Metrics

- Can reduce listener overhead
- Bad handler logic can still hurt INP

## Interview Questions With Answers

### 1. Why is event delegation useful?

Because one parent listener can handle many child interactions, including dynamically added ones.

### 2. What is the difference between capture and bubble?

Capture runs from outer ancestors toward the target; bubble runs from the target back outward.

### 3. Why is target matching important?

Because the delegated handler must determine which child interaction actually happened.

## Common Mistakes

- Ignoring event.target vs currentTarget
- Delegating without robust selector checks
- Assuming every event bubbles identically
