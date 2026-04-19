const fs = require("fs");
const path = require("path");

const CATEGORY_LABELS = {
  prep: "Interview Prep",
  foundations: "Foundations",
  internals: "JS Internals",
  browser: "Browser Platform",
  accessibility: "Accessibility",
  coding: "Coding Patterns",
  dsa: "DSA",
  performance: "Performance",
  system: "System Design",
  security: "Security",
};

const CATEGORY_ORDER = [
  "prep",
  "foundations",
  "internals",
  "browser",
  "accessibility",
  "coding",
  "dsa",
  "performance",
  "system",
  "security",
];

const IGNORED_DOC_FOLDERS = new Set(["plans", "specs"]);

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return { data: {}, content: markdown };
  }

  const endIndex = markdown.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { data: {}, content: markdown };
  }

  const rawFrontmatter = markdown.slice(4, endIndex);
  const data = {};

  rawFrontmatter.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    value = value.replace(/^['"]|['"]$/g, "");
    data[key] = value;
  });

  return {
    data,
    content: markdown.slice(endIndex + 5),
  };
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function inferCategoryFromFolder(folder) {
  if (CATEGORY_LABELS[folder]) {
    return folder;
  }

  return null;
}

async function listMarkdownFiles(dir, rootDir = dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(entryPath, rootDir));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path.relative(rootDir, entryPath));
    }
  }

  return files;
}

async function buildCatalog(docsDir) {
  const markdownFiles = await listMarkdownFiles(docsDir);
  const discoveredTopics = [];

  for (const relativePath of markdownFiles) {
    const [docFolder] = relativePath.split(path.sep);
    if (IGNORED_DOC_FOLDERS.has(docFolder)) {
      continue;
    }

    const filePath = path.join(docsDir, relativePath);
    const markdown = await fs.promises.readFile(filePath, "utf8");
    const { data } = parseFrontmatter(markdown);
    const slug = path.basename(relativePath, ".md");
    const category = data.category || inferCategoryFromFolder(docFolder);

    if (!category || !CATEGORY_LABELS[category]) {
      continue;
    }

    discoveredTopics.push({
      title: data.title || titleFromSlug(slug),
      slug,
      category,
      order: Number(data.order || Number.MAX_SAFE_INTEGER),
      docFolder,
      filePath: `docs/${relativePath.split(path.sep).join("/")}`,
    });
  }

  const categories = CATEGORY_ORDER
    .map((categoryKey) => {
      const topics = discoveredTopics
        .filter((topic) => topic.category === categoryKey)
        .sort((left, right) => {
          if (left.order !== right.order) {
            return left.order - right.order;
          }

          return left.title.localeCompare(right.title);
        })
        .map(({ title, slug, docFolder, filePath, order }) => ({
          title,
          slug,
          docFolder,
          filePath,
          order,
        }));

      if (topics.length === 0) {
        return null;
      }

      return {
        key: categoryKey,
        label: CATEGORY_LABELS[categoryKey],
        topics,
      };
    })
    .filter(Boolean);

  return { categories };
}

module.exports = {
  buildCatalog,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  parseFrontmatter,
};
