import { NextResponse, type NextRequest } from "next/server";
import { isOpenPath, underDevelopmentPath } from "@/lib/site-lock";

// Retired Replit routes answer 410 Gone (Architecture S6).
// VERIFY before launch: confirm no active users still rely on these logins (TXM-016).
const retiredExact = [
  "/login",
  "/register",
  "/auth",
  "/client-registration",
  "/ai-hiring-suite",
  "/ai-sdr",
  "/ai-performance",
  "/prompt-tester",
  "/ai-interviewer",
  "/ai-career-coach",
];
const retiredPrefixes = ["/dashboard", "/talent-dashboard", "/client-dashboard", "/admin", "/analytics"];

function isRetired(path: string) {
  return retiredExact.includes(path) || retiredPrefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (isRetired(path)) {
    return new NextResponse("This page has been permanently removed.", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }

  // Site lock (lib/site-lock.ts): locked pages keep their URL but show the under-development page.
  if (!isOpenPath(path)) {
    const res = NextResponse.rewrite(new URL(underDevelopmentPath, request.url));
    res.headers.set("X-Robots-Tag", "noindex");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // Everything except API routes, Next internals and public files (any path with a file extension).
  matcher: ["/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)"],
};
