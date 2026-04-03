const fs = require("fs");
const path = require("path");
const { execSync, spawn } = require("child_process");

const ROOT = __dirname;
const BOX64_DIR = path.join(ROOT, "box64");

// Supported archive names
const FILE_TAR = path.join(ROOT, "box64.tar.xz");
const FILE_ZIP = path.join(ROOT, "box64.zip");

// Detect archive type
function detectArchive() {
  if (fs.existsSync(FILE_TAR)) return "tar";
  if (fs.existsSync(FILE_ZIP)) return "zip";
  return null;
}

// Ensure directory
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Extract archive (Windows-friendly)
function extract(type) {
  ensureDir(BOX64_DIR);

  try {
    if (type === "tar") {
      // Windows 10+ has tar
      execSync(`tar -xf "${FILE_TAR}" -C "${BOX64_DIR}"`, { stdio: "inherit" });
    } else if (type === "zip") {
      // PowerShell extraction
      execSync(
        `powershell -Command "Expand-Archive -Force '${FILE_ZIP}' '${BOX64_DIR}'"`,
        { stdio: "inherit" }
      );
    }
  } catch (e) {
    console.error("Extraction failed:", e.message);
    process.exit(1);
  }
}

// Try to find executable
function findExecutable() {
  const possible = [
    path.join(BOX64_DIR, "box64.exe"),
    path.join(BOX64_DIR, "bin", "box64.exe"),
    path.join(BOX64_DIR, "box64"),
    path.join(BOX64_DIR, "bin", "box64")
  ];

  for (const p of possible) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// Run executable
function run(exePath) {
  try {
    const child = spawn(exePath, ["-v"], {
      stdio: "inherit",
      shell: true
    });

    child.on("exit", (code) => {
      process.exit(code);
    });
  } catch (e) {
    console.error("Run failed:", e.message);
    process.exit(1);
  }
}

// Main
(function main() {
  const type = detectArchive();

  if (!type) {
    console.error("No box64 archive found (box64.tar.xz or box64.zip)");
    process.exit(1);
  }

  extract(type);

  const exe = findExecutable();
  if (!exe) {
    console.error("Box64 executable not found after extraction");
    process.exit(1);
  }

  run(exe);
})();
