import { useState, useCallback } from 'react';
import type { User } from './types.js';

const API_BASE = '/api';

/**
 * Hook to manage authentication against the backend API.
 * Handles login, registration, and logout, persisting sessions in localStorage.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Calls /auth/login and stores the user and JWT. */
  const login = useCallback(async (email?: string, password?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to sign in');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.data?.user) {
        const u: User = {
          id: data.data.user.id,
          name: data.data.user.name || 'User',
          email: data.data.user.email,
        };
        localStorage.setItem('user', JSON.stringify(u));
        setUser(u);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Calls /auth/register and stores the user and JWT. */
  const register = useCallback(async (name: string, email?: string, password?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to register');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.data?.user) {
        const u: User = {
          id: data.data.user.id,
          name: data.data.user.name,
          email: data.data.user.email,
        };
        localStorage.setItem('user', JSON.stringify(u));
        setUser(u);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** Calls /auth/logout and clears localStorage and memory state. */
  const logout = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(async (changes: { name: string; email: string }) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(changes),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to update profile');
      }
      const updated = data.user || data.data?.user;
      if (updated) {
        const nextUser: User = {
          id: updated.id,
          name: updated.name,
          email: updated.email,
        };
        localStorage.setItem('user', JSON.stringify(nextUser));
        setUser(nextUser);
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/auth/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to update password');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, login, register, logout, updateProfile, updatePassword, loading, error, setError };
}

export type UseAuth = ReturnType<typeof useAuth>;
