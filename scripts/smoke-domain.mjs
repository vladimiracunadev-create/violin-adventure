import {
  autoCorrelate,
  frequencyForMidi,
  nearestChromaticNote,
  nearestViolinString
} from "../src/lib/pitch.ts";
import { normalizeProgress, parseProgressImport, weeklyMinutes } from "../src/lib/storage.ts";
import { lessons, worlds } from "../src/data/curriculum.ts";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const sampleRate = 48_000;
const detections = [];
for (const expected of [196, 293.66, 440, 493.88, 659.25, 880]) {
  const buffer = new Float32Array(4096);
  for (let index = 0; index < buffer.length; index += 1) {
    buffer[index] = 0.7 * Math.sin((2 * Math.PI * expected * index) / sampleRate)
      + 0.12 * Math.sin((4 * Math.PI * expected * index) / sampleRate);
  }
  const detected = autoCorrelate(buffer, sampleRate);
  assert(detected !== null, `No se detectó ${expected} Hz.`);
  const cents = 1200 * Math.log2(detected / expected);
  assert(Math.abs(cents) < 1, `Error excesivo para ${expected} Hz: ${cents} cents.`);
  detections.push({ expected, detected: Number(detected.toFixed(2)), cents: Number(cents.toFixed(3)) });
}

assert(nearestViolinString(441).scientific === "A4", "No se reconoció la cuerda La.");
assert(nearestChromaticNote(493.88).scientific === "B4", "No se reconoció Si4.");
assert(Math.abs(frequencyForMidi(69, 442) - 442) < 0.0001, "Falló la calibración de La.");
assert(lessons.length === 24 && worlds.length === 6, "El tamaño del currículo no coincide.");
assert(new Set(lessons.map((lesson) => lesson.id)).size === lessons.length, "Hay ID de lección duplicados.");
assert(lessons.every((lesson, index) => lesson.order === index + 1 && lesson.steps.length >= 4), "El currículo no es consecutivo o tiene lecciones incompletas.");

const migrated = normalizeProgress({ childName: " Ana ", completedLessonIds: ["one", "one"], practiceSessions: [] });
assert(migrated.schemaVersion === 3 && migrated.childName === "Ana", "Falló la migración del progreso.");
let rejected = false;
try { parseProgressImport("{}"); } catch { rejected = true; }
assert(rejected, "Se aceptó un archivo de progreso no reconocible.");
const weekly = weeklyMinutes([
  { id: "a", date: "2026-07-20T10:00:00", minutes: 10, focus: "Ritmo", note: "" },
  { id: "b", date: "2026-07-19T10:00:00", minutes: 30, focus: "Arco", note: "" }
], new Date("2026-07-25T12:00:00"));
assert(weekly === 10, "Falló el cálculo semanal.");

console.log(JSON.stringify({ status: "ok", lessons: lessons.length, worlds: worlds.length, weeklyMinutes: weekly, detections }, null, 2));
