# Compilar para Android e iOS

> **La forma recomendada de obtener instaladores es GitHub Actions.** Al empujar una
> etiqueta `v*` (por ejemplo `v1.0.0`), el flujo `release.yml` compila el `.apk` y el
> `.aab` de Android y los publica en la GitHub Release. iOS se genera con el flujo
> manual `ios.yml`. Las secciones siguientes describen la compilación local.

## Firma de Android en CI

El flujo `release.yml` firma el APK automáticamente. Tiene dos modos:

- **Sin secrets:** genera un keystore efímero por compilación. El APK es instalable,
  pero **no** permite actualizar sobre una instalación previa (cambia la firma) ni
  publicar en Google Play. Sirve para probar la primera versión.
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
keytool -printcert -jarfile MiAventuraConElViolin-1.2.1.apk
```

Si la línea `SHA256:` cambia entre dos versiones, la actualización en el
dispositivo fallará y habrá que desinstalar primero (perdiendo el progreso
guardado, salvo que se exporte antes desde el panel Familia).

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
