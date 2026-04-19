---
title: Browser Caching Strategies
category: browser
order: 6
---
# Browser Caching Strategies

## What It Is

Caching strategies define which assets can be reused, for how long, and when the browser must revalidate them with the server.

## Deep Dive

- Immutable hashed assets can be cached aggressively.
- HTML usually needs revalidation because it points to new app versions.
- ETag and Last-Modified support conditional requests.
- Cache-Control controls freshness and reuse behavior.
- A strong strategy reduces repeat-visit cost without serving stale app shells.

## Diagram

~~~mermaid
flowchart LR
    A[Request asset] --> B{Fresh in cache?}
    B -- Yes --> C[Use cached response]
    B -- No --> D[Revalidate or fetch]
    D --> E[Update cache]
~~~

## Code Example

~~~txt
app.9a13f.js -> Cache-Control: public, max-age=31536000, immutable
index.html   -> Cache-Control: no-cache
~~~

## Google Architect Lens

Talk about caching as a deployment contract. A bad caching plan creates version skew, broken JS, and hard-to-debug user reports at scale.

## Common Pitfalls

- Long-caching HTML.
- Using unhashed asset filenames with long cache lifetimes.
- Forgetting CDN and browser cache interactions.

