// Canciones de dominio público, en Re mayor y dentro del rango con grabaciones
// reales de violín (G3, D4, E4, F#4, G4, A4, B4, C#5, D5, E5). Pensadas para
// primeras semanas: cuerdas al aire y primeros dedos.

export interface SongNote {
  midi: number;
  beats: number;
  lyric?: string;
}

export interface Song {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  tempo: number;
  notes: SongNote[];
}

// Nombres cortos para mostrar (español).
export const NOTE_LABEL: Record<number, string> = {
  55: "Sol", 62: "Re", 64: "Mi", 66: "Fa♯", 67: "Sol",
  69: "La", 71: "Si", 73: "Do♯", 74: "Re", 76: "Mi"
};

export const songs: Song[] = [
  {
    id: "estrellita",
    title: "Estrellita",
    subtitle: "Brilla, brilla",
    emoji: "⭐",
    tempo: 92,
    notes: [
      { midi: 62, beats: 1, lyric: "Es" }, { midi: 62, beats: 1, lyric: "tre" },
      { midi: 69, beats: 1, lyric: "lli" }, { midi: 69, beats: 1, lyric: "ta" },
      { midi: 71, beats: 1, lyric: "¿dón" }, { midi: 71, beats: 1, lyric: "de" }, { midi: 69, beats: 2, lyric: "es?" },
      { midi: 67, beats: 1, lyric: "Me" }, { midi: 67, beats: 1, lyric: "pre" },
      { midi: 66, beats: 1, lyric: "gun" }, { midi: 66, beats: 1, lyric: "to" },
      { midi: 64, beats: 1, lyric: "qué" }, { midi: 64, beats: 1, lyric: "se" }, { midi: 62, beats: 2, lyric: "rás" }
    ]
  },
  {
    id: "himno-alegria",
    title: "Himno a la alegría",
    subtitle: "Beethoven",
    emoji: "🎉",
    tempo: 96,
    notes: [
      { midi: 66, beats: 1 }, { midi: 66, beats: 1 }, { midi: 67, beats: 1 }, { midi: 69, beats: 1 },
      { midi: 69, beats: 1 }, { midi: 67, beats: 1 }, { midi: 66, beats: 1 }, { midi: 64, beats: 1 },
      { midi: 62, beats: 1 }, { midi: 62, beats: 1 }, { midi: 64, beats: 1 }, { midi: 66, beats: 1 },
      { midi: 66, beats: 1.5 }, { midi: 64, beats: 0.5 }, { midi: 64, beats: 2 }
    ]
  },
  {
    id: "corderito",
    title: "Mi corderito",
    subtitle: "Mary tenía un corderito",
    emoji: "🐑",
    tempo: 100,
    notes: [
      { midi: 66, beats: 1 }, { midi: 64, beats: 1 }, { midi: 62, beats: 1 }, { midi: 64, beats: 1 },
      { midi: 66, beats: 1 }, { midi: 66, beats: 1 }, { midi: 66, beats: 2 },
      { midi: 64, beats: 1 }, { midi: 64, beats: 1 }, { midi: 64, beats: 2 },
      { midi: 66, beats: 1 }, { midi: 69, beats: 1 }, { midi: 69, beats: 2 },
      { midi: 66, beats: 1 }, { midi: 64, beats: 1 }, { midi: 62, beats: 1 }, { midi: 64, beats: 1 },
      { midi: 66, beats: 1 }, { midi: 66, beats: 1 }, { midi: 66, beats: 1 }, { midi: 66, beats: 1 },
      { midi: 64, beats: 1 }, { midi: 64, beats: 1 }, { midi: 66, beats: 1 }, { midi: 64, beats: 1 }, { midi: 62, beats: 2 }
    ]
  }
];
