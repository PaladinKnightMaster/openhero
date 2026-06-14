#!/usr/bin/env node
/**
 * Generate poster frames for every gallery video.
 *
 *   public/videos/{category}/{slug}.mp4  ->  public/videos/{category}/{slug}.jpg
 *
 * Posters let the gallery render instantly with `preload="none"`, so no video
 * bytes are fetched for off-screen cards. Idempotent: existing posters are
 * skipped unless --force is passed.
 *
 * Requirements: ffmpeg on PATH.
 * Usage:
 *   node scripts/generate-posters.mjs            # generate missing posters
 *   node scripts/generate-posters.mjs --force    # regenerate all
 */
import { execFile } from "node:child_process";
import { readdir, stat, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIDEOS_DIR = path.join(__dirname, "..", "public", "videos");
const FORCE = process.argv.includes("--force");

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function* walkVideos(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkVideos(full);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".mp4")) {
      yield full;
    }
  }
}

async function ensureFfmpeg() {
  try {
    await execFileAsync("ffmpeg", ["-version"]);
  } catch {
    console.error("✖ ffmpeg not found on PATH. Install it: https://ffmpeg.org/download.html");
    process.exit(1);
  }
}

async function main() {
  if (!(await exists(VIDEOS_DIR))) {
    console.error(`✖ ${VIDEOS_DIR} does not exist.`);
    process.exit(1);
  }
  await ensureFfmpeg();

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for await (const videoPath of walkVideos(VIDEOS_DIR)) {
    const posterPath = videoPath.replace(/\.mp4$/i, ".jpg");
    if (!FORCE && (await exists(posterPath))) {
      skipped++;
      continue;
    }
    try {
      // Grab a frame ~1s in (avoids black intro frames), scale to a sane width.
      await execFileAsync("ffmpeg", [
        "-y",
        "-ss", "1",
        "-i", videoPath,
        "-frames:v", "1",
        "-vf", "scale=960:-2",
        "-q:v", "4",
        posterPath,
      ]);
      generated++;
      process.stdout.write(`✔ ${path.relative(VIDEOS_DIR, posterPath)}\n`);
    } catch (err) {
      failed++;
      console.error(`✖ Failed: ${path.relative(VIDEOS_DIR, videoPath)} — ${err.message}`);
    }
  }

  const total = generated + skipped + failed;
  console.log(`\nPosters: ${generated} generated, ${skipped} skipped, ${failed} failed (${total} videos).`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
