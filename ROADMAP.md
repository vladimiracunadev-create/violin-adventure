# Hoja de ruta

## Publicado

### 1.2 — Práctica y experiencia (actual)

- **Modo oscuro** con selección Sistema / Claro / Oscuro y respeto de `prefers-reduced-motion`.
- **Canciones**: tres melodías de dominio público tocadas con violín real, con modo
  «Tocar conmigo» que detecta con el micrófono si la niña toca cada nota en secuencia.
- **Metrónomo** con *tap-tempo* y modo visual (silencioso).
- **Modo drone** en el afinador: sostiene la nota objetivo para igualarla de oído.
- **Gráfico de minutos por semana** en el panel Familia.
- Animación sutil de las guías visuales.
- Pruebas **E2E (Playwright)** integradas en CI.

### 1.1 — Audio real

- Notas de referencia con grabaciones reales de violín (FluidR3_GM, CC BY 3.0),
  afinadas por software a la calibración elegida.

### 1.0 — Primera versión pública

- 24 lecciones, afinador cromático, metrónomo, práctica guiada, insignias y panel familiar.
- Compilación automática de instaladores (Windows, Android, Linux, macOS) por GitHub Actions.
- Landing page en GitHub Pages.

## Planificado

### 1.3 — Alcance y hábitos

- **Internacionalización (es / en / pt)**: interfaz y currículo traducidos y verificados.
- **Perfiles múltiples** (hermanos) en un mismo dispositivo, con migración de esquema.
- **Recordatorios de práctica** opt-in mediante notificaciones locales (plugin Tauri en móvil).
- **PWA jugable** publicada en GitHub Pages para probar sin instalar.
- **Auditoría Lighthouse/PWA** en CI.

### 1.4 — Interactividad musical

- Reconocimiento de ataques, duración y ritmo; lectura a primera vista.
- `AudioWorklet` para análisis fuera del hilo visual.
- Calibración de ruido ambiental y tolerancias por micrófono.
- Más repertorio de dominio público, versionado y con licencias documentadas.

### Pendiente transversal — Validación pedagógica (requiere personas)

- **Revisión completa por una profesora o profesor de violín infantil** (ver
  [docs/TEACHER_REVIEW.md](docs/TEACHER_REVIEW.md)). No puede sustituirse por software.
- Prueba piloto con familias y observación de sesiones reales.
- Ensayos acústicos con distintos micrófonos y dispositivos.
- Ajuste del currículo según resultados medidos, no solo opiniones.

### Distribución en tiendas

- Auditoría de accesibilidad y privacidad infantil.
- Keystore de Android persistente y actualización firmada de escritorio (updater Tauri).
- Compilación de iOS con cuenta Apple Developer.
- Publicación en Microsoft Store, Google Play y App Store.
