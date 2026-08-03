# Hoja de ruta

## Publicado

### 1.3 — Requisitos del dispositivo (actual)

- **Estado siempre visible** de micrófono, sonido, voz del dispositivo y guardado
  local, con indicadores en la barra superior.
- **Paso de micrófono en la primera configuración**, opcional y con explicación
  de para qué se usa.
- **Panel «Requisitos y permisos»** en Familia e interruptor propio de micrófono.
- Sin permisos nuevos: se mantiene sin cámara ni ubicación.
> **Limitación conocida:** en Android esta versión no se instala sobre una
> anterior; hay que desinstalar, y eso borra el progreso. Falta configurar la
> clave de firma permanente (ver abajo). El procedimiento para no perder nada
> está en la [guía para familias](docs/PARENT_GUIDE.md#actualizar-la-aplicación-en-android).

### 1.2.1 — Exactitud del pulso

- **Metrónomo sin deriva**: los clics se agendan sobre el reloj de `AudioContext`
  con anticipación, en lugar de dispararse desde `setInterval`. El pulso se
  mantiene exacto aunque el temporizador llegue tarde o la animación se detenga.
- **Detección de tono a ~22 Hz** en vez de en cada frame: un tercio del trabajo
  de CPU en el afinador y en «Tocar conmigo», sin cambio perceptible.

### 1.2 — Práctica y experiencia

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

### Pendiente inmediato — Clave de firma de Android

Sin ella, **cada versión nueva obliga a desinstalar la anterior y borra el
progreso**: racha, insignias, lecciones completadas e historial. Es lo primero
que conviene resolver, porque cada release publicada mientras tanto añade otra
reinstalación con pérdida de datos.

Es una configuración de una sola vez, de unos cinco minutos, con los pasos en
[docs/BUILD_MOBILE.md](docs/BUILD_MOBILE.md#configurar-la-clave-permanente). No
se puede aplicar de forma retroactiva: las instalaciones anteriores necesitarán
igualmente una última desinstalación.

### 1.4 — Alcance y hábitos

- **Internacionalización (es / en / pt)**: interfaz y currículo traducidos y verificados.
- **Perfiles múltiples** (hermanos) en un mismo dispositivo, con migración de esquema.
- **Recordatorios de práctica** opt-in mediante notificaciones locales (plugin Tauri en móvil).
- **PWA jugable** publicada en GitHub Pages para probar sin instalar.
- **Auditoría Lighthouse/PWA** en CI.

### 1.5 — Interactividad musical

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
- Actualización firmada de escritorio (updater Tauri).
- Compilación de iOS con cuenta Apple Developer.
- Publicación en Microsoft Store, Google Play y App Store.
