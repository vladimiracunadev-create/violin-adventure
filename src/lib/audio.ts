let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedContext || sharedContext.state === "closed") sharedContext = new AudioContext();
  return sharedContext;
}

export async function ensureAudioReady(): Promise<AudioContext> {
  const context = getAudioContext();
  if (context.state === "suspended") await context.resume();
  return context;
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

export async function playClick(accent = false): Promise<void> {
  const context = await ensureAudioReady();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.frequency.value = accent ? 1150 : 850;
  oscillator.type = "square";
  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.06);
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
