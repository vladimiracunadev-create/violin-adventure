import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const androidManifest = join(root, "src-tauri", "gen", "android", "app", "src", "main", "AndroidManifest.xml");
const permission = '<uses-permission android:name="android.permission.RECORD_AUDIO" />';

if (existsSync(androidManifest)) {
  const content = readFileSync(androidManifest, "utf8");
  if (!content.includes("android.permission.RECORD_AUDIO")) {
    const updated = content.replace(/<manifest([^>]*)>/, `<manifest$1>\n    ${permission}`);
    writeFileSync(androidManifest, updated);
    console.log("✓ Permiso RECORD_AUDIO agregado a AndroidManifest.xml");
  } else {
    console.log("✓ Android ya tiene permiso de micrófono");
  }
} else {
  console.log("ℹ Android aún no está inicializado; ejecuta: pnpm android:init");
}

const appleRoot = join(root, "src-tauri", "gen", "apple");
function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const infoFiles = walk(appleRoot).filter((path) => path.endsWith("Info.plist"));
for (const infoFile of infoFiles) {
  const content = readFileSync(infoFile, "utf8");
  if (!content.includes("NSMicrophoneUsageDescription")) {
    const entry = "  <key>NSMicrophoneUsageDescription</key>\n  <string>El micrófono se usa únicamente para mostrar la afinación del violín en tiempo real. El audio no se graba ni se envía.</string>\n";
    writeFileSync(infoFile, content.replace("</dict>", `${entry}</dict>`));
    console.log(`✓ Descripción de micrófono agregada a ${infoFile}`);
  }
}

if (!existsSync(appleRoot)) {
  console.log("ℹ iOS aún no está inicializado; ejecútalo desde macOS con: pnpm ios:init");
}
