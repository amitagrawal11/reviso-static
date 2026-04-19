---
title: Tables, Lists & Reading Order
category: accessibility
order: 8
---
# Tables, Lists & Reading Order

## 1-Line Intuition

Structure matters: if the reading order and relationships are wrong in the DOM, assistive technologies will experience the page differently from what you intended visually.

## Why Interviewers Care

This topic tests whether you understand that layout is not the same thing as semantic order. It is especially relevant for data tables, navigation lists, dashboards, and complex responsive layouts.

## Visual Model

~~~mermaid
flowchart LR
  A["DOM order"] --> B["Accessibility tree"]
  B --> C["Screen reader reading order"]
  D["Visual CSS layout"] --> E["May differ from DOM order"]
~~~

## 30-Second Cheat Sheet

- Use tables for tabular data, not layout
- Use lists for list-like content
- DOM order should match logical reading order
- CSS reordering can confuse users if semantics stay unchanged
- Headings and structure improve navigation

## Deep Dive

Tables and lists communicate relationships. A table says, “these cells belong to rows and columns.” A list says, “these items are members of a collection.” When you replace these with generic containers, assistive technologies lose that context.

Reading order matters just as much. Screen readers and keyboard users follow DOM order, not your visual arrangement alone. So if CSS visually moves a panel above another while the DOM still places it later, the experience can feel inconsistent or confusing.

Strong interview answers emphasize that accessibility is not only about per-element labels. It is also about preserving the logical structure of information.

## Commented Interview-Ready Example

~~~html
<table>
  <caption>Quarterly revenue by region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">APAC</th> <!-- Row header gives extra context for screen readers. -->
      <td>$2.4M</td>
    </tr>
  </tbody>
</table>

<ul>
  <li>Review Lighthouse report</li>
  <li>Check keyboard flow</li>
  <li>Validate focus restoration</li>
</ul>
~~~

## Real-World Example

A responsive dashboard might visually rearrange cards for mobile. If the DOM order no longer matches the logical flow of information, a screen-reader user can experience a confusing or misleading sequence.

## Pros

- Makes relationships between content explicit
- Improves screen-reader navigation and comprehension
- Encourages cleaner information architecture

## Cons

- Teams sometimes misuse tables for layout or ignore list semantics entirely
- Responsive design can tempt developers to separate visual and logical order too much

## Limitations

- Good structure alone does not solve interaction issues
- Some complex data tables need additional accessibility work beyond basic semantics

## Performance Impact / Trade-Offs

These semantic improvements are mostly neutral for performance. The real trade-off is design flexibility versus preserving logical structure and reading order.

## Interview Questions With Answers

### When should you use a table?

When the content is truly tabular and users need to understand row and column relationships.

### Why does DOM order matter even if the UI looks correct visually?

Because assistive technologies and keyboard navigation follow the DOM structure, not just the visual arrangement.

### Why use lists instead of generic div stacks?

Because lists communicate that the items belong to one collection, which is useful semantic information for assistive technologies.

## Common Mistakes

- Using tables for layout
- Flattening list or heading structure into generic containers
- Reordering content visually without thinking about reading order
