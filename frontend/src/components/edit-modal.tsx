import { useState } from "react";
import type { WatchlistItem, WatchlistStatus } from "../types.js";
import { STATUS_ORDER, STATUS_CONFIG } from "../status-config.js";
import { CloseIcon } from "../icons.js";
import { Button } from "./button.js";
import { Rating } from "./rating.js";
import styles from "./edit-modal.module.css";

export type EditModalProps = {
  /** The watchlist item being edited. */
  item: WatchlistItem;
  /** Called with the updated fields when saved. */
  onSave: (
    id: string,
    changes: { status: WatchlistStatus; rating?: number; notes?: string },
  ) => void;
  /** Called when the modal is dismissed. */
  onClose: () => void;
};

/**
 * A modal dialog for editing a watchlist entry — status, rating and notes.
 * Mirrors the backend `updateWatchlistItem` fields.
 */
export function EditModal({ item, onSave, onClose }: EditModalProps) {
  const [status, setStatus] = useState<WatchlistStatus>(item.status);
  const [rating, setRating] = useState<number | undefined>(item.rating);
  const [notes, setNotes] = useState(item.notes ?? "");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {item.movie.posterUrl && (
            <img
              className={styles.headerPoster}
              src={item.movie.posterUrl}
              alt={item.movie.title}
            />
          )}
          <div className={styles.headerText}>
            <h2 className={styles.headerTitle}>{item.movie.title}</h2>
            <p className={styles.headerSub}>
              {item.movie.releaseYear} · Edit your entry
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon size={18} color="currentColor" />
          </Button>
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <span className={styles.label}>Status</span>
            <div className={styles.statusGrid}>
              {STATUS_ORDER.map((s) => {
                const { label, color, Icon } = STATUS_CONFIG[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    className={`${styles.statusBtn} ${active ? styles.statusBtnActive : ""}`}
                    style={active ? { borderColor: color, color } : undefined}
                    onClick={() => setStatus(s)}
                  >
                    <Icon size={16} color={active ? color : "currentColor"} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Your rating</span>
            <Rating value={rating} onChange={setRating} size={22} />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Notes</span>
            <textarea
              className={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your thoughts about this movie..."
            />
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              onSave(item.id, {
                status,
                rating,
                notes: notes.trim() || undefined,
              })
            }
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
