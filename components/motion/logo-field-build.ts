import { markPaths, markViewBox } from "@/components/brand/mark-paths";

/**
 * Builds the logo form's signed distance field: the mark is rasterised once and its coverage turned into
 * distances, so one fragment shader can light it as a glass form. Pure work with no browser globals beyond
 * a 2D context, so it runs in the worker (logo-field.worker.ts) or on the main thread (logo-field.ts).
 * Kept apart from logo-field.ts so the worker bundle never contains the code that starts the worker.
 */

export const TEX_H = 900;
/** How far, in texels, the distance field reaches either side of the edge. */
export const SPREAD = 64;
const INF = 1e20;

export type LogoField = { data: Uint8Array; width: number; height: number };
type Context2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

function edt1d(grid: Float64Array, offset: number, stride: number, length: number, f: Float64Array, v: Uint16Array, z: Float64Array) {
  v[0] = 0;
  z[0] = -INF;
  z[1] = INF;
  f[0] = grid[offset];
  for (let q = 1, k = 0, s = 0; q < length; q++) {
    f[q] = grid[offset + q * stride];
    const q2 = q * q;
    do {
      const r = v[k];
      s = (f[q] - f[r] + q2 - r * r) / (q - r) / 2;
    } while (s <= z[k] && --k > -1);
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = INF;
  }
  for (let q = 0, k = 0; q < length; q++) {
    while (z[k + 1] < q) k++;
    const r = v[k];
    const qr = q - r;
    grid[offset + q * stride] = f[r] + qr * qr;
  }
}

/** Squared Euclidean distance transform (Felzenszwalb and Huttenlocher), columns then rows. */
function edt(grid: Float64Array, width: number, height: number) {
  const size = Math.max(width, height);
  const f = new Float64Array(size);
  const v = new Uint16Array(size);
  const z = new Float64Array(size + 1);
  for (let x = 0; x < width; x++) edt1d(grid, x, width, height, f, v, z);
  for (let y = 0; y < height; y++) edt1d(grid, y * width, 1, width, f, v, z);
}

/** Separable box blur, in place. Smooths the stair-steps a pixel-grid distance transform leaves behind. */
function boxBlur(src: Float32Array, width: number, height: number, radius: number) {
  const tmp = new Float32Array(src.length);
  const span = radius * 2 + 1;
  for (let y = 0; y < height; y++) {
    const row = y * width;
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) sum += src[row + Math.min(width - 1, Math.max(0, x + k))];
      tmp[row + x] = sum / span;
    }
  }
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) sum += tmp[Math.min(height - 1, Math.max(0, y + k)) * width + x];
      src[y * width + x] = sum / span;
    }
  }
}

/** Rasterise the mark with the given 2D context factory and turn its coverage into a signed distance field. */
export function buildField(createContext: (width: number, height: number) => Context2D | null): LogoField | null {
  const height = TEX_H;
  const width = Math.round((TEX_H * markViewBox.w) / markViewBox.h);
  const ctx = createContext(width, height);
  if (!ctx) return null;
  const k = height / markViewBox.h;
  ctx.setTransform(k, 0, 0, k, -markViewBox.x * k, -markViewBox.y * k);
  for (const d of markPaths) ctx.fill(new Path2D(d), "evenodd");
  const pixels = ctx.getImageData(0, 0, width, height).data;

  const count = width * height;
  const outer = new Float64Array(count);
  const inner = new Float64Array(count);
  for (let i = 0; i < count; i++) {
    const a = pixels[i * 4 + 3] / 255;
    if (a >= 1) {
      outer[i] = 0;
      inner[i] = INF;
    } else if (a <= 0) {
      outer[i] = INF;
      inner[i] = 0;
    } else {
      // Partial coverage places the edge between texels, which keeps curves smooth.
      const e = 0.5 - a;
      outer[i] = e > 0 ? e * e : 0;
      inner[i] = e < 0 ? e * e : 0;
    }
  }
  edt(outer, width, height);
  edt(inner, width, height);

  const dist = new Float32Array(count);
  for (let i = 0; i < count; i++) dist[i] = Math.sqrt(outer[i]) - Math.sqrt(inner[i]);
  boxBlur(dist, width, height, 2);
  boxBlur(dist, width, height, 2);

  // 16 bits per texel (high byte, low byte) so lighting from the field's slope stays smooth.
  const data = new Uint8Array(count * 2);
  for (let i = 0; i < count; i++) {
    const v = Math.max(0, Math.min(65535, Math.round(65535 * (0.5 - dist[i] / (2 * SPREAD)))));
    data[i * 2] = v >> 8;
    data[i * 2 + 1] = v & 255;
  }
  return { data, width, height };
}
