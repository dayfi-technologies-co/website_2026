import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const input = path.join(root, "public/vid/IMG_2662.MOV");
const output = path.join(root, "public/vid/splash_vid.mp4");
const poster = path.join(root, "public/vid/splash_poster.jpg");

const ffmpegBin = process.env.FFMPEG_PATH ?? "ffmpeg";

if (!fs.existsSync(input)) {
  console.error("Missing input:", input);
  process.exit(1);
}

console.log(
  "Transcoding → H.264 MP4 (max width 720, moov first) + poster frame…",
);
try {
  execFileSync(
    ffmpegBin,
    [
      "-y",
      "-i",
      input,
      "-an",
      "-vf",
      "scale=min(720\\,iw):-2:flags=lanczos",
      "-c:v",
      "libx264",
      "-profile:v",
      "high",
      "-pix_fmt",
      "yuv420p",
      "-crf",
      "28",
      "-preset",
      "medium",
      "-movflags",
      "+faststart",
      output,
    ],
    { stdio: "inherit" },
  );

  execFileSync(
    ffmpegBin,
    [
      "-y",
      "-i",
      output,
      "-vf",
      "select=eq(n\\,0)",
      "-q:v",
      "3",
      "-frames:v",
      "1",
      "-update",
      "1",
      poster,
    ],
    { stdio: "inherit" },
  );
} catch {
  console.error(
    "\nInstall ffmpeg (e.g. brew install ffmpeg) or set FFMPEG_PATH to the binary.\n",
  );
  process.exit(1);
}

console.log("Wrote", output);
console.log("Wrote", poster);
