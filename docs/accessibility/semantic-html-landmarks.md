---
title: Semantic HTML & Landmarks
category: accessibility
order: 1
---
# Semantic HTML & Landmarks

## 1-Line Intuition

Use native HTML elements that already describe structure and meaning before reaching for ARIA or custom div-based abstractions.

## Why Interviewers Care

This is one of the fastest ways to tell whether a frontend engineer builds accessible interfaces by default or only patches issues later. Strong answers show that semantics improve accessibility, maintainability, and sometimes even performance.

## Visual Model

~~~mermaid
flowchart TD
  A["Page"] --> B["header"]
  A --> C["nav"]
  A --> D["main"]
  A --> E["aside"]
  A --> F["footer"]
~~~

## 30-Second Cheat Sheet

- Native elements first
- Landmarks help assistive tech jump around the page
- Buttons should be buttons, links should be links
- Semantics reduce ARIA needs
- Good structure improves reading and navigation

## Deep Dive

Semantic HTML means choosing elements based on meaning, not just styling convenience. A `<button>` already supports keyboard activation, focus behavior, and expected semantics. A `<div>` pretending to be a button forces you to rebuild all of that manually.

Landmarks such as `header`, `nav`, `main`, `aside`, and `footer` help screen-reader users move around the page quickly. They create recognizable structural regions instead of a flat wall of generic containers.

In interviews, the strongest explanation is not just "use semantic HTML." It is:

- semantic elements reduce bugs
- they improve keyboard behavior
- they help screen-reader navigation
- they decrease the amount of ARIA you need to maintain

## Commented Interview-Ready Example

~~~html
<header>
  <h1>Career Dashboard</h1>
</header>

<nav aria-label="Primary">
  <ul>
    <li><a href="/jobs">Jobs</a></li>
    <li><a href="/applications">Applications</a></li>
  </ul>
</nav>

<main>
  <button type="button">Save filters</button> <!-- Native button gives correct semantics and keyboard behavior. -->
</main>
~~~

## Real-World Example

A dashboard built with semantic landmarks lets a screen-reader user jump directly to navigation, main content, or supporting information instead of tabbing through every element one by one.

## Pros

- Better accessibility with less custom work
- More predictable keyboard and assistive-tech behavior
- Cleaner DOM meaning for future maintainers

## Cons

- Some teams overuse generic containers out of styling habit
- Custom design systems sometimes fight native semantics if built poorly

## Limitations

- Semantics alone do not solve all accessibility issues
- Complex widgets still need additional behavior and sometimes ARIA

## Performance Impact / Trade-Offs

Semantic HTML is mostly about correctness and usability, but it also reduces the amount of custom JS needed to recreate native behavior.

## Interview Questions With Answers

### Why should you prefer semantic HTML over ARIA-heavy divs?

Because native elements already provide correct behavior and semantics, while ARIA-heavy custom structures are easier to get wrong and harder to maintain.

### What do landmarks do for assistive technology?

They create meaningful page regions that help users navigate directly to major sections like navigation or main content.

### What is a common semantic mistake in frontend codebases?

Using clickable divs instead of real buttons or links, which breaks expected keyboard and accessibility behavior.

## Common Mistakes

- Using divs for everything
- Styling links or buttons out of their native behavior
- Adding ARIA where native HTML would have been enough
