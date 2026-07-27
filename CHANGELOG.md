# Historial de cambios

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
