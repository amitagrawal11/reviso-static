---
title: ARIA Roles, States & Properties
category: accessibility
order: 3
---
# ARIA Roles, States & Properties

## 1-Line Intuition

ARIA fills semantic gaps when native HTML is not enough, but it should support semantics, not replace them blindly.

## Why Interviewers Care

Interviewers want to see whether you know when ARIA is necessary and when it is harmful. Strong frontend engineers know that “more ARIA” is not automatically “more accessible.”

## Visual Model

~~~mermaid
flowchart TD
  A["Native HTML available?"] --> B{"Yes"}
  B -- "Yes" --> C["Use native element first"]
  B -- "No" --> D["Add ARIA role/state carefully"]
  D --> E["Keep behavior in sync with semantics"]
~~~

## 30-Second Cheat Sheet

- Native semantics first
- ARIA does not add behavior by itself
- Roles describe what something is
- States and properties describe current status
- Keep ARIA values synchronized with UI state

## Deep Dive

ARIA is useful when building widgets that HTML does not model well by default, such as tabs, trees, or custom listboxes. But ARIA only describes intent to assistive technologies. It does not automatically create keyboard interaction, focus behavior, or state management.

That is why a strong answer always connects ARIA to actual behavior. For example:

- `aria-expanded="true"` must match the visible expanded state
- `aria-selected` must match the selected option
- `aria-live` should be used carefully so announcements are useful, not noisy

The best accessibility engineers also know the first rule of ARIA: if a native element already solves the problem, use that instead.

## Commented Interview-Ready Example

~~~html
<button
  type="button"
  aria-expanded="false"
  aria-controls="faq-panel-1"
  id="faq-trigger-1"
>
  What is your refund policy?
</button>

<div id="faq-panel-1" role="region" aria-labelledby="faq-trigger-1" hidden>
  You can request a refund within 30 days.
</div>
~~~

~~~js
function toggleDisclosure(button, panel) {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded)); // Keep ARIA state in sync with UI state.
  panel.hidden = expanded;
}
~~~

## Real-World Example

An accordion, tab list, or expandable navigation often needs ARIA state and relationship attributes so screen readers can understand what is open, selected, or controlled.

## Pros

- Helps describe custom widgets to assistive tech
- Bridges gaps where native semantics are insufficient
- Enables richer component communication

## Cons

- Easy to misuse
- Can create false confidence if behavior is still broken

## Limitations

- ARIA does not create keyboard support or focus handling automatically
- Wrong ARIA can make accessibility worse than having none

## Performance Impact / Trade-Offs

ARIA itself has little runtime cost, but keeping ARIA state synchronized with component state increases implementation discipline and testing responsibility.

## Interview Questions With Answers

### What is the first rule of ARIA?

If you can use a native HTML element or attribute instead, do that first before adding ARIA.

### Does ARIA make a div behave like a button?

No. ARIA describes semantics to assistive tech, but you still need to implement keyboard and interaction behavior.

### What is a common ARIA bug?

ARIA state says one thing while the UI visually shows another, which creates conflicting signals for assistive technologies.

## Common Mistakes

- Adding ARIA to everything by default
- Forgetting to keep state attributes synchronized
- Using ARIA to patch over poor native element choices
