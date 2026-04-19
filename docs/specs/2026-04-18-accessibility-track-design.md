# Reviso Accessibility Track Design

## Goal

Add a dedicated `Accessibility` study track to Reviso so accessibility is treated as a first-class frontend interview area rather than a scattered subtopic.

## Why This Change

Accessibility is too important to bury inside `Browser Platform` or `System Design`.

For Google-style frontend interviews, accessibility can appear in:

- practical UI implementation questions
- architecture and component-system discussions
- performance and progressive-enhancement trade-off questions
- debugging and quality discussions

Making it a top-level category gives it the visibility and learning order it deserves.

## Design Decision

Add a new top-level category:

- `Accessibility`

Do not merge it into `Browser Platform` or `System Design`.

## Target Sidebar Placement

The new top-level order should become:

1. `Foundations`
2. `JS Internals`
3. `Browser Platform`
4. `Accessibility`
5. `Coding Patterns`
6. `DSA`
7. `Performance`
8. `System Design`
9. `Security`
10. `Interview Prep`

## Accessibility Topics To Add

Add these topics in this exact order:

1. `Semantic HTML & Landmarks`
2. `Keyboard Navigation & Focus Management`
3. `ARIA Roles, States & Properties`
4. `Forms, Labels & Validation Accessibility`
5. `Screen Readers & Announcements`
6. `Color Contrast & Visual Accessibility`
7. `Accessible Modals, Menus & Composite Widgets`
8. `Tables, Lists & Reading Order`
9. `Accessibility Testing & Auditing`
10. `WCAG Basics For Frontend Engineers`

## Notes Location

Create a new docs folder:

- `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility`

Each topic should live there as its own markdown file.

Suggested filenames:

- `semantic-html-landmarks.md`
- `keyboard-navigation-focus-management.md`
- `aria-roles-states-properties.md`
- `forms-labels-validation-accessibility.md`
- `screen-readers-announcements.md`
- `color-contrast-visual-accessibility.md`
- `accessible-modals-menus-composite-widgets.md`
- `tables-lists-reading-order.md`
- `accessibility-testing-auditing.md`
- `wcag-basics-frontend-engineers.md`

## Content Standard

Each accessibility note should use this structure:

1. `1-Line Intuition`
2. `Why Interviewers Care`
3. `Visual Model`
4. `30-Second Cheat Sheet`
5. `Deep Dive`
6. `Commented Interview-Ready Example`
7. `Real-World Example`
8. `Pros`
9. `Cons`
10. `Limitations`
11. `Performance Impact / Trade-Offs`
12. `Interview Questions With Answers`
13. `Common Mistakes`

## Accessibility Quality Bar

Each accessibility note should:

- include at least one Mermaid diagram where useful
- include at least one HTML or JavaScript example
- explain both correct implementation and common failure modes
- connect the topic to real product or component behavior
- be useful both for revision and for interview explanation

## Topic-Specific Emphasis

### Semantic HTML & Landmarks

Should emphasize:

- correct native elements first
- landmarks such as `main`, `nav`, `header`, `footer`, `aside`
- why semantics beat div soup
- screen-reader navigation benefits

### Keyboard Navigation & Focus Management

Should emphasize:

- tab order
- focus traps
- roving tabindex
- focus restoration after dialogs
- avoiding keyboard dead ends

### ARIA Roles, States & Properties

Should emphasize:

- native semantics before ARIA
- role and state mapping
- `aria-expanded`, `aria-controls`, `aria-selected`, `aria-live`
- overuse and misuse of ARIA

### Forms, Labels & Validation Accessibility

Should emphasize:

- label association
- descriptive error messaging
- accessible hint text
- required fields
- not relying on color alone

### Screen Readers & Announcements

Should emphasize:

- how screen readers consume the accessibility tree
- live regions
- announcing async state changes
- avoiding noisy or duplicated announcements

### Color Contrast & Visual Accessibility

Should emphasize:

- contrast ratio basics
- non-color affordances
- focus indicators
- reduced motion considerations when relevant

### Accessible Modals, Menus & Composite Widgets

Should emphasize:

- focus trapping
- keyboard support
- dismissal patterns
- correct ARIA for composite widgets
- when native elements are still better

### Tables, Lists & Reading Order

Should emphasize:

- proper table semantics
- when not to use tables
- list semantics
- DOM order vs visual order

### Accessibility Testing & Auditing

Should emphasize:

- manual testing
- keyboard-only testing
- screen-reader smoke testing
- Lighthouse / axe / DevTools checks
- why automation alone is insufficient

### WCAG Basics For Frontend Engineers

Should emphasize:

- POUR principles
- practical developer-facing interpretation
- common AA-level expectations
- how to use WCAG without memorizing every criterion

## App Changes Required

Implementation should include:

- adding the new `accessibility` category to `app.js`
- placing it after `Browser Platform` and before `Coding Patterns`
- adding new route mappings in `server.js`
- ensuring the new note files resolve through `/api/topic`

## Checklist Updates

The interview checklist should include an accessibility phase or explicit accessibility section containing these new topics.

Recommended placement:

- after `Browser Platform`
- before `Coding Patterns`

This keeps the learning order practical: understand the platform, then learn how to build inclusive UI on top of it.

## Non-Goals

This change does not include:

- implementing accessibility inside the Reviso app UI itself beyond the existing interface
- building automated accessibility tests for Reviso
- covering every WCAG criterion individually

## Risks And Mitigations

### Risk: Accessibility notes become too abstract

Mitigation:

- require concrete examples and interview-ready explanations
- tie every topic back to real component behavior

### Risk: Accessibility overlaps with browser or system design topics

Mitigation:

- keep the category focused on practical accessible UI engineering
- avoid duplicating unrelated browser internals material

### Risk: The sidebar becomes crowded

Mitigation:

- keep accessibility as one focused category with ten high-value topics
- avoid creating subcategories unless the track grows much larger later

## Recommended Implementation Order

1. Add the `Accessibility` category to `app.js`
2. Add route mappings in `server.js`
3. Create the ten accessibility notes
4. Update the interview checklist
5. Verify live note endpoints and sidebar ordering

## Self-Review

Checked for:

- placeholders: none
- contradictions: none
- ambiguity: category placement, topic list, filenames, and note structure are explicit
- scope: focused on adding a dedicated accessibility track only
