# Right Sidebar Playground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a collapsible right sidebar to Reviso with a lightweight code playground and console output area driven by the current note’s first JavaScript code block.

**Architecture:** Keep the no-build HTML/JS app intact and extend the existing three-pane layout. Add a collapsible right sidebar in `index.html`, style it in `styles.css`, and implement code extraction, sandbox execution, and console capture in `app.js` using a fresh iframe per run.

**Tech Stack:** Node.js HTTP server, plain HTML/CSS/JS, Markdown notes, iframe sandbox

---

### Task 1: Add The Right Sidebar Layout Shell

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/index.html`
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/styles.css`

- [ ] **Step 1: Extend the main layout in `index.html`**

Add a right sidebar container and a toggle button in `/Users/amitagrawal/Desktop/Projects/RevisoStatic/index.html`:

```html
<main class="content">
  <button id="playground-toggle" class="playground-toggle" type="button" aria-expanded="true">
    Playground
  </button>
  <article id="topic-content" class="topic-content"></article>
</main>

<aside id="playground-sidebar" class="playground-sidebar is-open" aria-label="Code playground">
  <div class="playground-panel">
    <div class="playground-panel__header">
      <h2>Code Playground</h2>
      <div class="playground-actions">
        <button id="playground-run" type="button">Run</button>
        <button id="playground-reset" type="button">Reset</button>
      </div>
    </div>
    <textarea id="playground-editor" spellcheck="false"></textarea>
    <div id="playground-empty" class="playground-empty" hidden>
      No runnable JavaScript example found in this note yet.
    </div>
  </div>

  <div class="playground-panel playground-panel--console">
    <div class="playground-panel__header">
      <h2>Console</h2>
      <div class="playground-actions">
        <button id="playground-clear" type="button">Clear</button>
      </div>
    </div>
    <div id="playground-console" class="playground-console"></div>
  </div>
</aside>
```

- [ ] **Step 2: Add sidebar layout and panel styling**

Update `/Users/amitagrawal/Desktop/Projects/RevisoStatic/styles.css` so:

- desktop layout becomes three-column
- playground sidebar is collapsible
- editor and console are vertically stacked
- mobile hides sidebar by default

Expected classes to style:

```css
.layout
.content
.playground-toggle
.playground-sidebar
.playground-sidebar.is-open
.playground-panel
.playground-panel__header
.playground-actions
#playground-editor
.playground-console
.playground-empty
```

### Task 2: Add Playground State And Code Extraction

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`

- [ ] **Step 1: Add playground state**

Add a new state slice in `app.js`:

```js
state.playground = {
  initialCode: "",
  currentCode: "",
  isOpen: true,
};
```

- [ ] **Step 2: Extract the first JavaScript code block after note render**

Add a helper in `app.js`:

```js
function extractFirstJavaScriptBlock(container) {
  const codeBlock = container.querySelector("pre > code.language-js, pre > code.language-javascript");
  return codeBlock ? codeBlock.textContent.trim() : "";
}
```

- [ ] **Step 3: Populate the editor after topic load**

After content render, set:

```js
const initialCode = extractFirstJavaScriptBlock(content);
state.playground.initialCode = initialCode;
state.playground.currentCode = initialCode;
renderPlayground();
```

### Task 3: Add Iframe Sandbox Execution And Console Capture

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`

- [ ] **Step 1: Add console rendering helper**

Add a helper that appends lines into `#playground-console` with log/error styling.

- [ ] **Step 2: Add iframe-based execution helper**

Create a fresh sandbox iframe per run:

```js
function runPlaygroundCode(source) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-scripts");
  iframe.hidden = true;

  const html = `
    <script>
      const send = (type, args) => parent.postMessage({ source: "reviso-playground", type, args }, "*");
      console.log = (...args) => send("log", args);
      console.error = (...args) => send("error", args);
      window.onerror = (message, source, lineno, colno, error) => {
        send("runtime-error", [error ? error.stack || error.message : message]);
      };
      try {
        ${source}
      } catch (error) {
        send("runtime-error", [error.stack || error.message]);
      }
    </script>
  `;

  iframe.srcdoc = html;
  document.body.appendChild(iframe);

  setTimeout(() => iframe.remove(), 0);
}
```

Adjust implementation details as needed, but keep the fresh-iframe-per-run model.

- [ ] **Step 3: Listen for `postMessage` output**

Add a `window.addEventListener("message", ...)` handler that listens only for:

```js
{ source: "reviso-playground", type, args }
```

and renders:
- normal logs
- errors
- runtime exceptions

### Task 4: Wire Controls And Topic Changes

**Files:**
- Modify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`

- [ ] **Step 1: Add `renderPlayground()`**

This should:

- update the textarea with the current code
- show the empty-state when there is no JS block
- disable Run/Reset when empty

- [ ] **Step 2: Wire buttons**

Add click handlers for:

- `Run`: clear console and run current editor contents
- `Reset`: restore `state.playground.initialCode`
- `Clear`: clear only console
- `Playground` toggle: collapse/expand sidebar and update `aria-expanded`

- [ ] **Step 3: Keep editor state in sync**

Add input handling:

```js
document.getElementById("playground-editor").addEventListener("input", (event) => {
  state.playground.currentCode = event.target.value;
});
```

### Task 5: Verification

**Files:**
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/index.html`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/styles.css`
- Verify: `/Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js`

- [ ] **Step 1: Run syntax check**

Run:

```bash
node --check /Users/amitagrawal/Desktop/Projects/RevisoStatic/app.js
```

Expected: no output

- [ ] **Step 2: Restart local server if needed**

Run:

```bash
node /Users/amitagrawal/Desktop/Projects/RevisoStatic/server.js
```

Expected: app serves on `http://localhost:4321`

- [ ] **Step 3: Manual verification checklist**

Confirm:

- right sidebar appears
- toggle collapses and expands it
- a note with JS shows extracted code in editor
- `Run` prints `console.log` output
- thrown errors appear in console panel
- `Reset` restores original extracted code
- notes without JS show empty-state text

## Self-Review

- Spec coverage: layout, extraction, sandboxing, controls, and verification are all covered
- Placeholder scan: none
- Type consistency: ids and state names match across layout and app logic
