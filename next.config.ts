import type { NextConfig } from "next";

const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

// Legacy Replit routes → new pages, single-hop 301s (Architecture S6).
// 410 routes (login, dashboards, retired AI tools) are handled in proxy.ts.
const legacyRedirects: [string, string][] = [
  ["/our-story", "/about"],
  ["/partners", "/about#partners"],
  ["/services/ai-agents", "/ai-agents"],
  ["/products", "/ai-agents"],
  ["/products-legacy", "/ai-agents"],
  ["/products/eligibility-verification", "/ai-agents/eligibility-verification"],
  ["/products/manufacturing-ot", "/ai-agents/machine-health-monitoring"],
  ["/products/:slug/subscribe", "/ai-agents"],
  ["/products/:slug", "/ai-agents"],
  ["/services/fractional-talent-pods", "/flexible-talent"],
  ["/services/fractional-executives", "/flexible-talent"],
  ["/services/workato", "/services/data-integration"],
  ["/for-companies/research-agent", "/ai-agents"],
  ["/for-companies/:path+", "/marketplace"],
  ["/for-companies", "/flexible-talent"],
  ["/for-clients", "/flexible-talent"],
  ["/for-talent/:path*", "/marketplace"],
  ["/job-board", "/marketplace"],
  ["/browse-jobs", "/marketplace"],
  ["/job/:id", "/marketplace"],
  ["/post-job", "/marketplace"],
  ["/find-talent", "/marketplace"],
  ["/talent/:id", "/marketplace"],
  ["/talent-discovery", "/marketplace"],
  ["/talent-orchestration", "/marketplace"],
  ["/talent-deck", "/marketplace"],
  ["/skill-endorsement", "/marketplace"],
  ["/experiences", "/marketplace"],
  ["/industries/retail", "/industries"],
  ["/industries/supply-chain", "/industries"],
  ["/legal", "/legal/privacy"],
];

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // POC video thumbnails.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, statusCode: 301 }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: isProduction
          ? securityHeaders
          : [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
