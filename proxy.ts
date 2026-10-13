import { NextResponse } from "next/server";

// Retired Replit routes answer 410 Gone (Architecture S6).
// VERIFY before launch: confirm no active users still rely on these logins (TXM-016).
export function proxy() {
  return new NextResponse("This page has been permanently removed.", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/auth",
    "/client-registration",
    "/dashboard/:path*",
    "/talent-dashboard/:path*",
    "/client-dashboard/:path*",
    "/admin/:path*",
    "/analytics/:path*",
    "/ai-hiring-suite",
    "/ai-sdr",
    "/ai-performance",
    "/prompt-tester",
    "/ai-interviewer",
    "/ai-career-coach",
  ],
};
