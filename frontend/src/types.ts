/**
 * Watchlist status values — mirrors the backend `WatchlistStatus` enum.
 */
export type WatchlistStatus = 'PLANNED' | 'WATCHING' | 'COMPLETED' | 'DROPPED';

/**
 * A movie record, matching the backend Movie model.
 */
export type Movie = {
  /** Unique movie id. */
  id: string;
  /** Stable source id for imported movies, such as TMDB ids. */
  externalId?: string;
  /** Movie title. */
  title: string;
  /** Short synopsis. */
  overview?: string;
  /** Year the movie was released. */
  releaseYear: number;
  /** List of genres. */
  genres: string[];
  /** Runtime in minutes. */
  runtime?: number;
  /** Poster image URL. */
  posterUrl?: string;
};

/**
 * A watchlist entry, matching the backend WatchlistItem model.
 */
export type WatchlistItem = {
  /** Unique watchlist item id. */
  id: string;
  /** The movie referenced by this entry. */
  movie: Movie;
  /** Current watch status. */
  status: WatchlistStatus;
  /** Optional user rating from 1 to 10. */
  rating?: number;
  /** Optional free-form notes. */
  notes?: string;
  /** When the entry was created. */
  createdAt: string;
};

/**
 * Authenticated user shape.
 */
export type User = {
  id: string;
  name: string;
  email: string;
};
