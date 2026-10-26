import type { ReactNode } from "react";

/**
 * Section heading in the v3 system: a small mono label in the accent,
 * a large heavy grotesque title, an optional gray intro, and an optional
 * action (for example a "view all" link) on the right.
 */
export default function SectionHead({
  label,
  title,
  intro,
  action,
}: {
  label: string;
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <p className="font-mono text-xs font-medium tracking-[0.18em] text-flame uppercase">
          {label}
        </p>
        {action}
      </div>
      <h2 className="mt-2.5 text-[clamp(1.9rem,4.5vw,2.6rem)] leading-[1.08] font-extrabold tracking-tight text-ink wrap-anywhere">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl leading-relaxed text-faded">{intro}</p>
      )}
    </div>
  );
}
