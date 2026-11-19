import { loadField, SPREAD } from "./logo-field";

/**
 * WebGL renderer for the logo form (MOTION.md: "Logo form").
 *
 * The mark's signed distance field (logo-field.ts, built once per page in a worker) lets one fragment
 * shader draw it as a glowing, slowly breathing glass form: bright rims, a darker body, lit from the
 * pointer. Raw WebGL 1 with a single triangle; no library. Returns a stop function, or null when WebGL
 * is unavailable. `onReady` fires on the first frame, once the field has arrived.
 */

// Brand colours are read from the CSS tokens, so the shader never carries its own hex values.
const brandRgb = (name: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = value.replace("#", "");
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, "$&$&") : hex, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const vertexSource = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const fragmentSource = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uSdf;
uniform vec2 uRes;
uniform vec4 uBox;
uniform vec2 uTexel;
uniform float uAspect;
uniform float uSpread;
uniform float uTime;
uniform vec2 uPointer;
uniform float uScroll;
uniform vec3 uOrange;
uniform vec3 uYellow;
uniform vec3 uTeal;
uniform float uIntensity;

// The field is stored as 16 bits split over two bytes; linear filtering keeps that exact.
float field(vec2 uv) {
  vec4 t = texture2D(uSdf, uv);
  float v = (t.r * 65280.0 + t.a * 255.0) / 65535.0;
  return (0.5 - v) * uSpread;
}

vec3 palette(float f) {
  vec3 c = mix(uOrange, uYellow, smoothstep(0.18, 0.46, f));
  return mix(c, uTeal, smoothstep(0.54, 0.84, f));
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 centre = uBox.xy + uBox.zw * 0.5;
  float grow = 1.0 + uScroll * 0.16;
  vec2 p = (frag - centre) / grow + centre;
  p += uPointer * vec2(-18.0, -12.0) * (uBox.w / 1000.0);
  vec2 uv = (p - uBox.xy) / uBox.zw;

  // Slow breathing: a gentle domain warp, so the outline swells and settles.
  float t = uTime;
  uv += 0.009 * vec2(
    sin(uv.y * 5.0 + t * 0.35) + 0.6 * sin(uv.x * 9.0 - t * 0.22),
    cos(uv.x * 4.0 - t * 0.30) + 0.6 * cos(uv.y * 8.0 + t * 0.27)
  );

  float d = field(uv);
  float ex = uTexel.x * 3.0;
  float ey = uTexel.y * 3.0;
  vec2 grad = vec2(
    (field(uv + vec2(ex, 0.0)) - field(uv - vec2(ex, 0.0))) / (2.0 * ex * uAspect),
    (field(uv + vec2(0.0, ey)) - field(uv - vec2(0.0, ey))) / (2.0 * ey)
  );

  float px = 1.0 / uBox.w;
  float inside = smoothstep(px, -px, d);

  // Treat the body as a rounded tube: depth 0 at the rim, 1 at the thickest point.
  float depth = clamp(-d / 0.04, 0.0, 1.0);
  float rimProfile = 1.0 - depth;
  float slope = rimProfile / max(sqrt(1.0 - rimProfile * rimProfile), 0.12);
  vec3 n = normalize(vec3(grad * slope * 0.7, 1.0));
  vec3 light = normalize(vec3(-0.45 + uPointer.x * 0.6, -0.55 + uPointer.y * 0.6, 0.75));
  float diffuse = clamp(dot(n, light), 0.0, 1.0);
  float spec = pow(clamp(dot(reflect(-light, n), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 18.0);

  // Colour drifts across the form: orange low and right, yellow through the middle, teal up and left.
  float f = 1.08 - uv.x * 0.95 - uv.y * 0.32 + 0.22 * sin(uv.y * 3.4 + uv.x * 2.1 + t * 0.12) + 0.06 * sin(t * 0.07);
  vec3 col = palette(f);
  // Rims run one step further along the palette than the body, so edges and cores differ.
  vec3 rimCol = palette(f + 0.32);

  vec3 body = col * mix(1.0, 0.58, depth) * (0.7 + 0.45 * diffuse);
  float rim = exp(-abs(d) / 0.0032);
  vec3 lit = body + rimCol * rim * 0.55 + vec3(1.0, 0.97, 0.9) * spec * 0.3;
  float bodyAlpha = inside * mix(0.97, 0.78, depth);

  float glow = exp(-max(d, 0.0) / 0.025) * (1.0 - inside) * 0.38;
  vec3 glowCol = col * glow;

  float fade = (1.0 - uScroll * 0.55) * uIntensity;
  vec3 rgb = (lit * bodyAlpha + glowCol) * fade;
  float a = clamp(bodyAlpha + glow, 0.0, 1.0) * fade;
  gl_FragColor = vec4(rgb, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function startLogoForm({
  root,
  box,
  canvas,
  intensity = 1,
  onReady,
  onLost,
}: {
  root: HTMLElement;
  box: HTMLElement;
  canvas: HTMLCanvasElement;
  /** 0 to 1: scales the whole form, glow included. */
  intensity?: number;
  onReady: () => void;
  onLost: () => void;
}): (() => void) | null {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl || gl.isContextLost()) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  const u = (name: string) => gl.getUniformLocation(program, name);
  const uRes = u("uRes");
  const uBox = u("uBox");
  const uTime = u("uTime");
  const uPointer = u("uPointer");
  const uScroll = u("uScroll");
  gl.uniform1i(u("uSdf"), 0);
  gl.uniform3fv(u("uOrange"), brandRgb("--txm-brand-orange"));
  gl.uniform3fv(u("uYellow"), brandRgb("--txm-brand-yellow"));
  gl.uniform3fv(u("uTeal"), brandRgb("--txm-brand-teal"));
  gl.uniform1f(u("uIntensity"), intensity);

  let dpr = 1;
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.round(root.clientWidth * dpr));
    canvas.height = Math.max(1, Math.round(root.clientHeight * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    // Where the box sits inside the root (it is offset with `translate`), so the canvas lines up with the SVG.
    const r = root.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    gl.uniform4f(uBox, (b.left - r.left) * dpr, (b.top - r.top) * dpr, b.width * dpr, b.height * dpr);
  };
  resize();

  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    targetX = (e.clientX / window.innerWidth) * 2 - 1;
    targetY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  let start = performance.now();
  let frame = 0;
  let inView = true;
  let ready = false;
  // Nothing is drawn until the distance field arrives (built in a worker, see logo-field.ts).
  let hasField = false;
  let stopped = false;
  const draw = (now: number) => {
    frame = 0;
    pointerX += (targetX - pointerX) * 0.06;
    pointerY += (targetY - pointerY) * 0.06;
    const rect = root.getBoundingClientRect();
    const scrolled = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.uniform2f(uPointer, pointerX, pointerY);
    gl.uniform1f(uScroll, scrolled);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!ready) {
      ready = true;
      onReady();
    }
    schedule();
  };
  const schedule = () => {
    if (!frame && hasField && !stopped && inView && !document.hidden) frame = requestAnimationFrame(draw);
  };
  const pause = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  resizeObserver.observe(box);
  const viewObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) schedule();
    else pause();
  });
  viewObserver.observe(root);
  const onVisibility = () => (document.hidden ? pause() : schedule());
  const onContextLost = (e: Event) => {
    e.preventDefault();
    pause();
    onLost();
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  canvas.addEventListener("webglcontextlost", onContextLost);

  loadField().then((field) => {
    if (stopped || gl.isContextLost()) return;
    if (!field) {
      onLost();
      return;
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.LUMINANCE_ALPHA,
      field.width,
      field.height,
      0,
      gl.LUMINANCE_ALPHA,
      gl.UNSIGNED_BYTE,
      field.data,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform2f(u("uTexel"), 1 / field.width, 1 / field.height);
    gl.uniform1f(u("uAspect"), field.width / field.height);
    gl.uniform1f(u("uSpread"), (2 * SPREAD) / field.height);
    hasField = true;
    start = performance.now();
    schedule();
  });

  return () => {
    stopped = true;
    pause();
    resizeObserver.disconnect();
    viewObserver.disconnect();
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVisibility);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  };
}
