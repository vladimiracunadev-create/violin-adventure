# Arquitectura

## Objetivo

Mantener una sola interfaz y un solo currículo para web, Windows, Android e iOS, reduciendo duplicación y conservando la privacidad infantil.

## Capas

```text
Interfaz React
├── Ruta y lecciones
├── Afinador y desafío auditivo
├── Metrónomo y práctica
└── Panel familiar
        │
Dominio TypeScript
├── curriculum.ts
├── pitch.ts y audio.ts
├── storage.ts y practiceTimer.ts
├── familyPin.ts
└── achievements.ts
        │
Plataformas
├── Navegador / PWA
└── Tauri 2 / Rust
    ├── Windows
    ├── Android
    └── iOS
```

## Contenido

Las 24 lecciones se definen como objetos TypeScript validados por pruebas de integridad. Cada lección incluye objetivo, habilidades, cuatro o más pasos, pregunta final, recompensa y guía visual opcional.

El contenido no está mezclado con la lógica del afinador ni con la persistencia. Una evolución futura puede moverlo a paquetes JSON firmados sin reescribir la interfaz.

## Audio

### Referencias

Web Audio genera tonos con varios armónicos. Son referencias sintéticas, no una imitación fiel del timbre de un violín.

### Afinación

1. `getUserMedia` abre el micrófono después de una acción explícita.
2. `AnalyserNode` entrega muestras temporales.
3. `autoCorrelate` estima la frecuencia fundamental.
4. La frecuencia se convierte a MIDI relativo a la calibración elegida.
5. La interfaz presenta nota, frecuencia, cents e historial.

La versión actual ejecuta el análisis en el hilo principal. `AudioWorklet` queda pendiente para mejorar estabilidad en dispositivos lentos.

### Desafío de nota

El desafío exige una nota MIDI coincidente y una desviación máxima de 15 cents durante varias detecciones consecutivas. Es una actividad motivacional, no una evaluación docente ni una medición acústica certificada.

## Persistencia

`storage.ts` mantiene un esquema `ProgressState` versión 3. Los datos se normalizan al cargar e importar, se escriben primero en una clave temporal y luego en la clave principal.

La versión 3 migra datos de las versiones 1 y 2. Los respaldos incluyen identificador de aplicación, versión de formato y fecha de exportación. Los respaldos de formatos futuros se rechazan para evitar una migración destructiva.

## PWA

El service worker guarda la carcasa, iconos e ilustraciones. Las navegaciones intentan red y usan la página almacenada como respaldo. Los recursos estáticos usan caché con actualización en segundo plano. Cuando existe un worker nuevo, la interfaz permite activarlo explícitamente y recargar la aplicación.

## Tauri

Tauri sirve el frontend compilado dentro de una WebView. La configuración mantiene permisos mínimos; los proyectos móviles reciben los textos y permisos de micrófono mediante el script `configure-mobile-permissions.mjs`.

## Decisiones de privacidad

- Sin servidor y sin autenticación.
- Sin SDK publicitario o analítico.
- Sin almacenamiento de audio.
- Sin permisos de cámara o ubicación.
- Exportación solo por acción de la persona usuaria.

## Riesgos conocidos

- Diferencias de micrófonos y procesamiento de audio entre dispositivos.
- `localStorage` puede borrarse al limpiar datos de la aplicación.
- La voz del dispositivo puede no existir o variar entre plataformas.
- El currículo no ha sido validado todavía por una profesora de violín infantil.

## Cambios de la versión 0.3

- El progreso usa el esquema 3 y migra datos de los esquemas anteriores.
- El temporizador guarda una hora final absoluta para recuperar el tiempo después de suspensión o navegación.
- El PIN familiar se deriva localmente con PBKDF2; la credencial guarda sal y hash, nunca el PIN en texto claro.
- Las insignias se calculan desde el progreso y no duplican estado persistente.
- La instalación y actualización PWA se comunican mediante eventos locales entre el registro del service worker y React.
- Los diálogos reutilizan un hook de foco para teclado y tecnologías de asistencia.
