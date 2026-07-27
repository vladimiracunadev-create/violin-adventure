import { describe, expect, it } from "vitest";
import {
  autoCorrelate,
  centsBetween,
  frequencyForMidi,
  frequencyToMidi,
  nearestChromaticNote,
  nearestViolinString
} from "./pitch";

describe("pitch helpers", () => {
  it("maps A4 to MIDI 69", () => {
    expect(frequencyToMidi(440)).toBeCloseTo(69, 5);
  });

  it("respects a custom calibration", () => {
    expect(frequencyForMidi(69, 442)).toBeCloseTo(442, 5);
    expect(nearestChromaticNote(442, 442).scientific).toBe("A4");
  });

  it("reports zero cents for an exact frequency", () => {
    expect(centsBetween(440, 440)).toBeCloseTo(0, 5);
  });

  it("recognizes the A string", () => {
    const result = nearestViolinString(441);
    expect(result.scientific).toBe("A4");
    expect(result.cents).toBeGreaterThan(0);
  });

  it("recognizes a stopped B4 note chromatically", () => {
    const result = nearestChromaticNote(493.88);
    expect(result.noteName).toBe("Si");
    expect(result.scientific).toBe("B4");
  });

  it("detects a synthetic 440 Hz signal", () => {
    const sampleRate = 48_000;
    const buffer = new Float32Array(4096);
    for (let index = 0; index < buffer.length; index += 1) {
      buffer[index] = Math.sin((2 * Math.PI * 440 * index) / sampleRate);
    }
    expect(autoCorrelate(buffer, sampleRate)).toBeCloseTo(440, 0);
  });

  it("ignores near-silence", () => {
    expect(autoCorrelate(new Float32Array(4096), 48_000)).toBeNull();
  });
});
