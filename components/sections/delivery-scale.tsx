import type { DeliveryModel } from "@/content/types";

/**
 * Delivery models laid out on one line, from adding a person to your team to owning the outcome.
 * The line is the point: each step moves more responsibility to TalentXM.
 */
export function DeliveryScale({ models }: { models: DeliveryModel[] }) {
  const talent = models.filter((m) => m.group === "talent-led");
  const outcome = models.filter((m) => m.group === "outcome-led");
  return (
    <div className="txm-scale" style={{ "--n": models.length } as React.CSSProperties}>
      <div className="txm-scale-groups" aria-hidden="true">
        {talent.length > 0 && <p style={{ gridColumn: `span ${talent.length}` }}>Talent-led: people join your team</p>}
        {outcome.length > 0 && <p style={{ gridColumn: `span ${outcome.length}` }}>Outcome-led: we own the result</p>}
      </div>
      <ol className="txm-scale-list" aria-label="Delivery models, from talent-led to outcome-led">
        {[...talent, ...outcome].map((m) => (
          <li key={m.slug} data-group={m.group}>
            <span className="txm-scale-dot" aria-hidden="true" />
            <h4 className="font-semibold text-white">{m.name}</h4>
            <p className="txm-small mt-1 text-txm-on-dark">
              <span className="txm-scale-tag">{m.group === "talent-led" ? "Talent-led" : "Outcome-led"}</span>
              {m.buyerNeed}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
