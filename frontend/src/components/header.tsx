import { NavLink, Link } from "react-router-dom";
import type { User } from "../types.js";
import { FilmIcon, GridIcon, BookmarkIcon, LogoutIcon, UserIcon } from "../icons.js";
import { Button } from "./button.js";
import styles from "./header.module.css";

export type HeaderProps = {
  /** The current authenticated user. */
  user: User;
  /** Called when the user logs out. */
  onLogout: () => void;
};

/**
 * The top navigation bar with brand, primary nav links and the user menu.
 */
export function Header({ user, onLogout }: HeaderProps) {
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandMark}>
          <FilmIcon size={22} color="currentColor" />
        </span>
        <span className={styles.brandName}>
          Watch<span>list</span>
        </span>
      </Link>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }: { isActive: boolean }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
          }
        >
          <GridIcon size={17} color="currentColor" />
          <span>Browse</span>
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }: { isActive: boolean }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
          }
        >
          <BookmarkIcon size={17} color="currentColor" />
          <span>My Watchlist</span>
        </NavLink>
      </nav>

      <div className={styles.spacer} />

      <div className={styles.user}>
        <NavLink
          to="/settings"
          className={({ isActive }: { isActive: boolean }) =>
            `${styles.accountLink} ${isActive ? styles.accountLinkActive : ""}`
          }
          aria-label="Account settings"
        >
          <div className={styles.avatar}>{initials}</div>
          <span className={styles.userName}>{user.name}</span>
          <UserIcon size={15} color="currentColor" />
        </NavLink>
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          aria-label="Log out"
        >
          <LogoutIcon size={18} color="currentColor" />
        </Button>
      </div>
    </header>
  );
}
