import { useState, type FormEvent } from "react";
import { EyeIcon, EyeOffIcon, FilmIcon } from "../icons.js";
import { Button } from "../components/button.js";
import styles from "./login-page.module.css";
import type { UseAuth } from "../use-auth.js";

export type LoginPageProps = {
  /** Authentication state and methods. */
  auth: UseAuth;
};

/**
 * The authentication screen — a split layout with a cinematic poster panel
 * and a login/register form. Mirrors the backend `/auth` endpoints.
 */
export function LoginPage({ auth }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("elyse@watchlist.app");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    auth.setError(null);

    if (!email || !password) {
      setLocalError("Email and password are required");
      return;
    }

    try {
      if (mode === "login") {
        await auth.login(email, password);
      } else {
        if (!name.trim()) {
          setLocalError("Name is required");
          return;
        }
        await auth.register(name, email, password);
      }
    } catch (err: any) {
      // Error is stored in auth.error
    }
  };

  const backgroundPoster = "https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__epic_0_1780603477443.png";

  const displayedError = localError || auth.error;

  return (
    <div className={styles.wrap}>
      <div
        className={styles.poster}
        style={{ backgroundImage: `url(${backgroundPoster})` }}
      >
        <div className={styles.posterOverlay} />
        <div className={styles.posterContent}>
          <p className={styles.quote}>A quiet place for the films you keep meaning to watch.</p>
          <p className={styles.quoteSub}>
            Save the next one, rate the last one, and leave yourself a note
            before you forget why it mattered.
          </p>
        </div>
      </div>

      <div className={styles.panel}>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>
              <FilmIcon size={24} color="currentColor" />
            </span>
            <span className={styles.brandName}>
              Watch<span>list</span>
            </span>
          </div>

          <h1 className={styles.title}>
            {mode === "login" ? "Sign in" : "Start a list"}
          </h1>
          <p className={styles.subtitle}>
            {mode === "login"
              ? "Pick up where you left off."
              : "A name, an email, and you're in."}
          </p>

          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${mode === "login" ? styles.tabActive : ""}`}
              onClick={() => {
                setMode("login");
                setLocalError(null);
                auth.setError(null);
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`${styles.tab} ${mode === "register" ? styles.tabActive : ""}`}
              onClick={() => {
                setMode("register");
                setLocalError(null);
                auth.setError(null);
              }}
            >
              Register
            </button>
          </div>

          {displayedError && (
            <div style={{ color: "var(--red)", fontSize: "14px", marginBottom: "15px", textAlign: "center" }}>
              {displayedError}
            </div>
          )}

          {mode === "register" && (
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrap}>
              <input
                className={`${styles.input} ${styles.passwordInput}`}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                className={styles.eyeButton}
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon size={18} color="currentColor" />
                ) : (
                  <EyeIcon size={18} color="currentColor" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" className={styles.submit} disabled={auth.loading}>
            {auth.loading ? "Loading..." : mode === "login" ? "Sign in" : "Create account"}
          </Button>

          <p className={styles.hint}>
            We keep your list separate from everyone else's.
          </p>
        </form>
      </div>
    </div>
  );
}
