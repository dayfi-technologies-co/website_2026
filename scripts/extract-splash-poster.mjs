import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const mp4 = path.join(root, "public/vid/splash_vid.mp4");
const poster = path.join(root, "public/vid/splash_poster.jpg");
const ffmpegBin = process.env.FFMPEG_PATH ?? "ffmpeg";

if (!fs.existsSync(mp4)) {
  console.error("Missing:", mp4);
  process.exit(1);
}

console.log("Extracting first frame →", poster);
try {
  execFileSync(
    ffmpegBin,
    [
      "-y",
      "-i",
      mp4,
      "-frames:v",
      "1",
      "-q:v",
      "3",
      "-update",
      "1",
      poster,
    ],
    { stdio: "inherit" },
  );
} catch {
  console.error(
    "\nInstall ffmpeg (e.g. brew install ffmpeg) or set FFMPEG_PATH.\n",
  );
  process.exit(1);
}

console.log("Wrote", poster);
