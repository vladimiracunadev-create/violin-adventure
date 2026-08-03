# Historial de cambios

## 1.3.0 — 2026-08-03

### Añadido

- **Estado del dispositivo siempre visible.** Cuatro indicadores en la barra
  superior (🎤 micrófono, 🔊 sonido, 🗣️ voz del dispositivo, 💾 guardado local)
  muestran de un vistazo qué está activo. Pulsar cualquiera lleva al panel donde
  se gestionan.
- **Paso de micrófono en la primera configuración**: explica para qué se usa,
  permite concederlo ahí mismo y deja continuar sin él. Es opcional a propósito:
  las lecciones, el metrónomo y las canciones funcionan igual.
- **Panel «Requisitos y permisos»** en la sección Familia, con el estado de cada
  elemento, qué se pierde si falta y qué hacer para arreglarlo. Cuando el sistema
  tiene el micrófono denegado se indica que hay que cambiarlo en los ajustes del
  dispositivo, porque una aplicación no puede reconceder un permiso denegado.
- **Interruptor de micrófono propio de la aplicación**: al apagarlo, el afinador
  y «Tocar conmigo» quedan desactivados con un aviso claro y no se vuelve a pedir
  permiso al sistema.

### Limitación conocida en Android

**Esta versión no se puede instalar encima de una anterior.** Hay que desinstalar
primero, y desinstalar borra el progreso guardado en el dispositivo.

El motivo es que el repositorio todavía no tiene configurada una clave de firma
permanente, así que cada compilación genera una distinta y Android rechaza la
actualización por no reconocer al autor. Está pendiente de resolver y explicado
en [docs/BUILD_MOBILE.md](docs/BUILD_MOBILE.md).

Para no perder la racha, las insignias ni el historial, sigue el procedimiento de
la [guía para familias](docs/PARENT_GUIDE.md#actualizar-la-aplicación-en-android):
exportar el respaldo antes de desinstalar e importarlo después.

### Nota sobre privacidad

No se añadió ningún permiso nuevo. La aplicación sigue **sin usar cámara ni
ubicación**, y el micrófono continúa siendo el único permiso del sistema. Los
indicadores solo informan de lo que ya se usaba.

## 1.2.1 — 2026-08-03

### Corregido

- **El metrónomo ya no se desvía.** Marcaba el pulso con `setInterval`, que
  acumula deriva y el navegador estrangula cuando la pantalla se atenúa o la
  aplicación pasa a segundo plano: el pulso se volvía irregular justo donde la
  exactitud importa. Ahora un planificador con anticipación agenda cada clic
  sobre el reloj de `AudioContext`, exacto a nivel de muestra. Medido en el
  navegador a 120 BPM: 78 clics con 500,000 ms de separación y **0 ms de deriva
  acumulada**, incluso con la animación completamente detenida.
- El cambio de tempo se aplica en caliente sin reiniciar el compás; cambiar la
  métrica (pulsos o subdivisión) sí lo reinicia, como corresponde.

### Cambiado

- **La detección de tono ya no corre en cada frame.** La autocorrelación sobre
  4096 muestras supera el millón de operaciones, así que ejecutarla a 60 Hz
  saturaba el hilo visual y la batería del móvil. Pasa a ~22 Hz (una cada 45 ms),
  un tercio del trabajo, sin cambio perceptible en el afinador ni en el modo
  «Tocar conmigo». Los umbrales de estabilidad se reajustaron para conservar los
  mismos tiempos de reacción.
- La animación del metrónomo consume los clics ya sonados en lugar de marcar el
  pulso, de modo que un frame perdido no descoloca el audio.

- **Las pruebas E2E ya no compiten contra una recarga del service worker.** Al
  tomar el control, el worker dispara `controllerchange` y recarga la página,
  borrando el estado de React en mitad de una prueba. El bloqueo que había
  (`page.route` sobre `/sw.js`) no llegaba a aplicarse, porque esa petición la
  hace el contexto del navegador y no la página; ahora se bloquea desde la
  configuración de Playwright. La suite pasa de tardar entre 8 y 20 s, con
  fallos intermitentes, a unos 6 s estables.

### Añadido

- Suite de pruebas del planificador del metrónomo (rejilla exacta bajo un
  temporizador con jitter, cambio de tempo, reinicio de compás) y prueba E2E que
  verifica que el compás avanza en un navegador real.

## 1.2.0 — 2026-07-27

### Añadido

- **Modo oscuro** con selección Sistema / Claro / Oscuro (persistente) y respeto
  de `prefers-reduced-motion` en las animaciones.
- **Sección Canciones**: tres melodías de dominio público (Estrellita, Himno a la
  alegría y Mi corderito) tocadas con grabaciones reales de violín, con modo
  «Tocar conmigo» que usa el micrófono para comprobar, nota a nota, que la niña
  toca la melodía correcta. El audio se analiza en tiempo real y nunca se graba.
- **Metrónomo**: *tap-tempo* (marcar el pulso) y modo visual silencioso.
- **Modo drone** en el afinador: sostiene la nota objetivo en bucle suave para
  igualarla de oído.
- **Gráfico de minutos por semana** (últimas 8 semanas) en el panel Familia.
- Animación sutil de las guías visuales de las lecciones.
- Pruebas **E2E con Playwright** integradas en el flujo de CI.

### Cambiado

- Superficies migradas a variables de tema para soportar claro y oscuro.
- Navegación inferior ampliada a siete secciones (incluye Canciones).

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
