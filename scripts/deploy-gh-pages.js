const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: ROOT_DIR,
    stdio: "pipe",
    encoding: "utf8",
    ...options,
  }).trim();
}

function runInherit(command, args, options = {}) {
  execFileSync(command, args, {
    cwd: ROOT_DIR,
    stdio: "inherit",
    ...options,
  });
}

function branchExists(branchName) {
  try {
    run("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branchName}`]);
    return true;
  } catch {
    return false;
  }
}

function ensureCleanMainIndex() {
  const status = run("git", ["status", "--porcelain"]);
  if (status) {
    throw new Error("Working tree is not clean. Commit or stash changes before deploying.");
  }
}

function emptyDirectory(targetDir) {
  for (const entry of fs.readdirSync(targetDir)) {
    if (entry === ".git") {
      continue;
    }

    fs.rmSync(path.join(targetDir, entry), { recursive: true, force: true });
  }
}

function copyDirectoryContents(sourceDir, targetDir) {
  for (const entry of fs.readdirSync(sourceDir)) {
    fs.cpSync(path.join(sourceDir, entry), path.join(targetDir, entry), { recursive: true });
  }
}

function getDefaultBasePath() {
  const remoteUrl = run("git", ["remote", "get-url", "origin"]);
  const match = remoteUrl.match(/[:/]([^/]+\/[^/]+?)(?:\.git)?$/);
  if (!match) {
    return "";
  }

  const [, repoFullName] = match;
  const repoName = repoFullName.split("/")[1];
  return repoName ? `/${repoName}` : "";
}

function writeNoJekyll(targetDir) {
  fs.writeFileSync(path.join(targetDir, ".nojekyll"), "");
}

function hasDeploymentChanges(worktreeDir) {
  return Boolean(
    execFileSync("git", ["status", "--porcelain"], {
      cwd: worktreeDir,
      stdio: "pipe",
      encoding: "utf8",
    }).trim(),
  );
}

function main() {
  ensureCleanMainIndex();

  const branchName = "gh-pages";
  const basePath = process.env.REVISO_BASE_PATH || getDefaultBasePath();

  runInherit("node", [path.join("scripts", "build-static.js")], {
    cwd: ROOT_DIR,
    env: {
      ...process.env,
      REVISO_BASE_PATH: basePath,
    },
  });

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "reviso-gh-pages-"));

  try {
    if (branchExists(branchName)) {
      runInherit("git", ["worktree", "add", "--force", tempDir, branchName]);
    } else {
      runInherit("git", ["worktree", "add", "--detach", tempDir]);
      runInherit("git", ["checkout", "--orphan", branchName], { cwd: tempDir });
    }

    emptyDirectory(tempDir);
    copyDirectoryContents(DIST_DIR, tempDir);
    writeNoJekyll(tempDir);

    runInherit("git", ["add", "-A"], { cwd: tempDir });

    if (!hasDeploymentChanges(tempDir)) {
      console.log("gh-pages is already up to date.");
      return;
    }

    runInherit("git", ["commit", "-m", "deploy: update GitHub Pages"], { cwd: tempDir });
    runInherit("git", ["push", "-u", "origin", `${branchName}:${branchName}`], { cwd: tempDir });
  } finally {
    try {
      runInherit("git", ["worktree", "remove", tempDir, "--force"]);
    } catch {
      // Best effort cleanup. If removal fails, the temp dir path is still disposable.
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

try {
  main();
} catch (error) {
  console.error(error.message || error);
  process.exitCode = 1;
}
