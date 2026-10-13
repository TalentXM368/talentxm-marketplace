import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getLegalPage, legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return pageMetadata({ ...page.seo, path: `/legal/${page.slug}` });
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <>
      <section className="txm-mesh-bg py-16 md:py-20">
        <div className="txm-container">
          <Breadcrumb items={[{ label: page.title, href: `/legal/${page.slug}` }]} />
          <h1 className="txm-h1 text-white">{page.title}</h1>
          <p className="txm-small mt-4 text-slate-300">Last updated {page.updated}</p>
        </div>
      </section>
      <section className="txm-section bg-white">
        <div className="txm-container">
          <article className="txm-prose">
            <p className="txm-lede">{page.intro}</p>
            {page.sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
