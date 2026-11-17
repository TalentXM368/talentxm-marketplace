// When locked, only the POC Library (and the legal pages) are public: every other route shows the
// under-development page (proxy.ts) and its nav links render dimmed. The value comes from SITE_LOCKED in
// next.config.ts, which currently leaves the site open everywhere.
export const siteLocked = process.env.SITE_LOCKED === "true";

export const underDevelopmentPath = "/under-development";

const openPrefixes = ["/poc-library", "/legal", underDevelopmentPath];

/** True when the path (an href may carry ?query or #hash) is reachable while the site is locked. */
export function isOpenPath(href: string): boolean {
  if (!siteLocked) return true;
  const path = href.split(/[?#]/)[0] || "/";
  return openPrefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

/** Where the logo points: the home page, or the POC Library while the site is locked. */
export const homeHref = siteLocked ? "/poc-library" : "/";
