---
title: MyPromise (Class-Based)
category: coding
order: 6
---
# MyPromise (Class-Based)

## 1-Line Intuition

A class-based `MyPromise` expresses the same core promise mechanics with modern syntax that is usually easier to read in current JavaScript interviews.

## Why Interviewers Care

It shows the same async fundamentals as the prototype-based version, but in the syntax style most teams use today. It also lets you explain that implementation style changed, not the underlying promise model.

## Visual Model

~~~mermaid
flowchart TD
  A["class MyPromise"] --> B["pending state"]
  B --> C{"resolve or reject?"}
  C -- "resolve" --> D["fulfilled + value"]
  C -- "reject" --> E["rejected + reason"]
  D --> F["flush success chain"]
  E --> G["flush failure chain"]
~~~

## 30-Second Cheat Sheet

- Same promise mechanics as native promises at a simplified level
- Class syntax makes instance fields and methods easier to follow
- Handler queues still matter
- State still changes only once
- Chaining is still the hardest part conceptually

## Deep Dive

The class-based version helps separate concerns clearly:

- constructor sets up state and runs the executor
- instance methods handle queue flushing and chaining
- state, value, and handler storage stay on the instance

The key interview message is that promises are not magic syntax sugar. They are stateful async coordination objects. Whether you write them with constructor functions or classes, the model is still:

- start pending
- settle exactly once
- queue handlers while pending
- flush them asynchronously
- return a new promise from `then`

Again, this should be presented as an interview-scoped implementation, not a full spec clone.

## Commented Interview-Ready Code

~~~js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state !== 'pending') {
        return; // Ignore later attempts after the first settlement.
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

  flushHandlers() {
    queueMicrotask(() => {
      while (this.handlers.length > 0) {
        const handler = this.handlers.shift();
        const callback =
          this.state === 'fulfilled' ? handler.onFulfilled : handler.onRejected;

        if (!callback) {
          if (this.state === 'fulfilled') {
            handler.resolve(this.value);
          } else {
            handler.reject(this.value);
          }
          continue;
        }

        try {
          const result = callback(this.value);
          handler.resolve(result); // Simplified chaining for interview discussion.
        } catch (error) {
          handler.reject(error);
        }
      }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.handlers.push({ onFulfilled, onRejected, resolve, reject });

      if (this.state !== 'pending') {
        this.flushHandlers();
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
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
  }
}
~~~

## Dry Run / Execution Flow

For:

```js
new MyPromise((resolve) => setTimeout(() => resolve('done'), 0))
  .finally(() => console.log('cleanup'))
  .then((value) => console.log(value));
```

1. Promise starts pending
2. `setTimeout` resolves it later
3. When it settles, queued handlers flush asynchronously
4. `finally` runs first and preserves the fulfilled value
5. The next `then` receives `'done'`

## Real-World Example

The class-based note is useful when interviewers ask you to build a small promise from scratch using modern syntax. It is also easier for many people to discuss because the methods are grouped clearly on the class.

## Pros

- Modern and readable syntax
- Easier to explain in many current JavaScript interviews
- Keeps the internal model explicit

## Cons

- Still easy to oversell as “basically native Promise”
- Hides some of the raw prototype mechanics that interviewers may also care about

## Limitations

- Not full Promises/A+ compliance
- Simplified chaining behavior
- Missing some thenable edge cases and subtle scheduling semantics
- Still a teaching implementation, not production-ready infrastructure

## Performance Impact / Trade-Offs

Like the prototype-based version, the point is conceptual clarity. The real trade-off is not speed, but how much complexity you include before the implementation stops being interview-friendly.

## Interview Questions With Answers

### Why show both prototype-based and class-based implementations?

Because they teach the same promise mechanics through two different JavaScript object models, which helps you explain both older and modern styles.

### What is the hardest part of implementing a custom promise?

Usually chaining and asynchronous handler flushing, because that is where correctness and mental models break down quickly.

### What is the honest way to describe this implementation?

It is an interview-scoped promise model that demonstrates the core ideas, not a full replacement for native Promise.

## Common Mistakes

- Treating class syntax as if it changes promise semantics
- Forgetting that handlers registered after settlement should still run
- Running `then` handlers synchronously
- Ignoring chaining and error propagation altogether
