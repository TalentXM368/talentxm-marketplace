import { buildField, type LogoField } from "./logo-field-build";

export { SPREAD, type LogoField } from "./logo-field-build";

/**
 * Loads the logo form's signed distance field (MOTION.md: "Logo form").
 *
 * Building it (two distance transforms over a 900px raster, plus blurs) takes a few hundred
 * milliseconds on a phone, so it runs in a Web Worker when the browser can draw in one, and on the main
 * thread only as a fallback. The result is cached: every logo form on a page shares one field.
 */

const buildOnMainThread = () =>
  buildField((width, height) => {
    const raster = document.createElement("canvas");
    raster.width = width;
    raster.height = height;
    return raster.getContext("2d", { willReadFrequently: true });
  });

/** Longest the worker may take before the main thread builds the field itself. */
const WORKER_TIMEOUT = 4000;
let cached: Promise<LogoField | null> | null = null;

/** The field, built once per page load: in a worker when possible, otherwise on the main thread. */
export function loadField(): Promise<LogoField | null> {
  cached ??= new Promise<LogoField | null>((resolve) => {
    if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") {
      resolve(buildOnMainThread());
      return;
    }
    let worker: Worker;
    try {
      worker = new Worker(new URL("./logo-field.worker.ts", import.meta.url), { type: "module" });
    } catch {
      resolve(buildOnMainThread());
      return;
    }
    let settled = false;
    const finish = (field: LogoField | null) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      worker.terminate();
      resolve(field ?? buildOnMainThread());
    };
    const timer = window.setTimeout(() => finish(null), WORKER_TIMEOUT);
    worker.onmessage = (e: MessageEvent<LogoField | null>) => finish(e.data);
    worker.onerror = () => finish(null);
    worker.postMessage(null);
  });
  return cached;
}
