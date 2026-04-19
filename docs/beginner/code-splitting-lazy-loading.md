---
title: Code Splitting & Lazy Loading
category: performance
order: 2
---
# Code Splitting & Lazy Loading

## 1-Line Intuition

Code splitting breaks big bundles into smaller parts, and lazy loading downloads some of those parts only when needed.

## Why Interviewers Care

This topic reveals whether you understand startup cost, bundle strategy, user journeys, and the trade-off between smaller initial loads and later fetches.

## Visual Model

~~~mermaid
flowchart TD
    A[User opens app] --> B[Load shell bundle]
    B --> C[Render primary route]
    C --> D[User opens heavy feature]
    D --> E[Load lazy chunk]
    E --> F[Render heavy feature]
~~~

## 30-Second Cheat Sheet

- Smaller initial bundle improves startup
- Route-based splitting is often the first win
- Lazy loading is best for noncritical code
- Too many chunks can create request overhead
- Loading strategy should match user flow

## Deep Dive

A monolithic bundle forces every user to pay for every feature up front. Splitting lets you align loading cost with actual usage. This is particularly useful for admin panels, dashboards, report views, editors, or large visualization features.

The trade-off is that later interactions may now trigger an extra network request and parse cost. That is acceptable when the feature is not part of the critical first view, but risky when users need the feature immediately.

Architect-level reasoning here is about cost placement: move heavy work out of the critical path without creating delayed frustration later.

## Minimal Code Example

~~~js
const SettingsPage = React.lazy(() => import("./SettingsPage"));
~~~

## Real-World Example

An e-commerce app loads the product listing immediately, but defers the review analytics dashboard and 3D viewer until users actually open them.

## Pros

- Reduces initial JavaScript cost
- Improves startup for many users
- Aligns loading with feature usage

## Cons

- Adds later loading boundaries
- Can increase complexity around fallback UI
- Too many chunks can create overhead

## Limitations

- Does not fix expensive code inside the loaded chunk
- Network conditions still matter when lazy chunks load
- Not every feature should be deferred

## Performance Impact / Related Metrics

- Often improves `LCP` and startup responsiveness
- Can help `INP` by reducing startup main-thread work
- Poorly placed lazy boundaries can hurt perceived interaction speed

## Interview Questions With Answers

### 1. When should you lazy load a feature?

When it is not required for the initial view and users can tolerate loading it on demand later.

### 2. Why can too much code splitting be harmful?

Because you may replace one big cost with too many small network and parse costs, increasing request overhead and complexity.

### 3. What is usually the best first splitting strategy?

Route-level splitting, because routes often map naturally to user journeys and create clear boundaries.

## Common Mistakes

- Lazy loading above-the-fold content
- Creating chunks without meaningful user-flow boundaries
- Forgetting loading and error states
- Assuming splitting automatically makes code fast after it loads
