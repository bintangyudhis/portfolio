// The aulky rhythm, shared by every section: one small label, one large
// upright heading, an optional plain intro line. Nothing else.
export default function SectionHead({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold tracking-[0.14em] text-faded uppercase">
        {label}
      </p>
      <h2 className="mt-3 font-display text-[clamp(1.9rem,5vw,2.75rem)] leading-[1.1] font-semibold text-ink wrap-anywhere">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-prose leading-relaxed text-faded">{intro}</p>
      )}
    </div>
  );
}
