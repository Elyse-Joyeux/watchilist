import { useState, useCallback, useEffect } from 'react';
import type { Movie, WatchlistItem, WatchlistStatus } from './types.js';

const API_BASE = '/api';

/**
 * Custom hook managing the user's watchlist by calling the backend REST API (`/watchlist`).
 */
export function useWatchlist(userId?: string | null) {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWatchlist = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !userId) {
      setItems([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/watchlist`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch watchlist');
      }
      setItems(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Failed to fetch watchlist:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Re-fetch watchlist when user ID becomes available or changes
  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  /** Checks if a movie is already on the user's watchlist. */
  const has = useCallback(
    (movieId: string) => {
      // Support matching clean numeric IDs or IDs prefixed with tmdb_
      const cleanId = movieId.replace('tmdb_', '');
      return items.some((i) => {
        const itemMovieId = i.movie.id;
        const externalId = i.movie.externalId || '';
        const cleanItemMovieId = itemMovieId.replace('tmdb_', '');
        const cleanExternalId = externalId.replace('tmdb_', '');
        return itemMovieId === movieId || cleanItemMovieId === cleanId || externalId === movieId || cleanExternalId === cleanId;
      });
    },
    [items]
  );

  /** Adds a movie to the watchlist on the backend. */
  const add = useCallback(async (movie: Movie) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: movie.id,
          status: 'PLANNED',
          movie: movie,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add movie');
      }
      if (data.data?.watchlistItem) {
        setItems((prev) => [data.data.watchlistItem, ...prev]);
      }
    } catch (err) {
      console.error('Adding movie to watchlist failed:', err);
    }
  }, []);

  /** Updates an entry's status, rating, or notes on the backend. */
  const update = useCallback(
    async (
      id: string,
      changes: { status: WatchlistStatus; rating?: number; notes?: string }
    ) => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/watchlist/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(changes),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to update watchlist item');
        }
        if (data.data?.watchlistItem) {
          setItems((prev) =>
            prev.map((i) => (i.id === id ? data.data.watchlistItem : i))
          );
        }
      } catch (err) {
        console.error('Updating watchlist item failed:', err);
      }
    },
    []
  );

  /** Removes a movie from the watchlist on the backend. */
  const remove = useCallback(async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/watchlist/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete watchlist item');
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Removing movie from watchlist failed:', err);
    }
  }, []);

  return { items, loading, error, has, add, update, remove, refetch: fetchWatchlist };
}

export type UseWatchlist = ReturnType<typeof useWatchlist>;
