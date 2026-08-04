// Generador del icono de la aplicación.
//
// Dibuja el violín a 4× y reduce a 1024 px, para que los bordes queden suaves
// sin depender de bibliotecas de rasterizado externas. A partir de esa fuente,
// `pnpm tauri icon` genera los formatos de cada plataforma; aquí se producen
// además los iconos de la PWA, que Tauri no cubre.
//
// Uso: node scripts/generate-icons.mjs   (requiere Python con Pillow)

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");

const script = String.raw`
from PIL import Image, ImageDraw
import os

S = 4096              # lienzo de trabajo
FINAL = 1024
CX = S // 2

MORADO_CLARO = (118, 88, 247)
MORADO_OSCURO = (78, 47, 211)
MADERA_CLARA = (247, 200, 130)
MADERA = (232, 155, 60)
MADERA_OSCURA = (150, 82, 20)
DIAPASON = (52, 33, 74)
CUERDA = (255, 248, 235)

def lienzo():
    return Image.new("L", (S, S), 0)

def marca(fn):
    capa = lienzo()
    fn(ImageDraw.Draw(capa))
    return capa

def fondo_degradado():
    base = Image.new("RGB", (S, S), MORADO_CLARO)
    px = base.load()
    for y in range(S):
        t = y / (S - 1)
        c = tuple(int(a + (b - a) * t) for a, b in zip(MORADO_CLARO, MORADO_OSCURO))
        for x in range(S):
            px[x, y] = c
    return base

def esquinas_redondeadas(img, radio):
    mascara = marca(lambda d: d.rounded_rectangle([0, 0, S - 1, S - 1], radius=radio, fill=255))
    img.putalpha(mascara)
    return img

# --- Silueta del violín -----------------------------------------------------
# El contorno se construye por composición: se unen los dos bombos y el centro,
# y luego se restan dos círculos laterales para tallar la cintura. Dibujar la
# curva a mano daría una forma menos limpia al reducir.

BOMBO_INF_Y, BOMBO_INF_RX, BOMBO_INF_RY = 3010, 755, 510
BOMBO_SUP_Y, BOMBO_SUP_RX, BOMBO_SUP_RY = 2130, 625, 425
CINTURA_Y, CINTURA_R, CINTURA_DX = 2555, 385, 930

def silueta_cuerpo():
    m = lienzo()
    d = ImageDraw.Draw(m)
    d.ellipse([CX - BOMBO_INF_RX, BOMBO_INF_Y - BOMBO_INF_RY,
               CX + BOMBO_INF_RX, BOMBO_INF_Y + BOMBO_INF_RY], fill=255)
    d.ellipse([CX - BOMBO_SUP_RX, BOMBO_SUP_Y - BOMBO_SUP_RY,
               CX + BOMBO_SUP_RX, BOMBO_SUP_Y + BOMBO_SUP_RY], fill=255)
    d.rectangle([CX - 560, BOMBO_SUP_Y, CX + 560, BOMBO_INF_Y], fill=255)
    for signo in (-1, 1):
        cx = CX + signo * CINTURA_DX
        d.ellipse([cx - CINTURA_R, CINTURA_Y - CINTURA_R,
                   cx + CINTURA_R, CINTURA_Y + CINTURA_R], fill=0)
    return m

def degradado_madera():
    g = Image.new("RGB", (S, S), MADERA)
    px = g.load()
    y0, y1 = BOMBO_SUP_Y - BOMBO_SUP_RY, BOMBO_INF_Y + BOMBO_INF_RY
    for y in range(S):
        t = min(1.0, max(0.0, (y - y0) / (y1 - y0)))
        c = tuple(int(a + (b - a) * t) for a, b in zip(MADERA_CLARA, MADERA))
        for x in range(S):
            px[x, y] = c
    return g

def efe(signo):
    """Oído en forma de f, espejado a cada lado del cordal."""
    m = lienzo()
    d = ImageDraw.Draw(m)
    x = CX + signo * 360
    # Trazo central ligeramente inclinado, como en un violín real.
    d.line([(x + signo * 30, 2420), (x - signo * 30, 2980)], fill=255, width=58)
    d.ellipse([x + signo * 30 - 72, 2348, x + signo * 30 + 72, 2492], fill=255)
    d.ellipse([x - signo * 30 - 72, 2908, x - signo * 30 + 72, 3052], fill=255)
    return m

def construir():
    img = esquinas_redondeadas(fondo_degradado(), int(S * 0.22))

    cuerpo = silueta_cuerpo()
    img.paste(degradado_madera(), (0, 0), cuerpo)

    d = ImageDraw.Draw(img)

    # Mástil, clavijero y voluta, por encima del bombo superior.
    d.rounded_rectangle([CX - 145, 900, CX + 145, 2200], radius=132, fill=MADERA_OSCURA)
    for lado in (-1, 1):
        for y in (1010, 1230):
            d.ellipse([CX + lado * 150 - 90, y - 52, CX + lado * 150 + 90, y + 52], fill=MADERA_CLARA)
    d.ellipse([CX - 250, 640, CX + 250, 1140], fill=MADERA_OSCURA)
    d.ellipse([CX - 155, 735, CX + 155, 1045], fill=MADERA_CLARA)
    d.ellipse([CX - 62, 828, CX + 62, 952], fill=MADERA_OSCURA)

    # Diapasón sobre el mástil, terminando antes del puente.
    d.rounded_rectangle([CX - 102, 980, CX + 102, 2520], radius=94, fill=DIAPASON)

    # Oídos en f.
    for signo in (-1, 1):
        img.paste(MADERA_OSCURA, (0, 0), efe(signo))

    # Puente y cordal.
    d.polygon([(CX - 215, 2600), (CX + 215, 2600), (CX + 155, 2730), (CX - 155, 2730)], fill=MADERA_OSCURA)
    d.rounded_rectangle([CX - 130, 2730, CX + 130, 3390], radius=70, fill=DIAPASON)

    # Cuerdas: del clavijero al cordal, abriéndose ligeramente.
    for dx in (-84, -28, 28, 84):
        d.line([(CX + dx * 0.5, 900), (CX + dx, 2650)], fill=CUERDA, width=22)

    return img.resize((FINAL, FINAL), Image.LANCZOS)

raiz = os.environ["RAIZ"]
icono = construir()

fuente = os.path.join(raiz, "assets", "icon-source.png")
os.makedirs(os.path.dirname(fuente), exist_ok=True)
icono.save(fuente)
print("fuente:", fuente)

# --- Iconos de la PWA -------------------------------------------------------
iconos = os.path.join(raiz, "public", "icons")
icono.save(os.path.join(iconos, "app-icon.png"))
icono.resize((512, 512), Image.LANCZOS).save(os.path.join(iconos, "icon-512.png"))
icono.resize((192, 192), Image.LANCZOS).save(os.path.join(iconos, "icon-192.png"))

# El icono maskable se recorta con formas distintas según el lanzador de
# Android, así que va a sangre y con el dibujo dentro de la zona segura (80%).
maskable = Image.new("RGBA", (512, 512), (78, 47, 211, 255))
interior = icono.resize((410, 410), Image.LANCZOS)
maskable.paste(interior, (51, 51), interior)
maskable.save(os.path.join(iconos, "icon-maskable-512.png"))
print("PWA: app-icon, 512, 192, maskable-512")
`;

execFileSync("python", ["-c", script], {
  cwd: raiz,
  env: { ...process.env, RAIZ: raiz },
  stdio: "inherit"
});
