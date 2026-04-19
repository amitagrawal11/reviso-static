---
title: Chrome DevTools - Application Panel & Storage Debugging
category: browser
order: 15
---
# Chrome DevTools: Application Panel & Storage Debugging

## 1-Line Intuition
The Application panel is where you inspect client-side persistence, storage quotas, service-worker caches, and session state.

## Why Interviewers Care
It shows whether you understand how frontend apps survive reloads, sign-ins, offline mode, and storage bugs.

## Visual Model

~~~mermaid
flowchart LR
  A["App state"] --> B["Cookies"]
  A --> C["localStorage / sessionStorage"]
  A --> D["IndexedDB"]
  A --> E["Cache Storage"]
  A --> F["Service worker"]
  B --> G["Quota and expiration"]
  C --> G
  D --> G
  E --> G
~~~

## 30-Second Cheat Sheet

- Cookies handle server-visible session state
- localStorage is simple but synchronous
- sessionStorage is tab-scoped
- IndexedDB handles structured async data
- Cache Storage and service workers support offline-first behavior
- Quota and eviction can explain mysterious data loss

## Deep Dive

The Application panel is the quickest place to see what the browser is actually storing. Cookies matter when auth, SameSite, or expiry behavior is wrong. localStorage and sessionStorage are useful for simple state, but they are not magic: they can be cleared, blocked, or desynchronized across tabs. IndexedDB is better for structured data and larger payloads, while Cache Storage is often tied to service workers and offline support.

Good interview answers connect storage to user impact. If a login does not persist, inspect cookies and SameSite settings. If offline data disappears, inspect IndexedDB and quota. If a service worker serves stale data, inspect the cache entries and versioning strategy.

## Minimal Code Example

~~~js
localStorage.setItem('theme', 'dark');
sessionStorage.setItem('draft', 'hello');

const request = indexedDB.open('app-db', 1);
request.onupgradeneeded = () => {
  request.result.createObjectStore('todos', { keyPath: 'id' });
};

document.cookie = 'session=abc123; Path=/; Secure; SameSite=Lax';
~~~

## Real-World Example

A user logs out but still sees old data after refresh. The Application panel often reveals that a cookie was cleared correctly, but IndexedDB or Cache Storage still holds stale authenticated content.

## Pros

- Gives direct visibility into browser persistence
- Helps debug auth, offline, and quota bugs
- Makes storage-related state easy to inspect

## Cons

- Easy to confuse storage layers with each other
- Browser privacy rules can change behavior across environments

## Limitations

- Not every storage API is equally visible or easy to interpret
- Quota and eviction behavior can vary by browser and device

## Performance Impact / Related Metrics

- Synchronous storage access can hurt responsiveness
- Oversized storage use can increase quota pressure and eviction risk
- Large caches or databases may affect startup and memory usage

## Interview Questions With Answers

### 1. When should you use IndexedDB instead of localStorage?
Use IndexedDB when you need async, structured, or larger-scale client-side storage.

### 2. Why is localStorage often discouraged for heavy use?
Because it is synchronous and can block the main thread.

### 3. What can cause stale auth or offline data?
Cookies, service-worker caches, IndexedDB, or quota-related retention can all play a role.

## Common Mistakes

- Treating cookies and localStorage as interchangeable
- Ignoring service-worker caches during debugging
- Forgetting quota and eviction can clear data
