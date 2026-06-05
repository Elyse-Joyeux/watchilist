import styles from "./empty-state.module.css";

export type EmptyStateProps = {
  /** Icon to display in the circle. */
  icon: React.ReactNode;
  /** Title text. */
  title: string;
  /** Supporting description. */
  text: string;
  /** Optional action element (e.g. a button). */
  action?: React.ReactNode;
};

/**
 * A centered empty-state placeholder with an icon, title, description and
 * optional call-to-action.
 */
export function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {action}
    </div>
  );
}
