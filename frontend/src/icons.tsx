import type { SVGProps } from "react";

/**
 * Shared props for all icons.
 */
export type IconProps = {
  /** Width/height in pixels. Defaults to 20. */
  size?: number;
  /** Stroke/fill color. Defaults to currentColor. */
  color?: string;
  /** Optional className for styling. */
  className?: string;
};

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
});

/** Film clapperboard — brand / logo mark. */
export function FilmIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="2.5"
        y="7"
        width="19"
        height="13"
        rx="2"
        stroke={color}
        strokeWidth="1.7"
      />
      <path
        d="M2.5 7l3-3.5 3.5 3.5M9 7l2.8-3.5L15.3 7M15.3 7l2.8-3.5L21.5 7"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Magnifier — search. */
export function SearchIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.7" />
      <path
        d="M20 20l-3.5-3.5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Plus — add. */
export function PlusIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Star — rating. */
export function StarIcon({
  size = 20,
  color = "currentColor",
  className,
  filled,
}: IconProps & { filled?: boolean }) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 3.5l2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 17.9l-5.25 2.76 1-5.86L3.5 9.66l5.9-.86L12 3.5z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill={filled ? color : "none"}
      />
    </svg>
  );
}

/** Clock — planned. */
export function ClockIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
      <path
        d="M12 7.5V12l3 1.8"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Play — watching. */
export function PlayIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
      <path d="M10 8.5l5 3.5-5 3.5v-7z" fill={color} />
    </svg>
  );
}

/** Check circle — completed. */
export function CheckIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
      <path
        d="M8.5 12.5l2.3 2.3 4.7-5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** X circle — dropped. */
export function DropIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
      <path
        d="M9.5 9.5l5 5M14.5 9.5l-5 5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Trash — remove. */
export function TrashIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 7h16M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M6 7l1 12.5A1.5 1.5 0 008.5 21h7a1.5 1.5 0 001.5-1.5L18 7"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Pencil — edit. */
export function EditIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M16.5 4.5l3 3L8 19l-4 1 1-4L16.5 4.5z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Clock-with-runtime / timer. */
export function TimerIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="13" r="7.5" stroke={color} strokeWidth="1.7" />
      <path
        d="M12 9.5V13l2.5 1.5M9.5 3h5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Calendar — release year. */
export function CalendarIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2"
        stroke={color}
        strokeWidth="1.7"
      />
      <path
        d="M3.5 9.5h17M8 3v3.5M16 3v3.5"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** User — profile. */
export function UserIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="8.5" r="3.8" stroke={color} strokeWidth="1.7" />
      <path
        d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Eye — show password. */
export function EyeIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M3.5 12s3-5.5 8.5-5.5S20.5 12 20.5 12s-3 5.5-8.5 5.5S3.5 12 3.5 12z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.7" stroke={color} strokeWidth="1.7" />
    </svg>
  );
}

/** Slashed eye — hide password. */
export function EyeOffIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M3.5 12s3-5.5 8.5-5.5c1.4 0 2.7.35 3.8.88M20.5 12s-3 5.5-8.5 5.5c-1.38 0-2.64-.34-3.73-.86"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5l14 14M10.4 10.3A2.7 2.7 0 0012 14.7c.65 0 1.25-.23 1.72-.62"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Logout — exit door. */
export function LogoutIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M15 4.5H6.5A1.5 1.5 0 005 6v12a1.5 1.5 0 001.5 1.5H15"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M18 12H10m8 0l-3-3m3 3l-3 3"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Grid — library. */
export function GridIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="4"
        y="4"
        width="7"
        height="7"
        rx="1.5"
        stroke={color}
        strokeWidth="1.7"
      />
      <rect
        x="13"
        y="4"
        width="7"
        height="7"
        rx="1.5"
        stroke={color}
        strokeWidth="1.7"
      />
      <rect
        x="4"
        y="13"
        width="7"
        height="7"
        rx="1.5"
        stroke={color}
        strokeWidth="1.7"
      />
      <rect
        x="13"
        y="13"
        width="7"
        height="7"
        rx="1.5"
        stroke={color}
        strokeWidth="1.7"
      />
    </svg>
  );
}

/** Bookmark — watchlist. */
export function BookmarkIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M6 4.5h12a1 1 0 011 1V20l-7-4-7 4V5.5a1 1 0 011-1z"
        stroke={color}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Chevron down. */
export function ChevronDownIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M6 9.5l6 6 6-6"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Close / X. */
export function CloseIcon({
  size = 20,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
