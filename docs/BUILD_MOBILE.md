# Compilar para Android e iOS

> **La forma recomendada de obtener instaladores es GitHub Actions.** Al empujar una
> etiqueta `v*` (por ejemplo `v1.0.0`), el flujo `release.yml` compila el `.apk` y el
> `.aab` de Android y los publica en la GitHub Release. iOS se genera con el flujo
> manual `ios.yml`. Las secciones siguientes describen la compilación local.

## Firma de Android en CI

### Para qué sirve la clave de firma

Android exige que toda aplicación esté firmada. La firma no cifra ni protege el
contenido: sirve para responder a una única pregunta cuando llega una
actualización.

> ¿Esta versión nueva viene de quien hizo la que ya está instalada?

Android compara la firma de la versión instalada con la de la nueva. Si
coinciden, la reemplaza **conservando los datos locales**. Si no coinciden, se
niega a instalarla: asume que alguien intenta suplantar la aplicación. Es como el
sello de una carta — no oculta nada, solo acredita quién la envía.

El *keystore* es el archivo que contiene esa clave, protegido con una contraseña.

**Consecuencia práctica para esta aplicación:** el progreso de la niña (racha,
insignias, lecciones completadas e historial de práctica) vive en el
almacenamiento local del dispositivo. Si Android rechaza la actualización, hay
que desinstalar, y desinstalar borra ese almacenamiento. Firmar siempre con la
misma clave es lo que convierte una actualización en algo transparente en vez de
una pérdida de datos.

Por eso el keystore persistente no es un detalle de publicación: es lo que hace
que actualizar la aplicación sea una experiencia normal.

### Los dos modos del flujo

El flujo `release.yml` firma el APK automáticamente:

- **Sin secrets:** genera un keystore efímero por compilación y lo descarta al
  terminar. Cada versión queda firmada con una clave distinta, así que **ninguna
  puede instalarse sobre otra** ni publicarse en Google Play. Solo sirve para
  probar una primera versión suelta. El flujo emite un aviso cuando ocurre.
- **Con keystore persistente (recomendado):** define estos secrets del repositorio
  (`Ajustes > Secrets and variables > Actions`) para firmar siempre con la misma clave:

  | Secret | Contenido |
  | --- | --- |
  | `ANDROID_KEYSTORE_BASE64` | Keystore `.jks` codificado en base64 |
  | `ANDROID_KEY_ALIAS` | Alias de la clave dentro del keystore |
  | `ANDROID_STORE_PASSWORD` | Contraseña del keystore |
  | `ANDROID_KEY_PASSWORD` | Contraseña de la clave |

  Para generar el keystore una sola vez y codificarlo:

  ```bash
  keytool -genkeypair -v -keystore release.jks -alias violin \
    -keyalg RSA -keysize 2048 -validity 10000
  base64 -w0 release.jks   # copia el resultado en ANDROID_KEYSTORE_BASE64
  ```

  En Windows (PowerShell), `base64` no existe y `keytool` suele venir con Android
  Studio:

  ```powershell
  & "$env:LOCALAPPDATA\Programs\Android Studio\jbr\bin\keytool.exe" -genkeypair -v -keystore release.jks -alias violin -keyalg RSA -keysize 2048 -validity 10000
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("release.jks")) | Set-Clipboard
  ```

  Guarda `release.jks` en un lugar seguro y **nunca** lo subas al repositorio.
  Si se pierde, no hay forma de volver a firmar con esa clave: todas las
  instalaciones existentes quedan sin ruta de actualización.

### Comprobar con qué clave está firmado un APK

Dos APK firmados con claves distintas no se pueden instalar uno sobre otro. Para
comparar la huella del certificado:

```bash
keytool -printcert -jarfile MiAventuraConElViolin-<version>.apk
```

Si la línea `SHA256:` cambia entre dos versiones, la actualización en el
dispositivo fallará y habrá que desinstalar primero (perdiendo el progreso
guardado, salvo que se exporte antes desde el panel Familia).

Esta es la comprobación que confirma que el keystore persistente quedó bien
configurado: **la huella debe ser idéntica en dos releases consecutivas**. Que el
workflow termine en verde no lo demuestra — con keystore efímero también termina
en verde, y firma cada versión con una clave distinta.

### Historial de firmas

Las versiones 1.2.0 y 1.2.1 se publicaron antes de configurar el keystore
persistente, cada una con una clave efímera irrecuperable:

| Versión | Huella SHA-256 del certificado |
| --- | --- |
| 1.2.0 | `6C:1F:75:67:C7:88:8F:B2…` (efímera, perdida) |
| 1.2.1 | `43:3D:B8:AB:E4:A9:93:4A…` (efímera, perdida) |

Quien tenga instalada cualquiera de esas versiones necesita **una desinstalación
más** para pasar a la primera versión firmada con la clave permanente. Conviene
exportar el respaldo desde el panel Familia antes de hacerlo, e importarlo
después. A partir de ahí, las actualizaciones se instalan encima sin pérdida.

## Android

### Requisitos

- Android Studio.
- Android SDK y NDK compatibles con Tauri.
- Java/JDK configurado.
- Rust y destinos Android.
- Node.js y pnpm.

### Inicialización

```bash
pnpm install
pnpm android:init
```

El comando ejecuta Tauri y luego `scripts/configure-mobile-permissions.mjs`, que agrega:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

Si vuelves a generar el proyecto nativo, ejecuta:

```bash
pnpm mobile:permissions
```

### Desarrollo y compilación

```bash
pnpm android:dev
pnpm android:build
```

La publicación en Google Play requiere una clave de firma, ficha de privacidad, iconos rasterizados y capturas definitivas.

## iOS

### Requisitos

- Un equipo macOS.
- Xcode.
- Destinos Rust para iOS.
- Cuenta Apple Developer para instalar en dispositivos o publicar.

### Inicialización

```bash
pnpm install
pnpm ios:init
pnpm mobile:permissions
```

La descripción `NSMicrophoneUsageDescription` está en `src-tauri/Info.ios.plist`; el script revisa también archivos generados.

### Desarrollo y compilación

```bash
pnpm ios:dev
pnpm ios:build
```

## Antes de publicar

- Reemplazar el icono SVG por el conjunto de iconos PNG requerido por cada tienda.
- Probar afinación con distintos micrófonos y ambientes.
- Revisar textos de privacidad infantil.
- Probar teléfonos de gama baja y tabletas.
- Realizar evaluación pedagógica con profesora o profesor de violín.
- Preparar política de soporte y eliminación de datos.
