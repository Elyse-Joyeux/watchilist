import { useState, type FormEvent } from "react";
import type { UseAuth } from "../use-auth.js";
import { Button } from "../components/button.js";
import { UserIcon, CheckIcon } from "../icons.js";
import styles from "./settings-page.module.css";

export type SettingsPageProps = {
  auth: UseAuth;
};

export function SettingsPage({ auth }: SettingsPageProps) {
  const [name, setName] = useState(auth.user?.name || "");
  const [email, setEmail] = useState(auth.user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLocalError(null);
    auth.setError(null);

    if (!name.trim() || !email.trim()) {
      setLocalError("Name and email are required.");
      return;
    }

    try {
      await auth.updateProfile({ name: name.trim(), email: email.trim() });
      setMessage("Profile saved.");
    } catch {
      setMessage(null);
    }
  };

  const savePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setLocalError(null);
    auth.setError(null);

    if (!currentPassword || newPassword.length < 6) {
      setLocalError("Use your current password and a new password of at least 6 characters.");
      return;
    }

    try {
      await auth.updatePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password updated.");
    } catch {
      setMessage(null);
    }
  };

  const shownError = localError || auth.error;

  return (
    <main className={styles.page}>
      <section className={styles.head}>
        <span className={styles.kicker}>
          <UserIcon size={15} color="currentColor" />
          Account
        </span>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Keep your profile and sign-in details current.
        </p>
      </section>

      {(message || shownError) && (
        <div className={`${styles.notice} ${shownError ? styles.noticeError : ""}`}>
          {message && <CheckIcon size={16} color="currentColor" />}
          {shownError || message}
        </div>
      )}

      <div className={styles.grid}>
        <form className={styles.panel} onSubmit={saveProfile}>
          <div>
            <h2 className={styles.panelTitle}>Profile</h2>
            <p className={styles.panelText}>This is how your account appears in Watchlist.</p>
          </div>

          <label className={styles.field}>
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <Button type="submit" variant="primary" disabled={auth.loading}>
            Save profile
          </Button>
        </form>

        <form className={styles.panel} onSubmit={savePassword}>
          <div>
            <h2 className={styles.panelTitle}>Password</h2>
            <p className={styles.panelText}>Change your password without leaving the app.</p>
          </div>

          <label className={styles.field}>
            <span>Current password</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>New password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <Button type="submit" variant="secondary" disabled={auth.loading}>
            Update password
          </Button>
        </form>
      </div>
    </main>
  );
}
