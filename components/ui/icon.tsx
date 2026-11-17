import {
  Activity,
  BadgeCheck,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Clock,
  Compass,
  Database,
  Eye,
  Factory,
  FileCheck,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  Pill,
  Receipt,
  Repeat,
  Scale,
  Server,
  Shield,
  Sparkles,
  Target,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

const icons: Record<IconName, LucideIcon> = {
  layers: Layers,
  database: Database,
  sparkles: Sparkles,
  shield: Shield,
  server: Server,
  users: Users,
  "heart-pulse": HeartPulse,
  factory: Factory,
  receipt: Receipt,
  calendar: CalendarClock,
  pill: Pill,
  activity: Activity,
  flask: FlaskConical,
  mail: Mail,
  workflow: Workflow,
  compass: Compass,
  target: Target,
  handshake: Handshake,
  globe: Globe,
  "file-check": FileCheck,
  "badge-check": BadgeCheck,
  clipboard: ClipboardCheck,
  graduation: GraduationCap,
  lightbulb: Lightbulb,
  clock: Clock,
  repeat: Repeat,
  wrench: Wrench,
  building: Building2,
  lock: Lock,
  eye: Eye,
  scale: Scale,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component className={className} aria-hidden="true" />;
}

/**
 * Icon tile used on every card (UX01: reuse). Solid colour only: deep navy with a white icon on
 * light surfaces, a faint white tile with a yellow icon on dark panels (BRANDING.md: no gradient fills).
 */
export function IconTile({
  name,
  size = "md",
  tone = "dark",
}: {
  name: IconName;
  size?: "sm" | "md";
  tone?: "dark" | "on-dark";
}) {
  const box = size === "sm" ? "h-10 w-10 rounded-lg" : "h-12 w-12 rounded-xl";
  const glyph = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  return (
    <div
      className={`${box} flex shrink-0 items-center justify-center ${tone === "on-dark" ? "bg-white/10" : "bg-txm-base"}`}
    >
      <Icon name={name} className={`${glyph} ${tone === "on-dark" ? "text-txm-yellow" : "text-white"}`} />
    </div>
  );
}
