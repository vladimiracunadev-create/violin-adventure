const NOTE_NAMES_ES = ["Do", "Do♯", "Re", "Mi♭", "Mi", "Fa", "Fa♯", "Sol", "Sol♯", "La", "Si♭", "Si"] as const;
const NOTE_NAMES_SCIENTIFIC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export const BASE_VIOLIN_STRINGS = [
  { name: "Sol", scientific: "G3", midi: 55 },
  { name: "Re", scientific: "D4", midi: 62 },
  { name: "La", scientific: "A4", midi: 69 },
  { name: "Mi", scientific: "E5", midi: 76 }
] as const;

export const BEGINNER_NOTES = [
  { name: "Sol", scientific: "G3", midi: 55 },
  { name: "Re", scientific: "D4", midi: 62 },
  { name: "Mi", scientific: "E4", midi: 64 },
  { name: "Fa♯", scientific: "F#4", midi: 66 },
  { name: "Sol", scientific: "G4", midi: 67 },
  { name: "La", scientific: "A4", midi: 69 },
  { name: "Si", scientific: "B4", midi: 71 },
  { name: "Do♯", scientific: "C#5", midi: 73 },
  { name: "Re", scientific: "D5", midi: 74 },
  { name: "Mi", scientific: "E5", midi: 76 }
] as const;

export interface PitchResult {
  frequency: number;
  noteName: string;
  scientific: string;
  targetFrequency: number;
  cents: number;
  midi: number;
}

export interface ViolinStringResult extends PitchResult {
  stringName: string;
}

export function frequencyForMidi(midi: number, referenceA = 440): number {
  return referenceA * 2 ** ((midi - 69) / 12);
}

export function frequencyToMidi(frequency: number, referenceA = 440): number {
  return 69 + 12 * Math.log2(frequency / referenceA);
}

export function centsBetween(frequency: number, target: number): number {
  return 1200 * Math.log2(frequency / target);
}

export function getViolinStrings(referenceA = 440) {
  return BASE_VIOLIN_STRINGS.map((item) => ({
    ...item,
    frequency: frequencyForMidi(item.midi, referenceA)
  }));
}

export const VIOLIN_STRINGS = getViolinStrings();

export function nearestChromaticNote(frequency: number, referenceA = 440): PitchResult {
  const midi = Math.round(frequencyToMidi(frequency, referenceA));
  const pitchClass = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  const targetFrequency = frequencyForMidi(midi, referenceA);

  return {
    frequency,
    noteName: NOTE_NAMES_ES[pitchClass],
    scientific: `${NOTE_NAMES_SCIENTIFIC[pitchClass]}${octave}`,
    targetFrequency,
    cents: centsBetween(frequency, targetFrequency),
    midi
  };
}

export function nearestViolinString(frequency: number, referenceA = 440): ViolinStringResult {
  const strings = getViolinStrings(referenceA);
  const target = strings.reduce((closest, item) =>
    Math.abs(centsBetween(frequency, item.frequency)) < Math.abs(centsBetween(frequency, closest.frequency))
      ? item
      : closest
  );

  return {
    frequency,
    noteName: target.name,
    stringName: target.name,
    scientific: target.scientific,
    targetFrequency: target.frequency,
    cents: centsBetween(frequency, target.frequency),
    midi: target.midi
  };
}

/**
 * Separación mínima entre análisis, en milisegundos (~22 Hz). La
 * autocorrelación sobre 4096 muestras cuesta más de un millón de operaciones,
 * así que ejecutarla en cada frame satura el hilo visual y la batería del
 * móvil. A 22 Hz el afinador sigue viéndose continuo y el trabajo baja a un
 * tercio.
 */
export const PITCH_ANALYSIS_INTERVAL_MS = 45;

export function autoCorrelate(buffer: Float32Array, sampleRate: number): number | null {
  const length = Math.min(buffer.length, 4096);
  if (length < 256) return null;

  let mean = 0;
  for (let index = 0; index < length; index += 1) mean += buffer[index];
  mean /= length;

  const centered = new Float32Array(length);
  let energy = 0;
  for (let index = 0; index < length; index += 1) {
    const value = buffer[index] - mean;
    centered[index] = value;
    energy += value * value;
  }
  const rms = Math.sqrt(energy / length);
  if (rms < 0.012) return null;

  const minimumFrequency = 130;
  const maximumFrequency = 1600;
  const minimumLag = Math.max(2, Math.floor(sampleRate / maximumFrequency));
  const maximumLag = Math.min(length - 2, Math.ceil(sampleRate / minimumFrequency));
  const scores = new Float32Array(maximumLag + 2);

  for (let lag = minimumLag; lag <= maximumLag; lag += 1) {
    let product = 0;
    let firstEnergy = 0;
    let secondEnergy = 0;
    const comparedLength = length - lag;
    for (let index = 0; index < comparedLength; index += 1) {
      const first = centered[index];
      const second = centered[index + lag];
      product += first * second;
      firstEnergy += first * first;
      secondEnergy += second * second;
    }
    const denominator = Math.sqrt(firstEnergy * secondEnergy);
    scores[lag] = denominator > 0 ? product / denominator : 0;
  }

  let bestLag = -1;
  const strongPeak = 0.78;
  for (let lag = minimumLag + 1; lag < maximumLag; lag += 1) {
    if (scores[lag] >= strongPeak && scores[lag] > scores[lag - 1] && scores[lag] >= scores[lag + 1]) {
      bestLag = lag;
      break;
    }
  }

  if (bestLag < 0) {
    let bestScore = 0.55;
    for (let lag = minimumLag; lag <= maximumLag; lag += 1) {
      if (scores[lag] > bestScore) {
        bestScore = scores[lag];
        bestLag = lag;
      }
    }
  }

  if (bestLag < 0) return null;
  const left = scores[bestLag - 1];
  const center = scores[bestLag];
  const right = scores[bestLag + 1];
  const denominator = 2 * center - left - right;
  const adjustment = denominator === 0 ? 0 : (right - left) / (2 * denominator);
  const frequency = sampleRate / (bestLag + adjustment);
  return frequency >= minimumFrequency && frequency <= maximumFrequency ? frequency : null;
}
