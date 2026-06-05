import type { Movie, WatchlistItem, User } from './types.js';

const matrix = 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__abst_0_1780603477388.png';
const inception = 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__surr_0_1780603477236.png';
const darkKnight = 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__dark_0_1780603477080.png';
const interstellar = 'https://storage.googleapis.com/bit-generated-images/images/image_a_cinematic_movie_poster__epic_0_1780603477443.png';

/**
 * Mock movie catalog mirroring the backend seed data.
 */
export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'The Matrix',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    releaseYear: 1999,
    genres: ['Action', 'Sci-Fi'],
    runtime: 136,
    posterUrl: matrix,
  },
  {
    id: 'm2',
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into a mind.',
    releaseYear: 2010,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    runtime: 148,
    posterUrl: inception,
  },
  {
    id: 'm3',
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.',
    releaseYear: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    runtime: 152,
    posterUrl: darkKnight,
  },
  {
    id: 'm4',
    title: 'Interstellar',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    releaseYear: 2014,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    runtime: 169,
    posterUrl: interstellar,
  },
  {
    id: 'm5',
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    releaseYear: 1994,
    genres: ['Crime', 'Drama'],
    runtime: 154,
    posterUrl: darkKnight,
  },
  {
    id: 'm6',
    title: 'The Shawshank Redemption',
    overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    releaseYear: 1994,
    genres: ['Drama'],
    runtime: 142,
    posterUrl: interstellar,
  },
  {
    id: 'm7',
    title: 'Fight Club',
    overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much more.',
    releaseYear: 1999,
    genres: ['Drama'],
    runtime: 139,
    posterUrl: matrix,
  },
  {
    id: 'm8',
    title: 'The Godfather',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    releaseYear: 1972,
    genres: ['Crime', 'Drama'],
    runtime: 175,
    posterUrl: inception,
  },
];

/**
 * Mock watchlist entries for the demo user.
 */
export const WATCHLIST: WatchlistItem[] = [
  { id: 'w1', movie: MOVIES[0], status: 'COMPLETED', rating: 9, notes: 'A genre-defining classic. The bullet-time still holds up.', createdAt: '2024-01-10' },
  { id: 'w2', movie: MOVIES[1], status: 'WATCHING', rating: 8, notes: 'Need to rewatch the ending.', createdAt: '2024-02-02' },
  { id: 'w3', movie: MOVIES[3], status: 'PLANNED', notes: 'Highly recommended by friends.', createdAt: '2024-02-18' },
  { id: 'w4', movie: MOVIES[2], status: 'COMPLETED', rating: 10, notes: 'Heath Ledger is unforgettable.', createdAt: '2024-01-22' },
];

/**
 * Demo authenticated user.
 */
export const DEMO_USER: User = {
  id: 'u1',
  name: 'Elyse Joyeux',
  email: 'elyse@watchlist.app',
};
