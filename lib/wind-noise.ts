const QUARTER_PI = Math.PI / 4;

let time = 0;

function hash(n: number): number {
  const x = Math.sin(n * 127.1 + n * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/** Continuous 1D noise in [0, 1] */
export function smoothNoise1D(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const a = hash(i);
  const b = hash(i + 1);
  return smoothstep(f) * (b - a) + a;
}

export function lerp(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

export function getWindForce(): number {
  const noiseVal = smoothNoise1D(time);
  const windAngle = lerp(noiseVal, 0, 1, -QUARTER_PI, QUARTER_PI);
  time += 0.01;
  return windAngle;
}

export function resetWindTime(): void {
  time = 0;
}

export function getGustMultiplier(t: number): number {
  return smoothNoise1D(t * 0.3) > 0.75 ? 1.6 : 1;
}
