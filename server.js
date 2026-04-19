const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const { buildCatalog } = require(path.join(__dirname, "catalog-builder.js"));

const ROOT_DIR = __dirname;
const DOCS_DIR = path.join(ROOT_DIR, "docs");
const PORT = Number(process.env.PORT || 4321);

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

const CATEGORY_PATTERN = /^(prep|foundations|internals|browser|accessibility|coding|dsa|performance|system|security)$/;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

async function getCatalog() {
  return buildCatalog(DOCS_DIR);
}

async function findTopicRecord(category, slug) {
  const catalog = await getCatalog();
  for (const group of catalog.categories) {
    if (group.key !== category) {
      continue;
    }

    const topic = group.topics.find((item) => item.slug === slug);
    if (topic) {
      return topic;
    }
  }

  return null;
}

function send(res, statusCode, contentType, body) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

async function serveTopic(reqUrl, res) {
  const category = reqUrl.searchParams.get("category") || "";
  const slug = reqUrl.searchParams.get("slug") || "";

  if (!CATEGORY_PATTERN.test(category) || !SLUG_PATTERN.test(slug)) {
    send(
      res,
      400,
      "application/json; charset=utf-8",
      JSON.stringify({ error: "Invalid topic request" }),
    );
    return;
  }

  const topic = await findTopicRecord(category, slug);

  if (!topic) {
    send(
      res,
      404,
      "application/json; charset=utf-8",
      JSON.stringify({ error: "Topic note not found" }),
    );
    return;
  }

  const filePath = path.join(ROOT_DIR, topic.filePath);

  try {
    const markdown = await fs.promises.readFile(filePath, "utf8");
    send(res, 200, "text/plain; charset=utf-8", markdown);
  } catch (error) {
    if (error.code === "ENOENT") {
      send(
        res,
        404,
        "application/json; charset=utf-8",
        JSON.stringify({ error: "Topic note not found" }),
      );
      return;
    }

    console.error(error);
    send(
      res,
      500,
      "application/json; charset=utf-8",
      JSON.stringify({ error: "Failed to read topic note" }),
    );
  }
}

async function serveCatalog(res) {
  try {
    const catalog = await getCatalog();
    send(res, 200, "application/json; charset=utf-8", JSON.stringify(catalog));
  } catch (error) {
    console.error(error);
    send(
      res,
      500,
      "application/json; charset=utf-8",
      JSON.stringify({ error: "Failed to build topic catalog" }),
    );
  }
}

async function serveStatic(reqUrl, res) {
  const relativePath = reqUrl.pathname === "/" ? "/index.html" : reqUrl.pathname;
  const filePath = path.normalize(path.join(ROOT_DIR, relativePath));

  if (!filePath.startsWith(ROOT_DIR)) {
    send(res, 403, "text/plain; charset=utf-8", "Forbidden");
    return;
  }

  try {
    const file = await fs.promises.readFile(filePath);
    const ext = path.extname(filePath);
    send(res, 200, MIME_TYPES[ext] || "application/octet-stream", file);
  } catch (error) {
    if (error.code === "ENOENT") {
      send(res, 404, "text/plain; charset=utf-8", "Not found");
      return;
    }

    console.error(error);
    send(res, 500, "text/plain; charset=utf-8", "Server error");
  }
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);

  if (reqUrl.pathname === "/api/topic") {
    await serveTopic(reqUrl, res);
    return;
  }

  if (reqUrl.pathname === "/api/catalog") {
    await serveCatalog(res);
    return;
  }

  await serveStatic(reqUrl, res);
});

server.listen(PORT, () => {
  console.log(`Reviso running on http://localhost:${PORT}`);
});
