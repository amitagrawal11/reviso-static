---
title: Service Workers & PWA
category: browser
order: 10
---
# Service Workers & PWA

## 1-Line Intuition

A service worker is a programmable network middle layer that helps web apps cache, work offline, and behave more like installable applications.

## Why Interviewers Care

This topic shows whether you can reason about caching strategy, offline resilience, update behavior, and real-world client delivery architecture.

## Visual Model

~~~mermaid
flowchart LR
    A[Page request] --> B[Service Worker]
    B --> C{Cache hit?}
    C -- Yes --> D[Serve cached response]
    C -- No --> E[Fetch from network]
    E --> F[Optionally cache response]
~~~

## 30-Second Cheat Sheet

- Service workers intercept network requests
- They can cache static assets and responses
- PWAs also need a manifest for install metadata
- Cache strategy depends on data freshness needs
- Update handling is one of the hardest parts

## Deep Dive

Service workers run separately from the page and can respond to fetch events. That makes them powerful for app-shell caching, offline support, and resilience against flaky networks. But power comes with lifecycle complexity: install, activate, waiting, old worker takeover, and stale-asset issues all matter.

From an interview perspective, the best answers are strategic. You should be able to explain when to use cache-first, network-first, or stale-while-revalidate, and why those choices differ for JS bundles, images, and API responses.

Architecturally, service workers are about trust and consistency. A bad caching policy can leave users stuck on broken old assets after deployment.

## Minimal Code Example

~~~js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
~~~

## Real-World Example

A field-sales app caches its shell and recent records so users can still navigate and view essential data when the network is weak or unavailable.

## Pros

- Enables offline-friendly behavior
- Reduces repeat-visit network cost
- Can make apps feel more resilient and app-like

## Cons

- Update lifecycle is tricky
- Easy to create stale-cache bugs
- More operational complexity than plain HTTP caching

## Limitations

- Does not replace backend correctness
- Not all data should be cached aggressively
- Requires HTTPS and thoughtful rollout

## Performance Impact / Related Metrics

- Can improve repeat-load speed
- Helps reliability more than first-load speed in many cases
- Bad cache strategy can serve stale assets and break UX

## Interview Questions With Answers

### 1. When would you use cache-first?

For static assets that change rarely, such as hashed JavaScript bundles or icons, where speed matters more than always revalidating first.

### 2. When would you use network-first?

For dynamic content where freshness matters, such as important API data that should be current when online.

### 3. What is one of the hardest service-worker problems?

Managing updates safely, because users may still have an older worker and cached asset set after a new deployment.

## Common Mistakes

- Caching dynamic data too aggressively
- Ignoring update and invalidation strategy
- Serving stale app shells after deployment
- Treating service workers as a free performance win without lifecycle planning
