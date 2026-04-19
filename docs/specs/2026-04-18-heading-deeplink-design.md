# Reviso Heading Deeplink Design

## Goal

Make every heading inside topic content linkable so users can jump directly to a specific section of a note and share that exact section.

## Why This Change

The notes are now large enough that users need section-level navigation, not just topic-level navigation. Deep links improve revision speed and make it easier to revisit a precise concept such as `Core Operations / Complexity Table` or `Interview Questions With Answers`.

## Design Decision

Use automatic heading anchors generated in the markdown-rendering layer.

Do not edit individual markdown files.

## Behavior

- Every rendered heading gets a stable slug id
- A small link icon appears on hover near the heading
- Clicking the icon updates the URL to the current topic plus the section anchor
- Opening that URL should load the topic and scroll directly to the requested section

## URL Shape

Keep the current route style and append a section fragment:

- topic only: `#/dsa/arrays-strings`
- topic + section: `#/dsa/arrays-strings#core-operations-complexity-table`

Implementation may internally parse the full `window.location.href` or `window.location.hash`, but the user-facing result should stay in this style.

## Rendering Rules

- Headings should be slugged automatically from visible text
- Matching should work for all note headings such as `h1`, `h2`, and `h3`
- Slugs should be lowercase and hyphen-separated
- Duplicate heading text within one note should get unique ids such as:
  - `example`
  - `example-2`

## UI Rules

- Link icon should be hidden by default
- Link icon should appear on heading hover and keyboard focus
- Clicking the icon should not navigate away from the topic
- The heading text itself should remain readable and uncluttered

## App Changes Required

Implementation should include:

- updating markdown heading rendering in `app.js`
- adding heading-anchor styling in `styles.css`
- updating route/hash parsing so section links restore correctly on load
- scrolling to the matching section after topic content is rendered

## Non-Goals

This change does not include:

- a floating table of contents
- per-note manual anchor management
- sidebar subsection navigation

## Recommended Implementation Order

1. Add custom heading rendering with stable slug ids
2. Add link-icon markup to rendered headings
3. Add CSS for hover/focus visibility
4. Parse section fragment on load
5. Scroll to the matching heading after topic render
6. Verify deep links across multiple topics

## Self-Review

Checked for:

- placeholders: none
- contradictions: none
- ambiguity: URL format, hover behavior, and rendering rules are explicit
