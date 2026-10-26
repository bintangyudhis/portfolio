import SectionHead from "./SectionHead";
import { t, type Locale } from "@/lib/i18n";
import type { PublicationItem } from "@/lib/content";

/**
 * Publications: journal and conference papers as a plain hairline list —
 * title (a link when a URL is set), then venue and year underneath,
 * omitting whichever part is empty. The section hides when the list is
 * empty.
 */
export default function Publications({
  locale,
  items,
}: {
  locale: Locale;
  items: PublicationItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section id="publications" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <SectionHead
          label={t("publicationsLabel", locale)}
          title={t("publicationsTitle", locale)}
        />
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {items.map((pub) => {
            const meta = [pub.venue, pub.year ? String(pub.year) : ""]
              .filter(Boolean)
              .join(" · ");
            return (
              <li key={pub.slug} className="py-5">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-snug font-semibold text-ink wrap-anywhere transition-colors hover:text-flame"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <span className="leading-snug font-semibold text-ink wrap-anywhere">
                    {pub.title}
                  </span>
                )}
                {meta && (
                  <span className="mt-1 block font-mono text-[13px] text-faded">
                    {meta}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
