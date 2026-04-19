---
title: MyPromise (Prototype-Based)
category: coding
order: 5
---
# MyPromise (Prototype-Based)

## 1-Line Intuition

A prototype-based `MyPromise` shows the core promise mechanics using constructor functions and methods attached on `.prototype`.

## Why Interviewers Care

This combines async reasoning with object-model knowledge. It tests whether you understand promise state transitions, queued handlers, and older-school JavaScript patterns like constructor functions and prototypes.

## Visual Model

~~~mermaid
flowchart TD
  A["new MyPromise(executor)"] --> B["state = pending"]
  B --> C{"resolve or reject called?"}
  C -- "resolve" --> D["state = fulfilled"]
  C -- "reject" --> E["state = rejected"]
  D --> F["flush queued success handlers"]
  E --> G["flush queued failure handlers"]
~~~

## 30-Second Cheat Sheet

- Promise state changes only once
- Pending handlers must be queued
- Settled handlers should run asynchronously
- `then` creates a new promise for chaining
- This is interview-scoped, not full spec compliance

## Deep Dive

The prototype-based version is useful because it makes the mechanics explicit:

- constructor initializes state and queues
- `.then`, `.catch`, and `.finally` live on `MyPromise.prototype`
- `resolve` and `reject` transition from `pending` exactly once
- queued callbacks flush later, not synchronously in the same call stack

In an interview, the goal is not to recreate every Promise/A+ edge case. The goal is to show that you understand the internal state machine and basic chaining model. You should be honest about limitations such as missing thenable assimilation edge cases or incomplete microtask semantics.

## Commented Interview-Ready Code

~~~js
function MyPromise(executor) {
  this.state = 'pending';
  this.value = undefined;
  this.handlers = [];

  const resolve = (value) => {
    if (this.state !== 'pending') {
      return; // A promise settles only once.
    }

    this.state = 'fulfilled';
    this.value = value;
    this.flushHandlers();
  };

  const reject = (reason) => {
    if (this.state !== 'pending') {
      return;
    }

    this.state = 'rejected';
    this.value = reason;
    this.flushHandlers();
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.prototype.flushHandlers = function () {
  queueMicrotask(() => {
    while (this.handlers.length > 0) {
      const handler = this.handlers.shift();
      const callback =
        this.state === 'fulfilled' ? handler.onFulfilled : handler.onRejected;

      if (!callback) {
        if (this.state === 'fulfilled') {
          handler.resolve(this.value); // Pass through when no fulfillment handler exists.
        } else {
          handler.reject(this.value); // Pass through rejection when no error handler exists.
        }
        continue;
      }

      try {
        const result = callback(this.value);
        handler.resolve(result); // Interview-scoped chaining, not full thenable assimilation.
      } catch (error) {
        handler.reject(error);
      }
    }
  });
};

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    this.handlers.push({ onFulfilled, onRejected, resolve, reject });

    if (this.state !== 'pending') {
      this.flushHandlers(); // Already settled: schedule handlers immediately.
    }
  });
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

MyPromise.prototype.finally = function (onFinally) {
  return this.then(
    (value) => {
      onFinally?.();
      return value;
    },
    (reason) => {
      onFinally?.();
      throw reason;
    },
  );
};
~~~

## Dry Run / Execution Flow

For:

```js
new MyPromise((resolve) => resolve(42))
  .then((value) => value + 1)
  .then((value) => console.log(value));
```

1. Promise starts in `pending`
2. `resolve(42)` moves it to `fulfilled`
3. The first `then` handler is queued and flushed asynchronously
4. It returns `43`
5. The chained promise resolves with `43`
6. The next `then` prints `43`

## Real-World Example

This kind of implementation is not for production use. It is valuable as a study tool when you want to explain how native promises manage state, handlers, and chaining under the hood.

## Pros

- Makes promise internals very explicit
- Good for explaining constructor/prototype patterns
- Strong interview teaching tool

## Cons

- More verbose than a class-based version
- Easy to drift into fake spec completeness

## Limitations

- Not Promise/A+ complete
- Chaining here is simplified
- Does not fully implement thenable assimilation edge cases
- Uses `queueMicrotask`, but native semantics are still more nuanced

## Performance Impact / Trade-Offs

This pattern is about correctness and teaching, not runtime optimization. The trade-off is clarity versus completeness: you keep the model understandable by intentionally leaving out spec-level edge cases.

## Interview Questions With Answers

### Why would an interviewer ask for a custom promise?

To see whether you understand promise state, queued callbacks, async flushing, and chaining rather than just using the API from memory.

### Why attach methods on `.prototype` here?

Because the implementation is modeling classic constructor-function JavaScript, where shared behavior lives on the prototype instead of being recreated per instance.

### What limitation should you state clearly in an interview?

That this is a scoped educational implementation and not a full native Promise or Promises/A+ compliant recreation.

## Common Mistakes

- Letting a promise settle more than once
- Running handlers synchronously
- Forgetting to queue callbacks while pending
- Claiming full native compatibility without implementing it
