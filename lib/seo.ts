import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Faq, Seo, VideoAsset } from "@/content/types";

interface PageMetaOptions extends Seo {
  path: string;
  noindex?: boolean;
  /** Social preview image. Defaults to the site image. */
  image?: { url: string; width: number; height: number; alt: string };
}

/** Per-route metadata with a self-referencing canonical (Architecture S7). */
export function pageMetadata({ title, description, path, noindex, image }: PageMetaOptions): Metadata {
  const images = [image ?? { url: "/og.png", width: 1200, height: 630, alt: site.name }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/talentxm-logo.png`,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Columbus", addressRegion: "OH", addressCountry: "US" },
  parentOrganization: { "@type": "Organization", name: site.legalEntity },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export function serviceLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["US", "LATAM", "India"],
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${site.url}${item.href}`,
    })),
  };
}

/** "M:SS" to ISO 8601 duration. */
function isoDuration(duration: string) {
  const [m, s] = duration.split(":").map(Number);
  return `PT${m}M${s}S`;
}

export function videoLd(video: VideoAsset, name: string, description: string, uploadDate: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [video.thumbnail],
    uploadDate,
    embedUrl: video.embedUrl,
    url: `${site.url}${path}`,
    ...(video.duration && { duration: isoDuration(video.duration) }),
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}
