# Reviso Right Sidebar Playground Design

## Goal

Add a collapsible right sidebar to Reviso that lets users immediately experiment with code from the current note, edit it, run it safely, and inspect console output without leaving the app.

## Why This Change

The notes now contain many runnable JavaScript examples, but the user currently has to copy code into another environment to experiment. A built-in playground makes the app more useful for active learning instead of passive reading.

## Design Decision

Use a lightweight `iframe`-based sandbox.

Do not evaluate user code in the main application context.

## Why This Approach

An isolated iframe is the best fit for this project because:

- it keeps the main app safe from user code side effects
- it works in a no-build plain HTML/JS setup
- it is much lighter than embedding a full IDE/editor framework
- it allows console interception through `postMessage`

## Layout

The main app becomes a three-part layout:

1. left sidebar: topic navigation
2. center content area: note content
3. right sidebar: collapsible playground

The right sidebar should:

- be visible on desktop by default or via toggle
- be collapsible
- be hidden behind a toggle on smaller screens

## Right Sidebar Structure

The right sidebar has two stacked panels:

### Top Half: Code Playground

Contains:

- current note code title or simple label
- editable code area
- `Run` button
- `Reset` button

Behavior:

- auto-load the first runnable JavaScript code block from the current note
- allow the user to edit it freely
- `Reset` should restore the original extracted code block

### Bottom Half: Console Output

Contains:

- `Clear` button
- captured output log area

Behavior:

- captures `console.log`
- captures `console.error`
- captures thrown runtime errors
- output should be appended in order for each run

## Code Extraction Rules

When a topic loads:

- scan the rendered note for code blocks
- choose the first `js` code block as the playground source
- if no JavaScript block exists, show an empty-state message like:
  - `No runnable JavaScript example found in this note yet.`

Do not try to combine multiple code blocks in v1.

## Execution Model

Run code inside a sandboxed iframe.

Execution flow:

1. user clicks `Run`
2. app clears previous iframe and creates a fresh sandbox iframe
3. app injects a tiny runtime wrapper into the iframe
4. wrapper overrides console methods and forwards output via `postMessage`
5. wrapper runs the user code inside `try/catch`
6. parent app listens for output messages and renders them in the console panel

## Safety Model

This is not a secure multi-tenant sandbox. It is a lightweight same-user learning environment.

V1 safety goals:

- do not let user code mutate the main app page directly
- isolate execution from the main window as much as practical
- recreate the iframe fresh on every run

Non-goals:

- perfect security hardening
- untrusted internet-facing sandboxing

## UI Rules

- right sidebar should not overwhelm the reading experience
- the editor should be plain and readable, likely a textarea in v1
- console output should visually distinguish:
  - log
  - error
  - runtime exception
- long output should scroll inside the console panel

## Interaction Rules

- `Run` executes current editor contents
- `Reset` restores the original extracted code
- `Clear` clears console output only
- switching topics should replace the editor contents with the new topic’s first JS block
- if the user has unsaved edits and changes topics, it is acceptable in v1 to replace them without prompt

## App Changes Required

Implementation should include:

- updating the layout in `index.html`
- adding right-sidebar styles in `styles.css`
- adding playground state and code extraction logic in `app.js`
- adding iframe sandbox execution and console capture in `app.js`
- adding a sidebar toggle control

## Mobile Behavior

On narrower screens:

- the right sidebar should be collapsed by default
- user can open it with a toggle
- no advanced split-pane resizing is needed

## Non-Goals

This change does not include:

- Monaco or CodeMirror integration
- TypeScript transpilation
- npm package support
- multi-file execution
- DOM preview panel
- persistent saved playground state per topic
- resizing handles in v1

## Recommended Implementation Order

1. Add right-sidebar layout shell and toggle
2. Add editor and console UI
3. Extract first JavaScript code block from rendered note
4. Implement iframe-based code execution
5. Capture console output and errors
6. Wire topic changes to reset sandbox content
7. Verify on desktop and smaller screen layout

## Risks And Mitigations

### Risk: User code breaks the app

Mitigation:

- run code only inside a fresh sandbox iframe

### Risk: Notes without JS examples leave dead UI

Mitigation:

- show a clear empty state in the playground panel

### Risk: Layout becomes crowded

Mitigation:

- make the sidebar collapsible
- keep the editor simple

## Self-Review

Checked for:

- placeholders: none
- contradictions: none
- ambiguity: layout, execution model, extraction rules, and v1 limits are explicit
