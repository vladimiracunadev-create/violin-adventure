# Historial de cambios

## 1.1.0 — 2026-07-27

### Añadido

- **Notas de referencia con grabaciones reales de violín** para las diez notas del
  método (Sol3, Re4, Mi4, Fa♯4, Sol4, La4, Si4, Do♯5, Re5, Mi5), tomadas del
  soundfont FluidR3_GM de Frank Wen (CC BY 3.0). Sustituyen a los tonos sintetizados
  en el afinador (cuerdas al aire y desafío de oído), el juego de lectura y las
  lecciones. El clic del metrónomo y las notas fuera de rango siguen sintetizados.
- Corrección de afinación por software (`playbackRate`): cada muestra suena a la
  frecuencia exacta y respeta la calibración A = 432–446 Hz.
- Precarga de las cuatro cuerdas al abrir el afinador y almacenamiento en caché offline.
- Atribución CC BY 3.0 visible en el panel Familia y en el registro de licencias.

## 1.0.0 — 2026-07-27

Primera versión pública. Se publica el repositorio y se habilita la compilación
automática de instaladores para todas las plataformas mediante GitHub Actions.

### Añadido

- Compilación multiplataforma en CI: instalador de Windows (`.msi` y `.exe` NSIS),
  paquete de Android (`.apk` para instalación directa y `.aab` para Google Play),
  Linux (`.deb`, `.AppImage`, `.rpm`) y macOS (`.dmg` universal Intel + Apple Silicon).
- Flujo de release por etiqueta (`v*`) que publica los instaladores como GitHub Release.
- Metadatos de empaquetado para Linux (dependencias del sistema) y macOS
  (versión mínima 10.15), instalador NSIS por usuario en español e inglés.
- Documentación de firma de Android y de la matriz de plataformas.

### Corregido

- Error de compilación de TypeScript en la derivación del PIN familiar
  (`Uint8Array` frente a `BufferSource`) que impedía `pnpm build` con TypeScript 5.9.

## 0.3.0 — 2026-07-25

### Añadido

- Bienvenida inicial con nombre, meta semanal y confirmación de apoyo adulto.
- Insignias de progreso y puntuación persistente de lectura musical.
- PIN familiar opcional derivado con PBKDF2 y sal aleatoria.
- Temporizador persistente basado en hora final absoluta.
- Avisos de falta de conexión, instalación PWA y actualización disponible.
- Iconos PWA PNG de 192 y 512 píxeles y variante maskable.
- Enlace para saltar al contenido, foco visible y gestión accesible de diálogos.
- Pruebas de PIN, temporizador, insignias, migración y compatibilidad de respaldo.
- Suite de dominio ejecutable con Node sin instalar dependencias.
- Guía familiar, plan de ocho semanas, documento de accesibilidad y registro de licencias.

### Cambiado

- Esquema de progreso y formato de respaldo actualizados a la versión 3.
- Migración automática desde versiones 1 y 2.
- La racha expira cuando la última práctica ya no corresponde a hoy o ayer.
- El desafío de afinación reduce actualizaciones visuales y exige mayor estabilidad temporal.
- El service worker permite activar una versión nueva desde la interfaz.
- El panel familiar diferencia información visible de configuraciones protegidas.

### Corregido

- Pérdida del temporizador al cambiar de sección o bloquear la pantalla.
- Puntuación de lectura que se reiniciaba al abandonar la vista.
- Archivos de respaldo de versiones futuras aceptados silenciosamente.
- Posibles identificadores duplicados en sesiones importadas.
- Entrada de archivos oculta que no era accesible mediante teclado.

## 0.2.0 — 2026-07-25

- Curso ampliado a 24 lecciones, ilustraciones, afinador cromático, juego de lectura, metas y respaldo importable.

## 0.1.0

- MVP inicial con 12 lecciones, afinador de cuerdas, metrónomo, temporizador, PWA y Tauri.
