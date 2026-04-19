---
title: Accessible Modals, Menus & Composite Widgets
category: accessibility
order: 7
---
# Accessible Modals, Menus & Composite Widgets

## 1-Line Intuition

Custom widgets must recreate the behavior, semantics, and keyboard interaction that native controls give you for free.

## Why Interviewers Care

This is a high-signal frontend topic because it combines structure, focus, ARIA, keyboard support, and state management in one practical area.

## Visual Model

~~~mermaid
flowchart TD
  A["Open composite widget"] --> B["Move focus intentionally"]
  B --> C["Support keyboard interactions"]
  C --> D["Maintain ARIA/state sync"]
  D --> E["Close and restore focus"]
~~~

## 30-Second Cheat Sheet

- Move focus into overlays
- Trap focus in modals
- Support Escape and arrow keys where expected
- Keep ARIA state synchronized
- Restore focus when closing

## Deep Dive

Composite widgets such as modals, menus, listboxes, tablists, and custom dropdowns are where accessibility mistakes multiply fast. Native elements handle a lot of interaction automatically, but custom widgets require you to recreate:

- keyboard entry and exit
- navigation inside the widget
- ARIA semantics
- state synchronization
- focus restoration

For modals specifically:

- focus should move inside
- background content should not remain interactable
- Escape should usually close the modal
- focus should return to the trigger after closing

For menus and list-like widgets, arrow-key behavior and selected/active state handling are often as important as the visual design.

## Commented Interview-Ready Example

~~~js
function trapFocus(dialog) {
  const focusables = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  function onKeyDown(event) {
    if (event.key === 'Tab' && event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus(); // Wrap backwards to keep focus inside the dialog.
    } else if (event.key === 'Tab' && !event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus(); // Wrap forwards to keep focus inside the dialog.
    }
  }

  dialog.addEventListener('keydown', onKeyDown);
  first?.focus();

  return () => dialog.removeEventListener('keydown', onKeyDown);
}
~~~

## Real-World Example

A custom account menu that works with mouse hover but not with keyboard arrows, Escape, or correct focus management feels fine to some developers but broken to many users.

## Pros

- Makes advanced UI patterns usable by more people
- Improves consistency and quality of component systems
- Reduces accessibility regressions in reusable widgets

## Cons

- Easy to get wrong
- Requires more testing than simple static content

## Limitations

- Native elements are still better when they can meet the need
- Different widget patterns have different expected keyboard models

## Performance Impact / Trade-Offs

Composite-widget accessibility rarely affects runtime meaningfully, but it increases implementation complexity. The trade-off is between convenience and building a widget users can actually operate correctly.

## Interview Questions With Answers

### What makes an accessible modal?

Focus moves into it, focus stays inside while it is open, background interaction is constrained, Escape usually closes it, and focus returns to the trigger when it closes.

### Why are custom dropdowns hard to make accessible?

Because once you stop using native controls, you have to recreate semantics, keyboard interaction, and focus behavior yourself.

### When should you avoid building a custom composite widget?

When a native control already supports the use case well enough, because native behavior is often more robust and cheaper to maintain.

## Common Mistakes

- Forgetting focus trapping or restoration
- Adding ARIA without matching keyboard behavior
- Building overly custom widgets where native HTML would have worked
