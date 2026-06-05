import { StarIcon } from "../icons.js";
import styles from "./rating.module.css";

export type RatingProps = {
  /** Current rating value (1–10). */
  value?: number;
  /** Max rating. Defaults to 10. */
  max?: number;
  /** When provided, renders interactive clickable stars. */
  onChange?: (value: number) => void;
  /** Star size in px. Defaults to 16. */
  size?: number;
};

/**
 * Displays a star rating. Read-only by default; pass `onChange` for an
 * interactive picker (used in the edit form).
 */
export function Rating({ value, max = 10, onChange, size = 16 }: RatingProps) {
  if (onChange) {
    return (
      <div className={styles.interactive}>
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={`${styles.star} ${value && n <= value ? styles.starActive : ""}`}
            onClick={() => onChange(n)}
            aria-label={`Rate ${n}`}
          >
            <StarIcon
              size={size}
              color="currentColor"
              filled={!!value && n <= value}
            />
          </button>
        ))}
      </div>
    );
  }

  if (!value) {
    return <span className={styles.empty}>Not rated</span>;
  }

  return (
    <span className={styles.rating}>
      <StarIcon size={size} color="var(--gold)" filled />
      {value}
      <span style={{ color: "var(--text-dim)", fontWeight: 500 }}>/ {max}</span>
    </span>
  );
}
