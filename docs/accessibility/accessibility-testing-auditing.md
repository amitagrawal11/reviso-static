---
title: Accessibility Testing & Auditing
category: accessibility
order: 9
---
# Accessibility Testing & Auditing

## 1-Line Intuition

Accessibility quality comes from testing real interaction paths, not just passing one automated scan.

## Why Interviewers Care

This shows whether you understand how to validate accessibility in practice. Mature frontend engineers know automated tools help, but they do not replace manual verification.

## Visual Model

~~~mermaid
flowchart TD
  A["Build UI"] --> B["Automated checks"]
  B --> C["Keyboard-only testing"]
  C --> D["Screen-reader smoke test"]
  D --> E["Fix issues and retest"]
~~~

## 30-Second Cheat Sheet

- Automation catches some issues, not all
- Keyboard-only testing is mandatory
- Screen-reader smoke testing adds crucial signal
- Audit common flows, not isolated components only
- Retest after fixes

## Deep Dive

Accessibility testing should be layered:

- automated checks for fast feedback
- keyboard testing for real interaction quality
- screen-reader testing for semantic and announcement correctness
- design/content review for contrast, labels, and clarity

Automated tools like Lighthouse, axe, and browser DevTools are useful, but they mostly catch detectable rule violations. They cannot fully tell you whether a menu is pleasant to navigate by keyboard or whether a live-region announcement is helpful instead of noisy.

A strong interview answer usually includes a workflow:

1. run automated checks
2. test keyboard-only flows
3. smoke-test with a screen reader
4. fix issues
5. retest the core flows

## Commented Interview-Ready Example

~~~js
// Example: very small custom check for missing accessible names on buttons.
document.querySelectorAll('button').forEach((button) => {
  const hasAccessibleName =
    button.textContent.trim() ||
    button.getAttribute('aria-label') ||
    button.getAttribute('aria-labelledby');

  if (!hasAccessibleName) {
    console.warn('Button is missing an accessible name', button);
  }
});
~~~

## Real-World Example

A modal may pass a Lighthouse check and still trap keyboard users incorrectly or fail to restore focus after close. That is why manual interaction testing matters.

## Pros

- Catches issues earlier
- Builds confidence in real interaction quality
- Helps teams move beyond checkbox-style compliance

## Cons

- Manual testing takes deliberate time
- Some teams rely too heavily on automated scores

## Limitations

- No single tool gives complete accessibility coverage
- Screen-reader testing varies across browser and assistive-tech combinations

## Performance Impact / Trade-Offs

Testing itself does not affect runtime performance, but good accessibility audits often improve overall UI quality and interaction robustness.

## Interview Questions With Answers

### Why is automated testing not enough for accessibility?

Because it catches many structural issues but cannot fully judge keyboard experience, focus flow, announcement quality, or overall usability.

### What is the fastest high-value manual accessibility test?

Try the whole flow with keyboard only, without touching the mouse, and see whether navigation, focus, and operation still make sense.

### What tools would you mention in an interview?

Lighthouse, axe, browser DevTools accessibility tooling, keyboard-only testing, and at least basic screen-reader smoke testing.

## Common Mistakes

- Treating Lighthouse as the whole accessibility strategy
- Testing static pages but not real flows
- Fixing one issue without retesting interaction behavior
