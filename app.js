const STORAGE_KEY = "reviso-progress-v1";
const LAST_TOPIC_KEY = "reviso-last-topic-v1";
const THEME_KEY = "reviso-theme-v1";
const DEFAULT_RUNTIME_CONFIG = Object.freeze({
  mode: "server",
  basePath: "",
});
const THEMES = {
  "paper-light": {
    hljsHref: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css",
  },
  "vscode-dark": {
    hljsHref: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/vs2015.min.css",
  },
  "slate-light": {
    hljsHref: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css",
  },
};

let TOPICS = {};
let CATEGORY_LABELS = {};
let CATEGORY_ORDER = [];
let TOPIC_FILE_PATHS = {};

const state = {
  activeCategory: null,
  activeSlug: null,
  activeSection: null,
  searchQuery: "",
  theme: "paper-light",
  checked: {},
  playground: {
    initialCode: "",
    currentCode: "",
    isOpen: false,
    activeRunId: 0,
  },
};

let playgroundEditorView = null;

function getRuntimeConfig() {
  const config = window.REVISO_CONFIG || {};
  const mode = config.mode === "static" ? "static" : "server";
  let basePath = typeof config.basePath === "string"
    ? config.basePath.replace(/\/$/, "")
    : "";

  if (mode === "static" && !basePath) {
    const pathname = window.location.pathname || "/";
    const trimmedPath = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
    const slashIndex = trimmedPath.lastIndexOf("/");
    basePath = slashIndex > 0 ? trimmedPath.slice(0, slashIndex) : "";
  }

  return {
    ...DEFAULT_RUNTIME_CONFIG,
    mode,
    basePath,
  };
}

function buildAssetPath(relativePath) {
  const { basePath } = getRuntimeConfig();
  const normalizedPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  return `${basePath}${normalizedPath}`;
}

function getCatalogEndpoint() {
  const { mode } = getRuntimeConfig();
  return mode === "static" ? buildAssetPath("/catalog.json") : "/api/catalog";
}

async function loadCatalog() {
  const response = await fetch(getCatalogEndpoint());
  if (!response.ok) {
    throw new Error(`Failed to load catalog: HTTP ${response.status}`);
  }

  const payload = await response.json();
  CATEGORY_ORDER = payload.categories.map((category) => category.key);
  CATEGORY_LABELS = Object.fromEntries(
    payload.categories.map((category) => [category.key, category.label]),
  );
  TOPICS = Object.fromEntries(
    payload.categories.map((category) => [
      category.key,
      category.topics.map((topic) => ({
        title: topic.title,
        slug: topic.slug,
        filePath: topic.filePath,
      })),
    ]),
  );
  TOPIC_FILE_PATHS = Object.fromEntries(
    payload.categories.flatMap((category) =>
      category.topics.map((topic) => [`${category.key}:${topic.slug}`, topic.filePath]),
    ),
  );
}

if (window.marked) {
  window.marked.use({
    gfm: true,
    breaks: false,
  });
}

function topicId(category, slug) {
  return `${category}:${slug}`;
}

function totalTopicCount() {
  return Object.values(TOPICS).reduce((count, topics) => count + topics.length, 0);
}

function readCheckedState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeCheckedState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.checked));
}

function restoreTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved && THEMES[saved]) {
    state.theme = saved;
  }
}

function writeTheme() {
  localStorage.setItem(THEME_KEY, state.theme);
}

function applyTheme() {
  document.body.dataset.theme = state.theme;
  document.getElementById("theme-select").value = state.theme;
  document.getElementById("hljs-theme").href = THEMES[state.theme].hljsHref;
}

function restoreLastTopic() {
  try {
    const saved = JSON.parse(localStorage.getItem(LAST_TOPIC_KEY) || "null");
    if (!saved) {
      return;
    }

    const categoryTopics = TOPICS[saved.category];
    if (!categoryTopics) {
      return;
    }

    const exists = categoryTopics.some((topic) => topic.slug === saved.slug);
    if (exists) {
      state.activeCategory = saved.category;
      state.activeSlug = saved.slug;
    }
  } catch {
    // Ignore malformed browser state and use defaults.
  }
}

function writeLastTopic() {
  localStorage.setItem(
    LAST_TOPIC_KEY,
    JSON.stringify({
      category: state.activeCategory,
      slug: state.activeSlug,
    }),
  );
}

function getActiveTopic() {
  return TOPICS[state.activeCategory]?.find((topic) => topic.slug === state.activeSlug) || null;
}

function topicExists(category, slug) {
  return Boolean(TOPICS[category]?.some((topic) => topic.slug === slug));
}

function getTopicFilePath(category, slug) {
  return TOPIC_FILE_PATHS[topicId(category, slug)] || null;
}

function ensureActiveTopic() {
  if (state.activeCategory && state.activeSlug && topicExists(state.activeCategory, state.activeSlug)) {
    return;
  }

  const [firstCategory] = CATEGORY_ORDER;
  const firstTopic = firstCategory ? TOPICS[firstCategory]?.[0] : null;
  state.activeCategory = firstCategory || null;
  state.activeSlug = firstTopic?.slug || null;
  state.activeSection = null;
}

function setActiveTopic(category, slug) {
  if (!topicExists(category, slug)) {
    return false;
  }

  state.activeCategory = category;
  state.activeSlug = slug;
  state.activeSection = null;
  writeLastTopic();
  render();
  loadTopicContent();
  return true;
}

function updateHash() {
  if (!state.activeCategory || !state.activeSlug) {
    return;
  }

  const nextHash = state.activeSection
    ? `#/${state.activeCategory}/${state.activeSlug}#${state.activeSection}`
    : `#/${state.activeCategory}/${state.activeSlug}`;
  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", nextHash);
  }
}

function restoreFromHash() {
  const match = window.location.hash.match(/^#\/([^/#]+)\/([^/#]+)(?:#(.+))?$/);
  if (!match) {
    return false;
  }

  const [, category, slug, section] = match;
  if (!topicExists(category, slug)) {
    return false;
  }

  state.activeCategory = category;
  state.activeSlug = slug;
  state.activeSection = section || null;
  return true;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return markdown;
  }

  const endIndex = markdown.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return markdown;
  }

  return markdown.slice(endIndex + 5).replace(/^\n+/, "");
}

function formatConsoleArgs(args) {
  return args
    .map((value) => {
      if (typeof value === "string") {
        return value;
      }

      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    })
    .join(" ");
}

function clearPlaygroundConsole() {
  document.getElementById("playground-console").innerHTML = "";
}

function setPlaygroundEditorValue(source) {
  if (playgroundEditorView) {
    const { state } = playgroundEditorView;
    playgroundEditorView.dispatch({
      changes: {
        from: 0,
        to: state.doc.length,
        insert: source,
      },
    });
  }
}

function getPlaygroundEditorValue() {
  if (!playgroundEditorView) {
    return "";
  }

  return playgroundEditorView.state.doc.toString();
}

async function initializePlaygroundEditor() {
  if (playgroundEditorView) {
    return;
  }

  if (!window.CodeMirrorModules) {
    const [stateModule, viewModule, commandsModule, languageModule, jsModule] = await Promise.all([
      import("https://esm.sh/@codemirror/state@6.5.2"),
      import("https://esm.sh/@codemirror/view@6.36.1?deps=@codemirror/state@6.5.2"),
      import("https://esm.sh/@codemirror/commands@6.8.1?deps=@codemirror/state@6.5.2,@codemirror/view@6.36.1,@codemirror/language@6.10.8"),
      import("https://esm.sh/@codemirror/language@6.10.8?deps=@codemirror/state@6.5.2,@codemirror/view@6.36.1"),
      import("https://esm.sh/@codemirror/lang-javascript@6.2.2?deps=@codemirror/state@6.5.2,@codemirror/view@6.36.1,@codemirror/language@6.10.8"),
    ]);

    window.CodeMirrorModules = {
      ...stateModule,
      ...viewModule,
      ...commandsModule,
      ...languageModule,
      ...jsModule,
    };
  }

  const {
    EditorState,
    EditorView,
    keymap,
    defaultKeymap,
    drawSelection,
    highlightActiveLine,
    lineNumbers,
    highlightActiveLineGutter,
    syntaxHighlighting,
    defaultHighlightStyle,
    indentWithTab,
    javascript,
  } = window.CodeMirrorModules;

  const syncListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      state.playground.currentCode = update.state.doc.toString();
    }
  });

  playgroundEditorView = new EditorView({
    state: EditorState.create({
      doc: state.playground.currentCode,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        drawSelection(),
        highlightActiveLine(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        keymap.of([...defaultKeymap, indentWithTab]),
        javascript(),
        EditorView.lineWrapping,
        EditorView.theme({
          "&": {
            height: "100%",
          },
          ".cm-scroller": {
            overflow: "auto",
          },
          ".cm-content": {
            minHeight: "100%",
          },
        }),
        syncListener,
      ],
    }),
    parent: document.getElementById("playground-editor"),
  });
}

function appendPlaygroundConsoleLine(type, text) {
  const consolePanel = document.getElementById("playground-console");
  const line = document.createElement("div");
  line.className = `playground-console__line playground-console__line--${type}`;
  line.textContent = text;
  consolePanel.append(line);
  consolePanel.scrollTop = consolePanel.scrollHeight;
}

function extractFirstJavaScriptBlock(container) {
  const codeBlock = container.querySelector("pre > code.language-js, pre > code.language-javascript");
  return codeBlock ? codeBlock.textContent.trim() : "";
}

function renderPlayground() {
  const layout = document.querySelector(".layout");
  const sidebar = document.getElementById("playground-sidebar");
  const editor = document.getElementById("playground-editor");
  const empty = document.getElementById("playground-empty");
  const runButton = document.getElementById("playground-run");
  const resetButton = document.getElementById("playground-reset");
  const hasCode = Boolean(state.playground.initialCode);

  layout.classList.toggle("layout--playground-closed", !state.playground.isOpen);
  sidebar.classList.toggle("is-open", state.playground.isOpen);

  editor.hidden = !hasCode;
  empty.hidden = hasCode;
  runButton.disabled = !hasCode;
  resetButton.disabled = !hasCode;

  if (hasCode && getPlaygroundEditorValue() !== state.playground.currentCode) {
    setPlaygroundEditorValue(state.playground.currentCode);
  }
}

function openPlaygroundWithCode(source, { run = false } = {}) {
  state.playground.currentCode = source.trim();
  state.playground.isOpen = true;
  renderPlayground();
  clearPlaygroundConsole();

  if (run) {
    runPlaygroundCode(state.playground.currentCode);
  }
}

function runPlaygroundCode(source) {
  const existingFrame = document.getElementById("playground-runner");
  if (existingFrame) {
    existingFrame.remove();
  }

  state.playground.activeRunId += 1;
  const runId = state.playground.activeRunId;
  const iframe = document.createElement("iframe");
  iframe.id = "playground-runner";
  iframe.setAttribute("sandbox", "allow-scripts");
  iframe.hidden = true;

  const escapedSource = JSON.stringify(source).replace(/<\/script/gi, "<\\/script");
  const html = `
    <!doctype html>
    <html>
      <body>
        <script>
          const RUN_ID = ${runId};
          const source = ${escapedSource};
          const send = (type, args) => parent.postMessage({ source: "reviso-playground", runId: RUN_ID, type, args }, "*");
          console.log = (...args) => send("log", args);
          console.error = (...args) => send("error", args);
          window.onerror = (message, source, lineno, colno, error) => {
            send("runtime-error", [error ? (error.stack || error.message) : String(message)]);
          };
          Promise.resolve()
            .then(() => {
              return (0, eval)(source);
            })
            .catch((error) => {
              send("runtime-error", [error && (error.stack || error.message) || String(error)]);
            })
            .finally(() => {
              setTimeout(() => {
                send("run-complete", []);
              }, 80);
            });
        </script>
      </body>
    </html>
  `;

  iframe.srcdoc = html;
  document.body.append(iframe);
}

function renderProgress() {
  const completed = Object.values(state.checked).filter(Boolean).length;
  const total = totalTopicCount();
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progress").innerHTML = `
    <div class="progress__count">${completed} / ${total} completed</div>
    <div class="progress__meta">${percent}% revision progress</div>
    <div class="progress__bar"><span style="width:${percent}%"></span></div>
  `;
}

function renderSidebar() {
  const topicNav = document.getElementById("topic-nav");
  const normalizedQuery = state.searchQuery.trim().toLowerCase();

  topicNav.innerHTML = CATEGORY_ORDER
    .map((category) => {
      const topics = TOPICS[category] || [];
      const categoryLabel = CATEGORY_LABELS[category];
      const categoryMatches = normalizedQuery
        ? categoryLabel.toLowerCase().includes(normalizedQuery)
        : false;
      const visibleTopics = normalizedQuery
        ? topics.filter((topic) => topic.title.toLowerCase().includes(normalizedQuery))
        : topics;

      if (normalizedQuery && !categoryMatches && visibleTopics.length === 0) {
        return "";
      }

      const renderedTopics = categoryMatches ? topics : visibleTopics;
      const open = normalizedQuery || category === state.activeCategory ? "open" : "";

      return `
        <details class="accordion" ${open}>
          <summary>
            <span>${categoryLabel}</span>
            <span class="accordion__count">${renderedTopics.length} topics</span>
          </summary>
          <div class="accordion__items">
            ${renderedTopics
              .map((topic) => {
                const id = topicId(category, topic.slug);
                const checked = state.checked[id] ? "checked" : "";
                const activeClass =
                  category === state.activeCategory && topic.slug === state.activeSlug
                    ? "is-active"
                    : "";

                return `
                  <button class="topic-row ${activeClass}" data-category="${category}" data-slug="${topic.slug}" type="button">
                    <input
                      type="checkbox"
                      data-checkbox="${id}"
                      aria-label="Mark ${topic.title} complete"
                      ${checked}
                    />
                    <span class="topic-row__title">${topic.title}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </details>
      `;
    })
    .join("");

  if (!topicNav.innerHTML.trim()) {
    topicNav.innerHTML = `
      <div class="empty-state">
        <h3>No matches</h3>
        <p>Try a broader term like <code>promise</code>, <code>browser</code>, or <code>security</code>.</p>
      </div>
    `;
  }
}

function upgradeMermaidBlocks(container) {
  const blocks = container.querySelectorAll("pre > code.language-mermaid");

  blocks.forEach((codeBlock, index) => {
    const pre = codeBlock.parentElement;
    const wrapper = document.createElement("div");
    wrapper.className = "mermaid";
    wrapper.id = `mermaid-${state.activeCategory}-${state.activeSlug}-${index}`;
    wrapper.textContent = codeBlock.textContent;
    pre.replaceWith(wrapper);
  });
}

function getCodeLanguage(codeBlock) {
  const languageClass = [...codeBlock.classList].find((className) =>
    className.startsWith("language-"),
  );

  return languageClass ? languageClass.replace("language-", "") : "text";
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`'"’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function enhanceHeadings(container) {
  const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const seen = new Map();

  headings.forEach((heading) => {
    const baseId = slugifyHeading(heading.textContent || "");
    const count = (seen.get(baseId) || 0) + 1;
    seen.set(baseId, count);

    const id = count === 1 ? baseId : `${baseId}-${count}`;
    heading.id = id;
    heading.classList.add("topic-heading");

    const link = document.createElement("a");
    link.href = `#/${state.activeCategory}/${state.activeSlug}#${id}`;
    link.className = "topic-heading__link";
    link.dataset.headingLink = id;
    link.setAttribute("aria-label", `Copy link to ${heading.textContent?.trim() || "section"}`);
    link.textContent = "#";

    heading.append(" ", link);
  });
}

function scrollToActiveSection(container) {
  if (!state.activeSection) {
    return;
  }

  const section = container.querySelector(`#${CSS.escape(state.activeSection)}`);
  if (!section) {
    return;
  }

  requestAnimationFrame(() => {
    section.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  });
}

function enhanceCodeBlocks(container) {
  const blocks = container.querySelectorAll("pre > code");

  blocks.forEach((codeBlock) => {
    if (codeBlock.classList.contains("language-mermaid")) {
      return;
    }

    const pre = codeBlock.parentElement;
    const frame = document.createElement("div");
    frame.className = "code-block";

    const header = document.createElement("div");
    header.className = "code-block__header";

    const language = document.createElement("span");
    language.className = "code-block__language";
    language.textContent = getCodeLanguage(codeBlock);

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "code-block__copy";
    copyButton.dataset.copyCode = "true";
    copyButton.textContent = "Copy";
    copyButton.setAttribute("aria-label", `Copy ${language.textContent} code`);

    const actions = document.createElement("div");
    actions.className = "code-block__actions";

    if (["js", "javascript"].includes(language.textContent)) {
      const runButton = document.createElement("button");
      runButton.type = "button";
      runButton.className = "code-block__run";
      runButton.dataset.runPlayground = "true";
      runButton.textContent = "Run in Playground";
      runButton.setAttribute("aria-label", "Run this code in the playground");
      actions.append(runButton);
    }

    actions.append(copyButton);
    header.append(language, actions);
    pre.replaceWith(frame);
    frame.append(header, pre);

    if (window.hljs) {
      codeBlock.classList.add("hljs");
      window.hljs.highlightElement(codeBlock);
    }
  });
}

async function renderDiagrams(container) {
  if (!window.mermaid) {
    return;
  }

  window.mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    securityLevel: "loose",
  });

  upgradeMermaidBlocks(container);
  const diagrams = container.querySelectorAll(".mermaid");

  if (diagrams.length === 0) {
    return;
  }

  try {
    await window.mermaid.run({
      nodes: diagrams,
      suppressErrors: false,
    });
  } catch (error) {
    console.error("Failed to render mermaid diagram", error);
  }
}

async function loadTopicContent() {
  const topic = getActiveTopic();
  const content = document.getElementById("topic-content");
  const runtimeConfig = getRuntimeConfig();
  let errorPath = topic ? getTopicFilePath(state.activeCategory, topic.slug) : null;

  content.innerHTML = "<p>Loading topic...</p>";

  try {
    if (!topic) {
      throw new Error("No active topic available");
    }

    let response;

    if (runtimeConfig.mode === "static") {
      if (!errorPath) {
        throw new Error(`Missing file path for ${state.activeCategory}:${topic.slug}`);
      }

      response = await fetch(buildAssetPath(`/${errorPath}`));
    } else {
      errorPath = `/api/topic?category=${state.activeCategory}&slug=${topic.slug}`;
      response = await fetch(`/api/topic?category=${encodeURIComponent(state.activeCategory)}&slug=${encodeURIComponent(topic.slug)}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const markdown = stripFrontmatter(await response.text());
    content.innerHTML = marked.parse(markdown);
    enhanceHeadings(content);
    await renderDiagrams(content);
    enhanceCodeBlocks(content);
    state.playground.initialCode = extractFirstJavaScriptBlock(content);
    state.playground.currentCode = state.playground.initialCode;
    clearPlaygroundConsole();
    renderPlayground();
    scrollToActiveSection(content);
  } catch (error) {
    console.error("Failed to load topic content", error);
    content.innerHTML = `
      <div class="empty-state">
        <h3>Topic notes not found</h3>
        <p>
          I couldn't load
          <code>${escapeHtml(errorPath)}</code>.
        </p>
      </div>
    `;
    state.playground.initialCode = "";
    state.playground.currentCode = "";
    clearPlaygroundConsole();
    renderPlayground();
  }
}

function render() {
  applyTheme();
  renderProgress();
  renderSidebar();
  updateHash();
}

document.addEventListener("click", (event) => {
  const checkbox = event.target.closest("input[type='checkbox'][data-checkbox]");
  if (checkbox) {
    const { checkbox: id } = checkbox.dataset;
    state.checked[id] = checkbox.checked;
    writeCheckedState();
    renderProgress();
    event.stopPropagation();
    return;
  }

  const topicRow = event.target.closest(".topic-row");
  if (topicRow) {
    setActiveTopic(topicRow.dataset.category, topicRow.dataset.slug);
    return;
  }

  const contentLink = event.target.closest("a[href^='#/']");
  if (contentLink) {
    const match = contentLink.getAttribute("href").match(/^#\/([^/#]+)\/([^/#]+)(?:#(.+))?$/);
    if (!match) {
      return;
    }

    event.preventDefault();
    const [, category, slug, section] = match;

    if (category === state.activeCategory && slug === state.activeSlug && section) {
      state.activeSection = section;
      updateHash();
      scrollToActiveSection(document.getElementById("topic-content"));
      return;
    }

    if (!topicExists(category, slug)) {
      return;
    }

    state.activeCategory = category;
    state.activeSlug = slug;
    state.activeSection = section || null;
    writeLastTopic();
    render();
    loadTopicContent();
    return;
  }

  const copyButton = event.target.closest("[data-copy-code]");
  if (copyButton) {
    const codeBlock = copyButton.closest(".code-block")?.querySelector("pre > code");
    if (!codeBlock) {
      return;
    }

    navigator.clipboard.writeText(codeBlock.textContent || "")
      .then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = "Copied";
        window.setTimeout(() => {
          copyButton.textContent = originalText;
        }, 1400);
      })
      .catch((error) => {
        console.error("Failed to copy code block", error);
        copyButton.textContent = "Failed";
        window.setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 1400);
      });
    return;
  }

  const runButton = event.target.closest("[data-run-playground]");
  if (runButton) {
    const codeBlock = runButton.closest(".code-block")?.querySelector("pre > code");
    if (!codeBlock) {
      return;
    }

    openPlaygroundWithCode(codeBlock.textContent || "", { run: false });
    return;
  }

  if (event.target.id === "playground-run") {
    clearPlaygroundConsole();
    runPlaygroundCode(state.playground.currentCode);
    return;
  }

  if (event.target.id === "playground-reset") {
    state.playground.currentCode = state.playground.initialCode;
    renderPlayground();
    return;
  }

  if (event.target.id === "playground-clear") {
    clearPlaygroundConsole();
  }
});

window.addEventListener("message", (event) => {
  if (event.data?.source !== "reviso-playground") {
    return;
  }

  if (event.data.runId !== state.playground.activeRunId) {
    return;
  }

  if (event.data.type === "run-complete") {
    document.getElementById("playground-runner")?.remove();
    return;
  }

  const text = formatConsoleArgs(event.data.args || []);
  appendPlaygroundConsoleLine(event.data.type || "log", text);
});

document.getElementById("topic-search").addEventListener("input", (event) => {
  state.searchQuery = event.target.value;
  renderSidebar();
});

document.getElementById("theme-select").addEventListener("change", (event) => {
  state.theme = event.target.value;
  writeTheme();
  render();
  loadTopicContent();
});

async function bootstrapApp() {
  state.checked = readCheckedState();
  restoreTheme();
  await loadCatalog();
  ensureActiveTopic();

  if (!restoreFromHash()) {
    restoreLastTopic();
  }
  ensureActiveTopic();

  await initializePlaygroundEditor();
  render();
  renderPlayground();
  await loadTopicContent();
}

bootstrapApp().catch((error) => {
  console.error("Failed to bootstrap Reviso", error);
  const content = document.getElementById("topic-content");
  content.innerHTML = `
    <div class="empty-state">
      <h3>App failed to start</h3>
      <p>Please refresh the page. If the problem persists, check the console for details.</p>
    </div>
  `;
});

window.addEventListener("hashchange", () => {
  restoreFromHash();
  render();
  loadTopicContent();
});
