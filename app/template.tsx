import { ViewTransition } from "react";

/**
 * Page transition (MOTION.md: "Page transition"). A template gets a new instance on every
 * navigation, so the old page fades out and the new one rises in. The header is anchored in CSS.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="txm-page" exit="txm-page" default="none">
      {children}
    </ViewTransition>
  );
}
