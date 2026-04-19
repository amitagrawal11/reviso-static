---
title: Chrome DevTools - Network Panel
category: browser
order: 12
---
# Chrome DevTools: Network Panel

## 1-Line Intuition
The Network panel shows where request time went, which resources blocked load, and whether caching actually worked.

## Why Interviewers Care
This is the fastest way to diagnose real-world startup and API issues in a browser interview setting.

## Visual Model

~~~mermaid
flowchart LR
  A["Record page load"] --> B["Inspect waterfall"]
  B --> C["Check initiators"]
  C --> D["Inspect headers"]
  D --> E["Verify cache status"]
  E --> F["Find blocking requests"]
~~~

## 30-Second Cheat Sheet

- Use the waterfall to spot slow resources
- Read initiators to find the source of a request
- Check request and response headers
- Confirm whether cache hit or miss happened
- Look for blocked, queued, or stalled time

## Deep Dive

The Network panel is more than a list of requests. The waterfall tells you when a request waited, when it connected, when it downloaded, and whether it was delayed by priority or concurrency limits. The Initiator column helps you trace a request back to a script, stylesheet, or document dependency. Headers show cache policy, compression, auth, CORS, and content negotiation details.

For interviews, the key skill is explanation. If the waterfall is slow, do not just say "the API is slow." Explain whether the delay came from queuing, DNS, TLS, server time, payload size, or client-side blocking. If a resource is unexpectedly fast, verify whether it came from memory cache, disk cache, or a service worker response.

## Minimal Code Example

~~~js
async function loadUser() {
  const res = await fetch('/api/user', {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  console.log('status:', res.status);
  console.log('etag:', res.headers.get('etag'));
  return res.json();
}
~~~

## Real-World Example

A script tag loads a vendor bundle earlier than expected, delaying the main app chunk. In the Network panel, the initiator and priority columns reveal that the browser scheduled the vendor file before the critical app code.

## Pros

- Makes request timing visible
- Helps debug cache and header problems quickly
- Connects browser behavior to server behavior

## Cons

- Waterfalls can be misread without context
- Multiple requests may overlap and confuse novice readers

## Limitations

- Timing numbers vary by environment and throttling settings
- Some causes sit outside the panel, such as server-side queueing

## Performance Impact / Related Metrics

- Useful for diagnosing TTFB, LCP bottlenecks, and bandwidth waste
- Shows whether requests are blocked, stalled, or over-fetched
- Helps verify compression and caching improvements

## Interview Questions With Answers

### 1. What does the waterfall tell you?
It shows the timing phases of each network request and helps identify blocking, priority, and download delays.

### 2. What does the Initiator column tell you?
It tells you which script, document, or dependency caused the request.

### 3. How do you verify cache behavior?
Check the status, headers, and timing details to see whether the response came from network, browser cache, or service worker.

## Common Mistakes

- Reading waterfall bars without checking headers
- Ignoring request initiators
- Assuming a short request time always means good performance
