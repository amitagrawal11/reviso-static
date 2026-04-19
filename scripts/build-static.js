const fs = require("fs");
const path = require("path");
const { buildCatalog } = require(path.join(__dirname, "..", "catalog-builder.js"));

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const DOCS_DIR = path.join(ROOT_DIR, "docs");
const STATIC_FILES = [
  "index.html",
  "app.js",
  "styles.css",
];

function parseBasePath() {
  const cliArg = process.argv.find((arg) => arg.startsWith("--base-path="));
  const rawValue = cliArg
    ? cliArg.slice("--base-path=".length)
    : process.env.REVISO_BASE_PATH || "";

  if (!rawValue || rawValue === "/") {
    return "";
  }

  const normalized = rawValue.startsWith("/") ? rawValue : `/${rawValue}`;
  return normalized.replace(/\/$/, "");
}

async function recreateDistDir() {
  await fs.promises.rm(DIST_DIR, { recursive: true, force: true });
  await fs.promises.mkdir(DIST_DIR, { recursive: true });
}

async function copyStaticFiles() {
  for (const fileName of STATIC_FILES) {
    await fs.promises.copyFile(path.join(ROOT_DIR, fileName), path.join(DIST_DIR, fileName));
  }

  await fs.promises.cp(DOCS_DIR, path.join(DIST_DIR, "docs"), { recursive: true });
}

async function writeCatalog() {
  const catalog = await buildCatalog(DOCS_DIR);
  await fs.promises.writeFile(
    path.join(DIST_DIR, "catalog.json"),
    JSON.stringify(catalog, null, 2),
    "utf8",
  );
}

async function writeStaticConfig(basePath) {
  const configFile = path.join(DIST_DIR, "reviso.config.js");
  const body = `window.REVISO_CONFIG = {
  mode: "static",
  basePath: ${JSON.stringify(basePath)},
};
`;

  await fs.promises.writeFile(configFile, body, "utf8");
}

async function build() {
  const basePath = parseBasePath();
  await recreateDistDir();
  await copyStaticFiles();
  await writeStaticConfig(basePath);
  await writeCatalog();
  console.log(`Built static Reviso dist at ${DIST_DIR} with basePath="${basePath}"`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
