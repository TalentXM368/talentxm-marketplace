"use client";

import { useSyncExternalStore } from "react";
import type { deliveryRegions } from "@/content/delivery";

type Region = (typeof deliveryRegions)[number];

// The visitor's clock, to the minute. On the server (and during hydration) there is no clock, so the
// band is drawn in UTC with standard offsets; once mounted it switches to the visitor's own time.
const subscribeMinute = (onChange: () => void) => {
  const t = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(t);
};
const minuteNow = () => Math.floor(Date.now() / 60_000);
const noClock = () => null;

/** Offset from UTC in hours for a time zone on a given date, from the browser's own time zone data. */
function zoneOffset(timeZone: string, date: Date) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
  const m = name?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!m) return 0;
  const h = Number(m[2]) + (m[3] ? Number(m[3]) / 60 : 0);
  return m[1] === "-" ? -h : h;
}

const wrap = (h: number) => ((h % 24) + 24) % 24;

/** A working day, moved onto the viewer's 24-hour axis; split in two if it crosses midnight. */
function segments(start: number, end: number, shift: number) {
  const s = wrap(start + shift);
  const len = end - start;
  return s + len <= 24 ? [[s, len]] : [[s, 24 - s], [0, s + len - 24]];
}

const ticks = [0, 3, 6, 9, 12, 15, 18, 21, 24];
const pct = (h: number) => `${(h / 24) * 100}%`;

/**
 * Working hours of each delivery hub on one 24-hour band, in the visitor's time zone, with a marker
 * for the current time (MOTION.md: "Hours band"). Shows that the hubs hand work across the day
 * while each team keeps normal hours.
 */
export function FollowTheSun({ regions }: { regions: Region[] }) {
  const minute = useSyncExternalStore(subscribeMinute, minuteNow, noClock);
  const now = minute === null ? null : new Date(minute * 60_000);
  const viewerOffset = now ? -now.getTimezoneOffset() / 60 : 0;
  const nowHour = now ? now.getHours() + now.getMinutes() / 60 : null;
  const time = (timeZone: string) =>
    now ? new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(now) : null;

  return (
    <div>
      <div className="txm-hours" role="group" aria-label="Working hours of each delivery hub">
        {regions.map((r) => {
          const offset = now ? zoneOffset(r.timeZone, now) : r.baseOffset;
          const shift = viewerOffset - offset;
          const local = now ? wrap((nowHour ?? 0) - viewerOffset + offset) : null;
          const working = local !== null && local >= r.hours[0] && local < r.hours[1];
          const clock = r.clock ? time(r.timeZone) : null;
          return (
            <div key={r.name} className="txm-hours-row">
              <div className="min-w-0">
                <p className="flex items-baseline gap-3">
                  <span className="text-lg font-semibold text-white">{r.name}</span>
                  {clock && <span className="txm-small tabular-nums text-txm-on-dark">{clock}</span>}
                </p>
                <p className="txm-small mt-1 text-txm-on-dark">{r.detail}</p>
                {local !== null && (
                  <p className="txm-small mt-1 font-semibold text-txm-yellow">
                    {working ? "Working now" : "Off hours now"}
                  </p>
                )}
              </div>
              <div className="txm-hours-track">
                {segments(r.hours[0], r.hours[1], shift).map(([s, len]) => (
                  <span key={s} className="txm-hours-bar" style={{ left: pct(s), width: pct(len) }} />
                ))}
                {nowHour !== null && (
                  <span className="txm-hours-line" style={{ left: pct(nowHour) }} aria-hidden="true" />
                )}
                <span className="sr-only">
                  Works {String(r.hours[0]).padStart(2, "0")}:00 to {String(r.hours[1]).padStart(2, "0")}:00 local
                  time.
                </span>
              </div>
            </div>
          );
        })}
        <div className="txm-hours-row" aria-hidden="true">
          <span />
          <div className="txm-hours-axis">
            {ticks.map((t) => (
              <span key={t} style={{ left: pct(t) }}>
                {String(t % 24).padStart(2, "0")}
              </span>
            ))}
            {nowHour !== null && (
              <span className="txm-hours-now" style={{ left: pct(nowHour) }}>
                Now
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="txm-small mt-4 text-txm-on-dark">
        {now ? "Hours shown in your time zone." : "Hours shown in UTC."}
      </p>
    </div>
  );
}
