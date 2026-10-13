import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Staging and preview deployments are never indexed (Architecture S7).
const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/preview"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
