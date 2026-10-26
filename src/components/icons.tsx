// Small inline SVG icons shared across the public site. Stroke icons are
// drawn on a 24px grid in currentColor; the GitHub mark is the one filled
// glyph. No icon font, no emoji.

type IconProps = { className?: string };

function stroke(path: React.ReactNode) {
  return function Icon({ className }: IconProps) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {path}
      </svg>
    );
  };
}

export const ArrowDownIcon = stroke(<path d="M12 4v16m0 0 6-6m-6 6-6-6" />);

export const ArrowUpRightIcon = stroke(<path d="M6.5 17.5 17.5 6.5M9 6.5h8.5V15" />);

export const DocIcon = stroke(
  <>
    <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v4h4" />
    <path d="M9.5 12h5M9.5 15.5h5" />
  </>
);

export const BuildingIcon = stroke(
  <>
    <rect x="5" y="3" width="14" height="18" rx="1" />
    <path d="M9 7.5h2m2 0h2M9 11.5h2m2 0h2M9 15.5h2m2 0h2" />
  </>
);

export const CalendarIcon = stroke(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </>
);

export const PinIcon = stroke(
  <>
    <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </>
);

export const CheckCircleIcon = stroke(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.6 12.3 2.3 2.3 4.5-5" />
  </>
);

export const MenuIcon = stroke(<path d="M4 7h16M4 12h16M4 17h16" />);

export const CloseIcon = stroke(<path d="M6 6l12 12M18 6 6 18" />);

export function GithubIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg
      className={className ?? "h-3.5 w-3.5 text-highlight"}
      viewBox="0 0 576 512"
      fill="currentColor"
      aria-hidden
    >
      <path d="M316 21l-45.6 92.4-101.9 14.8c-14.8 2.2-20.7 20.2-9.4 28.9l73.7 71.9-17.4 101.5c-2.5 14.7 12.9 25.9 26.4 19.3L288 357.4l91.2 47.9c13.4 7.1 28.9-4.5 26.4-19.3l-17.4-101.5 73.7-71.9c11.3-11 5.2-26.7-9.4-28.9l-101.9-14.8L332 21c-6.5-13.2-25.5-13.2-32 0z" />
    </svg>
  );
}
