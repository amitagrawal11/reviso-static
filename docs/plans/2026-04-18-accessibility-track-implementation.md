# Accessibility Track Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated accessibility study track to Reviso with its own sidebar category, note library, routing, and checklist integration.

**Architecture:** Keep the app structure unchanged and extend the existing topic-driven routing model. Add a new `accessibility` category in `app.js`, route its note slugs through `server.js`, create ten markdown notes under `docs/accessibility`, and update the interview checklist so accessibility sits between browser platform and coding patterns.

**Tech Stack:** Node.js HTTP server, plain HTML/CSS/JS, Markdown notes, Mermaid

---

### Task 1: Add Accessibility To The App Model

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`

- [ ] **Step 1: Add the `accessibility` category in `app.js`**

Insert a new category after `browser` and before `coding`:

```js
  accessibility: [
    { title: "Semantic HTML & Landmarks", slug: "semantic-html-landmarks" },
    { title: "Keyboard Navigation & Focus Management", slug: "keyboard-navigation-focus-management" },
    { title: "ARIA Roles, States & Properties", slug: "aria-roles-states-properties" },
    { title: "Forms, Labels & Validation Accessibility", slug: "forms-labels-validation-accessibility" },
    { title: "Screen Readers & Announcements", slug: "screen-readers-announcements" },
    { title: "Color Contrast & Visual Accessibility", slug: "color-contrast-visual-accessibility" },
    { title: "Accessible Modals, Menus & Composite Widgets", slug: "accessible-modals-menus-composite-widgets" },
    { title: "Tables, Lists & Reading Order", slug: "tables-lists-reading-order" },
    { title: "Accessibility Testing & Auditing", slug: "accessibility-testing-auditing" },
    { title: "WCAG Basics For Frontend Engineers", slug: "wcag-basics-frontend-engineers" },
  ],
```

- [ ] **Step 2: Add the category label**

In `CATEGORY_LABELS`, add:

```js
  accessibility: "Accessibility",
```

- [ ] **Step 3: Update server category validation**

In `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`, update:

```js
const CATEGORY_PATTERN = /^(prep|foundations|internals|browser|accessibility|coding|dsa|performance|system|security)$/;
```

- [ ] **Step 4: Add route mappings for all accessibility topics**

Add these entries to `TOPIC_ROUTE_MAP`:

```js
  ["accessibility:semantic-html-landmarks", ["accessibility", "semantic-html-landmarks"]],
  ["accessibility:keyboard-navigation-focus-management", ["accessibility", "keyboard-navigation-focus-management"]],
  ["accessibility:aria-roles-states-properties", ["accessibility", "aria-roles-states-properties"]],
  ["accessibility:forms-labels-validation-accessibility", ["accessibility", "forms-labels-validation-accessibility"]],
  ["accessibility:screen-readers-announcements", ["accessibility", "screen-readers-announcements"]],
  ["accessibility:color-contrast-visual-accessibility", ["accessibility", "color-contrast-visual-accessibility"]],
  ["accessibility:accessible-modals-menus-composite-widgets", ["accessibility", "accessible-modals-menus-composite-widgets"]],
  ["accessibility:tables-lists-reading-order", ["accessibility", "tables-lists-reading-order"]],
  ["accessibility:accessibility-testing-auditing", ["accessibility", "accessibility-testing-auditing"]],
  ["accessibility:wcag-basics-frontend-engineers", ["accessibility", "wcag-basics-frontend-engineers"]],
```

- [ ] **Step 5: Run syntax checks**

Run:

```bash
node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js
node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js
```

Expected: no output

### Task 2: Create The Accessibility Notes

**Files:**
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/semantic-html-landmarks.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/keyboard-navigation-focus-management.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/aria-roles-states-properties.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/forms-labels-validation-accessibility.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/screen-readers-announcements.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/color-contrast-visual-accessibility.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/accessible-modals-menus-composite-widgets.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/tables-lists-reading-order.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/accessibility-testing-auditing.md`
- Create: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/wcag-basics-frontend-engineers.md`

- [ ] **Step 1: Use one shared note structure**

Every accessibility note must contain:

```md
## 1-Line Intuition
## Why Interviewers Care
## Visual Model
## 30-Second Cheat Sheet
## Deep Dive
## Commented Interview-Ready Example
## Real-World Example
## Pros
## Cons
## Limitations
## Performance Impact / Trade-Offs
## Interview Questions With Answers
## Common Mistakes
```

- [ ] **Step 2: Create the ten notes with topic-specific emphasis**

The notes must cover:

- native semantics and landmarks
- keyboard navigation and focus traps/restoration
- ARIA roles, states, and misuse
- accessible forms and validation
- screen readers and live regions
- contrast, focus visibility, and visual accessibility
- accessible modals, menus, and composite widgets
- tables, lists, and reading order
- manual and automated accessibility auditing
- WCAG basics using a practical frontend-engineer lens

Each file must include at least one Mermaid diagram and at least one HTML or JavaScript example.

- [ ] **Step 3: Verify file creation**

Run:

```bash
ls /Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility
```

Expected: all ten files are present

### Task 3: Update The Checklist

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/prep/google-frontend-architect-interview-checklist.md`

- [ ] **Step 1: Add an accessibility phase**

Insert a new phase after `Browser Platform` and before `Coding Patterns` with these links:

```md
## Phase 4: Accessibility

- [ ] [Semantic HTML & Landmarks](#/accessibility/semantic-html-landmarks)
- [ ] [Keyboard Navigation & Focus Management](#/accessibility/keyboard-navigation-focus-management)
- [ ] [ARIA Roles, States & Properties](#/accessibility/aria-roles-states-properties)
- [ ] [Forms, Labels & Validation Accessibility](#/accessibility/forms-labels-validation-accessibility)
- [ ] [Screen Readers & Announcements](#/accessibility/screen-readers-announcements)
- [ ] [Color Contrast & Visual Accessibility](#/accessibility/color-contrast-visual-accessibility)
- [ ] [Accessible Modals, Menus & Composite Widgets](#/accessibility/accessible-modals-menus-composite-widgets)
- [ ] [Tables, Lists & Reading Order](#/accessibility/tables-lists-reading-order)
- [ ] [Accessibility Testing & Auditing](#/accessibility/accessibility-testing-auditing)
- [ ] [WCAG Basics For Frontend Engineers](#/accessibility/wcag-basics-frontend-engineers)
```

- [ ] **Step 2: Renumber downstream phases if needed**

Keep the checklist readable after inserting the new accessibility phase.

- [ ] **Step 3: Add accessibility to limited-time prep**

Make sure at least one or two accessibility topics appear in the “If Time Is Limited” section.

### Task 4: Verification

**Files:**
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/*.md`

- [ ] **Step 1: Verify endpoints**

Run:

```bash
curl -s "http://localhost:4321/api/topic?category=accessibility&slug=semantic-html-landmarks" | sed -n '1,24p'
curl -s "http://localhost:4321/api/topic?category=accessibility&slug=keyboard-navigation-focus-management" | sed -n '1,24p'
curl -s "http://localhost:4321/api/topic?category=accessibility&slug=accessibility-testing-auditing" | sed -n '1,24p'
curl -s "http://localhost:4321/api/topic?category=accessibility&slug=wcag-basics-frontend-engineers" | sed -n '1,24p'
```

Expected: markdown content for all four topics

- [ ] **Step 2: Verify note structure**

Run:

```bash
for f in /Users/amitagrawal/Desktop/Projects/RevisoStatic/docs/accessibility/*.md; do
  printf '%s ' "$(basename "$f")"
  rg -n '^## 1-Line Intuition|^## Why Interviewers Care|^## Visual Model|^## 30-Second Cheat Sheet|^## Deep Dive|^## Commented Interview-Ready Example|^## Real-World Example|^## Pros|^## Cons|^## Limitations|^## Performance Impact / Trade-Offs|^## Interview Questions With Answers|^## Common Mistakes' "$f" | wc -l | tr -d ' '
  echo sections
done
```

Expected: each file reports `13 sections`

## Self-Review

- Spec coverage: category, routes, note files, checklist, and verification are all covered
- Placeholder scan: none
- Type consistency: slugs match across `app.js`, `server.js`, and checklist links
