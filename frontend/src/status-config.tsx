import type { ComponentType } from "react";
import type { WatchlistStatus } from "./types.js";
import { ClockIcon, PlayIcon, CheckIcon, DropIcon } from "./icons.js";

/**
 * Visual configuration for each watchlist status — label, color token and icon.
 */
export const STATUS_CONFIG: Record<
  WatchlistStatus,
  {
    label: string;
    color: string;
    Icon: ComponentType<{ size?: number; color?: string }>;
  }
> = {
  PLANNED: { label: "Planned", color: "var(--planned)", Icon: ClockIcon },
  WATCHING: { label: "Watching", color: "var(--watching)", Icon: PlayIcon },
  COMPLETED: { label: "Completed", color: "var(--completed)", Icon: CheckIcon },
  DROPPED: { label: "Dropped", color: "var(--dropped)", Icon: DropIcon },
};

/** Ordered list of all statuses. */
export const STATUS_ORDER: WatchlistStatus[] = [
  "PLANNED",
  "WATCHING",
  "COMPLETED",
  "DROPPED",
];
