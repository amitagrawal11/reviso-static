---
title: XSS, CSRF, CORS & CSP Basics
category: security
order: 1
---
# XSS, CSRF, CORS & CSP Basics

## 1-Line Intuition

Frontend security is mostly about controlling what code can run, what requests can be trusted, and what origins can interact.

## Why Interviewers Care

Security questions are common and separate strong frontend engineers from UI-only candidates.

## Visual Model

~~~mermaid
flowchart LR
    A[Untrusted input] --> B{Escaped or sanitized?}
    B -- No --> C[XSS risk]
    D[Cross-site request] --> E{Protected?}
    E -- No --> F[CSRF risk]
    G[Cross-origin request] --> H[CORS policy decides access]
    I[Page policy] --> J[CSP limits allowed script sources]
~~~

## 30-Second Cheat Sheet

- XSS = untrusted script execution
- CSRF = forged authenticated request
- CORS = browser access policy
- CSP = allowed resource policy

## Deep Dive

XSS is about injecting executable content into trusted pages. CSRF is about tricking a browser into sending authenticated requests. CORS is not a backend auth feature; it is a browser-enforced access control on cross-origin reads. CSP helps reduce damage by restricting where scripts and other resources can come from. In interviews, precise distinctions matter more than buzzwords.

## Minimal Code Example

~~~js
element.textContent = userInput; // safer than injecting raw HTML
~~~

## Real-World Example

Rendering user-generated content, embedding third-party scripts, and working with authenticated APIs all require these concepts.

## Pros

- Essential for safe frontend architecture

## Cons

- Easy to speak about vaguely without understanding mechanics

## Limitations

- No single header or token solves every security problem

## Performance Impact / Related Metrics

- Security features are usually about safety, though CSP and script policy can influence resource loading

## Interview Questions With Answers

### 1. What is the difference between XSS and CSRF?

XSS injects script into a trusted page; CSRF tricks the browser into sending an authenticated request.

### 2. Is CORS a security feature for your server?

It is primarily a browser-enforced access-control mechanism for cross-origin reads.

### 3. Why is CSP useful?

It restricts allowed resource sources and reduces the blast radius of some injection problems.

## Common Mistakes

- Saying CORS prevents all attacks
- Confusing sanitization with authentication
- Using innerHTML with untrusted content
