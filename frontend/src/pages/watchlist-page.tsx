import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { WatchlistItem, WatchlistStatus } from "../types.js";
import { STATUS_ORDER, STATUS_CONFIG } from "../status-config.js";
import { WatchlistRow } from "../components/watchlist-row.js";
import { EditModal } from "../components/edit-modal.js";
import { EmptyState } from "../components/empty-state.js";
import { Button } from "../components/button.js";
import { BookmarkIcon, GridIcon, StarIcon } from "../icons.js";
import type { UseWatchlist } from "../use-watchlist.js";
import styles from "./watchlist-page.module.css";

export type WatchlistPageProps = {
  /** Watchlist state manager. */
  watchlist: UseWatchlist;
};

type Filter = WatchlistStatus | "ALL";

/**
 * The My Watchlist page — shows summary stats, a status filter, and the
 * list of saved entries with inline edit and remove actions.
 */
export function WatchlistPage({ watchlist }: WatchlistPageProps) {
  const { items, update, remove } = watchlist;
  const [filter, setFilter] = useState<Filter>("ALL");
  const [editing, setEditing] = useState<WatchlistItem | null>(null);

  const counts = useMemo(() => {
    const c: Record<WatchlistStatus, number> = {
      PLANNED: 0,
      WATCHING: 0,
      COMPLETED: 0,
      DROPPED: 0,
    };
    items.forEach((i) => {
      c[i.status] += 1;
    });
    return c;
  }, [items]);

  const avgRating = useMemo(() => {
    const rated = items.filter((i) => i.rating);
    if (!rated.length) return null;
    return (
      rated.reduce((sum, i) => sum + (i.rating || 0), 0) / rated.length
    ).toFixed(1);
  }, [items]);

  const visible =
    filter === "ALL" ? items : items.filter((i) => i.status === filter);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <h1 className={styles.title}>My Watchlist</h1>
        <p className={styles.subtitle}>
          Everything you're planning, watching and have finished.
        </p>
      </div>

      <div className={styles.stats}>
        {STATUS_ORDER.map((s) => {
          const { label, color, Icon } = STATUS_CONFIG[s];
          return (
            <div key={s} className={styles.stat}>
              <div className={styles.statTop}>
                <Icon size={18} color={color} />
                <span className={styles.statLabel}>{label}</span>
              </div>
              <span className={styles.statValue}>{counts[s]}</span>
            </div>
          );
        })}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={<BookmarkIcon size={32} color="var(--text-dim)" />}
          title="Your watchlist is empty"
          text="Browse the catalog and add movies you want to watch, are watching, or have finished."
          action={
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="primary">
                <GridIcon size={16} color="currentColor" /> Browse movies
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          <div className={styles.filters}>
            <button
              className={`${styles.filterChip} ${filter === "ALL" ? styles.filterChipActive : ""}`}
              onClick={() => setFilter("ALL")}
            >
              All ({items.length})
            </button>
            {STATUS_ORDER.map((s) => {
              const { label, color, Icon } = STATUS_CONFIG[s];
              return (
                <button
                  key={s}
                  className={`${styles.filterChip} ${filter === s ? styles.filterChipActive : ""}`}
                  onClick={() => setFilter(s)}
                >
                  <Icon
                    size={15}
                    color={filter === s ? color : "currentColor"}
                  />
                  {label} ({counts[s]})
                </button>
              );
            })}
            {avgRating && (
              <span
                className={styles.filterChip}
                style={{ marginLeft: "auto", cursor: "default" }}
              >
                <StarIcon size={15} color="var(--gold)" filled /> Avg{" "}
                {avgRating}
              </span>
            )}
          </div>

          {visible.length === 0 ? (
            <EmptyState
              icon={<BookmarkIcon size={32} color="var(--text-dim)" />}
              title="Nothing here yet"
              text="No movies match this status. Try another filter."
            />
          ) : (
            <div className={styles.list}>
              {visible.map((item) => (
                <WatchlistRow
                  key={item.id}
                  item={item}
                  onEdit={setEditing}
                  onRemove={(i) => remove(i.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {editing && (
        <EditModal
          item={editing}
          onSave={(id, changes) => {
            update(id, changes);
            setEditing(null);
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
