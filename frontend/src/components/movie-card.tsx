import type { Movie, WatchlistStatus } from "../types.js";
import {
  CalendarIcon,
  TimerIcon,
  FilmIcon,
  PlusIcon,
  CheckIcon,
} from "../icons.js";
import { StatusBadge } from "./status-badge.js";
import { Button } from "./button.js";
import styles from "./movie-card.module.css";

export type MovieCardProps = {
  /** Movie to render. */
  movie: Movie;
  /** Status if the movie is already on the watchlist. */
  status?: WatchlistStatus;
  /** Called when the add button is clicked. Omit to hide the button. */
  onAdd?: (movie: Movie) => void;
  /** Whether the movie is already in the watchlist (disables add). */
  inWatchlist?: boolean;
};

/**
 * A movie poster card showing title, genres, release year and runtime,
 * with an optional add-to-watchlist action.
 */
export function MovieCard({
  movie,
  status,
  onAdd,
  inWatchlist,
}: MovieCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.posterWrap}>
        {movie.posterUrl ? (
          <img
            className={styles.poster}
            src={movie.posterUrl}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className={styles.posterFallback}>
            <FilmIcon size={48} color="var(--text-dim)" />
          </div>
        )}
        <div className={styles.gradient} />
        <span className={styles.yearBadge}>
          <CalendarIcon size={13} color="var(--text-muted)" />
          {movie.releaseYear}
        </span>
        {status && (
          <div className={styles.statusCorner}>
            <StatusBadge status={status} />
          </div>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{movie.title}</h3>

        <div className={styles.genres}>
          {movie.genres.slice(0, 3).map((g) => (
            <span key={g} className={styles.genre}>
              {g}
            </span>
          ))}
        </div>

        <div className={styles.meta}>
          {movie.runtime && (
            <span className={styles.metaItem}>
              <TimerIcon size={14} color="var(--text-dim)" />
              {movie.runtime} min
            </span>
          )}
        </div>

        {onAdd && (
          <div className={styles.actions}>
            <Button
              variant={inWatchlist ? "secondary" : "primary"}
              size="sm"
              onClick={() => onAdd(movie)}
              disabled={inWatchlist}
              style={{ width: "100%" }}
            >
              {inWatchlist ? (
                <>
                  <CheckIcon size={16} color="currentColor" /> Added
                </>
              ) : (
                <>
                  <PlusIcon size={16} color="currentColor" /> Add to watchlist
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
