/// <reference lib="webworker" />
import { buildField } from "./logo-field-build";

// Builds the logo form's distance field off the main thread (see logo-field.ts). Replies with null when
// this browser cannot draw in a worker, and the page builds the field itself.
self.onmessage = () => {
  let field = null;
  try {
    field = buildField((width, height) => new OffscreenCanvas(width, height).getContext("2d", { willReadFrequently: true }));
  } catch {
    field = null;
  }
  (self as unknown as DedicatedWorkerGlobalScope).postMessage(field, field ? [field.data.buffer] : []);
};
