import bcrypt from 'bcryptjs';

export const MOVIES = [
  {
    id: 'm1',
    title: 'The Matrix',
    overview: 'A hacker learns the truth about reality.',
    releaseYear: 1999,
    genres: ['Action', 'Sci-Fi'],
    runtime: 136,
    posterUrl: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm2',
    title: 'Inception',
    overview: 'A thief enters dreams to plant an idea.',
    releaseYear: 2010,
    genres: ['Action', 'Sci-Fi'],
    runtime: 148,
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm3',
    title: 'The Dark Knight',
    overview: 'Batman faces the Joker in Gotham.',
    releaseYear: 2008,
    genres: ['Action', 'Crime'],
    runtime: 152,
    posterUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm4',
    title: 'Interstellar',
    overview: 'A mission crosses a wormhole to save humanity.',
    releaseYear: 2014,
    genres: ['Adventure', 'Sci-Fi'],
    runtime: 169,
    posterUrl: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80',
  },
];

export const USERS = [
  {
    id: 'u1',
    name: 'Elyse Joyeux',
    email: 'elyse@watchlist.app',
    password: bcrypt.hashSync('password', 10),
  },
];

export const WATCHLIST_ITEMS = [
  { id: 'w1', userId: 'u1', movieId: 'm1', status: 'COMPLETED', rating: 9, notes: 'A classic.', createdAt: '2024-01-10' },
  { id: 'w2', userId: 'u1', movieId: 'm2', status: 'WATCHING', rating: 8, notes: 'Great pacing.', createdAt: '2024-02-02' },
];
