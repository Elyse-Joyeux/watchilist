import { useEffect, useState } from "react";
import { MovieCard } from "../components/movie-card.js";
import { EmptyState } from "../components/empty-state.js";
import { SearchIcon, FilmIcon } from "../icons.js";
import type { UseWatchlist } from "../use-watchlist.js";
import type { Movie } from "../types.js";
import styles from "./browse-page.module.css";

export type BrowsePageProps = {
  /** Watchlist state manager. */
  watchlist: UseWatchlist;
};

/**
 * The Browse page — a searchable, genre-filterable catalog of movies that
 * can be added to the user's watchlist, populated dynamically from TMDB via the backend.
 */
export function BrowsePage({ watchlist }: BrowsePageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Static list of genres to match the exact design criteria in the mockup
  const genres = ["Action", "Adventure", "Crime", "Drama", "Sci-Fi", "Thriller"];

  // Debounce the search query to protect API rate limits
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch movies from backend API
  useEffect(() => {
    let isMounted = true;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = new URL("/api/movies", window.location.origin);
        if (debouncedQuery) {
          url.searchParams.append("search", debouncedQuery);
        }
        if (genre) {
          url.searchParams.append("genre", genre);
        }

        const res = await fetch(url.toString());
        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data)) {
            setMovies(data);
          } else {
            console.error("Invalid movies response:", data);
            setMovies([]);
          }
        }
      } catch (error) {
        console.error("Error fetching movies from backend:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, genre]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>
            <FilmIcon size={14} color="currentColor" /> YOUR PERSONAL CINEMA
          </span>
          <h1 className={styles.heroTitle}>
            Track every film <span>worth watching</span>
          </h1>
          <p className={styles.heroText}>
            Build your watchlist, rate what you've seen, and never lose track of
            the movies on your radar.
          </p>
        </div>
      </section>

      <div className={styles.toolbar}>
        <div className={styles.search}>
          <span className={styles.searchIcon}>
            <SearchIcon size={18} color="var(--text-dim)" />
          </span>
          <input
            className={styles.searchInput}
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.genres}>
          <button
            className={`${styles.genreChip} ${!genre ? styles.genreChipActive : ""}`}
            onClick={() => setGenre(null)}
          >
            All
          </button>
          {genres.map((g) => (
            <button
              key={g}
              className={`${styles.genreChip} ${genre === g ? styles.genreChipActive : ""}`}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Discover</h2>
        <span className={styles.count}>
          {loading ? "Searching..." : `${movies.length} movies`}
        </span>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "50px", color: "var(--text-dim)" }}>
          Loading premium movies catalog...
        </div>
      ) : movies.length === 0 ? (
        <EmptyState
          icon={<SearchIcon size={32} color="var(--text-dim)" />}
          title="No movies found"
          text="Try a different search term or clear the genre filter."
        />
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAdd={watchlist.add}
              inWatchlist={watchlist.has(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
