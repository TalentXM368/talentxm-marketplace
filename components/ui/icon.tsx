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

/** Gradient icon tile used on every card (UX01: reuse). */
export function IconTile({
  name,
  size = "md",
  tone = "gradient",
}: {
  name: IconName;
  size?: "sm" | "md";
  tone?: "gradient" | "dark";
}) {
  const box = size === "sm" ? "h-10 w-10 rounded-lg" : "h-12 w-12 rounded-xl";
  const glyph = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  return (
    <div
      className={`${box} flex shrink-0 items-center justify-center ${tone === "dark" ? "bg-txm-base" : "txm-gradient-bg"}`}
    >
      <Icon name={name} className={`${glyph} text-white`} />
    </div>
  );
}
