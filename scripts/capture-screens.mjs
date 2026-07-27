// Captura las pantallas de la app en tamaño teléfono para documentación y landing.
// Requiere el servidor dev en :1420 y playwright (instalación puntual, no es dependencia del proyecto):
//   pnpm dlx playwright install chromium
//   pnpm dlx playwright@1.62 exec node scripts/capture-screens.mjs
// o instala playwright temporalmente. Uso: node scripts/capture-screens.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:1420";
const OUT = join(process.cwd(), "docs", "screenshots");
mkdirSync(OUT, { recursive: true });

// Progreso de demostración realista de una niña de 10 años a mitad del curso.
const iso = (daysAgo) => new Date(Date.now() - daysAgo * 86_400_000).toISOString();
const today = new Date().toISOString().slice(0, 10);
const demo = {
  schemaVersion: 3,
  onboardingCompleted: true,
  childName: "Sofía",
  completedLessonIds: [
    "meet-the-violin", "healthy-posture", "bow-pencil", "bow-care",
    "open-strings", "steady-pulse", "first-pizzicato"
  ],
  practiceSessions: [
    { id: "s1", date: iso(0), minutes: 15, focus: "Sonido y arco", note: "Mantuve el arco más recto 🎶" },
    { id: "s2", date: iso(1), minutes: 10, focus: "Afinación de dedos", note: "Encontré el Sol más rápido" },
    { id: "s3", date: iso(2), minutes: 20, focus: "Ritmo", note: "" },
    { id: "s4", date: iso(3), minutes: 10, focus: "Postura y relajación", note: "Hombros abajo" }
  ],
  streak: 4,
  lastPracticeDate: today,
  largeText: false,
  soundEnabled: true,
  weeklyGoalMinutes: 45,
  tunerCalibration: 440,
  pitchChallengesCompleted: 6,
  readingCorrect: 18,
  readingAttempts: 21
};

const screens = [
  { id: "home", file: "01-inicio.png" },
  { id: "path", file: "02-ruta.png" },
  { id: "tuner", file: "03-afinador.png" },
  { id: "rhythm", file: "04-ritmo.png" },
  { id: "practice", file: "05-practica.png" },
  { id: "family", file: "06-familia.png" }
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  colorScheme: "light"
});
await context.addInitScript((data) => {
  localStorage.setItem("violin-adventure-progress-v3", JSON.stringify(data));
}, demo);

const page = await context.newPage();

for (const screen of screens) {
  await page.goto(`${BASE}/?screen=${screen.id}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: join(OUT, screen.file) });
  console.log(`✓ ${screen.file}`);
}

// Una lección abierta (muestra pasos, seguridad y desafío) sobre la ruta.
await page.goto(`${BASE}/?screen=path`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const lessonButton = page.locator(".lesson-row:not([disabled])").first();
if (await lessonButton.count()) {
  await lessonButton.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(OUT, "07-leccion.png") });
  console.log("✓ 07-leccion.png");
}

await browser.close();
console.log(`\nCapturas en ${OUT}`);
