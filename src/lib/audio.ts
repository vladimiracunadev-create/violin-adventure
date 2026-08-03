import { frequencyToMidi } from "./pitch";

let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedContext || sharedContext.state === "closed") sharedContext = new AudioContext();
  return sharedContext;
}

/**
 * Estado del audio sin crear un contexto: `idle` es que todavía no hizo falta.
 * Se usa para informar del estado en pantalla sin provocar efectos secundarios.
 */
export function peekAudioState(): "unsupported" | "idle" | AudioContextState {
  if (typeof AudioContext === "undefined") return "unsupported";
  return sharedContext ? sharedContext.state : "idle";
}

export async function ensureAudioReady(): Promise<AudioContext> {
  const context = getAudioContext();
  if (context.state === "suspended") await context.resume();
  return context;
}

// Grabaciones reales de violín (soundfont FluidR3_GM de Frank Wen, CC BY 3.0).
// Para cada nota se guarda su frecuencia real medida, de modo que al reproducir
// se corrige con playbackRate a la frecuencia exacta deseada (afinación perfecta
// y calibración A = 432–446 Hz). Ver docs/CONTENT_LICENSES.md.
const VIOLIN_SAMPLES: Record<number, { file: string; native: number }> = {
  55: { file: "g3", native: 196.31 },
  62: { file: "d4", native: 293.25 },
  64: { file: "e4", native: 329.17 },
  66: { file: "fs4", native: 369.09 },
  67: { file: "g4", native: 390.92 },
  69: { file: "a4", native: 441.02 },
  71: { file: "b4", native: 495.28 },
  73: { file: "cs5", native: 555.85 },
  74: { file: "d5", native: 586.5 },
  76: { file: "e5", native: 659.27 }
};

const bufferCache = new Map<string, Promise<AudioBuffer>>();

function loadSample(file: string): Promise<AudioBuffer> {
  let pending = bufferCache.get(file);
  if (!pending) {
    pending = (async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}audio/violin/${file}.mp3`);
      if (!response.ok) throw new Error(`No se pudo cargar la nota ${file}`);
      return getAudioContext().decodeAudioData(await response.arrayBuffer());
    })();
    pending.catch(() => bufferCache.delete(file));
    bufferCache.set(file, pending);
  }
  return pending;
}

/** Precarga las notas de las cuerdas al aire para una respuesta inmediata. */
export function preloadViolinStrings(): void {
  for (const midi of [55, 62, 69, 76]) {
    const sample = VIOLIN_SAMPLES[midi];
    if (sample) void loadSample(sample.file).catch(() => undefined);
  }
}

/**
 * Reproduce una nota con una grabación real de violín cuando existe para esa
 * altura; si no, recurre al tono sintetizado. `frequency` fija la altura exacta
 * (respetando la calibración), corrigiendo la afinación nativa de la muestra.
 */
let droneNodes: { source: AudioBufferSourceNode; gain: GainNode } | null = null;

/** Sostiene en bucle suave la nota indicada para que la niña la iguale de oído. */
export async function startDrone(frequency: number): Promise<boolean> {
  stopDrone();
  const sample = VIOLIN_SAMPLES[Math.round(frequencyToMidi(frequency, 440))];
  if (!sample) return false;
  try {
    const context = await ensureAudioReady();
    const buffer = await loadSample(sample.file);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.loopStart = 0.3;
    source.loopEnd = Math.max(0.7, buffer.duration - 0.4);
    source.playbackRate.value = frequency / sample.native;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.26, context.currentTime + 0.15);
    source.connect(gain).connect(context.destination);
    source.start();
    droneNodes = { source, gain };
    return true;
  } catch {
    return false;
  }
}

export function stopDrone(): void {
  if (!droneNodes) return;
  const { source, gain } = droneNodes;
  droneNodes = null;
  try { source.stop(); } catch { /* ya detenido */ }
  source.disconnect();
  gain.disconnect();
}

export async function playViolinTone(frequency: number, seconds = 1.6): Promise<void> {
  const sample = VIOLIN_SAMPLES[Math.round(frequencyToMidi(frequency, 440))];
  if (!sample) {
    await playReferenceTone(frequency, seconds);
    return;
  }
  try {
    const context = await ensureAudioReady();
    const buffer = await loadSample(sample.file);
    const now = context.currentTime;
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = frequency / sample.native;
    const gain = context.createGain();
    const release = Math.max(0.06, seconds - 0.28);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.95, now + 0.02);
    gain.gain.setValueAtTime(0.95, now + release);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
    source.connect(gain).connect(context.destination);
    source.start(now);
    source.stop(now + seconds + 0.05);
  } catch {
    await playReferenceTone(frequency, seconds);
  }
}

export async function playReferenceTone(frequency: number, seconds = 1.4): Promise<void> {
  const context = await ensureAudioReady();
  const now = context.currentTime;
  const master = context.createGain();
  const harmonics = [
    { multiplier: 1, gain: 0.2 },
    { multiplier: 2, gain: 0.08 },
    { multiplier: 3, gain: 0.035 },
    { multiplier: 4, gain: 0.018 }
  ];

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.9, now + 0.05);
  master.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
  master.connect(context.destination);

  harmonics.forEach(({ multiplier, gain }) => {
    const oscillator = context.createOscillator();
    const harmonicGain = context.createGain();
    oscillator.type = multiplier === 1 ? "triangle" : "sine";
    oscillator.frequency.value = frequency * multiplier;
    harmonicGain.gain.value = gain;
    oscillator.connect(harmonicGain).connect(master);
    oscillator.start(now);
    oscillator.stop(now + seconds + 0.06);
  });
}

/**
 * Agenda un clic en un instante exacto del reloj de audio. Es síncrona a
 * propósito: el metrónomo la llama desde su planificador y esperar una promesa
 * introduciría justo el jitter que se quiere evitar.
 */
export function scheduleClick(context: AudioContext, when: number, accent = false): void {
  const time = Math.max(when, context.currentTime);
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.frequency.value = accent ? 1150 : 850;
  oscillator.type = "square";
  gain.gain.setValueAtTime(0.14, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.055);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(time);
  oscillator.stop(time + 0.06);
}

export async function playClick(accent = false): Promise<void> {
  const context = await ensureAudioReady();
  scheduleClick(context, context.currentTime, accent);
}

export function speakInstruction(text: string): boolean {
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-CL";
  utterance.rate = 0.88;
  utterance.pitch = 1.05;
  utterance.volume = 0.9;
  window.speechSynthesis.speak(utterance);
  return true;
}
