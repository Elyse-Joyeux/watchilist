import type { WatchlistStatus } from "../types.js";
import { STATUS_CONFIG } from "../status-config.js";
import styles from "./status-badge.module.css";

export type StatusBadgeProps = {
  /** Watchlist status to display. */
  status: WatchlistStatus;
};

/**
 * A pill badge showing a watchlist status with its icon and color.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, color, Icon } = STATUS_CONFIG[status];
  return (
    <span
      className={styles.badge}
      style={{
        color,
        borderColor: color,
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
      }}
    >
      <Icon size={14} color={color} />
      {label}
    </span>
  );
}
