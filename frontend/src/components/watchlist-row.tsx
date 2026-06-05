import type { WatchlistItem } from "../types.js";
import { FilmIcon, EditIcon, TrashIcon, CalendarIcon } from "../icons.js";
import { StatusBadge } from "./status-badge.js";
import { Rating } from "./rating.js";
import { Button } from "./button.js";
import styles from "./watchlist-row.module.css";

export type WatchlistRowProps = {
  /** The watchlist entry to render. */
  item: WatchlistItem;
  /** Called when the edit button is clicked. */
  onEdit: (item: WatchlistItem) => void;
  /** Called when the remove button is clicked. */
  onRemove: (item: WatchlistItem) => void;
};

/**
 * A horizontal row representing a single watchlist entry, showing the
 * movie poster, title, status, rating, notes and edit/remove actions.
 */
export function WatchlistRow({ item, onEdit, onRemove }: WatchlistRowProps) {
  const { movie } = item;
  return (
    <div className={styles.row}>
      {movie.posterUrl ? (
        <img
          className={styles.poster}
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
        />
      ) : (
        <div className={styles.posterFallback}>
          <FilmIcon size={28} color="var(--text-dim)" />
        </div>
      )}

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{movie.title}</h3>
          <span className={styles.year}>
            <CalendarIcon size={13} color="var(--text-dim)" />{" "}
            {movie.releaseYear}
          </span>
        </div>
        <div className={styles.subRow}>
          <StatusBadge status={item.status} />
          <Rating value={item.rating} />
        </div>
        {item.notes && <p className={styles.notes}>{item.notes}</p>}
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={() => onEdit(item)}>
          <EditIcon size={15} color="currentColor" /> Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onRemove(item)}>
          <TrashIcon size={15} color="currentColor" /> Remove
        </Button>
      </div>
    </div>
  );
}
