---
title: Prototypal Inheritance
category: foundations
order: 5
---
# Prototypal Inheritance

## 1-Line Intuition

JavaScript objects borrow behavior through a prototype chain instead of copying everything directly.

## Why Interviewers Care

This topic shows whether you understand JavaScript object lookup, shared methods, and what `class` syntax is really doing underneath.

## Visual Model

~~~mermaid
flowchart LR
    A[userInstance] --> B[User.prototype]
    B --> C[Object.prototype]
    C --> D[null]
~~~

## 30-Second Cheat Sheet

- Objects have own properties
- Missing properties are looked up on the prototype
- Prototype methods are shared across instances
- `class` is syntax sugar over prototypes
- Chain lookup stops at `null`

## Deep Dive

Every object in JavaScript can have an internal prototype link. When you access a property that is not found directly on the object, the engine walks up that chain until it finds a match or reaches `null`.

This matters because method sharing is one of the big memory and architecture wins of the model. If you define a method inside every constructor call, each instance gets its own copy. If you define it on the prototype, all instances reuse the same function.

From an interview perspective, the key is not just knowing the term “prototype.” It is being able to explain method sharing, lookup cost, and how instance state differs from shared behavior.

## Minimal Code Example

~~~js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

const ada = new User("Ada");
ada.greet();
~~~

## Real-World Example

A design-system component class can have instance-specific props like `label` or `size`, but shared behavior like rendering helpers should live on the prototype or equivalent shared structure.

## Pros

- Efficient method sharing
- Flexible object composition model
- Explains much of JavaScript’s object behavior

## Cons

- Less intuitive to many developers than classical inheritance
- Prototype lookup can confuse debugging
- Misplaced shared mutable state causes hard bugs

## Limitations

- Inheritance hierarchies can still become too deep
- Prototype-based reuse is not always the best composition strategy
- Many real apps prefer composition over inheritance for clarity

## Performance Impact / Related Metrics

- Shared prototype methods reduce per-instance memory usage
- Usually not a direct web-vitals issue
- Misusing per-instance methods can increase memory and GC pressure

## Interview Questions With Answers

### 1. Why define methods on the prototype instead of inside the constructor?

Because prototype methods are shared by all instances. That saves memory and avoids creating a new function for every instance.

### 2. What happens when you access a property that does not exist on an object?

JavaScript checks the object first, then walks up the prototype chain until it finds the property or reaches `null`.

### 3. Is `class` in JavaScript different from prototypes?

Not fundamentally. `class` is a cleaner syntax, but the underlying reuse model is still prototype-based.

## Common Mistakes

- Putting mutable arrays or objects on the prototype accidentally
- Thinking inheritance copies methods onto every instance
- Confusing own properties with inherited ones
