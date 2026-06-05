import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Visual variant. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Size. Use `icon` for square icon-only buttons. */
  size?: "md" | "sm" | "icon";
};

/**
 * A themed button used throughout the app. Supports primary, secondary,
 * ghost and danger variants plus a square icon-only size.
 */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
