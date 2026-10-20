import { Suspense } from "react";
import { CTABand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { JsonLd } from "@/components/seo/json-ld";
import { PocGrid } from "@/components/poc/poc-card";
import { PocLibrary } from "@/components/poc/poc-library";
import { site } from "@/content/site";
import { getPocs, pocLibraryPath, pocPath } from "@/lib/pocs";
import { pageMetadata } from "@/lib/seo";

const description =
  "Watch TalentXM proofs of concept for healthcare, manufacturing and retail. Filter by industry, business function or technology and open any POC.";

// Filtered URLs (?category=…&tech=…) share this canonical, so only the base library is indexed.
export const metadata = pageMetadata({ title: "POC Library", description, path: pocLibraryPath });

export default function PocLibraryPage() {
  const pocs = getPocs();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "POC Library",
          description,
          url: `${site.url}${pocLibraryPath}`,
          hasPart: pocs.map((p) => ({ "@type": "VideoObject", name: p.title, url: `${site.url}${pocPath(p.slug)}` })),
        }}
      />
      <Hero
        eyebrow="POC Library"
        title="See the work before you scope yours."
        lede="Each proof of concept was built end to end and recorded. Filter by industry, business function or technology, then open a POC for the video, the problem it solves and the systems it connects."
        image="/images/tech-dashboard-bg.webp"
        primary={{ label: "Browse the POCs", href: "#library" }}
        secondary={{ label: "Request an Agent Pilot", href: "/ai-agents#request-pilot" }}
        breadcrumbs={[{ label: "POC Library", href: pocLibraryPath }]}
      />

      <Section id="library" tone="light" labelledBy="library-title" className="pt-12 md:pt-16">
        <h2 id="library-title" className="sr-only">
          Proofs of concept
        </h2>
        <Suspense fallback={<PocGrid items={pocs} />}>
          <PocLibrary />
        </Suspense>
      </Section>

      <CTABand
        title="Have a workflow in mind?"
        description="Tell us about the systems involved. We will show you the closest POC and scope a pilot with measures agreed up front."
        primary={{ label: "Discuss Your AI Priority", href: "/contact" }}
        secondary={{ label: "Browse AI Agents", href: "/ai-agents" }}
      />
    </>
  );
}
