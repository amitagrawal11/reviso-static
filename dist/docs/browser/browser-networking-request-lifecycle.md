---
title: Browser Networking & Request Lifecycle
category: browser
order: 5
---
# Browser Networking & Request Lifecycle

## 1-Line Intuition
Every request moves through routing, connection setup, HTTP exchange, caching, and possible interception before your UI sees a response.

## Why Interviewers Care
Strong frontend engineers can explain why a request is slow, why it was cached, and where service workers or proxies can change the result.

## Visual Model

~~~mermaid
flowchart LR
  A["fetch() call"] --> B["URL resolution"]
  B --> C["DNS lookup"]
  C --> D["TCP / QUIC connection"]
  D --> E["TLS handshake"]
  E --> F["HTTP request"]
  F --> G["Cache check"]
  G --> H["Service worker intercept"]
  H --> I["Response"]
~~~

## 30-Second Cheat Sheet

- Resolve the host
- Open or reuse a connection
- Negotiate security with TLS if needed
- Send headers and body
- Check cache layers and service workers
- Deliver the final response to the page

## Deep Dive

The lifecycle starts before HTTP even happens. The browser resolves the URL, checks DNS, opens or reuses a connection, and negotiates TLS for secure traffic. After the request is sent, the browser and server exchange headers that determine content type, caching behavior, compression, and auth state.

Caching is layered. The browser may satisfy a request from the memory cache or disk cache, but a service worker can also intercept the request and respond from its own logic or from the Cache Storage API. That means two identical requests can behave differently depending on cache mode, service worker code, and response headers such as `Cache-Control`, `ETag`, and `Vary`.

In a Google-style interview answer, connect the network path to user-visible latency. If the request is slow, ask whether the issue is DNS, connection setup, server processing, payload size, caching, or client-side blocking after the response arrives.

## Minimal Code Example

~~~js
const controller = new AbortController();

fetch('/api/profile', {
  signal: controller.signal,
  headers: {
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error('Request failed', err));

setTimeout(() => controller.abort(), 5000);
~~~

## Real-World Example

An authenticated dashboard feels slow even though the backend is healthy. The root cause is often a cache miss plus a fresh TLS connection plus a large JSON payload, not just server compute.

## Pros

- Explains network latency end to end
- Helps debug caching and interception issues
- Makes request timing data more meaningful

## Cons

- Easy to forget layered caches and intermediaries
- Can become overly low-level if you skip the UX impact

## Limitations

- Browser and network stack behavior varies by engine and protocol
- You often need traces or headers to know the real bottleneck

## Performance Impact / Related Metrics

- Impacts TTFB, LCP, and overall page load time
- Bad caching or large payloads can increase bandwidth and memory pressure
- Repeated handshakes and missed reuse add startup latency

## Interview Questions With Answers

### 1. What happens before an HTTP response is returned?
The browser may resolve DNS, open a connection, negotiate TLS, send the request, and then apply cache and service-worker logic before delivering the response.

### 2. What headers matter most for caching?
`Cache-Control`, `ETag`, `Last-Modified`, and `Vary` are common interview answers.

### 3. How can a service worker change request behavior?
It can intercept a request and respond from network, cache, or custom logic instead of going directly to the server.

## Common Mistakes

- Treating fetch as a single atomic step
- Forgetting service workers can intercept requests
- Ignoring headers when explaining cache behavior
