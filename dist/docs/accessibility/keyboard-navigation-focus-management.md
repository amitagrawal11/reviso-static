---
title: Keyboard Navigation & Focus Management
category: accessibility
order: 2
---
# Keyboard Navigation & Focus Management

## 1-Line Intuition

If a user cannot operate your interface with a keyboard alone, the UI is incomplete.

## Why Interviewers Care

This topic tests whether you understand accessible interaction, not just accessible markup. It is especially relevant for dialogs, menus, command palettes, and any custom component with complex state.

## Visual Model

~~~mermaid
flowchart LR
  A["Tab into widget"] --> B["Focus moves predictably"]
  B --> C["Operate controls"]
  C --> D["Close or leave widget"]
  D --> E["Restore focus correctly"]
~~~

## 30-Second Cheat Sheet

- Every interactive control must be keyboard reachable
- Focus should move predictably
- Modals need focus traps and restoration
- Visible focus indicators matter
- Avoid keyboard dead ends

## Deep Dive

Keyboard accessibility is about more than pressing `Tab`. A usable experience needs:

- logical tab order
- visible focus state
- no trapped or lost focus
- support for Enter, Space, Escape, and arrow keys when appropriate

Focus management becomes critical in overlays and composite widgets. When a modal opens, focus should move into it. When it closes, focus should return to the triggering control. When a menu or listbox uses arrow keys, focus handling should follow a documented pattern instead of ad hoc behavior.

In interviews, the strongest answers talk about both mechanics and user experience: how focus enters, moves, and exits the widget.

## Commented Interview-Ready Example

~~~js
function openDialog(dialog, trigger) {
  const firstFocusable = dialog.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  dialog.hidden = false;
  firstFocusable?.focus(); // Move focus into the dialog when it opens.

  return () => {
    dialog.hidden = true;
    trigger?.focus(); // Restore focus to the control that opened the dialog.
  };
}
~~~

## Real-World Example

A command palette that opens with `Ctrl+K`, allows arrow-key navigation, closes with Escape, and returns focus to the trigger feels polished to all users and accessible to keyboard users.

## Pros

- Improves accessibility and general usability
- Makes custom widgets feel more professional
- Helps catch bad interaction design early

## Cons

- Easy to miss edge cases in custom components
- Focus bugs can be subtle and frustrating

## Limitations

- Keyboard support alone does not guarantee full accessibility
- Different widget types need different keyboard interaction models

## Performance Impact / Trade-Offs

Focus management rarely costs much performance-wise, but poor implementation can create unnecessary event complexity and brittle state handling.

## Interview Questions With Answers

### What should happen to focus when a modal opens?

Focus should move inside the modal, usually to the first meaningful interactive element or a deliberate focus target.

### Why is focus restoration important?

Because when a transient UI closes, the user needs a predictable place to continue from instead of losing context.

### What is a keyboard dead end?

A state where the user can tab into something but cannot move out, escape, or continue navigation correctly.

## Common Mistakes

- Removing focus outlines without replacement
- Forgetting to restore focus after closing overlays
- Making only mouse interactions work
