type IconProps = { className?: string };

const svgProps = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  "aria-hidden": true as const,
};

export function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4 4-6 8-6 12a6 6 0 0012 0c0-4-2-8-6-12z" />
      <path strokeLinecap="round" d="M12 15V9" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l5 5L19 7" />
    </svg>
  );
}

export function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.27 5.8 22l1.2-7.86-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h3l2 5-2 1a13 13 0 006 6l1-2 5 2v3a2 2 0 01-2 2A15 15 0 015 6a2 2 0 012-2z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function GalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path strokeLinecap="round" d="M21 15l-4.5-4.5L7 19" />
    </svg>
  );
}

export function LawnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M4 20h16M8 20V10M12 20V6M16 20v-8" />
    </svg>
  );
}

export function HardscapeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16M6 14h4v4H6zM14 10h4v8h-4zM10 6h4v12h-4z" />
    </svg>
  );
}

export function IrrigationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" d="M12 3v3M6 6l2 2M18 6l-2 2M4 12h3M17 12h3M7 17l2-2M15 17l-2-2" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function DesignIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4-8 4 4 4-6 4 10H4z" />
    </svg>
  );
}

export function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const serviceIcons = [LawnIcon, HardscapeIcon, IrrigationIcon, DesignIcon];
const whyIcons = [ShieldIcon, LeafIcon, CalendarIcon];

export function ServiceIcon({ index }: { index: number }) {
  const Icon = serviceIcons[index % serviceIcons.length];
  return <Icon />;
}

export function WhyIcon({ index }: { index: number }) {
  const Icon = whyIcons[index % whyIcons.length];
  return <Icon />;
}
