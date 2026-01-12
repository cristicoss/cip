import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import chokidar from "chokidar";
import fs from "node:fs/promises";
import path from "node:path";

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE,
  SUPABASE_BUCKET,
  SUPABASE_PREFIX,
} = process.env;

function must(name, value) {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

const supabase = createClient(
  must("SUPABASE_URL", SUPABASE_URL),
  must("SUPABASE_SERVICE_ROLE", SUPABASE_SERVICE_ROLE),
  { auth: { persistSession: false } }
);

const bucket = must("SUPABASE_BUCKET", SUPABASE_BUCKET);
const prefix = (SUPABASE_PREFIX || "").replace(/^\/+|\/+$/g, "");
const ROOT = process.cwd();

// ce tipuri de fișiere urcăm (poți adăuga/extinde)
const ALLOWED_EXT = new Set([
  ".js",
  ".mjs",
  ".css",
  ".html",
  ".json",
  ".map",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
]);

// ce ignorăm ca să nu urcăm prostii
const IGNORED = [
  "**/node_modules/**",
  "**/.git/**",
  "**/.DS_Store",
  "**/.env",
  "**/package-lock.json",
];

function toPosix(p) {
  return p.split(path.sep).join("/");
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".js" || ext === ".mjs")
    return "application/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".woff") return "font/woff";
  if (ext === ".woff2") return "font/woff2";
  if (ext === ".ttf") return "font/ttf";
  if (ext === ".otf") return "font/otf";
  return "application/octet-stream";
}

async function uploadFile(absPath) {
  const rel = path.relative(ROOT, absPath);
  const ext = path.extname(rel).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) return;

  const remotePath = prefix ? `${prefix}/${toPosix(rel)}` : toPosix(rel);
  const bytes = await fs.readFile(absPath);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(remotePath, bytes, {
      upsert: true,
      cacheControl: "0",
      contentType: contentTypeFor(rel),
    });

  if (error) throw error;
  console.log(`✅ uploaded ${rel} -> ${remotePath}`);
}

async function deleteFile(absPath) {
  const rel = path.relative(ROOT, absPath);
  const remotePath = prefix ? `${prefix}/${toPosix(rel)}` : toPosix(rel);

  const { error } = await supabase.storage.from(bucket).remove([remotePath]);
  if (error) throw error;
  console.log(`🗑️ removed ${rel} -> ${remotePath}`);
}

// debounce ca să nu urce de 5 ori la un singur save
const timers = new Map();
function debounce(key, fn, ms = 250) {
  clearTimeout(timers.get(key));
  timers.set(
    key,
    setTimeout(async () => {
      timers.delete(key);
      try {
        await fn();
      } catch (e) {
        console.error("❌", e?.message || e);
      }
    }, ms)
  );
}

console.log("Watching:", ROOT);
console.log(`Target: bucket="${bucket}" prefix="${prefix || "(root)"}"`);
console.log("Stop: Ctrl+C");

chokidar
  .watch(ROOT, { ignored: IGNORED, ignoreInitial: true })
  .on("add", (p) => debounce(p, () => uploadFile(p)))
  .on("change", (p) => debounce(p, () => uploadFile(p)))
  .on("unlink", (p) => debounce(p, () => deleteFile(p)));
