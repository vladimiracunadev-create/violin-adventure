import { test, expect, type Page } from "@playwright/test";

// Semilla mínima para saltar la bienvenida y activar el sonido.
// Bloquea el service worker para que su recarga no aborte la navegación.
async function seed(page: Page, extra: Record<string, unknown> = {}) {
  await page.route("**/sw.js", (route) => route.abort());
  await page.addInitScript((data) => {
    localStorage.setItem("violin-adventure-progress-v3", JSON.stringify(data));
  }, { schemaVersion: 3, onboardingCompleted: true, childName: "Test", soundEnabled: true, ...extra });
}

test("carga el inicio sin errores de consola", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await seed(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Hola/ })).toBeVisible();
  expect(errors, errors.join("\n")).toHaveLength(0);
});

test("navega por todas las secciones", async ({ page }) => {
  await seed(page);
  const screens: Array<[string, RegExp]> = [
    ["path", /Ruta de 24 lecciones/],
    ["tuner", /Afinador crom/],
    ["rhythm", /Metrónomo y pulso/],
    ["songs", /Canciones/],
    ["practice", /Sesión de práctica/],
    ["family", /Panel familiar/]
  ];
  for (const [screen, heading] of screens) {
    await page.goto(`/?screen=${screen}`);
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
  }
});

test("reproduce una canción con muestras reales de violín", async ({ page }) => {
  await seed(page);
  await page.goto("/?screen=songs");
  const audioResponse = page.waitForResponse(
    (r) => /\/audio\/violin\/.*\.mp3/.test(r.url()) && r.status() === 200,
    { timeout: 10_000 }
  );
  await page.getByRole("button", { name: /Escuchar/ }).click();
  // La reproducción arranca (aparece Detener) y se descarga una muestra real.
  await expect(page.getByRole("button", { name: /Detener/ })).toBeVisible();
  await audioResponse;
  await expect(page.locator(".song-note.active")).toHaveCount(1);
});

test("el tema oscuro forzado aplica data-theme", async ({ page }) => {
  await seed(page, { theme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
